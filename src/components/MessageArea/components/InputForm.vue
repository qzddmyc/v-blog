<template>
  <form class="input-form-container" @submit.prevent="handleSubmit" ref="form">
    <div class="item-container text-container">
      <input
        type="text"
        :maxlength="inputLimit"
        placeholder="用户昵称"
        v-model="inputContent"
      />
      <div class="tips">
        <div class="error">{{ errors.inputError }}</div>
        <div class="limit">{{ inputLength }}/{{ inputLimit }}</div>
      </div>
    </div>
    <div class="item-container textarea-container">
      <div
        class="textarea"
        ref="textarea"
        contenteditable
        @compositionstart="textareaIsComposing = true"
        @compositionend="handleCompositionEnd"
        @input="refreshTextAreaContent"
        @paste="handlePaste"
        @keydown="handleKeydown"
      ></div>
      <div
        class="placeholder"
        v-show="!textareaIsComposing && textareaLength === 0"
      >
        请输入你的评论内容
      </div>
      <div class="tips">
        <div class="error">{{ errors.textareaError }}</div>
        <div class="limit">{{ textareaLength }}/{{ textareaLimit }}</div>
      </div>
    </div>
    <div class="button-container">
      <button :disabled="isSubmitting">
        {{ isSubmitting ? buttonText : "提交" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputLimit: 10,
      inputContent: "",
      textareaLimit: 300,
      textareaContent: "", // 注意该数据并没有实现响应式，修改的同时需要修改节点中的文本
      textareaIsComposing: false,
      errors: {
        inputError: "",
        textareaError: "",
      },
      isSubmitting: false,
      buttonText: "提交中...",
    };
  },
  computed: {
    inputLength() {
      return this.inputContent.length;
    },
    textareaLength() {
      return this.textareaContent.length;
    },
    formData() {
      return {
        nickname: this.inputContent,
        content: this.textareaContent,
      };
    },
  },
  methods: {
    handleCompositionEnd() {
      this.textareaIsComposing = false;
      this.refreshTextAreaContent();
    },
    handleKeydown(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const el = this.$refs.textarea;
        const sel = window.getSelection();
        if (sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        const preRange = range.cloneRange();
        preRange.selectNodeContents(el);
        preRange.setEnd(range.startContainer, range.startOffset);
        const startPos = preRange.toString().length;
        preRange.setEnd(range.endContainer, range.endOffset);
        const endPos = preRange.toString().length;
        const rawText = el.innerText
          .replace(/\n$/, "")
          .replace(/[\r\n]+/g, " ");
        if (rawText.length - (endPos - startPos) + 1 <= this.textareaLimit) {
          const newText =
            rawText.substring(0, startPos) + " " + rawText.substring(endPos);
          this.textareaContent = newText;
          el.innerText = newText;
          this.$nextTick(() => {
            this._setCaretPosition(el, startPos + 1);
          });
        }
        return;
      }
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey)
        return;
      const sel = window.getSelection();
      const hasSelection = sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed;
      if (this.textareaLength >= this.textareaLimit && !hasSelection) {
        e.preventDefault();
      }
    },
    handlePaste(e) {
      e.preventDefault();
      let pasteText = (e.clipboardData || window.clipboardData)
        .getData("text/plain")
        .replace(/[\r\n]+/g, " ");
      if (!pasteText) return;
      const el = this.$refs.textarea;
      const sel = window.getSelection();
      if (sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const preRange = range.cloneRange();
      preRange.selectNodeContents(el);
      preRange.setEnd(range.startContainer, range.startOffset);
      const startPos = preRange.toString().length;
      preRange.setEnd(range.endContainer, range.endOffset);
      const endPos = preRange.toString().length;
      const selectedLength = endPos - startPos;
      const rawText = el.innerText.replace(/\n$/, "").replace(/[\r\n]+/g, " ");
      const availableSpace =
        this.textareaLimit - (rawText.length - selectedLength);
      if (availableSpace <= 0) return;
      pasteText = pasteText.substring(0, availableSpace);
      const text =
        rawText.substring(0, startPos) + pasteText + rawText.substring(endPos);
      this.textareaContent = text;
      if (text === "") {
        el.innerHTML = "";
        this.$nextTick(() => this._setCaretPosition(el, 0));
      } else {
        el.innerText = text;
        this.$nextTick(() => {
          this._setCaretPosition(
            el,
            Math.min(startPos + pasteText.length, text.length)
          );
        });
      }
    },
    refreshTextAreaContent() {
      if (this.textareaIsComposing) return;
      const el = this.$refs.textarea;
      let carePos = this._getCaretPosition(el);
      let text = el.innerText.replace(/\n$/, "").replace(/[\r\n]+/g, " ");
      if (text.length > this.textareaLimit) {
        const removeStart = Math.max(
          0,
          carePos - (text.length - this.textareaLimit)
        );
        text = text.slice(0, removeStart) + text.slice(carePos);
        carePos = removeStart;
      }
      this.textareaContent = text;
      if (text === "") el.innerHTML = "";
      else if (el.innerText !== text) el.innerText = text;
      this.$nextTick(() => {
        this._setCaretPosition(el, Math.min(carePos, text.length));
      });
    },
    _getCaretPosition(element) {
      let caretOffset = 0;
      const doc = element.ownerDocument || element.document;
      const win = doc.defaultView || doc.parentWindow;
      const sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
      return caretOffset;
    },
    _setCaretPosition(element, offset) {
      const range = document.createRange();
      const sel = window.getSelection();
      if (element.childNodes.length === 0 || offset === 0) {
        range.setStart(element, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        element.focus();
        return;
      }
      let charIndex = 0;
      let nodeStack = [element];
      let node;
      let stop = false;
      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          const nextCharIndex = charIndex + node.length;
          if (offset >= charIndex && offset <= nextCharIndex) {
            range.setStart(node, offset - charIndex);
            range.setEnd(node, offset - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          let i = node.childNodes.length;
          while (i--) nodeStack.push(node.childNodes[i]);
        }
      }
      if (!stop) {
        range.setStart(element, element.childNodes.length);
        range.collapse(true);
      }
      sel.removeAllRanges();
      sel.addRange(range);
      element.focus();
    },
    _setError(textA = "", textB = "") {
      this.errors.inputError = textA;
      this.errors.textareaError = textB;
    },
    handleSubmit() {
      this._setError(
        this.inputLength ? "" : "请填写昵称",
        this.textareaLength ? "" : "请填写内容"
      );
      if (this.errors.inputError || this.errors.textareaError) return;
      this.isSubmitting = true;
      this.$emit("submit", this.formData, (info) => {
        this.inputContent = "";
        this.textareaContent = "";
        this.$refs.textarea.innerHTML = "";
        this.buttonText = "已提交";
        this.$showMessage({
          duration: 1000,
          container: this.$refs.form,
          feedback: () => {
            this.isSubmitting = false;
            this.buttonText = "提交中...";
          },
          ...info,
        });
      });
    },
  },
  mounted() {
    this.$refs.textarea.innerHTML = "";
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@height: 14px;

.tips {
  width: 100%;
  margin-top: 6px;
  @tip-height: 20px;
  height: @tip-height;
  line-height: @tip-height;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  white-space: nowrap;
  .error {
    color: @danger;
    overflow: hidden;
    flex: 1 1 auto;
  }
  .limit {
    color: @gray;
    width: 50px;
    text-align: right;
    flex: 0 0 auto;
  }
}

.input-form-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .item-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    &.text-container {
      width: 50%;
    }
    &.textarea-container {
      width: 100%;
      position: relative;
    }
  }
  @input-height: 40px;
  @placeholder-color: darken(@gray, 25%);
  input {
    width: 100%;
    height: @input-height;
    padding: 0 10px;
    &::placeholder {
      color: @placeholder-color;
      opacity: 1;
    }
  }
  @newHeight: 17px;
  @top-gap: (@input-height - @height) / 2 - (@newHeight - @height);
  .textarea {
    width: 100%;
    min-height: 110px;
    height: auto;
    line-height: @newHeight;
    padding: @top-gap 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    position: relative;
  }
  .placeholder {
    @margin-v: 10px;
    @border-caused-offset: 1px;
    width: calc(100% - @margin-v * 2 - @border-caused-offset * 2);
    height: @newHeight;
    line-height: @newHeight;
    font-size: @height;
    color: @placeholder-color;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: @border-caused-offset;
    left: @border-caused-offset;
    margin: @top-gap @margin-v;
  }
}

input,
.textarea {
  outline: none;
  border: 1px dashed @gray;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: @height;
  transition: border 0.3s;
  color: @dark;
  &:focus {
    border-color: @primary;
  }
}

.button-container {
  margin-bottom: 8px;
  button {
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #fff;
    padding: 0;
    border: none;
    outline: none;
    background-color: @primary;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: darken(@primary, 10%);
    }
    &:disabled {
      cursor: not-allowed;
      background-color: lighten(@primary, 20%);
    }
  }
}
</style>
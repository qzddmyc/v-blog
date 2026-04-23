<template>
  <div class="project-container" v-loading="loading" ref="project-scroll-dom">
    <div class="project-item" v-for="(item, idx) in data" :key="item.id">
      <div class="project-item-content">
        <div class="img-container">
          <img class="thumb" v-lazy="{ src: item.thumb, relation: 2 }" />
        </div>
        <div class="info">
          <h2>{{ item.name }}</h2>
          <a
            v-if="!!item.github"
            :href="item.github"
            class="github"
            target="_blank"
            >View in GitHub</a
          >
          <p v-for="(desc, p_idx) in item.description" :key="p_idx">
            {{ desc }}
          </p>
        </div>
      </div>
      <div class="project-separate-line" v-if="idx !== data.length - 1"></div>
    </div>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [mainScroll("project-scroll-dom")],
  components: { Empty },
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

@base-width: 705px;
@base-padding: 20px;
@total-width: @base-width + @base-padding * 2;

.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: @base-padding;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.project-item {
  min-width: @total-width;
  display: flex;
  flex-direction: column;
}

.project-item-content {
  @img-width: 220px;
  @gap: 20px;
  display: flex;
  padding: 10px 20px;
  transition: 0.5s;
  &:hover {
    background-color: lighten(@primary, 30%);
  }
  .img-container {
    flex: 0 0 auto;
  }
  .thumb {
    width: @img-width;
    min-height: 150px;
    max-height: 250px;
    object-fit: cover;
    border-radius: 5%;
    margin-top: 6px;
    margin-right: @gap;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    min-width: @base-width - @img-width - @gap;
    h2 {
      margin: 0;
      font-size: 25px;
    }
    p {
      font-size: 15px;
      margin: 10px 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
}

.project-separate-line {
  width: 100%;
  min-width: @total-width;
  height: 1px;
  background-color: @gray;
  margin: 15px 0;
}
</style>
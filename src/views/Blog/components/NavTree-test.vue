<template>
  <div class="test-container">
    <NavTree :list="item" @select="handleSelect" />
  </div>
</template>

<script>
import NavTree from "./NavTree.vue";
export default {
  components: { NavTree },
  data() {
    return {
      item: [
        { name: "item-1", isSelected: false },
        {
          name: "item-2",
          isSelected: false,
          children: [
            { name: "item-2-1", isSelected: false },
            { name: "item-2-2", isSelected: false },
            { name: "item-2-3", isSelected: false },
            {
              name: "item-2-4",
              isSelected: false,
              children: [
                { name: "item-2-4-1", isSelected: false },
                { name: "item-2-4-2", isSelected: false },
                { name: "item-2-4-3", isSelected: false },
              ],
            },
          ],
        },
        { name: "item-3", isSelected: false },
        {
          name: "item-4",
          isSelected: false,
          children: [
            { name: "item-4-1", isSelected: false },
            {
              name: "item-4-2",
              isSelected: true,
              children: [
                { name: "itme-4-2-1", isSelected: false },
                { name: "itme-4-2-2", isSelected: false },
              ],
            },
            {
              name: "item-4-3",
              isSelected: false,
              children: [
                { name: "itme-4-2-1", isSelected: false },
                { name: "itme-4-2-2", isSelected: false },
                { name: "itme-4-2-3", isSelected: false },
                { name: "itme-4-2-4", isSelected: false },
              ],
            },
          ],
        },
        {
          name: "item-5",
          isSelected: false,
          children: [
            {
              name: "item-5-1",
              isSelected: false,
              children: [
                {
                  name: "item-5-1-1",
                  isSelected: false,
                  children: [
                    {
                      name: "item-5-1-1-1",
                      isSelected: false,
                    },
                  ],
                },
              ],
            },
            {
              name: "item-5-2",
              isSelected: false,
            },
          ],
        },
        {
          name: "item-6",
          isSelected: false,
          children: [
            {
              name: "item-6-1-loremloremloremloremloremloremlorem",
              isSelected: false,
            },
            {
              name: "item-6-2",
              isSelected: false,
              children: [
                { name: "itme-6-2-1", isSelected: false },
                { name: "itme-6-2-2", isSelected: false },
              ],
            },
            {
              name: "item-6-3",
              isSelected: false,
              children: [
                { name: "itme-6-2-1", isSelected: false },
                { name: "itme-6-2-2", isSelected: false },
                { name: "itme-6-2-3", isSelected: false },
                { name: "itme-6-2-4", isSelected: false },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.test-container {
  width: 280px;
  height: 98vh;
  overflow-y: auto;
  outline: 1px solid #008c8c;
  margin: 1vh 1vw 0 auto;
}
</style>
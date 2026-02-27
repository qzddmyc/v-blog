<template>
  <div>
    <Pager :total="total" :current="current" @pageChange="handleEvent" />
  </div>
</template>

<script>
import Pager from "./";
export default {
  components: { Pager },
  data() {
    return {
      total: 302,
      current: 4,
    };
  },
  methods: {
    handleEvent(newPage) {
      this.current = newPage;
    },
  },
};
</script>
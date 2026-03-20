export default function (ref) {
  return {
    mounted() {
      this.$refs[ref].addEventListener("scroll", this.handleScroll);
      this.$bus.$on("setScroll", this.setScroll);
    },
    beforeDestroy() {
      this.$refs[ref].removeEventListener("scroll", this.handleScroll);
      this.$bus.$emit("mainScroll", null);
      this.$bus.$off("setScroll", this.setScroll);
    },
    methods: {
      handleScroll() {
        this.$bus.$emit("mainScroll", this.$refs[ref]);
      },
      setScroll(n) {
        this.$refs[ref].scrollTop = n;
      },
    },
  }
}
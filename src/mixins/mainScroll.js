export default function (ref) {
  return {
    mounted() {
      this.$refs[ref].addEventListener("scroll", this.$_handleScroll);
      this.$bus.$on("setScroll", this.$_setScroll);
    },
    beforeDestroy() {
      this.$refs[ref].removeEventListener("scroll", this.$_handleScroll);
      this.$bus.$emit("mainScroll", null);
      this.$bus.$off("setScroll", this.$_setScroll);
    },
    methods: {
      $_handleScroll() {
        this.$bus.$emit("mainScroll", this.$refs[ref]);
      },
      $_setScroll(n) {
        this.$refs[ref].scrollTop = n;
      },
    },
  }
}
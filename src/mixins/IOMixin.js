require("intersection-observer");

const IOMixin = {
  data() {
    return {};
  },

  mounted() {
    this.io = new IntersectionObserver(this.cb);
    this.io.observe(this.$el);
  },

  methods: {
    cb(entries) {
      const ratio = entries[0].intersectionRatio;
      // 进入视口后，改变状态并停止监听
      if (ratio > 0) {
        this[IOMixin.onEnter]();
        this.io.unobserve(this.$el);
      }
    }
  }
};

IOMixin.onEnter = "io:enter";

export default IOMixin;

import LazyLoad from "@jianshu/lazy-load";

export default {
  methods: {
    // 立刻加载图片
    loadImage() {
      const lazyload = new LazyLoad({
        packages: document.querySelectorAll(".image-package"),
        immediate: true
      });
      lazyload.init();
    }
  }
};

export default {
  share() {
    return M.shareData.get();
  },

  emit({ event }) {
    return M.vueHub.$emit(event);
  },

  setReadMode(args) {
    const body = document.querySelector("body");
    const html = document.querySelector("html");
    const readMode = args.readMode === "night" ? "night" : "day";

    if (readMode === "day") {
      body.classList.remove("reader-night-mode");
      body.classList.add("reader-day-mode");
      html.style["background-color"] = "#ffffff";
    } else {
      body.classList.remove("reader-day-mode");
      body.classList.add("reader-night-mode");
      html.style["background-color"] = "#3f3f3f";
    }
  }
};

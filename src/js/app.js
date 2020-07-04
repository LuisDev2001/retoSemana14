const app = new Vue({
  el: "#app",
  data: {
    title: "",
    url: "",
    description: "",

    openSectionAddVideo: false,
  },
  methods: {
    toggleOpenAddVideoSection() {
      this.openSectionAddVideo = !this.openSectionAddVideo;
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    title: "",
    url_video: "",
    description: "",

    openSectionAddVideo: false,
  },
  methods: {
    toggleOpenAddVideoSection() {
      this.openSectionAddVideo = !this.openSectionAddVideo;
    },
    printVideo(videos) {
      let containerListVideo = document.getElementById("js-list-video");
      for (const video of videos) {
        containerListVideo.innerHTML += `
          <article class="card-video">
            <div class="card-video-img">
              <div class="card-video-actions">
                <div class="edit-btn">
                  <i class="fas fa-pen"></i>
                </div>
                <div class="delete-btn">
                  <i class="fas fa-times"></i>
                </div>
              </div>
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
              <img src="${video.url_video}" alt="img" />
            </div>
            <div class="card-video-information">
              <h3 class="card-video-title">${video.title}</h3>
              <span class="card-video-view">0 visualizaciones</span>
              <p class="card-video-description">${video.description}</p>
              <a href="#" class="card-video-detail">
                Ver detalle
              </a>
            </div>
          </article>
        `;
      }
    },
    getVideo() {
      fetch("http://localhost:3000/videos")
        .then((response) => {
          return response.json();
        })
        .then((videos) => {
          this.printVideo(videos);
        });
    },
  },
});

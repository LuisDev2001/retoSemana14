const app = new Vue({
  el: "#app",
  data: {
    title: "",
    url_video: "",
    description: "",

    editTitle: "",
    editUrl_video: "",
    editDescription: "",
    editId: 0,

    openSectionAddVideo: false,
    openEditVideoSection: false,
    openDetailVideoSection: true,
  },
  methods: {
    toggleOpenAddVideoSection() {
      this.openSectionAddVideo = !this.openSectionAddVideo;
    },
    toggleOpenEditVideoSection() {
      this.openEditVideoSection = !this.openEditVideoSection;
    },
    toggleOpenDetailVideoSection() {
      this.openDetailVideoSection = !this.openDetailVideoSection;
    },
    createCard(video) {
      const { title, url_video, description, id } = video;
      const card = document.createElement("article");
      card.classList.add("card-video");

      card.innerHTML = `  
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
              <img src="${url_video}" alt="img" />
            </div>
            <div class="card-video-information">
              <h3 class="card-video-title">${title}</h3>
              <span class="card-video-view">${id} visualizaciones</span>
              <p class="card-video-description">${description}</p>
              <a href="#" class="card-video-detail">
                Ver detalle
              </a>
            </div>
        `;

      //Edit video form
      card.querySelector(".edit-btn").onclick = () => {
        this.editVideo(video);
        this.toggleOpenEditVideoSection();
      };

      //View detail video
      card.querySelector(".card-video-detail").onclick = () => {
        this.toggleOpenDetailVideoSection();
        this.detailTitle = video.title;
        this.detailUrl_video = video.url_video;
        this.detailDescription = video.description;
      };

      return card;
    },
    insertCard(card) {
      const containerList = document.querySelector("#js-list-video");
      containerList.appendChild(card);
    },
    getVideo() {
      fetch("http://localhost:3000/videos")
        .then((response) => {
          return response.json();
        })
        .then((videos) => {
          videos.forEach((video) => {
            this.insertCard(this.createCard(video));
          });
        });
    },
    submitVideo() {
      console.log("Click, añadir");
      fetch("http://localhost:3000/videos", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          url_video: this.url_video,
          description: this.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((videoCreate) => {
          return console.log(videoCreate);
        });
    },
    editVideo(video) {
      this.editTitle = video.title;
      this.editUrl_video = video.url_video;
      this.editDescription = video.description;
      this.editId = video.id;
    },
    submitEditVideo() {
      fetch(`http://localhost:3000/videos/${this.editId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.editTitle,
          url_video: this.editUrl_video,
          description: this.editDescription,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (videoEdited) {
          console.log(videoEdited);
        });
    },
  },
});

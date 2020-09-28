<template>
  <div>
    <h1 class="title is-1">pic2text</h1>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <div class="field">
        <div class="file is-boxed is-primary">
          <label class="file-label">
            <input type="file" ref="file" @change="selectFile" class="file-input" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">Choose a file</span>
            </span>
            <span v-if="file" class="file-name">{{file.name}}</span>
          </label>
        </div>
        <br />
        <div class="field">
          <button class="button is-info">Send</button>
        </div>
      </div>
    </form>
    <br />
    <div>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64"></figure>
          </div>
          <img id="spinner" class="spinner" src="./pb.gif" style="visibility:hidden" />
          <div class="media-content">
            <div class="content">
              <br />
              {{response}}
            </div>
            <nav class="level is-mobile">
              <div class="level-left"></div>
            </nav>
          </div>
        </article>
      </div>
    </div>
    <br />
    <div class="buttons">
      <button class="button is-primary" v-on:click="play">Play</button>
      <button class="button is-primary" v-on:click="stop">Stop</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SimpleUpload",
  data() {
    return {
      file: "",
      selected: "",
      response: "your text will be here",
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async sendFile() {
      const spinner = document.getElementById("spinner");
      spinner.style.visibility = "visible";
      this.response = "wait a bit soon here will be the text!)";
      speechSynthesis.cancel();
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const response = await axios.post("upload", formData);
        this.response = response.data;
        this.file = "";
        spinner.style.visibility = "hidden";
      } catch (err) {
        console.log("error", err);
      }
    },
    stop() {
      speechSynthesis.cancel();
    },
    play() {
      const message = new SpeechSynthesisUtterance(this.response);
      message.rate = 0.8;
      message.pitch = 0.8;
      window.speechSynthesis.speak(message);
    },
  },
};
</script>

<style scoped>
.spinner {
  height: 70px;
}
</style>
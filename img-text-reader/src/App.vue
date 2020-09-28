<template>
  <div class="section">
    <div class="container">
      <SimpleUpload />
    </div>
  </div>
</template>


<script>
import SimpleUpload from "./components/SimpleUpload.vue";
export default {
  name: "App",
  components: { SimpleUpload },
};
</script>

<style>
body {
  background-image: url("./bg.jpg");
  background-size: cover;
  height: 100vh;
}
</style>
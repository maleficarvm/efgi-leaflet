<template>
  <div class="home">
    <openLeaflet />
  </div>
</template>

<script>
// @ is an alias to /src
import openLeaflet from "@/components/Open.vue";

export default {
  name: "Open",
  components: {
    openLeaflet,
  },
};
</script>

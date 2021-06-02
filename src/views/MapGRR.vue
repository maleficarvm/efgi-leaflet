<template>
  <div class="home">
    <mapgrrLeaflet />
  </div>
</template>

<script>
// @ is an alias to /src
import mapgrrLeaflet from "@/components/MapGRR.vue";

export default {
  name: "Map",
  components: {
    mapgrrLeaflet,
  },
};
</script>

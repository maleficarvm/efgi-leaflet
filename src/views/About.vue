<template>
  <div class="about">
    <VueTableDynamic />
  </div>
</template>

<script>
import VueTableDynamic from "@/components/Table.vue";

export default {
  name: "Home",
  components: {
    VueTableDynamic,
  },
};
</script>

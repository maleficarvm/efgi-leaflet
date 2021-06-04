<template>
  <div :class="classes" class="base-section-heading">
    <base-avatar
      v-if="icon"
      :icon="icon"
      :outlined="outlined"
      class="mb-4"
      color="primary"
      dark
    />

    <base-subtitle v-if="subtitle" :title="subtitle" space="1" tag="h2" />

    <base-subheading
      v-if="title"
      :align="align"
      :title="title"
      class="text-uppercase"
      space="2"
    />

    <base-divider :color="color" />

    <base-body v-if="$slots.default || text" class="mx-auto" max-width="700">
      <slot v-if="$slots.default" />

      <template v-else>
        {{ text }}
      </template>
    </base-body>
  </div>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";
import baseAvatar from "@/components/UI/Avatar.vue";
import baseBody from "@/components/UI/Body.vue";
import baseSubtitle from "@/components/UI/Subtitle.vue";
import baseSubheading from "@/components/UI/Subheading.vue";
import baseDivider from "@/components/UI/Divider.vue";

export default {
  name: "BaseSectionHeading",

  components: {
    baseAvatar,
    baseBody,
    baseSubtitle,
    baseSubheading,
    baseDivider,
  },

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: "center",
    },
    color: {
      type: String,
      default: "primary",
    },
    icon: String,
    outlined: Boolean,
    space: {
      type: [Number, String],
      default: 12,
    },
    subtitle: String,
    text: String,
    title: String,
  },

  computed: {
    classes() {
      return [`text-${this.align}`, `mb-${this.space}`];
    },
  },
};
</script>

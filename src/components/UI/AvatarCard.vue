<template>
  <div :class="classes" class="pt-2">
    <baseAvatar
      v-if="icon"
      :color="color"
      :dark="dark"
      :icon="icon"
      :outlined="outlined"
      :size="size"
      class="mb-3 align-self-start"
    />

    <div :class="horizontal && title && 'ml-6'">
      <baseTitle :title="title" class="text-uppercase" space="3" />

      <baseBody
        v-if="text || $slots.default"
        :space="horizontal ? 0 : undefined"
        :text="text"
        class="mx-auto"
        max-width="700"
      >
        <slot />
      </baseBody>
    </div>
  </div>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";
import baseAvatar from "@/components/UI/Avatar.vue";
//import baseBody from "@/components/UI/Avatar.vue";
import baseTitle from "@/components/UI/Avatar.vue";

export default {
  name: "BaseAvatarCard",
  components: {
    baseAvatar,
    //baseBody,
    baseTitle,
  },

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: "left",
    },
    color: String,
    dark: Boolean,
    horizontal: Boolean,
    icon: String,
    outlined: {
      type: Boolean,
      default: true,
    },
    space: {
      type: [Number, String],
      default: 8,
    },
    size: {
      type: [Number, String],
      default: 72,
    },
    text: String,
    title: String,
  },

  computed: {
    classes() {
      const classes = [`mb-${this.space}`];

      if (this.horizontal) {
        classes.push("d-flex");

        if (!this.$slots.default && !this.text) {
          classes.push("align-center");
        }
      }

      return classes;
    },
  },
};
</script>

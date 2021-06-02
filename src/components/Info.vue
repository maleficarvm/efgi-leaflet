<template>
  <div class="wrapper-content wrapper-content--fixed">
    <v-parallax dark src="@/img/banner_main.gif">
      <v-row align="center" justify="center">
        <v-col class="text-center-1">
          <h1 class="display-1 font-weight-thin mb-4">
            ЕДИНЫЙ БАНК ГЕОЛОГИЧЕСКОЙ ИНФОРМАЦИИ
          </h1>
          <h4 class="subheading">
            Лаборатория ЕБГИ
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <h1 class="text-uppercase font-weight-bold mb-2 text-center">
      Порядок предоставления информации
    </h1>
    <base-section id="theme-features">
      <base-section-heading title="Theme Features">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
        Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
        quibusdam esse accusamus mollitia magni fuga.
      </base-section-heading>

      <v-container>
        <v-row>
          <v-col v-for="(feature, i) in features" :key="i" cols="12" md="6">
            <base-avatar-card v-bind="feature" align="left" horizontal>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              illum veniam cum dolores ratione commodi beatae quas maxime,
              laboriosam excepturi solut!
            </base-avatar-card>
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </div>
</template>
<script>
export default {
  name: "SectionThemeFeatures",
  data: () => ({
    length: 3,
    window: 0,
    features: [
      {
        title: "Pixel Perfect Design",
        icon: "mdi-fountain-pen-tip",
      },
      {
        title: "Retina Ready",
        icon: "mdi-cellphone",
      },
      {
        color: "primary",
        dark: true,
        title: "Easily Customizable",
        icon: "mdi-pencil-box-outline",
      },
      {
        title: "Image Parallax",
        icon: "mdi-image-size-select-actual",
      },
      {
        title: "Seo Optimized",
        icon: "mdi-ice-pop",
      },
      {
        title: "24/7 Support",
        icon: "mdi-help-circle-outline",
      },
    ],
  }),
};
</script>

<style lang="scss">
.text-center-1 {
  text-align: center;
  position: absolute;
  top: 40%;
}
</style>

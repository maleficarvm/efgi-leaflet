<template>
  <div class="wrapper-content wrapper-content--fixed">
    <v-parallax dark src="@/img/banner_main_plus.gif" height="600">
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
    <base-section dark id="features" class="secondary">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="3"
          >
            <baseInfoCard align="center" dark v-bind="card" />
          </v-col>
        </v-row>
      </v-container>
    </base-section>
    <baseSection id="theme-features">
      <baseSectionHeading
        title="Порядок предоставления в пользование информации "
      >
      </baseSectionHeading>
      <v-container>
        <v-row>
          <v-col v-for="(feature, i) in features" :key="i" cols="12" md="6">
            <baseAvatarCard v-bind="feature" align="left" horizontal>
              Настоящий порядок разработан в соответствии с приказом ФГУП ЦНИГРИ
              (ФГБУ «ЦНИГРИ») от 25.10.2016 г. № 57, регламентом № 1 учета и
              передачи информации в цифровом виде электронного банка
              геологических данных ФГБУ «ЦНИГРИ», утвержденным в 2018 г.
            </baseAvatarCard>
          </v-col>
        </v-row>
      </v-container>
    </baseSection>
    <v-theme-provider dark>
      <base-section id="social" class="accent text-center" space="56">
        <base-section-heading
          color="transparent"
          title="Регулирующие документы и обратная связь"
        >
          Cкачав пакет документов вы можете подробнее ознакомиться с процессом
          выдачи материалов ЕБГИ и получить форму заявки. По всем вопросам и
          пожеланиям просим обращаться на электронную почту:
        </base-section-heading>

        <a
          class="d-inline-block mb-8"
          href="#"
          style="text-decoration: none; color: grey; font-size: 20px"
          target="_blank"
        >
          uvarova@tsnigri.ru
        </a>
        <base-section-heading color="transparent">
          Техническая поддержка:
        </base-section-heading>
        <a
          class="d-inline-block mb-8"
          href="#"
          style="text-decoration: none; color: grey; font-size: 20px"
          target="_blank"
        >
          vmuravev@tsnigri.ru
        </a>

        <div class="py-4" />

        <v-btn
          class="font-weight-bold"
          color="white"
          href="#"
          light
          min-width="168"
          target="_blank"
          x-large
        >
          Скачать
        </v-btn>
      </base-section>
    </v-theme-provider>
    <base-section id="affiliates" space="36">
      <v-container>
        <base-section-heading title="Основано на открытых технологиях" />
        <v-slide-group>
          <template v-for="n in 9">
            <v-slide-item :key="n" class="align-self-center">
              <baseImg
                :src="require(`@/img/logo-${n}.png`)"
                color="grey"
                contain
                height="40"
                width="128"
              />
            </v-slide-item>
            <v-responsive
              v-if="n < 9"
              :key="`divider-${n}`"
              class="text-center"
              height="56"
              width="48"
            >
              <v-divider vertical />
            </v-responsive>
          </template>
        </v-slide-group>
      </v-container>
    </base-section>
  </div>
</template>

<script>
import baseSection from "@/components/UI/Section.vue";
import baseSectionHeading from "@/components/UI/SectionHeading.vue";
import baseAvatarCard from "@/components/UI/AvatarCard.vue";
import baseImg from "@/components/UI/Img.vue";
import baseInfoCard from "@/components/UI/InfoCard.vue";

export default {
  components: {
    baseSection,
    baseSectionHeading,
    baseAvatarCard,
    baseImg,
    baseInfoCard,
  },
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
        title: "Pixel Perfect Design",
        icon: "mdi-fountain-pen-tip",
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
    cards: [
      {
        icon: "mdi-database-check-outline",
        title: "Единицы хранения",
        text:
          "Общее количество уникальных объектов учета, приведенных к цифровым форматам, составляет более 2000 единиц. Суммарное количество площадных объектов на карте составляет более 4000 единиц",
      },
      {
        icon: "mdi-map-marker-multiple-outline",
        title: "Различные источники",
        text:
          'Помимо фондовых материалов ФГБУ "ЦНИГРИ", присутствуют материалы ФГБУ "Росгеолфонд", ФГБУ "ВСЕГЕИ", территориальных фондов и прочих отраслевых организаций, прогнозные ресурсы',
      },
      {
        icon: "mdi-table-edit",
        title: "Форматы данных",
        text:
          "Более 50 000 единиц данных в текстовых, растровых и векторных форматах, ГИС-данные, локальные базы данных, цифровые комплекты ГГК всех поколений, топографические карты",
      },
      {
        icon: "mdi-cog-outline",
        title: "Виды работ",
        text:
          "Оценочные, поисковые, поисково-оценочные, геохимические, научно-методические и региональные работы. Минералогические и научно-технологические исследования",
      },
    ],
  }),
};
</script>

<style lang="scss">
h1 {
  margin: 0px 0px 30px;
}

.text-center-1 {
  text-align: center;
  position: absolute;
  top: 40%;
}
</style>

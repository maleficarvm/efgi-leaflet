<template>
  <v-app dark>
    <v-main>
      <section>
        <v-parallax
          src="@/img/banner_main_plus.gif"
          height="600"
          class="parallax"
        >
          <v-layout column align-center justify-center class="white--text">
            <h1
              class="white--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >
              Единый фонд геологической информации
            </h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px #000000"
            >
              Учет, накопление, безопасное хранение и предоставление сотрудникам
              ФГБУ "ЦНИГРИ" геологической информации
            </div>
            <v-btn class="dark lighten-2 mt-5" dark large href="/">
              Начать
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to share your amazing stuff</h2>
              <span class="subheading">
                No more restrictions, no more limits
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="mdi-map-marker-multiple-outline"
                      ></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">О ЕБГИ</div>
                    </v-card-title>
                    <v-card-text>
                      Единый банк геологической информации ФГБУ «ЦНИГРИ» (ЕБГИ)
                      предназначен для обеспечения сотрудников ФГБУ°«ЦНИГРИ»
                      цифровыми геологическими материалами, необходимыми для
                      выполнения работ по государственным контрактам и
                      государственным заданиям, написания научных трудов и
                      другой деятельности, направленной на выполнение задач
                      Института.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="mdi-database-check-outline"
                      ></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Основные компоненты ЕБГИ
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Реестр объектов учеты (поиск фондовых материалов); Реестр
                      апробации прогнозных ресурсов (поиск материалов по
                      апробации прогнозных ресурсов); Карта объектов учета
                      (отображение контуров работ и геологических объектов,
                      связанных с выполненными работами по фондовым материалам,
                      поиск фондовых материалов по объектам и местоположению);
                      Карта прогнозных ресурсов (отображение контуров
                      геологических объектов, связанных с материалами по
                      апробации прогнозных ресурсов, поиск материалов по
                      объектам и местоположению).
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="mdi-map-marker-multiple-outline"
                      ></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Форматы данных</div>
                    </v-card-title>
                    <v-card-text
                      >Более 50 000 единиц данных в текстовых, растровых и
                      векторных форматах, ГИС-данные, локальные базы данных,
                      цифровые комплекты ГГК всех поколений, топографические
                      карты",
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="mdi-map-marker-multiple-outline"
                      ></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Источники
                      </div>
                    </v-card-title>
                    <v-card-text>
                      ЕБГИ включает фондовые материалы ФГБУ "ЦНИГРИ", ФГБУ
                      "Росгеолфонд" территориальных фондов и других отраслевых
                      организаций. Представлены материалы по апробации
                      прогнозных ресурсов благородных и цветных металлов,
                      алмазов',
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="mdi-cog-outline"></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Единицы хранения</div>
                    </v-card-title>
                    <v-card-text>
                      Общее количество уникальных объектов учета, приведенных к
                      цифровым форматам, составляет более 2000 единиц. Суммарное
                      количество площадных объектов на карте составляет более
                      4000 единиц",
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="mdi-table-edit"></v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Виды документов</div>
                    </v-card-title>
                    <v-card-text>
                      Геологические отчеты, авторефераты диссертационных работ,
                      атласы, протоколы, экспертные заключения, заключения
                      рабочих групп, паспорта апробируемых объектов, материалы
                      организаций-зявителей на апробацию прогнозных ресурсов",
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="imageLink.main" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">
              Endorfine is a social network that allows everyone to reach a huge
              audience with a tap
            </div>
            <em
              >With the power of Endorfine you don't need to be famous or post
              pics of cute cats in order to get visibility</em
            >
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get more info
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center class="mt-5">
              <div class="headline">Are you amazed? Stay tuned!</div>
              <br />
              <div>
                We are lunching the beta in a few time. If you want to be one of
                the first Endorfine users we will email you as soon as we're
                ready. In the beginning only few people will test before the
                launch. Let us know how Endorfine will help you!
              </div>
            </v-flex>
            <v-flex xs8 offset-xs2>
              <v-card class="elevation-0 transparent">
                <v-card-text>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field
                      box
                      label="Email address"
                      :rules="emailRules"
                      v-model="email"
                      hint="Enter your email!"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field
                      box
                      multi-line
                      label="Bio and curiosities"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center" v-if="!subscribed">
                    <v-btn
                      class="blue lighten-2 mb-5"
                      dark
                      large
                      @click="subscribe"
                      >Get in touch</v-btn
                    >
                  </v-flex>
                  <v-flex xs12 class="text-xs-center" v-if="subscribed">
                    <v-btn class="green lighten-2 mb-5" dark large
                      >Welcome on board!</v-btn
                    >
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section>
        <v-parallax :src="imageLink.social_cover" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">
              We are dropping cool news and opportunities on socials
            </div>
          </v-layout>
          <v-layout justify-space-around justify-center>
            <v-icon x-large dark>fab fa-facebook-f</v-icon>

            <v-icon x-large dark>fab fa-twitter</v-icon>

            <v-icon x-large dark>fab fa-reddit-alien</v-icon>

            <v-icon x-large dark>fab fa-instagram</v-icon>

            <v-icon x-large dark>fab fa-discord</v-icon>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Лаборатория ЕБГИ</div>
                </v-card-title>
                <v-card-text>
                  По всем вопросам и пожеланиям просим обращаться на электронную
                  почту:
                </v-card-text>
                <v-card-text>
                  Уварова Е.А.
                </v-card-text>
                <v-card-text>
                  uvarova@tsnigri.ru
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Техническая поддержка</div>
                </v-card-title>
                <v-card-text>
                  В случае возникновения проблем с работой ЕБГИ просим
                  обращаться на электронную почту:
                </v-card-text>
                <v-card-text>
                  Муравьев В.С.
                </v-card-text>
                <v-card-text>
                  vmuravev@tsnigri.ru
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      title: "ugib",
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5",
        logo:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",
        social_cover:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4",
      },
      email: "",
      emailRules: [
        (v) => {
          return !!v || "E-mail is required";
        },
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      subscribed: false,
    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 30px 0px 30px 0px;
}

.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>

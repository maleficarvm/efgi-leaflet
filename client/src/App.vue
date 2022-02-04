<template>
  <div id="app">
    <div id="nav">
      <header>
        <div class="navbar">
          <div class="navbar-content">
            <img
              src="./img/tsnigri.png"
              style="height: 48px; margin: 1px 0 1px 19px"
              alt="tsnigri-logo-img"
            />
            <ul class="navbar-list" v-if="$route.meta.show">
              <li class="navbar-item" v-for="link in links" :Key="link.title">
                <router-link
                  class="navbar-link"
                  :title="link.title"
                  :to="link.url"
                  >{{ link.title }}
                </router-link>
              </li>
              <button
                class="navbar-item"
                style="color: white; font-weight: 600"
                @click="logout"
              >
                Выйти
              </button>
              <v-toolbar-title data-app>
                <v-menu bottom left dark :offset-x="offset">
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          dark
                          large
                          icon
                          v-bind="attrs"
                          v-on="{ ...tooltip, ...menu }"
                        >
                          <v-icon>mdi-menu</v-icon>
                        </v-btn>
                      </template>
                      <span>Меню</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      :to="item.link"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar-title>
            </ul>
          </div>
        </div>
      </header>
    </div>
    <router-view />
    <v-footer app bottom fixed dark padless>
      <v-col>
        Отдел геоинформационных систем. Лаборатория ЕБГИ ©
        {{ new Date().getFullYear() }} ФГБУ "ЦНИГРИ"
      </v-col>
    </v-footer>
    <modal v-show="isModalVisible" style="z-index:100;" @close="closeModal" />
  </div>
</template>

<script>
import modal from "@/components/UI/Modal.vue";

export default {
  name: "App",
  components: {
    modal,
  },
  data() {
    return {
      show: false,
      events: [
        "click",
        "mousemove",
        "mousedown",
        "scroll",
        "keypress",
        "load",
        "unload",
      ],
      logoutTimer: null,
      isModalVisible: false,
      offset: true,
      items: [
        { title: "Карта объектов учета", link: "/map" },
        { title: "Карта объектов апробации", link: "/resources" },
        { title: "Реестр объектов учета", link: "/table" },
        { title: "Реестр объектов апробации", link: "/forecast" },
        { title: "Реестр фондовых материалов", link: "/fund" },
      ],
      links: [{ title: "О Едином Банке", url: "/" }],
    };
  },
  mounted() {
    this.events.forEach(function(event) {
      window.addEventListener(event, this.resetTimer);
    }, this);

    window.onbeforeunload = function() {
      return confirm();
    };
    window.addEventListener("beforeunload", this.deleteToken);

    this.setTimers();
  },
  watch: {
    show: window.addEventListener("storage", () => {
      true;
    }),
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    logout() {
      let message = "Вы действительно хотите выйти из своей учетной записи?";
      let result = window.confirm(message);
      if (result) {
        localStorage.clear();
        this.$router.push("/login");
      }
    },
    setTimers: function() {
      this.logoutTimer = setTimeout(this.logout, 1000 * 60 * 60);
    },
    resetTimer: function() {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
    deleteToken() {
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #d3b36f;
    }
  }
}

button {
  border: 0px !important;
}

.v-tooltip__content {
  padding: 0px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 12px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 11px !important;
}
</style>

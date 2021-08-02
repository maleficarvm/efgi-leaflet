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
            <modal v-show="isModalVisible" @close="closeModal" />
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :Key="link.title">
                <router-link
                  class="navbar-link"
                  :title="link.title"
                  :to="link.url"
                  >{{ link.title }}</router-link
                >
              </li>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </ul>
          </div>
        </div>
      </header>
    </div>
    <router-view />
    <v-footer dark padless>
      <v-col>
        Отдел геоинформационных систем. Лаборатория ЕБГИ ©
        {{ new Date().getFullYear() }} ФГБУ "ЦНИГРИ"
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import modal from "@/components/UI/Modal.vue";

export default {
  name: "app",
  components: {
    modal,
  },
  data() {
    return {
      isModalVisible: true,
      links: [
        { title: "О Едином Банке", url: "/info" },
        { title: "Карта объектов учета", url: "/" },
        { title: "Карта прогнозных ресурсов", url: "/404" },
        { title: "Реестр объектов учета", url: "/table" },
        { title: "Реестр прогнозных ресурсов", url: "/404" },
      ],
    };
  },
  methods: {
    onClick() {
      this.$emit("on-click", value);
      console.log("it works" + value);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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

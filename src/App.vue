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
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :Key="link.title">
                <router-link
                  class="navbar-link"
                  :title="link.title"
                  :to="link.url"
                  >{{ link.title }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: "Карта ГРР", url: "/" },
        { title: "Реестр объектов учета", url: "/about" },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>

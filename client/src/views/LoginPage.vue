<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="3" class="mx-auto">
        <v-card class="pa-4" max-width="450px">
          <div class="text-center">
            <v-avatar size="100" color="grey lighten-1">
              <v-icon size="40" color="dark">mdi-account</v-icon>
            </v-avatar>
            <h2 class="dark--text">Войти в ЕБГИ</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                label="Пароль"
                placeholder="Пароль"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
              />
              <!-- <v-switch label="Запомнить меня" color="indigo"></v-switch> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                type="submit"
                class="ma-2 btn__default v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"
              >
                <span class="white--text px-8">Войти</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Корректный логин и пароль
    </v-snackbar>
    <v-snackbar top color="red" v-model="invalidbar">
      Некорректный логин и пароль
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    loading: false,
    snackbar: false,
    invalidbar: false,
    passwordShow: false,
    email: "",
    emailRules: [
      (v) => !!v || "Введите Email",
      (v) => /.+@.+\..+/.test(v) || "E-mail должен быть корректным",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Введите пароль",
      (v) =>
        (v && v.length >= 6) || "Пароль должен содержать не менее 6 символов",
    ],
    error: "",
  }),
  methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        let user = {
          email: this.email,
          password: this.password,
        };
        this.loading = true;
        axios.post("http://localhost:5000/login", user).then((res) => {
          // if successful
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
          (err) => {
            console.log(err.response);
            this.error = err.response.data.error;
            this.loading = false;
            this.invalidbar = true;
          };
        });
      }
    },
  },
};
</script>
<style lang="scss">
input {
  border: none !important;
  margin-bottom: 5px;
}

.background {
  background-image: url(../img/banner_main_plus.gif) !important;
  height: 250px;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
}
</style>

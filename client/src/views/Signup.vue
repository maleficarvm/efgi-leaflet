<template>
  <div>
    NAME:<input type="text" v-model="name" /> EMAIL:<input
      type="email"
      v-model="email"
    />
    PASSWORD:<input type="password" v-model="password" />
    <button type="submit" @click="signup">Signup!</button> {{ error }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(newUser);
      axios.post("http://localhost:5000/signup", newUser).then(
        (res) => {
          console.log(res);
          this.error = "";
          this.$router.push("/login");
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
  },
};
</script>

<style>
input {
  display: block;
}
</style>

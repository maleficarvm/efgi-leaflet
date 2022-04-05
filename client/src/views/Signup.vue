<template>
  <div>
    NAME:<input type="text" v-model="name" /> ROLE:<input
      type="text"
      v-model="role"
    />
    EMAIL:<input type="email" v-model="email" /> PASSWORD:<input
      type="password"
      v-model="password"
    />
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
      role: "",
      error: "",
    };
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      console.log(newUser);
      axios.post(`http://kastor.tsnigri.ru:5000/signup`, newUser).then(
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

<template>
  <b-container class="form-container">
    <h2>Voici la partie secrete du site de Daria</h2>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <label for="feedback-user">Nom d'utilisateur</label>
        <b-input v-model="username" :state="validationUsername" autocomplete="username"></b-input>
        <div class="invalid-feedback" :state="validationUsername">
          Vous devez entrer un nom d'utilisateur.
        </div>
      </b-form-group>

      <b-form-group>
        <label for="feedback-user">Mot de passe</label>
        <b-input type="password" v-model="password" :state="validationPassword" autocomplete="current-password"></b-input>
        <div class="invalid-feedback" :state="validationPassword">
          Vous devez entrer un mot de passe.
        </div>
      </b-form-group>

      <div v-if="!userTryingToLogIn">
        <b-button type="submit" variant="primary">Se connecter</b-button>
      </div>
      <div v-else>
        <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
      </div>
      <b-form-group>
        <label class="error" :state="hasError">
          {{ serverError }}
        </label>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      confirmPassword: null,
      isRegister: false
    };
  },
  computed: {
    ...mapState("user", ["userSignedIn", "userTryingToLogIn", "serverError"]),
    hasError() {
      return !this.serverError;
    },
    validationUsername() {
      return !!this.username || this.username;
    },
    validationPassword() {
      return !!this.password || this.password;
    }
  },
  methods: {
    ...mapActions("user", ["login", "register"]),
    handleSubmit() {
      const { username, password } = this;

      if (!username || !password) return;

        this.login({ username, password });
      }
    }
  }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");

.form-container {
  margin-top: 50px;
}

h2 {
  font-family: Copse;
}

.registerButton {
  float: right;
}

.spiner {
  margin-left: 15px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

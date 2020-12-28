<template>
  <b-container class="form-container">
    <h2>Sketcher</h2>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group>
        <label for="feedback-user">Nom d'utilisateur</label>
        <b-input v-model="username" :state="validationUsername"></b-input>
        <div class="invalid-feedback" :state="validationUsername">
          Vous devez choisir un nom d'utilisateur.
        </div>
      </b-form-group>

      <b-form-group>
        <label for="feedback-user">Mot de passe</label>
        <b-input type="password" v-model="password" :state="validationPassword"></b-input>
        <div class="invalid-feedback" :state="validationPassword">
          Vous devez choisir un mot de passe.
        </div>
      </b-form-group>

      <b-form-group v-if="isRegister">
        <label for="feedback-user">Confirmer votre mot de passe</label>
        <b-input type="password" v-model="confirmPassword" :state="validationConfirmPassword"></b-input>
        <div class="invalid-feedback" :state="validationConfirmPassword">
          Vous devez confirmer votre mot de passe.
        </div>
      </b-form-group>

      <div v-if="!userTryingToLogIn">
        <b-button type="submit" variant="primary">{{ isRegister ? "S'inscrire" : "Se connecter" }}</b-button>
        <b-form-group class="registerButton">
          <button type="button" v-on:click="toggleLogin()" class="btn btn-link">
            {{ isRegister ? "Se connecter" : "S'inscrire" }}
          </button>
        </b-form-group>
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
    },
    validationConfirmPassword() {
      return (!!this.confirmPassword || this.password) && this.confirmPassword === this.password;
    }
  },
  methods: {
    ...mapActions("user", ["login", "register"]),
    handleSubmit() {
      const { username, password, confirmPassword, isRegister } = this;

      if (!username || !password) return;

      if (!isRegister) {
        this.login({ username, password });
      } else if (confirmPassword) {
        this.register({ username, password });
      }
    },
    toggleLogin() {
      this.isRegister = !this.isRegister;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Copse&display=swap");

.form-container {
  margin-top: 50px;
}

h2 {
  font-family: Copse;
  color: #007bff;
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

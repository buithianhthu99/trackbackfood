<template>
  <q-page
    class=" row justify-center items-center"
    style="background: linear-gradient(rgb(60 209 113), rgb(8 40 4));"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section style="background:#067a15">
            <h4 class="text-h5 text-white q-my-md">Login</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%);"
            ></div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              style="background:#067a15"
              class="full-width text-white"
              @click="submit()"
              label="Sign In"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import request from "src/api/request";
import auth from "src/api/auth";
import { LocalStorage } from "quasar";
const api = auth(request);
export default {
  name: "Login",
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      const params = {
        username: this.username,
        password: this.password
      };
      const temp = await api.logIn(params);
      if (temp){
        LocalStorage.set('account',temp.result[0].address)
        this.$router.push('/')
      }
    }
  }
};
</script>

<style></style>

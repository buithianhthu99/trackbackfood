<template>
  <q-page
    class=" row justify-center items-center"
    style="background: linear-gradient(rgb(60 209 113), rgb(8 40 4));"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:485px;">
          <q-card-section style="background:#067a15">
            <h4 class="text-h4 text-weight-bold text-white q-my-md">Registration</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%);"
            ></div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input
                square
                clearable
                v-model="name"
                type="name"
                label="Name"
              >
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
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
              label="Sign up"
              @click="submit()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <router-link class="text-grey-6" to="/signin">Return to login</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import request from "src/api/request";
import auth from "src/api/auth";
const api = auth(request);
export default {
  name: "Login",
  data() {
    return {
      name: "",
      username: "",
      password: ""
    };
  },
  methods:{
    async submit(){
      const params = {
        name: this.name,
        username: this.username,
        password: this.password
      };
      const reponse = await api.SignUp(params);
      if(reponse)
        this.$router.push('/signin')      
    }
  }
};
</script>

<style></style>

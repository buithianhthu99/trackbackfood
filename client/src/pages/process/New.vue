
<template>
  <q-page padding>
    <q-toolbar class="no-padding">
      <q-btn dense outline icon="keyboard_backspace" v-go-back="`/process?harvestId=${$route.query.harvestId}&productId=${$route.query.productId}`" />
      <q-toolbar-title> Add Process </q-toolbar-title>
    </q-toolbar>

    <q-separator spaced />
    <loading v-if="loading" style="z-index: 10" />
    <overview-form ref="overviewRef" :init-data="product" @changed="changed = true"></overview-form>

    <q-page-sticky expand position="bottom" :offset="[0, 0]">
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-subtitle1"> Unsaved changes </q-toolbar-title>

        <div class="q-gutter-sm">
          <q-btn flat label="Discard" no-caps v-go-back="`/process?harvestId=${$route.query.harvestId}&productId=${$route.query.productId}`" />
          <q-btn color="primary" no-caps label="Save" :disable="!changed" @click.prevent="save" />
        </div>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
// const data = {harvestId: 0, productId: 0, name: "Test process", ingredients: "Saturated Fat 5g, Dietary Fiber 2g", startTime: "10/06/2021", endTime: "10/06/2021", owner: localStorage.getItem("account")}
import OverviewForm from 'src/components/process/OverviewForm';
export default {
  components: {
    OverviewForm,
  },
  data() {
    return {
      loading: false,
      product: null,
      changed: false,
    };
  },

  methods: {
    async save() {
      this.$q.loading.show();
      let processInfo = await this.$refs.overviewRef.onValidate();
      console.log(processInfo)
      try {
        await this.$api.addProcess(processInfo)
        this.$q.notify( {
            type: 'positive',
            position: 'top',
            message: 'Create success'
          }
        )
        this.$router.push(`/process?harvestId=${this.$route.query.harvestId}&productId=${this.$route.query.productId}`)
        console.log(`/process?harvestId=${this.$route.query.harvestId}&productId=${this.$route.query.productId}`)
      } catch (error) {
        console.log(error)
        this.$q.notify( {
            type: 'negative',
            position: 'top',
            message: 'Create fail'
          }
        )
      }
      this.$q.loading.hide();
    },
  },
};
</script>

<template>
  <q-page padding>
    <q-toolbar class="no-padding">
      <q-btn dense outline icon="keyboard_backspace" v-go-back="{ name: 'product' }" />
      <q-toolbar-title> Add Product </q-toolbar-title>
    </q-toolbar>

    <q-separator spaced />
    <loading v-if="loading" style="z-index: 10" />
    <overview-form ref="overviewRef" :init-data="product" @changed="changed = true"></overview-form>

    <q-page-sticky expand position="bottom" :offset="[0, 0]">
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-subtitle1"> Unsaved changes </q-toolbar-title>

        <div class="q-gutter-sm">
          <q-btn flat label="Discard" no-caps v-go-back="'/product'" />
          <q-btn color="primary" no-caps label="Save" :disable="!changed" @click.prevent="save" />
        </div>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import OverviewForm from 'src/components/product/OverviewForm';
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
      let productInfo = await this.$refs.overviewRef.onValidate();
      try {
        await this.$api.addProduct(productInfo)
        this.$q.notify( {
            type: 'positive',
            position: 'top',
            message: 'Create success'
          }
        )
        this.$router.push('/product')
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

<template>
  <q-page padding>
    <q-toolbar class="no-padding">
      <q-btn dense outline icon="keyboard_backspace" v-go-back="{ name: 'my-own' }" />
      <q-toolbar-title> Add Harvest </q-toolbar-title>
    </q-toolbar>

    <q-separator spaced />
    <loading v-if="loading" style="z-index: 10" />
    <overview-form ref="overviewRef" :init-data="harvest" @changed="changed = true"></overview-form>

    <q-page-sticky expand position="bottom" :offset="[0, 0]">
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-subtitle1"> Unsaved changes </q-toolbar-title>

        <div class="q-gutter-sm">
          <q-btn flat label="Discard" no-caps v-go-back="'/my-own'" />
          <q-btn color="primary" no-caps label="Save" :disable="!changed" @click.prevent="save" />
        </div>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import OverviewForm from 'src/components/harvest/OverviewForm';
export default {
  components: {
    OverviewForm,
  },
  data() {
    return {
      loading: false,
      harvest: null,
      changed: false,
    };
  },

  methods: {
    async save() {
      this.$q.loading.show();
      try {
        let harvestInfo = await this.$refs.overviewRef.onValidate();
        await this.$api.addHarvest(harvestInfo)
        this.$q.notify( {
            type: 'positive',
            position: 'top',
            message: 'Create success'
          }
        )
        this.$router.push('/my-own')
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

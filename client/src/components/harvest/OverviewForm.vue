<template>
  <div class="row justify-start items-start q-mb-xl q-col-gutter-md">
    <div class="q-mt-md col-12 row">
      <q-form class="col-12 q-mb-md" @submit.prevent="onValidate" @reset="onReset" ref="form">
        <q-card class="shape-overview-card" flat bordered>
          <q-card-section>
            <span class="text-subtitle1">Harvest Overview</span>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="data.name"
              label="Harvest name *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input harvest name']"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="data.startTime"
              label="Start time *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input start time']"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="data.endTime"
              label="End time *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input end time']"
            />
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initData: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },

  data() {
    return {
      data: null,
      options: [],
      beforeMaterCodes: null,
    };
  },

  created() {
    this.data = Object.assign({name: '', startTime: '', endTime: ''}, this.initData)
    // watch only once
    this.unwatchIsShapeData = this.$watch(
      'data',
      (newVal) => {
        if (newVal) {
          this.$emit('changed', true);
          this.unwatchIsShapeData();
        }
      },
      {
        deep: true,
      }
    );
  },
  computed: {
  },
  methods: {
    onValidate() {
      const { data, $q } = this;
      const owner = this.$q.localStorage.getItem('account')
      return new Promise((resolve, reject) => {
        return this.$refs.form.validate().then((success) => {
          if (success) {
            // Serializable before save
            const harvestInfo = {
              name: data.name,
              owner: owner,
              startTime: data.startTime,
              endTime: data.endTime,
            };
            resolve(harvestInfo);
          } else {
            reject(new Error('oh no, user has filled in at least one invalid value'));
          }
        });
      });
    },

    onReset() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>

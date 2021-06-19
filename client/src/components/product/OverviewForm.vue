<template>
  <div class="row justify-start items-start q-mb-xl q-col-gutter-md">
    <div class="q-mt-md col-12 row">
      <q-form class="col-12 q-mb-md" @submit.prevent="onValidate" @reset="onReset" ref="form">
        <q-card class="shape-overview-card" flat bordered>
          <q-card-section>
            <span class="text-subtitle1">Product Overview</span>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="data.name"
              label="Product name *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input product name']"
            />
          </q-card-section>

          <!-- <q-card-section>
            <q-input
              v-model="data.amount"
              label="Amount"
              outlined
              dense
              stack-label
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="data.state"
              label="State"
              outlined
              dense
              stack-label
            />
          </q-card-section> -->
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
    this.data = Object.assign({name: ''}, this.initData)
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
      const harvestId = this.$route.query.harvestId
      return new Promise((resolve, reject) => {
        return this.$refs.form.validate().then((success) => {
          if (success) {
            // Serializable before save
            const harvestInfo = {
              name: data.name,
              owner: owner,
              harvestId: harvestId,
              endTime: data.endTime,
              amount: data.amount,
              state: data.state
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

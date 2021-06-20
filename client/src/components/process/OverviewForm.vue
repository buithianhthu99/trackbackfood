<template>
  <div class="row justify-start items-start q-mb-xl q-col-gutter-md">
    <div class="q-mt-md col-12 row">
      <q-form class="col-12 q-mb-md" @submit.prevent="onValidate" @reset="onReset" ref="form">
        <q-card class="shape-overview-card" flat bordered>
          <q-card-section>
            <span class="text-subtitle1">Process Overview</span>
          </q-card-section>
          <q-card-section>

            <q-input
              v-model="data.name"
              label="Process name *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input product name']"
            />
          </q-card-section>
          <q-card-section>

            <q-input
              v-model="data.ingredients"
              label="Ingredients *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input ingredients']"
            />
          </q-card-section>
          <q-card-section>

            <q-input
              v-model="data.startTime"
              label="Start Time *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input start time']"
            />
          </q-card-section>
          <q-card-section>

            <q-input
              v-model="data.endTime"
              label="End Time *"
              outlined
              dense
              stack-label
              :rules="[(val) => (val && val.length > 0) || 'Please input end time']"
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
// const data = {harvestId: 0, productId: 0, name: "Test process", ingredients: "Saturated Fat 5g, Dietary Fiber 2g", startTime: "10/06/2021", endTime: "10/06/2021", owner: localStorage.getItem("account")}
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
      data: {
        name: "",
        ingredients: "",
        startTime:"",
        endTime:"",
      },
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
      const productId = this.$route.query.productId
      return new Promise((resolve, reject) => {
        return this.$refs.form.validate().then((success) => {
          if (success) {
            // Serializable before save
            const harvestInfo = {
              name: data.name,
              owner: owner,
              harvestId: +harvestId,
              ingredients: data.ingredients,
              productId: +productId,
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

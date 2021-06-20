<template>
  <q-page class="row q-ma-md">
    <q-card class="col-12" flat bordered>
      <q-card-section class="text-h6">
        Trackback product
      </q-card-section>
      <q-card-section>
        <q-input
          style="flex: auto"
          outlined
          dense
          debounce="300"
          :hint="q ? 'Search by: ' + q : ''"
          v-model="q"
          placeholder="Please input product unique id..."
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section v-if="result" class="row">
        <div class="col-6">
          <div class="text-h6">Product</div>
          <div class="">
            <div class="">Name: <span class="text-weight-bold">{{result.name}}  </span></div>
            <div class="">Amount: <span class="text-weight-bold">{{result.amount}}</span></div>
            <div class="">State: <span class="text-weight-bold">{{result.state}}</span></div>
            <div class="">Processes amount: <span class="text-weight-bold">{{result.processesAmount}}</span></div>
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6">Harvest</div>
          <div class="">
            <div class="">Name: <span class="text-weight-bold">{{result.harvest.name}}  </span></div>
            <div class="">Ownner: <span class="text-weight-bold">{{result.harvest.owner}}  </span></div>
            <div class="">Products amount: <span class="text-weight-bold">{{result.harvest.productsAmount}}</span></div>
            <div class="">Start time: <span class="text-weight-bold">{{result.harvest.startTime}}</span></div>
            <div class="">End time: <span class="text-weight-bold">{{result.harvest.endTime}}</span></div>

          </div>
        </div>
        <div class="col-12 q-mt-md">
          <div class="text-h6">Processes</div>
          <q-table
            :data="result.processes"
            :columns="columns"
            row-key="id"
            separator="cell"
            :pagination="initialPagination"
          >
          </q-table>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-center text-h6">No Product Found</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  async created() {
    this.q = this.$route.query.uniqueId
  },
  data() {
    return {
      q: '',
      result: null,
      initialPagination: {
        page: 1,
        rowsPerPage: 50,
        sortBy: 'updatedAt',
        descending: true,
      },

      columns: [
        {
          name: 'id',
          align: 'left',
          label: 'ID',
          field: 'id',
          sortable: false,
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          name: 'ingredients',
          required: true,
          label: 'Ingredients',
          align: 'left',
          field: 'ingredients',
          sortable: false,
        },
        {
          name: 'startTime',
          align: 'left',
          label: 'Start time',
          field: 'startTime',
        },
        {
          name: 'endTime',
          align: 'left',
          label: 'End time',
          field: 'endTime',
        },
      ],
    }
  },
  watch:{
    async q(value) {
      this.$router.push({query: {uniqueId: value}})
      if (value && value.length) {
        await this.load()
      }
    }
  },
  methods: {
    async load() {
      try {
        const res = await this.$api.productByUniqueId(this.$route.query.uniqueId)
        console.log(res)
        if (res.status === 200 && res.result.name && res.result.name.length) {
          const harvest = await this.$api.harvestById(res.result.harvestId)
          const processes = await this.$api.processesByHarvestAndProduct(res.result.harvestId, res.result.productId)
          this.result = {
            ...res.result,
            harvest : {
              ...harvest.result,
            },
            processes: processes.result
          }
          console.log(this.result)
        } else {
          this.result = null
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>

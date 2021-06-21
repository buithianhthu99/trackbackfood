<template>
  <q-page padding>
    <q-toolbar>
        <q-btn dense outline icon="keyboard_backspace" v-go-back="{ name: 'my-own' }" />
        <q-toolbar-title> Product </q-toolbar-title>
      <div class="row q-gutter-sm">
        <q-btn color="primary" outline no-caps  :to="'/product/new?harvestId=' + harvestId ">
          <q-icon left name="add" />
          <div class="gt-xs">Create a new product</div>
        </q-btn>
      </div>
    </q-toolbar>

    <q-card flat bordered>
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        separator="cell"
        :loading="loading"
        :filter="q"
        :filter-method="filterData"
        :pagination="initialPagination"
      >
        <template v-slot:top="props">
          <q-input
            style="flex: auto"
            outlined
            dense
            debounce="300"
            :hint="q ? 'Search by: ' + q : ''"
            v-model.trim="q"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md q-mt-xs self-start"
          />
        </template>
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            {{ props.value }}
            <q-popup-edit v-model="props.row.name" title="Update name" @save="handleUpdate(props.row)" buttons>
              <q-input type="text" v-model="props.row.name" dense autofocus />
            </q-popup-edit>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            {{ props.value }}
            <q-popup-edit v-model="props.row.amount" title="Update amount" @save="handleUpdate(props.row)" buttons>
              <q-input type="number" v-model="props.row.amount" dense autofocus />
            </q-popup-edit>
          </q-td>
        </template>
        <template v-slot:body-cell-state="props">
          <q-td :props="props">
            {{ props.value }}
            <q-popup-edit v-model="props.row.state" title="Update state" @save="handleUpdate(props.row)" buttons>
              <q-input type="text" v-model="props.row.state" dense autofocus />
            </q-popup-edit>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="rows items-start q-gutter-sm">
              <q-btn dense flat icon="launch" @click="$router.push(`/process?harvestId=${props.row.harvestId}&productId=${props.row.id}`)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>

export default {
  data() {
    return {
      data: [],
      loading: false,
      harvestId: null,
      q: '',
      mode: 'list',

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
          sortable: true,
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          name: 'amount',
          align: 'left',
          label: 'Amount',
          field: 'amount',
          sortable: true,
        },
        {
          name: 'harvestId',
          align: 'left',
          label: 'Harvest Id',
          field: 'harvestId',
          sortable: false,
        },
        {
          name: 'processesAmount',
          align: 'left',
          label: 'Processes amount',
          field: 'processesAmount',
          sortable: true,
        },
        {
          name: 'state',
          align: 'left',
          label: 'State',
          field: 'state',
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Processes',
          style: 'padding-right: 10px',
        }
      ],
    };
  },


  async created() {
    this.loading = true;
    this.harvestId = this.$route.query.harvestId
    try {
      const res = await this.$api.productsByHarvestId(this.harvestId)
      this.data = [...res.result]
    } catch (error) {
      console.log(error)
    }
    this.loading = false;
  },

  methods: {
    async handleUpdate(row) {
      console.log(row)
      const updateInfo = {
        harvestId: row.harvestId,
        productId: row.id,
        amount: row.amount,
        state: row.state,
        name: row.name,
        owner: this.$q.localStorage.getItem('account')
      }
      try {
        await this.$api.updateProduct(updateInfo)
        this.$q.notify({
          type: 'positive',
          position: 'top',
          message: 'Update success'
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: 'Update fail'
        })
      }
    },
    filterData() {
      return this.data.filter((item) => {
        const q = this.q.toLowerCase();
        return item.name.toLowerCase().includes(q);
      });
    },
  },
};
</script>

<style scoped>
.contact-info {
  min-height: 30px;
  padding: 0;
}
.description {
  white-space: normal;
}
</style>

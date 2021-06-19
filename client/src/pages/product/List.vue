<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <q-toolbar-title> Product </q-toolbar-title>

      </q-toolbar-title>
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
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="rows items-start q-gutter-sm">
              <q-btn dense flat icon="launch" @click="$router.push(`/process?harvestId=${props.row.harvestId}?productId=${props.row.id}`)" />
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
          label: 'Id',
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
          label: 'Actions',
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
      this.data = res.result
    } catch (error) {
      console.log(error)
    }
    this.loading = false;
  },

  methods: {

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

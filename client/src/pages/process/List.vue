<template>
  <q-page padding>
    <q-toolbar>
        <q-btn dense outline icon="keyboard_backspace" v-go-back="{ name: 'product', query: {harvestId: $route.query.harvestId} }" />
        <q-toolbar-title> Process </q-toolbar-title>
      <div class="row q-gutter-sm">
        <q-btn color="primary" outline no-caps  :to="`/process/new?harvestId=${harvestId}&productId=${productId}`">
          <q-icon left name="add" />
          <div class="gt-xs">Create a new process</div>
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
      productId: null,
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
          name: 'ingredients',
          align: 'left',
          label: 'Ingredients',
          field: 'ingredients',
          sortable: true,
        },
        {
          name: 'startTime',
          align: 'left',
          label: 'Start at',
          field: 'startTime',
          sortable: true,
        },
        {
          name: 'endTime',
          align: 'left',
          label: 'End at',
          field: 'endTime',
          sortable: true,
        }
      ],
    };
  },


  async created() {
    this.loading = true;
    this.harvestId = this.$route.query.harvestId
    this.productId = this.$route.query.productId
    try {
      const res = await this.$api.GetProccessById(this.harvestId,this.productId)
      console.log(res)
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

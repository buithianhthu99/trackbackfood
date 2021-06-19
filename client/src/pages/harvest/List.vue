<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Harvest</q-toolbar-title>
      <div class="row q-gutter-sm">
        <q-btn color="primary" outline no-caps to="/my-own/harvest/new">
          <q-icon left name="add" />
          <div class="gt-xs">Create a new harvest</div>
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
import { mapGetters } from 'vuex';
import { date } from 'quasar';

export default {
  data() {
    return {
      data: [],
      loading: false,
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
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          name: 'owner',
          required: true,
          label: 'Owner',
          align: 'left',
          field: 'owner',
          sortable: false,
        },
        {
          name: 'productsAmount',
          align: 'left',
          label: 'Product amount',
          field: 'productsAmount',
          sortable: true,
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
    };
  },


  async created() {
    const res = await this.$api.harvestByOwnerId(this.$q.localStorage.getItem('account'))
    this.data = res.result
    // const res = await this.$api.harvests()
    console.log(res)
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

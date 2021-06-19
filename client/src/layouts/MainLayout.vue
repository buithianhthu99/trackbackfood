<template>
  <q-layout view="lHh lpR lFf" class="bg-grey-1">
    <q-header bordered class="bg-white text-grey-8">
      <q-toolbar class="G4U__toolbar">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" class="q-mr-sm" />

        <q-toolbar-title shrink class="row items-center no-wrap">
            <div>Trackback</div>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">

          <q-btn flat no-caps v-if="account">
            <q-avatar round text-color="white" color="primary">
              <span>{{ account | avatar }}</span>
            </q-avatar>
            <span class="q-pl-xs" v-if="$q.screen.gt.xs">{{ account }}</span>

            <q-menu transition-show="scale" transition-hide="scale" fit>
              <q-list style="min-width: 200px">
                <q-item clickable to="/account">
                  <q-item-section side>
                    <q-icon name="manage_accounts" />
                  </q-item-section>
                  <q-item-section>Manage Account</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="handleLogout()">
                  <q-item-section side>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-white column" :width="280">
      <q-scroll-area class="G4U__drawer-menu">
        <q-list padding class="text-grey-8">
          <q-item
            class="G4U__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            :to="link.to"
            active-class="bg-teal-1 text-grey-8"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />
          <q-item
            class="G4U__drawer-item"
            v-ripple
            v-for="link in links5"
            :key="link.text"
            clickable
            :to="link.to"
            active-class="bg-teal-1 text-grey-8"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div>
        <q-item>
          <q-item-section>
            <q-item-label>Trackback Food Blockchain System</q-item-label>
            <q-item-label caption lines="2">All rights reserved</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container class="G4U__content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'G4ULayout',
  data() {
    return {
      slide: 0,
      showThumnail: false,
      slides: [],

      year: new Date().getFullYear(),
      leftDrawerOpen: false,
      links1: [
        { icon: 'dashboard', text: 'Harvest', to: '/harvest' },
      ],
      links5: [{ icon: 'settings', text: 'Settings', to: '/settings' }],
    };
  },
  filters: {
    avatar: function (value = '') {
      return value.substr(0, 2).toUpperCase();
    },
  },
  computed: {
    account() {
      return this.$q.localStorage.getItem('account')
    }
  },
  methods: {
    handleLogout(){
      this.$q.localStorage.remove('account')
      
    },
  },


  created() {
    console.log(this.account)
  },
};
</script>

<style lang="scss">
.G4U {
  &__content {
    // max-width: 1600px;
    margin: 0 auto;
  }

  &__toolbar-input {
    width: 55%;
  }
  &__drawer-menu {
    width: 100%;
    flex: 1;
    // height: calc(100% - 64px);
  }
  &__drawer-item {
    line-height: 24px;
    border-radius: 0 24px 24px 0;
    margin-right: 12px;
    .q-item__section--avatar {
      .q-icon {
        color: #5f6368;
      }
    }

    .q-item__label {
      color: #3c4043;
      letter-spacing: 0.01785714em;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }

  &__drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.75rem;

    &:hover {
      color: #000;
    }
  }
}
</style>

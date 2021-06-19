
import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar'
const whiteList = ['signin', 'signup', 'error']; // no redirect whitelist

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (whiteList.includes(to.name)) {
      return next();
    }
    const isAuthenticated = LocalStorage.getItem('account');
    if (isAuthenticated) {
      return next();
    } else {
      next({ path: '/signin', query: { redirect: to.fullPath } });
    }
  });
});

export default ({ store, route }) => {
  if(route.name !== store.state.breadcrumb.route) {
    store.dispatch('breadcrumb/set', { route: route.name, matched: route.meta[0].breadcrumb });
  }
}

const cache = (function cache() {
  let instance;

  function init() {
    let state = {};

    function get( key = '' ) {
      return (state[key] || {}).data;
    }

    function set( key = '', value ) {
      if ( !key ) return;

      state = { ...state, [key]: {
        data: value,
        ts: Date.now(),
      } };
      return value;
    }

    function purge( filterFunction ) {
      Object.keys(state).reduce(( acc, key ) => {
        const value = state[key];
        if ( filterFunction(value) ) acc[key] = value;
        return acc;
      }, {});
    }

    function getAllKeys() {
      return Object.keys(state);
    }

    return {
      get,
      getAllKeys,
      set,
      purge,
    };
  }

  return {
    getInstance() {
      if ( !instance ) instance = init();

      return instance;
    },
  };
})();

module.exports = cache.getInstance();

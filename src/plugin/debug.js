export default {
  install(Vue) {
    Vue.prototype.$debug = {
      log: function(data, title, vue) {
        if (title) {
          var name = ''
          if (vue) {
            name = vue.$options.name
          }
          console.log(JSON.parse(JSON.stringify(data)), title, ' form:' + name)
        }
        console.log(JSON.parse(JSON.stringify(data)))
      }
    }
  }
}

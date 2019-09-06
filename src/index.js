
import $larfree from './plugin/larFree.js'
import $debug from './plugin/debug.js'
import larTable from './components/module/Table'
import larFrom from './components/module/Form'
import larDetail from './components/module/Detail'
import larSearchBox from './components/module/SearchBox'
import larFromCeil from './components/form/Ceil'
// import larDialog from './components/module/Dialog'

// 批量读取field组件
const modulesFiles = require.context('./components/field', true, /\.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const lafree = {
  install(Vue) {
    // 将field中的组件自动注册
    for (const key in modules) {
      if (modules[key].name) {
        console.log(modules[key].name, '已注册')
        Vue.component(modules[key].name, modules[key])
      }
    }

    Vue.component(larTable.name, larTable)
    Vue.component(larFrom.name, larFrom)
    Vue.component(larDetail.name, larDetail)
    Vue.component(larSearchBox.name, larSearchBox)
    Vue.component(larFromCeil.name, larFromCeil)
    // Vue.component(larDialog.name, larDialog)

    Vue.use($larfree)
    Vue.use($debug)

    // Vue.use($http);

    // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
    // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
    // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定

    // 解决vue示例不一致问题
    Window.larfree = { 'vue': Vue }
    console.log(Vue.component(`LarFieldInput`), 'ssss')
  }
}
export default lafree // 导出..

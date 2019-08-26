import Vue from 'vue'
// 这里定义初始值
const state = {
  // count: 10,
  // debug: true,
  schemas: {},
  // history: {},
  upload: {
    imageHost: process.env.VUE_APP_API_HOST + '/upload/images',
    fileHost: process.env.VUE_APP_API_HOST + '/upload/files'
  },
  pipe: {}, // 用来互通筛选条件
  num: null, // 用来互通筛选条件
  dataRefreshEvents: '{}' // 监听刷新事件
}

const mutations = {
  /**
   * 对event中的对应model进行监控,只要发现值变化,就同时刷新列表
   * @param model model名
   */
  refreshEvents(state, model) {
    // 为啥要这么写? 因为如果不提前定义好state的model,无法监听,只能监听整个json了
    let json = JSON.parse(state.dataRefreshEvents)
    if (!json[model]) { json[model] = 0 }
    json[model]++
    json = JSON.stringify(json)
    state.dataRefreshEvents = json
  },

  pipe(state, payload) {
    Vue.set(state.pipe, payload.name, payload.value)
  },
  refreshDialog(state) {
    state.num++
  }

}

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {}

const getters = {
  // 用来互通数据
  getPipe: (state) => (model) => {
    return state.pipe[model]
  },
  // 判定表格是不是需要刷新
  getRefreshEvents: (state) => (model) => {
    const json = JSON.parse(state.dataRefreshEvents)
    return json[model]
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}

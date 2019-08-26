
<style scoped>
.websocket {
  display: none;
}
</style>

<template>
  <div class="websocket" />
</template>

<script>
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
const baseURL = process.env.VUE_APP_API_HOST
const websocketKey = process.env.VUE_APP_WEBSOCKET_KEY

export default {
  props: {
    isPhone: Boolean
  },
  mounted() {
    this.init()
    this.run()
  },
  methods: {
    init() {
      const token = localStorage.getItem('token')
      if (!token) {
        console.log('链接socket初始化错误: 缺少token.')
        return
      }
      // window.Pusher = require('pusher-js');
      window.Pusher = Pusher
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: websocketKey,
        cluster: 'ap3',
        encrypted: true,
        authEndpoint: `${baseURL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      })
    },
    run() {
      // console.log("runAddressModify", Echo);
      window.Echo.private('address-feedback').listen(
        '.App\\Events\\Pusher\\BroadcastAddressFeedbackCreated', // 监听事件,需要添加命名空间
        evt => {
          // console.log("runAddressModify listen::::::::::::::::::::", evt);
          const context = this
          this.$notify.warning({
            title: '地址异常提交',
            dangerouslyUseHTMLString: true,
            message: `你有一条地址异常提交需要处理: ${
              evt.addressFeedback.address
            }`,
            duration: 0,
            onClick() {
              context.$router.push({
                path: `/dialog/map/addressmodify/${evt.addressFeedback.id}`
              })
            }
          })
        }
      )

      // 接驳点地址修改提示
      window.Echo.private('spot-address-change').listen(
        '.App\\Events\\Pusher\\BroadcastSpotAddressChange', // 监听事件,需要添加命名空间
        evt => {
          // console.log("runAddressModify listen::::::::::::::::::::", evt);
          const context = this
          const h = this.$createElement
          this.$notify.warning({
            title: '有接驳点位置发生了变化',
            dangerouslyUseHTMLString: true,
            message: h('div', [
              h(
                'div',
                `${evt.user_name} 将接驳点 ${evt.spot_name} 位置改动到了 ${
                  evt.spotAddressHistory.after_address
                }`
              ),
              h(
                'div',
                { style: 'color:rgba(16, 142, 233, 1);' },
                '点击查看详情'
              )
            ]),
            duration: 0,
            onClick() {
              // context.$router.push({
              //   path: '/curd/express.spot_address_history'
              // });
              context.$router.push({
                path: `/dialog/map/station-address-changed/${
                  evt.spotAddressHistory.id
                }`
              })
              this.close()
            }
          })
        }
      )
    }
  }
}
</script>

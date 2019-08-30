<template>
  <div>
    <template v-if="action == 'edit'">
      <el-date-picker
        :value="value"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        v-on="$listeners"
      />
    </template>
    <template v-if="action == 'table'">
      <!--<i class="el-icon-time"></i>-->
      <div v-if="value" style="line-height: 18px;">
        <i class="el-icon-date" /><span>{{ value.substring(2, 10) }}</span>
      </div>
      <div v-if="value" style="line-height: 18px;">
        <i class="el-icon-time" /><span>{{ value.substring(11) }}</span>
      </div>
    </template>
    <template v-if="action == 'search'">
      <el-date-picker
        style="width:100%"
        :value="value"
        :picker-options="pickerOptions"
        align="right"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        :start-placeholder="fieldName + '开始'"
        :end-placeholder="fieldName + '结束'"
        :default-time="['00:00:00', '23:59:59']"
        v-on="$listeners"
      />
    </template>
  </div>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldTimestamp',
  filters: {
    datereg(val) {
      if (val) {
        return val.slice(5, 16)
      }
    },
    pickTime(val) {
      if (val) {
        const date = new Date(val * 1000)
        let h = date.getHours()
        const r = ':'
        let m = date.getMinutes()
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        return h + r + m
      }
    }
  },
  extends: base,
  props: {},
  data() {
    return {
      searchModel: 'range',
      options: {}
    }
  },
  computed: {
    pickerOptions() {
      return this.pickerOption()
    }
  },

  methods: {
    pickerOption() {
      /*
          this.schema.range = ["-1d", ""]; //从一天前开始
          this.schema.range = ["2d", ""]; //从两天后开始
          this.schema.range = ["now", "4w"]; //从现在到4周(28天)后那天
          this.schema.range = ["3M", "now"]; //从3个月(90天)前那天到现在
          */
      if (this.schema.range && this.schema.range.length === 2) {
        const range = this.schema.range
        const todayZeroTime = new Date(new Date().toLocaleDateString()).getTime() // 当天00:00:00
        const todayOverTime = todayZeroTime + 24 * 60 * 60 * 1000 - 1 // 当天24:59:59
        this.options.disabledDate = time => {
          let start, end // 可取时间范围
          if (range[0] === 'now') {
            start = Date.now()
          } else if (range[0] === null || range[0] === '') {
            start = Number.NEGATIVE_INFINITY // 负无穷大
          } else {
            start = this.formatCompute(range[0], todayZeroTime)
          }
          if (range[1] === 'now') {
            end = Date.now()
          } else if (range[1] === null || range[1] === '') {
            end = Number.POSITIVE_INFINITY // 正无穷大
          } else {
            end = this.formatCompute(range[1], todayOverTime)
          }
          return time.getTime() < start || end < time.getTime()
        }
      } else {
        this.options.shortcuts = [
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近10天内',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 10)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近15天内',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
      return this.options
    },
    formatCompute(format, time) {
      const matchs = format.match(/^(-)?(\d)+(ms|[smhdwMy])$/)
      let dValue = parseInt(matchs[2]) // matchs[2]:差值
      switch (
        matchs[3] // matchs[3]:单位
      ) {
        case 'ms':
          // dValue = dValue;
          break
        case 's':
          dValue = dValue * 1000
          break
        case 'm':
          dValue = dValue * 60 * 1000
          break
        case 'h':
          dValue = dValue * 60 * 60 * 1000
          break
        case 'd':
          dValue = dValue * 24 * 60 * 60 * 1000
          break
        case 'w':
          dValue = dValue * 7 * 24 * 60 * 60 * 1000
          break
        case 'M':
          dValue = dValue * 30 * 24 * 60 * 60 * 1000
          break
        case 'y':
          dValue = dValue * 365 * 24 * 60 * 60 * 1000
          break
      }
      return time + (matchs[1] ? -dValue : dValue) // matchs[1]:正负值
    }
  }
}
</script>
<style>
</style>


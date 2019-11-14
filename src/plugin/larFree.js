export default {
  install(Vue) {
    Vue.prototype.$larfree = {
      /**
       * 把{{id}}替换成真正的
       * @param string
       * @param data
       * @returns string
       */
      replaceParm: function(string, data) {
        // console.log(string);
        if (!string) {
          return ''
        }
        // string = string.replace(/({{[^,:}]+}})/g, function(word) {
        string = string.replace(/({{[^,:}]+}})/g, function(word) {
          word = word.substr(2)
          word = word.substr(0, word.length - 2)
          return data[word]
        })
        // console.log(string);
        return string
      },

      /**
       * 把数组转换成&?模式
       * @param params
       * @param url
       * @returns {string}
       */
      httpQuery: function(params, url) {
        // console.info('params',params);
        const esc = encodeURIComponent
        const query = Object.keys(params)
          .map((k) => {
            // if (params[k] && JSON.stringify(params[k]) !== '[]')
            if ((params[k] || params[k] === 0) && JSON.stringify(params[k]) !== '[]') {
              return esc(k) + '=' + esc(params[k])
            } else {
              return null
            }
          }).filter(function(val) {
            return !(!val || val === '')
          }).join('&')

        if (!url) {
          return query
        } else {
          if (url.indexOf('?') > 0) {
            return url + '&' + query
          } else {
            return url + '?' + query
          }
        }
      },

      /**
       * 搜索模式
       * @param data
       */
      getSearchQuery: function(data) {
        const query = {}
        for (const key in data) {
          const keyData = data[key]
          // console.info('adfasdf',keyData);
          if (keyData.searchModel === 'equal') {
            query[key] = null
          } else {
            query[key + '$'] = null
          }
          if (keyData.value || keyData.value === 0) {
            // if (keyData.value) {
            switch (keyData.searchModel) {
              case 'equal':
                query[key] = keyData.value
                break
              case 'link':
                query[key] = '$' + keyData.value
                break
              case 'like':
                query[key] = '$%' + keyData.value + '%'
                break
              case 'range':
                if (keyData.value !== ',') {
                  query[key] = `$>${keyData.value[0]},<${keyData.value[1]}`
                }
                break
              default:
                query[key] = keyData.value
                break
            }
          }
        }
        return query
      },

      /**
       * 查找数组或者对象中 是否存在该值
       * @param array
       * @param key
       * @param value
       * @returns {*}
       */
      findArr: function(array, key, value) {
        if (array.length < 1) {
          return false
        }

        for (var arr in array) {
          if (array[arr][key] === value) {
            return array[arr]
          }
        }
        return false
      },

      /**
       * 首字母大写
       * @author Blues
       * @param s
       * @returns {string}
       */
      ucfrist: function(s) {
        return s[0].toUpperCase() + s.slice(1)
      },

      /**
       * 转驼峰
       * @author Blues
       * @param name
       * @returns {*|void|string}
       */
      toHump: function(name) {
        return name.replace(/\_(\w)/g, function(all, letter) {
          return letter.toUpperCase()
        })
      },

      /**
       *
       * @param name
       * @param w
       * @param h
       * @param mode
       * @returns {string}
       */
      getThumb: function(name, w, h, mode) {
        if (!mode) {
          mode = 0
        }
        // var host = 'http://ozpkvf5wf.bkt.clouddn.com';
        var host = 'http://api.dml-express.com'
        return `${host}/${name}?imageView2/${mode}/w/${w}/h/${h}`
      },
      goToTopTimer: '',
      // 回到顶部
      goToTop: function() {
        document.documentElement.scrollTop = 0
      },

      // 判断是不是为空
      isEmptyValue: function(value) {
        var type
        if (value == null) { // 等同于 value === undefined || value === null
          return true
        }
        type = Object.prototype.toString.call(value).slice(8, -1)
        switch (type) {
          case 'String':
            return !value
          case 'Array':
            return !value.length
          case 'Object':
            return JSON.stringify(value) === '[]'
          default:
            return false // 其他对象均视作非空
        }
      }

    }
  }
}

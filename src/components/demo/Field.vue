<template>

  <div>

    <lar-ui-plane>
      <lar-field-input v-model="action" />

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ input }}
        </template>
        <lar-field-input v-model="input" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-input v-model=&quot;input&quot; :action=&quot;action&quot;></lar-field-input>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ img }} <br> 上传单图
        </template>
        <lar-field-image v-model="img" :action="action" :data="imgData" />
        <template slot="code">
          <code
            v-text="`
                     <lar-field-image v-model=&quot;img&quot; :action=&quot;action&quot; :data=&quot;imgData&quot;></lar-field-image>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ imgs }} <br> 上传多图
        </template>
        <lar-field-image v-model="imgs" field-multi="true" :action="action" :data="imgData" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-image fieldMulti=&quot;true&quot; v-model=&quot;imgs&quot; :action=&quot;action&quot; :data=&quot;imgData&quot; ></lar-field-image>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ time }}
        </template>
        <lar-field-timestamp v-model="time" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-timestamp v-model=&quot;time&quot; :action=&quot;action&quot;></lar-field-timestamp>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <!--时间筛选相关-->
      <lar-ui-tutorial>
        <template slot="header">
          值:{{ timestamp }}
        </template>
        <lar-field-time v-model="timestamp" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-time v-model=&quot;timestamp&quot; :action=&quot;action&quot;></lar-field-time>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ datetime }}
        </template>
        <lar-field-datetime v-model="datetime" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-datetime v-model=&quot;datetime&quot; :action=&quot;action&quot;></lar-field-datetime>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ date }}
        </template>
        <lar-field-date v-model="date" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-date v-model=&quot;date&quot; :action=&quot;action&quot;></lar-field-date>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ imgurl }} <br>用来显示远程图标的
        </template>
        <lar-field-imgurl v-model="imgurl" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-imgurl v-model=&quot;imgurl&quot; :action=&quot;action&quot;></lar-field-imgurl>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ boole }} <br>用来显示远程图标的
        </template>
        <lar-field-checkbox v-model="boole" :action="action" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-checkbox v-model=&quot;boole&quot; :action=&quot;action&quot;></lar-field-checkbox>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ boole }} <br>普通下拉
        </template>
        <lar-field-select v-model="select" :action="action" :field-option="fieldOption" />
        <template slot="code">
          <code
            v-text="`
                        <lar-field-select v-model=&quot;boole&quot; :action=&quot;action&quot; :fieldOption=&quot;fieldOption&quot;></lar-field-select>
                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ remoteSelect }} <br>远程下拉
        </template>
        <lar-field-select v-model="remoteSelect" :action="action" :field-link="selectLink" />
        <template slot="code">
          <pre>
                    <code
v-text="`
                         其中fieldLink中存储了链表的相关信息
                            &quot;url&quot;:&quot;http://test.54blues.com/api/manager/address/address?pageSize=10&page=1&quot;,  //获取数据的地方
                            &quot;select&quot;: [&quot;id&quot;,&quot;id&quot;,&quot;name&quot;],  5=>5,姓名,余额20元     //展示哪些字段,第一个为key.
                            &quot;show&quot;: &quot;edit\\/shop.shop\\/{{id}}&quot;  //关联展示详情的地方
                         <lar-field-select v-model=&quot;remoteSelect&quot; :action=&quot;action&quot; :fieldLink=&quot;selectLink&quot;></lar-field-select>

                     `"
/>
                     </pre>
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ remoteMSelect }} <br>远程下拉,多选
        </template>
        <lar-field-select
          v-model="remoteMSelect"
          field-multi="true"
          :action="action"
          :field-link="selectLink"
        />
        <template slot="code">
          <code
            v-text="`
                         其中fieldLink中存储了链表的相关信息
                        <lar-field-select v-model=&quot;remoteMSelect&quot; fieldMulti=&quot;true&quot; :action=&quot;action&quot; :fieldLink=&quot;selectLink&quot;></lar-field-select>

                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          值:{{ remoteMSelect }} <br>远程下拉,多选
        </template>
        <lar-field-editor v-model="editor" />
        <template slot="code">
          <code
            v-text="`
                         其中fieldLink中存储了链表的相关信息
                        <lar-field-select v-model=&quot;remoteMSelect&quot; fieldMulti=&quot;true&quot; :action=&quot;action&quot; :fieldLink=&quot;selectLink&quot;></lar-field-select>

                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          textarea:{{ input }} <br>
        </template>
        <lar-field-textarea v-model="input" :action="action" />
        <template slot="code">
          <code
            v-text="`
                         其中fieldLink中存储了链表的相关信息
                        <lar-field-textarea v-model=&quot;input&quot;  :action=&quot;action&quot; ></lar-field-textarea>

                     `"
          />
        </template>
      </lar-ui-tutorial>

      <lar-ui-tutorial>
        <template slot="header">
          number:{{ input }} <br>
        </template>
        <lar-field-number v-model="input" :action="action" />
        <template slot="code">
          <code
            v-text="`
                         其中fieldLink中存储了链表的相关信息
                          <lar-field-number v-model=&quot;input&quot;  :action=&quot;action&quot; ></lar-field-number>

                     `"
          />
        </template>
      </lar-ui-tutorial>

    </lar-ui-plane>
  </div>

</template>
<script>
export default {
  data() {
    return {
      boole: true,
      action: 'edit',
      input: '测试值',
      time: '2018-05-05 00:00:00',
      timestamp: '1527844587',
      date: '2018-05-05',
      datetime: '2018-05-05 00:00:00',
      img: '',
      imgs: [],
      imgurl: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      imgData: { 'img_big': {}, 'img_small': {}},
      select: 2,
      remoteSelect: '',
      remoteMSelect: '',
      selectLink: {
        'url': 'http://vue.lar/api/manager/address/city?pageSize=50&page=1',
        'select': ['id', 'name']
        // "show": "edit\/address.city\/{{id}}"//展示的时候,用来关联
      },
      fieldOption: {
        '测试': '测试',
        2: '测试2'
      },
      editor: '<b>测试</b>'

    }
  }
}
</script>
<style>
</style>

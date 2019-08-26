export default {
    created() {
        this.myValue = this.value

        if (this.schema && this.schema.search_model) {
            this.searchModel = this.schema.search_model;
        }
    },
    props: {
        data: {//对应整个列的完整数据, 方便你根据上下文进行数据处理. 部分链表的必须用.
        },
        schema: {},
        action: {
            type: String,
            default: 'edit'//edit,table,search   操作的场景
        },
        fieldKey: {  //字段名的key.  部分链表的必须用.
            // required: true,
            type: String,
            default: '',
        },
        fieldName: {  // placeholder
            type: String,
            default: '',
        },
        value: {
            default: '',
        } //传入的value值.
    },
    mounted() {
        //告诉系统.搜索用什么模式
        this.$emit('searchModel', this.searchModel);
    },
    data() {
        return {
            searchModel: 'equal',//equal,like,link链表
            myValue: this.value
        }
    },
    watch: {
        //实现v-model
        myValue: function (newValue, oldValue) {
            if (newValue == 'all') {
                this.myValue = '';
            }
            this.$emit('input', this.myValue);

        },
        //实现v-model
        value: function (newQuery) {
            this.myValue = this.value;
        },
    },
    methods: {
        quickChange: function () {
            this.$emit('quick-change', this.value);
        }
    }
}

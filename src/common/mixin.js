import {formatDate} from '@/common/utils'

export const tagStyle = {
  filters:{
    getLevel(num){
      switch (num){
        case '0': case 0:
          return '一级';
        case '1': case 1:
          return '二级';
        case '2': case 2:
          return '三级';
      }
    },
    getTagColor(num){
      switch (num){
        case '0': case 0:
          return 'primary';
        case '1': case 1:
          return 'success';
        case '2': case 2:
          return 'warning';
      }
    }
  }
}
export const pagination = {
  methods:{
    //监听 pagesize改变的事件
    handleSizeChange(newSize){
      this.$emit('handleSizeChange',newSize)
    },
    //监听 页码改变的事件
    handleCurrentChange(newPage){
      this.$emit('handleCurrentChange', newPage)
    }
  }
}

export const addDialogCom = {
  props:{
    isShow:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    isFalse() {
      this.$emit('isFalse')
    },
    commit() {
      this.$refs.formRef.validate(valid =>{
        if(!valid) return
        this.$emit('commit', this.message)
      })
    },
    showMes(mes) {
      return '请输入' + mes
    }
  }
}

export const showTime = {
  filters:{
    showDate: function (value) {
      let date = new Date(value*1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}

export const res = {
  "data": [
    {
      "time": "2018-05-10 09:39:00",
      "ftime": "2018-05-10 09:39:00",
      "context": "已签收,感谢使用顺丰,期待再次为您服务",
      "location": ""
    },
    {
      "time": "2018-05-10 08:23:00",
      "ftime": "2018-05-10 08:23:00",
      "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
      "location": ""
    },
    {
      "time": "2018-05-10 07:32:00",
      "ftime": "2018-05-10 07:32:00",
      "context": "快件到达 [北京海淀育新小区营业点]",
      "location": ""
    },
    {
      "time": "2018-05-10 02:03:00",
      "ftime": "2018-05-10 02:03:00",
      "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
      "location": ""
    },
    {
      "time": "2018-05-09 23:05:00",
      "ftime": "2018-05-09 23:05:00",
      "context": "快件到达 [北京顺义集散中心]",
      "location": ""
    },
    {
      "time": "2018-05-09 21:21:00",
      "ftime": "2018-05-09 21:21:00",
      "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
      "location": ""
    },
    {
      "time": "2018-05-09 13:07:00",
      "ftime": "2018-05-09 13:07:00",
      "context": "顺丰速运 已收取快件",
      "location": ""
    },
    {
      "time": "2018-05-09 12:25:03",
      "ftime": "2018-05-09 12:25:03",
      "context": "卖家发货",
      "location": ""
    },
    {
      "time": "2018-05-09 12:22:24",
      "ftime": "2018-05-09 12:22:24",
      "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
      "location": ""
    },
    {
      "time": "2018-05-08 21:36:04",
      "ftime": "2018-05-08 21:36:04",
      "context": "商品已经下单",
      "location": ""
    }
  ],
  "meta": { "status": 200, "message": "获取物流信息成功！" }
}


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
    },
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

<template>
<div>
  <el-tag
    :key="index"
    v-for="(tag,index) in tagArr"
    closable
    :disable-transitions="false"
    @close="closeTag(index)">
    {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="$event.target.blur()"
    @blur="handleInputConfirm"/>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</div>
</template>

<script>
import {tagStyle} from '@/common/mixin'

export default {
  name: "params_tabs_table_tag",
  props:{
    scope: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      tagArr: [],
      inputVisible: false,
      inputValue: '',
      tagsStr: ''
    }
  },
  created() {
    this.getTags()
  },
  methods:{
    //删除tag时的操作
    closeTag(i){
      this.tagArr.splice(i, 1)
      this.updateMes()
    },
    getTags(){
      if(this.scope.attr_vals){
        this.tagArr = this.scope.attr_vals.split(' ')
        console.log(this.tagArr)
      }
    },
    showInput(){
      this.inputVisible = true;
      //让文本框获得焦点
      //$nextTick方法作用：当页面上的元素被重新渲染之后，才会回调函数中的代码
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //添加tag时的操作
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tagArr.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.updateMes()
    },
    updateMes(){
      const message = {
        attr_name: this.scope.attr_name,
        attr_sel: this.scope.attr_sel,
        attr_vals: this.tagArr.join(' ')
      }
      this.$emit('updateTags', message, this.scope.attr_id)
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input placeholder="商品查询" clearable @clear="getGoodsMes" v-model="goodsMes.query">
        <el-button slot="append" icon="el-icon-search" @click="getGoodsMes"/>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button
        type="primary"
        round @click="dialogVisible">
        添加商品
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "goods_addGoods",
  props:{
    goodsMes: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    dialogVisible(){
      this.$emit('addGoods')
    },
    getGoodsMes(){
      this.$emit('getGoodsMes')
    }
  }
}
</script>

<style scoped>

</style>

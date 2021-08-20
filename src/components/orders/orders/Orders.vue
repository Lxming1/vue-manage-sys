<template>
<div>
  <breadcrumb>
    <span slot="one">订单管理</span>
    <span slot="two">订单列表</span>
  </breadcrumb>
  <el-card>
    <orders_table
      :goods="orderList"
      :total="total"
      :goodsMes="queryInfo"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      />
<!--    @change="change"-->
<!--    @reGet="reGet"-->
<!--    @editUserMes="editUserMes"-->
<!--    @updateMes="getUsersMes"-->
  </el-card>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import orders_table from './childComponents/orders_table'
export default {
  name: "Orders",
  components:{
    breadcrumb,
    orders_table
  },
  created() {
    this.getOrderList()
  },
  data(){
    return{
      queryInfo:{
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      orderList: [],
      total: 0
    }
  },
  methods:{
    async getOrderList(){
      const  {data: res} = await this.$http.get('orders', {
        params: this.queryInfo
      })
      if(res.meta.status !== 200) return this.$message.error('获取订单数据失败！')
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    //分类项一页显示多少数据
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    //分类项当前有多少页数据
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
  }
}
</script>

<style scoped>

</style>

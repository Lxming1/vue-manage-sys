<template>
  <div>
    <!--    表格区域-->
    <el-table
      class="table"
      :data="goods"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="90px"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="90px">
        <template slot-scope="scope">
          <el-tag :type="payStatus(scope.row)">{{isPay}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="90px"></el-table-column>
      <el-table-column prop="mg_state" label="下单时间" width="200px">
        <template slot-scope="scope">
            {{scope.row.create_time | showDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140px">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="修改地址" placement="top" :enterable="false">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="editPositon(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="物流进度" placement="top" :enterable="false">
            <el-button icon="el-icon-location" type="success" size="mini" @click="progress(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--      分页区域-->
    <el-pagination
      class="el-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsMes.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="goodsMes.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <edit_position :isShow="showEditDialog" @isFalse="showEditDialog = false"/>
    <progress_dialog :isShow="showProgress" @isFalse="showProgress = false" :progressMes="progressMes"/>
  </div>
</template>

<script>
import {pagination, showTime, res} from '@/common/mixin'
import edit_position from './orders_table_editPositon'
import progress_dialog from './orders_table_progressDialog'

export default {
  name: "orders_table",
  mixins: [pagination, showTime],
  components:{
    edit_position,
    progress_dialog
  },
  props:{
    goods: {
      type: Array,
      default(){
        return []
      }
    },
    total:{
      type: Number,
      default: 0
    },
    goodsMes:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      isPay: '',
      showEditDialog: false,
      showProgress: false,
      progressMes: []
    }
  },
  methods:{
    payStatus(mes){
      if(mes === 0){
        this.isPay = '未付款'
        return 'danger'
      }else {
        this.isPay = '已付款'
        return 'success'
      }
    },
    editPositon(){
      this.showEditDialog = true
    },
    progress(){
      this.getProgress()
      this.showProgress = true
    },
    getProgress(){
      this.progressMes = res.data
      console.log(res.data)
    }
  }
}
</script>

<style scoped>
.table{
  font-size: 13px;
}
</style>

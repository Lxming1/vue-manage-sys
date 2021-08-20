<template>
  <el-dialog
    title="物流进度"
    :visible.sync="isShow"
    width="50%"
    @close="isFalse"
    :before-close="isFalse"
    :close-on-click-modal="false">
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="(activity, index) in progressMes"
        :key="index"
        :timestamp="activity.time">
        {{activity.context}}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script>
export default {
  name: "orders_table_progressDialog",
  props:{
    progressMes:{
      type: Array,
      default(){
        return []
      }
    },
    isShow:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    isFalse(){
      this.$emit('isFalse')
    }
  }
}
</script>

<style scoped>

</style>

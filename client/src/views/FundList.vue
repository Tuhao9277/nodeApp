<template> 
<div class="fillContainer">
  <el-table :data="tableData" v-if="tableData.length>0" max-height="450" style="width: 100%">
    <el-table-column prop="date" align="center" label="创建时间" width="250">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" align="center" label="收支类型" width="150"></el-table-column>
    <el-table-column prop="describe" align="center" label="收支描述" width="180"></el-table-column>
    <el-table-column prop="income" align="center" label="收入" width="170">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="color: #00d053">{{ scope.row.income }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expend" align="center" label="支出" width="170">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="color: #f56767">{{ scope.row.extend }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="cash" align="center" label="账户现金" width="170">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="color: #4db3ff">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" align="center" label="备注" width="220"></el-table-column>
     <el-table-column 
     prop="operation"
     align="center"
     fixed="right"
      width="180"
     label="操作">
      <template slot-scope="scope">
        <el-button
          type="warning"
          size="small"
          icon="edit"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          icon="delete"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
     getProfile() {
                // 请求后端服务，获取表格数据
                this.$axios.get("/api/profiles/list")
                    .then(res => {
                        console.log(res)
                        // this.allTableData = res.data;
                        // this.filterTableData = res.data;
                        //设置分页数据
                        // this.setPaginations();
                    })
                    .catch(err => console.log(err));
    },
    handleEdit(index,row){
      console.log(123)
    },
    handleDelete(index,row){
     console.log(456)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .fillContainer
    width 100%
    height 100%
    padding 16px 
    box-sizing border-box
</style>

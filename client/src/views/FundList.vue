<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item>
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker
          >···
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" icon="search" @click="handleSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btnRight" v-if="user.identity == 'manager'">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" max-height="450" style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="创建时间"
          width="220"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="收支类型"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="describe"
          align="center"
          label="收支描述"
          width="100"
        ></el-table-column>
        <el-table-column prop="income" align="center" label="收入" width="100">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" align="center" label="支出" width="100">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          align="center"
          label="账户现金"
          width="120"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
          width="100"
        ></el-table-column>
        <el-table-column
          v-if="user.identity == 'manager'"
          prop="operation"
          align="center"
          fixed="right"
          width="180"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.page_layout"
              :total="paginations.page_total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/DiaLog'
export default {
  name: 'fundList',
  components: {
    Dialog,
  },
  data() {
    return {
      search_data: {
        startTime: '',
        endTime: '',
      },
      paginations: {
        page_index: 1, // 当前位于的页数
        page_total: 0, // 总数
        page_size: 5, // 一页显示的条数
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        page_layout: 'total,sizes, prev, pager,next, jumper',
      },
      alltableData: [],
      dialog: {
        show: false,
        title: '',
        option: 'edit',
      },
      filterTableData: [],
      tableData: [],
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: '',
      },
    }
  },
  created() {
    this.getProfile()
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    getProfile() {
      // 请求后端服务，获取表格数据
      this.$axios
        .get('/api/profiles/list')
        .then(res => {
          this.alltableData = res.data
          this.filterTableData = res.data
          //设置分页数据
          this.setPaginations()
        })
        .catch(err => console.log(err))
    },
    handleEdit(index, row) {
      //
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit',
      }
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      }
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`api/profiles/delete/${row._id}`)
        .then(result => {
          this.$message('删除成功')
          this.getProfile()
        })
        .catch(err => {})
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add',
      }
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: '',
      }
      this.dialog.show = true
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.tableData = this.alltableData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1)
      // 数据总数
      let nums = this.paginations.page_size * page
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.alltableData[i]) {
          tables.push(this.alltableData[i])
        }
        this.tableData = tables
      }
    },
    handleSearch() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间',
        })
        this.getProfile()
        return
      }
      const sTime = this.search_data.startTime.getTime()
      const eTime = this.search_data.endTime.getTime()
      this.alltableData = this.filterTableData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })
      this.setPaginations()
    },
    setPaginations() {
      // 分页属性设置
      this.paginations.page_total = this.alltableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认的分页数据
      this.tableData = this.alltableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.btnRight {
  float: right;
}

.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>

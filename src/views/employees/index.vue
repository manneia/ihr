<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools show-before>
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="visible = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="tableData" style="width:100%">
          <el-table-column label="序号" type="index" :index="indexMethod" fixed width="80" />
          <el-table-column fit label="姓名" prop="username" sortable />
          <el-table-column fit label="工号" prop="workNumber" sortable />
          <el-table-column fit label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" sortable>
            <!-- <template slot-scope="{row}">
              {{ EmployeeEnum.hireType.find(item => item.id === row.formatEmployment)? EmployeeEnum.hireType.find(item => item.id === row.formatEmployment).value : '未知' }}
            </template> -->
          </el-table-column>
          <el-table-column fit label="部门" prop="departmentName" sortable />
          <el-table-column fit label="入职时间" prop="timeOfEntry" sortable align="center">
            <template slot-scope="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column fit label="账户状态" prop="enableState" sortable align="center">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column fit label="操作" fixed="right" width="250">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
              <el-button type="text" size="small" @click="handleClick(row)">转正</el-button>
              <el-button type="text" size="small" @click="handleClick(row)">调岗</el-button>
              <el-button type="text" size="small" @click="handleClick(row)">离职</el-button>
              <el-button type="text" size="small" @click="handleClick(row)">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <AddEmployees :visible.sync="visible" @refresh="getEmployeeList" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployees from './components/add-employees.vue'
export default {
  components: { AddEmployees },
  data() {
    return {
      tableData: [],
      loading: false,
      EmployeeEnum: EmployeeEnum,
      page: {
        page: 1,
        size: 10
      },
      total: 0, // 总数
      visible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    indexMethod(index) {
      return (this.page.page - 1) * this.page.size + index + 1
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 获取员工列表
    async getEmployeeList() {
      this.loading = true
      try {
        const { total, rows } = await getEmployeeList(this.page)
        this.tableData = rows
        this.total = total
        this.loading = false
      } catch (error) {
        this.$message.error('数据获取失败')
      }
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗', '删除员工', { type: 'warning' })
        await delEmployee(id)
        this.$message.success('删除员工成功')
      } catch (error) {
        this.$message.error('删除员工失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
	.header {
		display: flex;
		justify-content: right;
	}
</style>

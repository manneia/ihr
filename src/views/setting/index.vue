<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
            <el-table :data="data" style="margin-top: 15px" border>
              <el-table-column label="序号" type="index" width="80px" />
              <el-table-column label="角色" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column fixed="right" label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success" @click="handle(row)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination :total="total" :page-size="pageSize" :current-page="page" layout="prev, pager, next" @current-change="changePage" />
          </el-tab-pane>
          <el-tab-pane label="公司设置">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form disabled style="margin-top: 50px">
              <el-form-item label="公司名称" label-width="120px">
                <el-input v-model="companyInfo.name" style="width: 60%" />
              </el-form-item>
              <el-form-item label="公司邮箱" label-width="120px">
                <el-input v-model="companyInfo.mailbox" style="width: 60%" />
              </el-form-item>
              <el-form-item label="公司地址" label-width="120px">
                <el-input v-model="companyInfo.companyAddress" style="width: 60%" />
              </el-form-item>
              <el-form-item label="备注" label-width="120px">
                <el-input v-model="companyInfo.remarks" style="width: 60%" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <AddRole ref="role" :visible.sync="visible" :active-node="activeNode" @refresh="getRoleList" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, delRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import AddRole from './components/add-role.vue'

export default {
  components: { AddRole },
  data() {
    return {
      companyInfo: {
        name: '',
        mailbox: '',
        remarks: '',
        companyAddress: '' // 公司地址
      },
      data: [],
      page: 1,
      pageSize: 10,
      total: 0,
      visible: false,
      activeNode: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getCompanyInfo() {
      // companyId 一般保存在用户信息中
      this.companyInfo = await getCompanyInfo(this.userInfo.companyId)
    },
    async getRoleList() {
      const res = await getRoleList({ page: this.page, pagesize: this.pageSize })
      const { total = 0, rows = [] } = res
      this.total = total
      this.data = rows
    },
    changePage(page) {
      this.page = page
      this.getRoleList()
    },
    async delRole(row) {
      try {
        // 弹出确认框
        await this.$confirm('是否删除角色,删除角色将不可恢复,是否继续?', '删除角色', {
          type: 'warning'
        })
        // 调接口
        await delRole(row.id)
        // 消息提示
        this.$message.success('删除角色成功')
        // 刷新数据
        this.getRoleList()
      } catch (error) {
        this.$message.error('删除角色失败')
      }
    },
    async handleEdit(row) {
      try {
        await this.$refs.role.getRoleDetail(row)
        this.activeNode = row
        this.visible = true
      } catch (error) {
        this.$message.error('详情获取失败')
      }
    },
    addRole() {
      this.activeNode = {}
      this.visible = true
    }
  }
}
</script>

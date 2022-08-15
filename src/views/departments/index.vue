<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <TreeTools :tree-node="company" :is-root="true" />
        <el-tree :data="treeNode" :props="defaultProps" :expand-on-click-node="false" default-expand-all>
          <!-- 有多少个节点就渲染多少次 -->
          <TreeTools slot-scope="{ data }" style="width: 100%" :tree-node="data" @command="handlerCommand" />
        </el-tree>
      </el-card>
      <addDepartment ref="addDepart" :visible="visible" :tree-node="activeNode" @close="visible = false" @refresh="getDepartments()" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import addDepartment from './components/add-department.vue'
import { getDepartments, delDepartment } from '@/api/department'
import { tranListToTreeData } from '@/utils'
export default {
  components: { TreeTools, addDepartment },
  data() {
    return {
      treeNode: [],
      company: {},
      defaultProps: {
        label: 'name'
      },
      activeNode: {}, // 记录当前操作的节点
      visible: false // 控制弹窗的显示
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人' }
      this.treeNode = tranListToTreeData(res.depts, '')
    },
    async handlerCommand(command, node) {
      // 记录当前操作的数据
      this.activeNode = { ...node }
      if (command === 'del') {
        this.$confirm('确认删除该部门吗?此操作不可逆', '删除部门', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // TODO: 调用删除接口,重新获取部门数据
          await delDepartment(node.id)
          this.$message.success('删除部门成功')
          this.getDepartments()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (command === 'add') {
        // activeNode 父节点
        this.visible = true
      } else if (command === 'edit') {
        // activeNode 当前节点
        // 错误的抛出也是遵循冒泡的,所以在上层直接抓取错误
        try {
          await this.$refs.addDepart.getDepartDetail(this.activeNode.id)
          this.visible = true
        } catch (error) {
          this.$message.error('获取部门详情失败,请重新获取')
        }
      }
    }
  }
}
</script>

<style scoped></style>

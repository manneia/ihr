<template>
  <el-dialog :title="activeNode.id ? '编辑角色' : '新增角色'" :visible="visible" @close="handleCancel">
    <el-form ref="Form" :model="roleForm" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="roleForm.name" style="width: 80%" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" style="width: 80%" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, getRoleDetail, updateRole } from '@/api/setting'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    activeNode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.activeNode.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        // 消息提示
        this.$message.success('操作成功')
        // 关闭弹窗
        this.$emit('update:visible', false)
        // 刷新
        this.$emit('refresh')
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    handleCancel() {
      // 表单数据初始化
      this.roleForm = {
        name: '',
        description: ''
      }
      // 清空表单
      this.$refs.Form.resetFields()
      // 关闭弹窗
      this.$emit('update:visible', false)
    },
    async getRoleDetail(row) {
      try {
        const res = await getRoleDetail(row)
        this.roleForm = { ...res }
      } catch (error) {
        this.$message.error('获取失败')
      }
    }
  }
}

</script>

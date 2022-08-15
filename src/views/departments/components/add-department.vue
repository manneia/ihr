<template>
  <el-dialog title="新增部门" :visible="visible" @close="handlerCancel">
    <el-form ref="departForm" :model="departForm" :rules="rules">
      <el-form-item label="部门名称" prop="name" label-width="120px">
        <el-input v-model="departForm.name" style="width: 80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code" label-width="120px">
        <el-input v-model="departForm.code" style="width: 80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager" label-width="120px">
        <el-select v-model="departForm.manager" style="width: 80%" placeholder="请选择" filterable @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce" label-width="120px">
        <el-input v-model="departForm.introduce" style="width: 80%" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handlerCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDepartDetail, updateDepartment } from '@/api/department'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    treeNode: {
      type: Object,
      required: true
    }
  },
  data() {
    const validName = async(rule, value, callback) => {
      const departs = await getDepartments()
      if (this.departForm.id) {
        // 过滤自身 编辑场景下,treeNode是当前节点 departForm等价
        const result = departs.depts.filter(item => item.id !== this.departForm.id)
        // 第二步,找兄弟节点, 编辑时treeNode是当前节点 pid只能是treeNode.pid
        const res = result.filter(item => item.pid === this.treeNode.pid)
        res.find(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      } else {
        // 新增时treeNode是父节点 departForm是新增的子节点
        const res = departs.depts.filter(item => item.pid === this.treeNode.id)
        res.find(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      }
    }
    const validCode = async(rule, value, callback) => {
      // 提升代码稳定性
      try {
        const departs = await getDepartments()
        if (this.departForm.id) {
          // 过滤自身
          const result = departs.depts.filter(item => item.id !== this.departForm.id)
          result.find(item => item.code === value) ? callback(new Error('部门编码重复')) : callback()
        } else {
          departs.depts.find(item => item.code === value) ? callback(new Error('部门编码重复')) : callback()
        }
      } catch (error) {
        callback(new Error('获取部门详情失败,请重新校验'))
      }
    }
    return {
      departForm: {
        name: '', // 部门名称
        manager: '', // 部门负责人
        code: '', // 部门编码
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称是必填项', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称是1到50个字符长度', trigger: 'blur' },
          {
            validator: validName,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门负责人是必填项', trigger: 'blur' },
          { min: 1, max: 50, message: '部门负责人是1到50个字符长度', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码是必选', trigger: 'blur' },
          {
            validator: validCode,
            trigger: 'blur'
          }
        ],
        introduce: [{ min: 1, max: 300, message: '介绍是1到300个字符长度', trigger: 'blur' }]
      },
      peoples: []
    }
  },
  created() {
    this.getEmployeeSimple()
  },
  methods: {
    // 获取员工简单列表数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    async  handleSubmit() {
      try {
        // 校验表单
        await this.$refs.departForm.validate()
        if (this.departForm.id) {
          await updateDepartment(this.departForm)
        } else {
          await addDepartment({ ...this.departForm, pid: this.treeNode.id })
        }
        // 消息提示
        this.$message.success('操作成功')
        // 关闭弹窗
        this.$emit('close')
        // 刷新
        this.$emit('refresh')
      } catch (error) {
        this.$message.error('新增失败')
      }
    },
    handleCancel() {
      // 表单数据初始化
      this.departForm = {
        name: '', // 部门名称
        manager: '', // 部门负责人
        code: '', // 部门编码
        introduce: '' // 部门介绍
      }
      // 清空表单
      this.$refs.departForm.resetFields()
      // 关闭弹窗
      this.$emit('close')
    },
    // 根据id获取员工详情
    async getDepartDetail(id) {
      // id 不使用 treeNode.id 原因是,它是异步的
      this.departForm = await getDepartDetail(id)
    }
  }
}
</script>

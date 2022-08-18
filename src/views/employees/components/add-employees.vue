<template>
  <el-dialog title="新增员工" :visible="visible" @close="handleCancel">
    <el-form ref="Form" :model="EmployeesForm" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="EmployeesForm.username" style="width: 50%" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="EmployeesForm.mobile" style="width: 50%" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="EmployeesForm.timeOfEntry" type="date" style="width: 50%" picker-options="选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="EmployeesForm.formOfEmployment" style="width: 50%" placeholder="请选择">
          <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="EmployeesForm.workNumber" style="width: 50%" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="EmployeesForm.departmentName" style="width: 50%" placeholder="请选择部门" @focus="getDepartments" />
        <!-- 放置一个tree组件 -->
        <el-tree v-if="showTree" v-loading="loading" :data="treeData" default-expand-all :props="{ label: 'name' }" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="EmployeesForm.correctionTime" type="date" style="width: 50%" picker-options="选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleCancel">取消</el-button>
          <el-button type="primary" size="small" @click="handleSubmit">确认</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/department'
import { addEmployee } from '@/api/employees'
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'

export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      EmployeesForm: {
        username: '', // 姓名
        mobile: '', // 手机号
        timeOfEntry: '', // 入职时间
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        correctionTime: '' // 转正时间
      },
      EmployeeEnum: EmployeeEnum,
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '转正时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCancel() {
      // 表单数据初始化
      this.EmployeesForm = {
        username: '', // 姓名
        mobile: '', // 手机号
        timeOfEntry: '', // 入职时间
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        correctionTime: '' // 转正时间
      }
      // 清空表单
      this.$refs.Form.resetFields()
      this.showTree = false
      // 关闭弹窗
      this.$emit('update:visible', false)
    },
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      // depts是数组 但不是树形
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.EmployeesForm.departmentName = node.name
      this.showTree = false
    },
    async handleSubmit() {
      // 表单校验
      await this.$refs.Form.validate()
      // 调用接口
      await addEmployee(this.EmployeesForm)
      // 消息提示
      this.$message.success('新增员工成功')
      // 关闭弹窗
      this.$emit('update:visible', false)
      // 刷新数据
      this.$emit('refresh')
    }
  }
}
</script>

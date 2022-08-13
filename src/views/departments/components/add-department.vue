<template>
  <el-dialog title="新增部门" :visible.sync="visible">
    <el-form :model="departForm" :rules="rules">
      <el-form-item label="部门名称" prop="name" label-width="120px">
        <el-input v-model="departForm.name" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code" label-width="120px">
        <el-input v-model="departForm.code" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager" label-width="120px">
        <el-select v-model="departForm.manager" style="width:80%">
          <el-option>123</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce" label-width="120px">
        <el-input v-model="departForm.introduce" style="width:80%" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }

  },
  data() {
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
          { min: 1, max: 50, message: '部门名称是1到50个字符长度', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人是必填项', trigger: 'blur' },
          { min: 1, max: 50, message: '部门负责人是1到50个字符长度', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码是必选', trigger: 'blur' }
        ],
        introduce: [
          { min: 1, max: 300, message: '介绍是1到300个字符长度', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped></style>

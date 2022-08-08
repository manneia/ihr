<template>
  <el-card>
    <!--
			ref绑定在组件 指向组件实例
			绑定到元素上 指向元素
		-->
    <el-form ref="loginForm" :model="loginForm" :rules="rules">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="loginForm.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">确认</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
/**
   * 是异步的解决方案 解决了回调地狱的问题,但是没有解决链式调用的问题
   * 三个状态 pending等待中  fulfilled成功 rejected 失败
   * 状态 pending --> fulfilled [new Promise() resolve,  Promise.resolve()]
   * 		 pending --> rejected [new Promise() reject, Promise.reject()]
   * 状态不可以由fulfilled变为rejected
   * Promise 是构造函数
   * 原型上的方法 [.then, .catch, ]
   * 构造函数上的方法[.all{传入Promise组成的数组 所有的promise执行成功才会触发then}, .race, .resolve, .reject]
   */
/**
   * async await 必须是成对存在的 await等待成功的回调 需要包含在try catch中
   */
/**
   *事件循环机制 event loop
   *  先执行同步,,后执行异步
   * 异步分为微任务 和宏任务 先执行微任务
   * 微任务:promise
   * 宏任务:定时器,请求
   */
export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '手机号是必填项', trigger: 'blur' },
          { pattern: /^1[3~9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码是必填项', trigger: 'blur' },
          // { min: 6, max: 12, message: '密码长度为6~12位', trigger: 'blur' }
          {
            /**
               *
               * @param {pattern} rule
               * @param {string} value
               * @param {Function} callback
               * @description {text} validator是一个函数 (rule, value, callback)=>{
               *	rule---验证规则
               *  value---输入框校验的值
               *  callback---回调函数
               * }
               */
            validator: (rule, value, callback) => {
              value.length < 6 || value.length > 12 ? callback(new Error('密码长度为6~12位')) : callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      /**
         * isOk true表示验证通过
         */
      // this.$refs.loginForm.validate(isOk => {
      //   console.log(isOk)
      // })
      // this.$refs.loginForm.validate().then(res => {
      //   console.log('res', res)
      // })
      try {
        await this.$refs.loginForm.validate()
      } catch (error) {
        this.$message('数据格式错误')
      }
    },
    handleReset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="scss"></style>

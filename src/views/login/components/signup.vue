<template>
  <div>
    <el-form
      class="signupForm"
      label-width="80px"
      :model="form"
      ref="form"
      status-icon
      :rules="rules"
      :hide-required-asterisk="true"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          type="text"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPass"
      >
        <el-input
          type="password"
          v-model="form.confirmPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          round
          type="primary"
          native-type="submit"
          :loading="loading"
          @click.prevent="submitHandler()"
        >注册</el-button>
        <el-button
          round
          @click="cancel()"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') callback(new Error('请输入密码'))
      else {
        if (this.$refs.form.confirmPass !== '') this.$refs.form.validateField('confirmPass')
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') callback(new Error('请再次输入密码'))
      else if (value !== this.form.password) callback(new Error('两次输入的密码不一致'))
      else callback()
    }
    return {
      form: {
        username: '',
        password: '',
        confirmPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    cancel () {
      this.$refs['form'].resetFields()
      this.$emit('cancel')
    },
    submitHandler () {
      this.$refs['form'].validate(v => {
        if (v) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            window.console.log(this.qs.stringify(this.form))
            this.$refs['form'].resetFields()
            this.$emit('cancel')
          }, 1000)
        }
      })
    }
  }
 }
</script>

<style lang="css" scoped>
.signupForm {
  width: 300px;
}
</style>
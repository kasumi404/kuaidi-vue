<template>
  <div class="login_page">
  	<div class="contianer">
  		<div class="contianer_tip">
			<p>快递管理系统</p>
		</div>
		<div class="contianer_form">
			<div class="loginform">
				<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
					<el-form-item prop="username">
					<span class="svg-container">
					  <svg-icon icon-class="user" />
					</span>
					<el-input
					  class="login_input"
					  v-model="loginForm.username"
					  placeholder="用户名"
					  name="username"
					  type="text"
					  auto-complete="on"
					/>
					</el-form-item>

					<el-form-item prop="userpassword">
					<span class="svg-container">
					  <svg-icon icon-class="password" />
					</span>
					<el-input
					  class="login_input"
					  type="password"
					  v-model="loginForm.userpassword"
					  placeholder="密码"
					  name="userpassword"
					  auto-complete="on"
					  @keyup.enter.native="handleLogin" />
					
					</el-form-item>
					<el-button class="login_button" :loading="loading" type="primary" @click.native.prevent="handleLogin">登陆</el-button>
		    	</el-form>
			</div>
		</div>
  	</div>
  </div>
</template>

<!-- <template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>elm后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
</template> -->

<script>
import {login} from '@/api/login'
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        this.$message.error('用户名不能为空');
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        this.$message.error('密码不能为空');
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        userpassword: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        userpassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    handleLogin() {
    	
    		this.loading = true
    		this.$store
	            .dispatch('LoginByUsername', this.loginForm)
	            .then(response => {
	            	console.log(response)
	              this.$message({
			            type: 'success',
			            message: '登陆成功！'
			          	});
	              this.loading = false
	              this.$router.push({ path: '/' })
	            })
	            .catch(() => {
	              this.$message.error('登录失败！');
	              this.loading = false
	            })
      /*this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('login', this.loginForm)
            .then(() => {

              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })*/
    }
  }
}
</script>

<style>
	.login_page{
		position: fixed;
	    height: 100%;
	    width: 100%;
		background-color: #324057;
		background-size: 100%;
		text-align: center;
	}
	.login_input .el-input__inner{
		background-color: #eee;
	}
	.login_input {
	    margin-top: 10px;
	    margin-left: 0;
	    width: 80%;
	}
	.login_button{
		margin-top: 10px;
		height: 40px;
	    width: 85%;
	}
	.contianer{
		position: fixed;
		width: 400px;
		height: 400px;
		top: 20%;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	.contianer_tip{
		color: white;
		font-size: 30px;
		font-style: bold;
		margin-top: 20px;
	}
	.contianer_form{
		height: 270px;
		background-color: white;
		border-radius: 10px;
		padding: 10px;
	}
	.login-form{
		margin-top: 25px;
	}
	
</style>

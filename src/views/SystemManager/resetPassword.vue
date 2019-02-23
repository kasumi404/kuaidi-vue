<template>
    <div class="fillcontain">
        <header class="password_title">修改密码</header>
        <div class="password_reset">

            <el-form :rules="rules" :model="resetPasswordForm" ref="resetPasswordForm" label-width="110px" class="form build_form">
                <el-form-item label="原密码" prop="password">
                    <el-input v-model="resetPasswordForm.password" type="password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                    <el-input v-model="resetPasswordForm.newpassword" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="comfortpassword">
                    <el-input v-model="comfortpassword" type="password" placeholder="请确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPassword" class="submit_btn">确认修改</el-button>
                </el-form-item>
            </el-form>

           <!-- <el-form :model="resetPasswordForm" :rules="rules" ref="resetPasswordForm">
                <el-form-item prop="password">
                    <p class="password_context">原密码：</p>
                    <el-input type="password" v-model="resetPasswordForm.password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item prop="newpassword">
                    <p class="password_context">新密码：</p>
                    <el-input type="password" v-model="resetPasswordForm.newpassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <p class="password_context">确认密码：</p>
                    <el-input type="password" v-model="resetPasswordForm.newpassword" placeholder="请确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('resetPasswordForm')" class="submit_btn">确认修改</el-button>
                </el-form-item>
            </el-form> -->
        </div>
    </div>
</template>

<script>
    import store from '@/store'
    import {login,updatePassword} from '@/api/manage'
    export default {
        components: {
            
        },
        data(){
            return {
                resetPasswordForm: {
                    username: '',
                    password: '',
                    newpassword: '',
                },
                comfortpassword: '',
                rules: {
                    /*username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],*/
                },
            }
        },
        methods: {
            resetPassword(){
                if(this.resetPasswordForm.newpassword === this.comfortpassword){
                    this.resetPasswordForm.username = store.getters.name;
                    console.log(this.resetPasswordForm.username+"huhih")
                    login(this.resetPasswordForm.username,this.resetPasswordForm.password).then(res => {
                        if(res.data.result === 200){
                            updatePassword(res.data.manage.id,this.resetPasswordForm.newpassword).then(response => {
                                if(response.data.result === 200){
                                    this.$message({
                                        type: 'success',
                                        message: '密码修改成功！'
                                        });
                                    this.resetPasswordForm = {
                                        username: '',
                                        password: '',
                                        newpassword: '',
                                    }
                                    this.comfortpassword = '';
                                }
                                else{
                                    this.$message.error('未知错误！');
                                }
                                setTimeout(() => {
                                  
                                }, 1 * 1000)
                              })
                        }
                        else if (res.data.result === 400) {
                            this.$message.error(res.data.message);
                        }
                        else{
                            this.$message.error('未知错误！');
                        }
                    })
                }
                else{
                    this.$message.error('确认密码有误！');
                }
            }
        }
    }
</script>

<style>
    .password_reset{
        width: 30%;
        background-color: #F9FAFC;
        min-height: 250px;
        margin: 20px auto 0;
        padding: 30px 30px 15px 30px;
        border-radius: 10px;
    }
    .password_title{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }
    .password_context{
        text-align: left;
        font-size: 20px;
        color: #333;
    }
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }
    .build_form{
        border: 1px solid #eaeefb;
        padding: 10px 80px 10px 20px;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .submit_btn{
        margin: 0 auto;
    }
</style>

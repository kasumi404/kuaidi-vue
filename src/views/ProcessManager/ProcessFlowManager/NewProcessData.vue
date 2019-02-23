<template>
  <div id="newProcessData-container">
    <div class="form-container">
      <el-card style="width:65%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm" inline="true">
          <el-form-item label="选择工艺路线：" prop="processroute">
            <el-autocomplete v-model="ruleForm.processroute" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>
          <el-form-item label="工序编号：" prop="password">
            <el-input v-model="ruleForm.username"/>
          </el-form-item>
          <el-form-item label="工序名称：" prop="username">
            <el-input v-model="ruleForm.username"/>
          </el-form-item>
          <el-form-item label="加工顺序：" prop="jobnumber">
            <el-input-number v-model="ruleForm.voltageLimits" :precision="2" :step="0.01" :max="10"/>
          </el-form-item>
          <el-form-item label="最小等待时间（分钟）：" prop="stationcode">
            <el-input-number v-model="ruleForm.voltageLimits" :precision="2" :step="0.01" :max="10"/>
            <el-form-item label="最大等待时间（分钟）：" prop="roleid" >
              <el-input-number v-model="ruleForm.voltageLimits" :precision="2" :step="0.01" :max="10"/>
            </el-form-item>
            <el-form-item label="最大返工次数：" prop="position">
              <el-input-number v-model="ruleForm.voltageLimits" :precision="2" :step="0.01" :max="10"/>
            </el-form-item>
            <el-form-item label="跳转工序标识：" prop="telnumber">
              <el-select v-model="ruleForm.roleid" placeholder="请选择" style="width:300px;">
                <el-option v-for="item in roleDatas" :key="item.roleid" :label="item.rolename" :value="item.roleid"/>
              </el-select>
            </el-form-item>
            <el-form-item label="检验标识：" prop="email">
              <el-select v-model="ruleForm.roleid" placeholder="请选择" style="width:300px;">
                <el-option v-for="item in roleDatas" :key="item.roleid" :label="item.rolename" :value="item.roleid"/>
              </el-select>
            </el-form-item>
            <el-form-item label="是否外协：" prop="updatetime">
              <el-select v-model="ruleForm.roleid" placeholder="请选择" style="width:300px;">
                <el-option v-for="item in roleDatas" :key="item.roleid" :label="item.rolename" :value="item.roleid"/>
              </el-select>
            </el-form-item>
            <el-form-item label="单位：" prop="updateuser">
              <el-select v-model="ruleForm.roleid" placeholder="请选择" style="width:300px;">
                <el-option v-for="item in roleDatas" :key="item.roleid" :label="item.rolename" :value="item.roleid"/>
              </el-select>
            </el-form-item>
            <el-form-item label="描述：" prop="radio">
              <el-input :rows="5" v-model="ruleForm.remark" type="textarea" placeholder="请输入备注内容"/>
            </el-form-item>
            <div class="commit">
              <el-form-item>

                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="goback">取消</el-button>

              </el-form-item>
            </div>
        </el-form-item></el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'

export default {
  name: 'NewUserl',
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      radio: '1',
      ruleForm: {
        loginname: '', // 登录名称
        password: '', // 登录密码
        username: '', // 姓名
        roleid: '', // 角色id
        jobnumber: '', // 工号
        stationcode: '', // 工号代码
        position: '', // 公司职位
        telnumber: '', // 联系电话
        email: '', // 邮箱
        updatetime: '', // 日期
        updateuser: ''
      },
      rules: {
        // 登录名称
        loginname: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 登录密码
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 姓名
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 工号
        jobnumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 工号代码
        stationcode: [
          { required: true, message: '请输入工号代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 角色id
        roleid: [{ required: true, message: '请选择角色id', trigger: 'blur' }],
        // 公司职位
        position: [
          { required: true, message: '请输入公司职位', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 联系电话
        telnumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到11 个字符', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到20 个字符', trigger: 'blur' }
        ],
        // 日期
        updatetime: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        updateuser: [
          { required: true, message: '请输入操作员', trigger: 'blur' }
        ]
      },
      roleDatas: []
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.getRoleDatas()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var qs = require('qs')
          var instance = this.$axios.create({
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          })
          var params = {
            userid: 0,
            roleid: this.ruleForm.roleid,
            loginname: this.ruleForm.loginname,
            password: md5(this.ruleForm.password),
            username: this.ruleForm.username,
            jobnumber: this.ruleForm.jobnumber,
            stationcode: this.ruleForm.stationcode,
            position: this.ruleForm.position,
            telnumber: this.ruleForm.telnumber,
            email: this.ruleForm.email,
            updatetime: this.ruleForm.updatetime,
            updateuser: this.ruleForm.updateuser
          }
          instance
            .post('/apis/v1.0/User/Postsystem_user', qs.stringify(params))
            .then(res => {
              if (res.status == 200) {
                console.log(res)
                if (res.data.ResultCode == '200') {
                  alert('数据添加成功！')
                } else {
                  alert('数据添加发生错误，请稍候再试！')
                }
              }
            })
        } else {
          console.log('rerror submit!!')
          alert('验证失败，请检查输入的数据！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goback() {
      this.$router.replace('/UserManager')
    },
    getRoleDatas() {
      var qs = require('qs')
      var instance = this.$axios.create({
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
      var params = {
        PageIndex: 1,
        PageSize: 10
      }
      instance
        .post('/apis/v1.0/Role/Getsystem_role', qs.stringify(params))
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.List)
            for (var i = 0; i < res.data.List.length; i++) {
              var role = {
                roleid: res.data.List[i].roleid,
                rolename: res.data.List[i].rolename
              }
              this.roleDatas.push(role)
            }
          }
        })
    }
  }
}
</script>

<style scoped>
.title {
  width: 120px;
}
.el-input {
  width: 100%;
}

.el-form-item {
  margin-bottom: 22px;
  text-align: left;
}
.el-select {
  display: inline;
  position: relative;
}
#newUserl-container {
  width: 1100px;
}
.commit{
  text-align:center
}
</style>

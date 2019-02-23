<template>
  <div id="NewProcessLine-container">
    <div class="form-container">
      <el-card style="width:65%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm" inline="true">
          <el-form-item label="工艺路线编号：" prop="Processroutenumber">
            <el-input v-model="ruleForm.Processroutenumber"/>
          </el-form-item>
          <div class="commit">
            <el-form-item>

              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="goback">取消</el-button>

            </el-form-item>
          </div>
        </el-form>
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
        Processroutenumber: ''
      },
      rules: {

        Processroutenumber: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
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
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       var qs = require("qs");
    //       var instance = this.$axios.create({
    //         headers: { "content-type": "application/x-www-form-urlencoded" }
    //       });
    //       var params = {
    //         userid: 0,
    //         roleid: this.ruleForm.roleid,
    //         loginname: this.ruleForm.loginname,
    //         password: md5(this.ruleForm.password),
    //         username: this.ruleForm.username,
    //         jobnumber: this.ruleForm.jobnumber,
    //         stationcode: this.ruleForm.stationcode,
    //         position: this.ruleForm.position,
    //         telnumber: this.ruleForm.telnumber,
    //         email: this.ruleForm.email,
    //         updatetime: this.ruleForm.updatetime,
    //         updateuser: this.ruleForm.updateuser
    //       };
    //       instance
    //         .post("/apis/v1.0/User/Postsystem_user", qs.stringify(params))
    //         .then(res => {
    //           if (res.status == 200) {
    //             console.log(res);
    //             if (res.data.ResultCode == "200") {
    //               alert("数据添加成功！");
    //             } else {
    //               alert("数据添加发生错误，请稍候再试！");
    //             }
    //           }
    //         });
    //     } else {
    //       console.log("rerror submit!!");
    //       alert("验证失败，请检查输入的数据！");
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // goback() {
    //   this.$router.replace("/UserManager");
    // },
    // getRoleDatas() {
    //   var qs = require("qs");
    //   var instance = this.$axios.create({
    //     headers: { "content-type": "application/x-www-form-urlencoded" }
    //   });
    //   var params = {
    //     PageIndex: 1,
    //     PageSize: 10
    //   };
    //   instance
    //     .post("/apis/v1.0/Role/Getsystem_role", qs.stringify(params))
    //     .then(res => {
    //       if (res.status == 200) {
    //         console.log(res.data.List);
    //         for (var i = 0; i < res.data.List.length; i++) {
    //           var role = {
    //             roleid: res.data.List[i].roleid,
    //             rolename: res.data.List[i].rolename
    //           };
    //           this.roleDatas.push(role);
    //         }
    //       }
    //     });
    // }
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

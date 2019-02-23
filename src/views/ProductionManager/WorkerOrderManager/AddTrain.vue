<template>
  <div id="AddTrain-container">
    <div class="form-container">
      <el-row>
        <el-col>
          <h2 class="title">添加车次号</h2>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <el-card style="width:33%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="工单号：" prop="workeroderid">
            <el-input v-model="ruleForm.workeroderid"/>
          </el-form-item>

          <el-form-item label="生产批次：" prop="batch">
            <el-input v-model="ruleForm.batch" type="batch" autocomplete="off"/>
          </el-form-item>

          <el-form-item label="产品名称：" prop="produtcionname">
            <el-input v-model="ruleForm.produtcionname"/>
          </el-form-item>
          <template>
            <div class="datatable">
              <el-table :data="userDatas" style="width: 100%;">
                <el-table-column
                  v-for="(label,index) in labels"
                  :key="index"
                  :label="label.label"
                  :prop="label.prop"
                  width="110px"
                />
                <el-table-column fixed="right" label="操作" width="140px">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="deleteRow(scope.$index, userDatas)">
                      移除
                    </el-button>
                    <el-button type="text" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="goback">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'

export default {
  name: 'AddTrain',
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      radio: '1',
      ruleForm: {
        workeroderid: '', // 工单号
        batch: '', // 生产批次
        produtcionname: '' // 产品名称
      },
      userDatas: [],
      labels: [
        { label: '序号', prop: '' },
        { label: '车次号', prop: '' }
      ],
      rules: {
        // 工单号
        workeroderid: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 生产批次
        batch: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 产品名称
        produtcionname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
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
            workeroderid: this.ruleForm.workeroderid,
            batch: md5(this.ruleForm.batch),
            produtcionname: this.ruleForm.produtcionname
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
</style>

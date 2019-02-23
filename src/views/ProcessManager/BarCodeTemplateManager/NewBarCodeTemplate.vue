<template>
  <div id="newElectricTestingSpec-container">
    <div class="form-container">
      <el-card style="width:65%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="模板名称：" prop="TemplateName">
            <el-input v-model="ruleForm.TemplateName"/>
          </el-form-item>
          <el-form-item label="厂商代码：" prop="vendor">
            <el-input v-model="ruleForm.vendor"/>
          </el-form-item>
          <el-form-item label="产品类型代码：" prop="Producttypecode">
            <el-input v-model="ruleForm.Producttypecode"/>
          </el-form-item>
          <el-form-item label="电池类型代码：" prop="Batterytypecode">
            <el-input v-model="ruleForm.Batterytypecode"/>
          </el-form-item>
          <el-form-item label="规格代码：" prop="Specifications">
            <el-input v-model="ruleForm.Specifications"/>
          </el-form-item>
          <el-form-item label="追溯信息码：" prop="Traceability">
            <el-input v-model="ruleForm.Traceability"/>
          </el-form-item>
          <div class="commit">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="goback">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewElectricTestingSpec',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      ruleForm: {
        TemplateName: '', // 模板名称：
        vendor: '', // 厂商代码：
        Producttypecode: '', // 产品类型代码：
        Batterytypecode: '', // 电池类型代码：
        Specifications: '', // 规格代码：
        Traceability: '' // 追溯信息码：
      },
      rules: {
        // 模板名称：
        TemplateName: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 厂商代码：
        vendor: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 产品类型代码：
        Producttypecode: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 电池类型代码：
        Batterytypecode: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 规格代码：
        Specifications: [
          { required: true, message: '请输入工号代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 追溯信息码：
        Traceability: [
          { required: true, message: '请输入工号代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {

  }
}
</script>
<style scoped>
hr{
  background-color: #C0C0C0;
  height: 1px;
  border: none;
}
.explaintitle{
  border-left: 5px solid green;
  margin: 10px 10px 10px 8%;
  padding-left: 5px;
  font: 25px bold;
  text-align:left;
}
</style>


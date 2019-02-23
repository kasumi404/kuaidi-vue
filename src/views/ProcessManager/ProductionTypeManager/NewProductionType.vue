<template>
  <div id="newProductionType-container">
    <div class="form-container">
      <el-row>
        <el-col>
          <h2 class="title">新建产品类型</h2>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <el-card style="width:33%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="产品编码：" prop="productionTypeID">
            <el-input v-model="ruleForm.productionTypeID"/>
          </el-form-item>

          <el-form-item label="产品名称：" prop="productionTypeName">
            <el-input v-model="ruleForm.productionTypeName"/>
          </el-form-item>

          <el-form-item label="电池包内模组数量：" prop="moduleCount">
            <el-input-number v-model="ruleForm.moduleCount" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>

          <el-form-item label="模块内电芯数量：" prop="electricCount">
            <el-input-number v-model="ruleForm.electricCount" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>

          <el-form-item label="模组内串联数量：" prop="seriesCount">
            <el-input-number v-model="ruleForm.seriesCount" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>

          <el-form-item label="模组内并联数量：" prop="parallelCount" >
            <el-input-number v-model="ruleForm.parallelCount" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>

          <el-form-item label="描述：" prop="describe">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.describe" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <!-- <el-button @click="goback">返回</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewProductionType',
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }

    return {
      ruleForm: {
        productionTypeID: '', // 产品编号
        productionTypeName: '', // 产品名称
        describe: '', // 描述
        moduleCount: '1', // 电池包内模组数量
        electricCount: '1', // 模块内电芯数量
        seriesCount: '1', // 串联包内模组数量
        parallelCount: '1'// 并联包内模组数量
      },
      rules: {
        // 产品编号
        productionTypeID: [
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 产品名称
        productionTypeName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 电池包内模组数量
        moduleCount: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 模块内电芯数量
        electricCount: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 串联包内模组数量
        seriesCount: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 并联包内模组数量
        parallelCount: [{ required: true, message: '请输入数量', trigger: 'blur' }]
      }
    }
  },

  computed: {},

  created() {},
  mounted() {
  },
  methods: {

    handleChange(value) {
      console.log(value)
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

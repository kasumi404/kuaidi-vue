<template>
  <div id="newWork-container">
    <div class="form-container">

      <el-card style="width:550px">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="工单号：" prop="workorderID">
            <el-input v-model="ruleForm.workorderID"/>
          </el-form-item>

          <el-form-item label="分类：" prop="classes">
            <el-autocomplete v-model="ruleForm.classes" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>

          <el-form-item label="状态：" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/></el-select>
          </el-form-item>

          <el-form-item label="生产批次：" prop="batch">
            <el-input v-model="ruleForm.batch"/>
          </el-form-item>

          <el-form-item label="产品名称：" prop="productionname">
            <el-select v-model="ruleForm.productionname" placeholder="请选择"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/></el-select>
          </el-form-item>

          <el-form-item label="数量：" prop="count" >
            <el-input-number v-model="ruleForm.count" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>
          <el-form-item label="计划时间：" prop="plantime">
            <el-date-picker v-model="ruleForm.plantime" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="完成时间：" prop="completion">
            <el-date-picker v-model="ruleForm.completion" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="预计工时：" prop="Expected">
            <el-input-number v-model="ruleForm.Expected" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>
          <el-form-item label="订单号：" prop="Order">
            <el-input v-model="ruleForm.workorderID"/>
          </el-form-item>
          <el-form-item label="客户名称：" prop="customer">
            <el-input v-model="ruleForm.workorderID"/>
          </el-form-item>
          <el-form-item label="描述：" prop="describe">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.describe" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewWork',
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }

    return {
      ruleForm: {
        workorderID: '', // 工单号
        classes: '', // 分类
        state: '', // 状态
        count: '', // 数量
        batch: '', // 生产批次
        productionname: '', // 产品名称
        plantime: '', // 计划时间
        completion: '', // 完成时间
        Expected: '', // 预计工时
        Order: '', // 订单号
        customer: '', // 客户名称
        describe: ''// 描述
      },
      rules: {
        // 工单号
        workorderID: [
          { required: true, message: '请输入工单号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 分类
        classes: [
          { required: true, message: '请输入分类', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 状态
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 生产批次
        batch: [
          { required: true, message: '请输入生产批次', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 产品名称
        productionname: [
          { required: true, message: '请选择产品名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        // 数量
        count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 计划时间
        plantime: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        // 完成时间
        completion: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        // 预计工时
        Expected: [
          { required: true, message: '请选择预计工时', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到20 个字符', trigger: 'blur' }
        ],
        // 订单号
        Order: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到20 个字符', trigger: 'blur' }
        ],
        // 客户
        customer: [
          { required: true, message: '请输入客户', trigger: 'blur' }
        ]

      },
      options: [{
        value: '选项1',
        label: '状态1'
      }, {
        value: '选项2',
        label: '状态2'
      }]
    }
  },

  computed: {},

  created() {},
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' }

      ]
    },
    handleSelect(item) {
      console.log(item)
    },
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

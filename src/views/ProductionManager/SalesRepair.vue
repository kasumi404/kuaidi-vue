<template>
  <div id="oldTesting-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">售后/返修登记</div>
      <el-col :span="2"/>
      <el-col :span="20"><hr></el-col>
      <br>
      <div class="contenthead">
        <span>
          工单号：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in wordOrderID"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
        <span>
          生产批次：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in bantch"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
        <span>
          车次号：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in trainId"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
      </div>
      <el-form ref="oldTestingForm" :model="oldTestingForm" :rules="rules" direction="horizontal" class="oldTesting-form">

        <div class="TestingBox">
          <div v-for="(testingParameter,index) in oldTestingForm.testingParameters" :key="index" class="TestingUnit">
            {{ testingParameter.label }}<br>
            <div v-if="index == 0">
              <el-date-picker type="date" v-model="testingParameter.data" :class="{'Unqualified': testingParameter.Unqualified}" placeholder="选择日期"></el-date-picker>
            </div>
            <div v-else>
              <el-input v-model="testingParameter.data" :class="{'Unqualified': testingParameter.Unqualified}" type="text"/>
            </div>
          </div>
        </div>
        <div class="tabledata">
          <div>
            <span>售后时间</span>
            <span><el-button type="primary">添加行</el-button></span>
          </div>
          <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">

            <!-- 循环加载 -->
            <el-table-column v-for="(label,index) in labels" :key="index" :label=label.label :prop=label.prop  width="90px" align="center"></el-table-column>
            

            <el-table-column label="编辑" align="center" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                
                <el-popover placement="top" width="160" :ref="popover3"  v-model="scope.row.deleted">
                    <p>请问是否确定删除该条记录吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" @click="scope.row.deleted=false">取消</el-button>
                      <el-button type="danger" size="mini" @click="scope.row.deleted=false;handleDelete(scope.row)">确定</el-button>
                    </div>
                    <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <el-form-item :wrapper-col="wrapperColsubmit">
          <el-button type="primary" html-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OldTesting',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      labels: [
        { label: "序号", prop: "Numerical" },
        { label: "模块条码", prop: "Modulebarcode" },
        { label: "电芯条码", prop: "Batteriesbarcode" },
        { label: "电压（V）", prop: "voltage" },
        { label: "内阻（Ω）", prop: "Internalresistance" },
        { label: "测试时间", prop: "Testtime" },
        { label: "结果", prop: "Result" }
      ],
      value: '',
      wordOrderID: [{// 工单号
        value: '1',
        label: 'lady'
      }],
      bantch: [{// 生产批次
        value: '1',
        label: 'lady'
      }],
      trainId: [{// 车次号
        value: '1',
        label: 'lady'
      }],
      oldTestingForm: {
        testingParameters: [// 测试模块数据
          { label: '售后时间',data:"",Unqualified:false, name: '' },
          { label: '售后原因',data:"1",Unqualified:false, name: '' },
          { label: '售后方法',data:"1",Unqualified:false, name: '' }
        ],
        text: '1'
      },

      wrapperColsubmit: {
        span: 11
      },
      rules: {
        //     ProductionTypeID: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],ProductionTypeName: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],ProductionTypeSize: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],supAttribute: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],
      },
      loading: false,
      redirect: undefined
    }
  },

  watch: {
    'oldTestingForm.testingParameters': {
      handler(newValue, oldValue) {
        console.log('111')
        for (let i = 0; i < newValue.length; i++) {
          if (parseInt(newValue[i].data) > 10) {
            newValue[i].Unqualified = true
          } else {
            newValue[i].Unqualified = false
          }
        }
      },
      deep: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    isUnqualified: function(key) {
    },
    checkAll() {
      if (this.oldTestingForm.checkValue.length == this.oldTestingForm.options.length) {
        this.oldTestingForm.checkValue = []
        this.oldTestingForm.allChecked = false
        this.oldTestingForm.indeterminate = false
      } else {
        this.oldTestingForm.checkValue = JSON.parse(JSON.stringify(this.oldTestingForm.allCheckValue))
        this.oldTestingForm.allChecked = true
        this.oldTestingForm.indeterminate = false
      }
    },
    setState() {
      this.oldTestingForm.indeterminate = this.oldTestingForm.checkValue.length > 0 && this.oldTestingForm.checkValue.length < this.oldTestingForm.options.length
      this.oldTestingForm.allChecked = this.oldTestingForm.checkValue.length == this.oldTestingForm.options.length
    }

  }
}
</script>
<style scoped>
span{
  margin: 20px;
}
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
.TestingBox{
  margin: 10px 10px 10px 8%;
  padding: 5px;
  text-align:left;
  display: grid;
  grid-template-rows: 1fr ;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.TestingUnit{
  margin: 10px 10px 10px 8%;
  padding: 5px;
  text-align:left;
  width: 70%;
}
.contenthead {
  margin:2% 9% 3% 9%;
  text-align: left;
}
.tabledata {
  margin:2% 9% 3% 9%;
  text-align: left;
}
.Unqualified{
  background-color: red;
  border-color: red;
}
</style>
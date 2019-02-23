<template>
  <div id="components-layout-demo-side">
    <el-container>
      <el-main :style="{ background: '#fff'}">
        <div class="contenthead">
          <span>查询内容：<el-input placeholder="请输入工单号查询" style="width: 15%" @blur="blur('blur')"/></span>

          <span>
            <el-button type="primary" >查询</el-button>
          </span>
          <span>
            <el-button >重置</el-button>
          </span>
        </div>
        <div class="newbutton">
          <el-button type="primary">新建</el-button>
        </div>
        <div class="msg">
          <el-alert type="info" message="已查询5项" show-icon/>
        </div>
        <div class="datatable">
          <el-table :data="userDatas" style="width: 100%">
            <el-table-column v-for="(label,index) in labels" :key="index" :label="label.label" :prop="label.prop" fixed width="150"/>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, userDatas)">移除</el-button>
                <el-button type="text" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.contenthead {
  margin: 10px;
  text-align: left;
}

.newbutton {
  margin: 10px;
  padding: 10px;
  text-align: left;
}

span {
  margin: 10px;
}

.datatable {
  height: 600px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
}

.msg {
  padding-left: 20px;
  padding-right: 20px;
}
</style>

<script>
// import GetUserData from "./UserManager/GetUserData.js";
import GetNetData from '@/utils/GetNetData.js'
var strJson = ''
export default {
  data() {
    return {
      labels: [
        { label: '工单号', prop: 'ID' },
        { label: '分类', prop: 'name' },
        { label: '状态', prop: 'sex' },
        { label: '生产批次', prop: 'department' },
        { label: '产品名称', prop: 'role' },
        { label: '数量', prop: 'state' },
        { label: '车次号', prop: 'date' },
        { label: '计划时间', prop: 'date' },
        { label: '完成时间', prop: 'date' },
        { label: '预计工间', prop: 'date' },
        { label: '订单号', prop: 'date' },
        { label: '客户名称', prop: 'date' },
        { label: '描述', prop: 'describe' }
      ],
      userDatas: [],
      // loadData() {
      //   console.log(datas);
      //   return this.datas;
      // },
      //   loadData(pramas) {
      //     this.$axios.get("/apis/v1.0/User/Getsystem_user").then(result => {
      //       console.log(result.data);
      //       return result.data;
      //     });
      columns: [
      ],
      state: [{ value: '1', label: '有效' }, { value: '2', label: '失效' }] // 输入框选择项
    }
  },
  created() {
    // 使用axios请求
    // this.$axios
    //   .post("/apis/v1.0/User/Getsystem_user")
    //   .then(result => {
    //     strJson = result.data;
    //     console.log(strJson);
    //     this.userDatas = GetUserData(strJson);
    //     console.log(userDatas);
    //   })
    //   .catch(result => {
    //     console.log(result);
    //   });

    // 测试数据
    this.$axios
      .get('static/testdata.json')
      .then(result => {
        strJson = result.data
        console.log(strJson)
        this.userDatas = strJson.userDatas
        // this.userDatas = GetUserData(strJson);
        // console.log(userDatas);
      })
      .catch(result => {
        console.log(result)
      })
  },
  methods: {
    handleEdit: function(index, row) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (value == '' || value == null) return
          this.$http
            .post('url', { id: row.id, name: value }, { emulateJSON: true })
            .then(
              function(res) {
                this.loadData(this.criteria, this.currentPage, this.pagesize)
              },
              function() {
                console.log('failed')
              }
            )
        })
        .catch(() => {})
    },
    deleteRow(index, rows) {
      // 删除操作
      rows.splice(index, 1)
    }
  }
}
</script>

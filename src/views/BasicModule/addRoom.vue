<template>
    <div>
		<header class="header">快递信息管理</header>
		<div class="table_nav">
			用户姓名：
			<el-select clearable class="query_select" v-model="queryOptionsValue" placeholder="">
			    <el-option
			      v-for="item in queryOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-input clearable class="nav_input" v-model="searchValue1" placeholder="请输入"></el-input>
			快递状态：
			<el-select clearable class="query_select" v-model="searchValue2" placeholder="">
			    <el-option
			      v-for="item in queryOption2s"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-button class="nav_searchBtn" type="primary" @click="getRooms">搜索</el-button>
			
		</div>
		<div class="table_container">
			<el-table
		      :data="roomData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="expressId"
		        label="#"
		        width="50"
		        v-if="false"
		        >
		        <template slot-scope="scope">
		        	{{ scope.row.expressId }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressCode"
		        label="快递编号"
		        align="center"
		        width="100"
		        >
		        <template slot-scope="scope">
		        	{{ scope.row.expressCode }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="gool"
		        label="物品"
		        align="center"
		        width="100"
		        >
		        <template slot-scope="scope">
		        	{{ scope.row.gool.goolName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressFrom"
		        label="从"
		        align="center"
		        width="100">
		        <template slot-scope="scope">
		        	{{ scope.row.expressFrom }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressTo"
		        label="到"
		        align="center"
		        width="100">
		        <template slot-scope="scope">
		        	{{ scope.row.expressTo }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressPlace"
		        label="当前位置"
		        align="center"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.expressPlace }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressTime"
		        label="寄送时间"
		        align="center"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.expressTime }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressType"
		        label="快递状态"
		        align="center"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.expressType }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressFromInfo"
		        label="发货人"
		        align="center"
		        width="200">
		        <template slot-scope="scope">
		        	{{ scope.row.expressFromInfo.adminName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="expressToInfo"
		        label="收货人">
		        <template slot-scope="scope">
		        	{{ scope.row.expressToInfo.adminName }}
		        </template>
		      </el-table-column>
		      <el-table-column label="操作" width="200">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		    </el-table>

			<el-pagination
				:current-page.sync="pageIndex"
				:page-size="pageSize"
			    layout="prev, pager, next"
			    :total="25" 
			    style="margin:0 auto;text-align: center;"
			    @current-change="search">
			</el-pagination>

		    <el-dialog title="添加快递信息" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="roomForm" ref="roomForm" label-width="110px" class="form build_form">
				  		<el-form-item label="所属楼号">
							<el-select clearable class="query_select"  v-model="roomForm.buildno">
							    <el-option
							      v-for="item in buildNoOptions"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属楼层">
							<el-select clearable class="query_select" v-model="roomForm.roomlayer">
							    <el-option
							      v-for="item in roomLayerOptions"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>
						</el-form-item>
				  		<el-form-item label="快递号" prop="roomno">
							<el-input clearable v-model="roomForm.roomno" placeholder="请输入快递号"></el-input>
						</el-form-item>
						<el-form-item label="快递面积" prop="roomarea">
							<el-input clearable v-model="roomForm.roomarea" placeholder="请输入楼宇面积(单位：m²)"></el-input>
						</el-form-item>
					    <el-form-item label="快递类型" prop="roomtype">
							<el-input clearable v-model="roomForm.roomtype" placeholder="请输入快递类型"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="roomtext">
							<el-input clearable type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="roomForm.roomtext" placeholder="请输入楼宇备注"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addRoom">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑快递信息" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateRoomForm" ref="updateRoomForm" label-width="110px" class="form build_form">
				  		<el-form-item label="快递编号" prop="expressCode">
							<el-input clearable v-model="updateRoomForm.expressCode" :disabled="true"></el-input>
						</el-form-item>
					    <el-form-item label="物品" prop="goodNmae">
							<el-input clearable v-model="updateRoomForm.goodNmae" :disabled="true"></el-input>
						</el-form-item>
					    <el-form-item label="从" prop="expressFrom">
							<el-input clearable v-model="updateRoomForm.expressFrom" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="到" prop="expressTo">
							<el-input clearable v-model="updateRoomForm.expressTo" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="寄送时间" prop="expressTime">
							<el-input clearable v-model="updateRoomForm.expressTime"></el-input>
						</el-form-item>
						<el-form-item label="快递状态" prop="expressType">
							<el-input clearable v-model="updateRoomForm.expressType"></el-input>
						</el-form-item>
						<el-form-item label="当前位置" prop="expressPlace">
							<el-input clearable v-model="updateRoomForm.expressPlace"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="updateRoom">确 定</el-button>
				  </div>
				</el-dialog>
		</div>
    </div>
</template>

<script>
	import {fetchBuildNoList, fetchBuildLayerByBuildNo, fetchRoomList, addRoom, updateRoom, deleteRoom} from '@/api/room'
	import {getExpress,updateExpress,deleteExpress} from '@/api/express'
    export default {
    	data(){
    		return {
		        queryOptionsValue: 0,
		    	queryOptions: [{
		          value: 0,
		          label: '全部'
		        },
		        {
		          value: 1,
		          label: '按发货人'
		        }, {
		          value: 2,
		          label: '按收货人'
		        }],
		    	queryOption2s: [{
		          value: '全部',
		          label: '全部'
		        },
		        {
		          value: '已发货',
		          label: '已发货'
		        }, {
		          value: '未发货',
		          label: '未发货'
		        }, {
		          value: '已签收',
		          label: '已签收'
		        }],
    			pageIndex: 1,
    			pageSize: 5,
    			roomData: [],
		        updateRoomForm: {
	        		goodId:0,
		        	expressId: '',
		        	goodNmae: '',
		            expressFrom: '',
		            expressTo: '',
		            expressTime: '',
		            expressType: '',
					expressPlace: ''
		    	},
	    		roomForm: {
		            buildno: '',
		            roomlayer: '',
		            roomno: '',
		            roomarea: '',
		            roomtype: '',
					roomtext: ''
		    	},
		    	buildNoOptions: [

		    	],
		        roomLayerOptions: [

		        ],
				buildrules: {
					
				},
		        searchValue1: '',
		        searchValue2: '全部',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
    		}
    	},
    	created(){
            this.getRooms();
        },
    	methods: {
	      handleEdit(index, row) {
	        this.updateRoomForm={
	        		goodId:row.goodId,
	        		expressId: row.expressId,
	        		expressCode: row.expressCode,
		        	goodNmae: row.gool.goolName,
		            expressFrom: row.expressFrom,
		            expressTo: row.expressTo,
		            expressTime: row.expressTime,
		            expressType: row.expressType,
					expressPlace: row.expressPlace
		    	}
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {

	      	this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

        	deleteExpress(row.expressId).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '快递信息删除成功！'
			          	});
			        this.getRooms();
		        }
		        else if(response.data.result === 500){
		        	this.$message.error(response.data.result.message);
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      },
	      search(){
      		fetchRoomList(this.searchValue1,this.searchValue2,this.pageIndex,this.pageSize).then(response => {
      			console.log(response.data)
		        if(response.data.length <= 0){
		        	this.$message.error('请输入正确的楼宇号与楼层！');
		        }
		        else{
		        	this.roomData = response.data
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      addRoom(){
	      	addRoom(this.roomForm).then(response => {
	      		console.log(response)
		        if(response.data === 1){
		        	this.$message({
			            type: 'success',
			            message: '快递信息录入成功！'
			          	});
		        	this.addDialogFormVisible = false;
		        	this.roomForm = {
		        		buildno: '',
			            roomlayer: '',
			            roomno: '',
			            roomarea: '',
			            roomtype: '',
						roomtext: ''
					}
			        this.getRooms();
		        }
		        else if(response.data === 0){
		        	this.$message.error('快递信息录入失败！');
		        }
		        else if(response.data === 2){
		        	this.$message.error('该快递号已存在！');
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      updateRoom(){
	      	console.log(this.updateRoomForm.goodId)
	      	updateExpress(this.updateRoomForm.expressId,this.updateRoomForm.goodId,this.updateRoomForm.goodNmae,this.updateRoomForm.expressFrom,this.updateRoomForm.expressTo,this.updateRoomForm.expressTime,this.updateRoomForm.expressType,this.updateRoomForm.expressPlace).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '快递信息修改成功！'
			          	});
		        	this.updateDialogFormVisible = false;
		        	this.updateRoomForm = {
		        		goodId:0,
			        	expressId: '',
			        	goodNmae: '',
			            expressFrom: '',
			            expressTo: '',
			            expressTime: '',
			            expressType: '',
						expressPlace: ''
		        		}
			        this.getRooms();
		        }
		        else if(response.data.result === 500){
		        	this.$message.error(response.data.message);
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      getRooms(){
	      	console.log(this.queryOptionsValue,this.searchValue1,this.searchValue2,this.pageIndex,this.pageSize)
	      	getExpress(this.queryOptionsValue,this.searchValue1,this.searchValue2,this.pageIndex,this.pageSize).then(response => {
	      		console.log(response.data)
		        this.roomData = response.data.express
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
          },
	    },
    	components: {
    	}
    }
</script>

<style>
	.header{
		text-align: center;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 20px;
		font-weight: bold;
	}
	.table_nav{
        padding: 10px 50px;
    }
    .table_nav .nav_input{
    	width: 130px;
    }
    .table_nav .nav_addBtn{
    	float: right;
    }
	.table_container{
        padding: 10px 50px;
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
    .table_nav .query_select{
    	width: 130px;
    }
</style>

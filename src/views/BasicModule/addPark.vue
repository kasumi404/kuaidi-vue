<template>
    <div>
		<header class="header">快递员信息管理</header>
		<div class="table_nav">
			快递员姓名：
			<el-input clearable class="nav_input" v-model="searchValue" placeholder="请输入"></el-input>
			<el-button class="nav_searchBtn" type="primary" @click="search">搜索</el-button>
			<el-button class="nav_addBtn" type="primary" @click="addDialogFormVisible = true">添加快递员信息</el-button>
		</div>
		<div class="table_container">
			<el-table
		      :data="parkData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="courierName"
		        label="姓名"
		        width="160">
		        <template slot-scope="scope">
		        	{{ scope.row.courierName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="courierCall"
		        label="电话"
		        width="350">
		        <template slot-scope="scope">
		        	{{ scope.row.courierCall }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="courierIdCard"
		        label="身份证"
		        width="350">
		        <template slot-scope="scope">
		        	{{ scope.row.courierIdCard }}
		        </template>
		      </el-table-column>
		      <el-table-column
		      	label="负责快递详情"
		      	width="300">
			      <template slot-scope="scope">
			        <el-button
			          size="mini" type="primary"
			          @click="handleSee(scope.$index, scope.row)">查看</el-button>
			      </template>
			    </el-table-column>
		      <el-table-column
		      	label="操作"
		      	width="300">
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
			    :total="3" 
			    style="margin:0 auto;text-align: center;"
			    @current-change="search">
			</el-pagination>

		    <el-dialog title="添加快递员" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="addParkForm" ref="addParkForm" label-width="110px" class="form build_form">
				  		<el-form-item label="姓名" prop="courierName">
							<el-input clearable v-model="addParkForm.courierName" placeholder="请输入姓名"></el-input>
						</el-form-item>
				  		<el-form-item label="电话" prop="courierCall">
							<el-input clearable v-model="addParkForm.courierCall" placeholder="请输入电话"></el-input>
						</el-form-item>
						<el-form-item label="身份证" prop="courierIdCard">
							<el-input clearable v-model="addParkForm.courierIdCard" placeholder="请输入身份证"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addUser">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑快递员信息" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateParkForm" ref="updateParkForm" label-width="110px" class="form build_form">
						<el-form-item label="姓名" prop="courierName">
							<el-input clearable v-model="updateParkForm.courierName" placeholder="请输入姓名"></el-input>
						</el-form-item>
				  		<el-form-item label="电话" prop="courierCall">
							<el-input clearable v-model="updateParkForm.courierCall" placeholder="请输入电话"></el-input>
						</el-form-item>
						<el-form-item label="身份证" prop="courierIdCard">
							<el-input clearable v-model="updateParkForm.courierIdCard" placeholder="请输入身份证"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false;">取 消</el-button>
				    <el-button type="primary" @click="updateUser">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="负责快递详情信息" customClass="customWidth" :visible.sync="EVisible">
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
		    </el-table>
				</el-dialog>
		</div>
    </div>
</template>
<script>
	import store from '@/store'
	import {fetchUserList, fetchUserListByUserRoot, fetchUserListByUserName, addUser, deleteUser, updateUser} from '@/api/user'
	import {getCourier,updateCourier,register,getE,deleteCourier} from '@/api/courier'
    export default {
    	data(){
    		return {
    			expressType:'全部',
    			pageIndex: 1,
    			pageSize: 5,
    			parkData: [],
    			roomData:[],
		    	addParkForm: {
		    		courierName: '',
	    			courierCall: '',
	    			courierIdCard: '',
		    	},
		    	updateParkForm: {
		    		courierId: '',
		    		courierName: '',
	    			courierCall: '',
	    			courierIdCard: '',
		    	},
				buildrules: {
					
				},
				searchValue: '',
				comfortuserpassword: '',
				queryOptionsValue: 'parkid',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
		        EVisible: false,
    		}
    	},
    	created(){
            this.search();
        },
    	methods: {
	      handleEdit(index, row) {
	        this.updateParkForm={
	        		courierId: row.courierId,
	    			courierName: row.courierName,
	    			courierCall: row.courierCall,
	    			courierIdCard: row.courierIdCard,
		    	}
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {
	        this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

        	deleteCourier(row.courierId).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '用户信息删除成功！'
			          	});
			        this.search();
		        }
		        else if(response.data.result === 500){
		        	this.$message.error(response.data.result.message);
		        }
		        else{
		        	this.$message.error('请确认快递员的快递工作！');
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
      		getCourier(this.pageSize,this.pageIndex,this.searchValue).then(response => {
		    	console.log("typesearch"+response.data)
		        this.parkData = response.data.couriers
	        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		    })
	      },
	      addUser(){
      		register(this.addParkForm.courierName,this.addParkForm.courierCall,this.addParkForm.courierIdCard).then(response => {
		        // this.parkData = response.data
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '添加快递员成功！'
			          	});
		        	this.addDialogFormVisible = false;
		        	this.addParkForm = {
			    		courierName: '',
		    			courierCall: '',
		    			courierIdCard: '',
			        }
			        this.search()
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
	      handleSee(index, row){
			this.EVisible = true
      		getE(this.expressType,0,row.courierId).then(response => {
      			console.log(response)
      			this.roomData = response.data.express
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		    })
	      },
	      updateUser(){
      		updateCourier(this.updateParkForm.courierId,this.updateParkForm.courierName,this.updateParkForm.courierCall,this.updateParkForm.courierIdCard).then(response => {
		        // this.parkData = response.data
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '快递员信息修改成功！'
			          	});
		        	this.updateDialogFormVisible = false;
		        	this.updateParkForm = {
			    		courierId: '',
			    		courierName: '',
		    			courierCall: '',
		    			courierIdCard: '',
			            }
			        this.search()
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
	      getUsers(){
	      	console.log(store.getters.name)
	      	fetchUserList(this.pageIndex,this.pageSize).then(response => {
		        //console.log(response.data)
		        this.parkData = response.data
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
          }
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
	.customWidth{
        width:80%;
    }

	.table_nav{
        padding: 10px 50px;
    }
    .table_nav .query_select{
    	width: 130px;
    }
    .table_nav .nav_input{
    	width: 200px;
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
</style>

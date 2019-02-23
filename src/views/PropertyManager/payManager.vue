<template>
    <div>
		<header class="header">住户缴费管理</header>
		<div class="table_nav">
			<el-select class="query_select" v-model="queryOptionsValue" placeholder="按单元业主">
			    <el-option
			      v-for="item in queryOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-input class="nav_input" v-model="searchValue" placeholder="请输入"></el-input>
			<el-button class="nav_searchBtn" type="primary" @click="search">搜索</el-button>
			<!-- <el-button class="nav_addBtn" type="primary" @click="addDialogFormVisible = true">添加缴费信息</el-button> -->
		</div>
		<div class="table_container">
			<el-table
		      :data="holderData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="holderid"
		        label="#"
		        v-if="false">
		        <template slot-scope="scope">
		        	{{ scope.row.holderid }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holdername"
		        label="单元业主">
		        <template slot-scope="scope">
		        	{{ scope.row.holdername }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holdersex"
		        label="需缴费">
		        <template slot-scope="scope">
		        	{{ scope.row.holdersex }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holderword"
		        label="已缴费">
		        <template slot-scope="scope">
		        	{{ scope.row.holderword }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holdercall"
		        label="缴费时间">
		        <template slot-scope="scope">
		        	{{ scope.row.holdercall }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="parkpay"
		        label="处理人员编号">
		        <template slot-scope="scope">
		        	{{ scope.row.parkpay }}
		        </template>
		      </el-table-column>
		      <el-table-column
		      	label="操作"
		      	width="200">
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

		    <el-dialog title="添加报修信息" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="addHolderForm" ref="addHolderForm" label-width="110px" class="form build_form">

						<el-form-item label="单元业主">
							<el-select class="query_select" v-model="addHolderForm.holdersex">
							    <el-option
							      v-for="item in holderSexOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-form-item>
				  		<el-form-item label="报修类型" prop="holdername">
							<el-input-number v-model="addHolderForm.holdername" placeholder="请输入单元业主"></el-input-number>
						</el-form-item>
					    <el-form-item label="报修内容" prop="holderword">
							<el-input-number v-model="addHolderForm.holderword" placeholder="请输入职业"></el-input-number>
						</el-form-item>
						<el-form-item label="报修结果" prop="holdercall">
							<el-input-number v-model="addHolderForm.holdercall" placeholder="请输入联系电话"></el-input-number>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addUser">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑住户报修" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateHolderForm" ref="updateHolderForm" label-width="110px" class="form build_form">
						
						<el-form-item label="单元业主">
							<el-select class="query_select" v-model="addHolderForm.holdersex">
							    <el-option
							      v-for="item in holderSexOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-form-item>
				  		<el-form-item label="需缴费" prop="holdername">
							400
						</el-form-item>
					    <el-form-item label="已缴费" prop="holderword">
							<el-input-number v-model="addHolderForm.holderword" placeholder="请输入职业"></el-input-number>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false;">取 消</el-button>
				    <el-button type="primary" @click="updateUser">确 定</el-button>
				  </div>
				</el-dialog>
		</div>
    </div>
</template>
<script>
	import store from '@/store'
	import {fetchUserList, fetchUserListByUserRoot, fetchUserListByUserName, addUser, deleteUser, updateUser} from '@/api/user'
    export default {
    	data(){
    		return {
    			pageIndex: 1,
    			pageSize: 5,
    			holderData: [{
    				holderid: '',
    				holdername: '吴镇升',
    				holdersex: '400',
    				holderword: '0',
    				parkpay: '1',
    				holdercall: '',
    				holdertext: '400',
		          },
		          {
    				holderid: '',
    				holdername: '王健富',
    				holdersex: '480',
    				holderword: '200',
    				parkpay: '1',
    				holdercall: '2018-12-12',
    				holdertext: '480',
		          },
		          {
    				holderid: '',
    				holdername: '魏丽芳',
    				holdersex: '440',
    				holderword: '440',
    				parkpay: '1',
    				holdercall: '2018-12-12',
    				holdertext: '440',
		          }],
		        queryOptions: [{
		          value: 'holdername',
		          label: '按单元业主'
		        }, {
		          value: 'holdersex',
		          label: '按性别'
		        }, {
		          value: 'holderword',
		          label: '按职业'
		        }, {
		          value: 'holdercall',
		          label: '按联系电话'
		        }],
		    	addHolderForm: {
	    			holdername: '',
	    			holdersex: '',
	    			holderword: '',
	    			holdercall: '',
		            holdertext: '',
		    	},
		    	updateHolderForm: {
		    		holderid: '',
	    			holdername: '',
	    			holdersex: '',
	    			holderword: '',
	    			holdercall: '',
		            holdertext: '',
		    	},
		    	holderSexOptions: [{
		          value: 'man',
		          label: '吴镇升'
		        }, {
		          value: 'women',
		          label: '王健富'
		        }],
				buildrules: {
					
				},
				searchValue: '',
				comfortuserpassword: '',
				queryOptionsValue: 'holdername',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
    		}
    	},
    	created(){
            //this.getUsers();
        },
    	methods: {
	      handleEdit(index, row) {
	        this.updateHolderForm={
	        		holdername: row.holdername,
	        		holdersex: row.holdersex,
	        		holderword: row.holderword,
	        		holdercall: row.holdercall,
	        		holdertext: row.holdertext,
		    	}
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {
	        this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

	        	this.$message({
			            type: 'success',
			            message: '用户报修删除成功！'
			          	});

	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      },
	      search(){
	      	if(this.queryOptionsValue == "userroot"){
	      		fetchUserListByUserRoot(this.searchValue,this.pageIndex,this.pageSize).then(response => {
		        //console.log("typesearch"+response.data)
		        this.holderData = response.data
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else if(this.queryOptionsValue == "username"){
	      		fetchUserListByUserName(this.searchValue,this.pageIndex,this.pageSize).then(response => {
		        //console.log("typesearch"+response.data)
		        this.holderData = response.data
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else{
	      		this.$message.error('有哪里不对劲了！');
	      	}
	      },
	      addUser(){
	        	this.$message({
		            type: 'success',
		            message: '添加住户成功！'
		          	});
	        	this.addDialogFormVisible = false;
	        	this.addHolderForm = {
	        		holdername: '',
	    			holdersex: '',
	    			holderword: '',
	    			holdercall: '',
		            holdertext: '',
		        }
	      },
	      updateUser(){
	        	this.$message({
		            type: 'success',
		            message: '住户报修修改成功！'
		          	});
	        	this.updateDialogFormVisible = false;
	        	this.updateHolderForm = {
		        		holderid: '',
		    			holdername: '',
		    			holdersex: '',
		    			holderword: '',
		    			holdercall: '',
			            holdertext: '',
		            }
	      },
	      getUsers(){
	      	console.log(store.getters.name)
	      	fetchUserList(this.pageIndex,this.pageSize).then(response => {
		        //console.log(response.data)
		        this.holderData = response.data
		        
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

<template>
    <div>
		<header class="header">快递录入</header>
		<div class="table_nav">
			快递编号：
			<el-input clearable class="nav_input" v-model="searchValue" placeholder="请输入"></el-input>
			<el-button class="nav_searchBtn" type="primary" @click="search">搜索</el-button>
		</div>
		<div class="table_container">
			<el-form :rules="buildrules" :model="addHolderForm" ref="addHolderForm" label-width="110px" class="form build_form">

				<el-form-item label="快递编号">
					<el-input clearable class="nav_input" v-model="addHolderForm.expressCode" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="当前位置">
					<el-input clearable class="nav_input" v-model="addHolderForm.expressPlace" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="物品名称">
					<el-input clearable class="nav_input" v-model="addHolderForm.gool.goolName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="物品类型">
					<el-input clearable class="nav_input" v-model="addHolderForm.gool.goolType" placeholder="请输入"></el-input>
				</el-form-item>
		  		<el-form-item label="物品重量" prop="goolWeight">
					<el-input clearable class="nav_input" v-model="addHolderForm.gool.goolWeight" placeholder="请输入"></el-input>
				</el-form-item>
		  		<el-form-item label="录入情况" prop="expressType">
					{{addHolderForm.expressType}}
				</el-form-item>
				<el-button class="nav_searchBtn" type="primary" @click="submit">提交</el-button>
		  	</el-form>
		</div>
    </div>
</template>

<script>
	import store from '@/store'
	import BMap from 'BMap'
	import {getExpressByExpressCode,submitExpress} from '@/api/express'
    export default {
    	data(){
    		return {
    			pageIndex: 1,
    			pageSize: 5,
		    	addHolderForm: {
		    		expressId:'',
		    		goolId:0,
	    			expressCode: '',
	    			expressPlace: '',
	    			gool:{
		    			goolType: '',
		    			goolWeight: '',
		    			goolName: '',
	    			},
		            expressType: '----',
		    	},
				buildrules: {
					
				},
				searchValue: '',
				comfortuserpassword: '',
    		}
    	},
    	watch: {
  			searchValue(val) {
	        	this.search();
	    	}
	    },
    	created(){
            //this.getUsers();
            const geolocation = new BMap.Geolocation();
            var _this = this
            	console.log("city")
            geolocation.getCurrentPosition(function getinfo(position){
            	let city = position.address.city;             //获取城市信息
            	let province = position.address.province;    //获取省份信息
            	console.log(city)
            	console.log(province)
            }, function(e) {
            	_this.LocationCity = "定位失败"
            }, {provider: 'baidu'});
        },
    	methods: {
	      search(){
	      		getExpressByExpressCode(this.searchValue).then(response => {
		        //console.log("typesearch"+response.data)
		        console.log(response.data.express)
		        this.addHolderForm = response.data.express
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      submit(){
	      	if(this.addHolderForm.expressType = "申请中")
	      		this.addHolderForm.expressType = "未发货"
	      	console.log(this.addHolderForm)
	      	console.log(this.addHolderForm.goolId)
	      	submitExpress(this.addHolderForm.expressId,this.addHolderForm.goolId,
	      				this.addHolderForm.expressCode,
			      		this.addHolderForm.expressPlace,
			      		this.addHolderForm.gool.goolName,
			      		this.addHolderForm.gool.goolType,
			      		this.addHolderForm.gool.goolWeight,
			      		this.addHolderForm.expressType).then(response => {
		        console.log("typesearch"+response)
		        if(response.data.result == 200){
		        	this.$message({
			            type: 'success',
			            message: '提交成功！'
			          	});
		        }else{
		        	this.$message({
			            type: 'error',
			            message: response.data.message
			          	});
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      addUser(){
	        	this.$message({
		            type: 'success',
		            message: '添加投诉成功！'
		          	});
	        	this.addDialogFormVisible = false;
	        	this.addHolderForm = {
	    			expressCode: '',
	    			expressPlace: '',
	    			expressType: '',
	    			goolWeight: '',
	    			goolName: '',
		            expressType: '----',
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
    .nav_input{
    	width: 300px;
    }
    .table_nav .nav_addBtn{
    	float: right;
    }
	.table_container{
        padding: 10px 50px;
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

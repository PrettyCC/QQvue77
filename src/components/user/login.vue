<template>
    <div class='app-register'>
    <div class='bg'></div>
    <div class='bg1'></div>
     <mt-header fixed title='登录'>
         <router-link to='/index' slot='left'>
          <mt-button icon="back">返回</mt-button>
         </router-link>
     </mt-header>
    <div class='info'>
     <h2>用户登录</h2>
    <span>用户名:<input type='text' v-model='uname'></span><br>
    <span>密&nbsp;&nbsp;&nbsp;&nbsp;码:<input type='password' v-model='upwd'></span>
    <br>
    <button @click='login'>登录</button>  
    </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            uname:'',
            upwd:''
        }
    },
    methods:{
         login(){
         var uname=this.uname;
         var upwd=this.upwd;
        var url='http://127.0.0.1:3000/login?uname='+uname+'&upwd='+upwd;
        this.axios.get(url).then(result=>{
        if(result.data.code==1){
         sessionStorage.setItem('user',uname)
         Toast(result.data.msg);
         setTimeout(function(){
             location.href='#/index';
            //this.$router.push('/index')
         },1000)
        }else{
         Toast(result.data.msg);
                      }
                  })
                }
    }
}
</script>
<style>
.app-register{
    position:relative;
    height:800px;
}
.bg{
    background-image:url('http://127.0.0.1:3000/img/1.jpg');
    position:absolute;
    z-index:1;
    width:100%;
    height:800px;
    background-size:cover;
}
.bg1{
    position: absolute;
    background: rgba(250, 250, 250, 0.3);
    width: 100%;
    height: 800px;
    z-index: 2;
}
.info{
    position:relative;
    z-index:3;
}
h2{
    font-size: 25px !important;
    text-align: center;
    padding-top: 101px;
    color:#9da6f1
}
input[type='text']{
    width:80% !important;
    padding-top: 12px;
    margin-top: 29px;
    border-radius:4px;
    box-sizing:border-box;
    outline: 0;

}
input[type='password']{
    width:80% !important;
    padding-top: 12px;
    margin-top: 29px;
    border-radius:4px;
    box-sizing:border-box;
    outline: 0;

}
.info span:last-child input{
        margin-top: 6px;
}
 .info>button{
        width: 47%;
        /* color: #fff; */
        font-size: 16px;
        margin-bottom: 12px;
       background: #e7f2fc;
       margin-top: 23px;
      margin-left: 104px;
    }
</style>



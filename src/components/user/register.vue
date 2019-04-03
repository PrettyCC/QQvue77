<template>
    <div class='app-register'>
    <div class='bg'></div>
    <div class='bg1'></div>
     <mt-header fixed title='注册'>
         <router-link to='/login' slot='left'>
          <mt-button icon="back">返回</mt-button>
         </router-link>
     </mt-header>
    <div class='info'>
     <h2>用户注册</h2>
    <span>用户名:<input type='text' placeholder="至少为3~10位字符"  v-model='uname'></span><br>
    <span>密&nbsp;&nbsp;&nbsp;&nbsp;码:<input type='password' placeholder="至少为6~12位字符"  v-model='upwd'></span>
    <br>
    <button @click='register'>注册</button>  
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
         register(){
         var uname=this.uname;
         var upwd=this.upwd;
         if(uname==''){
           Toast("用户名不能为空");
           return;
         }
         if(upwd==''){
             Toast('密码格式输入错误');
             return;
         }
         var postData=this.qs.stringify({
             uname:uname,
             upwd:upwd
         })
        var url='http://127.0.0.1:3000/reg';
        this.axios.post(url,postData).then(result=>{
        if(result.data.code==1){
         Toast(result.data.msg);
        }else if(result.data.code=3){
           Toast(result.data.msg);
           var t=setInterval(function(){
          location.href='#/login';
           },3000)
             clearInterval(t);
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


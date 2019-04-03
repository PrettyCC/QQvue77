<template>
<div>
     <div class='tran'>
     <mt-header fixed title="歌单">
     <router-link to='/index' slot='left'>
        <mt-button icon='back'>返回</mt-button>
     </router-link>
    </mt-header>
    <div class='content' v-for='(item,i) of list' :key='i'>
        <img :src="item.img_url" alt="">
        <p>{{item.count}}次播放</p>
        <p>{{item.title}}</p>
    </div>

   <div class='app-menu'>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <h5>推荐歌单</h5>
                <span class="mui-icon-extra mui-icon-extra-heart"></span>
            </li>
				<li class="mui-table-view-cell mui-media vv"  v-for="(item,i) of list1" :key='i' >
						<div class="mui-media-body">
							<span>{{item.tname}}</span>
							<p class='mui-ellipsis'>
                               <span>{{item.tuname}}</span>
                            </p>
						</div>
                        <div class='bf'>
                        <audio src="img/sm.mp3" id='music'></audio>
                        <img src="http://127.0.0.1:3000/img/trans/bf.png" :data-id='i' @click='bf'>
                         <span class="mui-icon-extra mui-icon-extra-heart" id='heart' @click='store' :data-id='i'></span>
                         </div>
				</li>
        </ul>
    </div> 
    </div>
    <div class='player'>
            <div class="m">
            <img src="img/trans/1.jpg" alt="">
            </div>
			   <span class='c4'>{{sing}}</span>
               <span class='c1'>{{singer}}</span>
            <div class='bf1'>
            <span class='c3'>
                <audio src="img/sm.mp3" id='music'></audio>
                <img src="http://127.0.0.1:3000/img/trans/bf.png" ref='vb' class='bb' @click='bf1' id='v'> </span> 
             <span class="mui-icon mui-icon-bars c2"></span>      
    </div>
			</div>

           
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            lid:this.$route.query.lid,
            list:[],
            list1:[],
            sing:'',
            singer:'',
            id2:''
        }
    },
 created(){
     this.loadMore();
     this.getMenu()
 },
 methods:{
     loadMore(){
         var lid=this.lid;
           var url='http://127.0.0.1:3000/trans1?lid='+lid;
           this.axios.get(url).then(result=>{
               //console.log(result.data.data)
               this.list=result.data.data;
           })
     },
     getMenu(){
           var url='http://127.0.0.1:3000/menu?lid='+this.lid;
           this.axios.get(url).then(result=>{
               console.log(result.data.data)
               this.list1=result.data.data;
           })
     },
    store(e){
     if(!sessionStorage.getItem('user')){
        Toast('您还没登录,无法收藏');
        return;
     }
     var id=e.target.dataset.id;
     var pp=e.target.parentElement.previousElementSibling;
      var cname=pp.getElementsByTagName('span')[0].innerHTML;
      this.cname=cname;
      var uname=pp.getElementsByTagName('span')[1].innerHTML;
      this.uname=uname;
      var url='http://127.0.0.1:3000/getca?uname='+uname+'&cname='+cname;
      this.axios.get(url).then(result=>{
          if(result.data.code==2){
              //console.log(111)
              Toast(result.data.data);
              return;
          }else if(result.data.code==1){
              Toast(result.data.data);
          }
           
      })
     },
     bf(e){
         //获得当前用户id
         var id=e.target.dataset.id;    
         //当前用户的id赋值给一个变量
         var id1=id;
         //得到属性的父元素
        var cc=e.target.parentElement.previousElementSibling; 
        var bb=document.getElementsByClassName('bb');
        var player=document.getElementsByClassName('player')[0];
        player.style.display='block';
        var sing=cc.getElementsByTagName('span')[0].innerHTML;
        this.sing=sing;
        var singer=cc.getElementsByTagName('span')[1].innerHTML;
        this.singer=singer;
        var music=document.getElementById('music');
        var bf=document.getElementsByClassName('bf')[0];
        var x=this.$refs.vb;
        if(id==this.id2 || this.id2==''){
            if(music.paused){
                music.play();
                x.src='http://127.0.0.1:3000/img/trans/zt.png';
            }else{
                music.pause();
                x.src='http://127.0.0.1:3000/img/trans/bf.png';
            }
        }else{
             music.src='';
             music.src='img/sm.mp3';
             x.src='http://127.0.0.1:3000/img/trans/zt.png';
             music.play();
        }
         this.id2=id;
     },
     bf1(){
     var music=document.getElementById('music');
     console.log(music);
     var x=this.$refs.vb;
      if(music.paused){
                music.play();
                x.src='http://127.0.0.1:3000/img/trans/zt.png';
            }else{
                music.pause();
                x.src='http://127.0.0.1:3000/img/trans/bf.png';
            }
     }
 }
}
</script>
<style>
.content{
  width: 100%;
  height: 152px;
  background: #daced0
}
.content img{
    border: 0;
    width: 100px;
    border-radius: 8px;
    margin-top: 15px;
    margin-left:10px;
}
.content p{
    font-size: 14px;
    margin-top: -66px;
    margin-bottom: 10px;
    color: #8f8f94;
    margin-left: 114px;
}
.content p:last-child{
    font-size:16px;
    color:#000;
}
.mui-media-body{
    width: 85px;
    height: 40px;
}
.bf{
    width: 60px;
    height: 40px;
    margin-left: 275px;
    margin-top: -39px;
}
.bf img{
    width: 25px;
    height: 25px;
    margin-left: -16px;
}
.app-menu ul li:first-child{
    height:63px;
}
 .app-menu ul li:first-child h5{
margin-top: 12px;
}
.app-menu ul li:first-child .mui-icon-extra{
    margin-left:282px;
    margin-top:-5px;
}
.player{
  
    box-sizing: border-box;
    color: #333;
    width: 375px;
    height:70px;
    border:1px solid #ddd;
    bottom:0;
    padding-left: 16px;
    padding-right: 16px;
    background:#f7f7f7;
    text-align:center;
    position:fixed !important;
    display:none;
}
.m img{
    width:50px;
    height:50px;
    border-radius:5px;
    margin-top: 9px;
}
.m{
    width:50px;
}
 .c4{
    padding: 2px;
    margin-left: -168px;
    margin-top: -54px;
    display:block;
    font-size:14px;
}
.c1{
    padding: 2px;
    margin-left: -167px;
    margin-top:3px;
    display:block;
    font-size:14px;
}
.c3{
    padding: 2px;
   margin-left: 36px;
    margin-top: -50px;
}
.c2{
    padding: 2px;
   margin-left: 10px;
    margin-top: -40px;
}
.bf1{
    margin-top: -38px;
    margin-left: 188px;
}
.app-menu ul li:nth-child(1)~li{
    margin-top: 9px;
    padding-top: 22px;
}
</style>



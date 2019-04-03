<template>
    <div class='app-collect'>
        <div class='bg'>
            <h3>一秒入耳 • 邂逅春天里</h3>
        </div>
        <div class='bg-cover'>
        </div>
        <mt-header fixed title='收藏歌单'>
        <router-link to='/index' slot='left'>
          <mt-button icon="back">返回</mt-button>
         </router-link>
        </mt-header>
        <div class='show'>
           <ul class="mui-table-view">
               <li class='mui-table-view-cell mui-media'>
                  <h5>收藏歌单</h5>
               </li>
				<li class="mui-table-view-cell mui-media"  v-for="(item,i) of list" :key='i'>
						<img class="mui-media-object mui-pull-left">
                        <!-- <img :src="item.img1_url" mui-media-object mui-pull-right class='vc'> -->
						<div class="mui-media-body">
							<span>{{item.cname}}</span>
							<p class='mui-ellipsis'>
                               <span>{{item.uname}}</span>
                            </p>
						</div>
                         <div class='bf'>
                        <audio src="img/kl.mp3" id='music'></audio>
                        <img src="http://127.0.0.1:3000/img/trans/bf.png" :data-id='i'  @click='bf'>
                         </div>
				</li>
        </ul>
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
                <img src="http://127.0.0.1:3000/img/trans/bf.png" ref='vb' class='bb' id='v' @click='bf1' > </span>   
    </div>
	</div>
    <router-view ref='dd'></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
         list:'',
         sing:'',
         singer:''
        }
    },
    methods:{
        collect(){
            var uname=sessionStorage.getItem('user');
            console.log(uname);
            var url='http://127.0.0.1:3000/collect?uname='+uname;
            this.axios.get(url).then(result=>{
                console.log(result.data.data);
                this.list=result.data.data;
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
    },
    created(){
        this.collect();
    },
   
}
</script>
<style scoped>
.bg{
    background-image:url('http://127.0.0.1:3000/img/bg.jpg');
    width:100%;
    height:175px;
    position:absolute;
    margin-top:-180px;
    /* filter: blur(6px);  */
}
.bg h3{
    font-size: 20px;
    padding-top: 54px;
    padding-left: 133px;
    color: #8f8f94;
}
.bg-cover{
   background-image:url('http://127.0.0.1:3000/img/2.jpg');
   width:103px;
    height:103px;
    background-size:103px 103px;
    position:absolute;
    margin-top: -160px;
    margin-left: 12px;
    z-index:3
}
.show{
    width:100%;
    height:450px !important;
   background:#fff !important;
   font-size:14px;
   margin-top:183px;
   z-index:2
}
.mui-table-view-cell{
    overflow:none !important; 
    padding: 25px 28px !important;
      
}
.mui-table-view li{
    height: 60px !important;
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
    z-index:5;
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
h5{
    padding-left:10px;
    font-size:15px;
    color:#CD9B9B;
}
</style>

<template>
    <div class='app-index'>
        <mt-header fixed title='音乐盛宴'>
        <span class="mui-icon-extra mui-icon-extra-heart"  slot="left"></span>
        <span class="mui-icon mui-icon-gear" slot='right'></span>
        </mt-header>
         <mt-navbar v-model='selected'>
            <mt-tab-item id="1"  v-model='selected'>推荐</mt-tab-item>
            <mt-tab-item id="2">排行榜</mt-tab-item>
            <mt-tab-item id="3">搜索</mt-tab-item>
            <mt-tab-item id="4">我的</mt-tab-item>
        </mt-navbar>
         <mt-tab-container v-model="selected">    
            <!--音乐-->
            <div class='s'>
            <mt-swipe :auto='4000'>
           <mt-swipe-item v-for='(item,i) of navlist' :key='i'>
                <img :src="item.img_url" />
            </mt-swipe-item>
        </mt-swipe>
            <mt-tab-container-item id='1' v-model="selected" > 
                <div class='mm'>
                <h4>热门歌单</h4>   
            <div class='goods-item' v-for="(item,i) of trans" :key='i'> 
                           <router-link :to="'/tran_detail?lid='+item.lid">
						<img class="mui-pull-top" :src="item.img_url">
                          </router-link>
							<span class='now'>{{item.title}}</span>
            </div>
             
             </div>
            <h4>热门歌手</h4>
         <div class='cc'>
        <div class='goods-item' v-for="(item,i) of rmlist1" :key='i'>
          <router-link :to="'/rm_detail?aid='+item.rid">
         <img :src="item.img_url" />
         <img :src="item.img1_url"/>
         <h4>{{item.lname}}</h4>
         <div class='cn'>
         <div class="info">
             <span class='now'>{{item.info}}</span>
         </div>
         <div class="sell">
             <span class='nn'>{{item.runame}}</span>
         </div>
         </div>
     </router-link>
     </div>
     </div>
            </mt-tab-container-item>
            </div>
            <!--视频-->
            <mt-tab-container-item id='2'>
                 <!-- 推荐榜单  -->
                <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media"  v-for="(item,i) of list" :key='i'>
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <img :src="item.img1_url" mui-media-object mui-pull-right class='vc'>
						<div class="mui-media-body">
							<span>{{item.sname}}</span>
							<p class='mui-ellipsis'>
                               <span>{{item.uname}}</span>
                            </p>
						</div>
                         <div class='bf'>
                        <audio src="img/kl.mp3" id='music'></audio>
                        <img src="http://127.0.0.1:3000/img/trans/bf.png" :data-id='i' @click='bf'>
                        <span class="mui-icon-extra mui-icon-extra-heart" id='heart' @click='store' :data-id='i'></span>
                         </div>
				</li>
        </ul>
         <div class='player1'>
            <div class="m1">
            <img src="img/trans/4.jpg" alt="">
            </div>
			   <span class='c4'>{{song}}</span>
               <span class='c1'>{{singer}}</span>
            <div class='bf1'>
            <span class='c3'>
                <audio src="img/kl.mp3" id='music'></audio>
                <img src="http://127.0.0.1:3000/img/trans/bf.png" ref='vb' class='bb' @click='bf1'> </span> 
             <span class="mui-icon mui-icon-bars"></span>      
            </div>
			</div>
            </mt-tab-container-item>
            <!--电台-->
            <mt-tab-container-item id='3'>
         <div class="mui-card">
		 <div class="mui-card-header cc">
          <input type="text" placeholder="搜索歌曲" v-model='kword'>
        </div>
        </div>
         <div class="mui-card-content">
          <div class="mui-card-content-inner ">
            <div class='mui-card-sear'>
              <p>热门搜索</p>
              <ul class='mui-card-hot-search'>
                <li><router-link to='#'>那一次</router-link></li>
                <li><router-link to='#'>狂浪 花姐</router-link></li>
                <li><router-link to='#'>CHEAP THRILLS</router-link></li>
                <li><router-link to='#'>CHEAP THRILLS</router-link></li>
                <li><router-link to='#'>写给黄淮</router-link></li>
                <li><router-link to='#'>比悲伤更悲伤的故事</router-link></li>
                <li><router-link to='#'>第一次</router-link></li>
              </ul>
            </div> 
            </div>  
            </div> 
            <div class='mui-card-list hide' >
              <ul mui-card-hot-search mui-card-songs>
                <li v-for='(item,i) of list2' :key='i' style='list-style:none'>
                    <div class='mui-card-list-content'>
                        <span class='n'>歌手:{{item.tuname}}</span>
                         <p>歌曲:{{item.tname}}</p>
                    </div>
                    <div class='bf'>
                        <audio src="img/kl.mp3" id='music'></audio>
                        <img src="http://127.0.0.1:3000/img/trans/bf.png" :data-id='i' @click='bt' id='anniu'>
                    </div>
                </li>    
              </ul>
            </div>
            </mt-tab-container-item>
             <mt-tab-container-item id='4'>
            <div class='avatar'>
            <img src="img/1.png" alt="" @click='login' id='rge'>
            <span id='u' v-html='user'></span>
            </div>
            <div class='content1'>
            <div class='n'>
            <span>我的收藏</span></div>
            <div class='h'>
            <span class="mui-icon-extra mui-icon-extra-phone" id='s1'></span>
            <span class="mui-icon-extra mui-icon-extra-heart"  slot="left" id='s'></span>
            <span class="mui-icon mui-icon-download" id='s2'></span>
             <p class='g2'>本地音乐</p>
            <p class='g'  @click='collect'>收藏</p>
            <p class='g1'>下载</p>
             <span class='lo'>80</span>
             <span class='st' ref='v'>{{this.cell_list}}</span>
            <span class='xz'>60</span>
            </div>
            </div>
            <div class='login' id='rg'>
              <div id='z'>
              <div class='l'>
                  <router-link :to="`/register`"><p>注册</p></router-link>
              </div>
              <div class='r'>
                  <router-link :to="`/login`"><p>登录</p></router-link>
              </div>
              </div>
              <div id='p'>
               <div id='t'>
                  <p @click='logout'>注销登录</p>
              </div>
              <div id='y'>
                  <p @click='logout1'>取消</p>
              </div>
              </div>
            </div>
          </mt-tab-container-item>
       
        </mt-tab-container> 
          <div class='top1' id='scroll'>
             <span fixed class="mui-icon-extra mui-icon-extra-top scroll" @click='top'></span>
         </div>
    </div>
    
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
          uid:this.uid,
          selected:'1',
          navlist:[],
          trans:[],
          list:[],
          value:'',
          rmlist1:[],
          song:'生僻字',
          singer:'陈柯宇',
          list2:[],
          kword:'',
          user:'未登录',
          id2:'',
          cid:'',
          name:'',
          uname:'',
          clist:'',
          cell_list:0,
          cc:''
        }
    },
     created(){
       this.handleImage(),
       this.transceiver(),
       this.loadList(),
       this.rmlist(),
       this.getuserinfo(),
       this.cell()
     },
     methods:{
    handleImage(){   
     var url='http://127.0.0.1:3000/imglist';
        this.axios.get(url).then(result=>{
         this.navlist=result.data.data;
     })
     },
   transceiver(){
     var url='http://127.0.0.1:3000/trans';
     this.axios.get(url).then(result=>{
        //console.log(result.data.data)
        this.trans=result.data.data;

    })
     },
      loadList(){
     var url='http://127.0.0.1:3000/hot';
    this.axios.get(url).then(result=>{
         //console.log(result.data)
        this.list=result.data.data
     })
     },
     rmlist(){
         var url='http://127.0.0.1:3000/rm';
         this.axios.get(url).then(result=>{
            this.rmlist1=result.data.data;
         })
     },
     
    //置顶操作
     scroll(){
     var scroll=document.getElementById('scroll');
     var tt=document.documentElement.scrollTop;
     if(tt>500){
         scroll.style.display='block'
     }else{
         scroll.style.display='none'
     }
     },
      top(){
       var curTop=document.documentElement.scrollTop || document.body.scrollTop;
             //console.log(curTop);
            document.documentElement.scrollTop=0;
    },
    //歌曲播放
    bf(e){
      //alert(111)；
      var id=e.target.dataset.id;
      var id1=id;
      var pp=e.target.parentElement.previousElementSibling;
      var song=pp.getElementsByTagName('span')[0].innerHTML;
      this.song=song;
      var singer=pp.getElementsByTagName('span')[1].innerHTML;
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
            }else if(id!=this.id2){
                music.src='';
                music.src='img/kl.mp3';
                x.src='http://127.0.0.1:3000/img/trans/zt.png';
                music.play();
            }
            this.id2=id;
           
    },
    //底部歌曲播放
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
     },
     //定义显示属性在搜索时
    show(){
         var a=document.getElementsByClassName('mui-card-sear')[0];
         var b=document.getElementsByClassName('mui-card-list')[0];
         //console.log(a);
         //console.log(b);
         a.className='mui-card-sear';
         b.className='mui-card-list hide';
     },
     //定义隐藏属性在搜索时
    hide(){
        
         var a=document.getElementsByClassName('mui-card-sear')[0];
         var b=document.getElementsByClassName('mui-card-list')[0];
         //console.log(a);
        // console.log(b);
         a.className='mui-card-sear hide';
         b.className='mui-card-list';
     },
   //登录时用户名的获取
     getuserinfo(){
         if(sessionStorage.getItem('user')){
          var user=sessionStorage.getItem('user');
       this.user=user;  
       console.log(this.user)
       }
     },
  //底部导航的获取
     login(){
      var rg=document.getElementById('rg');
       //console.log(rg)
      //rg.style.display='block';
      var z=document.getElementById('z');
      console.log(z)
      var p=document.getElementById('p');
      console.log(t)
      if(sessionStorage.getItem('user')){
          p.style.display='block'
      }else{
         z.style.display='block'
      }
      
     },
    //注销用户名
     logout(){
         if(sessionStorage.getItem('user')){
          sessionStorage.removeItem('user');
           this.user='未登录';
           var cc=this.$refs.v;
           console.log(cc.innerHTML)
             cc.innerHTML=0;
           Toast('注销成功');
         
         }  
     },
     logout1(){
        var p=document.getElementById('p');
          p.style.display='none'
     }, 
     //歌曲收藏
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
    cell(){
        var uname=sessionStorage.getItem('user');
        if(!uname){
            return;
        } 
         //console.log(uname);
         var url='http://127.0.0.1:3000/cell?uname='+uname;
         this.axios.get(url).then(result=>{
          this.cell_list=result.data.data.length;
          console.log(result.data.data.length)
         })
     },
     collect(){
         this.$router.push('/collect')
     },
     bt(){
         var music=document.getElementById('music');
        var anniu=document.getElementById('anniu');
         if(music.paused){
             music.play();
             anniu.src='http://127.0.0.1:3000/img/trans/zt.png';
         }else{
             music.pause();
             anniu.src='http://127.0.0.1:3000/img/trans/bf.png';
         }
     }
     },
     //置顶操作
     mounted(){
         window.addEventListener('scroll',this.scroll)
     },
     destroyed(){
         window.removeEventListener('scroll',this.scroll)
     },
     //搜索时关键字的监听
      watch:{
       kword(){
           if(this.kword.length>=1){
            var url='http://127.0.0.1:3000/s_song?tname='+this.kword;
            this.axios.get(url).then(result=>{
                if(result.data.code=='1'){
                //console.log(result.data.data);
                this.list2=result.data.data;
                }else{
                Toast('暂无此歌曲');
                var d=document.getElementsByClassName('mui-card-list')[0];
                d.className='mui-card-list hide';
                }  
            })
            console.log(2)
        this.hide()
        }else if(this.kword.length<=0){
            console.log(1)
             this.show()

        }
       }
     },
   
}
</script>
<style>
.app-index .mint-swipe{
     height:150px;
 }
 .app-index .mint-swipe img{
     width:100%;
 }

.container{
    background-color:#fff;
}
.hot{
    background-color:#fff;
}
.mui-media-body{
    width:85px;
    height:50px !important;
    margin-top:-23px;
}
.mui-view li{
    list-style: none;
    margin-left:-30px;
}
.mui-view li img{
    width:175px;
    height:175px;
    display:inline-block;
}
    .mm .goods-item{
        width:49%;
        /* border:1px solid #ccc;  */
        margin:2px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        min-height:235px;
        font-size:14px;
    }
    .mm .goods-item img{
        position:relative;
        height:175px;
        width:175px;
    }
     .mm .goods-item:nth-child(3){
         margin-left: 187px;
        margin-top: -237px;
     }
     .mm .goods-item:last-child{
      margin-left: 187px;
      margin-top:-236px;
     }
.mint-header.is-fixed{
    background-color: rgba(255,255,255,0.65);
    color: #333;
}
.mint-searchbar-inner{
  background-color:#fff
} 
 .mint-searchbar-inner input[type='search']{
    height: 25px;
    margin-top: 13px;
    background:rgba(0,0,0,0)
}
.mint-navbar .mint-tab-item{
        color: rgba(0,0,0,.6);
        border-bottom: 2px solid #eee;
    }
    .mint-navbar a.mint-tab-item.is-selected{
        color: #31c27c;
        border-bottom: 6px solid #31c27c;
    }
    .cc{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        padding:2px;
        margin-left: 1px;
        margin-top: 9px;
    }
    .cc .goods-item{
        width:49%;
        border:1px solid #ccc;
        margin:2px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        min-height:245px;
    }
    .cc .goods-item img{
        position:relative;
        height:175px;
        width:175px;
    }
    .cc .goods-item img:nth-child(2){
        position:absolute;
        height:30px;
        width:30px;
        margin-left: -35px;
        margin-top: 144px;
        background: #000;
        border-radius: 50%;
       opacity: 0.5;
       z-index:2
    }
    .cc .info span{
        display:inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        width:175px;
        color:#555;
        font-size:14px;
    }
    .cc .sell span.nn{
        display:inline-block;
        color:#555;
        font-size:12px;
    }
    .cn{
        width: 171px;
        height: 50px;
        background: #fff;
    }
.mui-card-header input[type='text']{
        border-radius:13px;
    }
.mui-card{
  margin-top:1px !important;
  width:100%;
  margin-left:1px !important;
}
.mui-card .mui-card-header input{
  margin:0 ;
  color:black;
  background-color: #ebecec;
  border-radius:50px;
  height:30px;
  padding-left:30px;
  font-size:14px;
  margin-top:-1px;
}
/* 推荐歌曲 */
.show{display:block !important}
.hide{display:none !important;}
.mui-card-hot-search{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  width:100%;
  padding:0
}
.mui-card-hot-search li{
  border:1px solid #eee;
  margin:10px 0 0 5px;
  padding:0 10px;
  border-radius:35px;
  line-height:32px;
  
}
.mui-card-songs li{
  width:100%;
  display:flex;
  justify-content:space-between;
  background:#fff;
  list-style: none !important;
}
.mui-card-hot-search li a{  
  color:black !important;
  width:108px;
}
.mui-card-list-content{
    width: 373px;
    background: #fff;
    margin-left: -38px;
    margin-top: -52px;
    height: 60px;
    padding-top: 10px;
    font-size:14px;
    color:#8f8f94;
    padding-left: 17px; 
}
.mui-card-hot-search li{
    background:#fff;
}
.top1{
   position: fixed;
   top: 629px;
   left: 330px;
   display:none;
}
#heart{
    margin-left: 17px;
}
.player1{
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
    /* display:none; */
}
.m1 img{
    width:50px;
    height:50px;
    border-radius:5px;
    margin-top: 9px;
    margin-left: -296px;
}
/* //个人中心 */
.avatar{
    width: 100%;
    height: 85px;
    line-height: 85px;
    background-color: #f8f8f8;
    padding: 0 17px;
}
.avatar img{
    width:56px;
    height:56px;
    border-radius: 28px;
    float: left;
    background-size: 289px;
    overflow: hidden;
    margin: 15px 10px 0 0;
    background-position: -184px -144px;
}
.n{
    width:100%;
    height:46px;
    border-bottom:2px solid #ddd
}
.content1{
    width:100%;
    height:500px !important;
    padding: 20px 17px 0;
    background: #fff !important;
    margin-top:14px;
}
.h{
    width: 100%;
    height: 131px !important;
    border-bottom: 3px solid #ddd !important;
}
.content1 .g{
    margin-left: 15px;
    margin-top: 22px;
    font-size: 16px;
    color: #000;
}
.content1 .g1{
    font-size: 14px !important;
    color: #8f8f94 !important;
    margin-left: 265px;
    margin-top: -29px;
}
.content1 .g{
    margin-top: -31px;
    margin-left: 147px;
    color: #8f8f94;
    font-size:14px;
}
.content1 .g2{
    margin-left: 25px;
    margin-top: 20px;
    font-size: 14px;
    color: #8f8f94;
}
#s1{
    margin-left: 37px;
    margin-top: 9px;
}
#s{
    margin-left: 93px; 
}
#s2{
   margin-left: 94px;
}
#z{
    bottom:0;
    position:fixed;
    width:100%;
    height:18%;
    background:#ddd;
    opacity:0.6;
    display:none;
}
.l,.r{
    height: 52%;
    width: 100%;
    border-bottom: 4px solid #eee;
}
#p{
   bottom:0;
    position:fixed;
    width:100%;
    height:18%;
    background:#ddd;
    opacity:0.6;
    display:none;  
}
#t{
   height: 52%;
    width: 100%;
    border-bottom: 4px solid #eee; 
}
.login p{
    font-size: 18px;
    text-align: center;
    padding-top: 15px;
    color:#4e4e57;
}
/* 收藏 下载 本地样式 */
.lo{
  margin-left: 36px;
}
.st{
  margin-left: 100px;
}
.xz{
    margin-left: 108px;
}
.lo,.st,.xz{
  color: #8f8f94;
  font-size: 14px;
}
</style>



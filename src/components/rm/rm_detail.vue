<template>
    <div class='rm'>
    <mt-header fixed title="详情">
     <router-link to='/index' slot='left'>
        <mt-button icon='back'>返回</mt-button>
     </router-link>
    </mt-header>
      <div class="mui-card  my-card" v-for="item in list " :key="item.aid">
                    <div class="mui-card-header">
                       {{item.title}}
                    </div>
                    <div class="mui-card-content media_content">
                        <aplayer
                        :music="{
                            pic:item.img_url,
                            src: item.mp3_url,
                            artist:item.runame,
                            title:item.rpname
                        }"
                        preload="auto"
                        />
                    </div>
                    <div class="mui-card-footer my-footer">
                        <div class="news_author">
                            <p class="news_avater"><img :src="item.img_url"></p>
                            <p class='vc'>{{item.runame}}</p>
                        </div>
                        <div>
                            <vue-star animate="animated bounceIn" color="#F05654">
                                <i slot="icon" class="mui-icon iconfont icon-like_fill"></i>
                            </vue-star>
                        </div>
                    </div>
                    
                </div>   
                <div class="mui-card">
				<div class="mui-card-header"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<textarea placeholder="请对歌曲进行评论" maxlength="120" v-model.trim='content'></textarea>
						 <mt-button size='small' type='primary' @click='addComment' >发表评论</mt-button>
					</div>
				</div>
				<div class='mui-card-footer'></div>
		    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <div class='cmt-list'>
							<div class='cmt-item' v-for='(item,i) of list1' :key='i'>
								<div>{{i+1}}楼发表时间:{{item.ctime | datetimeFilter}}</div>
								<div>内容:{{item.content}}</div>
							</div>
							</div>		
					</div>

				</div>
			</div>
		</div>	         
    </div>

</template>
<script>
import Aplayer from 'vue-aplayer';
import VueStar from 'vue-star';
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
        aid:this.$route.query.aid,
        list:[],
        content:'',
        list1:[],
        info:{},
        pno:0,
        pageSize:4
        }
    },
    created(){
        this.getdetail();
        this.loadMore()
    },
      methods:{
          loadMore(){
              this.pno++;
			var pageSize=this.pageSize;
			//3.正则表达式验证pno和pageSize是否正确
			 var reg=/^[0-9]{1,}$/
			 if(!reg.test(this.pno)){
				 Toast('页码格式不正确');
				 return;
			 }
			 //console.log(this.pno+':'+pageSize)
            var sql='http://127.0.0.1:3000/getc?aid='+this.aid+'&pno='+this.pno;
           this.axios.get(sql).then(result=>{
               console.log(result.data.data)
               this.list1=result.data.data
             })
           },
          getdetail(){
          var aid=this.aid;
           var url='http://127.0.0.1:3000/find?aid='+aid;
           this.axios.get(url).then(result=>{
               //console.log(result.data.data)
               this.list=result.data.data;
           })
           },
           addComment(){
               var aid=this.aid;
               console.log(aid)
               this.pno++;
               var content=this.content;
               //去除两边空格
               var size=content.trim().length;
               if(size==0){
                   Toast('评论内容不能为空');
                   return;
               }
            var postData=this.qs.stringify({
                aid:aid,
                content:content
            })
            var url='http://127.0.0.1:3000/addcomment?aid='+aid;
            this.axios.post(url,postData).then(result=>{
             Toast('添加成功')
             this.content='';
		   this.pno=0;  //清空页码
		   this.list1=[]; //清空原有数据
		    this.loadMore() //第一页
            })
           
           },
          
    },
    
    computed:{
            
        },
        components: {
            Aplayer,
            VueStar,
        }
}
</script>
<style>
p.news_avater img{
  width:40px;
  border-radius:50%;
}
p.vc{
    margin-left: 52px;
    margin-top: -40px;
}
</style>

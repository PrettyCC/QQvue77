const express=require('express');
const mysql=require('mysql');
//引入模块
const cors=require('cors');
//加载session 模块
//npm i express-session
const session=require('express-session');
//2.创建连接池
var pool=mysql.createPool({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit:3
});
//创建express对象+
var server=express();
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080','http://127.0.0.1:8081','http://localhost:8081'],
    credentials:true
}));
//配置静态目录
server.use(express.static('public'))
//配置模块信息
server.use(session({
    secret:'128位随机字符串',  //安全字符串
    resave:false,        //每次请求更新session值
    saveUninitialized:true,  //初始化保存数据
    cookie:{//cookie辅助session工作，保存时间
        maxAge:1000*60*60  
    }
}))
//配置第三方中间件
const bodyParser=require('body-parser');
//配置json是否自动转换
server.use(bodyParser.urlencoded({
    extended:false
}))
//1.获取轮播
server.listen(5050);
server.get('/imglist',(req,res)=>{
    var rows=[
        {id:1,img_url:'http://127.0.0.1:3000/img/index/banner1.jpg'},
        {id:2,img_url:'http://127.0.0.1:3000/img/index/banner2.jpg'},
        {id:3,img_url:'http://127.0.0.1:3000/img/index/banner3.jpg'},
        {id:4,img_url:'http://127.0.0.1:3000/img/index/banner4.jpg'},
        {id:5,img_url:'http://127.0.0.1:3000/img/index/banner5.jpg'}
    ];
    res.send({code:1,data:rows})
})
//2.获取热门歌单
server.get('/trans',(req,res)=>{
    var sql='select * from transceiver';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})
//3.跳转页面 获取信息
server.get('/trans1',(req,res)=>{
    var lid=req.query.lid;
    var sql='select img_url,title,count from transceiver where lid=?';
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})
 //4.获取各类榜单
server.get('/menu',(req,res)=>{
    var cla=req.query.lid
    var sql='select l.lid,t.tname,t.tuname from transceiver l,trans_menu t where l.lid=t.class and t.class=?';
    pool.query(sql,[cla],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
 })
//5获取相对应的热歌名单
server.get('/gettran',(req,res)=>{
    var cla=req.query.class;
    var sql='select id,tname,tuname from trans_menu where class=?';
    pool.query(sql,[cla],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
  })
 //6获取点击歌曲 获取相应的歌名
 server.get('/song',(req,res)=>{
   var id=req.query.id;
   var sql='select tname,tuname from trans_menu where id=?';
   pool.query(sql,[id],(err,result)=>{
       if(err) throw err;
       if(result.length>0){
           res.send({code:1,data:result})
       }
   })
 }) 
//7.获取排行榜单
server.get('/hot',(req,res)=>{
var sql='select * from hot_menu';
pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
        res.send({code:1,data:result})
    }
})
})
//8.获取热门歌手相关信息
server.get('/rm',(req,res)=>{
    var sql='select * from rank_list';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})
//9.进行热门歌手详细信息的查询
server.get("/find",(req,res)=>{
	var aid = req.query.aid;
	var sql= "SELECT  `title`,`img_url`, `mp3_url`, `play_count` ,`runame`,`rpname` FROM `rank_list_detail` WHERE aid = ?";
	pool.query(sql,[aid],(err,result)=>{
        if(err)  throw err;
		res.send({code:1,data:result});
    })
})

//10.对歌曲进行发表评论
server.post('/addcomment',(req,res)=>{
    var aid=req.body.aid;
    var content=req.body.content;
    var ctime=req.body.ctime;
    var sql='insert into music_comment (id,aid,content,ctime) values (null,?,?,now())';
    pool.query(sql,[aid,content],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:'添加成功'})
    })
})
//11.获取评论
server.get('/getc',(req,res)=>{
    var aid=req.query.aid;
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    if(!pno){pno=1;}
    if(!pageSize){pageSize=4}
    var sql='select id,aid,content,ctime from music_comment where aid=?';
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize)
    pool.query(sql,[aid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})

//12搜索歌曲
server.get("/s_song",(req,res)=>{
    var pno=req.query.pno;
    var page_size=req.query.page_size;
    var tname=req.query.tname;
    if(!pno){pno=1;}
    if(!page_size){page_size=6;}
    var sql=`select * from trans_menu where tname like ? limit ?,?`;
     var offset=(pno-1)*page_size;
     page_size=parseInt(page_size);
     pool.query(sql,['%'+tname+'%',offset,page_size],(err,result)=>{
        if(err) throw err;
         if(result.length>0){
         res.send({code:1,data:result});
        }
       else{
         res.send({code:-1,data:'暂无此歌曲'});
     }
    })
})
//13用户注册
server.post('/reg',(req,res)=>{
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
    var reg=/^\w{3,12}$/;
    if(!reg.test($uname)){
        res.send({code:3,msg:'用户名限制在3~15个字符'});
        return;
    }
    if($upwd.length<6 || $upwd.length>15){
        res.send({code:4,msg:'密码限制在6~15个字符'});
        return;
    }
    var sql='select * from music_user where uname=? and upwd=? ';
    pool.query(sql,[$uname,$upwd],(err,result)=>{
        if(err) throw err;
			if(result.length>0){
                res.send({code:1,msg:'用户名已存在'})
            }else{
                var sql='insert into music_user values(null,?,?)';
                pool.query(sql,[$uname,$upwd],(err,result)=>{
                    if(err) throw err;
                        if(result.affectedRows>0){
                            res.send({code:3,msg:"注册成功"})
                        }else{
                            res.send({code:2,msg:"注册失败"})
                        }	
                })        	
            }
    }) 
    })
//14用户登录
server.get("/login",(req,res)=>{
        var $uname=req.query.uname;
        var $upwd=req.query.upwd; 
        var sql='select uid,uname,upwd  from music_user where uname=? and upwd=?';
            pool.query(sql,[$uname,$upwd],(err,result)=>{
                if(err) throw err;
                if(result.length>0){  
                    var uid=result[0].uid
                    console.log(uid)
                  //保存session对象中
                   req.session.uid=uid 
                    //console.log(req.session.uid)
                    res.send({code:1,msg:"登陆成功"})
                }else{
                    res.send({code:2,msg:"登陆失败"}) 
                }					
            })
    })
//15歌曲收藏
server.get('/getca',(req,res)=>{
    var uid=req.session.uid;
    console.log(uid)
    var cname=req.query.cname;
    //console.log(cname)
    var uname=req.query.uname;
    var sql='select uid,cname,uname from music_collect where uid=? and cname=? and uname=?';
   pool.query(sql,[uid,cname,uname],(err,result)=>{
       if(err) throw err;
       if(result.length>0){
           console.log(result);
           res.send({code:2,data:'此歌曲已收藏'})
       }else{
        var sql='insert into music_collect values (null,?,?,?)';
        pool.query(sql,[uid,cname,uname],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,data:'收藏成功'})
            }       
        })
       }
   })
   
})
//16查找收藏歌曲
server.get('/cell',(req,res)=>{
    var uname=req.query.uname;
    if(!uname){
        res.send({code:0,msg:"123"})
        return
    }
    var sql='select uid from music_user where uname=?'
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        //res.send({code:1,data:result})
        if(result.length>0){
        //console.log(result);
         var uid=result[0].uid;
         var sql='select * from music_collect where uid=?';
         pool.query(sql,[uid],(err,result)=>{
             if(err) throw err;
             if(result.length>0){
                 res.send({code:1,data:result})
             }else{
                 res.send({code:-1,data:'查询失败'})
             }
         })
        }
    })
})

//17查找用户收藏歌曲列表
server.get('/collect',(req,res)=>{
    var uname=req.query.uname;
    var sql='select uid from music_user where uname=?'
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var uid=result[0].uid;
            var sql='select * from music_collect where uid=?';
          pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:'查询失败'})
        }
    })
        }
    })
   
})

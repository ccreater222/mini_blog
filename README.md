# mini_blog

两年前就想开发一个博客来练手，最后还是因为web实践需要开发了一个博客。

博客主题是根据 [hexo-theme-apollo](https://github.com/pinggod/hexo-theme-apollo) 改的。



由于赶时间代码写的不是很好，以后打算重写一下



## demo

http://ccreater.top:60080

管理员账号/密码：admin/123456



## 截图

![image-20210108195942194](https://raw.githubusercontent.com/Explorersss/photo/master/20210108195942.png)



![image-20210108200011841](https://raw.githubusercontent.com/Explorersss/photo/master/20210108200011.png)



![image-20210108200031398](https://raw.githubusercontent.com/Explorersss/photo/master/20210108200031.png)



![image-20210108200051374](https://raw.githubusercontent.com/Explorersss/photo/master/20210108200051.png)



![image-20210108200118084](https://raw.githubusercontent.com/Explorersss/photo/master/20210108200118.png)



## 安装指南

```bash
git clone https://github.com/Explorersss/mini_blog.git
cd mini_blog
docker-compose up -d
```

接着修改www/index.html中的

```javascript
var base = `http://127.0.0.1:60080/web/`;
```

将http://127.0.0.1:60080替换成你的域名



安装好后访问http://127.0.0.1:60080

修改docker-compose.yml，将`"60080:80"`替换成`你想要的端口:80`来修改默认端口







## License

MIT
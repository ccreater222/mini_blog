var posts={
    page:1,
    cache:null,
    updated:false,
    getAll:function () {
        var url = base + "posts"
    },
    get:function (callback){
        if(!window.posts.updated){
            var url = base + "posts/all"
            fetch(url)
                .then(resp=>{
                    return resp.json()
                })
                .then(json=>{
                    window.posts.updated = true;
                    json = json.reverse()
                    json.forEach(function(post){
                        if(post.needPassword){
                            if(post.password){
                                post.content = window.util.decrypt(post.password,post.content)
                            }else{
                                post.encrypto = post.content;
                                post.content = "这是一篇受到密码保护的文章";
                            }

                        }
                        post.tags=[]
                    })
                    window.posts.cache = window.util.clone(json);

                    console.log("get posts complete")
                    callback(window.util.clone(json))
                }).catch(err=>console.log(err))
        }else{
            callback(this.cache)
        }
    },
    update:function (post,callback) {
        window.posts.updated = false;
        console.log("update")
        var url = base + "posts/" + post.id;
        if(post.password){
            post.content = util.encrypto(post.password,post.content)
        }
        util.post(url,post,"PUT")
            .then(resp=>resp.json())
            .then(json=>{
                callback(json)
                window.posts.get(console.log)
            }).catch(err=>{console.log(err)})

    },
    delete:function (id,callback) {
        window.posts.updated = false;
        var url = base + "posts/" + id
        fetch(url,{method: 'DELETE'})
            .then(resp=>{
                if(resp.status==204){
                    callback({})
                    console.log("delete "+id+" complete")

                    window.this.get(console.log)
                }else{
                    return resp.text()
                }
            })
            .then(json=>{
                console.log(json)
            }).catch(err=>console.log(err))
    },
    create:function (post,callback) {
        if(post.password){
            post.content = util.encrypto(post.password,post.content)
        }
        data = {
            content:post.content,
            password:post.password,
            title:post.title,
            date:post.date
        }

        window.posts.updated = false;
        var url = base+"posts"
        util.post(url,data,"POST")
            .then(resp=>resp.json())
            .then(json=>{
                callback(json)
                console.log(json)
            }).catch(err=>{console.error(err)})
    }

}

var comments = {
    delete:function(commentId,callback){
        var url = base + "comments/" + commentId
        fetch(url,{method: 'DELETE'})
            .then(resp=>{
                if(resp.status==204){
                    callback({})
                    console.log("delete "+commentId+" complete")
                }else{
                    return resp.text()
                }
            })
            .then(json=>{
                console.log(json)
            }).catch(err=>console.log(err))
    },
    get:function (postId,callback) {
        var url = base + "comments/tree?postId="+postId
        fetch(url)
            .then(resp=>resp.json())
            .then(json=>{

                callback(json)
            }).catch(err=>console.error(err))
    },
    create:function (comment,callback) {
        var url = base + "comments"
        data={
            content:comment.content,
            to:comment.postId,
            parent:-1,
            author: comment.author
        }

        util.post(url,data,"POST")
            .then(resp=>resp.json())
            .then(json=>{
                callback(json)
                console.log(json)
            }).catch(err=>{console.error(err)})
    }
}

var util={
    alert:function(msg,level="info"){
        if(level=="wrong"){
            $("#note").css("background","LightCoral")

        }else{
            $("#note").css("background","rgb(187, 232, 211)")
        }
        $("#notemsg").text(msg)
        $("#note").show()
        setTimeout(function () {
            $("#note").hide()
        },1000)

    },
    encrypto:function (key,content) {
        key = MD5(key)
        var tmp = []
        for(var k of key){
            tmp.push(k.charCodeAt(0));
        }
        key = tmp
        var text = content;
        var textBytes = aesjs.utils.utf8.toBytes(text);

        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);

        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex

    },
    decrypt:function(key,encrypto) {
        key = MD5(key)
        var tmp = []
        for(var k of key){
            tmp.push(k.charCodeAt(0));
        }
        key = tmp
        var encryptedBytes = aesjs.utils.hex.toBytes(encrypto);

        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText
    },
    clone:function (obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    },

    post:function (url, data,method="POST") {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
    },
    showRecheckBox:function (title,message,noButton,yesButton,callback) {
        $("#recheck-title").text(title);
        $("#recheck-message").text(message);
        $("#noButton").text(noButton);
        $("#yesButton").text(yesButton);
        $("#recheck").show();
        $("#yesButton").unbind("click");
        $("#noButton").click(function () {
            $("#recheck").hide();
        })
        $("#yesButton").click(function () {
            callback()
            $("#recheck").hide();
        });
    },
    editBuffer:null,
    sendEdit:function(data){
        util.editBuffer = data
    },
    receiveEdit:function(){
        eventHub.$emit('receiveEdit', util.editBuffer);
        util.editBuffer=null;
    }

}

var auth={
    username:null,//null 代表 没有向服务端请求状态，""代表向服务端请求状态结果为未登入
    isAdmin:false,
    login:function (username,password,callback) {
        var url = base+"verification"
        var data = {
            username:username,
            password:password,
            action:"login"
        }
        util.post(url,data)
            .then(resp=>resp.json())
            .then(data=>{
                if(data.error){
                    this.username="";
                    return callback(false,data);
                }else{
                    this.username = data.username;
                    this.isAdmin = data.isAdmin;
                    return callback(true,data);
                }
            })
            .catch(err=>console.log(err))

    },
    register:function (username,password,callback) {
        var url = base+"verification"
        var data={
            username:username,
            password:password,
            action:"register"
        }
        util.post(url,data)
            .then(resp=>resp.json())
            .then(data=>{
                if(data.error){
                    return callback(false,data)
                }else{
                    auth.isLogin(console.log);
                    return callback(true,data)
                }
            })
            .catch(err=>console.log(err))
    }
    ,
    isLogin:function (callback) {
        if(this.username!=null){
            return callback(true);
        }else{
            if(this.username=="")return callback(false);
            function handler(data) {

                if(data.username){
                    auth.username = data.username;
                    auth.isAdmin = data.isAdmin;
                    return callback(true);

                }
                return callback(false);
            }
            this.status(handler)

        }
    },
    status:function (callback) {
        var url = base + "verification/status"
        fetch(url)
            .then(resp=>resp.json())
            .then(data=>{
                callback(data)
            }).catch(err=>{console.log(err)})

    },
    usernameIsAdmin:function (username) {
        return username=="admin"
    }

}

var tags = {
    cache:null,
    updated:false,
    get: function (callback) {
        var url = base + "tags/all"
        if(!window.tags.updated){
            fetch(url)
                .then(resp=>resp.json())
                .then(json=>{
                    window.tags.cache = window.util.clone(json)
                    window.tags.updated = true
                    callback(json)
                })
                .catch(err=>console.log(err))
        }else{
            callback(this.cache)
        }
    },
    getByPost:function (id,callback) {
        var handler = function (json) {
            var result = [];
            for(var tag of json){
                if(tag.postId == id){
                    result.push(tag)
                }
            }
            callback(result)
        }
        this.get(handler)
    },
    create:function (postId,tag,callback) {
        window.tags.updated = false;
        var url = base + "tags"
        data={
            name:tag,
            postId:postId
        }

        util.post(url,data,"POST")
            .then(resp=>resp.json())
            .then(json=>{
                callback(json)
                console.log(json)
            }).catch(err=>{console.error(err)})

    },
    delete:function (id,callback) {
        window.tags.updated = false;
        var url = base + "tags/" + id
        fetch(url,{method: 'DELETE'})
            .then(resp=>{
                if(resp.status==204){
                    callback({})
                    console.log("delete "+id+" tags complete")
                }else{
                    return resp.text()
                }
            })
            .then(json=>{
                console.log(json)
            }).catch(err=>console.log(err))
    }
}

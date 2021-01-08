Vue.component("ccreater-chatbox",function (resolve,reject) {
    fetch("vue/chatbox.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                props:['post','auth'],
                data:function () {
                    return {
                        INDEX:0,
                        comments:window.comments,
                        commentList:[]
                    }
                },
                methods:{
                    getComment:function () {
                        function handler(vm) {
                            return function (json) {
                                for(var comment of json){
                                    var type = "user";
                                    if(comment.author == "admin"){
                                        type = "admin";
                                    }
                                    if(comment.author == vm.auth.username){
                                        type = "self";
                                    }

                                    vm.generate_message(comment.content,type,comment.author,comment.id)
                                }
                            }
                        }
                        this.comments.get(this.post.id,handler(this))
                    },
                    delComment:function (comment) {


                        function handler(vm) {
                            return function (json) {
                                if(json.error){
                                    window.util.alert(json.error[0],"wrong")
                                }else{
                                    window.util.alert("删除留言成功")
                                    vm.commentList=[];
                                    vm.getComment();
                                }
                            }
                        }
                        console.log(comment)
                        window.comments.delete(comment.id,handler(this))


                    },
                    userClass:function (comment) {
                        return "chat-msg " + comment.type
                    },
                    generate_message:function (msg, type,username,id,img="favicon.png") {
                        this.INDEX++;
                        this.commentList.push({
                            INDEX:this.INDEX,
                            username:username,
                            msg:msg,
                            type:type,
                            img:img,
                            id:id
                        })
                        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
                    },
                    send:function(e) {
                        e.preventDefault();
                        var msg = $("#chat-input").val();
                        if(msg.trim() == ''){
                            return false;
                        }

                        if(!this.auth.username){
                            window.util.alert("登入后才能留言","wrong")
                            return;
                        }

                        var type = "self";

                        $("#chat-input").val("");
                        function handler(vm) {
                            return function (json) {
                                if(json.error||json[0]){
                                    window.util.alert("留言失败","wrong")
                                    console.log(json)
                                }else{
                                    vm.generate_message(msg,type,this.auth.username,json.id)
                                }
                            }
                        }

                        comments.create({
                            content:msg,
                            postId:this.post.id,
                            author:this.auth.username
                        },handler(this))
                    }
                },
                mounted:function () {
                    $("#chat-circle").click(function() {
                        $("#chat-circle").toggle('scale');
                        $(".chat-box").toggle('scale');
                    })

                    $(".chat-box-toggle").click(function() {
                        $("#chat-circle").toggle('scale');
                        $(".chat-box").toggle('scale');
                    })
                    this.getComment()




                }
            })
        })


})

Vue.component("ccreater-manage",function (resolve,reject) {
    fetch("vue/manage.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                props:[],
                data:function () {
                    return {
                        latestComments:[],
                        posts:[],
                        replyTo:null,
                        preMsg:"",
                        msg:"",
                        replyAuthor:""
                    }
                },
                methods:{
                    del:function (id) {
                        window.comments.delete(id,function (vm,id) {
                            return function () {
                                window.util.alert("删除留言成功")
                                for(var i = 0;i<vm.latestComments.length;i++){
                                    if(vm.latestComments[i].id == id){
                                        vm.latestComments.splice(i,1)
                                        return
                                    }
                                }
                            }
                        }(this,id))
                    },
                    reply:function (comment) {
                        $(".reply-box").show()
                        this.replyTo = comment.to
                        this.preMsg = "回复给"+comment.author+":"
                        this.replyAuthor = comment.author
                    },
                    sendReply:function () {
                        window.comments.create({
                            author:this.replyAuthor,
                            postId:this.replyTo,
                            content:this.preMsg+this.msg
                        },function (vm) {
                            return function () {
                                $(".reply-box").hide()
                                vm.msg = ""
                                window.util.alert("回复成功")
                            }
                        }(this))
                    }

                },mounted:function () {
                    window.comments.get("latest",function (vm) {
                        return function (data) {
                            var result = []
                            for(var comment of data){
                                if(!auth.usernameIsAdmin(comment.author)){
                                 result.push(comment)
                                }
                            }
                            vm.latestComments = result.reverse()
                            window.posts.get(function (vm) {
                                return function (data) {
                                    vm.posts = data
                                }
                            }(vm))
                        }
                    }(this))

                },
                watch:{
                    posts:{
                        handler:function () {
                            for(var i = 0; i < this.latestComments.length ;i++){
                                for(var j = 0; j < this.posts.length ;j++){
                                    if(this.latestComments[i].to == this.posts[j].id){
                                        this.latestComments[i].post = this.posts[j]
                                    }
                                }
                            }
                        },
                        deep:true
                    }
                }
            })
        })


})
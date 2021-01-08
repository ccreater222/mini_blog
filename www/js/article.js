Vue.component("ccreater-article",function (resolve,reject) {

    fetch("vue/article.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data: function () {
                    return {
                        password:null
                    }
                },
                methods:{
                    decrypto:function(){
                        try{
                            var tmp=window.util.decrypt(this.password,this.post.encrypto)
                            this.post.content = tmp
                            this.post.needPassword = false
                        }catch (e) {
                            window.util.alert("密码错误","wrong")
                            console.log(e)
                            return
                        }

                    },
                    edit:function (post) {
                        app.current = "ccreater-editor";
                        eventHub.$emit('sendEdit', post)
                    },
                    handleEditData:function (data) {
                        this.post = data
                    },
                    deletePost:function (id) {
                        function handler(vm) {
                            return function (json) {
                                if(json.error){
                                    window.util.alert(json.error[0],"wrong")
                                }else{
                                    eventHub.$emit("updateHome")
                                    window.util.alert("删除成功","wrong")
                                }
                            }
                        }
                        function yestoDelete(vm){
                            return function () {
                                posts.delete(id,handler(vm))
                            }
                        }
                        util.showRecheckBox("确认删除","你确认要删除这篇文章吗","Cancle","DELETE",yestoDelete(this))
                    },
                    viewDetail:function () {
                        id = this.post.id
                        for(var p of posts.cache){
                            if(p.id == id ){
                                var tmp = util.clone(p)
                                tmp.date = dateFormat(new Date(tmp.date),"mediumDate")
                                tmp.raw = tmp.content
                                tmp.content = marked(tmp.content);
                                tmp.more=true;
                                tmp.tags=[];
                                console.log(tmp)
                                eventHub.$emit('sendEdit',tmp)
                                app.current = "ccreater-article-detail"
                                return;
                            }
                        }


                    },
                    summary:function (text) {
                        text=text.replace(/(<([^>]+)>)/ig,"");
                        return text.substring(0,300)
                    }

                },computed:{
                    showContent:function () {
                        if(this.post.more){
                            return this.summary(this.post.content)
                        }else{
                            return this.post.content
                        }
                    }
                },
                mounted:function () {
                    function handler(vm){
                        return function (jsonData) {
                            vm.post.tags = jsonData
                        }
                    }
                    window.tags.getByPost(this.post.id,handler(this))
                },
                activated:function () {
                    function handler(vm){
                        return function (jsonData) {
                            vm.post.tags = jsonData
                        }
                    }
                    window.tags.getByPost(this.post.id,handler(this))
                },
                props:['post','more']

            })
        })


})

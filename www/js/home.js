Vue.component("ccreater-home",function (resolve,reject) {

    fetch("vue/home.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data: function () {
                    return {
                        posts:null,
                        auth:auth,
                        title:"Home"
                    }
                },
                watch:{
                    posts:{
                        handler:function(){
                            console.log("changed")
                        },
                        deep:true
                    }
                },
                methods:{
                    updateHome:function () {
                        function updatePosts(vm) {
                            return function (data) {
                                data.forEach(post=>{
                                    post.date = dateFormat(new Date(post.date),"mediumDate")
                                    post.raw = post.content
                                    post.content = marked(post.content);
                                    post.more=true;
                                })
                                vm.posts = data
                            }
                        }

                        console.log("updatinggg")
                        posts.get(updatePosts(this))
                    },
                    addPost:function () {
                        app.current = "ccreater-editor";
                        eventHub.$emit('sendEdit', {
                            id:null,
                            date:dateFormat(new Date(),"mediumDate")
                        })
                    }

                },
                computed:{
                    reversePosts:function () {
                        return this.posts.reverse()
                    }
                },
                mounted:function () {

                    setTitle(this.title)
                    this.updateHome()
                },
                created: function () {
                    eventHub.$on('updateHome',this.updateHome)
                },
                beforeDestroy: function () {
                    eventHub.$off('updateHome',this.updateHome)
                },
                activated:function () {
                    setTitle(this.title)
                }

            })
        })


})

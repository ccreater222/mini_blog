Vue.component("ccreater-archive",function (resolve,reject) {
    fetch("vue/archive.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data:function () {
                    return {
                        archive:{},
                        posts:[],
                        search:""
                    }
                },methods:{
                    sort:function (search) {
                        this.archive = {}
                        for(var i = 0 ; i < this.posts.length; i++){
                            this.posts[i].year = - parseInt(dateFormat(this.posts[i].date,"yyyy"))


                            var yes = false;

                            if(this.posts[i].title.indexOf(search)!=-1){
                                yes = true;
                            }

                            if(!yes){
                                for(var tag of this.posts[i].tags){
                                    if(tag.name == search){
                                        yes = true;
                                        break;
                                    }
                                }
                            }

                            if(!yes&&this.posts[i].content.indexOf(search)!=-1){
                                yes = true;
                            }


                            if(yes){
                                if(this.archive[this.posts[i].year]==undefined){
                                    this.archive[this.posts[i].year]=[]
                                }
                                this.archive[this.posts[i].year].push(this.posts[i])
                            }
                        }
                    },
                    view:function (post) {
                        var id = post.id
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
                    }
                },
                created:function () {
                    window.posts.get(function (vm) {
                        return function (data) {
                            vm.posts = data
                            vm.sort("")
                        }
                    }(this))

                },
                watch:{
                    search: function () {
                        this.sort(this.search)
                    }
                }
            })
        })


})
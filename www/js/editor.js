Vue.component("ccreater-editor",function (resolve,reject) {

    fetch("vue/editor.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data: function () {
                    return {
                        post:null,
                        simplemde:null,
                        title :"Editor",
                        tags:[],
                        newTag:""
                    }
                },
                methods:{
                    addTag:function () {
                        console.log("add tags")
                        if(this.post==null){
                            window.util.alert("请保存后再添加标签","wrong")
                            return
                        }
                        window.tags.create(this.post.id,this.newTag,function (vm) {
                            return function (data) {
                                window.util.alert("标签添加成功")
                                vm.tags.push(data)
                            }
                        }(this))
                        setTimeout(function (vm) {
                            return function () {
                                vm.newTag=""
                            }
                        }(this),1000)
                    },updateTag:function () {
                        window.tags.getByPost(this.post.id,function (vm) {
                            return function (data) {
                                vm.tags = data
                            }
                        }(this))
                    },
                    deleteTag:function (id) {
                        window.tags.delete(id,function (vm) {
                            return function () {
                                vm.updateTag();
                                window.util.alert("删除成功")
                            }
                        }(this))
                    },
                    handleEditData:function(data){
                        this.post=data
                    },
                    savePost:function () {
                        if(this.post.id==null){
                            data = {
                                content: this.simplemde.value(),
                                password: $("#password-edit").val()==""?"":$("#password-edit").val(),
                                title: $("#title-edit").val(),
                                date: dateFormat(new Date(this.post.date),"yyyy-mm-dd")
                            };

                            posts.create(data,function (vm) {
                                return function (data) {
                                    if(data.error||data[0]){
                                        window.util.alert("添加失败","wrong")
                                    }else{
                                        window.util.alert("添加成功")
                                        vm.post = data
                                    }
                                }
                            }(this))
                        }else{
                            data = {
                                id:this.post.id,
                                content: this.simplemde.value(),
                                password: $("#password-edit").val()==""?"":$("#password-edit").val(),
                                title: $("#title-edit").val(),
                                date: dateFormat(new Date(this.post.date),"yyyy-mm-dd")
                            };
                            console.log(data)
                            posts.update(data,function (data) {
                                if(data.error||data[0]){
                                    window.util.alert("更新失败","wrong")
                                }else{
                                    window.util.alert("更新成功")
                                }
                            })
                        }

                        eventHub.$emit("updateHome")

                    },
                    back:function () {
                        this.$root.current = this.$root.navigations.home.tag;
                    },
                    init:function (title) {
                        setTitle(title)
                        util.receiveEdit()


                        this.simplemde = new SimpleMDE({
                            element: $("#mkeditor")[0] ,
                            renderingConfig:{
                                codeSyntaxHighlighting:true
                            },
                            autoDownloadFontAwesome:false,
                            spellChecker:false
                        });
                        if(this.post!=null){
                            this.simplemde.value(this.post.raw)
                            $("#title-edit").val(this.post.title)
                            $("#password-edit").val(this.post.password)
                            this.updateTag()
                        }
                    }
                },
                deactivated:function () {
                    this.$destroy()
                },
                mounted:function () {
                    this.init(this.title)

                },
                created: function () {
                    eventHub.$on('receiveEdit', this.handleEditData)
                },
                beforeDestroy: function () {
                    eventHub.$off('receiveEdit', this.handleEditData)
                },

            })
        })


})

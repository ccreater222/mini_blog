Vue.component("ccreater-article-detail",function (resolve,reject) {

    fetch("vue/article-detail.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data: function () {
                    return {
                        post:{id:1,tags:[]},
                        auth:window.auth
                    }
                },
                methods:{
                    handleEditData:function (data) {
                        this.post = data
                    }
                },
                mounted:function () {
                    eventHub.$on('receiveEdit', this.handleEditData)
                    util.receiveEdit()
                    this.post.more=false
                    eventHub.$off('receiveEdit', this.handleEditData)
                    setTitle(this.post.title)
                    this.auth = window.auth
                    this.post.tags = window.tags.getByPost(this.post.id,function (vm) {
                        return function (data) {
                            vm.post.tags = data
                        }
                    }(this))
                },
                deactivated:function () {
                    this.$destroy()
                }

            })
        })


})

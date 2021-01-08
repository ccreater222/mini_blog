Vue.component("ccreater-comment",function (resolve,reject) {

    fetch("vue/comment.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data: function () {
                    return {

                    }
                },
                methods:{
                },
                mounted:function () {
                    console.log(this.postId)
                },
                props:['postId']
            })
        })


})

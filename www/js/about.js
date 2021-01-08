Vue.component("ccreater-about",function (resolve,reject) {
    fetch("vue/about.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data:function () {
                    return{
                        post:{
                            date:"2020-1-1",
                            raw:"",
                            content:"",
                            more:false,
                            tags:[]
                        }
                    }
                },
                mounted:function () {
                    window.posts.get(function (vm) {
                        return function (data) {
                            var tmp = data[data.length - 1]
                            tmp.date = dateFormat(new Date(tmp.date),"mediumDate")
                            tmp.raw = tmp.content
                            tmp.content = marked(tmp.content);
                            tmp.more=false;
                            tmp.tags=[];
                            vm.post = tmp
                        }
                    }(this))

                }
            })
        })


})
Vue.component("ccreater-head",function (resolve,reject) {
    fetch("vue/header.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                props:['navigations','current'],
                data:function () {
                    return {}
                },
                methods:{
                    updateCurrent:function (navigation) {
                        app.current=navigation.tag
                    }
                }
            })
        })


})
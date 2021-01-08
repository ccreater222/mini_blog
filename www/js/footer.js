Vue.component("ccreater-footer",function (resolve,reject) {
    fetch("vue/footer.vue")
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
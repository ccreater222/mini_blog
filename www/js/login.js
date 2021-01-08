Vue.component("ccreater-login",function (resolve,reject) {
    fetch("vue/login.vue")
        .then(res=>res.text())
        .then(data=>{
            resolve({
                template:data,
                data:function () {
                    return {
                        username:"",
                        password:""
                    }
                },
                methods:{
                    login:function () {
                        function handler(result,data){
                            if(result){
                                window.util.alert("登入成功")
                                app.current=app.navigations["home"].tag
                            }else{
                                window.util.alert("登入失败","wrong")
                            }
                            console.log(data)
                        }
                        auth.login(this.username,this.password,handler)
                    },
                    register:function () {
                        function handler(result,data) {
                            if(result){
                                window.util.alert("注册成功")
                                app.current=app.navigations["home"].tag
                            }else{
                                window.util.alert(data.error[0],"wrong")
                            }
                            console.log(data)

                        }
                        auth.register(this.username,this.password,handler)

                    }
                }
            })
        })


})
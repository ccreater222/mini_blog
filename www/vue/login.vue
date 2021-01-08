<div>
    <div class="LoginForm">
        <p class="sign" align="center">Sign in</p>
        <form class="login" >
            <input class="un" type="text" align="center" placeholder="Username" v-model="username">
            <input class="pass" type="password" align="center" placeholder="Password" v-model="password">
            <a class="submit" align="center" v-on:click="login">Sign in</a>
            <a class="submit2" align="center" v-on:click="register" >Sing up</a>
        </form>
    </div>
</div>
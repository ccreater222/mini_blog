<div>
    <article class="post-block">
        <h2 class="post-title"><a class="post-title-link" v-on:click="viewDetail(post)">{{post.title}}</a></h2>
        <div v-if="this.$root.auth.isAdmin==true" class="post-manage"><a class="edit-button" v-on:click="edit(post)">EDIT</a><a class="delete-button" v-on:click="deletePost(post.id)">DELETE</a></div>
        <div v-if="post.tags&&post.tags.length>0"><div style="float: left">Tags:</div><div ><a v-for="tag in post.tags" style="margin-right: 5px;font-size: 16px">#{{tag.name}}</a></div></div>
        <div class="post-info">{{post.date}}</div>
        <div class="post-content" v-html="post.more?summary(post.content):post.content"></div>
        <p v-if="post.needPassword&&!(this.$root.auth.isAdmin==true)&&!more"><label>密码： <input v-model="password" name="post_password" class="password" type="password" size="20" /></label> <button v-on:click="decrypto">提交</button></p>
        <a v-if="more" v-on:click="viewDetail(post)" class="read-more">...more</a>
    </article>
</div>
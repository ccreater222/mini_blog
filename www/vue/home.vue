<div>
    <ul class="home post-list">
        <div class="spinner" v-if="posts==null" ></div>
        <li class="post-list-item" v-for="post in posts" v-bind:key="post.id" v-else>
            <ccreater-article v-bind:post="post" more="true"></ccreater-article>
        </li>
    </ul>
    <div v-if="auth.isAdmin" id="chat-circle" class="btn btn-raised" v-on:click="addPost"><div id="chat-overlay"></div> <i class="material-icons">add</i></div>
</div>

<div class="archive">
    <template v-for="(postList, year) in archive">
        <h2 class="archive-year" v-bind:key="year">{{-year}}</h2>
        <div class="post-item" v-for="post in postList" v-bind:key="post.id">
            <div class="post-info">{{post.date}}</div>
            <a class="post-title-link" v-on:click="view(post)">{{post.title}}</a>
        </div>
    </template>
    <div class="search-container">
        <input type="text" placeholder="Search..." v-model="search">
        <div class="search"></div>
    </div>

</div>
<div>
    <header>
        <a href="/" class="logo-link"><img src="favicon.png"></a>
        <ul class="nav nav-list">
            <li class="nav-list-item" v-for="navigation in navigations" :key="navigation.name">
                <a href="javascript:void(0)"  v-on:click="updateCurrent(navigation)" v-bind:target="navigation.target" class="nav-list-link">{{ navigation.name }}</a>
            </li>
        </ul>
    </header>
</div>
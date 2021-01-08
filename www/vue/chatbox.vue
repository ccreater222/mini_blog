<div>
    <div id="chat-circle" class="btn btn-raised">
        <div id="chat-overlay"></div>
        <i class="material-icons">speaker_phone</i>
    </div>
    <div class="chat-box">
        <div class="chat-box-header">
            留言
            <span class="chat-box-toggle"><i class="material-icons">close</i></span>
        </div>
        <div class="chat-box-body">
            <div class="chat-box-overlay">
            </div>
            <div class="chat-logs">

                <template v-for="comment in commentList">
                    <div v-bind:class="'cm-msg-info-'+(comment.type=='self'?'self':'other')">{{comment.username}}</div>
                    <div v-bind:id="'cm-msg-'+comment.INDEX" v-bind:class="userClass(comment)" style="">
                        <span class="msg-avatar"><img v-bind:src="comment.img"></span>
                        <div class="cm-msg-text">{{comment.msg}}</div>
                        <button v-if="auth.isAdmin" v-bind:class="'delete-comment-button '+(comment.type=='self'?'left-btn':'right-btn')" v-on:click="delComment(comment)">X</button>
                    </div>
                </template>
            </div>
        </div>

        <div class="chat-input">
            <form>
                <input type="text" id="chat-input" placeholder="Send a message..."/>
                <button type="submit" class="chat-submit" id="chat-submit" v-on:click="send"><i class="material-icons">send</i></button>
            </form>
        </div>
    </div>
</div>
<div>
    <ul class="timeline">
        <li v-for="comment in latestComments">
            <span class="badge badge-primary badge-pill font-weight-normal">{{comment.content}}</span>
            <div class="comment-info"><i style="    display: inline-block;    vertical-align: -6px;" class="material-icons">face</i>{{comment.author}}
                <i style="    display: inline-block;    vertical-align: -6px;" class="material-icons">article</i>{{comment.post?comment.post.title:""}}</div>
            <div style="display: flex;">
                <div class="commentOperate" v-on:click="reply(comment)"><i class="material-icons">reply</i><span style="vertical-align: 6px;">回复</span></div>
                <div class="commentOperate" v-on:click="del(comment.id)"><i class="material-icons">delete</i><span style="vertical-align: 6px;">删除</span></div>
            </div>

        </li>

    </ul>
    <div class="reply-box" style="display: none;">
        <span onclick="$('.reply-box').hide()" style="    cursor: pointer;display: inline-flex;position: absolute;margin-left: 260px;" title="Close Modal">×</span>
        <div class="wrap-reply-input">
            <textarea class="reply-input" name="message" placeholder="Your Message" v-model="msg"></textarea>
            <span class="focus-input100"></span>
        </div>
        <div class="container-contact100-form-btn">
            <button class="contact100-form-btn" v-on:click="sendReply">
						<span>
							<i class="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
							Send
						</span>
            </button>
        </div>
    </div>
</div>
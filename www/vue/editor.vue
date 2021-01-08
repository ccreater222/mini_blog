<div>

    <div class="title-bar">
        <span>TITLE</span>
        <input id="title-edit" class="title-edit" type="text" placeholder="Edit Title Here">
    </div>

    <div class="title-bar" style="margin-top: 10px">
        <span style="font-size: 16px" >PASS</span>
        <input style="font-size: 18px" id="password-edit" class="title-edit" type="text" placeholder="Enter Password Here" >

    </div>

    <div style="display: flow-root;margin-bottom: 10px">
        <div v-for="tag in tags" v-bind:key="tag.id">
            <div class="tag" v-on:click="deleteTag(tag.id)" ><a class="tag-message">{{tag.name}}</a></div>
        </div>
        <div class="c-checkbox-div" style="margin-bottom: 15px;float: right;margin-bottom: 5px;">
            <input class="c-checkbox" type="checkbox" id="checkbox">
            <div class="c-formContainer">
                <form class="c-form" action="">
                    <input class="c-form__input" v-model="newTag" type="input" required>
                    <label class="c-form__buttonLabel" for="checkbox" v-on:click="addTag">
                        <button class="c-form__button" type="button"  >Add</button>
                    </label>
                    <label class="c-form__toggle" for="checkbox" data-title="Add Tags"></label>
                </form>
            </div>
        </div>
    </div>




    <textarea id="mkeditor" ></textarea>

    <div class="cute-button">
        <button class="big-button" v-on:click="savePost">Save</button>
        <button class="big-button" v-on:click="back">Leave</button>
    </div>
</div>
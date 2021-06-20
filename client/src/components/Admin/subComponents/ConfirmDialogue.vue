<template>
  <popup-modal ref="popup">
        <h2 style="margin-top: 0">{{ title }}</h2>
        <p>{{ message }}</p>
        <b v-if="project">{{ project.title[0] + " / " + project.title[1] }}</b>
        <b v-if="section">{{ section.title[0] + " / " + section.title[1] }}</b>
        <div class="btns">
            <button type="button" class="btn btn-success" @click="_cancel">{{ cancelButton }}</button>
            <button type="button" class="btn btn-danger" @click="_confirm">{{ okButton }}</button>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        project: undefined,
        section: undefined,
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Annuler', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title;
            this.message = opts.message;
            this.project = opts.project;
            this.section = opts.section;
            this.okButton = opts.okButton;

            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton;
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve;
                this.rejectPromise = reject;
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
            // Or you can throw an error
            // this.rejectPromise(new Error('User cancelled the dialogue'))
        },
    },
}
</script>


<style>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
}

.ok-btn {
    color: red;
    text-decoration: underline;
    line-height: 2.5rem;
    cursor: pointer;
}

.cancel-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
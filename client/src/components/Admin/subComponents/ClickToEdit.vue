<template>
<div>
    <input type="textbox"
            v-if="editData && !textarea"
            :value="valueLocal"
            @blur="update"
            @keyup.enter="update"
            v-focus=""
    />
    <textarea type="text"
              v-if="editData && textarea"
              :rows="rows"
              :value="valueLocal"
              @blur="update"
              @keyup.enter="update"
              v-focus="">
    </textarea>
    <p v-if="!editData" @dblclick="editData = true;" v-html="valueLocal">
    </p>
</div>
</template>

<script>
export default {
	props: {
		value: String,
		prop: String,
		enterDoesNothing: {
			type: Boolean,
			default: false
		},
		rows: {
			type: Number, 
			default: 3
		},
		textarea: Boolean,
		edit: Boolean
	},
	data () {
		return {
			valueLocal: this.value,
			editData: this.edit
		}
	},
	watch: {
		value: function() {
			this.valueLocal = this.value;
		},
		edit: function() {
			this.editData = this.edit;
		}
	},
	computed:{
		console: () => console,
		window: () => window, 
	},
	methods:{
		update(event) {
			if(event.keyCode === 13 && this.enterDoesNothing)
				return

			if (event.target.value == "")
				return

			this.valueLocal = event.target.value; 
			this.editData = false; 
			this.$emit('input', this.valueLocal, this.prop);
		}
	},
	directives: {
		focus: {
			inserted (el) {
				el.focus()
			}
		}
	}
}
</script>

<style scoped>
p { 
  margin: 0px !important; 
  display: inline; 
}

input { 
    width: 65%;
    font-weight: 500;
}

textarea {
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
}
</style>
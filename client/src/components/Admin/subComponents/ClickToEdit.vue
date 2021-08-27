<template>
<div>
    <input type="textbox"
            v-if="edit && !textarea"
            :value="valueLocal"
            @blur="update"
            @keyup.enter="update"
            v-focus=""
    />
    <textarea type="text"
              v-if="edit && textarea"
              rows="3"
              :value="valueLocal"
              @blur="update"
              @keyup.enter="update"
              v-focus="">
    </textarea>
    <p v-if="!edit" @dblclick="edit = true;" v-html="valueLocal">
    </p>
</div>
</template>

<script>
  export default {
  props: {
    value: String,
    prop: String,
    textarea: Boolean,
    edit: Boolean
  },
  data () {
  return {
      valueLocal: this.value,
    }
  },
  watch: {
    value: function() {
      this.valueLocal = this.value;
    }
  },
  computed:{
    console: () => console,
    window: () => window, 
  },
  methods:{
    update(event) {
      if (event.target.value == "")
        return

      this.valueLocal = event.target.value; 
      this.edit = false; 
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
}
</style>
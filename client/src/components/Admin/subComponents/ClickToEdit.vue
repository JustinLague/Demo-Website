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
    <p v-if="!edit" @dblclick="edit = true;">
        {{ valueLocal }}
        <b-icon @click="edit = true;" class="pencil-icon" id="icon-env" scale="0.7" icon="pencil-fill"></b-icon>
    </p>
</div>
</template>

<script>
  export default {
  props: {
    value: String,
    prop: String,
    textarea: Boolean
  },
  data () {
  return {
      edit: false,
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
}

input { 
    width: 100%;
    font-weight: 500;
}

textarea {
  width: 100%;
}

.pencil-icon {
  cursor: pointer;
  color: rgb(28 103 206);
}
</style>
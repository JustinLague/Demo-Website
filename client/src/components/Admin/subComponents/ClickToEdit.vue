<template>
<div>
    <input type="text"
            v-if="edit"
            :value="valueLocal"
            @blur="update"
            @keyup.enter="update"
            v-focus=""
    />
    <p v-else @dblclick="edit = true;">
        {{ valueLocal }}
        <b-icon v-if="preview" @click="edit = true;" class="pencil-icon" id="icon-env" scale="0.7" icon="pencil-fill"></b-icon>
    </p>
</div>
</template>

<script>
  export default {
  props: ['value', 'preview'],
  data () {
  return {
      edit: false,
      valueLocal: this.value
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
      this.$emit('input', this.valueLocal);
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
    font-weight: 500;
}
.pencil-icon {
  cursor: pointer;
  color: rgb(0, 0, 255);
}
</style>
<template>
  <div id="login_box">
    {{ publicKey }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const publicKey = ref('xxxxxxxxxxxxxxxxxx')

    return {
      publicKey
    }
  }
})
</script>
<style lang="scss" scoped src="./style.scss"></style>

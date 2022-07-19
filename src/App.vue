<template>
  <!-- 有导航栏 -->
  <template v-if="isShowHeader">
    <div id="main">2222</div>
  </template>
  <!-- 无导航栏 -->
  <template v-else>
    <router-view />
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const Store = useStore()
    const isShowHeader = ref(false)
    // 如果有用户信息则取用
    onMounted(() => {
      const userInfo = sessionStorage.getItem('userInfo')
      if (userInfo) {
        Store.commit('userInfo/setUserInfo', JSON.parse(userInfo))
      }
    })

    return {
      isShowHeader
    }
  }
})
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
  #container {
    display: flex;
    background-color: #f4f7f9;
    width: 100%;
    height: calc(100% - 60px);
  }
  #content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

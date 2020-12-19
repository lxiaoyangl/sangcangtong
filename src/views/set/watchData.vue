<template>
  <div>
    <iframe class="iframe" :src="`${serverUrl}/druid/webapp.html`" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'watch-data',
  data () {
    return {
      serverUrl: __config.serverUrl
    }
  }
}
</script>

<style scoped lang="scss">
.iframe{
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 140px)
}
</style>

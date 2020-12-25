<template>
  <div>
    <iframe class="iframe" :src="`${serverUrl}/druid/webapp.html`" frameborder="0"></iframe>
  </div>
</template>

<script>
import config from "Public/config.js";

export default {
  name: 'watch-data',
  data () {
    return {
      serverUrl: config.serverUrl
    }
  }
}
</script>

<style scoped lang="less">
.iframe{
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 140px)
}
</style>

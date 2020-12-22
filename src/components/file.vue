<template xmlns="http://www.w3.org/1999/html">
  <div class="iblock">
    <el-upload action=""
               class="iblock ml10"
               :auto-upload="false"
               :on-change='uploadFile'
               :on-success="upSuccess"
               :multiple="false"
               accept=".xls,.xlsx"
               :limit="1"
               :data="updata"
               :show-file-list="false">
      <el-button type="warning" icon="fa fa-upload">导入</el-button>
    </el-upload>
    <el-button type="success" class="ml10" icon="fa fa-sign-out" @click="exportFile">导出</el-button>
    <el-button type="primary" class="ml10" @click="downFile">模板下载</el-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { clearpop } from '@/utils'
import config from "Public/config.js"

export default {
  props: ['importUrl', 'exportUrl', 'exportData', 'downUrl'],
  mounted () {},
  data () {
    return {
      url: config.serverUrl + this.importUrl,
      updata: {}
    }
  },
  created () {

  },
  methods: {
    exportFile () {
      const data = {
        ...this.exportData,
        name: this.exportData.name ? `*${this.exportData.name || ''}*` : ''
      }
      window.open(config.serverUrl + this.exportUrl + `?queryJson=${encodeURI(JSON.stringify(data))}&token=${this.updata.token}`)
    },
    // 文件上传
      uploadFile(val){
        console.log(val);
        let formdata = new FormData();
        formdata.append('file',val.raw)
        this.enclosure_loading = true;
        this.$axios.post(this.url,formdata).then(res=>{
            console.log('上传结果',res);

    },err=>{
            console.log('上传报错',err);
        }).finally(()=>{
            this.enclosure_loading = false;
    })
    },
    upSuccess () {
      clearpop('导入成功', 'success')
    },
    downFile () {
      window.open(config.serverUrl + this.downUrl)
    }
  }
}
</script>

<style scoped>

</style>

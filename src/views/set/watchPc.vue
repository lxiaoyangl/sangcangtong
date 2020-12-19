<template>
  <div class="wrap">
    <el-row :gutter="15">
      <el-col :span="12">
        <!-- v-if="detail.cpu" -->
        <el-card class="box-card" v-if="detail.cpu">
          <div slot="header" class="clearfix">
            CPU
          </div>
          <div>
            <el-row>
              <el-col :span=12>属性</el-col>
              <el-col :span=12>值</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=12>核心数</el-col>
              <el-col :span=12>{{detail.cpu&&detail.cpu.cpuNum}}</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=12>用户使用率</el-col>
              <el-col :span=12>{{detail.cpu.used}}%</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=12>系统使用率</el-col>
              <el-col :span=12>{{detail.cpu.sys}}%</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=12>当前空闲率</el-col>
              <el-col :span=12>{{detail.cpu.free}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" v-if="detail.mem">
          <div slot="header" class="clearfix">
            内存
          </div>
          <div>
            <el-row>
              <el-col :span=8>属性</el-col>
              <el-col :span=8>内存</el-col>
              <el-col :span=8>JVM</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=8>总内存</el-col>
              <el-col :span=8>{{detail.mem.total}}</el-col>
              <el-col :span=8>{{detail.jvm.total}}</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=8>已用内存</el-col>
              <el-col :span=8>{{detail.mem.usage}}</el-col>
              <el-col :span=8>{{detail.jvm.usage}}</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=8>剩余内存</el-col>
              <el-col :span=8>{{detail.mem.free}}</el-col>
              <el-col :span=8>{{detail.jvm.free}}</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span=8>使用率</el-col>
              <el-col :span=8>{{detail.mem.used}}%</el-col>
              <el-col :span=8>{{detail.jvm.used}}%</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" v-if="detail.sys">
      <div slot="header" class="clearfix">
        服务器信息
      </div>
      <div>
        <el-row>
          <el-col :span="3">服务器名称</el-col>
          <el-col :span="9">{{detail.sys.computerName}}</el-col>
          <el-col :span="3">操作系统</el-col>
          <el-col :span="9">	{{detail.sys.osName}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">服务器IP</el-col>
          <el-col :span="9">{{detail.sys.computerIp}}</el-col>
          <el-col :span="3">系统架构</el-col>
          <el-col :span="9">{{detail.sys.osArch}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card mt10" v-if="detail.jvm">
      <div slot="header" class="clearfix">
        Java虚拟机信息
      </div>
      <div>
        <el-row>
          <el-col :span="3">Java名称</el-col>
          <el-col :span="9">{{detail.jvm.name}}</el-col>
          <el-col :span="3">Java版本</el-col>
          <el-col :span="9">	{{detail.jvm.version}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">启动时间</el-col>
          <el-col :span="9">{{detail.jvm.startTime}}</el-col>
          <el-col :span="3">运行时长</el-col>
          <el-col :span="9">{{detail.jvm.runTime}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">安装路径</el-col>
          <el-col :span="9">{{detail.jvm.home}}</el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
   </el-card>
    <el-card class="box-card mt10" v-if="detail.sysFiles">
      <div slot="header" class="clearfix">
        磁盘状态
      </div>
      <div>
        <el-row>
          <el-col :span="3">盘符路径</el-col>
          <el-col :span="3">文件系统</el-col>
          <el-col :span="3">盘符类型</el-col>
          <el-col :span="3">总大小</el-col>
          <el-col :span="4">可用大小</el-col>
          <el-col :span="4">已用大小</el-col>
          <el-col :span="4">已用百分比</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row v-for="(item,index) in detail.sysFiles" :key="index">
          <el-col :span="3">
            <el-tooltip  effect="dark"  v-if="item.dirName" :content="item.dirName" placement="top">
              <span class="theme">{{item.dirName.substring(0,10)}}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="3">
            <el-tooltip  effect="dark"  v-if="item.sysTypeName" :content="item.sysTypeName" placement="top">
              <span class="theme">{{item.sysTypeName.substring(0,10)}}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="3">{{item.typeName}}</el-col>
          <el-col :span="3">{{item.total}}</el-col>
          <el-col :span="4">{{item.free}}</el-col>
          <el-col :span="4">{{item.used}}</el-col>
          <el-col :span="4">{{item.usage}}%</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { setserverInfo } from '@/axios/api'

export default {
  data () {
    return {
      loading: false,
      detail: {

      }
    }
  },
  created () {
    this.dataDetail()
  },
  methods: {
    dataDetail () {
      setserverInfo().then((res) => {
        this.detail = res
      })
    }
  }
}
</script>

<style scoped lang="scss">
.wrap{
  height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x:hidden;
  .el-col{
    font-size: 13px;
  }
  .box-card{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .el-divider--horizontal{
    margin: 15px 0;
  }
}
</style>

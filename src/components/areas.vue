<template>
  <div>
    <el-select :disabled="disabled" v-model="formData.provinceCode" placeholder="请选择省"
               filterable @change="searchProvince">
      <el-option v-for="item in provinces" :key="item.code"
                 :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-select :disabled="disabled" v-model="formData.cityCode" placeholder="请选择市"
               filterable @change="searchCity">
      <el-option v-for="item in citys" :key="item.code"
                 :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-select :disabled="disabled" v-model="formData.countyCode" placeholder="请选择区"
               filterable @change="searchCounty">
      <el-option v-for="item in countys" :key="item.code"
                 :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-select :disabled="disabled"  v-model="formData.townshipCode" placeholder="请选择乡镇"
               filterable @change="searchTownship" style="width:220px;">
      <el-option v-for="item in townships" :key="item.code"
                 :label="item.name" :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
import { setAreaListAll } from '@/plugins/api'

export default {
  props: {
    value: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted () {},
  data () {
    return {
      formData: {},
      provinces: [],
      citys: [],
      countys: [],
      townships: []
    }
  },
  created () {
    this.getAllAreaData({ areaLevel: 0 }, 'provinces') // 获取省
  },
  watch: {
    value: {
      handler: function (cur) {
        this.formData = JSON.parse(JSON.stringify(cur))
        if (!cur || cur.provinceCode === undefined) {
          return
        }
        if (cur.provinceCode && this.citys.length < 1) {
          this.getAllAreaData({ areaLevel: 1, parentCode: cur.provinceCode }, 'citys') // 获取市
        }
        if (cur.cityCode && this.countys.length < 1) {
          this.getAllAreaData({ areaLevel: 2, parentCode: cur.cityCode }, 'countys') // 获取区
        }
        if (cur.countyCode && this.townships.length < 1) {
          this.getAllAreaData({ areaLevel: 3, parentCode: cur.countyCode }, 'townships') // 获取乡镇
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getAllAreaData (sendData, keys) {
      setAreaListAll(sendData).then((res) => {
        this[keys] = res
      })
    },
    searchProvince (value) {
      this.searchSelect(value, 'provinces', 'province')
      this.formData.cityCode = ''
      this.formData.city = ''
      this.formData.countyCode = ''
      this.formData.county = ''
      this.formData.townshipCode = ''
      this.formData.township = ''
      this.getAllAreaData({ areaLevel: 1, parentCode: value }, 'citys')
    },
    searchCity (value) {
      this.searchSelect(value, 'citys', 'city')
      this.formData.countyCode = ''
      this.formData.county = ''
      this.formData.townshipCode = ''
      this.formData.township = ''
      this.getAllAreaData({ areaLevel: 2, parentCode: value }, 'countys')
    },
    searchCounty (value) {
      this.searchSelect(value, 'countys', 'county')
      this.formData.townshipCode = ''
      this.formData.township = ''
      this.getAllAreaData({ areaLevel: 3, parentCode: value }, 'townships')
    },
    searchTownship (value) {
      this.searchSelect(value, 'townships', 'township')
    },
    // 选项更改数据
    searchSelect (value, datas, name) {
      const temp = this[datas].filter(v => value === v.code)
      if (temp && temp.length > 0) {
        this.formData[name] = temp[0].name
      }
      this.$emit('input', this.formData)
    }
  }
}
</script>

<style scoped>
.el-select{
  width: 120px;
}
</style>

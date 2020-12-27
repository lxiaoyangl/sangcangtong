import { Message } from 'element-ui';
import config from "Public/config.js"
let can = {};

can.baseUrl = 'http://139.9.149.74:4000';

can.message = function(text, type){
    Message({
        message:text,
        type:type,
        duration:type==='error'?5000:2000
    })
}

// 返回登录页函数
can.go_login = function(that){
    // 清除账号缓存
    sessionStorage.setItem('login-userinfo',JSON.stringify({}));
    that.$router.push({name:'Login'})
    // location.href = config.login_url;
}

// 进入每个页面前校验是否登录
can.check_login = function(that){
    // console.log('校验是否已登录')
    let userinfo = JSON.parse(sessionStorage.getItem('login-userinfo'));
    if(userinfo && userinfo.username){
        return;
    }
    can.message('未登录，请先登录', 'error');
    can.go_login(that);
}

// 获取仓库数据
can.get_warehouse_data = function(that){
    return new Promise((resolve,reject)=>{
        that.$axios.post('/warehouse/baseList', {
            warehouseState: 1
        }).then(res=>{
            res.data.data.map(item=>{
                item.label = item.name;
                item.value = item.id;
            })
            resolve(res);
        },err=>{
            reject(err);
        })
    })
}

// 获取数量单位下拉数据
can.get_numunit = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'numunit'
    }).then(res=>{
        console.log('获取数量单位下拉数据',res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.num_unit_arr = [...res.data.data];
    })
},

// 获取数量单位下拉信息
can.get_weightunit = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'weightunit'
    }).then(res=>{
        console.log(res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.weight_unit_arr = [...res.data.data];
    })
},

// 获取货物特性下拉信息
can.get_goodsfeatures = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'goodsfeatures'
    }).then(res=>{
        console.log(res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.goods_type_arr = [...res.data.data];
    })
},

// 获取出库运输方式下拉信息
can.get_transportType = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'transportType'
    }).then(res=>{
        console.log(res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.transport_arr = [...res.data.data];
    })
},

// 获取证件类型下拉信息
can.get_idType = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'idType'
    }).then(res=>{
        console.log(res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.idType_arr = [...res.data.data];
    })
},

// 获取计量方式下拉信息
can.get_valuationType = function(that){
    that.$axios.post('/dictionaryData/baseList',{
        dictionaryType:'measure_method'
    }).then(res=>{
        console.log(res);
        res.data.data.map(item=>{
            item.label = item.labels;
            item.value = item.keyValue;
        })
        that.valuationType_arr = [...res.data.data];
    })
},

// 时间格式修改
can.timeChange = function(str){
    let str1 = new Date(str);
    let str2 = "";
    str2 += str1.getFullYear();
    str2 += "-";
    str2 += (str1.getMonth()+1)>=10?(str1.getMonth()+1):("0"+(str1.getMonth()+1));
    str2 += "-";
    str2 += (str1.getDate()>=10?str1.getDate():("0"+str1.getDate()));
    str2 += " ";
    str2 += (str1.getHours()>=10?str1.getHours():("0"+str1.getHours()));
    str2 += ":";
    str2 += (str1.getMinutes()>=10?str1.getMinutes():("0"+str1.getMinutes()));
    str2 += ":";
    str2 += (str1.getSeconds()>=10?str1.getSeconds():("0"+str1.getSeconds()));
    return str2;
}



export default can;
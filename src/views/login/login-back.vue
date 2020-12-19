<template>
    <div id="login">
        <span class="loginText" :style="loginText">“商仓通”数字化运营平台</span>
        <div class="login-content" :style="imgBox">
            <div class="login-content-left">
                <img src="../../assets/newbj1/img3.png" alt="logo"><br/>
            </div>
            <div class="login-content-center"></div>
            <div class="login-content-right">
                <!--<img src="../../assets/newbj1/img1.png" alt="logo" class="" :style="imgTop"><br/>-->
                <!-- <img src="../../assets/newbj/bg1.png" alt="logo" class="imgTop" :style="imgTop"><br/>
                <img src="../../assets/newbj/bg3.png" alt="name" class="imgBottom" :style="imgBottom"> -->
                <div class="login-form" :style="formPos" >
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" :style="formStyle" >
                        <el-form-item prop="username" :style="formItem">
                            <img src="../../assets/newbj1/img8.png" alt="user">
                            <el-input type="text"
                                      v-model.trim="loginForm.username"
                                      auto-complete="off"
                                      clearable
                                      placeholder="账户"
                                      :style="inputStyle"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" :style="formItem">
                            <img src="../../assets/newbj1/img9.png" alt="user">
                            <el-input type="password"
                                      v-if="unvisiblePas"
                                      v-model.trim="loginForm.password"
                                      auto-complete="new-password"
                                      clearable
                                      @keyup.native.enter="login"
                                      placeholder="密码"
                                      :style="inputStyle"></el-input>
                            <el-input type="text"
                                      v-else
                                      v-model.trim="loginForm.password"
                                      auto-complete="new-password"
                                      clearable
                                      @keyup.native.enter="login"
                                      placeholder="密码"
                                      :style="inputStyle"></el-input>
                            <i class="el-icon-view right-icon" @click="unvisiblePas=false" v-if="unvisiblePas"></i>
                            <i v-else @click="unvisiblePas=true" class="el-icon-close right-icon"></i>
                        </el-form-item>
                        <!-- <div class="check-wrap">
                          <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
                        </div> -->
                        <el-form-item class="btn-item" :style="formItem">
                            <!-- <el-button class="login-btn" v-loading="loading" type="primary" @click="login">登录</el-button> -->
                            <img src="../../assets/newbj1/img6.png" alt="logo" class="btn-img"  :style="btnimg">
                            <el-button class="login-btn" type="primary" @click="login" :style="butStyle">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import config from "Public/config.js";

export default {
    data(){
        return{
            loginForm: {
                username: '',
                password: '',
                captcha: false,
                checked: false
            },
            loading: false,
            unvisiblePas: true,
            rules: {
                username: [{required: true, message: '请输入账号', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
            scaleX: 1,
            scaleY: 1,
            loginText: {},
            imgBox: {},
            imgleft: {},
            imgTop: {},
            imgBottom: {},
            formPos: {},
            companyImg: {},
            formStyle: {},
            inputStyle: {},
            butStyle: {},
            formItem: {},
            btnimg: {}
        }
    },
    created () {
        var THIS = this
        window.addEventListener('resize', function () {
            THIS.calcPos()
        })
        this.calcPos()
    },
    methods:{
        // 登录函数
        login () {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    let obj = {...JSON.parse(JSON.stringify(this.loginForm))};
                    obj.password = this.$md5(obj.password);
                    obj.sysCode = config.sys_code;
                    this.loading = true;
                    this.$axios.post(config.login_ip+'/login/userLogin',obj).then(res=>{
                        console.log(res);
                        // 用户名写入缓存，进去用于显示
                        localStorage.setItem('menusb', JSON.stringify(res.menu || []))
                        this.rember()
//                        this.$store.commit('setInfo', {
//                            role: res.roleType === '1' ? 'admin' : 'superAdmin',
//                            permissions: res.roleType === '1' ? '普通管理员' : '超级管理员',
//                            userId: res.userId,
//                            userName: res.username, // realname
//                            name: res.realname
//                        })
                        let userinfo = {
                            username:res.data.data.realname,
                            token:res.data.data.token,
                            userId:res.data.data.userId
                        }

                        sessionStorage.setItem('two-nav-menu',JSON.stringify([]));
                        sessionStorage.setItem('three-nav-menu',JSON.stringify([]));
                        this.$axios.post(config.login_ip+'/login/loginByUserId',{
                            userId: userinfo.userId,
                            sysCode: config.sys_code,
                        }).then(res=>{
                            console.log('获取菜单结果',res)
                            let userinfo = {
                                username:res.data.data.realname,
                                token:res.data.data.token,
                                userId:res.data.data.userId
                            }
                            sessionStorage.setItem('login-userinfo',JSON.stringify(userinfo));
                            sessionStorage.setItem('two-nav-menu',JSON.stringify(res.data.data.menu));
                            sessionStorage.setItem('companyId',JSON.stringify(res.data.data.companyId));
                            this.$router.push({name:'Home'});
                        })
                    },err=>{
                        console.log(err);
                    }).finally(()=>{
                        this.loading = false;
                    })
                }
            })
        },
        rember () {
            if (this.loginForm.checked) {
                const data = {
                    ...this.loginForm
                }
                localStorage.setItem('remberData', JSON.stringify(data))
            } else {
                localStorage.removeItem('remberData')
            }
        },
        calcPos () {
            var defaultClientWidth = 1920
            var defaultClientHeight = 1080
            var dWidth = Math.max(document.documentElement.clientWidth, 0)
            var dHeight = Math.max(document.documentElement.clientHeight, 0)
            this.scaleX = dWidth / defaultClientWidth
            this.scaleY = dHeight / defaultClientHeight
            this.initPos()
        },
        initPos () {
            this.calcLoginText()
            this.calcBox()
            this.calcImgTop()
            this.calcImgBottom()
            this.calcFormPos()
            this.calcCompanyImg()
            this.calcImgLeft()
            this.calcFormStyle()
            this.calcInputStyle()
            this.calcButStyle()
            this.calcFormItem()
            this.calcBtnimg()
        },
        calcBtnimg () {
            var defaultl = 113
            this.btnimg = {
                'width': defaultl * this.scaleX + 'px'
            }
        },
        calcFormItem () {
            var defaultB = 22
            this.formItem = {
                'margin-bottom': defaultB * this.scaleY * 0.8 + 'px'
            }
        },
        calcFormStyle () {
            var defaultWith = 440
            this.formStyle = {
                'width': defaultWith * this.scaleX + 'px'
            }
        },
        calcInputStyle () {
            var defaultWith = 280
            this.inputStyle = {
                'width': defaultWith * this.scaleX + 'px'
            }
        },
        calcButStyle () {
            var defaultWith = 270
            this.butStyle = {
                'width': defaultWith * this.scaleX + 'px'
            }
        },
        calcLoginText () {
            var defaultTop = 77
            var defaultSize = 30
            this.loginText = {
                'margin-top': defaultTop * this.scaleY + 'px',
                'font-size': defaultSize * this.scaleY + 'px'
            }
        },
        calcBox () {
            var defaultTop = 142
            var defaultleft = 135
            this.imgBox = {
                top: defaultTop * this.scaleY + 'px',
                right: defaultleft * this.scaleX + 'px',
                bottom: defaultTop * this.scaleY + 'px',
                left: defaultleft * this.scaleX + 'px'
            }
        },
        calcImgLeft () {
            var defaultX = 804
            var defaultY = 795
            this.imgLeft = {
                width: defaultX * this.scaleX + 'px',
                height: defaultY * this.scaleY + 'px'
            }
        },
        calcImgTop () {
            var defaultTop = 67
            // var defaultleft = 1102
            var defaultX = 620
            var defaultY = 252
            this.imgTop = {
                width: defaultX * this.scaleX + 'px',
                height: defaultY * this.scaleY + 'px',
                'margin-top': defaultTop * this.scaleY + 'px'
                // left: defaultleft * this.scaleX + 'px'
            }
        },
        calcImgBottom () {
            var defaultTop = 289
            var defaulLeft = 857
            var defaultX = 866
            var defaultY = 159
            this.imgBottom = {
                width: defaultX * this.scaleX + 'px',
                height: defaultY * this.scaleY + 'px',
                top: defaultTop * this.scaleY + 'px',
                left: defaulLeft * this.scaleX + 'px'
            }
        },
        calcFormPos () {
            var defaultT = 25
            var defaultX = 440
            this.formPos = {
                'margin-top': defaultT * this.scaleY + 'px',
                width: defaultX * this.scaleX + 'px'
            }
        },
        calcCompanyImg () {
            var defaultTop = 990
            var defaultleft = 752
            var defaultX = 416
            var defaultY = 46
            this.companyImg = {
                width: defaultX * this.scaleX + 'px',
                height: defaultY * this.scaleY + 'px',
                top: defaultTop * this.scaleY + 'px',
                left: defaultleft * this.scaleX + 'px'
            }
        }
    },
//    mounted(){
//        sessionStorage.setItem('two-nav-menu',JSON.stringify([]));
//        sessionStorage.setItem('three-nav-menu',JSON.stringify([]));
//        let userId = this.getParameter('userId');
//        axios.post(config.login_ip+'/login/loginByUserId',{
//            userId: userId*1,
//            sysCode: '1',
//        }).then(res=>{
//            console.log('获取菜单结果',res)
//            let userinfo = {
//                username:res.data.data.realname,
//                token:res.data.data.token,
//                userId:res.data.data.userId
//            }
//            sessionStorage.setItem('login-userinfo',JSON.stringify(userinfo));
//            sessionStorage.setItem('two-nav-menu',JSON.stringify(res.data.data.menu));
//            this.$router.push({name:'Home'});
//        })
//    },
}
</script>
<style lang="less" scoped>
    @import "../../style/login/login.less";
</style>
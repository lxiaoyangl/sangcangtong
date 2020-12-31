<template>
    <div class="basis" v-loading="loading">
        <!-- 头部信息栏 -->
        <div class="basis_top">
            <div class="basis_top_left">
                <div class="basis_top_left_title">
                    <img src="@/assets/sys_logo.png" alt="">
                    <div class="basis_top_left_title_text">
                        <span>“商仓通”数字化运营平台</span>
                        <span></span>
                    </div>
                </div>
                <div :class="one_level_selected===item.id?'basis_top_left_nav basis_top_left_nav_active':'basis_top_left_nav'" v-for="(item,index) in one_level_nav_arr" :key="index" @click="change_one_level(item)">
                    <span><i :class="item.icon"></i> {{item.name}}</span>
                    <div class="line"></div>
                </div>
            </div>

            <div class="basis_top_right">
                <el-badge :is-dot="detail_notice" class="item">
                    <i class="el-icon-bell icon-set" @click="show_info"></i>
                </el-badge>
                <el-dropdown @command="go_login">
                    <span class="el-dropdown-link">
                        <img class="basis_top_right_logo" src="../../assets/user_logo.png" alt="">
                        <span class="basis_top_right_username">欢迎，{{userinfo.username}}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="change_psd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="go_login">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <!-- 底部数据栏 -->
        <div class="basis_content">
            <!-- 底部左侧导航栏 -->
            <div :class="one_level_menu_type===1?'basis_content_left_index basis_content_left':'basis_content_left'">
                <el-menu
                    class="el-menu-vertical-demo"
                    :active-text-color="'#ee6e18'"
                    :unique-opened="false"
                    :default-openeds="defaultOpeneds"
                    :default-active="defaultActive"
                    :router="true"
                    @select="menu_select"
                >
                    <div v-for="(item,index) in two_level_nav_arr" :key="index">
                        <el-submenu :index="item.id+''" v-show="item.show_flag && item.menuType===2">
                            <template slot="title">
                                <span><i :class="item.icon"></i> {{item.name}}</span>
                            </template>
                            <!--<el-menu-item :index="it.route" v-for="(it,ind) in item.children" :key="ind" :route="it.route">
                                <span slot="title"><i :class="it.icon"></i>{{it.name}}</span>
                            </el-menu-item>-->
                            <div v-for="(item1,index) in item.children" :key="index">
                                <el-submenu :index="item1.id+''" v-show="item1.show_flag && item1.menuType===2">
                                    <template slot="title">
                                        <span><i :class="item1.icon"></i> {{item1.name}}</span>
                                    </template>
                                    <el-menu-item :index="it.path" v-for="(it,ind) in item1.children" :key="ind" :route="it.route">
                                        <span slot="title"><i :class="it.icon"></i>{{it.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item :index="item1.route" :route="item1.route" v-show="item1.show_flag && item1.menuType===3">
                                    <span slot="title"><i :class="item1.icon"></i>{{item1.name}}</span>
                                </el-menu-item>
                            </div>
                        </el-submenu>

                        <el-menu-item :index="item.id+''" :route="item.route" v-show="item.show_flag && item.menuType===3">
                            <span slot="title"><i :class="item.icon"></i>{{item.name}}</span>
                        </el-menu-item>
                    </div>
                    <!-- <el-submenu :index="item.id+''" v-for="(item,index) in two_level_nav_arr" :key="index" v-show="item.show_flag">
                        <template slot="title">
                            <span><i :class="item.icon"></i> {{item.name}}</span>
                        </template>
                        <el-menu-item :index="it.route" v-for="(it,ind) in item.children" :key="ind" :route="it.route">
                            <span slot="title">{{it.name}}</span>
                        </el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </div>
            <!-- 底部右侧数据块 -->
            <div :class="one_level_menu_type===1?'basis_content_right_index basis_content_right':'basis_content_right'">
                <!-- 底部右侧头部导航栏 -->
                <div class="basis_content_right_header">
                    <div class="basis_content_right_header_home" @click="go_home">
                        <i class="el-icon-house"></i>
                    </div>
                    <div class="basis_content_right_header_route_box">
                        <el-popover
                            placement="bottom"
                            trigger="manual"
                            v-for="(item,index) in three_level_nav_arr"
                            :key="index"
                            v-model="item.popover_flag"
                            popper-class="basis_content_right_header_route_box_popper"
                        >
                            <el-button class="basis_content_right_header_route_box_btn" size="mini" @click="del_three_nav_menu(item)">关闭</el-button>
                            <el-button class="basis_content_right_header_route_box_btn" size="mini" @click="close_other_three_nav(index)">关闭其他</el-button>
                            <el-button class="basis_content_right_header_route_box_btn" size="mini" @click="close_all_three_nav(index)">关闭全部</el-button>

                            <div :class="defaultActive===item.route?'basis_content_right_header_route basis_content_right_header_route_active':'basis_content_right_header_route'" @click.prevent.stop="three_level_nav_click(item)" @contextmenu.prevent.stop="oncontextmenu_fn(item)" @blur="cancel_change_three_nav()" slot="reference">
                                <span>{{item.name}}</span>
                                <div class="basis_content_right_header_route_del_icon">
                                    <i class="el-icon-circle-close" @click.stop="del_three_nav_menu(item)"></i>
                                </div>
                            </div>
                        </el-popover>
                    </div>
                </div>
                <!-- 底部右侧主干数据呈现区域 -->
                <div class="basis_content_right_body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <!-- 消息列表 -->
        <el-dialog
            title="消息列表"
            :visible.sync="info_dialog_flag"
            width="600px"
            :before-close="()=>{info_dialog_flag = false}">
            <div class="info_dialog_content">
                <div class="dialog_content_item" v-for="(item,index) in info_dialog_arr" :key="index" @click="get_detail(item)">
                    <span>{{item.noticeTitle}}</span>
                    <span>{{item.createTime}}</span>
                </div>
            </div>
            <div class="dialog_content_page">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper"
                    :hide-on-single-page="false"
                    :total="info_dialog_page.total"
                    :current-page="info_dialog_page.page_num"
                    :page-size="info_dialog_page.page_size"
                    @current-change="info_dialog_page_num_change"
                >
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="info_dialog_flag = false">取 消</el-button>
                <el-button type="primary" @click="info_dialog_flag = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 通知详情 -->
        <el-dialog
            title="通知详情"
            :visible.sync="detail_dialog_flag"
            width="600px"
            :before-close="()=>{detail_dialog_flag = false}">
            <div class="detail_dialog_content">
                <div class="detail_dialog_content_title">
                    <div class="detail_dialog_content_title_title">{{detail_obj.noticeTitle}}</div>
                    <div class="detail_dialog_content_title_author">发布人：{{detail_obj.userName}}</div>
                    <div class="detail_dialog_content_title_time">发布时间：{{detail_obj.createTime}}</div>
                </div>

                <div class="detail_dialog_content_content">{{detail_obj.noticeContent}}</div>
            </div>
        </el-dialog>
        <!-- 修改密码 -->
        <el-dialog
            title="修改密码"
            :visible.sync="change_psd_flag"
            width="600px"
            :before-close="()=>{change_psd_flag = false}">
            <div class="change_psd_content">
                <el-form ref="change_psd_form" :model="change_psd_form" :rules="change_psd_form_rules" label-width="80px">
                    <el-form-item label="原始密码" prop="oldPassword">
                        <el-input type="password" v-model="change_psd_form.oldPassword" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="change_psd_form.newPassword" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label="再次输入" prop="newPassword">
                        <el-input type="password" v-model="change_psd_form.againPassword" size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="change_psd_flag = false">取 消</el-button>
                <el-button type="primary" @click="change_psd_form_sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import config from "Public/config.js"
import { loadDictList } from '@/plugins/api';

export default {
    data(){
        return{
            loading:false,
            // 头部信息栏导航数据
            one_level_nav_arr:[],
            // 头部信息栏选中id
            one_level_selected:1,
            // 左侧信息导航栏数据
            two_level_nav_arr:[],
            // 菜单默认打开数组
            defaultOpeneds:[],
            // 当前激活菜单
            defaultActive:'',

            // 用户信息
            userinfo:{},
            // 三级导航数组
            three_level_nav_arr:[],

            // 消息展示蒙层
            info_dialog_flag:false,
            // 消息列表数据
            info_dialog_arr:[],
            // 消息列表分页数据
            info_dialog_page:{
                page_num:1,
                page_size:10,
                total:0
            },

            // 消息详情蒙层展示标识
            detail_dialog_flag:false,
            // 消息详情
            detail_obj:{},
            detail_notice:false,



            // 修改密码蒙层显示标识
            change_psd_flag:false,
            change_psd_form:{
                oldPassword:'',
                newPassword:'',
                againPassword:''
            },
            change_psd_form_rules:{
                oldPassword:{required:true, message:'请输入原始密码'},
                newPassword:{required:true, message:'请输入新密码'},
                againPassword:{required:true, message:'请再次输入新密码'}
            },

            // 右键弹窗标识
            popover_flag:false,

            // 权限存储数组
            right_arr:[],

            // 一级菜单类型 1主页   2目录   3菜单    4按钮
            one_level_menu_type: 1,
        }
    },
    watch:{
        '$route':function(val){
            this.$fn.check_login(this);
            this.check_lighthigh_detail(val.path);
        },
        change_psd_flag(val){
            if(!val) {
                this.$refs.change_psd_form.clearValidate();
            }
        }
    },
    mounted(){
            loadDictList({
                name: '**',
            }).then(res=>{
                window.SITE_CONFIG['dictList'] = res
            });
            // 获取菜单数据
            let menu = JSON.parse(sessionStorage.getItem('two-nav-menu'));
            let arr = [];
            // 获取一级导航
            menu.map(item=>{
                if(item.parentId === null && (item.menuType === 1 || item.menuType === 2)){
                    item.children = [];
                    arr.push(item);
                }
            })
            // 处理二级导航第一层
            menu.map(item=>{
                arr.map(it=>{
                    if(it.id === item.parentId){
                        item.children = [];
                        item.id_str = ''+item.id;
                        item.route = item.path;
                        it.children.push(item);
                    }
                })
            })
            // 处理二级导航第二层
            menu.map(item=>{
                arr.map(it=>{
                    it.children.map(i=>{
                        if(i.id === item.parentId){
                            item.route = item.path;
                            item.children = [];
                            i.children.push(item);
                        }
                    })
                })
            })
            // 处理二级导航第二层下面的按钮权限
            menu.map(item=>{
                arr.map(ite=>{
                    ite.children.map(it=>{
                        it.children.map(i=>{
                            if(i.id === item.parentId){
                                i.children.push(item);
                            }
                        })
                    })
                })
            })

            console.log('菜单', menu);
            this.one_level_nav_arr = [...arr];

            // // 初始二级导航写入仓储协同
            this.two_level_nav_arr = [...this.one_level_nav_arr[0].children];
            console.log('二级导航',this.two_level_nav_arr)
            // 查看是否已有一级导航进入缓存
            let flag = sessionStorage.getItem('one-level-selected');
            console.log(flag);
            if(flag !== 'undefined' && flag !== '' && flag !== 'null' && flag !== null){
                this.change_one_level({id:(sessionStorage.getItem('one-level-selected') * 1), menuType: (sessionStorage.getItem('one-level-selected-menu-type') * 1)});
            }else{
                this.change_one_level({...this.one_level_nav_arr[0]});
            }
            // 写入用户信息
            this.userinfo = JSON.parse(sessionStorage.getItem('login-userinfo'));
            // 写入三级导航
            this.three_level_nav_arr = JSON.parse(sessionStorage.getItem('three-nav-menu'))===null?[]:JSON.parse(sessionStorage.getItem('three-nav-menu'));
            // 写入按钮权限数组
            this.right_arr = JSON.parse(sessionStorage.getItem('right-arr'))===null?[]:JSON.parse(sessionStorage.getItem('right-arr'));
            console.log(this.right_arr);

            // 建立ws链接
            this.initScoket();
//        }).finally(()=>{
//            this.loading = false;
//        })
    },
    methods:{
        // 头部一级导航改变函数,同步更新二级导航，写入默认展示的菜单第一模块
        change_one_level(obj){
            console.log('一级导航改变函数',obj);
            this.one_level_selected = obj.id;
            this.one_level_menu_type = obj.menuType;
            sessionStorage.setItem('one-level-selected',obj.id);
            sessionStorage.setItem('one-level-selected-menu-type',obj.menuType);
            let arr = [];
            let defaule_arr = [];
            this.one_level_nav_arr.map(item=>{
                if(item.id === obj.id){
                    item.children.map(it=>{
                        it.show_flag = true;
                        console.log(it.id+'');
                        defaule_arr.push(it.id+'');
                        it.children.map(it1=>{
                            it1.show_flag = true;
                            console.log(it1.id+'');
                            defaule_arr.push(it1.id+'');
                        })
                    })
                }else{
                    item.children.map(it=>{
                        it.show_flag = false;
                    })
                }
                arr = [...arr,...item.children];
            })
            this.two_level_nav_arr = [...arr];
            console.log('二级导航10',this.two_level_nav_arr)
            this.defaultOpeneds = [...defaule_arr];
            console.log('默认展开id',this.defaultOpeneds)
            this.check_lighthigh();
        },
        // 返回主页
        go_home(){
            this.$router.push({name:'Home'});
        },
        // 返回登录页
        go_login(val){
            console.log('返回',val)
            if(val === 'go_login'){
                this.$fn.go_login(this);
            }
            if(val === 'change_psd'){
                this.change_psd_flag = true;
            }
        },
        // 校验当前高亮的选项
        check_lighthigh(){
            this.$fn.check_login(this);
            this.check_lighthigh_detail(this.$route.path)
        },
        // 校验当前高亮具体触发函数 具体判断是哪个导航问题
        check_lighthigh_detail(str){
            switch(str){
                case '/warehouse/Incoming/add': this.defaultActive = '/warehouse/Incoming/list'; break;
                case '/warehouse/out_stock/add': this.defaultActive = '/warehouse/out_stock/list'; break;
                case '/warehouse/transfer/add': this.defaultActive = '/warehouse/transfer/list'; break;

                case '/supply_chain_finance/financing/apply_manage/add': this.defaultActive = '/supply_chain_finance/financing/apply_manage/list'; break;
                case '/supply_chain_finance/financing/agreement_manage/add': this.defaultActive = '/supply_chain_finance/financing/agreement_manage/list'; break;

                case '/logistics/operating/waybill/add': this.defaultActive = '/logistics/operating/waybill/list'; break;

                default: this.defaultActive = str;

                console.log('默认高亮',this.defaultActive);
            }
        },
        // 导航栏选择触发函数
        menu_select(index,indexpath){
            console.log('菜单',index,indexpath)
            let obj = {};
            console.log('二级导航11',this.two_level_nav_arr)
            for(let key in this.two_level_nav_arr){
                if(this.two_level_nav_arr[key].show_flag === true && this.two_level_nav_arr[key].id+'' === indexpath[0]){
                    if(this.two_level_nav_arr[key].menuType === 2){
                        for(let key_children in this.two_level_nav_arr[key].children){
                            if(this.two_level_nav_arr[key].children[key_children].menuType === 2){
                                for(let key_children1 in this.two_level_nav_arr[key].children[key_children].children){
                                    if(this.two_level_nav_arr[key].children[key_children].children[key_children1].path === index){
                                        obj.name = this.two_level_nav_arr[key].children[key_children].children[key_children1].name;
                                        obj.route = index;
                                        obj.popover_flag = false;
                                        this.right_arr = [];
                                        sessionStorage.setItem('right-arr',JSON.stringify(this.right_arr));
                                        if(typeof(this.two_level_nav_arr[key].children[key_children].children[key_children1].children) != 'undefined'){
                                            this.right_arr = [...this.two_level_nav_arr[key].children[key_children].children[key_children1].children];
                                            sessionStorage.setItem('right-arr',JSON.stringify(this.right_arr));
                                        }
                                        break;
                                    }
                                }
                            } else {
                                if(this.two_level_nav_arr[key].children[key_children].path === index){
                                    obj.name = this.two_level_nav_arr[key].children[key_children].name;
                                    obj.route = index;
                                    obj.popover_flag = false;
                                    this.right_arr = [...this.two_level_nav_arr[key].children[key_children].children];
                                    sessionStorage.setItem('right-arr',JSON.stringify(this.right_arr));
                                    break;
                                }
                            }
                        }
                    }else{
                        obj.name = this.two_level_nav_arr[key].name;
                        obj.route = this.two_level_nav_arr[key].path;
                        obj.popover_flag = false;
                        this.right_arr = [...this.two_level_nav_arr[key].children];
                        sessionStorage.setItem('right-arr',JSON.stringify(this.right_arr));
                        break;
                    }
                }
            }
            console.log('组装的三级菜单对象',obj,this.right_arr);
            let have_flag = false;
            this.three_level_nav_arr.map(item=>{
                if(item.route === obj.route){
                    have_flag = true;
                }
            })
            if(!have_flag){
                this.three_level_nav_arr.push(obj);
            }
            sessionStorage.setItem('three-nav-menu',JSON.stringify(this.three_level_nav_arr));
            this.check_lighthigh_detail(obj.route);
        },
        // 三级导航点击触发函数
        three_level_nav_click(obj){
            this.three_level_nav_arr.map((item,index)=>{
                item.popover_flag = false;
            })
            sessionStorage.setItem('three-nav-menu',JSON.stringify(this.three_level_nav_arr));
            this.$router.push({path:obj.route});
        },
        // 删除三级导航
        del_three_nav_menu(obj){
            // 判断是否是当前所在页面
            if(obj.route === this.defaultActive){
                this.$router.push({name:'Home'});
            }
            let arr = [];
            this.three_level_nav_arr.map(item=>{
                if(item.route !== obj.route){
                   arr.push(item);
                }
            })
            this.three_level_nav_arr = [...arr];
            sessionStorage.setItem('three-nav-menu',JSON.stringify(this.three_level_nav_arr));
        },
        // 消息蒙层弹出
        show_info(){
            this.info_dialog_flag = true;
            this.$axios1.post('/notice/baseList?_pageList',{
                pageNo:this.info_dialog_page.page_num,
                pageSize:this.info_dialog_page.page_size,
            }).then(res=>{
                console.log(res);
                this.info_dialog_arr = [...res.data.data.records];
                this.info_dialog_page.total = res.data.data.total;
            })
        },
        // 获取详情信息
        get_detail(obj){
            this.detail_dialog_flag = true;
            this.detail_obj = Object.assign({},obj);
        },
        // 建立ws链接
        initScoket () {
            let webSocket
            var websocket_connected_count = 0
            const newSocketInit = () => {
                let userinfo = JSON.parse(sessionStorage.getItem('login-userinfo'));
                webSocket = new WebSocket(`${config.ws_ip}/imserver/${userinfo.userId}`)
            }
            newSocketInit()
            // 连接成功
            webSocket.onopen = (e) => {
                console.log('连接成功',e)
                // this.initNoticeList()
                // heartCheck.reset().start() // 成功建立连接后，重置心跳检测
            }
            // 失败
            webSocket.onerror = (error) => {
                websocket_connected_count++
                if (websocket_connected_count <= 5) {
                    newSocketInit()
                }
            }
            // 关闭
            webSocket.onclose = () => {

            }
            // 接收webscoket服务的数据
            webSocket.onmessage = (e) => {
                console.log(e)
            }
            // 监听窗口事件，当窗口关闭时，主动断开websocket连接，防止连接没断开就关闭窗口，server端报错
            window.onbeforeunload = function () {
                webSocket.close()
            }
        },
        // 修改密码
        change_psd_form_sure(){
            this.$refs.change_psd_form.validate((valid) => {
                if (!valid) {
                    return;
                }
                if(this.change_psd_form.newPassword !== this.change_psd_form.againPassword){
                    this.$fn.message('两次密码输入不相同','error');
                    return;
                }
                this.$axios1.post('/user/changeUserPassword',{
                    newPassword:this.$md5(this.change_psd_form.newPassword),
                    oldPassword:this.$md5(this.change_psd_form.oldPassword),
                }).then(res=>{
                    console.log(res);
                    this.change_psd_flag = false;
                    this.change_psd_form.newPassword = '';
                    this.change_psd_form.oldPassword = '';
                    this.change_psd_form.againPassword = '';
                })
            });
        },
        // 消息列表，页码改变函数
        info_dialog_page_num_change(val){
            console.log(val);
            this.info_dialog_page.page_num = val;
            this.show_info();
        },
        // 右键事件
        oncontextmenu_fn(obj){
            console.log('右键触发函数',this.three_level_nav_arr);
            this.three_level_nav_arr.map(item=>{
                item.popover_flag = false;
            })
            obj.popover_flag = true;
        },
        // 关闭其他的三级导航
        close_other_three_nav(ind){
            let arr = [];
            this.three_level_nav_arr.map((item,index) => {
                if(index === ind){
                    arr.push(item);
                    item.popover_flag=false;
                }
            })
            this.three_level_nav_arr = [...arr];
            sessionStorage.setItem('three-nav-menu',JSON.stringify(this.three_level_nav_arr));
        },
        // 关闭所有的三级导航
        close_all_three_nav(){
            let arr = [];
            this.three_level_nav_arr = [...arr];
            this.$router.push({name:'Home'});
            sessionStorage.setItem('three-nav-menu',JSON.stringify(this.three_level_nav_arr));
        },
        // 取消改变三级导航
        cancel_change_three_nav(){
            this.three_level_nav_arr.map((item,index)=>{
                item.popover_flag = false;
            })
        },
        getParameter:function(name){
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        },
    }
}
</script>

<style lang="less" scoped>
.basis{
    width: 100%;
    height: 100%;
    .basis_top{
        width: 100%;
        height: 70px;
        // background: #1d2a3d;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        justify-content: space-between;
        .basis_top_left{
            height: 100%;
            display: flex;
            .basis_top_left_title{
                width: 300px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
                font-size: 16px;
                img{
                    height: 50px;
                }
                .basis_top_left_title_text{
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: rgba(32, 32, 32, 0.644);
                    span:nth-of-type(1){
                        font-size: 20px;
                        font-weight: 600;
                    }
                    span:nth-of-type(2){
                        font-size: 12px;
                    }
                }
            }
            .basis_top_left_nav{
                cursor: pointer;
                width: 98px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(0,0,0,1);
                font-size: 17px;
                box-sizing: border-box;
                border-bottom: 2px solid #fff;
            }
            .basis_top_left_nav_active{
                // background: rgba(0, 0, 0, 0.2);
                // background: #eaeaea;
                // color: #eaeaea;
                border-bottom: 2px solid #ee6e18;
                color: #ee6e18;
            }
        }
        .line {
            display: inline-block;
            height: 20px;
            width: 1px;
            background: #e0e0e0;
            margin: 0 2px;
        }
        .basis_top_right{
            height: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0px;
            .icon-set{
                font-size: 18px;
                margin-right: 10px;
                cursor: pointer;
            }
            .basis_top_right_username{
                font-size: 14px;
                color: #000;
            }
            .basis_top_right_logo{
                height: 40px;
                width: 35px;
                border-radius: 50%;
                margin:0 20px;
            }
        }
    }
    .basis_content{
        width: 100%;
        height: calc(100% - 70px);
        display: flex;
        .basis_content_left{
            width: 210px;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
        }
        .basis_content_left_index{
            width: 0px;
        }

        .basis_content_right{
            width: calc(100% - 200px);
            height: 100%;
            .basis_content_right_header{
                position: relative;
                width: 100%;
                height: 40px;
                // overflow: auto;
                box-sizing: border-box;
                border-bottom: 1px solid #eaeaea;
                border-left: 1px solid #eaeaea;
                .basis_content_right_header_home{
                    width: 30px;
                    height: 100%;
                    font-size: 16px;
                    box-sizing: border-box;
                    border-right: 1px solid #eaeaea;
                    cursor: pointer;
                    float: left;
                    text-align: center;
                    line-height: 30px;
                }
                .basis_content_right_header_route_box::-webkit-scrollbar-thumb{
                    background: rgba(#e0e5eb , 0.1);
                }
                .basis_content_right_header_route_box::-webkit-scrollbar-thumb:hover{
                    background: rgba(#e0e5eb , 1);
                }
                .basis_content_right_header_route_box::-webkit-scrollbar{
                    width: 4px;
                    height: 4px;
                }
                .basis_content_right_header_route_box{
                    width: calc(100% - 40px);
                    height: 100%;
                    overflow-x: overlay;
                    white-space: nowrap;
                    .basis_content_right_header_route{
                        cursor: pointer;
                        box-sizing: border-box;
                        height: 100%;
                        padding: 0 30px;
                        display: inline-block;
                        text-align: center;
                        line-height: 40px;
                        font-size: 12px;
                        border-right: 1px solid #eaeaea;
                        position: relative;
                        .basis_content_right_header_route_del_icon{
                            position: absolute;
                            right: 0;
                            top: 0;
                            height: 100%;
                            width: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            i:hover{
                                color: rgba(rgb(34, 228, 212) , 1);
                            }
                        }
                    }
                    .basis_content_right_header_route_active{
                        background: rgba(#fd906f , 0.2);
                        color: rgba(#fd906f , 1);
                    }
                }
            }
            .basis_content_right_body{
                width: 100%;
                height: calc(100% - 30px);
                box-sizing: border-box;
                // padding: 10px;
            }
        }
        .basis_content_right_index{
            width: 100%;
        }
    }
}

.basis_content_right_header_route_box_popper{
    .basis_content_right_header_route_box_btn{
        margin-left: 0px;
        display: block;
        width: 100%;
        margin-bottom: 5px;
    }
}

/deep/.el-menu{
    border-right: 0px;
}
/deep/.el-menu-item.is-active{
    background: rgba(#fd906f , 0.2);
}
/deep/.el-submenu{
    border-bottom: 1px solid #eaeaea;
}



/deep/.info_dialog_content{
    width: 100%;
    height: 300px !important;
    overflow: auto;
    .dialog_content_item{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        box-sizing: border-box;
        border-bottom:1px solid #eaeaea;
        cursor: pointer;
    }
}
/deep/.dialog_content_page{
    width: 100%;
    height: 40px;
    // line-height: 40px;
    // text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

/deep/.detail_dialog_content{
    width: 100%;
    .detail_dialog_content_title{
        width: 100%;
        height: 150px;
        background: #bce5a8;
        box-sizing: border-box;
        border: 1px solid #eaeaea;
        padding: 10px;
        .detail_dialog_content_title_title{
            font-size: 16px;
            height: 40px;
            display: flex;
            align-items: flex-end;
        }
        .detail_dialog_content_title_author{
            font-size: 14px;
            height: 30px;
            display: flex;
            align-items: flex-end;
        }
        .detail_dialog_content_title{
           font-size: 14px;
            height: 30px;
            display: flex;
            align-items: flex-start;
        }
    }
    .detail_dialog_content_content{
        width: 100%;
        height: 300px;
        box-sizing: border-box;
        padding: 10px;
        padding-top: 20px;
        border: 1px solid #eaeaea;
        border-top: none;
    }
}


.el-dropdown-link {
    cursor: pointer;
}

</style>
<template>
  <div>
    <!-- <div class="ico-list" id="icoList" @click="fun">
      <i class="nav-icon nav_index"></i>
      <i class="nav-icon nav_data"></i>
      <i class="nav-icon nav_train"></i>
      <i class="nav-icon nav_plan"></i>
      <i class="nav-icon nav_emergency"></i>
      <i class="nav-icon nav_command"></i>
      <i class="nav-icon nav_resource"></i>
      <i class="nav-icon nav_examine"></i>
      <i class="nav-icon nav_watch"></i>
    </div> -->
   <div class="ico-list" id="icoList" @click="fun">
      <i class="iconfont-ali icon-ali-mall"></i>
      <i class="el-icon-s-check"></i>
      <i class="iconfont-ali icon-ali-wuzicangku"></i>
      <i class="iconfont-ali icon-ali-icon_function_ruku"></i>
      <i class="iconfont-ali icon-ali-goodswhoutStock"></i>
      <i class="iconfont-ali icon-ali-yonghuguohu-"></i>
      <i class="iconfont-ali icon-ali-yunshu"></i>
      <i class="iconfont-ali icon-ali-dingdan"></i>
      <i class="iconfont-ali icon-ali-cheliangrenzheng"></i>
      <i class="iconfont-ali icon-ali-sijirenzheng"></i>
      <i class="iconfont-ali icon-ali-gongzuotai-querenbeijian"></i>
      <i class="iconfont-ali icon-ali-rongzi"></i>
      <i class="iconfont-ali icon-ali-woyaorongzi00"></i>

      <i class="iconfont-ali icon-ali-chanpin"></i>
      <i class="iconfont-ali icon-ali-jiekuandan"></i>
      <i class="iconfont-ali icon-ali-huankuan"></i>
      <i class="iconfont-ali icon-ali-dingdandingdanchaxun"></i>
      <i class="iconfont-ali icon-ali-zhuangxieboyunfei"></i>
      <i class = "iconfont-ali icon-ali-shouye"></i>
      <i class = "iconfont-ali icon-ali-yewuzhongxin"></i>
      <i class = "iconfont-ali icon-ali-shenqing"></i>
      <i class = "iconfont-ali icon-ali-yewuchuli"></i>
      <i class = "iconfont-ali icon-ali-zongheguanli"></i>
      <i class = "iconfont-ali icon-ali-chaxuntongji"></i>
      <i class = "iconfont-ali icon-ali-shouli"></i>
      <i class = "iconfont-ali icon-ali-jiance"></i>
      <i class = "iconfont-ali icon-ali-genzongdingwei"></i>
      <i class = "iconfont-ali icon-ali-fahuo"></i>
      <i class = "iconfont-ali icon-ali-rizhongpichuli"></i>
      <i class = "iconfont-ali icon-ali-jingjia"></i>
      <i class = "iconfont-ali icon-ali-zhanghuxinxi"></i>
      <i class = "iconfont-ali icon-ali-zichan"></i>
      <i class = "iconfont-ali icon-ali-caidan"></i>
      <i class = "iconfont-ali icon-ali-liucheng"></i>
      <i class = "iconfont-ali icon-ali-yingshoukuan"></i>
      <i class = "iconfont-ali icon-ali-jigou"></i>
      <i class = "iconfont-ali icon-ali-jianshitiaozheng"></i>
      <i class = "iconfont-ali icon-ali-baobiao"></i>
      <i class = "iconfont-ali icon-ali-hetong"></i>
      <i class = "iconfont-ali icon-ali-strategy"></i>
      <i class = "iconfont-ali icon-ali-delegate"></i>
      <i class = "iconfont-ali icon-ali-zhcc_chuku"></i>
      <i class = "iconfont-ali icon-ali-shenhe"></i>
      <i class = "iconfont-ali icon-ali-baozhengjinruzhangmingxichaxun"></i>
      <i class = "iconfont-ali icon-ali-chuku"></i>
      <i class = "iconfont-ali icon-ali-ruku"></i>
      <i class = "iconfont-ali icon-ali-zhangwuguanli"></i>
      <i class = "iconfont-ali icon-ali-yujingchuzhi"></i>
      <i class = "iconfont-ali icon-ali-kucunsunyi"></i>
      <i class = "iconfont-ali icon-ali-querenshouhuo"></i>
      <i class = "iconfont-ali icon-ali-shenhe1"></i>
      <i class = "iconfont-ali icon-ali-jiezhiya"></i>
      <i class = "iconfont-ali icon-ali-kehu"></i>
      <i class = "iconfont-ali icon-ali-diqu"></i>
      <i class = "iconfont-ali icon-ali-icon-test"></i>
      <i class = "iconfont-ali icon-ali-ico_caiwuguanli_banliruyuan"></i>
      <i class = "iconfont-ali icon-ali-ico_caiwuguanli_banlichuyuan"></i>
      <i class = "iconfont-ali icon-ali-kucunpandian-"></i>
      <i class = "iconfont-ali icon-ali-anpaipaiche-"></i>
      <i class = "iconfont-ali icon-ali-zidianguanli"></i>
      <i class = "iconfont-ali icon-ali-fanganchaxunjitiaozheng"></i>
      <i class = "iconfont-ali icon-ali-fengxianpinggu"></i>
      <i class = "iconfont-ali icon-ali-RectangleCopy"></i>
      <i class = "iconfont-ali icon-ali-RectangleCopy1"></i>
      <i class = "iconfont-ali icon-ali-RectangleCopy2"></i>
      <i class = "iconfont-ali icon-ali-RectangleCopy3"></i>
      <i class = "iconfont-ali icon-ali-wuziguanli"></i>
      <i class = "iconfont-ali icon-ali-shoukuan"></i>
      <i class = "iconfont-ali icon-ali-tongji"></i>
      <i class = "iconfont-ali icon-ali-kuweiguanli"></i>
      <i class = "iconfont-ali icon-ali-kucunpandian"></i>
      <i class = "iconfont-ali icon-ali-tongzhi"></i>
      <i class = "iconfont-ali icon-ali-shenhe2"></i>
      <i class = "iconfont-ali icon-ali-tubiao_fukuandan"></i>
      <i class = "iconfont-ali icon-ali-tubiao_zhangwu"></i>
      <i class = "iconfont-ali icon-ali-fengxiantishi"></i>
      <i class = "iconfont-ali icon-ali-moxingyunhang"></i>
      <i class = "iconfont-ali icon-ali-yewu"></i>
      <i class = "iconfont-ali icon-ali-jiagebiao"></i>
      <i class = "iconfont-ali icon-ali-moxing___"></i>
      <i class = "iconfont-ali icon-ali-daiban"></i>
      <i class = "iconfont-ali icon-ali-yidizhuanyishenqingbanlijinduchaxun"></i>
      <i class = "iconfont-ali icon-ali-daishouhuo"></i>
      <i class = "iconfont-ali icon-ali-pandian"></i>
      <i class = "iconfont-ali icon-ali-liushui"></i>
      <i class = "iconfont-ali icon-ali-leixing"></i>
      <i class = "iconfont-ali icon-ali-cangku"></i>
      <i class = "iconfont-ali icon-ali-kehu1"></i>
      <i class = "iconfont-ali icon-ali-tubiao-"></i>
      <i class = "iconfont-ali icon-ali-peizhitubiaosvg-"></i>
      <i class = "iconfont-ali icon-ali-kemu"></i>
      <i class = "iconfont-ali icon-ali-piaozhonghedingxinxi"></i>
      <i class = "iconfont-ali icon-ali-icon_A"></i>
      <i class = "iconfont-ali icon-ali-pichuli"></i>
      <i class = "iconfont-ali icon-ali-daibanshijian"></i>
      <i class = "iconfont-ali icon-ali--_cangku"></i>
      <i class = "iconfont-ali icon-ali-fengxian"></i>
      <i class = "iconfont-ali icon-ali-canshushezhi-05"></i>
      <i class = "iconfont-ali icon-ali-zu1773"></i>
      <i class = "iconfont-ali icon-ali-mingxi"></i>
      <i class = "iconfont-ali icon-ali-ico_loan_management"></i>
      <i class = "iconfont-ali icon-ali-kehu2"></i>
      <i class = "iconfont-ali icon-ali-shouhuo"></i>
      <i class = "iconfont-ali icon-ali-pandian1"></i>
      <i class = "iconfont-ali icon-ali-shujuquanxian"></i>
      <i class = "iconfont-ali icon-ali-cangpeitubiao_chuangjianrukudan"></i>
      <i class = "iconfont-ali icon-ali-cangpeitubiao_querenrukuquerenchukuquerenpandianjieguo"></i>
      <i class = "iconfont-ali icon-ali-sunyi"></i>
      <i class = "iconfont-ali icon-ali-jiaose1"></i>
      <i class = "iconfont-ali icon-ali-shenhe3"></i>
      <i class = "iconfont-ali icon-ali-yunshujihua"></i>
      <i class = "iconfont-ali icon-ali-tubiaozhizuomoban-51"></i>
      <i class = "iconfont-ali icon-ali-tubiaozhizuomoban-49"></i>
      <i class = "iconfont-ali icon-ali-ruzhang"></i>
      <i class = "iconfont-ali icon-ali-kuwei"></i>
      <i class = "iconfont-ali icon-ali-jiesuandanguanli"></i>
      <i class = "iconfont-ali icon-ali-denglurizhi"></i>
      <i class = "iconfont-ali icon-ali-caozuorizhi"></i>
      <i class = "iconfont-ali icon-ali-fengxianguanli"></i>
      <i class = "iconfont-ali icon-ali-shujujiankong"></i>
      <i class = "iconfont-ali icon-ali-rongzi"></i>
      <i class = "iconfont-ali icon-ali-ai226"></i>
      <i class = "iconfont-ali icon-ali-dingdan"></i>
      <i class = "iconfont-ali icon-ali-mall"></i>
      <i class = "iconfont-ali icon-ali-wuzicangku"></i>
      <i class = "iconfont-ali icon-ali-icon_function_ruku"></i>
      <i class = "iconfont-ali icon-ali-yonghuguohu-"></i>
      <i class = "iconfont-ali icon-ali-yunshu"></i>
      <i class = "iconfont-ali icon-ali-cheliangrenzheng"></i>
      <i class = "iconfont-ali icon-ali-sijirenzheng"></i>
      <i class = "iconfont-ali icon-ali-gongzuotai-querenbeijian"></i>
      <i class = "iconfont-ali icon-ali-goodswhoutStock"></i>
      <i class = "iconfont-ali icon-ali-14"></i>
      <i class = "iconfont-ali icon-ali-woyaorongzi00"></i>

      <i class="fa fa-address-book"></i>
      <i class="fa fa-address-book-o" aria-hidden="true"></i>
      <i class="fa fa-address-card" aria-hidden="true"></i>
      <i class="fa fa-address-card-o" aria-hidden="true"></i>
      <i class="fa fa-adjust" aria-hidden="true"></i>
      <i class="fa fa-american-sign-language-interpreting" aria-hidden="true"></i>
      <i class="fa fa-anchor" aria-hidden="true"></i>
      <i class="fa fa-archive" aria-hidden="true"></i>
      <i class="fa fa-area-chart" aria-hidden="true"></i>
      <i class="fa fa-arrows" aria-hidden="true"></i>
      <i class="fa fa-arrows-h" aria-hidden="true"></i>
      <i class="fa fa-arrows-v" aria-hidden="true"></i>
      <i class="fa fa-asl-interpreting" aria-hidden="true"></i>
      <i class="fa fa-assistive-listening-systems" aria-hidden="true"></i>
      <i class="fa fa-asterisk" aria-hidden="true"></i>
      <i class="fa fa-at" aria-hidden="true"></i>
      <i class="fa fa-audio-description" aria-hidden="true"></i>
      <i class="fa fa-automobile" aria-hidden="true"></i>
      <i class="fa fa-balance-scale" aria-hidden="true"></i>
      <i class="fa fa-ban" aria-hidden="true"></i>
      <i class="fa fa-bank" aria-hidden="true"></i>
      <i class="fa fa-bar-chart" aria-hidden="true"></i>
      <i class="fa fa-bar-chart-o" aria-hidden="true"></i>
      <i class="fa fa-barcode" aria-hidden="true"></i>
      <i class="fa fa-bars" aria-hidden="true"></i>
      <i class="fa fa-bath" aria-hidden="true"></i>
      <i class="fa fa-bathtub" aria-hidden="true"></i>
      <i class="fa fa-battery" aria-hidden="true"></i>
      <i class="fa fa-battery-0" aria-hidden="true"></i>
      <i class="fa fa-battery-1" aria-hidden="true"></i>
      <i class="fa fa-battery-2" aria-hidden="true"></i>
      <i class="fa fa-battery-3" aria-hidden="true"></i>
      <i class="fa fa-battery-4" aria-hidden="true"></i>
      <i class="fa fa-battery-empty" aria-hidden="true"></i>
      <i class="fa fa-battery-full" aria-hidden="true"></i>
      <i class="fa fa-battery-half" aria-hidden="true"></i>
      <i class="fa fa-battery-quarter" aria-hidden="true"></i>
      <i class="fa fa-battery-three-quarters" aria-hidden="true"></i>
      <i class="fa fa-bed" aria-hidden="true"></i>
      <i class="fa fa-beer" aria-hidden="true"></i>
      <i class="fa fa-bell" aria-hidden="true"></i>
      <i class="fa fa-bell-o" aria-hidden="true"></i>
      <i class="fa fa-bell-slash" aria-hidden="true"></i>
      <i class="fa fa-bell-slash-o" aria-hidden="true"></i>
      <i class="fa fa-bicycle" aria-hidden="true"></i>
      <i class="fa fa-binoculars" aria-hidden="true"></i>
      <i class="fa fa-birthday-cake" aria-hidden="true"></i>
      <i class="fa fa-blind" aria-hidden="true"></i>
      <i class="fa fa-bluetooth" aria-hidden="true"></i>
      <i class="fa fa-bluetooth-b" aria-hidden="true"></i>
      <i class="fa fa-bolt" aria-hidden="true"></i>
      <i class="fa fa-bomb" aria-hidden="true"></i>
      <i class="fa fa-book" aria-hidden="true"></i>
      <i class="fa fa-bookmark" aria-hidden="true"></i>
      <i class="fa fa-bookmark-o" aria-hidden="true"></i>
      <i class="fa fa-braille" aria-hidden="true"></i>
      <i class="fa fa-briefcase" aria-hidden="true"></i>
      <i class="fa fa-bug" aria-hidden="true"></i>
      <i class="fa fa-building" aria-hidden="true"></i>
      <i class="fa fa-building-o" aria-hidden="true"></i>
      <i class="fa fa-bullhorn" aria-hidden="true"></i>
      <i class="fa fa-bullseye" aria-hidden="true"></i>
      <i class="fa fa-bus" aria-hidden="true"></i>
      <i class="fa fa-cab" aria-hidden="true"></i>
      <i class="fa fa-calculator" aria-hidden="true"></i>
      <i class="fa fa-calendar" aria-hidden="true"></i>
      <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
      <i class="fa fa-calendar-minus-o" aria-hidden="true"></i>
      <i class="fa fa-calendar-o" aria-hidden="true"></i>
      <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
      <i class="fa fa-calendar-times-o" aria-hidden="true"></i>
      <i class="fa fa-camera" aria-hidden="true"></i>
      <i class="fa fa-camera-retro" aria-hidden="true"></i>
      <i class="fa fa-car" aria-hidden="true"></i>
      <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
      <i class="fa fa-caret-square-o-left" aria-hidden="true"></i>
      <i class="fa fa-caret-square-o-right" aria-hidden="true"></i>
      <i class="fa fa-caret-square-o-up" aria-hidden="true"></i>
      <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
      <i class="fa fa-cart-plus" aria-hidden="true"></i>
      <i class="fa fa-cc" aria-hidden="true"></i>
      <i class="fa fa-certificate" aria-hidden="true"></i>
      <i class="fa fa-check" aria-hidden="true"></i>
      <i class="fa fa-check-circle" aria-hidden="true"></i>
      <i class="fa fa-check-circle-o" aria-hidden="true"></i>
      <i class="fa fa-check-square" aria-hidden="true"></i>
      <i class="fa fa-check-square-o" aria-hidden="true"></i>
      <i class="fa fa-child" aria-hidden="true"></i>
      <i class="fa fa-circle" aria-hidden="true"></i>
      <i class="fa fa-circle-o" aria-hidden="true"></i>
      <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
      <i class="fa fa-circle-thin" aria-hidden="true"></i>
      <i class="fa fa-clock-o" aria-hidden="true"></i>
      <i class="fa fa-clone" aria-hidden="true"></i>
      <i class="fa fa-close" aria-hidden="true"></i>
      <i class="fa fa-cloud" aria-hidden="true"></i>
      <i class="fa fa-cloud-download" aria-hidden="true"></i>
      <i class="fa fa-cloud-upload" aria-hidden="true"></i>
      <i class="fa fa-code" aria-hidden="true"></i>
      <i class="fa fa-code-fork" aria-hidden="true"></i>
      <i class="fa fa-coffee" aria-hidden="true"></i>
      <i class="fa fa-cog" aria-hidden="true"></i>
      <i class="fa fa-cogs" aria-hidden="true"></i>
      <i class="fa fa-comment" aria-hidden="true"></i>
      <i class="fa fa-comment-o" aria-hidden="true"></i>
      <i class="fa fa-commenting" aria-hidden="true"></i>
      <i class="fa fa-commenting-o" aria-hidden="true"></i>
      <i class="fa fa-comments" aria-hidden="true"></i>
      <i class="fa fa-comments-o" aria-hidden="true"></i>
      <i class="fa fa-compass" aria-hidden="true"></i>
      <i class="fa fa-copyright" aria-hidden="true"></i>
      <i class="fa fa-creative-commons" aria-hidden="true"></i>
      <i class="fa fa-credit-card" aria-hidden="true"></i>
      <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
      <i class="fa fa-crop" aria-hidden="true"></i>
      <i class="fa fa-crosshairs" aria-hidden="true"></i>
      <i class="fa fa-cube" aria-hidden="true"></i>
      <i class="fa fa-cubes" aria-hidden="true"></i>
      <i class="fa fa-cutlery" aria-hidden="true"></i>
      <i class="fa fa-dashboard" aria-hidden="true"></i>
      <i class="fa fa-database" aria-hidden="true"></i>
      <i class="fa fa-deaf" aria-hidden="true"></i>
      <i class="fa fa-deafness" aria-hidden="true"></i>
      <i class="fa fa-desktop" aria-hidden="true"></i>
      <i class="fa fa-diamond" aria-hidden="true"></i>
      <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
      <i class="fa fa-download" aria-hidden="true"></i>
      <i class="fa fa-drivers-license" aria-hidden="true"></i>
      <i class="fa fa-drivers-license-o" aria-hidden="true"></i>
      <i class="fa fa-edit" aria-hidden="true"></i>
      <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      <i class="fa fa-envelope" aria-hidden="true"></i>
      <i class="fa fa-envelope-o" aria-hidden="true"></i>
      <i class="fa fa-envelope-open" aria-hidden="true"></i>
      <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
      <i class="fa fa-envelope-square" aria-hidden="true"></i>
      <i class="fa fa-eraser" aria-hidden="true"></i>
      <i class="fa fa-exchange" aria-hidden="true"></i>
      <i class="fa fa-exclamation" aria-hidden="true"></i>
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      <i class="fa fa-external-link" aria-hidden="true"></i>
      <i class="fa fa-external-link-square" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
      <i class="fa fa-eye-slash" aria-hidden="true"></i>
      <i class="fa fa-eyedropper" aria-hidden="true"></i>
      <i class="fa fa-fax" aria-hidden="true"></i>
      <i class="fa fa-feed" aria-hidden="true"></i>
      <i class="fa fa-female" aria-hidden="true"></i>
      <i class="fa fa-fighter-jet" aria-hidden="true"></i>
      <i class="fa fa-file-archive-o" aria-hidden="true"></i>
      <i class="fa fa-file-audio-o" aria-hidden="true"></i>
      <i class="fa fa-file-code-o" aria-hidden="true"></i>
      <i class="fa fa-file-excel-o" aria-hidden="true"></i>
      <i class="fa fa-file-image-o" aria-hidden="true"></i>
      <i class="fa fa-file-movie-o" aria-hidden="true"></i>
      <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
      <i class="fa fa-file-photo-o" aria-hidden="true"></i>
      <i class="fa fa-file-picture-o" aria-hidden="true"></i>
      <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
      <i class="fa fa-file-sound-o" aria-hidden="true"></i>
      <i class="fa fa-file-video-o" aria-hidden="true"></i>
      <i class="fa fa-file-word-o" aria-hidden="true"></i>
      <i class="fa fa-file-zip-o" aria-hidden="true"></i>
      <i class="fa fa-film" aria-hidden="true"></i>
      <i class="fa fa-filter" aria-hidden="true"></i>
      <i class="fa fa-fire" aria-hidden="true"></i>
      <i class="fa fa-fire-extinguisher" aria-hidden="true"></i>
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-flag-checkered" aria-hidden="true"></i>
      <i class="fa fa-flag-o" aria-hidden="true"></i>
      <i class="fa fa-flash" aria-hidden="true"></i>
      <i class="fa fa-flask" aria-hidden="true"></i>
      <i class="fa fa-folder" aria-hidden="true"></i>
      <i class="fa fa-folder-o" aria-hidden="true"></i>
      <i class="fa fa-folder-open" aria-hidden="true"></i>
      <i class="fa fa-folder-open-o" aria-hidden="true"></i>
      <i class="fa fa-frown-o" aria-hidden="true"></i>
      <i class="fa fa-futbol-o" aria-hidden="true"></i>
      <i class="fa fa-gamepad" aria-hidden="true"></i>
      <i class="fa fa-gavel" aria-hidden="true"></i>
      <i class="fa fa-gear" aria-hidden="true"></i>
      <i class="fa fa-gears" aria-hidden="true"></i>
      <i class="fa fa-gift" aria-hidden="true"></i>
      <i class="fa fa-glass" aria-hidden="true"></i>
      <i class="fa fa-globe" aria-hidden="true"></i>
      <i class="fa fa-graduation-cap" aria-hidden="true"></i>
      <i class="fa fa-group" aria-hidden="true"></i>
      <i class="fa fa-hand-grab-o" aria-hidden="true"></i>
      <i class="fa fa-hand-lizard-o" aria-hidden="true"></i>
      <i class="fa fa-hand-paper-o" aria-hidden="true"></i>
      <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
      <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
      <i class="fa fa-hand-rock-o" aria-hidden="true"></i>
      <i class="fa fa-hand-scissors-o" aria-hidden="true"></i>
      <i class="fa fa-hand-spock-o" aria-hidden="true"></i>
      <i class="fa fa-hand-stop-o" aria-hidden="true"></i>
      <i class="fa fa-handshake-o" aria-hidden="true"></i>
      <i class="fa fa-hard-of-hearing" aria-hidden="true"></i>
      <i class="fa fa-hashtag" aria-hidden="true"></i>
      <i class="fa fa-hdd-o" aria-hidden="true"></i>
      <i class="fa fa-headphones" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
      <i class="fa fa-heart-o" aria-hidden="true"></i>
      <i class="fa fa-heartbeat" aria-hidden="true"></i>
      <i class="fa fa-history" aria-hidden="true"></i>
      <i class="fa fa-home" aria-hidden="true"></i>
      <i class="fa fa-hotel" aria-hidden="true"></i>
      <i class="fa fa-hourglass" aria-hidden="true"></i>
      <i class="fa fa-hourglass-1" aria-hidden="true"></i>
      <i class="fa fa-hourglass-2" aria-hidden="true"></i>
      <i class="fa fa-hourglass-3" aria-hidden="true"></i>
      <i class="fa fa-hourglass-end" aria-hidden="true"></i>
      <i class="fa fa-hourglass-half" aria-hidden="true"></i>
      <i class="fa fa-hourglass-o" aria-hidden="true"></i>
      <i class="fa fa-hourglass-start" aria-hidden="true"></i>
      <i class="fa fa-i-cursor" aria-hidden="true"></i>
      <i class="fa fa-id-badge" aria-hidden="true"></i>
      <i class="fa fa-id-card" aria-hidden="true"></i>
      <i class="fa fa-id-card-o" aria-hidden="true"></i>
      <i class="fa fa-image" aria-hidden="true"></i>
      <i class="fa fa-inbox" aria-hidden="true"></i>
      <i class="fa fa-industry" aria-hidden="true"></i>
      <i class="fa fa-info" aria-hidden="true"></i>
      <i class="fa fa-info-circle" aria-hidden="true"></i>
      <i class="fa fa-institution" aria-hidden="true"></i>
      <i class="fa fa-key" aria-hidden="true"></i>
      <i class="fa fa-keyboard-o" aria-hidden="true"></i>
      <i class="fa fa-language" aria-hidden="true"></i>
      <i class="fa fa-laptop" aria-hidden="true"></i>
      <i class="fa fa-leaf" aria-hidden="true"></i>
      <i class="fa fa-legal" aria-hidden="true"></i>
      <i class="fa fa-lemon-o" aria-hidden="true"></i>
      <i class="fa fa-level-down" aria-hidden="true"></i>
      <i class="fa fa-level-up" aria-hidden="true"></i>
      <i class="fa fa-life-bouy" aria-hidden="true"></i>
      <i class="fa fa-life-buoy" aria-hidden="true"></i>
      <i class="fa fa-life-ring" aria-hidden="true"></i>
      <i class="fa fa-life-saver" aria-hidden="true"></i>
      <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
      <i class="fa fa-line-chart" aria-hidden="true"></i>
      <i class="fa fa-location-arrow" aria-hidden="true"></i>
      <i class="fa fa-lock" aria-hidden="true"></i>
      <i class="fa fa-low-vision" aria-hidden="true"></i>
      <i class="fa fa-magic" aria-hidden="true"></i>
      <i class="fa fa-magnet" aria-hidden="true"></i>
      <i class="fa fa-mail-forward" aria-hidden="true"></i>
      <i class="fa fa-mail-reply" aria-hidden="true"></i>
      <i class="fa fa-mail-reply-all" aria-hidden="true"></i>
      <i class="fa fa-male" aria-hidden="true"></i>
      <i class="fa fa-map" aria-hidden="true"></i>
      <i class="fa fa-map-marker" aria-hidden="true"></i>
      <i class="fa fa-map-o" aria-hidden="true"></i>
      <i class="fa fa-map-pin" aria-hidden="true"></i>
      <i class="fa fa-map-signs" aria-hidden="true"></i>
      <i class="fa fa-meh-o" aria-hidden="true"></i>
      <i class="fa fa-microchip" aria-hidden="true"></i>
      <i class="fa fa-microphone" aria-hidden="true"></i>
      <i class="fa fa-microphone-slash" aria-hidden="true"></i>
      <i class="fa fa-minus" aria-hidden="true"></i>
      <i class="fa fa-minus-circle" aria-hidden="true"></i>
      <i class="fa fa-minus-square" aria-hidden="true"></i>
      <i class="fa fa-minus-square-o" aria-hidden="true"></i>
      <i class="fa fa-mobile" aria-hidden="true"></i>
      <i class="fa fa-mobile-phone" aria-hidden="true"></i>
      <i class="fa fa-money" aria-hidden="true"></i>
      <i class="fa fa-moon-o" aria-hidden="true"></i>
      <i class="fa fa-mortar-board" aria-hidden="true"></i>
      <i class="fa fa-motorcycle" aria-hidden="true"></i>
      <i class="fa fa-mouse-pointer" aria-hidden="true"></i>
      <i class="fa fa-music" aria-hidden="true"></i>
      <i class="fa fa-navicon" aria-hidden="true"></i>
      <i class="fa fa-newspaper-o" aria-hidden="true"></i>
      <i class="fa fa-object-group" aria-hidden="true"></i>
      <i class="fa fa-object-ungroup" aria-hidden="true"></i>
      <i class="fa fa-paint-brush" aria-hidden="true"></i>
      <i class="fa fa-paper-plane" aria-hidden="true"></i>
      <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
      <i class="fa fa-paw" aria-hidden="true"></i>
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-pencil-square" aria-hidden="true"></i>
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      <i class="fa fa-percent" aria-hidden="true"></i>
      <i class="fa fa-phone" aria-hidden="true"></i>
      <i class="fa fa-phone-square" aria-hidden="true"></i>
      <i class="fa fa-photo" aria-hidden="true"></i>
      <i class="fa fa-picture-o" aria-hidden="true"></i>
      <i class="fa fa-pie-chart" aria-hidden="true"></i>
      <i class="fa fa-plane" aria-hidden="true"></i>
      <i class="fa fa-plug" aria-hidden="true"></i>
      <i class="fa fa-plus" aria-hidden="true"></i>
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
      <i class="fa fa-plus-square" aria-hidden="true"></i>
      <i class="fa fa-plus-square-o" aria-hidden="true"></i>
      <i class="fa fa-podcast" aria-hidden="true"></i>
      <i class="fa fa-power-off" aria-hidden="true"></i>
      <i class="fa fa-print" aria-hidden="true"></i>
      <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
      <i class="fa fa-qrcode" aria-hidden="true"></i>
      <i class="fa fa-question" aria-hidden="true"></i>
      <i class="fa fa-question-circle" aria-hidden="true"></i>
      <i class="fa fa-question-circle-o" aria-hidden="true"></i>
      <i class="fa fa-quote-left" aria-hidden="true"></i>
      <i class="fa fa-quote-right" aria-hidden="true"></i>
      <i class="fa fa-random" aria-hidden="true"></i>
      <i class="fa fa-recycle" aria-hidden="true"></i>
      <i class="fa fa-refresh" aria-hidden="true"></i>
      <i class="fa fa-registered" aria-hidden="true"></i>
      <i class="fa fa-remove" aria-hidden="true"></i>
      <i class="fa fa-reorder" aria-hidden="true"></i>
      <i class="fa fa-reply" aria-hidden="true"></i>
      <i class="fa fa-reply-all" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-road" aria-hidden="true"></i>
      <i class="fa fa-rocket" aria-hidden="true"></i>
      <i class="fa fa-rss" aria-hidden="true"></i>
      <i class="fa fa-rss-square" aria-hidden="true"></i>
      <i class="fa fa-s15" aria-hidden="true"></i>
      <i class="fa fa-search" aria-hidden="true"></i>
      <i class="fa fa-search-minus" aria-hidden="true"></i>
      <i class="fa fa-search-plus" aria-hidden="true"></i>
      <i class="fa fa-send" aria-hidden="true"></i>
      <i class="fa fa-send-o" aria-hidden="true"></i>
      <i class="fa fa-server" aria-hidden="true"></i>
      <i class="fa fa-share" aria-hidden="true"></i>
      <i class="fa fa-share-alt" aria-hidden="true"></i>
      <i class="fa fa-share-alt-square" aria-hidden="true"></i>
      <i class="fa fa-share-square" aria-hidden="true"></i>
      <i class="fa fa-share-square-o" aria-hidden="true"></i>
      <i class="fa fa-shield" aria-hidden="true"></i>
      <i class="fa fa-ship" aria-hidden="true"></i>
      <i class="fa fa-shopping-bag" aria-hidden="true"></i>
      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      <i class="fa fa-shower" aria-hidden="true"></i>
      <i class="fa fa-sign-in" aria-hidden="true"></i>
      <i class="fa fa-sign-language" aria-hidden="true"></i>
      <i class="fa fa-sign-out" aria-hidden="true"></i>
      <i class="fa fa-signal" aria-hidden="true"></i>
      <i class="fa fa-signing" aria-hidden="true"></i>
      <i class="fa fa-sitemap" aria-hidden="true"></i>
      <i class="fa fa-sliders" aria-hidden="true"></i>
      <i class="fa fa-smile-o" aria-hidden="true"></i>
      <i class="fa fa-snowflake-o" aria-hidden="true"></i>
      <i class="fa fa-soccer-ball-o" aria-hidden="true"></i>
      <i class="fa fa-sort" aria-hidden="true"></i>
      <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>
      <i class="fa fa-sort-alpha-desc" aria-hidden="true"></i>
      <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>
      <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
      <i class="fa fa-sort-asc" aria-hidden="true"></i>
      <i class="fa fa-sort-desc" aria-hidden="true"></i>
      <i class="fa fa-sort-down" aria-hidden="true"></i>
      <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i>
      <i class="fa fa-sort-numeric-desc" aria-hidden="true"></i>
      <i class="fa fa-sort-up" aria-hidden="true"></i>
      <i class="fa fa-space-shuttle" aria-hidden="true"></i>
      <i class="fa fa-spinner" aria-hidden="true"></i>
      <i class="fa fa-spoon" aria-hidden="true"></i>
      <i class="fa fa-square" aria-hidden="true"></i>
      <i class="fa fa-square-o" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star-half" aria-hidden="true"></i>
      <i class="fa fa-star-half-empty" aria-hidden="true"></i>
      <i class="fa fa-star-half-full" aria-hidden="true"></i>
      <i class="fa fa-star-half-o" aria-hidden="true"></i>
      <i class="fa fa-star-o" aria-hidden="true"></i>
      <i class="fa fa-sticky-note" aria-hidden="true"></i>
      <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
      <i class="fa fa-street-view" aria-hidden="true"></i>
      <i class="fa fa-suitcase" aria-hidden="true"></i>
      <i class="fa fa-sun-o" aria-hidden="true"></i>
      <i class="fa fa-support" aria-hidden="true"></i>
      <i class="fa fa-tablet" aria-hidden="true"></i>
      <i class="fa fa-tachometer" aria-hidden="true"></i>
      <i class="fa fa-tag" aria-hidden="true"></i>
      <i class="fa fa-tags" aria-hidden="true"></i>
      <i class="fa fa-tasks" aria-hidden="true"></i>
      <i class="fa fa-taxi" aria-hidden="true"></i>
      <i class="fa fa-television" aria-hidden="true"></i>
      <i class="fa fa-terminal" aria-hidden="true"></i>
      <i class="fa fa-thermometer" aria-hidden="true"></i>
      <i class="fa fa-thermometer-0" aria-hidden="true"></i>
      <i class="fa fa-thermometer-1" aria-hidden="true"></i>
      <i class="fa fa-thermometer-2" aria-hidden="true"></i>
      <i class="fa fa-thermometer-3" aria-hidden="true"></i>
      <i class="fa fa-thermometer-4" aria-hidden="true"></i>
      <i class="fa fa-thermometer-empty" aria-hidden="true"></i>
      <i class="fa fa-thermometer-full" aria-hidden="true"></i>
      <i class="fa fa-thermometer-half" aria-hidden="true"></i>
      <i class="fa fa-thermometer-quarter" aria-hidden="true"></i>
      <i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i>
      <i class="fa fa-thumb-tack" aria-hidden="true"></i>
      <i class="fa fa-thumbs-down" aria-hidden="true"></i>
      <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
      <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
      <i class="fa fa-thumbs-up" aria-hidden="true"></i>
      <i class="fa fa-ticket" aria-hidden="true"></i>
      <i class="fa fa-times" aria-hidden="true"></i>
      <i class="fa fa-times-circle" aria-hidden="true"></i>
      <i class="fa fa-times-circle-o" aria-hidden="true"></i>
      <i class="fa fa-times-rectangle" aria-hidden="true"></i>
      <i class="fa fa-times-rectangle-o" aria-hidden="true"></i>
      <i class="fa fa-tint" aria-hidden="true"></i>
      <i class="fa fa-toggle-down" aria-hidden="true"></i>
      <i class="fa fa-toggle-left" aria-hidden="true"></i>
      <i class="fa fa-toggle-off" aria-hidden="true"></i>
      <i class="fa fa-toggle-on" aria-hidden="true"></i>
      <i class="fa fa-toggle-right" aria-hidden="true"></i>
      <i class="fa fa-toggle-up" aria-hidden="true"></i>
      <i class="fa fa-trademark" aria-hidden="true"></i>
      <i class="fa fa-trash" aria-hidden="true"></i>
      <i class="fa fa-trash-o" aria-hidden="true"></i>
      <i class="fa fa-tree" aria-hidden="true"></i>
      <i class="fa fa-trophy" aria-hidden="true"></i>
      <i class="fa fa-truck" aria-hidden="true"></i>
      <i class="fa fa-tty" aria-hidden="true"></i>
      <i class="fa fa-tv" aria-hidden="true"></i>
      <i class="fa fa-umbrella" aria-hidden="true"></i>
      <i class="fa fa-universal-access" aria-hidden="true"></i>
      <i class="fa fa-university" aria-hidden="true"></i>
      <i class="fa fa-unlock" aria-hidden="true"></i>
      <i class="fa fa-unlock-alt" aria-hidden="true"></i>
      <i class="fa fa-unsorted" aria-hidden="true"></i>
      <i class="fa fa-upload" aria-hidden="true"></i>
      <i class="fa fa-user" aria-hidden="true"></i>
      <i class="fa fa-user-circle" aria-hidden="true"></i>
      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
      <i class="fa fa-user-o" aria-hidden="true"></i>
      <i class="fa fa-user-plus" aria-hidden="true"></i>
      <i class="fa fa-user-secret" aria-hidden="true"></i>
      <i class="fa fa-user-times" aria-hidden="true"></i>
      <i class="fa fa-users" aria-hidden="true"></i>
      <i class="fa fa-vcard" aria-hidden="true"></i>
      <i class="fa fa-vcard-o" aria-hidden="true"></i>
      <i class="fa fa-video-camera" aria-hidden="true"></i>
      <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
      <i class="fa fa-volume-down" aria-hidden="true"></i>
      <i class="fa fa-volume-off" aria-hidden="true"></i>
      <i class="fa fa-volume-up" aria-hidden="true"></i>
      <i class="fa fa-warning" aria-hidden="true"></i>
      <i class="fa fa-wheelchair" aria-hidden="true"></i>
      <i class="fa fa-wheelchair-alt" aria-hidden="true"></i>
      <i class="fa fa-wifi" aria-hidden="true"></i>
      <i class="fa fa-window-close" aria-hidden="true"></i>
      <i class="fa fa-window-close-o" aria-hidden="true"></i>
      <i class="fa fa-window-maximize" aria-hidden="true"></i>
      <i class="fa fa-window-minimize" aria-hidden="true"></i>
      <i class="fa fa-window-restore" aria-hidden="true"></i>
      <i class="fa fa-wrench" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'icons',
  methods: {
    fun ($event) {
      const target = $event.target
      if (target && target.tagName === 'I') {
        this.$emit('checkedIcon', target.classList.value)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .ico-list {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: 350px;
    overflow: auto;
    background-color: rgba(0,0,0,0.9);
    z-index: 1000;
    box-shadow: 0 0 5px #ccc;
    user-select: none;
    .fa{
      font-size: 18px;
      cursor: pointer;
    }
    i{
      display: inline-block;
      margin: 5px;
      cursor: pointer;
      &:active{
        opacity: 0.7;
      }
    }
  }
</style>

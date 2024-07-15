// ==UserScript==
// @license MIT
// @name         更好看的CoCo编辑器
// @namespace    http://tampermonkey.net/
// @version      2.00
// @description  可以使用更好看的CoCo进行创作！
// @author       编程猫  SUDA编程
// @match        https://coco.codemao.cn/*
// @match        https://appcraft.codemao.cn/*
// @icon         https://coco.codemao.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.head.innerHTML += `
<style id="ghkdcocobjqscript">
.Header_wrapper__3tGRg {
     width: 100%;
     height: 100%;
     background: #9429ff;
     box-shadow: 0 -3px 30px #9429ff;
     position: relative;
     z-index: 1;
     display: flex;
     align-items: center;
     justify-content: space-between;
     -webkit-user-select: none;
     -ms-user-select: none;
     user-select: none;
}
.Header_menu__Zy7KP .coco-dropdown-active, 
.Header_menu__Zy7KP .coco-dropdown-selector:hover {
     background: #a142ff;
}
.Header_projectTitleWrapper__2Fwje .Header_projectTitle__3fvYk:hover {     background-color: #a142ff; }.Header_iconWrapper__1R5yU:active, .Header_iconWrapper__1R5yU:hover {     background: #a142ff;     border-radius: 4px; }.Header_packageBtn__uKJgR:not(:disabled):active, .Header_packageBtn__uKJgR:not(:disabled):hover {     border-color: hsla(0,0%,100%,.5);     background: #a142ff; }.ScreenList_wrapper__nhsQ3 .ScreenList_screenIndexBox__1Wq_j .ScreenList_screenIndexList__1K5Ah .ScreenList_index__1Rg7r.ScreenList_active__q9aHn {     color: #fff;     background-color: #a74fff; }.Notice_container__6Feqw.Notice_warn__2t0LW {     border: 1px solid #9a84f8;     background: #9429ff;     color: #ffffff;     box-shadow: 0 2px 8px 0 #ad5aff; }.Notice_container__6Feqw .Notice_message__3wDPL {     font-size: 16px;     font-weight: 400; color:#fff;}
    .WidgetTree_item__322OE.WidgetTree_selected__tq-Ka {
    background: #9429ff;
    color: #fff;
}

.App_main__1CX15 {
    padding: 15px;
}
.EditArea_wrapper__2U_dC {
    border-radius: 15px;
    flex: auto;
    min-width: 500px;
    position: relative;
    /* background-color: var(--background-color); */
    box-shadow: 0 2px 6px 0rgba(177,163,191,.24);
    overflow: hidden;
    display: flex;
    border: 1px solid #dddfe5;
}
.App_main__1CX15 {
    padding: 15px;
}


.EditArea_wrapper__2U_dC{
box-shadow: 0 5px 30px 0 #00000030;
}
.PreviewArea_appZone__2q22j {
    height: 640px;
    width: 360px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 14px 30px #00000050;
    border-radius: 10px;
}
.style_screenView__1wSrw {
    position: absolute;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 10px;
}

.coco-dropdown-0 {
    display: inline-block;
    position: relative;
}

.RightSideMenu_wrapper__pn2lJ .RightSideMenu_active__R-hSf {
    color: #fff;
    background-color: #43800d;
}
.header_2854b, .header_2854b .left_cCjn1 {
    z-index: 9999999;
    background: #9429ff;
    box-shadow: 0 -3px 30px #9429ff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.home_1xbqQ .center_1aavX .courseBox_3gdMf .courseList_215BE .courseItem_135NY:hover {
    -webkit-box-shadow: 0 4px 10px 0 hsl(222deg 6% 55% / 18%);
    box-shadow: 0 4px 10px 0 hsl(222deg 6% 55% / 18%);
    transform: scale(1.05);
}
.home_1xbqQ .center_1aavX .courseBox_3gdMf .courseList_215BE .courseItem_135NY {
    height: 280px;
    background: #fff;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.home_1xbqQ .center_1aavX .courseBox_3gdMf .courseList_215BE .courseItem_135NY:hover .image_3jclR {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}
.workItem_1O_f_ {
    height: 246px;
    padding: 16px;
    background: #fff;
    border-radius: 19px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    transition: all 0.3s ease;
}
.workItem_1O_f_:hover {
    transform: scale(1.05);
}
.workItem_1O_f_:hover .image_1dBWm {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}
.oldUserTemplate_1-Xwf {
    display: none;
}
.home_1xbqQ .center_1aavX .bannerBox_yjTIz {
    transition: all 0.3s ease;
    position: relative;
    height: 180px;
    margin-bottom: 20px;
    border-radius: 20px;
    overflow: hidden;
}
.home_1xbqQ .center_1aavX .bannerBox_yjTIz:hover {
    transform: scale(1.05);
}
.work_vTtGt .workCategory_3DvgF .workType_2Bw2Q .active_303_X {
    color: #fff;
    background: #9429ff;
    box-shadow: 0 0 10px #9429ff;
}
.work_vTtGt .workCategory_3DvgF .workType_2Bw2Q .typeItem_18xio {
    margin-right: 12px;
    width: 80px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    color: #9429ff;
    background: #f5f3fe;
    border-radius: 16px;
    cursor: pointer;
}
.workItem_1O_f_ .workImage_3xrWJ .workType_33RWx {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 40px;
    height: 16px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    background: #9429ff;
    border-radius: 4px;
    padding: 9px;
}
.menu_1w3Mf .menuItem_2T-tv.active_2n4FR .menuIcon_SvcXz {
    color: #9429ff;
}
.menu_1w3Mf .menuItem_2T-tv.active_2n4FR {
    color: #9429ff;
    background: #f4f1ff;
}
</style>
`})();

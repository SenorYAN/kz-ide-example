define(['zepto'], function($) {
    'use strict';
    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    return {
        //输出到发布页面，当用户正式发布后，调用此函数创建视图。
        onAfterRender: function(el) {
            var location =window.location.pathname;
            var host =window.location.origin;
            var _break=false;
            $(el).find("li a").each(function(){
              if(_break){
                return ;
              }
               if($(this).attr("href").toLowerCase().replace(host,"")==location){
                   $(this).parent().addClass("cur");
                   _break=true;
               }
            });
        }
    }
});
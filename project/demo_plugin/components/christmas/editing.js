/*
 组件类定义。
 */
define(['jquery', 'configurableComponent','lib/mustache','utils/uiHelper'], function($, Component,mustache,uiHelper) {
    'use strict';
    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    var showdata = function(that){
        // console.log(that.$viewEl.outerHTML);
    };
    return Component.extend({
        html_edit: '<div class=\"mod mod-christmas\" style=\"\"><div class=\"mod-christmas-content\" style=\"height:{{height}}\"><div class=\"mod-christmas-share\"><div class=\"mod-christmas-share-top\"><span>分享到：</span>><a data-role=\"qq\"></a><a data-role=\"renren\"></a><a data-role=\"sina\"></a><a data-role=\"douban\"></a></div><textarea></textarea><div class=\"mod-christmas-share-footer\"><a class=\"submit-button\">分享</a></div></div><div class=\"logo\"></div></div></div>',
        //输出到配置窗口，事件绑定使用$el.delegate 绑定，当删除$el时同时删除对应事件
        renderView:function(){     
            this.$viewEl.html(mustache.render(this.html_edit,this.getData()));
            this.$viewEl.find("textarea").attr("placeholder","圣诞节搜狐快站大酬宾啦！");
        },
        renderConfigurator: function() {
            Component.prototype.renderConfigurator.call(this);
            var that = this;
            this.listen("height", "%");
        },
        listen: function (name, unit) {
            var that = this;
            this.$configEl.delegate('[name="' + name + '"] ', 'change',  function (ev) {
                var txt = $(ev.target).val();
                that.data[name] = txt + unit;
                that.renderView();
            });
            return this;
        }
    });

});
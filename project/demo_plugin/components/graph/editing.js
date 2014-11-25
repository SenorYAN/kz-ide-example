/*
 组件类定义。
 */
define(['jquery', 'configurableComponent'], function($, Component) {
    'use strict';

    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    return Component.extend({
        "html_edit": "<div class=\"mod mod-nav mod-nav-{{nav_theme}} {{nav_theme}}\" style='margin:{{margin-top}} {{margin-right}} {{margin-bottom}} {{margin-left}};'><span class=\"arr-left nav-arrow\"><</span><div class=\"nav-container\"><ul class=\"nav1\">{{#items}}<li style=\"width:{{width}}\"><a href=\"javascript:;\" url=\"{{link}}\" title=\"{{title}}\">{{title}}</a><i></i></li>{{/items}}</ul><ul class=\"nav2\"></ul></div><span class=\"arr-right nav-arrow\">></span></div>",
        //输出到配置窗口，事件绑定使用$el.delegate 绑定，当删除$el时同时删除对应事件
        renderConfigurator: function() {
            var that = this;
            this.listen("items", "", function(ev) {
                var
                        v = $(ev.target).val(),
                        items = $.evalJSON(v),
                        //计算width
                        width = (1 / items.length) * 100 + "%";

                for (var i in items) {
                    items[i].width = width;
                }

                that.data['items'] = items;
                that.renderView();
            });
	        Component.prototype.renderConfigurator.apply(this);
            var val= this.data["nav_theme"]=="theme1"?"t1":this.data["nav_theme"]=="theme2"?"t2":this.data["nav_theme"]=="theme3"?"t3":"t1";
            this.$configEl.find('li.type-li.cur').removeClass("cur");
            this.$configEl.find(".mod-nav").find('li:eq(1)').addClass("cur");

            this.$configEl.find('li[data-val="'+val+'"]').addClass("cur");
            this.listen("nav_theme", "");
            this.listenMargin();
        },
	    isValid: function() {
		    var m = this,
			    w = m.$propertyPanel.find(".ui-grouplink"),
			    items = this.data['items'];
		    if (!items || items.length < 2) {
			    return {
				    message: "不能少于2个导航项"
			    };
		    }
		    w.find(".vd-error").removeClass("vd-error");

		    function checkLinkContent(item) {
			    switch (item.link_res_type) {
				    case 1://URL
				    case "1":
					    return (item.link != "");
					    break;
				    case 2://文章
				    case "2":
				    case 3://页面
				    case "3":
				    case 5://电商
				    case "5":
				    case 6://论坛
				    case "6":
					    return (item.link_res_id != "");
					    break;
			    }
		    }

		    for (var i = 0; i < items.length; i++) {
			    var item = items[i];
			    if (!item.title || item.title == "") {
				    w.find(".link-item").eq(i).find(".col-name input[type=text]").addClass("vd-error");
				    return {
					    message: "导航名称不能为空"
				    };
			    }
			    if (item.title.length > 20) {
				    w.find(".link-item").eq(i).find(".col-name input[type=text]").addClass("vd-error");
				    return {
					    message: "导航名称不能超过20个字"
				    };
			    }
			    if (!item.link_res_type) {
				    w.find(".link-item").eq(i).find(".col-type .select").addClass("vd-error");
				    return {
					    message: "导航类型必须指定"
				    };
			    }
				/*
			    if (!checkLinkContent(item)) {
				    w.find(".link-item").eq(i).find(".col-link .select, .col-link :text").addClass("vd-error");
				    return {
					    message: "导航链接不能为空"
				    };
			    }
			    */
		    }
		    return true;
	    }
    });
});

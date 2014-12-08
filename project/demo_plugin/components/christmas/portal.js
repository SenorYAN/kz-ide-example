define([''], function () {
    'use strict';
    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    return {
            //输出到发布页面，当用户正式发布后，调用此函数创建视图。
            onAfterRender:function(el){
            	console.log($(el));
            	$(el).find("textarea").attr("placeholder","圣诞节搜狐快站大酬宾啦！");
            	var url;
            	var flag;
            	var dict = {
	                "sina": 'http://service.weibo.com/share/share.php?url=',
	                "douban": 'http://www.douban.com/share/service?bm=&image=&href=',
	                "qq": 'http://share.v.t.qq.com/index.php?c=share&a=index&url=',
	                "renren": 'http://widget.renren.com/dialog/share?resourceUrl='
            	};
          		$(el).delegate("[data-role]","click",function(){
          			flag = $(this).data("role");
          			console.log(flag);
          			url=dict[flag];
          		});

          		$(el).delegate(".submit-button","click",function(){
          			console.log(url);
                	if(url){
                		console.log(url+"http://www.kuaizhan.com")
                		window.open(url+"http://www.kuaizhan.com");
                	}
          		});
            }
        }
});

define(['zepto'], function($) {
    'use strict';
    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    return {
        //输出到发布页面，当用户正式发布后，调用此函数创建视图。
        onAfterRender: function(el) {
            //判断汉字字符串的长度
            var DataLength = function(fData) {
                var intLength = 0
                for (var i = 0; i < fData.length; i++) {
                    if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
                        intLength = intLength + 2 //unicode汉字字符
                    else
                        intLength = intLength + 1 //英文字符
                }
                return intLength;
            };

            var that = this,
                date = new Date(),
                day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四");
            var citytq = $(el).attr("city"); // 获取城市
            var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&dfc=3&day=3";
            var tq = "";
            var img1, img2;
            var f, _f, ff;
            //加载天气信息
            var script = document.createElement('script');

            script.src=url;
            script.charset="gbk";

            $(script).on("load", function(){
                     display_weather();
            }).appendTo("head");
           
            function display_weather(){
                console.log(1);
                var _w = window.SWther.w[citytq];
                console.log(_w);
                var i = 0;
                var _tr = $(el).find(".weather_ul").find("li");
                var _td = $(el).find(".weather_ul_today").find("li");
                var picurl = "http://mat1.gtimg.com/weather/2014gaiban/";
                console.log("2");
                for (var key in _w) {
                    if (key == 0) {
                        $(_td[0]).html("<span class='cityname'>" + citytq + "</span>");
                        if (DataLength(citytq) > 3) {
                            $(el).find(".weather_ul_today li:nth-child(1)").css({
                                "font-size": "20px",
                                "height": "40px",
                                "line-height": "50px"
                            });
                        }
                        if (new Date().getHours() > 17) {
                            f = _w[key].f2 + "_1.png";
                            ff = (_w[key].s2.indexOf("雨") >= 0 || _w[key].s2.indexOf("雪") >= 0) ? (_w[key].s2.indexOf("雨") >= 0 ? picurl + "xiaoyu.jpg" : picurl + "xue.jpg") : picurl + _w[key].f2 + "_yejian.jpg";
                            $(el).css("background-image", "url(" + ff + ")");
                            img1 = "<img width='70px' height='70px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                            $(_td[1]).html(img1);
                            $(_td[2]).html(day[date.getDay() + i]);
                            $(_td[3]).html(_w[key].s2 + _w[key].t2 + "℃");
                        } else {
                            f = _w[key].f1 + "_0.png";
                            ff = (_w[key].s1.indexOf("雨") >= 0 || _w[key].s1.indexOf("雪") >= 0) ? (_w[key].s1.indexOf("雨") >= 0 ? picurl + "xiaoyu.jpg" : picurl + "xue.jpg") : picurl + _w[key].f1 + "_baitian.jpg";
                            $(el).css("background-image", "url(" + ff + ")");
                            img1 = "<img width='70px' height='70px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                            $(_td[1]).html(img1);
                            $(_td[2]).html(day[date.getDay() + i]);
                            $(_td[3]).html(_w[key].s1 + _w[key].t1 + "℃");
                            console.log("3");
                        }
                        $(_td[4]).html("风力" + _w[key].p1 + "级");
                    } else {
                        f = _w[key].f1 + "_0.png";
                        _f = _w[key].f2 + "_0.png";
                        if (new Date().getHours() > 17) {
                            f = _w[key].f1 + "_1.png";
                            _f = _w[key].f2 + "_1.png";
                        }
                        img1 = "<img width='32px' height='32px' src='http://php.weather.sina.com.cn/images/yb3/78_78/" + f + "'/>";
                        img2 = "<img width='32px' height='32px' src='http://php.weather.sina.com.cn/images/yb3/78_78/" + _f + "'/>"
                        tq = "<span>" + day[date.getDay() + i] + "</span><span>" + img1 + "</span><span>" + _w[key].s1 + "</span><span>" + _w[key].t2 + "℃～" + _w[key].t1 + "℃</span>";
                        $(_tr[i - 1]).html(tq);
                        console.log("4");
                    }
                    i++;
                }
            }
        }
    }
});
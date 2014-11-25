define(['jquery'], function ($) {
    'use strict';
    //初始化组件类，参数为组件配置，如果组件第一次创建，将传递空配置，如果组件为已经创建到视图窗口，重新加载，将传递已保存的配置
    return {
        //输出到发布页面，当用户正式发布后，调用此函数创建视图。
        onAfterRender: function (el) {
            var that = this,
                cityUrl = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
                date = new Date(),
                first = $(el).attr("first"),
                day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四");
            $.getScript(cityUrl, function (script, textStatus, jqXHR) {
                    var citytq =first?$(el).attr("city"):remote_ip_info.city;// 获取城市
                    var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&dfc=3";
                    var tq = "";
                    var img1, img2;
                    var f, _f, ff;
                    $.ajax({
                        url: url,
                        dataType: "script",
                        scriptCharset: "gbk",
                        data: {
                            "day": 3
                        },
                        success: function (data) {
                            var _w = window.SWther.w[citytq];
                            var i = 0;
                            var _tr = $(el).find(".weather_ul").find("li");
                            var _td = $(el).find(".weather_ul_today").find("li");
                            var picurl = "http://mat1.gtimg.com/weather/2014gaiban/";
                            console.log("a");
                            $(el).find(".weather_ul").find("li").css("text-indent","1.5em");
                            for (var key in _w) {
                                if (key == 0) {
                                    $(_td[0]).html( citytq);
                                    if (new Date().getHours() > 17) {
                                        f = _w[key].f1 + "_1.png";
                                        ff = (_w[key].s1.indexOf("雨")>=0||_w[key].s1.indexOf("雪")>=0)?(_w[key].s1.indexOf("雨")>=0?picurl + "xiaoyu.jpg":picurl + "xue.jpg"):picurl + _w[key].f1 + "_yejian.jpg";
                                        $(el).css("background-image","url(" + ff +")");
                                        img1 = "<img width='80px' height='80px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                                        $(_td[1]).html( img1);
                                        $(_td[2]).html( day[date.getDay() + i] +  _w[key].s2);
                                        $(_td[3]).html( _w[key].s1 + _w[key].t2 + "℃");
                                    }
                                    else {
                                        f = _w[key].f1 + "_0.png";
                                        ff = (_w[key].s1.indexOf("雨")>=0||_w[key].s1.indexOf("雪")>=0)?(_w[key].s1.indexOf("雨")>=0?picurl + "xiaoyu.jpg":picurl + "xue.jpg"):picurl + _w[key].f1 + "_baitian.jpg";
                                        $(el).css("background-image","url(" + ff +")");
                                        img1 = "<img width='80px' height='80px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                                        $(_td[1]).html( img1);
                                        $(_td[2]).html( day[date.getDay() + i] );
                                        $(_td[3]).html( _w[key].s1 + _w[key].t1 + "℃");
                                    }
                                    $(_td[4]).html( _w[key].d1 + _w[key].p1 + "级");
                                }
                                else {
                                    f = _w[key].f1 + "_0.png";
                                    _f = _w[key].f2 + "_0.png";
                                    if (new Date().getHours() > 17) {
                                        f = _w[key].f1 + "_1.png";
                                        _f = _w[key].f2 + "_1.png";
                                    }
                                    img1 = "<img width='32px' height='32px' src='http://php.weather.sina.com.cn/images/yb3/78_78/" + f + "'/>";
                                    img2 = "<img width='32px' height='32px' src='http://php.weather.sina.com.cn/images/yb3/78_78/" + _f + "'/>"
                                    tq = day[date.getDay() + i] + " " + img1 + " " + _w[key].s1 +  _w[key].t1 + "℃～" + _w[key].t2 + "℃  " ;
                                    $(_tr[i - 1]).html(tq);
                                }
                                i++;
                            }
                        }
                    });
                }
            );
        }
    }
});

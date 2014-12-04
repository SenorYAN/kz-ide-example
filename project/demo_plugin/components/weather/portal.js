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
            var c2e ={
                "晴":"qing",
                "阴":"yin",
                "雪":"xue",
                "雨":"yu",
                "雾":"wu",
                "霾":"mai",
                "多云":"duoyun"
            };
            var that = this,
                date = new Date(),
                day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四");
            var citytq = $(el).attr("city"); // 获取城市
            var url = "http://maoyan_test.jd-app.com/index.php?city="+citytq;
            var tq = "";
            var img1, img2;
            var f1,f2;
            //加载天气信息
            $.ajax({/////////////////
                url: url,
                scriptCharset: "utf-8",
                type: "get",
                dataType: "json",
                success: function(data) {
                    console.log(data);               
                    var _w = data.results[0]["weather_data"];
                    console.log(_w);
                    var i = 0;
                    var _tr = $(el).find(".weather_ul").find("li");
                    var _td = $(el).find(".weather_ul_today").find("li");
                    var picurl = "http://mat1.gtimg.com/weather/2014gaiban/";
                    $(_td[0]).html("<span>" + citytq + "</span>");
                    if (DataLength(citytq) > 3) {
                        $(el).find(".weather_ul_today li:nth-child(1)").css({
                            "font-size": "20px",
                            "height": "40px",
                            "line-height": "50px"
                        });
                    }
                    for (var key in _w) {
                        img1 = "<img src="+ _w[key]["dayPictureUrl"] +"/>";
                        img2 = "<img src="+ _w[key]["nightPictureUrl"] +"/>";
                        if (key == 0) {
                            if(_w[key]["weather"].indexOf("雨") >= 0||_w[key]["weather"].indexOf("雪") >= 0){
                                f1 = picurl+ "xue.png";
                                f2 = picurl+ "xue.png";
                            }else{
                                f1 = picurl + c2e[_w[key]["weather"]] + "_baitan.png";
                                f2 = picurl + c2e[_w[key]["weather"]] + "_yejian.png";
                            }
                            console.log(f1);
                            if (new Date().getHours() < 18) {
                                $(_td[1]).html(img1);
                                $(el).css("background-image", "url(" + f1 + ")");
                            }else{
                                $(_td[1]).html(img2);
                                $(el).css("background-image", "url(" + f2 + ")");
                            }
                            $(_td[2]).html(day[date.getDay() + i]);
                            $(_td[3]).html(_w[key]["weather"]);
                            $(_td[4]).html(_w[key]["temperature"]);
                            }
                            else{
                                tq = "<span>" + day[date.getDay() + i] + "</span><span>" + img1 + "</span><span>" + _w[key]["temperature"] + "</span>";
                                $(_tr[key - 1]).html(tq);                                    
                            }
                            i++;
                    }
            }
        });
        }
    }
});
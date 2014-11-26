/**
 * Created by Administrator on 2014/9/18.
 */
define(["jquery", "configurableComponent", 'lib/mustache', 'utils/uiHelper', 'ui' , 'baiduMapApi'], function($, Component, mustache, uiHelper) {
    'use strict';
    var citytq; // 获取城市
    var search = function(that) {
        var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        var date = new Date();
        var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四");
            citytq = that.data["citytq"];
            console.log(citytq);
            var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&dfc=3";
            var tq = "";
            var img1, img2;
            var f, ff;
            $.ajax({
                url: url,
                dataType: "script",
                scriptCharset: "gbk",
                data: {
                    "day": 3
                },
                success: function(data) {
                    console.log(url);
                    var _w = window.SWther.w[citytq];
                    console.log(_w);
                    if(typeof window.SWther.w[citytq]==="undefined"){
                        that.$configEl.find(".tip-error").css({"display":"block","visibility":"visible"});
                        that.$configEl.find("#addr").css("border","1px solid red");
                    }else{
                        that.$configEl.find(".tip-error").hide();
                        that.$configEl.find("#addr").css("border","1px solid #48adee");
                    }
                    var i = 0;
                    var _tr = $(that.$viewEl).find(".weather_ul").find("li");
                    var _td = $(that.$viewEl).find(".weather_ul_today").find("li");
                    var picurl = "http://mat1.gtimg.com/weather/2014gaiban/";
                    var DataLength = function(fData) {
                        var intLength = 0
                        for (var i = 0; i < fData.length; i++) {
                            if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
                                intLength = intLength + 2
                            else
                                intLength = intLength + 1
                        }
                        return intLength;
                    };
                    for (var key in _w) {
                        if (key == 0) {
                            $(_td[0]).html("<span>"+citytq+"</span>");
                            if(DataLength(citytq)>3){that.$viewEl.find(".weather_ul_today li:nth-child(1)").css({"font-size":"20px","height":"40px","line-height":"50px"});}
                                    if (new Date().getHours() > 17) {
                                        f = _w[key].f2 + "_1.png";
                                        ff = (_w[key].s2.indexOf("雨")>=0||_w[key].s2.indexOf("雪")>=0)?(_w[key].s2.indexOf("雨")>=0?picurl + "xiaoyu.jpg":picurl + "xue.jpg"):picurl + _w[key].f2 + "_yejian.jpg";
                                        that.$viewEl.find(".weather").css("background-image","url(" + ff +")");
                                        img1 = "<img width='70px' height='70px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                                        $(_td[1]).html( img1);
                                        $(_td[2]).html( day[date.getDay() + i]);
                                        $(_td[3]).html( _w[key].s2 +  _w[key].t1 + "℃");
                                    }
                                    else {
                                        f = _w[key].f1 + "_0.png";
                                        ff = (_w[key].s1.indexOf("雨")>=0||_w[key].s1.indexOf("雪")>=0)?(_w[key].s1.indexOf("雨")>=0?picurl + "xiaoyu.jpg":picurl + "xue.jpg"):picurl + _w[key].f1 + "_baitian.jpg";
                                        that.$viewEl.find(".weather").css("background-image","url(" + ff +")");
                                        img1 = "<img width='70px' height='70px' src='http://php.weather.sina.com.cn/images/yb3/180_180/" + f + "'/>";
                                        $(_td[1]).html( img1);
                                        $(_td[2]).html( day[date.getDay() + i] );
                                        $(_td[3]).html( _w[key].s1 +  _w[key].t1 + "℃");
                                    }
                                    $(_td[4]).html("风力" + _w[key].p1 + "级");
                        } else {
                            f = _w[key].f1 + "_0.png";
                            if (new Date().getHours() > 17) {
                                f = _w[key].f1 + "_1.png";
                            }
                            img1 = "<img width='32px' height='32px' src='http://php.weather.sina.com.cn/images/yb3/78_78/" + f + "'/>";
                            tq = "<span>" + day[date.getDay() + i] + "</span><span>" + img1 + "</span><span>" + _w[key].s1 + "</span><span>" +  _w[key].t2 + "℃～" + _w[key].t1 + "℃</span>" ;
                            $(_tr[i - 1]).html(tq);
                        }
                        i++;
                    }  


                },
                error: function(){
                    that.$configEl.find(".tip-error").css("display","block");
                }
            });
    };

    return Component.extend({
        "html_edit": '<div class="weather" style="text-align: center;height: {{height}};color:{{text_color}};">{{style}}</div > ',
        "config_edit": '   <div class="config-map">            \
      <div class="hd">                                                    \
    <strong>选择城市</strong><input type="text" maxlength="100" name="citytq" id="addr">  \
    <input type="button" class="btn btn-assist" value="搜索">             \
    </div>  \
        <div id="auto-show">aaaaaaa</div>                   \
    <span class="tip-input">                                               \
    <img src="{{tip-light}}" alt="" />请输入城市, 例如: 北京 \
    </span>                                                                                                            \
    <span class="tip-error">                                                                                           \
    <img src="{{tip-error}}" alt="" />没有找到该城市, 请重新输入       \
    </span>                                                         \
 </div>',
        renderView: function() {
            this.$viewEl.html(mustache.render(this.html_edit, this.getData()));
        },
        renderConfigurator: function() {
            Component.prototype.renderConfigurator.call(this);
            var that = this;
            this.$panel = uiHelper.createConfiguartor(this).$propertyPanel;
            this.$panel.html(mustache.render(this.config_edit, {
                "tip-light": "http://7bede40ef4e00.cdn.sohucs.com/7c95a96a13b65cb950f1d9f27243e573",
                "tip-error": "http://7bede40ef4e00.cdn.sohucs.com/8addad44d3b0639885306624cb4357aa"
            }));
            this.$panel.find(".tip-error").hide();
            this.$panel.delegate(".btn-assist", "click" ,function(){
                citytq = that.$panel.find("#addr").val();
                that.data["citytq"] = citytq;
                search(that);
            });

            search(that);

            this.listen("text_color", function(ev) {
                that.data["text_color"] = ev.target.value;
                that.renderView();
                search(that);
            });
        },
        listen: function(name, fn) {
            this.$configEl.delegate('[name="' + name + '"]', "change", fn);
            return this;
        }
    });
});
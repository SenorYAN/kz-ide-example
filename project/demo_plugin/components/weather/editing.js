/**
 * Created by Administrator on 2014/9/18.
 */
define(["jquery", "configurableComponent", 'lib/mustache', 'utils/uiHelper', 'ui', 'baiduMapApi'], function($, Component, mustache, uiHelper, ui) {
    'use strict';
    var citytq; // 获取城市
    var search = function(that) {
        console.log(that.$viewEl.html());
        var date = new Date();
        var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四");
            var c2e ={
                "晴":"http://pic.kuaizhan.com/g1/M00/04/7F/CgpQU1SH8d-ABrh-ADy6C3fZ9_E6786818",
                "晴1":"http://pic.kuaizhan.com/g2/M01/04/98/CgpQVFSH8cGAQ8smADy6A_Tvl2o1441658",
                "阴":"http://pic.kuaizhan.com/g2/M01/04/98/CgpQVFSH8cyAbiYDADy6CxhCIDU8953536",
                "阴1":"http://pic.kuaizhan.com/g1/M00/04/80/CgpQU1SH8guAakvgADy9MSBpdYc1354708",
                "雾":"http://pic.kuaizhan.com/g1/M01/04/7F/wKjmqVSH8fiAPQsKADy6C9psOgU1848622",
                "雾1":"http://pic.kuaizhan.com/g2/M00/04/9B/wKjmqlSH8cWAPcFyABAv-XSEIgo9575528",
                "霾":"http://pic.kuaizhan.com/g2/M00/04/98/CgpQVFSH8buADbMIADy6C-sQ9-c1901748",
                "多云":"http://pic.kuaizhan.com/g1/M01/04/80/wKjmqVSH8siAWnIqADy6C-S5Vno5722817n",
                "多云1":"http://pic.kuaizhan.com/g1/M00/04/80/CgpQU1SH8s2AdVsLADy9MZMfacI9327473",
                "雨":"http://pic.kuaizhan.com/g2/M01/04/9B/wKjmqlSH8ciAEa83ADy6C6E0Go02497097",
                "雪":"http://pic.kuaizhan.com/g1/M01/04/7F/wKjmqVSH8geAX_vPADy6C8KGXJw6351521"
            };
        citytq = that.data["citytq"];
        console.log(citytq);
        var tq = "";
        var img1, img2;
        var f1, f2;
        var url = "http://maoyan_test.jd-app.com/index.php?city="+citytq;
                        $.ajax({/////////////////
                            url: url,
                            scriptCharset: "utf-8",
                            type: "get",
                            dataType: "json",
                            success: function(data) {
                                console.log(url);
                                var _w = data.results[0]["weather_data"];
                                console.log(_w);
                                if (data.error < 0) {
                                    that.$configEl.find(".tip-error").css({
                                        "display": "block",
                                        "visibility": "visible"
                                    });
                                    that.$configEl.find("#addr").css("border", "1px solid red");
                                } else {
                                    that.$configEl.find(".tip-error").hide();
                                    that.$configEl.find("#addr").css("border", "1px solid #48adee");
                                }
                                var i = 0;
                                var _tr = $(that.$viewEl).find(".weather_ul").find("li");
                                var _td = $(that.$viewEl).find(".weather_ul_today").find("li");
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
                                $(_td[0]).html("<span>" + citytq + "</span>");
                                if (DataLength(citytq) > 3) {
                                    that.$viewEl.find(".weather_ul_today li:nth-child(1)").css({
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
                                            if(_w[key]["weather"].indexOf("雨") >= 0){
                                                f1 = c2e["雨"];
                                                f2 = c2e["雨"];
                                            }else{
                                                f1 = c2e["雪"];
                                                f2 = c2e["雪"];
                                            }
                                        }else{
                                            f1 = c2e[_w[key]["weather"]];
                                            f2 = c2e[_w[key]["weather"+"1"]];
                                        }

                                        ///////////
                                        if (new Date().getHours() < 18) {
                                            $(_td[1]).html(img1);
                                            that.$viewEl.find(".weather").css("background-image", "url(" + f1 + ")");
                                        }else{
                                            $(_td[1]).html(img2);
                                            that.$viewEl.find(".weather").css("background-image", "url(" + f2 + ")");
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
                            },
                            error: function() {
                                that.$configEl.find(".tip-error").css("display", "block");
                            }
                        });/////////////
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
            this.$panel.delegate(".btn-assist", "click", function() {
                citytq = that.$panel.find("#addr").val();
                that.data["citytq"] = citytq;
                search(that);
            });
            setTimeout(function() {
                search(that);
            }, Math.random() * 300);
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
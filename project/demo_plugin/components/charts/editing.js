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
        html_edit: '<div class=\"mod mod-charts\" style=\"\"></div>',
        //输出到配置窗口，事件绑定使用$el.delegate 绑定，当删除$el时同时删除对应事件
        renderView:function(){     
            this.$viewEl.html(mustache.render(this.html_edit,this.getData()));
            this.$viewEl.find('.mod-charts').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
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
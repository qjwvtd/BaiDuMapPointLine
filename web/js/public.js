/*
 * 2018/5/14
 * administractor
 */
import echarts from 'echarts';
//设置地图并添加拆线
function setMapLine(o,lines){
    var domId = o.id;
    var size = o.size;
    var lineWidth = o.lineWidth  ? o.lineWidth : 5;
    //设置地图
    var map = new BMap.Map(domId,{mapType:BMAP_HYBRID_MAP},{enableMapClick:false},{minZoom:4,maxZoom:8});//禁用地图地点点击事件
    var point = new BMap.Point(118.342789,31.341901);//中心点
    map.centerAndZoom(point, size);
    map.enableScrollWheelZoom();//滚轮缩放
    //设置拆线
    var ln = lines.lineName;
    var lc = lines.color;
    var lp = lines.points;
    var pointList = [];
    for(var i= 0,len=lp.length;i<len;i++){
        var sn = lp[i]['name']
        var jdItem = lp[i]['jd'];
        var wdItem = lp[i]['wd'];
        var pointItem = new BMap.Point(jdItem,wdItem);
        pointList.push(pointItem);
    }
    var polyline = new BMap.Polyline(pointList,{strokeColor:lc,strokeWeight:lineWidth,strokeOpacity:1});
    map.addOverlay(polyline);
    polyline.show();
    //point overlay
    var Overlay = function(stationId,station,point){
        this._id = stationId;
        this._text = station;
        this._point = point;
    }
    Overlay.prototype = new BMap.Overlay();
    Overlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        var zIndex = BMap.Overlay.getZIndex(this._point.lat);
        var d_style = 'cursor:pointer;position:absolute;z-index:'+zIndex+';background:#EE5D5B;color:#fff;height:18px;line-height:18px;white-space:nowrap;font-size:10px;padding:2px';
        div.style.cssText = d_style;
        var span = this._span = document.createElement("span");
        div.appendChild(span);
        span.innerText = this._text;
        var arrow = this._arrow = document.createElement("div");
        arrow.style.cssText = 'position:absolute;width:11px;height:10px;top:22px;left:10px;overflow:hidden;background:url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat';
        div.appendChild(arrow);
        (function(stationId,stataionName,point){
            div.onclick = function(){
                var text = '我在这儿,^ 0 ^,come here\n\r'+stationId+'\n\r'+stataionName+'\n\r'+point.lng+'\n\r'+point.lat;
                console.log(text);
                alert(text);
            };
        })(this._id,this._text,this._point);
        map.getPanes().labelPane.appendChild(div);
        return div;
    };
    Overlay.prototype.draw = function(){
        var map = this._map;
        var sJD = this._point.lng;
        var sWD = this._point.lat;
        var pixel = map.pointToOverlayPixel(new BMap.Point(sJD,sWD));
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
        this._div.style.top  = pixel.y - 30 + "px";
    };
    //给多个站点添加标注
    for(var j=0,jLen=lines.points.length;j<jLen;j++){
        var pointItem = lines.points[j];
        if(pointItem['name'] != null){
            var stationId = pointItem['id'];
            var station = pointItem['name'];
            var point = new BMap.Point(pointItem['jd'],pointItem['wd']);
            var myCompOverlay = new Overlay(stationId,station,point);
            map.addOverlay(myCompOverlay);
        }
    }
}
//项目进度柱图
function setProjectScheduleBar(o){
    var dom = document.getElementById(o.id);
    var e = echarts.init(dom);
    var option = {
        color: o.color,
        tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}, formatter: "{a} <br/>{b} : {c} %"},
        grid: {left:'3%',right:'4%',top:'3%',bottom:'3%',containLabel: true},
        xAxis: [
            {
                type: 'category',
                data: o.xName,
                axisTick: {show: false},
                textStyle:{color:'#999'},
                axisLine:{lineStyle:{color:'#999'}}
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {show: false},
                splitLine: {show:true,lineStyle:{color:'#ccc'}},
                textStyle:{color:'#999'},
                axisLine:{lineStyle:{color:'#999'}}
            }
        ],
        series: [
            {
                name: o.title,
                type: 'bar',
                barWidth:30,
                data: o.data
            }
        ]
    };
    e.setOption(option);
}
//预警信息柱图
function warningInfoBar(o){
    var dom = document.getElementById(o.id);
    var e = echarts.init(dom);
    var option = {
        color: o.color,
        tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},
        legend: {x:'center',y:'bottom',data:o.legend,textStyle:{color:'#999'}},
        grid: {left:'3%',right:'4%',top:'3%',bottom:'12%',containLabel: true},
        xAxis : [
            {
                type : 'category',
                data : o.xName,
                axisTick: {show: false},
                textStyle:{color:'#999'},
                axisLine:{lineStyle:{color:'#999'}}
            }
        ],
        yAxis : [
            {
                type: 'value',
                axisTick: {show: false},
                splitLine: {show:true,lineStyle:{color:'#ccc'}},
                textStyle:{color:'#999'},
                axisLine:{lineStyle:{color:'#999'}}
            }
        ],
        series : o.data
    };
    e.setOption(option);
}
//预警饼图
function warningInfoPie(o){
    var e = echarts.init(document.getElementById(o.id));
    var option = {
        color: ['#999','#0087fc','#ffc400','#d1b842','orange','#f6222d'],
        title : {text: o.title,x:'center',y:'bottom',textStyle:{color:'#999',fontSize:14}},
        series : [
            {
                name: o.title,
                type: 'pie',
                radius : '80%',
                label: {normal: {show: false}},
                labelLine: {normal: {show: false}},
                data: o.data
            }
        ]
    };
    e.setOption(option);
}
//仪表盘
function setGauge(o){
    var e = echarts.init(document.getElementById(o.id));
    var option = {
        tooltip : {
            formatter: "{b} : {c}"+ o.unit
        },
        series: [
            {
                name: '',
                type: 'gauge',
                detail: {formatter: o.name+':{value}'+ o.unit,textStyle:{fontSize:12,color:'#fff'}},
                radius : '100%',
                min: o.min,
                max: o.max,
                splitNumber: 1,
                startAngle:190,
                endAngle:-10,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 5,
                        color: o.colorGroup
                    }
                },
                splitLine: {show: false,length: 5},
                axisTick: {show:false},
                pointer: {width:2},
                data: [{value: o.value, name: ''}]
            }
        ]
    };
    e.setOption(option);
    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * o.max).toFixed(1) - 0;
        e.setOption(option);
    },2000);
}

export {setMapLine,setProjectScheduleBar,warningInfoBar,warningInfoPie,setGauge}
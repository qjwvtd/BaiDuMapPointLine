/*
 * 2018/5/14
 * administractor
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {setMapLine,setProjectScheduleBar,warningInfoBar,warningInfoPie,setGauge} from './public';

//map
class Map extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        fetch('./js/map.json').then( (res) => {
            return res.json();
        }).then( (data) => {
            var option = {
                id:'map',
                size:13,
                lineWidth:10
            };
            setMapLine(option,data);
        }).catch( (e) => {
            console.log("error:" + e.message);
        });
    }
    render(){
        return (
            <div id="map">{}</div>
        );
    }
}
//工程概况
class ProjectGeneral extends Component{
    constructor(props){
        super(props);
        this.state = {
            general:'目前方案确定的芜湖市轨道交通建设线路将采用跨座式单轨列车，线网总体布局为网格放射型，由5条市区线和4条市域线组成。根据城市发展和客流需求等，近期建设的是市区1号线全线、2号线一期工程，在2020年前形成总长41-50公里左右的“十”字形骨架轨道线网。其中，1号线为南北走向，从保顺路至白马山，全长31.8公里，串联城北产业新城、中心区、城南科教产业新城三大组团，是南北方向主要客流通道。2号线为东西走向，强化城东产业新城、中心区、江北新城之间的联系，从梦溪路至江北火车站，全长28.4公里，将分步实施。客流预测2020年1、2号线建成后，每天可承担24.08万人次客运量，有效缓解城市交通压力。'
        };
    }
    render(){
        return (
            <div className="projectGeneral">
                <div className="mapContentTitle">工程概况</div>
                <div className="moduleContentBox">
                    <div className="moduleContent">
                        {this.state.general}
                    </div>
                </div>
            </div>
        );
    }
}
//工程进度
class ProjectSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            scheduleDetail:{
                '开工工区':(Math.random()*1000).toFixed(0),
                '停工工区':(Math.random()*1000).toFixed(0),
                '完工工区':(Math.random()*1000).toFixed(0),
                '二级节点进度':(Math.random()*100).toFixed(0),
            },
            schedule:{
                id:'scheduleBar',
                color:['#3398DB'],
                title:'工程进度',
                xName:['已完工', '已开工', '未完工'],
                data:[(Math.random()*100).toFixed(0),(Math.random()*100).toFixed(0),(Math.random()*100).toFixed(0)]
            }
        };
    }
    componentDidMount(){
        setProjectScheduleBar(this.state.schedule);
    }
    render(){
        const _workArea = [];
        for(let _key in this.state.scheduleDetail){
            let _workAreaItem = {};
            _workAreaItem.name = _key;
            _workAreaItem.number = this.state.scheduleDetail[_key];
            _workArea.push(_workAreaItem);
        }
        return (
            <div className="projectSchedule">
                <div className="mapContentTitle">工程进度</div>
                <div id="scheduleBar" style={{height:'200px'}}></div>
                <ul className="scheduleNum">
                    {
                        _workArea.map( (item,index) => {
                            return (
                                <li key={index}>
                                    <span>{item.name}</span>
                                    <span><b>{item.number}</b>{(index+1) === _workArea.length ? ' % ' : ' 个 '}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
//外部系统导航
class OutSystemLink extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="outLink">
                <div className="mapContentTitle">外部系统导航</div>
                <ul>
                    <li><span className="frontEndEngineering"></span><span>前期工程</span></li>
                    <li><span className="constructionSupervision"></span><span>施工管理</span></li>
                    <li><span className="scheduleManagement"></span><span>进度管理</span></li>
                    <li><span className="BeamFieldManagement"></span><span>梁场管理</span></li>
                    <li><span className="riskManagement"></span><span>风险管理</span></li>
                    <li><span className="nearMissIdentification"></span><span>隐患排查</span></li>
                </ul>
            </div>
        );
    }
}
//预警信息
class WarningInfo extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        //预警级别
        var option = {
            id:'warningBar',
            color:['#3398DB','#44ab4c'],
            legend:['一级','二级'],
            xName:['1月','2月','3月','4月','5月'],
            data:[
                {name:'一级',type:'bar',barGap:0,data:[10,20,60,35,15]},
                {name:'二级',type:'bar',barGap:0,data:[90,50,62,80,20]}
            ]
        };
        warningInfoBar(option);
        //巡视预警
        var pieOption1 = {
            id:'tourWarn',
            title:'巡视预警',
            data:[
                {value:(Math.random()*1000).toFixed(0), name:'item01'},
                {value:(Math.random()*1000).toFixed(0), name:'item02'},
                {value:(Math.random()*1000).toFixed(0), name:'item03'},
                {value:(Math.random()*1000).toFixed(0), name:'item04'},
                {value:(Math.random()*1000).toFixed(0), name:'item05'},
                {value:(Math.random()*1000).toFixed(0), name:'item06'}
            ]
        };
        warningInfoPie(pieOption1);
        //隐患排查
        var pieOption2 = {
            id:'hideRisk',
            title:'隐患排查',
            data:[
                {value:(Math.random()*1000).toFixed(0), name:'条目01'},
                {value:(Math.random()*1000).toFixed(0), name:'条目02'},
                {value:(Math.random()*1000).toFixed(0), name:'条目03'},
                {value:(Math.random()*1000).toFixed(0), name:'条目04'},
                {value:(Math.random()*1000).toFixed(0), name:'条目05'},
                {value:(Math.random()*1000).toFixed(0), name:'条目06'}
            ]
        };
        warningInfoPie(pieOption2);
    }
    render(){
        return (
            <div className="warningInformation">
                <div className="mapContentTitle">预警信息</div>
                <div id="warningBar" style={{height:'200px'}}></div>
                <div className="warnPie">
                    <div id="tourWarn"></div>
                    <div id="hideRisk"></div>
                </div>
            </div>
        );
    }
}
//风险等级数量
class RiskLvlNum extends Component{
    constructor(props){
        super(props);
        this.state = {
            riskType:['巡视预警','隐患排查'],
            showSomeOne:0,
            riskDetail:{
                warning:[
                    {'warnName':'特级预警','number':(Math.random()*100).toFixed(0)},
                    {'warnName':'一级预警','number':(Math.random()*100).toFixed(0)},
                    {'warnName':'二级预警','number':(Math.random()*100).toFixed(0)},
                    {'warnName':'三级预警','number':(Math.random()*100).toFixed(0)}
                ],
                hideDanger:[
                    {'hideDangerName':'特级隐患','number':(Math.random()*100).toFixed(0)},
                    {'hideDangerName':'一级隐患','number':(Math.random()*100).toFixed(0)},
                    {'hideDangerName':'二级隐患','number':(Math.random()*100).toFixed(0)},
                    {'hideDangerName':'三级隐患','number':(Math.random()*100).toFixed(0)}
                ]
            }
        };
    }
    changeShowWarnType(xh){
        this.setState({
            showSomeOne:xh
        });
    }
    render(){
        return (
            <div className="sourceRisk">
                <div className="mapContentTitle">风险等级数量</div>
                <div id="riskNum">
                    <ul className={this.state.showSomeOne == 0 ? 'active' : ''}>
                        {
                            this.state.riskDetail.warning.map((item,index) => {
                                return (
                                    <li key={index}>{item.warnName}<b>&nbsp;{item.number}&nbsp;</b>个</li>
                                );
                            })
                        }
                    </ul>
                    <ul className={this.state.showSomeOne == 1 ? 'active' : ''}>
                        {
                            this.state.riskDetail.hideDanger.map((item,index) => {
                                return (
                                    <li key={index}>{item.hideDangerName}<b>&nbsp;{item.number}&nbsp;</b>个</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div id="riskNumNav">
                    {
                        this.state.riskType.map((item,index) => {
                            return (
                                <a key={item} className={this.state.showSomeOne == index ? 'active' : ''} onClick={this.changeShowWarnType.bind(this,index)}>{item}</a>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
//仪表盘
class Gauge extends Component{
    constructor(props){
        super(props);
        this.state = {
            option1:{
                id:'temperature',
                name:'温度',
                unit:'℃',
                min:0,
                max:50,
                colorGroup:[[0.7, '#0087fc'], [1, '#e1e1e1']],
                value:20
            },
            option2:{
                id:'humidity',
                name:'湿度',
                unit:'RH',
                min:0,
                max:75,
                colorGroup:[[0.6, '#0087fc'], [1, '#e1e1e1']],
                value:20
            },
            option3:{
                id:'pm10',
                name:'pm10',
                unit:'mg/m³',
                min:0,
                max:75,
                colorGroup:[[0.4, '#0087fc'],[0.65, '#ffc400'],[0.8, 'red'], [1, '#e1e1e1']],
                value:20
            },
            option4:{
                id:'pm25',
                name:'pm25',
                unit:'mg/m³',
                min:0,
                max:75,
                colorGroup:[[0.4, '#0087fc'],[0.65, '#ffc400'],[0.8, 'red'], [1, '#e1e1e1']],
                value:20
            }
        };
    }
    componentDidMount(){
        //温度
        setGauge(this.state.option1);
        //湿度
        setGauge(this.state.option2);
        //pm10
        setGauge(this.state.option3);
        //pm25
        setGauge(this.state.option4);
    }
    render(){
        return (
            <div className="gauge">
                <ul>
                    <li id="temperature"></li>
                    <li id="humidity"></li>
                    <li id="pm10"></li>
                    <li id="pm25"></li>
                </ul>
            </div>
        );
    }
}
//left
class LeftContent extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div id="leftContent">
                <ProjectGeneral />,
                <ProjectSchedule />,
                <OutSystemLink />
            </div>
        );
    }
}
//right
class RightContent extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div id="rightContent">
                <WarningInfo />,
                <RiskLvlNum />,
                <Gauge />
            </div>
        );
    }
}
//render all
ReactDOM.render(
    [
        <Map key="map" />,
        <LeftContent key="leftContent" />,
        <RightContent key="rightContent" />
    ],
    document.getElementById('mapContainer')
);
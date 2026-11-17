import {makeItinerary} from './itinerary.mjs';
// All prices below are deliberately transparent planning assumptions in CNY, not live quotes.
const city = (name,en,country,lat,lon,hotel,food,local,play,arrival,areas,source) => ({name,en,country,lat,lon,hotel,food,local,play,arrival,areas:areas.split('|').map(x=>x.split(' / ')),source});
export const cities = [
 city('北京','BEIJING','中国',39.9,116.4,320,100,35,80,'前门街区','故宫 / 景山公园|天坛 / 前门|颐和园 / 圆明园|鼓楼 / 什刹海','https://english.beijing.gov.cn/travellinginbeijing/'),
 city('上海','SHANGHAI','中国',31.23,121.47,360,110,40,90,'南京东路','外滩 / 豫园|武康路 / 安福路|陆家嘴 / 滨江步道|上海博物馆 / 人民广场','https://english.shanghai.gov.cn/en-TravelinShanghai/index.html'),
 city('杭州','HANGZHOU','中国',30.27,120.15,280,90,30,65,'湖滨步行街','西湖 / 苏堤|灵隐寺 / 北高峰|龙井村 / 茶园步道|河坊街 / 南宋御街','https://wgly.hangzhou.gov.cn/'),
 city('成都','CHENGDU','中国',30.57,104.07,250,80,30,70,'春熙路','宽窄巷子 / 人民公园|大熊猫繁育研究基地 / 市区休息|武侯祠 / 锦里|杜甫草堂 / 浣花溪公园','https://www.gochengdu.cn/'),
 city('重庆','CHONGQING','中国',29.56,106.55,230,80,30,60,'解放碑','洪崖洞 / 千厮门大桥|李子坝 / 鹅岭二厂|磁器口 / 沙坪坝|山城步道 / 十八梯','https://www.ichongqing.info/'),
 city('西安','XI’AN','中国',34.34,108.94,240,80,30,90,'钟楼周边','城墙 / 永宁门|陕西历史博物馆 / 大雁塔|兵马俑 / 临潼|小雁塔 / 西安博物院','https://www.travelchina.org.cn/'),
 city('广州','GUANGZHOU','中国',23.13,113.26,300,100,35,60,'北京路','陈家祠 / 永庆坊|沙面 / 西堤|广州塔周边 / 海心沙|越秀公园 / 中山纪念堂','https://www.gz.gov.cn/'),
 city('深圳','SHENZHEN','中国',22.54,114.06,330,110,40,70,'福田中心区','莲花山 / 市民中心|华侨城创意园 / 深圳湾|南头古城 / 中山公园|大梅沙 / 海滨栈道','https://www.sz.gov.cn/'),
 city('昆明','KUNMING','中国',25.04,102.71,220,75,30,60,'南屏街','翠湖 / 云南大学周边|滇池 / 海埂公园|云南省博物馆 / 官渡古镇|西山 / 龙门','https://www.travelchina.org.cn/'),
 city('三亚','SANYA','中国',18.25,109.51,350,120,60,110,'三亚湾','大东海 / 鹿回头|亚龙湾 / 沙滩休息|海棠湾 / 海边散步|南山文化旅游区 / 市区休息','https://www.travelchina.org.cn/'),
 city('东京','TOKYO','日本',35.68,139.69,650,180,65,110,'酒店周边街区','浅草寺 / 隅田川|上野公园 / 谷中|明治神宫 / 涩谷|皇居外苑 / 银座','https://www.gotokyo.org/en/story/walks-and-tours/best-of-tokyo/index.html'),
 city('大阪','OSAKA','日本',34.69,135.5,550,160,60,100,'难波街区','大阪城公园 / 中之岛|黑门市场 / 道顿堀|新世界 / 天王寺|梅田 / 中崎町','https://osaka-info.jp/en/'),
 city('曼谷','BANGKOK','泰国',13.75,100.5,300,100,50,90,'酒店周边街区','大皇宫 / 卧佛寺|郑王庙 / 湄南河|暹罗商圈 / 曼谷艺术文化中心|伦披尼公园 / 是隆','https://www.tourismthailand.org/Destinations/Provinces/Bangkok/219'),
 city('新加坡','SINGAPORE','新加坡',1.35,103.82,800,180,60,130,'酒店周边街区','鱼尾狮公园 / 滨海湾|牛车水 / 麦士威熟食中心|甘榜格南 / 小印度|新加坡植物园 / 乌节路','https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/'),
 city('首尔','SEOUL','韩国',37.57,126.98,550,150,50,100,'明洞街区','景福宫 / 北村韩屋村|仁寺洞 / 清溪川|弘大 / 延南洞|南山 / 南大门','https://english.visitseoul.net/'),
 city('巴黎','PARIS','法国',48.86,2.35,1000,260,80,180,'酒店周边街区','埃菲尔铁塔周边 / 塞纳河|卢浮宫 / 杜乐丽花园|蒙马特 / 圣心堂|西岱岛 / 拉丁区','https://parisjetaime.com/eng/article/the-essentials-a264'),
 city('伦敦','LONDON','英国',51.51,-0.13,1100,260,100,160,'酒店周边街区','威斯敏斯特 / 南岸|大英博物馆 / 考文特花园|海德公园 / 南肯辛顿|卡姆登 / 摄政公园','https://www.visitlondon.com/things-to-do/london-areas/south-bank'),
 city('悉尼','SYDNEY','澳大利亚',-33.87,151.21,950,240,80,140,'酒店周边街区','环形码头 / 悉尼歌剧院周边|岩石区 / 皇家植物园|邦迪海滩 / 海岸步道|达令港 / 海德公园','https://www.sydney.com/'),
 city("香港","HONG KONG","中国",22.32,114.17,800,180,65,120,"尖沙咀海滨","星光大道 / 尖沙咀海滨","https://www.discoverhongkong.com/eng/place-to-go/travel.guide-avenue-of-stars.html"),
 city("京都","KYOTO","日本",35.01,135.77,650,170,65,100,"京都站周边","伏见稻荷大社 / 稻荷参道|岚山竹林 / 岚山街区","https://www.japan.travel/en/spot/ma_129/"),
 city("吉隆坡","KUALA LUMPUR","马来西亚",3.14,101.69,300,100,45,80,"KLCC周边","KLCC公园 / 双子塔外观","https://www.suriaklcc.com.my/attractions/klcc-park/"),
 city("罗马","ROME","意大利",41.9,12.5,850,220,65,150,"住宿周边","纳沃纳广场 / 历史中心|西班牙台阶 / 西班牙广场","https://www.turismoroma.it/en/itineraries/rome-four-days-four-faces-eternal-city"),
 city("纽约","NEW YORK","美国",40.71,-74.01,1500,300,100,180,"住宿周边","中央公园 / 公园步道|时代广场 / 百老汇街区","https://www.centralparknyc.org/visit"),
 city("墨尔本","MELBOURNE","澳大利亚",-37.81,144.96,850,220,75,120,"住宿周边","联邦广场 / 亚拉河畔|皇家植物园 / 园林步道","https://www.visitmelbourne.com/regions/Melbourne/see-and-do/art-and-culture/Architecture-and-design/Federation-Square"),
];
export const findCity = name => cities.find(c=>c.name===name.trim()||c.en.toLowerCase()===name.trim().toLowerCase());
export const money = n => '¥'+Math.round(n).toLocaleString('zh-CN');
export const dateISO = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const addDays = (s,n) => {const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return dateISO(d)};
const round = n=>Math.round(n/10)*10;
export function distance(a,b){const r=Math.PI/180;const x=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
export function validate(input,today=dateISO(new Date())){
 const a=findCity(input.from||''),b=findCity(input.to||'');
 if(!a||!b)throw Error('请从城市列表中选择出发地和目的地，目前支持 24 座城市。');
 if(a===b)throw Error('出发地和目的地不能相同，请换一个目的地。');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(input.date)||!Number.isFinite(new Date(input.date+'T12:00:00').getTime())||dateISO(new Date(input.date+'T12:00:00'))!==input.date||input.date<today)throw Error('请选择今天或之后的有效出发日期。');
 if(!Number.isInteger(input.days)||input.days<2||input.days>14)throw Error('旅行天数需为 2–14 天，包含往返交通日。');
 if(!Number.isInteger(input.people)||input.people<1||input.people>8)throw Error('同行人数需为 1–8 人。');
 if(!Number.isFinite(input.budget)||input.budget<100||input.budget>1000000)throw Error('请输入 ¥100–¥1,000,000 的全程总预算。');
 if(input.budgetUnit!=null&&!['total','person'].includes(input.budgetUnit))throw Error('请选择全体预算或人均预算。');
 if(input.roomMode!=null&&!['twin','single'].includes(input.roomMode))throw Error('请选择有效的住宿安排。');
 for(const [key,label] of [['fare','往返交通报价'],['hotelRate','每间每晚房价'],['extra','额外费用']])if(input[key]!=null&&(!Number.isFinite(input[key])||input[key]<0||input[key]>1000000))throw Error(label+'需为 0–1,000,000 元，留空则使用估算。');
 if(!['auto','save','comfort'].includes(input.style))throw Error('请选择有效的旅行方式。');
 if(distance(a,b)>7000&&input.days<5)throw Error('这是一段长途旅行，往返和时差需要留出时间，请至少安排 5 天。');
 return {a,b};
}
export function transport(input,a,b){
 const km=distance(a,b),same=a.country===b.country,cn=same&&a.country==='中国';
 // Weekend multiplier is a disclosed model assumption; public holidays and seat inventory are not modeled.
 const outbound=new Date(input.date+'T12:00:00').getDay(),back=new Date(addDays(input.date,input.days-1)+'T12:00:00').getDay();
 const factor=([0,5,6].includes(outbound)?1.1:1)+([0,5,6].includes(back)?1.1:1);
 const modes=[];
 function add(id,label,symbol,oneway,hours,note,isCar=false){
 const total=round(oneway*(id==='flight'?factor:2)*(isCar?Math.ceil(input.people/4):input.people));
 modes.push({id,label,symbol,total,low:round(total*(id==='flight'?.65:.85)),high:round(total*(id==='flight'?1.55:1.2)),hours,note,unit:isCar?'每车 ≤4 人':'每人',single:round(oneway)});
 }
 if(cn&&a.name!=='三亚'&&b.name!=='三亚'){
  add('rail','高铁 / 动车','▤',Math.max(45,km*1.3*.42),km*1.3/210+1.5,'二等座模型；可能需换乘，未验证具体线路。');
  if(km<=900&&a.name!=='香港'&&b.name!=='香港')add('drive','自驾','⌁',km*1.3*.95+40,km*1.3/75+1,'自有车辆油费、通行费估算；不含租车、停车和折旧。',true);
 }
 if(same&&a.country==='日本')add('rail',km<100?'城际铁路':'新干线','▤',km<100?40:700,km<100?1.5:4.5,'人工规划参数，非已查到的票价；请向运营方核实车次与换乘。');
 if(!(same&&a.country==='日本'&&km<100)&&(!cn||km>350||a.name==='三亚'||b.name==='三亚'))add('flight','飞机经济舱','✈',cn?240+km*.38:same?400+km*.5:km<5000?650+km*.38:1500+km*.32,km/750+4,'含机场办理与接驳的粗略时间；可能中转，未验证航线。行李及额外税费以出票为准。');
 if(a.name==='京都'||b.name==='京都')for(const m of modes)if(m.id==='flight')m.note+=' 京都航空出行需经大阪地区机场转乘，接驳另预留时间与费用。';
 if(a.name==='香港'||b.name==='香港')for(const m of modes)m.note+=' 涉及香港，请另核实出入境证件、口岸及车票要求。';
 return modes.sort((x,y)=>x.total-y.total);
}
export function estimate(input,modeId){
 const {a,b}=validate(input);const modes=transport(input,a,b),chosen=modes.find(x=>x.id===modeId)||modes[0];
 const totalBudget=input.budget*(input.budgetUnit==='person'?input.people:1);
 const nights=input.days-1,rooms=input.roomMode==='single'?input.people:Math.ceil(input.people/2),long=distance(a,b)>7000,international=a.country!==b.country;
 const weekendNights=Array.from({length:nights},(_,i)=>new Date(addDays(input.date,i)+'T12:00:00').getDay()).filter(d=>d===5||d===6).length;
 const detail=input.selection?makeItinerary(b,input.days,input.date,input.people,input.selection,long):null;
 const costs=tier=>{
  const hotel=input.hotelRate!=null?Math.round(input.hotelRate*rooms*nights):Math.round(b.hotel*(tier==='save'?.72:tier==='comfort'?1.55:1)*rooms*(nights+weekendNights*.15));
  const dailyFood=b.food*(tier==='save'?.75:tier==='comfort'?1.35:1);const food=detail?Math.round(dailyFood/3*(input.days*3-detail.selectedMeals)*input.people+detail.diningTotal):Math.round(dailyFood*input.days*input.people);
  const local=detail?detail.localTotal:Math.round(b.local*(tier==='comfort'?1.5:1)*input.days*input.people);
  const play=detail?detail.ticketTotal:Math.round(b.play*(tier==='save'?.55:tier==='comfort'?1.4:1)*Math.max(1,input.days-(long?3:2))*input.people);
  const transport=input.fare!=null?Math.round(input.fare):chosen.total,extra=Math.round(input.extra??0);
  const subtotal=transport+hotel+food+local+play+extra,reserve=Math.ceil(subtotal*.1);
  return {transport,hotel,food,local,play,extra,reserve,total:subtotal+reserve};
 };
 const minimum=costs('save');
 const tier=input.style==='auto'?(costs('balanced').total<=totalBudget?'balanced':'save'):input.style;
 const c=costs(tier),gap=totalBudget-c.total;
 // A sensitivity scenario, not a confidence interval or a guaranteed maximum.
 const highBase=(input.fare!=null?c.transport:chosen.high)+(input.hotelRate!=null?c.hotel:Math.ceil(c.hotel*1.25))+Math.ceil((c.food+c.local+c.play)*1.2)+c.extra;
 const cautiousTotal=highBase+Math.ceil(highBase*.1);
 let plan=Array.from({length:input.days},(_,i)=>{
  if(i===0)return {day:i+1,date:addDays(input.date,i),title:long?'启程 · 把时间留给路途':'抵达 · 慢慢进入旅行',stops:long?[a.name+'出发','飞行 / 中转','按实际抵达时间休息']:['前往'+b.name,'办理入住',b.arrival],note:long?'跨时区行程仅为日期框架，请按实际航班调整入住日期。':'当天以交通和休息为主；抵达较晚时取消街区散步。',kind:'travel'};
  if(i===input.days-1)return {day:i+1,date:addDays(input.date,i),title:'返程 · 带着回忆回家',stops:['退房','前往车站 / 机场',a.name],note:'此日期为返程出发日；跨时区航班可能次日到家，以实际票面为准。',kind:'travel'};
  if(long&&i===1)return {day:i+1,date:addDays(input.date,i),title:'抵达 · 调整时差',stops:['入住 / 寄存行李',b.arrival,'轻松晚餐'],note:'预留入境、接驳和休息时间，不安排需要定时入场的景点。',kind:'travel'};
  const idx=i-(long?2:1),area=b.areas[idx];
  if(!area)return {day:i+1,date:addDays(input.date,i),title:'自由探索 · 给旅程留白',stops:['酒店周边早餐','自选街区 / 公园','当地餐厅'],note:'精选片区已安排完毕，这一天留作自由活动、休息或补游；没有自动编造跨城线路。',kind:'flex'};
  return {day:i+1,date:addDays(input.date,i),title:['城市初见','在地生活','人文漫步','另一面风景'][idx],stops:area,note:tier==='save'?'优先街区、公园和外观；付费入场按游玩预算取舍，热门场馆请提前核实预约。':'以同一片区为主，公共交通衔接。开放时间、休馆日和预约名额需出发前核实。',kind:'visit'};
 });
 if(detail)plan=detail.routes.map(d=>({day:d.day,date:d.date,title:d.title,stops:[...d.attractions.map(a=>a.name),...d.restaurants.map(r=>r.name)],note:'根据自选景点和餐厅安排；开放与交通请在地图核实。',kind:d.attractions.length?'visit':'travel'}));
 return {input,totalBudget,a,b,modes,chosen,c,tier,gap,cautiousTotal,minimum:minimum.total,rooms,nights,weekendNights,long,international,plan};
}
const shareFields=['from','to','date','days','people','budget','style','budgetUnit','roomMode','fare','hotelRate','extra','selection'];
export function encodeTrip(input,mode){const clean=Object.fromEntries(shareFields.filter(k=>input[k]!=null).map(k=>[k,input[k]]));return '#'+new URLSearchParams({trip:JSON.stringify({v:2,input:clean,mode})}).toString();}
export function decodeTrip(hash){if(hash.length>6000)throw Error('行程链接过长，请重新生成。');const raw=new URLSearchParams(hash.replace(/^#/,'' )).get('trip');if(!raw)return null;let data;try{data=JSON.parse(raw)}catch{throw Error('行程链接格式不正确。')}if(data?.v!==2||!data.input||typeof data.input!=='object')throw Error('不支持这份行程链接，请重新分享。');const input=Object.fromEntries(shareFields.filter(k=>data.input[k]!=null).map(k=>[k,data.input[k]]));if(!['from','to','date'].every(k=>typeof input[k]==='string'))throw Error('行程链接缺少有效城市或日期。');validate(input,'0000-01-01');return {input,mode:['rail','drive','flight'].includes(data.mode)?data.mode:undefined};}

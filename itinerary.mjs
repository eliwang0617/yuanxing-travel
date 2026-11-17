import {catalog} from './catalog.mjs';

export function chosenItems(cityName, selection) {
  const data=catalog[cityName];
  if(!data)throw Error('这个城市的景点资料尚未准备好。');
  const state=selection??{attractionIds:data.attractions.slice(0,2).map(x=>x.id),restaurantIds:[],localMode:'public'};
  for(const key of ['attractionIds','restaurantIds'])if(!Array.isArray(state[key])||state[key].length>30||!state[key].every(id=>typeof id==='string'))throw Error('景点或餐饮选择格式不正确。');
  if(!['public','taxi','walk'].includes(state.localMode??'public'))throw Error('请选择有效的市内交通方式。');
  const attractions=[...new Set(state.attractionIds)].map(id=>data.attractions.find(a=>a.id===id));
  const restaurants=[...new Set(state.restaurantIds)].map(id=>data.restaurants.find(a=>a.id===id));
  if(attractions.some(x=>!x)||restaurants.some(x=>!x))throw Error('所选项目不属于当前目的地，请重新选择。');
  if(restaurants.some(r=>!attractions.some(a=>a.id===r.nearAttractionId)))throw Error('请先勾选餐厅所在片区的对应景点。');
  return {attractions,restaurants,selection:{attractionIds:attractions.map(x=>x.id),restaurantIds:restaurants.map(x=>x.id),localMode:state.localMode??'public'}};
}

export function makeItinerary(city, days, date, people, selection, longHaul=false) {
  if(!Number.isInteger(days)||days<2||days>14||!Number.isInteger(people)||people<1||people>8)throw Error('请填写 2–14 天、1–8 人的旅行信息。');
  const {attractions,restaurants,selection:normalized}=chosenItems(city.name,selection);
  const routes=Array.from({length:days},(_,i)=>({day:i+1,date:shift(date,i),title:i===0?'抵达与休息':i===days-1?'返程与收尾':'目的地探索',attractions:[],restaurants:[],hours:0}));
  const slots=days===2&&!longHaul?routes:routes.slice(longHaul?2:1,-1);
  const ordered=[...attractions].sort((a,b)=>a.area.localeCompare(b.area,'zh-CN'));
  for(const spot of ordered){
    const day=slots.find(d=>d.attractions.length<(days===2?1:2)&&d.hours+spot.durationHours<=(days===2?3:7));
    if(!day)throw Error('所选景点在当前天数内排不下，请增加天数或减少景点。抵达和返程时间已预留，不会偷偷省略你的选择。');
    day.attractions.push(spot);day.hours+=spot.durationHours;
  }
  for(const restaurant of restaurants){
    const day=routes.find(d=>d.attractions.some(a=>a.id===restaurant.nearAttractionId));
    if(!day||day.restaurants.length>=2)throw Error('同一天最多安排两家餐厅，请减少该片区餐饮选择。');
    day.restaurants.push(restaurant);
  }
  const activeDays=routes.filter(d=>d.attractions.length).length;
  const rideCount=activeDays*2+Math.max(0,attractions.length-activeDays);
  const rate=normalized.localMode==='walk'?0:normalized.localMode==='taxi'?Math.round(city.local*1.4):Math.max(5,Math.round(city.local*.3));
  const vehicles=Math.ceil(people/4);
  const cityTransport=rate*rideCount*(normalized.localMode==='taxi'?vehicles:people);
  const transferPerPerson=city.local*2;
  const transfer=transferPerPerson*people;
  const ticketPerPerson=attractions.reduce((sum,a)=>sum+(a.priceCny??0),0);
  const diningPerPerson=restaurants.reduce((sum,a)=>sum+a.priceCny,0);
  return {routes,selection:normalized,attractions,restaurants,ticketTotal:ticketPerPerson*people,ticketPerPerson,unknownTickets:attractions.filter(x=>x.priceCny==null),diningTotal:diningPerPerson*people,diningPerPerson,selectedMeals:restaurants.length,localTotal:cityTransport+transfer,localDetail:{rideCount,rate,vehicles,cityTransport,transfer,transferPerPerson,mode:normalized.localMode},notes:['按片区分组，不是实时路线优化；跨片区请在地图核对接驳。','门票按成人普通票／页面说明估算，儿童、优惠票与节假日价格需另核实。']};
}
function shift(s,n){const d=new Date(s+'T12:00:00');if(!Number.isFinite(d.getTime()))throw Error('请选择有效日期。');d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}

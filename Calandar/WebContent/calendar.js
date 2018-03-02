 
function calendar(){
 let date = new Date(),mo = date.getMonth(), year = date.getFullYear(), target = false
 ,getDaysMonth = function(year,month){
	 let monthDays = [31,28,31,30,31,30,31,31,30,31,30,31]
	 if(month!==1) return monthDays[month]
	 return monthDays[month] + ((year==2000||year%100!=0)&&year%4==0? 1:0)
 },getMonthName=function(month){
	 return ["January","February","March","April","May","June","July","August","September","October","November","December"][month]
 }, selected = function(evt){
	 let t = evt.target 
	 switch(t.tagName.toLowerCase()){
	  case "span": 
		 if(t.innerHTML=="confirm"){
		  let s = t.parentNode.querySelector("div.selected")
		  alert(getMonthName(mo)+" "+(s?s.innerHTML:date.getDate())+", "+(year))
	   };
	  break; 
	  case "div": 
	  if(t.innerHTML.length === 0) return;
	   t.parentNode.querySelectorAll("div.selected").forEach(function(el){
	    el.classList.remove("selected")
	   })
	   t.classList.add("selected");
	  break;
	  case "i": 
	   if(t.classList.contains("fa-chevron-left")){
	  	 if(--mo<0){
	  		 mo+=12
	  		 year--
	  	 }
	   }else if(t.classList.contains("fa-chevron-right")){
	  	 if(++mo>11){
	  		 mo-=12
	  		 year++
	  	 }
	   }
	   createCalendar()
	   break;
	  default: console.log(t.tagName)
	 }
	
 },fillCalendar = function(){
	 date = new Date(year,mo,date.getDate())
	 let dt = date.getDate()
	 let dy = date.getDay() 
	 let doc = document.createDocumentFragment();
	 (["S","M","T","W","T","F","S"]).forEach(function(d){
		 let el = document.createElement("header")
		 el.innerHTML = d
		 doc.appendChild(el)
	 })
	 for(let d=dt-dy-(7*Math.ceil((dt-dy-1)/7)); d<=getDaysMonth(year,mo);d++){
   	 let el = document.createElement("div")
     if(d>0) el.innerHTML = d
     doc.appendChild(el)
   }
	 return doc
 },createCalendar = function(evt){
	 if(!target) target = evt.target
	  document.querySelectorAll("#cal").forEach(function(el){
	  	el.removeEventListener("click",selected)
			el.remove()
	 })
	 let doc = document.createDocumentFragment()
   ,ele = document.createElement("div"),month = document.createElement("nav")
   ,icon = document.createElement("i")
   ,sp = document.createElement("span")
   date = new Date()
   ele.setAttribute("id","cal")
   icon.classList.add("fa","fa-chevron-right")
   month.appendChild(icon)
   ele.appendChild(month)
   month = document.createElement("nav")
   icon = document.createElement("i")
   icon.classList.add("fa","fa-chevron-left")
   month.appendChild(icon)
   ele.appendChild(month)
   month = document.createElement("p")
   month.innerHTML = getMonthName(+mo)+"<br>"+(year)
   ele.appendChild(month)
   ele.appendChild(fillCalendar(year,mo))
   sp.innerHTML = "confirm"
   ele.appendChild(sp)
   doc.appendChild(ele)
   target.parentNode.insertBefore(doc,target.nextSibling)
   ele.addEventListener("click",selected)
	}
 return {create:createCalendar}
}

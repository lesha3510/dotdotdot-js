/*!
 *	dotdotdot JS 4.0.9
 *
 *	dotdotdot.frebsite.nl
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	License: CC-BY-NC-4.0
 *	http://creativecommons.org/licenses/by-nc/4.0/
 */
export default class Dotdotdot{constructor(t,e=Dotdotdot.options){this.container=t,this.options=e||{},this.watchTimeout=null,this.watchInterval=null,this.resizeEvent=null;for(let t in Dotdotdot.options)Dotdotdot.options.hasOwnProperty(t)&&void 0===this.options[t]&&(this.options[t]=Dotdotdot.options[t]);var i=this.container.dotdotdot;i&&i.destroy(),this.API={},["truncate","restore","destroy","watch","unwatch"].forEach(t=>{this.API[t]=(()=>this[t].call(this))}),this.container.dotdotdot=this.API,this.originalStyle=this.container.getAttribute("style")||"",this.originalContent=this._getOriginalContent(),this.ellipsis=document.createTextNode(this.options.ellipsis);var o=window.getComputedStyle(this.container);"break-word"!==o["word-wrap"]&&(this.container.style["word-wrap"]="break-word"),"pre"===o["white-space"]?this.container.style["white-space"]="pre-wrap":"nowrap"===o["white-space"]&&(this.container.style["white-space"]="normal"),null===this.options.height&&(this.options.height=this._getMaxHeight()),this.truncate(),this.options.watch&&this.watch()}restore(){this.unwatch(),this.container.setAttribute("style",this.originalStyle),this.container.classList.remove("ddd-truncated"),this.container.innerHTML="",this.originalContent.forEach(t=>{this.container.append(t)})}destroy(){this.restore(),this.container.dotdotdot=null}watch(){this.unwatch();var t={width:null,height:null},e=(e,i,o)=>{if(this.container.offsetWidth||this.container.offsetHeight||this.container.getClientRects().length){let n={width:e[i],height:e[o]};return t.width==n.width&&t.height==n.height||this.truncate(),n}return t};"window"==this.options.watch?(this.resizeEvent=(i=>{this.watchTimeout&&clearTimeout(this.watchTimeout),this.watchTimeout=setTimeout(()=>{t=e(window,"innerWidth","innerHeight")},100)}),window.addEventListener("resize",this.resizeEvent)):this.watchInterval=setInterval(()=>{t=e(this.container,"clientWidth","clientHeight")},1e3)}unwatch(){this.resizeEvent&&(window.removeEventListener("resize",this.resizeEvent),this.resizeEvent=null),this.watchInterval&&clearInterval(this.watchInterval),this.watchTimeout&&clearTimeout(this.watchTimeout)}truncate(){var t=!1;return this.container.innerHTML="",this.originalContent.forEach(t=>{this.container.append(t.cloneNode(!0))}),this.maxHeight=this._getMaxHeight(),this._fits()||(t=!0,this._truncateToNode(this.container)),this.container.classList[t?"add":"remove"]("ddd-truncated"),this.options.callback.call(this.container,t),t}_truncateToNode(t){var e=[],i=[];if(Dotdotdot.$.contents(t).forEach(t=>{if(1!=t.nodeType||!t.matches(".ddd-keep")){let o=document.createComment("");t.replaceWith(o),i.push(t),e.push(o)}}),i.length){for(var o=0;o<i.length;o++){e[o].replaceWith(i[o]);let t=this.ellipsis.cloneNode(!0);switch(i[o].nodeType){case 1:i[o].append(t);break;case 3:i[o].after(t)}let n=this._fits();if(t.parentElement.removeChild(t),!n){if("node"==this.options.truncate&&o>1)return void i[o-2].remove();break}}for(var n=o;n<e.length;n++)e[n].remove();var s=i[Math.max(0,Math.min(o,i.length-1))];if(1==s.nodeType){let t=document.createElement(s.nodeName);t.append(this.ellipsis),s.replaceWith(t),this._fits()?t.replaceWith(s):(t.remove(),s=i[Math.max(0,o-1)])}1==s.nodeType?this._truncateToNode(s):this._truncateToWord(s)}}_truncateToWord(t){for(var e=t.textContent,i=-1!==e.indexOf(" ")?" ":"　",o=e.split(i),n=o.length;n>=0;n--)if(t.textContent=this._addEllipsis(o.slice(0,n).join(i)),this._fits()){"letter"==this.options.truncate&&(t.textContent=o.slice(0,n+1).join(i),this._truncateToLetter(t));break}}_truncateToLetter(t){for(var e=t.textContent.split(""),i="",o=e.length;o>=0&&(!(i=e.slice(0,o).join("")).length||(t.textContent=this._addEllipsis(i),!this._fits()));o--);}_fits(){return this.container.scrollHeight<=this.maxHeight+this.options.tolerance}_addEllipsis(t){for(var e=[" ","　",",",";",".","!","?"];e.indexOf(t.slice(-1))>-1;)t=t.slice(0,-1);return t+=this.ellipsis.textContent}_getOriginalContent(){let t="script, style";this.options.keep&&(t+=", "+this.options.keep),Dotdotdot.$.find(t,this.container).forEach(t=>{t.classList.add("ddd-keep")});let e="div, section, article, header, footer, p, h1, h2, h3, h4, h5, h6, table, td, td, dt, dd, li";[this.container,...Dotdotdot.$.find("*",this.container)].forEach(t=>{t.normalize(),Dotdotdot.$.contents(t).forEach(e=>{8==e.nodeType&&t.removeChild(e)}),Dotdotdot.$.contents(t).forEach(i=>{if(3==i.nodeType&&""==i.textContent.trim()){let o=i.previousSibling,n=i.nextSibling;(i.parentElement.matches("table, thead, tbody, tfoot, tr, dl, ul, ol, video")||!o||1==o.nodeType&&o.matches(e)||!n||1==n.nodeType&&n.matches(e))&&t.removeChild(i)}})});let i=[];return Dotdotdot.$.contents(this.container).forEach(t=>{i.push(t.cloneNode(!0))}),i}_getMaxHeight(){if("number"==typeof this.options.height)return this.options.height;for(var t=window.getComputedStyle(this.container),e=["maxHeight","height"],i=0,o=0;o<e.length;o++){let n=t[e[o]];if("px"==n.slice(-2)){i=parseFloat(n);break}}switch(e=[],t.boxSizing){case"border-box":e.push("borderTopWidth"),e.push("borderBottomWidth");case"padding-box":e.push("paddingTop"),e.push("paddingBottom")}for(o=0;o<e.length;o++){let n=t[e[o]];"px"==n.slice(-2)&&(i-=parseFloat(n))}return Math.max(i,0)}}Dotdotdot.version="4.0.10",Dotdotdot.options={ellipsis:"… ",callback:function(t){},truncate:"word",tolerance:0,keep:null,watch:"window",height:null},Dotdotdot.$={find:(t,e)=>(e=e||document,Array.prototype.slice.call(e.querySelectorAll(t))),contents:t=>(t=t||document,Array.prototype.slice.call(t.childNodes))},function(t){void 0!==t&&(t.fn.dotdotdot=function(t){return this.each((e,i)=>{let o=new Dotdotdot(i,t);i.dotdotdot=o.API})})}(window.Zepto||window.jQuery);
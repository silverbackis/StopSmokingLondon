/*!
 * Bootstrap-select v1.12.2 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){!function(a){"use strict";function b(b){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return a.each(c,function(){b=b?b.replace(this.re,this.ch):""}),b}function c(b){var c=arguments,d=b;[].shift.apply(c);var e,f=this.each(function(){var b=a(this);if(b.is("select")){var f=b.data("selectpicker"),g="object"==typeof d&&d;if(f){if(g)for(var h in g)g.hasOwnProperty(h)&&(f.options[h]=g[h])}else{var i=a.extend({},k.DEFAULTS,a.fn.selectpicker.defaults||{},b.data(),g);i.template=a.extend({},k.DEFAULTS.template,a.fn.selectpicker.defaults?a.fn.selectpicker.defaults.template:{},b.data().template,g.template),b.data("selectpicker",f=new k(this,i))}"string"==typeof d&&(e=f[d]instanceof Function?f[d].apply(f,c):f.options[d])}});return"undefined"!=typeof e?e:f}String.prototype.includes||!function(){var a={}.toString,b=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),c="".indexOf,d=function(b){if(null==this)throw new TypeError;var d=String(this);if(b&&"[object RegExp]"==a.call(b))throw new TypeError;var e=d.length,f=String(b),g=f.length,h=arguments.length>1?arguments[1]:void 0,i=h?Number(h):0;i!=i&&(i=0);var j=Math.min(Math.max(i,0),e);return!(g+j>e)&&c.call(d,f,i)!=-1};b?b(String.prototype,"includes",{value:d,configurable:!0,writable:!0}):String.prototype.includes=d}(),String.prototype.startsWith||!function(){var a=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),b={}.toString,c=function(a){if(null==this)throw new TypeError;var c=String(this);if(a&&"[object RegExp]"==b.call(a))throw new TypeError;var d=c.length,e=String(a),f=e.length,g=arguments.length>1?arguments[1]:void 0,h=g?Number(g):0;h!=h&&(h=0);var i=Math.min(Math.max(h,0),d);if(f+i>d)return!1;for(var j=-1;++j<f;)if(c.charCodeAt(i+j)!=e.charCodeAt(j))return!1;return!0};a?a(String.prototype,"startsWith",{value:c,configurable:!0,writable:!0}):String.prototype.startsWith=c}(),Object.keys||(Object.keys=function(a,b,c){c=[];for(b in a)c.hasOwnProperty.call(a,b)&&c.push(b);return c});var d={useDefault:!1,_set:a.valHooks.select.set};a.valHooks.select.set=function(b,c){return c&&!d.useDefault&&a(b).data("selected",!0),d._set.apply(this,arguments)};var e=null;a.fn.triggerNative=function(a){var b,c=this[0];c.dispatchEvent?("function"==typeof Event?b=new Event(a,{bubbles:!0}):(b=document.createEvent("Event"),b.initEvent(a,!0,!1)),c.dispatchEvent(b)):c.fireEvent?(b=document.createEventObject(),b.eventType=a,c.fireEvent("on"+a,b)):this.trigger(a)},a.expr.pseudos.icontains=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.ibegins=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())},a.expr.pseudos.aicontains=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.aibegins=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())};var f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},g={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x60;":"`"},h=function(a){var b=function(b){return a[b]},c="(?:"+Object.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}},i=h(f),j=h(g),k=function(b,c){d.useDefault||(a.valHooks.select.set=d._set,d.useDefault=!0),this.$element=a(b),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=c,null===this.options.title&&(this.options.title=this.$element.attr("title"));var e=this.options.windowPadding;"number"==typeof e&&(this.options.windowPadding=[e,e,e,e]),this.val=k.prototype.val,this.render=k.prototype.render,this.refresh=k.prototype.refresh,this.setStyle=k.prototype.setStyle,this.selectAll=k.prototype.selectAll,this.deselectAll=k.prototype.deselectAll,this.destroy=k.prototype.destroy,this.remove=k.prototype.remove,this.show=k.prototype.show,this.hide=k.prototype.hide,this.init()};k.VERSION="1.12.2",k.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(a,b){return 1==a?"{0} item selected":"{0} items selected"},maxOptionsText:function(a,b){return[1==a?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1==b?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",styleBase:"btn",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",showTick:!1,template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,windowPadding:0},k.prototype={constructor:k,init:function(){var b=this,c=this.$element.attr("id");this.$element.addClass("bs-select-hidden"),this.liObj={},this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$menuInner=this.$menu.children(".inner"),this.$searchbox=this.$menu.find("input"),this.$element.removeClass("bs-select-hidden"),this.options.dropdownAlignRight===!0&&this.$menu.addClass("dropdown-menu-right"),"undefined"!=typeof c&&(this.$button.attr("data-id",c),a('label[for="'+c+'"]').click(function(a){a.preventDefault(),b.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hide.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!1),b.$element.trigger("hide.bs.select",a)},"hidden.bs.dropdown":function(a){b.$element.trigger("hidden.bs.select",a)},"show.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!0),b.$element.trigger("show.bs.select",a)},"shown.bs.dropdown":function(a){b.$element.trigger("shown.bs.select",a)}}),b.$element[0].hasAttribute("required")&&this.$element.on("invalid",function(){b.$button.addClass("bs-invalid").focus(),b.$element.on({"focus.bs.select":function(){b.$button.focus(),b.$element.off("focus.bs.select")},"shown.bs.select":function(){b.$element.val(b.$element.val()).off("shown.bs.select")},"rendered.bs.select":function(){this.validity.valid&&b.$button.removeClass("bs-invalid"),b.$element.off("rendered.bs.select")}})}),setTimeout(function(){b.$element.trigger("loaded.bs.select")})},createDropdown:function(){var b=this.multiple||this.options.showTick?" show-tick":"",c=this.$element.parent().hasClass("input-group")?" input-group-btn":"",d=this.autofocus?" autofocus":"",e=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",f=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+i(this.options.liveSearchPlaceholder)+'"')+' role="textbox" aria-label="Search"></div>':"",g=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",h=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",j='<div class="btn-group bootstrap-select'+b+c+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" data-toggle="dropdown"'+d+' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open" role="combobox">'+e+f+g+'<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>'+h+"</div></div>";return a(j)},createView:function(){var a=this.createDropdown(),b=this.createLi();return a.find("ul")[0].innerHTML=b,a},reloadLi:function(){var a=this.createLi();this.$menuInner[0].innerHTML=a},createLi:function(){var c=this,d=[],e=0,f=document.createElement("option"),g=-1,h=function(a,b,c,d){return"<li"+("undefined"!=typeof c&""!==c?' class="'+c+'"':"")+("undefined"!=typeof b&null!==b?' data-original-index="'+b+'"':"")+("undefined"!=typeof d&null!==d?'data-optgroup="'+d+'"':"")+">"+a+"</li>"},j=function(d,e,f,g){return'<a tabindex="0"'+("undefined"!=typeof e?' class="'+e+'"':"")+(f?' style="'+f+'"':"")+(c.options.liveSearchNormalize?' data-normalized-text="'+b(i(a(d).html()))+'"':"")+("undefined"!=typeof g||null!==g?' data-tokens="'+g+'"':"")+' role="option">'+d+'<span class="'+c.options.iconBase+" "+c.options.tickIcon+' check-mark"></span></a>'};if(this.options.title&&!this.multiple&&(g--,!this.$element.find(".bs-title-option").length)){var k=this.$element[0];f.className="bs-title-option",f.innerHTML=this.options.title,f.value="",k.insertBefore(f,k.firstChild);var l=a(k.options[k.selectedIndex]);void 0===l.attr("selected")&&void 0===this.$element.data("selected")&&(f.selected=!0)}return this.$element.find("option").each(function(b){var f=a(this);if(g++,!f.hasClass("bs-title-option")){var k=this.className||"",l=this.style.cssText,m=f.data("content")?f.data("content"):f.html(),n=f.data("tokens")?f.data("tokens"):null,o="undefined"!=typeof f.data("subtext")?'<small class="text-muted">'+f.data("subtext")+"</small>":"",p="undefined"!=typeof f.data("icon")?'<span class="'+c.options.iconBase+" "+f.data("icon")+'"></span> ':"",q=f.parent(),r="OPTGROUP"===q[0].tagName,s=r&&q[0].disabled,t=this.disabled||s;if(""!==p&&t&&(p="<span>"+p+"</span>"),c.options.hideDisabled&&(t&&!r||s))return void g--;if(f.data("content")||(m=p+'<span class="text">'+m+o+"</span>"),r&&f.data("divider")!==!0){if(c.options.hideDisabled&&t){if(void 0===q.data("allOptionsDisabled")){var u=q.children();q.data("allOptionsDisabled",u.filter(":disabled").length===u.length)}if(q.data("allOptionsDisabled"))return void g--}var v=" "+q[0].className||"";if(0===f.index()){e+=1;var w=q[0].label,x="undefined"!=typeof q.data("subtext")?'<small class="text-muted">'+q.data("subtext")+"</small>":"",y=q.data("icon")?'<span class="'+c.options.iconBase+" "+q.data("icon")+'"></span> ':"";w=y+'<span class="text">'+i(w)+x+"</span>",0!==b&&d.length>0&&(g++,d.push(h("",null,"divider",e+"div"))),g++,d.push(h(w,null,"dropdown-header"+v,e))}if(c.options.hideDisabled&&t)return void g--;d.push(h(j(m,"opt "+k+v,l,n),b,"",e))}else if(f.data("divider")===!0)d.push(h("",b,"divider"));else if(f.data("hidden")===!0)d.push(h(j(m,k,l,n),b,"hidden is-hidden"));else{var z=this.previousElementSibling&&"OPTGROUP"===this.previousElementSibling.tagName;if(!z&&c.options.hideDisabled)for(var A=a(this).prevAll(),B=0;B<A.length;B++)if("OPTGROUP"===A[B].tagName){for(var C=0,D=0;D<B;D++){var E=A[D];(E.disabled||a(E).data("hidden")===!0)&&C++}C===B&&(z=!0);break}z&&(g++,d.push(h("",null,"divider",e+"div"))),d.push(h(j(m,k,l,n),b))}c.liObj[b]=g}}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),d.join("")},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(b){var c,d=this;b!==!1&&this.$element.find("option").each(function(a){var b=d.findLis().eq(d.liObj[a]);d.setDisabled(a,this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled,b),d.setSelected(a,this.selected,b)}),this.togglePlaceholder(),this.tabIndex();var e=this.$element.find("option").map(function(){if(this.selected){if(d.options.hideDisabled&&(this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled))return;var b,c=a(this),e=c.data("icon")&&d.options.showIcon?'<i class="'+d.options.iconBase+" "+c.data("icon")+'"></i> ':"";return b=d.options.showSubtext&&c.data("subtext")&&!d.multiple?' <small class="text-muted">'+c.data("subtext")+"</small>":"","undefined"!=typeof c.attr("title")?c.attr("title"):c.data("content")&&d.options.showContent?c.data("content").toString():e+c.html()+b}}).toArray(),f=this.multiple?e.join(this.options.multipleSeparator):e[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var g=this.options.selectedTextFormat.split(">");if(g.length>1&&e.length>g[1]||1==g.length&&e.length>=2){c=this.options.hideDisabled?", [disabled]":"";var h=this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]'+c).length,i="function"==typeof this.options.countSelectedText?this.options.countSelectedText(e.length,h):this.options.countSelectedText;f=i.replace("{0}",e.length.toString()).replace("{1}",h.toString())}}void 0==this.options.title&&(this.options.title=this.$element.attr("title")),"static"==this.options.selectedTextFormat&&(f=this.options.title),f||(f="undefined"!=typeof this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",j(a.trim(f.replace(/<[^>]*>?/g,"")))),this.$button.children(".filter-option").html(f),this.$element.trigger("rendered.bs.select")},setStyle:function(a,b){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,""));var c=a?a:this.options.style;"add"==b?this.$button.addClass(c):"remove"==b?this.$button.removeClass(c):(this.$button.removeClass(this.options.style),this.$button.addClass(c))},liHeight:function(b){if(b||this.options.size!==!1&&!this.sizeInfo){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("ul"),f=document.createElement("li"),g=document.createElement("li"),h=document.createElement("a"),i=document.createElement("span"),j=this.options.header&&this.$menu.find(".popover-title").length>0?this.$menu.find(".popover-title")[0].cloneNode(!0):null,k=this.options.liveSearch?document.createElement("div"):null,l=this.options.actionsBox&&this.multiple&&this.$menu.find(".bs-actionsbox").length>0?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,m=this.options.doneButton&&this.multiple&&this.$menu.find(".bs-donebutton").length>0?this.$menu.find(".bs-donebutton")[0].cloneNode(!0):null;if(i.className="text",c.className=this.$menu[0].parentNode.className+" open",d.className="dropdown-menu open",e.className="dropdown-menu inner",f.className="divider",i.appendChild(document.createTextNode("Inner text")),h.appendChild(i),g.appendChild(h),e.appendChild(g),e.appendChild(f),j&&d.appendChild(j),k){var n=document.createElement("input");k.className="bs-searchbox",n.className="form-control",k.appendChild(n),d.appendChild(k)}l&&d.appendChild(l),d.appendChild(e),m&&d.appendChild(m),c.appendChild(d),document.body.appendChild(c);var o=h.offsetHeight,p=j?j.offsetHeight:0,q=k?k.offsetHeight:0,r=l?l.offsetHeight:0,s=m?m.offsetHeight:0,t=a(f).outerHeight(!0),u="function"==typeof getComputedStyle&&getComputedStyle(d),v=u?null:a(d),w={vert:parseInt(u?u.paddingTop:v.css("paddingTop"))+parseInt(u?u.paddingBottom:v.css("paddingBottom"))+parseInt(u?u.borderTopWidth:v.css("borderTopWidth"))+parseInt(u?u.borderBottomWidth:v.css("borderBottomWidth")),horiz:parseInt(u?u.paddingLeft:v.css("paddingLeft"))+parseInt(u?u.paddingRight:v.css("paddingRight"))+parseInt(u?u.borderLeftWidth:v.css("borderLeftWidth"))+parseInt(u?u.borderRightWidth:v.css("borderRightWidth"))},x={vert:w.vert+parseInt(u?u.marginTop:v.css("marginTop"))+parseInt(u?u.marginBottom:v.css("marginBottom"))+2,horiz:w.horiz+parseInt(u?u.marginLeft:v.css("marginLeft"))+parseInt(u?u.marginRight:v.css("marginRight"))+2};document.body.removeChild(c),this.sizeInfo={liHeight:o,headerHeight:p,searchHeight:q,actionsHeight:r,doneButtonHeight:s,dividerHeight:t,menuPadding:w,menuExtras:x}}},setSize:function(){if(this.findLis(),this.liHeight(),this.options.header&&this.$menu.css("padding-top",0),this.options.size!==!1){var b,c,d,e,f,g,h,i,j=this,k=this.$menu,l=this.$menuInner,m=a(window),n=this.$newElement[0].offsetHeight,o=this.$newElement[0].offsetWidth,p=this.sizeInfo.liHeight,q=this.sizeInfo.headerHeight,r=this.sizeInfo.searchHeight,s=this.sizeInfo.actionsHeight,t=this.sizeInfo.doneButtonHeight,u=this.sizeInfo.dividerHeight,v=this.sizeInfo.menuPadding,w=this.sizeInfo.menuExtras,x=this.options.hideDisabled?".disabled":"",y=function(){var b,c=j.$newElement.offset(),d=a(j.options.container);j.options.container&&!d.is("body")?(b=d.offset(),b.top+=parseInt(d.css("borderTopWidth")),b.left+=parseInt(d.css("borderLeftWidth"))):b={top:0,left:0};var e=j.options.windowPadding;f=c.top-b.top-m.scrollTop(),g=m.height()-f-n-b.top-e[2],h=c.left-b.left-m.scrollLeft(),i=m.width()-h-o-b.left-e[1],f-=e[0],h-=e[3]};if(y(),"auto"===this.options.size){var z=function(){var m,n=function(b,c){return function(d){return c?d.classList?d.classList.contains(b):a(d).hasClass(b):!(d.classList?d.classList.contains(b):a(d).hasClass(b))}},u=j.$menuInner[0].getElementsByTagName("li"),x=Array.prototype.filter?Array.prototype.filter.call(u,n("hidden",!1)):j.$lis.not(".hidden"),z=Array.prototype.filter?Array.prototype.filter.call(x,n("dropdown-header",!0)):x.filter(".dropdown-header");y(),b=g-w.vert,c=i-w.horiz,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height"),k.data("width")||k.data("width",k.width()),e=k.data("width")):(d=k.height(),e=k.width()),j.options.dropupAuto&&j.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),j.$newElement.hasClass("dropup")&&(b=f-w.vert),"auto"===j.options.dropdownAlignRight&&k.toggleClass("dropdown-menu-right",h>i&&c-w.horiz<e-o),m=x.length+z.length>3?3*p+w.vert-2:0,k.css({"max-height":b+"px",overflow:"hidden","min-height":m+q+r+s+t+"px"}),l.css({"max-height":b-q-r-s-t-v.vert+"px","overflow-y":"auto","min-height":Math.max(m-v.vert,0)+"px"})};z(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",z),m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",z)}else if(this.options.size&&"auto"!=this.options.size&&this.$lis.not(x).length>this.options.size){var A=this.$lis.not(".divider").not(x).children().slice(0,this.options.size).last().parent().index(),B=this.$lis.slice(0,A+1).filter(".divider").length;b=p*this.options.size+B*u+v.vert,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height")):d=k.height(),j.options.dropupAuto&&this.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),k.css({"max-height":b+q+r+s+t+"px",overflow:"hidden","min-height":""}),l.css({"max-height":b-v.vert+"px","overflow-y":"auto","min-height":""})}}},setWidth:function(){if("auto"===this.options.width){this.$menu.css("min-width","0");var a=this.$menu.parent().clone().appendTo("body"),b=this.options.container?this.$newElement.clone().appendTo("body"):a,c=a.children(".dropdown-menu").outerWidth(),d=b.css("width","auto").children("button").outerWidth();a.remove(),b.remove(),this.$newElement.css("width",Math.max(c,d)+"px")}else"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){this.$bsContainer=a('<div class="bs-container" />');var b,c,d,e=this,f=a(this.options.container),g=function(a){e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass("dropup",a.hasClass("dropup")),b=a.offset(),f.is("body")?c={top:0,left:0}:(c=f.offset(),c.top+=parseInt(f.css("borderTopWidth"))-f.scrollTop(),c.left+=parseInt(f.css("borderLeftWidth"))-f.scrollLeft()),d=a.hasClass("dropup")?0:a[0].offsetHeight,e.$bsContainer.css({top:b.top-c.top+d,left:b.left-c.left,width:a[0].offsetWidth})};this.$button.on("click",function(){var b=a(this);e.isDisabled()||(g(e.$newElement),e.$bsContainer.appendTo(e.options.container).toggleClass("open",!b.hasClass("open")).append(e.$menu))}),a(window).on("resize scroll",function(){g(e.$newElement)}),this.$element.on("hide.bs.select",function(){e.$menu.data("height",e.$menu.height()),e.$bsContainer.detach()})},setSelected:function(a,b,c){c||(this.togglePlaceholder(),c=this.findLis().eq(this.liObj[a])),c.toggleClass("selected",b).find("a").attr("aria-selected",b)},setDisabled:function(a,b,c){c||(c=this.findLis().eq(this.liObj[a])),b?c.addClass("disabled").children("a").attr("href","#").attr("tabindex",-1).attr("aria-disabled",!0):c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex",0).attr("aria-disabled",!1)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){var a=this;this.isDisabled()?(this.$newElement.addClass("disabled"),this.$button.addClass("disabled").attr("tabindex",-1).attr("aria-disabled",!0)):(this.$button.hasClass("disabled")&&(this.$newElement.removeClass("disabled"),this.$button.removeClass("disabled").attr("aria-disabled",!1)),this.$button.attr("tabindex")!=-1||this.$element.data("tabindex")||this.$button.removeAttr("tabindex")),this.$button.click(function(){return!a.isDisabled()})},togglePlaceholder:function(){var a=this.$element.val();this.$button.toggleClass("bs-placeholder",null===a||""===a||a.constructor===Array&&0===a.length)},tabIndex:function(){this.$element.data("tabindex")!==this.$element.attr("tabindex")&&this.$element.attr("tabindex")!==-98&&"-98"!==this.$element.attr("tabindex")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){var b=this,c=a(document);c.data("spaceSelect",!1),this.$button.on("keyup",function(a){/(32)/.test(a.keyCode.toString(10))&&c.data("spaceSelect")&&(a.preventDefault(),c.data("spaceSelect",!1))}),this.$button.on("click",function(){b.setSize()}),this.$element.on("shown.bs.select",function(){if(b.options.liveSearch||b.multiple){if(!b.multiple){var a=b.liObj[b.$element[0].selectedIndex];if("number"!=typeof a||b.options.size===!1)return;var c=b.$lis.eq(a)[0].offsetTop-b.$menuInner[0].offsetTop;c=c-b.$menuInner[0].offsetHeight/2+b.sizeInfo.liHeight/2,b.$menuInner[0].scrollTop=c}}else b.$menuInner.find(".selected a").focus()}),this.$menuInner.on("click","li a",function(c){var d=a(this),f=d.parent().data("originalIndex"),g=b.$element.val(),h=b.$element.prop("selectedIndex"),i=!0;if(b.multiple&&1!==b.options.maxOptions&&c.stopPropagation(),c.preventDefault(),!b.isDisabled()&&!d.parent().hasClass("disabled")){var j=b.$element.find("option"),k=j.eq(f),l=k.prop("selected"),m=k.parent("optgroup"),n=b.options.maxOptions,o=m.data("maxOptions")||!1;if(b.multiple){if(k.prop("selected",!l),b.setSelected(f,!l),d.blur(),n!==!1||o!==!1){var p=n<j.filter(":selected").length,q=o<m.find("option:selected").length;if(n&&p||o&&q)if(n&&1==n)j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected"),b.setSelected(f,!0);else if(o&&1==o){m.find("option:selected").prop("selected",!1),k.prop("selected",!0);var r=d.parent().data("optgroup");b.$menuInner.find('[data-optgroup="'+r+'"]').removeClass("selected"),b.setSelected(f,!0)}else{var s="string"==typeof b.options.maxOptionsText?[b.options.maxOptionsText,b.options.maxOptionsText]:b.options.maxOptionsText,t="function"==typeof s?s(n,o):s,u=t[0].replace("{n}",n),v=t[1].replace("{n}",o),w=a('<div class="notify"></div>');t[2]&&(u=u.replace("{var}",t[2][n>1?0:1]),v=v.replace("{var}",t[2][o>1?0:1])),k.prop("selected",!1),b.$menu.append(w),n&&p&&(w.append(a("<div>"+u+"</div>")),i=!1,b.$element.trigger("maxReached.bs.select")),o&&q&&(w.append(a("<div>"+v+"</div>")),i=!1,b.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){b.setSelected(f,!1)},10),w.delay(750).fadeOut(300,function(){a(this).remove()})}}}else j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected",!1),b.setSelected(f,!0);!b.multiple||b.multiple&&1===b.options.maxOptions?b.$button.focus():b.options.liveSearch&&b.$searchbox.focus(),i&&(g!=b.$element.val()&&b.multiple||h!=b.$element.prop("selectedIndex")&&!b.multiple)&&(e=[f,k.prop("selected"),l],b.$element.triggerNative("change"))}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(c){c.currentTarget==this&&(c.preventDefault(),c.stopPropagation(),b.options.liveSearch&&!a(c.target).hasClass("close")?b.$searchbox.focus():b.$button.focus())}),this.$menuInner.on("click",".divider, .dropdown-header",function(a){a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){b.$button.click()}),this.$searchbox.on("click",function(a){a.stopPropagation()}),this.$menu.on("click",".actions-btn",function(c){b.options.liveSearch?b.$searchbox.focus():b.$button.focus(),c.preventDefault(),c.stopPropagation(),a(this).hasClass("bs-select-all")?b.selectAll():b.deselectAll()}),this.$element.change(function(){b.render(!1),b.$element.trigger("changed.bs.select",e),e=null})},liveSearchListener:function(){var c=this,d=a('<li class="no-results"></li>');this.$button.on("click.dropdown.data-api",function(){c.$menuInner.find(".active").removeClass("active"),c.$searchbox.val()&&(c.$searchbox.val(""),c.$lis.not(".is-hidden").removeClass("hidden"),d.parent().length&&d.remove()),c.multiple||c.$menuInner.find(".selected").addClass("active"),setTimeout(function(){c.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(a){a.stopPropagation()}),this.$searchbox.on("input propertychange",function(){if(c.$lis.not(".is-hidden").removeClass("hidden"),c.$lis.filter(".active").removeClass("active"),d.remove(),c.$searchbox.val()){var e,f=c.$lis.not(".is-hidden, .divider, .dropdown-header");if(e=c.options.liveSearchNormalize?f.find("a").not(":a"+c._searchStyle()+'("'+b(c.$searchbox.val())+'")'):f.find("a").not(":"+c._searchStyle()+'("'+c.$searchbox.val()+'")'),e.length===f.length)d.html(c.options.noneResultsText.replace("{0}",'"'+i(c.$searchbox.val())+'"')),c.$menuInner.append(d),c.$lis.addClass("hidden");else{e.parent().addClass("hidden");var g,h=c.$lis.not(".hidden");h.each(function(b){var c=a(this);c.hasClass("divider")?void 0===g?c.addClass("hidden"):(g&&g.addClass("hidden"),g=c):c.hasClass("dropdown-header")&&h.eq(b+1).data("optgroup")!==c.data("optgroup")?c.addClass("hidden"):g=null}),g&&g.addClass("hidden"),f.not(".hidden").first().addClass("active")}}})},_searchStyle:function(){var a={begins:"ibegins",startsWith:"ibegins"};return a[this.options.liveSearchStyle]||"icontains"},val:function(a){return"undefined"!=typeof a?(this.$element.val(a),this.render(),this.$element):this.$element.val()},changeAll:function(b){if(this.multiple){"undefined"==typeof b&&(b=!0),this.findLis();var c=this.$element.find("option"),d=this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),e=d.length,f=[];if(b){if(d.filter(".selected").length===d.length)return}else if(0===d.filter(".selected").length)return;d.toggleClass("selected",b);for(var g=0;g<e;g++){var h=d[g].getAttribute("data-original-index");f[f.length]=c.eq(h)[0]}a(f).prop("selected",b),this.render(!1),this.togglePlaceholder(),this.$element.triggerNative("change")}},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},toggle:function(a){a=a||window.event,a&&a.stopPropagation(),this.$button.trigger("click")},keydown:function(c){var d,e,f,g,h,i,j,k,l,m=a(this),n=m.is("input")?m.parent().parent():m.parent(),o=n.data("this"),p=":not(.disabled, .hidden, .dropdown-header, .divider)",q={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(o.options.liveSearch&&(n=m.parent().parent()),o.options.container&&(n=o.$menu),d=a('[role="listbox"] li',n),l=o.$newElement.hasClass("open"),!l&&(c.keyCode>=48&&c.keyCode<=57||c.keyCode>=96&&c.keyCode<=105||c.keyCode>=65&&c.keyCode<=90))return o.options.container?o.$button.trigger("click"):(o.setSize(),o.$menu.parent().addClass("open"),l=!0),void o.$searchbox.focus();if(o.options.liveSearch&&(/(^9$|27)/.test(c.keyCode.toString(10))&&l&&(c.preventDefault(),c.stopPropagation(),o.$menuInner.click(),o.$button.focus()),d=a('[role="listbox"] li'+p,n),m.val()||/(38|40)/.test(c.keyCode.toString(10))||0===d.filter(".active").length&&(d=o.$menuInner.find("li"),d=o.options.liveSearchNormalize?d.filter(":a"+o._searchStyle()+"("+b(q[c.keyCode])+")"):d.filter(":"+o._searchStyle()+"("+q[c.keyCode]+")"))),d.length){if(/(38|40)/.test(c.keyCode.toString(10)))e=d.index(d.find("a").filter(":focus").parent()),g=d.filter(p).first().index(),h=d.filter(p).last().index(),f=d.eq(e).nextAll(p).eq(0).index(),i=d.eq(e).prevAll(p).eq(0).index(),j=d.eq(f).prevAll(p).eq(0).index(),o.options.liveSearch&&(d.each(function(b){a(this).hasClass("disabled")||a(this).data("index",b)}),e=d.index(d.filter(".active")),g=d.first().data("index"),h=d.last().data("index"),f=d.eq(e).nextAll().eq(0).data("index"),i=d.eq(e).prevAll().eq(0).data("index"),j=d.eq(f).prevAll().eq(0).data("index")),k=m.data("prevIndex"),38==c.keyCode?(o.options.liveSearch&&e--,e!=j&&e>i&&(e=i),e<g&&(e=g),e==k&&(e=h)):40==c.keyCode&&(o.options.liveSearch&&e++,e==-1&&(e=0),e!=j&&e<f&&(e=f),e>h&&(e=h),e==k&&(e=g)),m.data("prevIndex",e),o.options.liveSearch?(c.preventDefault(),m.hasClass("dropdown-toggle")||(d.removeClass("active").eq(e).addClass("active").children("a").focus(),m.focus())):d.eq(e).children("a").focus();else if(!m.is("input")){var r,s,t=[];d.each(function(){a(this).hasClass("disabled")||a.trim(a(this).children("a").text().toLowerCase()).substring(0,1)==q[c.keyCode]&&t.push(a(this).index())}),r=a(document).data("keycount"),r++,a(document).data("keycount",r),s=a.trim(a(":focus").text().toLowerCase()).substring(0,1),s!=q[c.keyCode]?(r=1,a(document).data("keycount",r)):r>=t.length&&(a(document).data("keycount",0),r>t.length&&(r=1)),d.eq(t[r-1]).children("a").focus()}if((/(13|32)/.test(c.keyCode.toString(10))||/(^9$)/.test(c.keyCode.toString(10))&&o.options.selectOnTab)&&l){if(/(32)/.test(c.keyCode.toString(10))||c.preventDefault(),o.options.liveSearch)/(32)/.test(c.keyCode.toString(10))||(o.$menuInner.find(".active a").click(),
m.focus());else{var u=a(":focus");u.click(),u.focus(),c.preventDefault(),a(document).data("spaceSelect",!0)}a(document).data("keycount",0)}(/(^9$|27)/.test(c.keyCode.toString(10))&&l&&(o.multiple||o.options.liveSearch)||/(27)/.test(c.keyCode.toString(10))&&!l)&&(o.$menu.parent().removeClass("open"),o.options.container&&o.$newElement.removeClass("open"),o.$button.focus())}},mobile:function(){this.$element.addClass("mobile-device")},refresh:function(){this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.setStyle(),this.setWidth(),this.$lis&&this.$searchbox.trigger("propertychange"),this.$element.trigger("refreshed.bs.select")},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.before(this.$element).remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")}};var l=a.fn.selectpicker;a.fn.selectpicker=c,a.fn.selectpicker.Constructor=k,a.fn.selectpicker.noConflict=function(){return a.fn.selectpicker=l,this},a(document).data("keycount",0).on("keydown.bs.select",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',k.prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',function(a){a.stopPropagation()}),a(window).on("load.bs.select.data-api",function(){a(".selectpicker").each(function(){var b=a(this);c.call(b,b.data())})})}(a)});
//# sourceMappingURL=bootstrap-select.js.map
/*!
 * Responsive Bootstrap Toolkit
 * Author:    Maciej Gurban
 * License:   MIT
 * Version:   2.6.3 (2016-06-21)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
var ResponsiveBootstrapToolkit = (function($){

    // Internal methods
    var internal = {
        /**
         * Breakpoint detection divs for each framework version
         */
        detectionDivs: {
            // Bootstrap 4 - Kept in for future reference on BS4 Beta release
            /*bootstrap4: {
                'xs': $('<div class="device-xs d-block hidden-sm-up"></div>'),
                'sm': $('<div class="device-sm d-block hidden-xs-down hidden-md-up"></div>'),
                'md': $('<div class="device-md d-block hidden-sm-down hidden-lg-up"></div>'),
                'lg': $('<div class="device-lg d-block hidden-md-down hidden-xl-up"></div>'),
                'xl': $('<div class="device-xl d-block hidden-lg-down"></div>')
            },*/
            // Bootstrap 3
            bootstrap: {
                'xs': $('<div class="device-xs visible-xs visible-xs-block"></div>'),
                'sm': $('<div class="device-sm visible-sm visible-sm-block"></div>'),
                'md': $('<div class="device-md visible-md visible-md-block"></div>'),
                'lg': $('<div class="device-lg visible-lg visible-lg-block"></div>')
            },
            // Foundation 5
            foundation: {
                'small':  $('<div class="device-xs show-for-small-only"></div>'),
                'medium': $('<div class="device-sm show-for-medium-only"></div>'),
                'large':  $('<div class="device-md show-for-large-only"></div>'),
                'xlarge': $('<div class="device-lg show-for-xlarge-only"></div>')
            }
        },

        /**
         * Append visibility divs after DOM laoded
         */
        applyDetectionDivs: function() {
            $(document).ready(function(){
                $.each(self.breakpoints, function(alias){
                    self.breakpoints[alias].appendTo('.responsive-bootstrap-toolkit');
                });
            });
        },

        /**
         * Determines whether passed string is a parsable expression
         */
        isAnExpression: function( str ) {
            return (str.charAt(0) == '<' || str.charAt(0) == '>');
        },

        /**
         * Splits the expression in into <|> [=] alias
         */
        splitExpression: function( str ) {

            // Used operator
            var operator = str.charAt(0);
            // Include breakpoint equal to alias?
            var orEqual  = (str.charAt(1) == '=') ? true : false;

            /**
             * Index at which breakpoint name starts.
             *
             * For:  >sm, index = 1
             * For: >=sm, index = 2
             */
            var index = 1 + (orEqual ? 1 : 0);

            /**
             * The remaining part of the expression, after the operator, will be treated as the
             * breakpoint name to compare with
             */
            var breakpointName = str.slice(index);

            return {
                operator:       operator,
                orEqual:        orEqual,
                breakpointName: breakpointName
            };
        },

        /**
         * Returns true if currently active breakpoint matches the expression
         */
        isAnyActive: function( breakpoints ) {
            var found = false;
            $.each(breakpoints, function( index, alias ) {
                // Once first breakpoint matches, return true and break out of the loop
                if( self.breakpoints[ alias ].is(':visible') ) {
                    found = true;
                    return false;
                }
            });
            return found;
        },

        /**
         * Determines whether current breakpoint matches the expression given
         */
        isMatchingExpression: function( str ) {

            var expression = internal.splitExpression( str );

            // Get names of all breakpoints
            var breakpointList = Object.keys(self.breakpoints);

            // Get index of sought breakpoint in the list
            var pos = breakpointList.indexOf( expression.breakpointName );

            // Breakpoint found
            if( pos !== -1 ) {

                var start = 0;
                var end   = 0;

                /**
                 * Parsing viewport.is('<=md') we interate from smallest breakpoint ('xs') and end
                 * at 'md' breakpoint, indicated in the expression,
                 * That makes: start = 0, end = 2 (index of 'md' breakpoint)
                 *
                 * Parsing viewport.is('<md') we start at index 'xs' breakpoint, and end at
                 * 'sm' breakpoint, one before 'md'.
                 * Which makes: start = 0, end = 1
                 */
                if( expression.operator == '<' ) {
                    start = 0;
                    end   = expression.orEqual ? ++pos : pos;
                }
                /**
                 * Parsing viewport.is('>=sm') we interate from breakpoint 'sm' and end at the end
                 * of breakpoint list.
                 * That makes: start = 1, end = undefined
                 *
                 * Parsing viewport.is('>sm') we start at breakpoint 'md' and end at the end of
                 * breakpoint list.
                 * Which makes: start = 2, end = undefined
                 */
                if( expression.operator == '>' ) {
                    start = expression.orEqual ? pos : ++pos;
                    end   = undefined;
                }

                var acceptedBreakpoints = breakpointList.slice(start, end);

                return internal.isAnyActive( acceptedBreakpoints );

            }
        }

    };

    // Public methods and properties
    var self = {

        /**
         * Determines default debouncing interval of 'changed' method
         */
        interval: 100,

        /**
         *
         */
        framework: null,

        /**
         * Breakpoint aliases, listed from smallest to biggest
         */
        breakpoints: null,

        /**
         * Returns true if current breakpoint matches passed alias
         */
        is: function( str ) {
            if( internal.isAnExpression( str ) ) {
                return internal.isMatchingExpression( str );
            }
            return self.breakpoints[ str ] && self.breakpoints[ str ].is(':visible');
        },

        /**
         * Determines which framework-specific breakpoint detection divs to use
         */
        use: function( frameworkName, breakpoints ) {
            self.framework = frameworkName.toLowerCase();

            if( Object.keys(internal.detectionDivs).indexOf(self.framework) !== -1 ) {
                self.breakpoints = internal.detectionDivs[ self.framework ];
            } else {
                self.breakpoints = breakpoints;
            }

            internal.applyDetectionDivs();
        },

        /**
         * Returns current breakpoint alias
         */
        current: function(){
            var name = 'unrecognized';
            $.each(self.breakpoints, function(alias){
                if (self.is(alias)) {
                    name = alias;
                }
            });
            return name;
        },

        /*
         * Waits specified number of miliseconds before executing a callback
         */
        changed: function(fn, ms) {
            var timer;
            return function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn();
                }, ms || self.interval);
            };
        },

        /*
         * Calls function when current breakpoint changes
         */
        breakpointChanged: function(fn, ms) {
            var resizeFn,
            timer,
            lastBreakpoint = self.current();

            //clear the resize event if previously set
            if(resizeFn){
                $(window).off("resize orientationchange", resizeFn);
            }

            resizeFn = function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    var newBreakpoint = self.current();
                    if(newBreakpoint!==lastBreakpoint){
                        fn(newBreakpoint, lastBreakpoint);
                        lastBreakpoint = newBreakpoint;
                    }
                }, ms || self.interval);
            };
            $(window).on("resize orientationchange", resizeFn);
        }

    };

    // Create a placeholder
    $(document).ready(function(){
        $('<div class="responsive-bootstrap-toolkit"></div>').appendTo('body');
    });

    if( self.framework === null ) {
        self.use('bootstrap');
    }

    return self;

})(jQuery);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveBootstrapToolkit;
}
var BootstrapModalAlerts = (function($){
	this.ops = {
		title: "Alert"
	};

	this.$modal = 
	$('<div class="modal fade" id="bsModalAlert" tabindex="-1" role="dialog" aria-labelledby="bsModalAlertLabel" aria-hidden="true">' +
	'  <div class="modal-dialog" role="document">' +
	'    <div class="modal-content">' +
	'      <div class="modal-header">' +
	'        <h5 class="modal-title" id="bsModalAlertLabel"></h5>' +
	'        <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
	'          <span aria-hidden="true">&times;</span>' +
	'        </button>' +
	'      </div>' +
	'      <div class="modal-body">' +
	'      </div>' +
	'      <div class="modal-footer">' +
	'        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-fn_value="0">Cancel</button>' +
	'        <button type="button" class="btn btn-primary alert-confirm" data-dismiss="modal" data-fn_value="1">OK</button>' +
	'     </div>' +
	'    </div>' +
	'  </div>' +
	'</div>');
	
	this.alert = function(message, ops, fn)
	{
		return this.confirm(message, ops, fn, true);
	};

	this.confirm = function(message, ops, fn, okOnly)
	{
		var _self = this,
		localOps = $.extend({}, this.ops, ops),
		$localModal = this.$modal.clone();

		$(".modal-body", $localModal).html(message);
		$(".modal-title", $localModal).html(localOps.title);
		if(okOnly)
		{
			$(".btn-secondary", $localModal).remove();
		}

		$localModal.appendTo("body");

		if('function' == typeof fn)
		{
			$(".btn", $localModal).on("click", function(e){
				fn.call(this, e, $(this).attr("data-fn_value")/1, _self);
			});
		}
		$localModal.modal('show');
		return true;
	};
	return this;
})(jQuery);
var GoogleMap = (function($, viewport, alert, confirm){
  var bootstrap4Divs = {
    'xs': $('<div class="device-xs d-block hidden-sm-up"></div>'),
    'sm': $('<div class="device-sm d-block hidden-xs-down hidden-md-up"></div>'),
    'md': $('<div class="device-md d-block hidden-sm-down hidden-lg-up"></div>'),
    'lg': $('<div class="device-lg d-block hidden-md-down hidden-xl-up"></div>'),
    'xl': $('<div class="device-xl d-block hidden-lg-down"></div>')
  };    
  viewport.use('bootstrap4', bootstrap4Divs);

  var map,
  colors = ['#1866b8', '#0a76e5', '#31a9ff', '#b2d6fa'],//
  center = {lat: 51.4820, lng: -0.09},
  searchMarker = null,
  selectedFeature = null,
  lastSearch = null,
  maxAttempts = 3,
  totalAttempts = 0,
  GeoJson,
  $map = $('#map'),
  $sessionSelect = $("#sessionSelect"),
  $searchInput = $("#postcodeInput"),
  initCalled = false,
  pageIntent = null,
  $advisorCard = $("#advisorCard"),
  $medicineCard = $("#medicineCard"),
  $nextSteps = $("#nextSteps"),
  boroughsLocation = "London",
  searchToken,
  geocoder,
  ResponseMessages,
  markerIcon,
  markerIconSmall;
  
  function gaTrack(obj)
  {
    if(typeof ga!='undefined')
    {
      ga('send', obj);
    }
    else
    {
      console.log("Google analytics not available. Object attempted to send", obj);
    }
  }

  function hideAllResults()
  {
    $("#confirmPostcode").removeClass("disabled");
    $sessionSelect.selectpicker('val', '');
    $nextSteps.addClass("hidden");
    $("#boroughCard").hide();
    selectChanged();
  }

  function search(searchText, dropdown)
  {
    if(!searchText)
    {
      searchText = $searchInput.val();
      gaTrack({
        hitType: 'event',
        eventCategory: 'Google Map Search',
        eventAction: 'Query',
        eventLabel: searchText
      });
    }
    if(null === lastSearch || lastSearch.toLowerCase() !== searchText.toLowerCase())
    {
      lastSearch = searchText;

      // Unset any selected feature
      if(selectedFeature)
      {
        map.data.overrideStyle(selectedFeature, selectedFeature.getProperty('originalColors'));
        selectedFeature = null;
      }

      // Unset the marker if already present
      if(searchMarker)
      {
        searchMarker.setMap(null);
      }

      // Reset if the search field is empty
      if(searchText === '')
      {
        hideAllResults();
        return;
      }

      $searchInput.prop('disabled', true);

      if(!geocoder)
      {
        geocoder = new google.maps.Geocoder();
      }
      geocoder.geocode({
        address: searchText,
        region: 'GB',
        bounds: map.getBounds()
      }, function(results, status){
        searchResult(results, status, searchText, dropdown);
      }); 
    }
    else
    {
      $("#confirmPostcode").removeClass("disabled");
      $searchInput.prop('disabled', false);
    }
  }

  function searchResult(results, status, searchText, dropdown) 
  {
    totalAttempts++;
    
    // callback with a status and result
    if (status === google.maps.GeocoderStatus.OK)
    {
      totalAttempts = 0;
      var resultLatLng;
      $.each(results, function(){
        if(typeof this.geometry.location.lat == 'function')
        {
          resultLatLng = new google.maps.LatLng(this.geometry.location.lat(), this.geometry.location.lng());
        }
        else
        {
          // if we request from our own server again
          resultLatLng = new google.maps.LatLng(this.geometry.location.lat, this.geometry.location.lng);
        }
        // Loop through all features
        map.data.forEach(function(feature){
          // Get geometry lat lng array from feature
          var geometry = feature.getGeometry(),
          latLngArray = geometry.getArray()[0].getArray();
          // create a temporary polygon becayse we cannot access a polygon class it seems from a feature
          var tempPolygon = new google.maps.Polygon({paths: latLngArray});
          // check if the found marker point is within the new polygon
          if(google.maps.geometry.poly.containsLocation(resultLatLng, tempPolygon))
          {
            // The marker is within the polygon, set it as selected and stop looping
            selectedFeature = feature;
            map.data.overrideStyle(selectedFeature, {
              fillColor: '#15ce75',
              strokeColor: '#FFFFFF',
              strokeWeight: viewport.is("<sm") ? 2 : 3,
              zIndex: 2
            });
            return false;
          }
        });
        if(selectedFeature)
        {
          return false;
        }
      });
      
      // Check if the marker point is within any borough, if not display error
      
      if(!selectedFeature)
      {
        gaTrack({
          hitType: 'event',
          eventCategory: 'Google Map Search',
          eventAction: 'Not Local Borough Result',
          eventLabel: searchText
        });
        if(!dropdown)
        {
          hideAllResults();
        }
        showBoroughInfo(ResponseMessages['map_search_results.result_not_local'], true, dropdown);
      }
      else
      {
        // Add the marker at the new position
        searchMarker = new google.maps.Marker({
          position: resultLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: viewport.is("<sm") ? markerIconSmall : markerIcon,
          optimized: false
        });

        // Update and show the card displaying the borough
        if($sessionSelect.val() !== selectedFeature.getProperty('name'))
        {
          $sessionSelect.selectpicker('val', selectedFeature.getProperty('name'));
          selectChanged(selectedFeature);
        }
        else
        {
          enableInputs();
        }
      }
    }
    else 
    {
      // Allow same search to be completed again
      lastSearch = null;
      if(!dropdown)
      {
        hideAllResults();
      }
      gaTrack({
        hitType: 'event',
        eventCategory: 'Google Map Search',
        eventAction: 'Error '+status,
        eventLabel: searchText
      });

      if(status === google.maps.GeocoderStatus.ZERO_RESULTS)
      {
        showBoroughInfo(ResponseMessages['map_search_results.no_results'], true, dropdown);
      }
      else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
      {
        if(totalAttempts >= maxAttempts)
        {
          showBoroughInfo(ResponseMessages['map_search_results.limit_reached'], true, dropdown);
        }
        else
        {
          showBoroughInfo(ResponseMessages['map_search_results.retry'].replaceAll("%attempt_count%", totalAttempts+1), true, dropdown);
          lastSearch = null;
          setTimeout(function(){
            search(searchText, dropdown);
          }, 1100);
        }
      }
      else if(status === google.maps.GeocoderStatus.UNKNOWN_ERROR)
      {
        showBoroughInfo(ResponseMessages['map_search_results.unknown_error'], true, dropdown);
      }
      else
      {
        showBoroughInfo(ResponseMessages['map_search_results.other_error'].replaceAll("%status%", status), true, dropdown);
      }
    }
  }

  function selectChanged(boroughFeature)
  {
    var featureProperties = {},
    borough = $sessionSelect.val();
    if(borough !== '')
    {
      if(typeof boroughFeature.getProperty !== 'function')
      {
        // var passed is not a feautre, fine the feature (if dropdown select changed instead of map found and provided it to this function)
        // Skip using the map data in case it hasn't loaded
        $.each(GeoJson.features, function()
        {
          if(this.properties.name === borough)
          {
            featureProperties = this.properties;
            return false;
          }
        });

        gaTrack({
          hitType: 'event',
          eventCategory: 'Borough Dropdown Selected',
          eventAction: borough
        });
      }
      else
      {
        boroughFeature.forEachProperty(function(val, key)
        {
          featureProperties[key] = val;
        });
        gaTrack({
          hitType: 'event',
          eventCategory: 'Google Map Search',
          eventAction: 'Borough Result',
          eventLabel: borough
        });
      }
      gaTrack({
        hitType: 'event',
        eventCategory: 'Borough Information Shown',
        eventAction: borough
      });

      showBoroughInfo(featureProperties);
      
      // Search will only happen if not a duplicate search so this is OK to call here.
      // When search completes it triggers this selectChanged function. Primary flow is for dropdown change to happen
      // and info to display immediately, before the map search is done
      search(borough, true);
    }
  }

  function enableInputs()
  {
    $("#confirmPostcode").removeClass("disabled");
    $searchInput.prop('disabled', false);
  }

  function showBoroughInfo(msg, error, fromDropdown)
  {
    // Show the card - remove success and warning styles
    $("#boroughCard").show().removeClass("card-outline-warning card-outline-success");
    
    // Add warning styles for error
    if(error)
    {
      if(!fromDropdown)
      {
        $("#boroughCard").addClass("card-outline-warning");
        $("#liveIn").hide();
        $("#selectedBorough").html(msg);
      }
      else
      {
        console.warn(msg);
        $("#boroughCard").addClass("card-outline-success");
      }
    }
    else
    {
      var boroughProps = msg,
      $telCont,
      $message,
      message,
      $tel = $('<a />', {
        class: 'tel hidden-sm-down'
      }),
      $telBtn = $('<a />', {
        class: 'hidden-md-up btn btn-success btn-cta btn-tel'
      }).html('<span class="tel-text"></span>');

      $("#boroughCard").addClass("card-outline-success");
      $("#liveIn").show();
      $("#selectedBorough").html(boroughProps.name);

      var showTelephone = function($telCont, key)
      {
        if(!key)
        {
          key = 'telephone';
        }
        var isLink = key==='website';

        if(boroughProps.service[key])
          {
            if(null !== boroughProps.service[key])
            {
              var telNumbers;
              try{
                telNumbers = JSON.parse(boroughProps.service[key]);
              }catch(e){
                telNumbers = [
                  boroughProps.service[key]
                ];
              }
              var href = !isLink ? "tel:+44"+telNumbers[0].replace(/\s/g, '').substr(1) : telNumbers[0].replace(/\s/g, '');
              var html = !isLink ? telNumbers[0] : 'Visit Website';
              var $telClone = $tel.clone();
              var $newBtn = $telBtn.clone();
              if(isLink)
              {
                $telClone.add($newBtn).attr("target", "_blank");
              }
              
              $telClone.attr("href", href)
                  .html(html)
                  .appendTo($telCont);

              
              $(".tel-text", $newBtn).html(html);
              $newBtn
                  .attr("href", href)
                  .appendTo($telCont);
              
              if(!isLink)
              {
                $telCont.removeClass("website");
                $(".stop-smoking-london-info-row").hide();
              }
              else if(!$telCont.hasClass("website"))
              {
                $telCont.addClass("website");
              }
            }
          }
      },
      appendMessage = function(msg)
      {
        return '<br /><br /><b>' + msg + '</b>';
      },
      getMessage = function(group, key)
      {
        var message = ResponseMessages['steps.2.'+group+'.'+key+'.message'];
        if(ResponseMessages['steps.2.'+group+'.'+key+'.append'])
        {
          message += appendMessage(ResponseMessages['steps.2.'+group+'.'+key+'.append']);
        }
        var appendFallback = ResponseMessages['steps.2.'+group+'.'+key+'.append_fallback_message']=='1' || ResponseMessages['steps.2.'+group+'.'+key+'.append_fallback_message']=='true';
        if(
          appendFallback
        )
        {
          message += appendMessage(ResponseMessages['steps.2.all.fallback_message']);
        }
        message = message.replaceAll("%borough%", '<b>' + boroughProps.name + '</b>');
        message = message.replaceAll("%service_name%", (boroughProps.service && boroughProps.service.name) ? ', <b>' + boroughProps.service.name + '</b>' : '');
        return message;
      };

      if($advisorCard.length > 0)
      {
        // We have an advisor info card to fill in
        $telCont = $(".tel-cont", $advisorCard).empty();
        //$websiteCont = $(".website-cont", $advisorCard).empty();
        $message = $(".message", $advisorCard);
        $(".stop-smoking-london-info-row").show();
        var SpecialistPharmacy = null === boroughProps.service ? false : (boroughProps.service.pharmacy_staff && null !== boroughProps.service.telephone);

        if(null === boroughProps.service)
        {
          message = getMessage('all', 'no_information');
        }
        else if(null === boroughProps.service.telephone && boroughProps.service.specialist_advisors)
        {
          message = getMessage('advisor', 'no_telephone');
        }
        else if(boroughProps.service.specialist_advisors)
        {
          message = getMessage('advisor', 'has_advisors');
          showTelephone($telCont);
        }
        else if(SpecialistPharmacy)
        {
          message = getMessage('advisor', 'has_pharmacy_staff');
          showTelephone($telCont);
        }
        else if(boroughProps.service.web_service_available)
        {
          message = getMessage('advisor', 'web_based');
          showTelephone($telCont, 'website');
        }
        else
        {
          message = getMessage('advisor', 'no_service');
        }
        $message.html(message);
      }

      if($medicineCard.length > 0)
      {
        // We have an medicine info card to fill in
        $telCont = $(".tel-cont", $medicineCard);
        $message = $(".message", $medicineCard);
        $telCont.hide();
        if(null === boroughProps.service)
        {
          message = getMessage('all', 'no_information');
        }
        else if(boroughProps.service.gp_prescription)
        {
          message = getMessage('medicine', 'gp_prescription');
        }
        else
        {
          message = getMessage('medicine', 'no_gp');
        }
        $message.html(message);
      }

      $nextSteps.removeClass("hidden");
    }
    enableInputs();
    Tooltips.refresh();
  }

  function initMap()
  {
    $("#confirmPostcode").addClass("disabled");
    $searchInput.prop('disabled', true);
    var placholderText = $searchInput.attr("placeholder");
    $searchInput.attr("placeholder", "Loading...");
    
    // Only initialise once - public function so extra control
    // Called from the google maps async loaded script
    if(initCalled)
    {
      return;
    }
    initCalled = true;

    // Initialise the map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: center,
      styles: [
        {
          "featureType": "all",
          "stylers": [
            { 
              "color": "#f7f7f7",
              "visibility": "off"
            }
          ]
        }
      ],
      //mapTypeControl: false,
      mapTypeId: 'roadmap',
      //streetViewControl: false,
      zoomControl: false,
      clickableIcons: false,
      disableDefaultUI: true,
      draggable: false,
      gestureHandling: "none",
      keyboardShortcuts: false,
      scrollwheel: false
    });

    markerIcon = new google.maps.MarkerImage("/bundles/app/images/icon/pin.png", new google.maps.Size(42, 77), new google.maps.Point(0, 0), new google.maps.Point(10.5, 38.5), new google.maps.Size(21, 38.5));
    markerIconSmall = new google.maps.MarkerImage("/bundles/app/images/icon/pin.png", new google.maps.Size(42, 77), new google.maps.Point(0, 0), new google.maps.Point(7.88, 28.88), new google.maps.Size(15.75, 28.88));

    // Set token as variable and remove the attribute
    var token = $map.attr("data-token");
    $map.removeAttr("data-token");

    searchToken = $map.attr("data-search-token");
    $map.removeAttr("data-search-token");

    // Get GeoJson with token in GET
    // ?token=' + token
    $.getJSON('/boroughs-and-messages.json', function(data)
    {
      $searchInput.prop('disabled', false);
      $("#confirmPostcode").removeClass("disabled");
      $searchInput.attr("placeholder", placholderText);

      // Set local variable with the GeoJson data - parameters have all the info we need out of database
      GeoJson = data.LoadedGeoJson;
      ResponseMessages = data.messages;
      //  Add borough options to dropdown
      $.each(GeoJson.features, function(){
        $sessionSelect.append(
          $("<option />", {
            value: this.properties.name,
            html: this.properties.name
          })
        );
      });
      $sessionSelect.selectpicker('refresh');
      
      // Initialise the map
      var features = map.data.addGeoJson(GeoJson);
      map.data.setStyle({
        fillColor: colors[1],
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#FFFFFF',
        strokeOpacity: 1,
        draggable: false,
        clickable: false
      });
      $.each(features, function(index){
        var colIndex = index%colors.length;
        var initStrkIndex = colIndex===1 ? index+1 : index+3;
        var strkIndex = initStrkIndex%colors.length;
        var featureStyle = {
          fillColor: colors[colIndex],
          strokeColor: colors[strkIndex],
          strokeWeight: 1,
          zIndex: 1
        };
        map.data.overrideStyle(this, featureStyle);
        this.setProperty('originalColors', featureStyle);
      });
    });

    $("#confirmPostcode").on("click", function(e){
      e.preventDefault();
      var $btn = $(this);
      if(!$btn.hasClass("disabled"))
      {
        $btn.addClass("disabled");
        search();
      }
    });

    $searchInput.on('keypress', function (e) {
        if (e.keyCode == 13) {
          $("#confirmPostcode").trigger("click");
        }
    });

    $(initDoc);
  }

  function initDoc()
  {
    // Fix because gridlines appear in safari when positioning google map with subpixels/percent
    // Also mobile/desktop google map resize
    var updateRealMapLeft = function()
    {
      var $posElem = $(".google-map-outer"),
      posOffset = $posElem.position(),
      $spacer = $(".google-map.spacer"),
      spacerOffset = $spacer.position();
      $map.css({
        left: Math.round(posOffset.left+spacerOffset.left)+"px"
      });
    },
    updateMap = function(breakpoint)
    {
      switch(breakpoint)
      {
        //case "xl":
          /*$(".google-map").css({
            height: '500px',
            width: '630px'
          });
          google.maps.event.trigger(map, "resize");*/
          //map.setZoom(10);
        //break;
        case "xs":
          $(".google-map").css({
            height: '200px',
            width: '280px'
          });
          google.maps.event.trigger(map, "resize");
          map.setZoom(8);
        break;
        default:
          $(".google-map").css({
            height: '310px',
            width: '312px'
          });
          google.maps.event.trigger(map, "resize");
          map.setZoom(9);
        break;
      }
      updateRealMapLeft();
      map.setCenter(center);
    };
    viewport.breakpointChanged(updateMap);
    updateMap(viewport.current());
    //updateRealMapLeft();
    $(window).on("resize orientationchange", updateRealMapLeft);

    // Setup the selectbox change event
    $sessionSelect.on("change", selectChanged);

    $(".search-type-toggle").on("click", function(e)
    {
      e.preventDefault();
      $(this).parents(".toggle-area").hide();
      $($(this).attr("data-toggle")).show();
      $sessionSelect.selectpicker('toggle');
      $sessionSelect.selectpicker('refresh');
      $sessionSelect.selectpicker('toggle');
    });
  }

  if(!isMobile.any)
  {
    $searchInput.focus();
  }

  var public = {
    init: initMap
  };  
  return public;
})(jQuery, ResponsiveBootstrapToolkit, BootstrapModalAlerts.alert, BootstrapModalAlerts.confirm);
(function($, alert){
  var $emailCard = $("#emailCard"),
  $emailError = $("#emailError"),
  $emailThanks = $("#emailThanks"),
  $emailForm = $('#emailForm');

  $emailForm.submit(function (e) {
    e.preventDefault();
    var url = this.action + "?callback=?";
    console.log(url);
    $.ajax({
      cache: false,
      url: url,
      dataType: "json",
      data: $(this).serialize(),
      success: function(data) {
        if (data.Status === 400) {
          $emailCard.addClass("card-outline-warning").removeClass("card-outline-success");
          $emailError.html("Sorry, the email entered appears to be invalid. Please check it and try again.");
        } else { // 200
          $emailCard.removeClass("card-outline-warning").addClass("card-outline-success");
          $emailError.empty();
          $emailThanks.css({display: 'inline-block'});
          $emailForm.hide();
        }
      }
    });
  });
})(jQuery, BootstrapModalAlerts.alert);
  
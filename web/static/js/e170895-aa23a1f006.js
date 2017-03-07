if(!!window.google&&!!google.maps){function MultiGeometry(multiGeometryOptions){function createPolyline(polylineOptions,mg){var polyline=new google.maps.Polyline(polylineOptions);google.maps.event.addListener(polyline,"click",function(evt){google.maps.event.trigger(mg,"click",evt)});google.maps.event.addListener(polyline,"dblclick",function(evt){google.maps.event.trigger(mg,"dblclick",evt)});google.maps.event.addListener(polyline,"mousedown",function(evt){google.maps.event.trigger(mg,"mousedown",evt)});google.maps.event.addListener(polyline,"mousemove",function(evt){google.maps.event.trigger(mg,"mousemove",evt)});google.maps.event.addListener(polyline,"mouseout",function(evt){google.maps.event.trigger(mg,"mouseout",evt)});google.maps.event.addListener(polyline,"mouseover",function(evt){google.maps.event.trigger(mg,"mouseover",evt)});google.maps.event.addListener(polyline,"mouseup",function(evt){google.maps.event.trigger(mg,"mouseup",evt)});google.maps.event.addListener(polyline,"rightclick",function(evt){google.maps.event.trigger(mg,"rightclick",evt)});return polyline}this.setValues(multiGeometryOptions);this.polylines=[];for(i=0;i<this.paths.length;i++){var polylineOptions=multiGeometryOptions;polylineOptions.path=this.paths[i];var polyline=createPolyline(polylineOptions,this);this.polylines.push(polyline)}}MultiGeometry.prototype=new google.maps.MVCObject;MultiGeometry.prototype.changed=function(key){if(this.polylines){for(var i=0;i<this.polylines.length;i++){this.polylines[i].set(key,this.get(key))}}};MultiGeometry.prototype.setMap=function(map){this.set("map",map)};MultiGeometry.prototype.getMap=function(){return this.get("map")}}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}geoXML3=window.geoXML3||{instances:[]};geoXML3.parser=function(options){google.maps.MVCObject.call(this);var parserOptions=geoXML3.combineOptions(options,{singleInfoWindow:false,processStyles:true,zoom:true});var docs=[];var lastPlacemark;var parserName;if(typeof parserOptions.suppressInfoWindows=="undefined")parserOptions.suppressInfoWindows=false;if(!parserOptions.infoWindow&&parserOptions.singleInfoWindow&&!!window.google&&!!google.maps)parserOptions.infoWindow=new google.maps.InfoWindow;geoXML3.xhrTimeout=6e4;if(!!parserOptions.xhrTimeout)geoXML3.xhrTimeout=parserOptions.xhrTimeout;var parseKmlString=function(kmlString,docSet){var internals={parser:this,docSet:docSet||[],remaining:1,parseOnly:!(parserOptions.afterParse||parserOptions.processStyles)};thisDoc=new Object;thisDoc.internals=internals;internals.docSet.push(thisDoc);render(geoXML3.xmlParse(kmlString),thisDoc)};var parse=function(urls,docSet){if(!parserName){parserName="geoXML3.instances["+(geoXML3.instances.push(this)-1)+"]"}if(typeof urls==="string"){urls=[urls]}var internals={parser:this,docSet:docSet||[],remaining:urls.length,parseOnly:!(parserOptions.afterParse||parserOptions.processStyles)};var thisDoc,j;for(var i=0;i<urls.length;i++){var baseUrl=urls[i].split("?")[0];for(j=0;j<docs.length;j++){if(baseUrl===docs[j].baseUrl){thisDoc=docs[j];thisDoc.reload=true;break}}if(j>=docs.length){thisDoc=new Object;thisDoc.baseUrl=baseUrl;internals.docSet.push(thisDoc)}thisDoc.url=urls[i];thisDoc.internals=internals;var url=thisDoc.url;if(parserOptions.proxy)url=parserOptions.proxy+thisDoc.url;fetchDoc(url,thisDoc)}};function fetchDoc(url,doc){geoXML3.fetchXML(url,function(responseXML){render(responseXML,doc)})}var hideDocument=function(doc){if(!doc)doc=docs[0];var i;if(!!window.google&&!!google.maps){if(!!doc.markers){for(i=0;i<doc.markers.length;i++){if(!!doc.markers[i].infoWindow)doc.markers[i].infoWindow.close();doc.markers[i].setVisible(false)}}if(!!doc.ggroundoverlays){for(i=0;i<doc.ggroundoverlays.length;i++){doc.ggroundoverlays[i].setOpacity(0)}}if(!!doc.gpolylines){for(i=0;i<doc.gpolylines.length;i++){if(!!doc.gpolylines[i].infoWindow)doc.gpolylines[i].infoWindow.close();doc.gpolylines[i].setMap(null)}}if(!!doc.gpolygons){for(i=0;i<doc.gpolygons.length;i++){if(!!doc.gpolygons[i].infoWindow)doc.gpolygons[i].infoWindow.close();doc.gpolygons[i].setMap(null)}}}};var showDocument=function(doc){if(!doc)doc=docs[0];var i;if(!!window.google&&!!google.maps){if(!!doc.markers){for(i=0;i<doc.markers.length;i++){doc.markers[i].setVisible(true)}}if(!!doc.ggroundoverlays){for(i=0;i<doc.ggroundoverlays.length;i++){doc.ggroundoverlays[i].setOpacity(doc.ggroundoverlays[i].percentOpacity_)}}if(!!doc.gpolylines){for(i=0;i<doc.gpolylines.length;i++){doc.gpolylines[i].setMap(parserOptions.map)}}if(!!doc.gpolygons){for(i=0;i<doc.gpolygons.length;i++){doc.gpolygons[i].setMap(parserOptions.map)}}}};var defaultStyle={color:"ff000000",colorMode:"normal",width:1,fill:true,outline:true,fillcolor:"3fff0000"};function processStyle(thisNode,styles,styleID){var nodeValue=geoXML3.nodeValue;styles[styleID]=styles[styleID]||clone(defaultStyle);var styleNodes=thisNode.getElementsByTagName("IconStyle");if(!!styleNodes&&!!styleNodes.length&&styleNodes.length>0){styles[styleID].scale=parseFloat(nodeValue(styleNodes[0].getElementsByTagName("scale")[0]))}if(isNaN(styles[styleID].scale))styles[styleID].scale=1;styleNodes=thisNode.getElementsByTagName("Icon");if(!!styleNodes&&!!styleNodes.length&&styleNodes.length>0){styles[styleID].href=nodeValue(styleNodes[0].getElementsByTagName("href")[0])}styleNodes=thisNode.getElementsByTagName("LineStyle");if(!!styleNodes&&!!styleNodes.length&&styleNodes.length>0){styles[styleID].color=nodeValue(styleNodes[0].getElementsByTagName("color")[0],defaultStyle.color);styles[styleID].colorMode=nodeValue(styleNodes[0].getElementsByTagName("colorMode")[0],defaultStyle.colorMode);styles[styleID].width=nodeValue(styleNodes[0].getElementsByTagName("width")[0],defaultStyle.width)}styleNodes=thisNode.getElementsByTagName("PolyStyle");if(!!styleNodes&&!!styleNodes.length&&styleNodes.length>0){styles[styleID].outline=getBooleanValue(styleNodes[0].getElementsByTagName("outline")[0],defaultStyle.outline);styles[styleID].fill=getBooleanValue(styleNodes[0].getElementsByTagName("fill")[0],defaultStyle.fill);styles[styleID].colorMode=nodeValue(styleNodes[0].getElementsByTagName("colorMode")[0],defaultStyle.colorMode);styles[styleID].fillcolor=nodeValue(styleNodes[0].getElementsByTagName("color")[0],defaultStyle.fillcolor)}return styles[styleID]}function clone(obj){if(obj==null||typeof obj!="object")return obj;var temp=new obj.constructor;for(var key in obj)temp[key]=clone(obj[key]);return temp}function processStyleMap(thisNode,styles,styleID){var nodeValue=geoXML3.nodeValue;var pairs=thisNode.getElementsByTagName("Pair");var map=new Object;for(var pr=0;pr<pairs.length;pr++){var pairkey=nodeValue(pairs[pr].getElementsByTagName("key")[0]);var pairstyle=nodeValue(pairs[pr].getElementsByTagName("Style")[0]);var pairstyleurl=nodeValue(pairs[pr].getElementsByTagName("styleUrl")[0]);if(!!pairstyle){processStyle(pairstyle,map[pairkey],styleID)}else if(!!pairstyleurl&&!!styles[pairstyleurl]){map[pairkey]=clone(styles[pairstyleurl])}}if(!!map["normal"]){styles[styleID]=clone(map["normal"])}else{styles[styleID]=clone(defaultStyle)}if(!!map["highlight"]&&!!parserOptions.processStyles){processStyleID(map["highlight"])}styles[styleID].map=clone(map)}function getBooleanValue(node){var nodeContents=geoXML3.nodeValue(node);if(!nodeContents)return true;if(nodeContents)nodeContents=parseInt(nodeContents);if(isNaN(nodeContents))return true;if(nodeContents==0)return false;else return true}function processPlacemarkCoords(node,tag){var parent=node.getElementsByTagName(tag);var coordListA=[];for(var i=0;i<parent.length;i++){var coordNodes=parent[i].getElementsByTagName("coordinates");if(!coordNodes){if(coordListA.length>0){break}else{return[{coordinates:[]}]}}for(var j=0;j<coordNodes.length;j++){var coords=geoXML3.nodeValue(coordNodes[j]).trim();coords=coords.replace(/,\s+/g,",");var path=coords.split(/\s+/g);var pathLength=path.length;var coordList=[];for(var k=0;k<pathLength;k++){coords=path[k].split(",");if(!isNaN(coords[0])&&!isNaN(coords[1])){coordList.push({lat:parseFloat(coords[1]),lng:parseFloat(coords[0]),alt:parseFloat(coords[2])})}}coordListA.push({coordinates:coordList})}}return coordListA}var render=function(responseXML,doc){if(!responseXML||responseXML=="failed parse"){geoXML3.log("Unable to retrieve "+doc.url);if(parserOptions.failedParse){parserOptions.failedParse(doc)}}else if(!doc){throw"geoXML3 internal error: render called with null document"}else{var i;var styles={};doc.placemarks=[];doc.groundoverlays=[];doc.ggroundoverlays=[];doc.networkLinks=[];doc.gpolygons=[];doc.gpolylines=[];doc.markers=[];var nodeValue=geoXML3.nodeValue;var styleID,styleNodes;nodes=responseXML.getElementsByTagName("Style");nodeCount=nodes.length;for(i=0;i<nodeCount;i++){thisNode=nodes[i];var thisNodeId=thisNode.getAttribute("id");if(!!thisNodeId){styleID="#"+thisNodeId;processStyle(thisNode,styles,styleID)}}nodes=responseXML.getElementsByTagName("StyleMap");for(i=0;i<nodes.length;i++){thisNode=nodes[i];var thisNodeId=thisNode.getAttribute("id");if(!!thisNodeId){styleID="#"+thisNodeId;processStyleMap(thisNode,styles,styleID)}}doc.styles=styles;if(!!parserOptions.processStyles||!parserOptions.createMarker){processStyles(doc)}if(!!doc.reload&&!!doc.markers){for(i=0;i<doc.markers.length;i++){doc.markers[i].active=false}}var placemark,node,coords,path,marker,poly;var placemark,coords,path,pathLength,marker,polygonNodes,coordList;var placemarkNodes=responseXML.getElementsByTagName("Placemark");for(pm=0;pm<placemarkNodes.length;pm++){node=placemarkNodes[pm];placemark={name:geoXML3.nodeValue(node.getElementsByTagName("name")[0]),description:geoXML3.nodeValue(node.getElementsByTagName("description")[0]),styleUrl:geoXML3.nodeValue(node.getElementsByTagName("styleUrl")[0]),id:node.getAttribute("id")};placemark.style=doc.styles[placemark.styleUrl]||clone(defaultStyle);var inlineStyles=node.getElementsByTagName("Style");if(inlineStyles&&inlineStyles.length>0){var style=processStyle(node,doc.styles,"inline");processStyleID(style);if(style)placemark.style=style}if(/^https?:\/\//.test(placemark.description)){placemark.description=['<a href="',placemark.description,'">',placemark.description,"</a>"].join("")}var GeometryNodes=node.getElementsByTagName("coordinates");var Geometry=null;if(!!GeometryNodes&&GeometryNodes.length>0){for(var gn=0;gn<GeometryNodes.length;gn++){if(!GeometryNodes[gn].parentNode||!GeometryNodes[gn].parentNode.nodeName){}else{var GeometryPN=GeometryNodes[gn].parentNode;Geometry=GeometryPN.nodeName;switch(Geometry){case"Point":placemark.Point=processPlacemarkCoords(node,"Point")[0];if(!!window.google&&!!google.maps)placemark.latlng=new google.maps.LatLng(placemark.Point.coordinates[0].lat,placemark.Point.coordinates[0].lng);pathLength=1;break;case"LinearRing":polygonNodes=node.getElementsByTagName("Polygon");if(!placemark.Polygon)placemark.Polygon=[{outerBoundaryIs:{coordinates:[]},innerBoundaryIs:[{coordinates:[]}]}];for(var pg=0;pg<polygonNodes.length;pg++){placemark.Polygon[pg]={outerBoundaryIs:{coordinates:[]},innerBoundaryIs:[{coordinates:[]}]};placemark.Polygon[pg].outerBoundaryIs=processPlacemarkCoords(polygonNodes[pg],"outerBoundaryIs");placemark.Polygon[pg].innerBoundaryIs=processPlacemarkCoords(polygonNodes[pg],"innerBoundaryIs")}coordList=placemark.Polygon[0].outerBoundaryIs;break;case"LineString":pathLength=0;placemark.LineString=processPlacemarkCoords(node,"LineString");break;default:break}}}}if(!!parserOptions.pmParseFn)parserOptions.pmParseFn(node,placemark);doc.placemarks.push(placemark);if(!!window.google&&!!google.maps){if(placemark.Point){if(!!window.google&&!!google.maps){doc.bounds=doc.bounds||new google.maps.LatLngBounds;doc.bounds.extend(placemark.latlng)}if(!!parserOptions.createMarker){parserOptions.createMarker(placemark,doc)}else{var found=false;if(!!doc){doc.markers=doc.markers||[];if(doc.reload){for(var j=0;j<doc.markers.length;j++){if(doc.markers[j].id==placemark.id||!doc.markers[j].id&&doc.markers[j].getPosition().equals(placemark.latlng)){found=doc.markers[j].active=true;break}}}}if(!found){marker=createMarker(placemark,doc);if(marker){marker.active=true;marker.id=placemark.id}}}}if(placemark.Polygon){if(!!doc){doc.gpolygons=doc.gpolygons||[]}if(!!parserOptions.createPolygon){poly=parserOptions.createPolygon(placemark,doc)}else{poly=createPolygon(placemark,doc);poly.active=true}if(!!window.google&&!!google.maps){doc.bounds=doc.bounds||new google.maps.LatLngBounds;doc.bounds.union(poly.bounds)}}if(placemark.LineString){if(!!doc){doc.gpolylines=doc.gpolylines||[]}if(!!parserOptions.createPolyline){poly=parserOptions.createPolyline(placemark,doc)}else{poly=createPolyline(placemark,doc);poly.active=true}if(!!window.google&&!!google.maps){doc.bounds=doc.bounds||new google.maps.LatLngBounds;doc.bounds.union(poly.bounds)}}}}if(!!doc.reload&&!!doc.markers){for(i=doc.markers.length-1;i>=0;i--){if(!doc.markers[i].active){if(!!doc.markers[i].infoWindow){doc.markers[i].infoWindow.close()}doc.markers[i].setMap(null);doc.markers.splice(i,1)}}}if(!!doc.reload&&!!doc.groundoverlays){for(i=0;i<doc.groundoverlays.length;i++){doc.groundoverlays[i].active=false}}if(!!doc){doc.groundoverlays=doc.groundoverlays||[]}var groundOverlay,color,transparency,overlay;var groundNodes=responseXML.getElementsByTagName("GroundOverlay");for(i=0;i<groundNodes.length;i++){node=groundNodes[i];groundOverlay={name:geoXML3.nodeValue(node.getElementsByTagName("name")[0]),description:geoXML3.nodeValue(node.getElementsByTagName("description")[0]),icon:{href:geoXML3.nodeValue(node.getElementsByTagName("href")[0])},latLonBox:{north:parseFloat(geoXML3.nodeValue(node.getElementsByTagName("north")[0])),east:parseFloat(geoXML3.nodeValue(node.getElementsByTagName("east")[0])),south:parseFloat(geoXML3.nodeValue(node.getElementsByTagName("south")[0])),west:parseFloat(geoXML3.nodeValue(node.getElementsByTagName("west")[0]))}};if(!!window.google&&!!google.maps){doc.bounds=doc.bounds||new google.maps.LatLngBounds;doc.bounds.union(new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south,groundOverlay.latLonBox.west),new google.maps.LatLng(groundOverlay.latLonBox.north,groundOverlay.latLonBox.east)))}var colorNode=node.getElementsByTagName("color");if(colorNode&&colorNode.length&&colorNode.length>0){groundOverlay.opacity=geoXML3.getOpacity(nodeValue(colorNode[0]))}else{groundOverlay.opacity=.45}doc.groundoverlays.push(groundOverlay);if(!!window.google&&!!google.maps){if(!!parserOptions.createOverlay){parserOptions.createOverlay(groundOverlay,doc)}else{var found=false;if(!!doc){doc.groundoverlays=doc.groundoverlays||[];if(!!window.google&&!!google.maps&&doc.reload){overlayBounds=new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south,groundOverlay.latLonBox.west),new google.maps.LatLng(groundOverlay.latLonBox.north,groundOverlay.latLonBox.east));var overlays=doc.groundoverlays;for(i=overlays.length;i--;){if(overlays[i].bounds().equals(overlayBounds)&&overlays.url_===groundOverlay.icon.href){found=overlays[i].active=true;break}}}}if(!found){overlay=createOverlay(groundOverlay,doc);overlay.active=true}}if(!!doc.reload&&!!doc.groundoverlays&&!!doc.groundoverlays.length){var overlays=doc.groundoverlays;for(i=overlays.length;i--;){if(!overlays[i].active){overlays[i].remove();overlays.splice(i,1)}}doc.groundoverlays=overlays}}}var networkLink;var docPath=document.location.pathname.split("/");docPath=docPath.splice(0,docPath.length-1).join("/");var linkNodes=responseXML.getElementsByTagName("NetworkLink");for(i=0;i<linkNodes.length;i++){node=linkNodes[i];networkLink={name:geoXML3.nodeValue(node.getElementsByTagName("name")[0]),link:{href:geoXML3.nodeValue(node.getElementsByTagName("href")[0]),refreshMode:geoXML3.nodeValue(node.getElementsByTagName("refreshMode")[0])}};if(networkLink.link.refreshMode===""){networkLink.link.refreshMode="onChange"}if(networkLink.link.refreshMode==="onInterval"){networkLink.link.refreshInterval=parseFloat(geoXML3.nodeValue(node.getElementsByTagName("refreshInterval")[0]));if(isNaN(networkLink.link.refreshInterval)){networkLink.link.refreshInterval=0}}else if(networkLink.link.refreshMode==="onChange"){networkLink.link.viewRefreshMode=geoXML3.nodeValue(node.getElementsByTagName("viewRefreshMode")[0]);if(networkLink.link.viewRefreshMode===""){networkLink.link.viewRefreshMode="never"}if(networkLink.link.viewRefreshMode==="onStop"){networkLink.link.viewRefreshTime=geoXML3.nodeValue(node.getElementsByTagName("refreshMode")[0]);networkLink.link.viewFormat=geoXML3.nodeValue(node.getElementsByTagName("refreshMode")[0]);if(networkLink.link.viewFormat===""){networkLink.link.viewFormat="BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]"}}}if(!/^[\/|http]/.test(networkLink.link.href)){networkLink.link.href=docPath+"/"+networkLink.link.href}if(networkLink.link.refreshMode==="onInterval"&&networkLink.link.refreshInterval>0){setInterval(parserName+'.parse("'+networkLink.link.href+'")',1e3*networkLink.link.refreshInterval)}else if(networkLink.link.refreshMode==="onChange"){if(networkLink.link.viewRefreshMode==="never"){doc.internals.parser.parse(networkLink.link.href,doc.internals.docSet)}else if(networkLink.link.viewRefreshMode==="onStop"){}}}}if(!!doc.bounds&&!!window.google&&!!google.maps){doc.internals.bounds=doc.internals.bounds||new google.maps.LatLngBounds;doc.internals.bounds.union(doc.bounds)}if(!!doc.markers||!!doc.groundoverlays||!!doc.gpolylines||!!doc.gpolygons){doc.internals.parseOnly=false}doc.internals.remaining-=1;if(doc.internals.remaining===0){if(parserOptions.zoom&&!!doc.internals.bounds&&!doc.internals.bounds.isEmpty()&&!!parserOptions.map){parserOptions.map.fitBounds(doc.internals.bounds)}if(parserOptions.afterParse){parserOptions.afterParse(doc.internals.docSet)}if(!doc.internals.parseOnly){for(var i=0;i<doc.internals.docSet.length;i++){docs.push(doc.internals.docSet[i])}}google.maps.event.trigger(doc.internals.parser,"parsed")}};var kmlColor=function(kmlIn,colorMode){var kmlColor={};kmlIn=kmlIn||"ffffffff";var aa=kmlIn.substr(0,2);var bb=kmlIn.substr(2,2);var gg=kmlIn.substr(4,2);var rr=kmlIn.substr(6,2);kmlColor.opacity=parseInt(aa,16)/256;kmlColor.color=colorMode==="random"?randomColor(rr,gg,bb):"#"+rr+gg+bb;return kmlColor};var randomColor=function(rr,gg,bb){var col={rr:rr,gg:gg,bb:bb};for(var k in col){var v=col[k];if(v==null)v="ff";v=Math.round(Math.random()*parseInt(rr,16)).toString(16);if(v.length===1)v="0"+v;col[k]=v}return"#"+col.rr+col.gg+col.bb};var processStyleID=function(style){if(!!window.google&&!!google.maps){var zeroPoint=new google.maps.Point(0,0);if(!!style.href){var markerRegEx=/\/(red|blue|green|yellow|lightblue|purple|pink|orange|pause|go|stop)(-dot)?\.png/;if(markerRegEx.test(style.href)){var anchorPoint=new google.maps.Point(16*style.scale,32*style.scale)}else{var anchorPoint=new google.maps.Point(16*style.scale,16*style.scale)}style.icon=new google.maps.MarkerImage(style.href,new google.maps.Size(32*style.scale,32*style.scale),zeroPoint,anchorPoint,new google.maps.Size(32*style.scale,32*style.scale));var stdRegEx=/\/(red|blue|green|yellow|lightblue|purple|pink|orange)(-dot)?\.png/;var shadowSize=new google.maps.Size(59,32);var shadowPoint=new google.maps.Point(16,32);if(stdRegEx.test(style.href)){style.shadow=new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png",shadowSize,zeroPoint,shadowPoint,shadowSize)}else if(style.href.indexOf("-pushpin.png")>-1){style.shadow=new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/micons/pushpin_shadow.png",shadowSize,zeroPoint,shadowPoint,shadowSize)}else{style.shadow=new google.maps.MarkerImage(style.href.replace(".png",".shadow.png"),shadowSize,zeroPoint,shadowPoint,shadowSize)}}}};var processStyles=function(doc){for(var styleID in doc.styles){processStyleID(doc.styles[styleID])}};var createMarker=function(placemark,doc){var markerOptions=geoXML3.combineOptions(parserOptions.markerOptions,{map:parserOptions.map,position:new google.maps.LatLng(placemark.Point.coordinates[0].lat,placemark.Point.coordinates[0].lng),title:placemark.name,zIndex:Math.round(placemark.Point.coordinates[0].lat*-1e5)<<5,icon:placemark.style.icon,shadow:placemark.style.shadow});var marker=new google.maps.Marker(markerOptions);if(!!doc){doc.markers.push(marker)}if(!parserOptions.suppressInfoWindows){var infoWindowOptions=geoXML3.combineOptions(parserOptions.infoWindowOptions,{content:'<div class="geoxml3_infowindow"><h3>'+placemark.name+"</h3><div>"+placemark.description+"</div></div>",pixelOffset:new google.maps.Size(0,2)});if(parserOptions.infoWindow){marker.infoWindow=parserOptions.infoWindow}else{marker.infoWindow=new google.maps.InfoWindow(infoWindowOptions)}marker.infoWindowOptions=infoWindowOptions;google.maps.event.addListener(marker,"click",function(){this.infoWindow.close();marker.infoWindow.setOptions(this.infoWindowOptions);this.infoWindow.open(this.map,this)})}placemark.marker=marker;return marker};var createOverlay=function(groundOverlay,doc){if(!window.ProjectedOverlay){throw"geoXML3 error: ProjectedOverlay not found while rendering GroundOverlay from KML"}var bounds=new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south,groundOverlay.latLonBox.west),new google.maps.LatLng(groundOverlay.latLonBox.north,groundOverlay.latLonBox.east));var overlayOptions=geoXML3.combineOptions(parserOptions.overlayOptions,{percentOpacity:groundOverlay.opacity*100});var overlay=new ProjectedOverlay(parserOptions.map,groundOverlay.icon.href,bounds,overlayOptions);if(!!doc){doc.ggroundoverlays=doc.ggroundoverlays||[];doc.ggroundoverlays.push(overlay)}return overlay};var createPolyline=function(placemark,doc){var paths=[];var bounds=new google.maps.LatLngBounds;for(var j=0;j<placemark.LineString.length;j++){var path=[];var coords=placemark.LineString[j].coordinates;for(var i=0;i<coords.length;i++){var pt=new google.maps.LatLng(coords[i].lat,coords[i].lng);path.push(pt);bounds.extend(pt)}paths.push(path)}var point=paths[0][Math.floor(path.length/2)];var kmlStrokeColor=kmlColor(placemark.style.color,placemark.style.colorMode);var polyOptions=geoXML3.combineOptions(parserOptions.polylineOptions,{map:parserOptions.map,strokeColor:kmlStrokeColor.color,strokeWeight:placemark.style.width,strokeOpacity:kmlStrokeColor.opacity,title:placemark.name});if(paths.length>1){polyOptions.paths=paths;var p=new MultiGeometry(polyOptions)}else{polyOptions.path=paths[0];var p=new google.maps.Polyline(polyOptions)}p.bounds=bounds;if(!parserOptions.suppressInfoWindows){var infoWindowOptions=geoXML3.combineOptions(parserOptions.infoWindowOptions,{content:'<div class="geoxml3_infowindow"><h3>'+placemark.name+"</h3><div>"+placemark.description+"</div></div>",pixelOffset:new google.maps.Size(0,2)});if(parserOptions.infoWindow){p.infoWindow=parserOptions.infoWindow}else{p.infoWindow=new google.maps.InfoWindow(infoWindowOptions)}p.infoWindowOptions=infoWindowOptions;google.maps.event.addListener(p,"click",function(e){p.infoWindow.close();p.infoWindow.setOptions(p.infoWindowOptions);if(e&&e.latLng){p.infoWindow.setPosition(e.latLng)}else{p.infoWindow.setPosition(point)}p.infoWindow.open(p.map||p.polylines[0].map)})}if(!!doc)doc.gpolylines.push(p);placemark.polyline=p;return p};var createPolygon=function(placemark,doc){var bounds=new google.maps.LatLngBounds;var pathsLength=0;var paths=[];for(var polygonPart=0;polygonPart<placemark.Polygon.length;polygonPart++){for(var j=0;j<placemark.Polygon[polygonPart].outerBoundaryIs.length;j++){var coords=placemark.Polygon[polygonPart].outerBoundaryIs[j].coordinates;var path=[];for(var i=0;i<coords.length;i++){var pt=new google.maps.LatLng(coords[i].lat,coords[i].lng);path.push(pt);bounds.extend(pt)}paths.push(path);pathsLength+=path.length}for(var j=0;j<placemark.Polygon[polygonPart].innerBoundaryIs.length;j++){var coords=placemark.Polygon[polygonPart].innerBoundaryIs[j].coordinates;var path=[];for(var i=0;i<coords.length;i++){var pt=new google.maps.LatLng(coords[i].lat,coords[i].lng);path.push(pt);bounds.extend(pt)}paths.push(path);pathsLength+=path.length}}var kmlStrokeColor=kmlColor(placemark.style.color,placemark.style.colorMode);var kmlFillColor=kmlColor(placemark.style.fillcolor,placemark.style.colorMode);if(!placemark.style.fill)kmlFillColor.opacity=0;var strokeWeight=placemark.style.width;if(!placemark.style.outline){strokeWeight=0;kmlStrokeColor.opacity=0}var polyOptions=geoXML3.combineOptions(parserOptions.polygonOptions,{map:parserOptions.map,paths:paths,title:placemark.name,strokeColor:kmlStrokeColor.color,strokeWeight:strokeWeight,strokeOpacity:kmlStrokeColor.opacity,fillColor:kmlFillColor.color,fillOpacity:kmlFillColor.opacity});var p=new google.maps.Polygon(polyOptions);p.bounds=bounds;if(!parserOptions.suppressInfoWindows){var infoWindowOptions=geoXML3.combineOptions(parserOptions.infoWindowOptions,{content:'<div class="geoxml3_infowindow"><h3>'+placemark.name+"</h3><div>"+placemark.description+"</div></div>",pixelOffset:new google.maps.Size(0,2)});if(parserOptions.infoWindow){p.infoWindow=parserOptions.infoWindow}else{p.infoWindow=new google.maps.InfoWindow(infoWindowOptions)}p.infoWindowOptions=infoWindowOptions;google.maps.event.addListener(p,"click",function(e){p.infoWindow.close();p.infoWindow.setOptions(p.infoWindowOptions);if(e&&e.latLng){p.infoWindow.setPosition(e.latLng)}else{p.infoWindow.setPosition(p.bounds.getCenter())}p.infoWindow.open(this.map)})}if(!!doc)doc.gpolygons.push(p);placemark.polygon=p;return p};return{options:parserOptions,docs:docs,parse:parse,render:render,parseKmlString:parseKmlString,hideDocument:hideDocument,showDocument:showDocument,processStyles:processStyles,createMarker:createMarker,createOverlay:createOverlay,createPolyline:createPolyline,createPolygon:createPolygon}};geoXML3.getOpacity=function(kmlColor){if(!!kmlColor&&kmlColor!==""&&kmlColor.length==8){var transparency=parseInt(kmlColor.substr(0,2),16);return transparency/255}else{return 1}};geoXML3.log=function(msg){if(!!window.console){console.log(msg)}else{alert("log:"+msg)}};geoXML3.combineOptions=function(overrides,defaults){var result={};if(!!overrides){for(var prop in overrides){if(overrides.hasOwnProperty(prop)){result[prop]=overrides[prop]}}}if(!!defaults){for(prop in defaults){if(defaults.hasOwnProperty(prop)&&result[prop]===undefined){result[prop]=defaults[prop]}}}return result};geoXML3.fetchers=[];geoXML3.xmlParse=function(str){if(typeof ActiveXObject!="undefined"||"ActiveXObject"in window){var doc=new ActiveXObject("Microsoft.XMLDOM");doc.loadXML(str);return doc}if(typeof DOMParser!="undefined"){return(new DOMParser).parseFromString(str,"text/xml")}return document.createElement("div",null)};geoXML3.isParseError=function(parsedDocument){if(typeof ActiveXObject!="undefined"||"ActiveXObject"in window)return false;var p=new DOMParser,errorneousParse=p.parseFromString("<","text/xml"),parsererrorNS=errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;if(parsererrorNS==="http://www.w3.org/1999/xhtml"){return parsedDocument.getElementsByTagName("parsererror").length>0}return parsedDocument.getElementsByTagNameNS(parsererrorNS,"parsererror").length>0};geoXML3.fetchXML=function(url,callback){function timeoutHandler(){geoXML3.log("XHR timeout");callback()}var xhrFetcher=new Object;if(!!geoXML3.fetchers.length){xhrFetcher=geoXML3.fetchers.pop()}else{if(!!window.XMLHttpRequest){xhrFetcher.fetcher=new window.XMLHttpRequest}else if(!!window.ActiveXObject){xhrFetcher.fetcher=new window.ActiveXObject("Microsoft.XMLHTTP")}}if(!xhrFetcher.fetcher){geoXML3.log("Unable to create XHR object");callback(null)}else{xhrFetcher.fetcher.open("GET",url,true);if(xhrFetcher.fetcher.overrideMimeType){xhrFetcher.fetcher.overrideMimeType("text/xml")}xhrFetcher.fetcher.onreadystatechange=function(){if(xhrFetcher.fetcher.readyState===4){if(!!xhrFetcher.xhrtimeout)clearTimeout(xhrFetcher.xhrtimeout);if(xhrFetcher.fetcher.status>=400){geoXML3.log("HTTP error "+xhrFetcher.fetcher.status+" retrieving "+url);callback()}else{var xml=geoXML3.xmlParse(xhrFetcher.fetcher.responseText);if(xml.parseError&&xml.parseError.errorCode!=0){geoXML3.log("XML parse error "+xml.parseError.errorCode+", "+xml.parseError.reason+"\nLine:"+xml.parseError.line+", Position:"+xml.parseError.linepos+", srcText:"+xml.parseError.srcText);xml="failed parse"}else if(geoXML3.isParseError(xml)){geoXML3.log("XML parse error");xml="failed parse"}callback(xml)}geoXML3.fetchers.push(xhrFetcher)}};xhrFetcher.xhrtimeout=setTimeout(timeoutHandler,geoXML3.xhrTimeout);xhrFetcher.fetcher.send(null)}};geoXML3.nodeValue=function(node,defVal){var retStr="";if(!node){return typeof defVal==="undefined"||defVal===null?"":defVal}if(node.nodeType==3||node.nodeType==4||node.nodeType==2){retStr+=node.nodeValue}else if(node.nodeType==1||node.nodeType==9||node.nodeType==11){for(var i=0;i<node.childNodes.length;++i){retStr+=arguments.callee(node.childNodes[i])}}return retStr};
var GoogleMap=function($){var public={init:function(){var map=new google.maps.Map(document.getElementById("map"),{zoom:10,center:{lat:51.5074,lng:.1278},mapTypeId:"terrain"});var boroughsLayer=new google.maps.KmlLayer({url:"https://www.stopsmokingportal.com/bundles/app/maps/LondonBoroughs.kml",map:map})}};return public}(jQuery);
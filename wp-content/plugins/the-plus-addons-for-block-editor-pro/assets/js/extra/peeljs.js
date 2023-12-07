!function(t){var o,i,c,u,n,e,s=100,r=["webkit","moz",""],p=document.documentElement,h=p.style;function a(t){for(var e,i,n=0;n<r.length;n++)if((i=(e=r[n])?e+((i=t).slice(0,1).toUpperCase()+i.slice(1)):t)in h)return i}function l(t){return Math.round(t*s)/s}function d(t){return Math.max(0,Math.min(1,t))}function f(t,e,i){return(t-e)/(i-e)}function g(t){return"peel-"+t}function y(t,e){t.style[i]=e}function w(t,e,i,n,o){return l(t)+"px "+l(e)+"px "+l(i)+"px "+(n?l(n)+"px ":"")+"rgba(0,0,0,"+l(o)+")"}function b(t,e){t.style.opacity=e}function S(t,e,i){n&&(i=0===i.length?"none":"linear-gradient("+l(e)+"deg,"+i.join(",")+")",t.style.backgroundImage=i)}function O(t,e,i){t.addEventListener(e,i)}function P(t,e,i){t.removeEventListener(e,i)}function m(t,e){t=t.changedTouches?t.changedTouches[0]:t;return{x:t.clientX-e.offsetLeft+window.scrollX,y:t.clientY-e.offsetTop+window.scrollY}}function L(t,e){return C(0,0,0,t,e)}function v(t,e){return C(255,255,255,t,e)}function C(t,e,i,n,o){return"rgba("+t+","+e+","+i+","+(n=l(d(n)))+") "+l(100*o)+"%"}function x(t,e){return"string"==typeof t&&(t=(e||document).querySelector(t)),t}function T(t,e){t.classList.add(e)}function E(t,e,i){e=e||p;var n,o=document.createElementNS("http://www.w3.org/2000/svg",t);for(n in e.appendChild(o),i)i.hasOwnProperty(n)&&k(o,n,i[n]);return o}function k(t,e,i){t.setAttributeNS(null,e,i)}function R(t,e){this.setOptions(e),this.el=x(t,p),this.constraints=[],this.events=[],this.setupLayers(),this.setupDimensions(),this.setCorner(this.getOption("corner")),this.setMode(this.getOption("mode")),this.init()}function A(t,e){this.el=t,this.shape=A.createClipPath(t,e||{type:"polygon"}),y(this.el,"translate(0px,0px)")}function D(t,e){this.center=t,this.radius=e}function B(){this.points=[]}function I(t,e,i,n){this.p1=t,this.c1=e,this.p2=n,this.c2=i}function M(t,e){this.p1=t,this.p2=e}function _(t,e){this.x=t,this.y=e}R.Corners={TOP_LEFT:0,TOP_RIGHT:1,BOTTOM_LEFT:2,BOTTOM_RIGHT:3},R.Defaults={topShadow:!0,topShadowBlur:5,topShadowAlpha:.5,topShadowOffsetX:0,topShadowOffsetY:1,topShadowCreatesShape:!0,backReflection:!1,backReflectionSize:.02,backReflectionOffset:0,backReflectionAlpha:.15,backReflectionDistribute:!0,backShadow:!0,backShadowSize:.04,backShadowOffset:0,backShadowAlpha:.1,backShadowDistribute:!0,bottomShadow:!0,bottomShadowSize:1.5,bottomShadowOffset:0,bottomShadowDarkAlpha:.7,bottomShadowLightAlpha:.1,bottomShadowDistribute:!0,setPeelOnInit:!0,clippingBoxScale:4,flipConstraintOffset:5,dragPreventsDefault:!0},R.prototype.setCorner=function(){var t=arguments;void 0===t[0]?t=[R.Corners.BOTTOM_RIGHT]:t[0].length&&(t=t[0]),this.corner=this.getPointOrCorner(t)},R.prototype.setMode=function(t){"book"===t?(this.addPeelConstraint(R.Corners.BOTTOM_LEFT),this.addPeelConstraint(R.Corners.TOP_LEFT),this.setOption("backReflection",!1),this.setOption("backShadowDistribute",!1),this.setOption("bottomShadowDistribute",!1)):"calendar"===t&&(this.addPeelConstraint(R.Corners.TOP_RIGHT),this.addPeelConstraint(R.Corners.TOP_LEFT))},R.prototype.setPeelPath=function(t,e){var i,n,o,s=arguments,r=new _(t,e);4===s.length?(i=new _(s[2],s[3]),this.path=new M(r,i)):8===s.length&&(n=new _(s[2],s[3]),o=new _(s[4],s[5]),i=new _(s[6],s[7]),this.path=new I(r,n,o,i))},R.prototype.handleDrag=function(t,e){this.dragHandler=t,this.setupDragEvents(e)},R.prototype.handlePress=function(t,e){this.pressHandler=t,this.setupDragEvents(e)},R.prototype.setupDragEvents=function(t){var i,n,o,s=this;function e(t,e){s.getOption("dragPreventsDefault")&&e.preventDefault(),o=t?"touchend":"mouseup",O(p,n=t?"touchmove":"mousemove",r),O(p,o,h),i=!1}function r(t){s.dragHandler&&a(s.dragHandler,t),i=!0}function h(t){!i&&s.pressHandler&&a(s.pressHandler,t),P(p,n,r),P(p,o,h)}function a(t,e){var i=m(e,s.el);t.call(s,e,i.x,i.y)}this.dragEventsSetup||(t=t||this.el,this.addEvent(t,"mousedown",e.bind(this,!1)),this.addEvent(t,"touchstart",e.bind(this,!0)),this.dragEventsSetup=!0)},R.prototype.removeEvents=function(){this.events.forEach(function(t,e){P(t.el,t.type,t.handler)}),this.events=[]},R.prototype.setTimeAlongPath=function(t){t=d(t);var e=this.path.getPointForTime(t);this.timeAlongPath=t,this.setPeelPosition(e.x,e.y)},R.prototype.setFadeThreshold=function(t){this.fadeThreshold=t},R.prototype.setPeelPosition=function(){var t=this.getPointOrCorner(arguments);(t=this.getConstrainedPeelPosition(t))&&(this.peelLineSegment=this.getPeelLineSegment(t),this.peelLineRotation=this.peelLineSegment.getAngle(),this.setClipping(),this.setBackTransform(t),this.setEffects())},R.prototype.addPeelConstraint=function(){var t=this.getPointOrCorner(arguments),e=this.corner.subtract(t).getLength();this.constraints.push(new D(t,e)),this.calculateFlipConstraint()},R.prototype.setOption=function(t,e){this.options[t]=e},R.prototype.getOption=function(t){return this.options[t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})]},R.prototype.getAmountClipped=function(){return f(this.getTopClipArea(),this.width*this.height,0)},R.prototype.addEvent=function(t,e,i){return O(t,e,i),this.events.push({el:t,type:e,handler:i}),i},R.prototype.getTopClipArea=function(){var e=new B;return this.elementBox.forEach(function(t){this.distributeLineByPeelLine(t,e)},this),B.getArea(e.getPoints())},R.prototype.calculateFlipConstraint=function(){var i=this.corner,t=this.constraints.concat();this.flipConstraint=t.sort(function(t,e){i.y,t.center.y,i.y,e.center.y;return t-e})[0]},R.prototype.dragStart=function(t,e,i){},R.prototype.fireHandler=function(t,e){var i=m(t,this.el);e.call(this,t,i.x,i.y)},R.prototype.setClipping=function(){var e=new B,i=new B;this.clippingBox.forEach(function(t){this.distributeLineByPeelLine(t,e,i)},this),this.topClip.setPoints(e.getPoints()),this.backClip.setPoints(i.getPoints())},R.prototype.distributeLineByPeelLine=function(t,e,i){var n=this.peelLineSegment.getIntersectPoint(t);this.distributePointByPeelLine(t.p1,e,i),this.distributePointByPeelLine(n,e,i)},R.prototype.distributePointByPeelLine=function(t,e,i){var n;t&&((n=this.peelLineSegment.getPointDeterminant(t))<=0&&e.addPoint(t),0<=n&&i&&i.addPoint(this.flipPointHorizontally(t)))},R.prototype.setOptions=function(t){var e,i=t||{},n=R.Defaults;for(e in n)!n.hasOwnProperty(e)||e in i||(i[e]=n[e]);this.options=i},R.prototype.findOrCreateLayer=function(t,e,i){var n=t+"-element",o=g(t),t=x(this.getOption(n)||"."+o,e);return t||(n=e,e=o,T(o=document.createElement("div"),e),n.appendChild(o),t=o),T(t,g("layer")),i=i,t.style.zIndex=i,t},R.prototype.getPointOrCorner=function(t){return 2===t.length?new _(t[0],t[1]):"number"==typeof t[0]?this.getCornerPoint(t[0]):t[0]},R.prototype.getCornerPoint=function(t){return new _(!!(1&t)*this.width,!!(2&t)*this.height)},R.prototype.getOptionalShape=function(){var n;return["rect","polygon","path","circle"].some(function(t){var e,i=this.getOption(t);return i&&((e={}).attributes=i,e.type=t,n=e),n},this),n},R.prototype.setupLayers=function(){var t=this.getOptionalShape(),e=this.topLayer=this.findOrCreateLayer("top",this.el,2),i=this.backLayer=this.findOrCreateLayer("back",this.el,3);this.bottomLayer=this.findOrCreateLayer("bottom",this.el,1),t?(this.topLayer=this.wrapShapeLayer(this.topLayer,"top-outer-clip"),this.backLayer=this.wrapShapeLayer(this.backLayer,"back-outer-clip"),this.topShapeClip=new A(e,t),this.backShapeClip=new A(i,t),this.bottomShapeClip=new A(this.bottomLayer,t),this.getOption("topShadowCreatesShape")&&(this.topShadowElement=this.setupDropShadow(t,e))):this.topShadowElement=this.findOrCreateLayer("top-shadow",e,1),this.topClip=new A(this.topLayer),this.backClip=new A(this.backLayer),this.backShadowElement=this.findOrCreateLayer("back-shadow",i,1),this.backReflectionElement=this.findOrCreateLayer("back-reflection",i,2),this.bottomShadowElement=this.findOrCreateLayer("bottom-shadow",this.bottomLayer,1),this.usesBoxShadow=!t},R.prototype.setupDropShadow=function(t,e){e=E("svg",e,{class:g("layer")});return E(t.type,e,t.attributes),e},R.prototype.wrapShapeLayer=function(t,e){var i=t.style.zIndex;T(t,g("shape-layer"));i=this.findOrCreateLayer(e,this.el,i);return i.appendChild(t),i},R.prototype.setupDimensions=function(){this.width=this.el.offsetWidth,this.height=this.el.offsetHeight,this.center=new _(this.width/2,this.height/2),this.elementBox=this.getScaledBox(1),this.clippingBox=this.getScaledBox(this.getOption("clippingBoxScale"))},R.prototype.getScaledBox=function(t){var e=t,i=t-1,n=new _(-this.width*i,-this.height*i),o=new _(this.width*e,-this.height*i),t=new _(this.width*e,this.height*e),e=new _(-this.width*i,this.height*e);return[new M(n,o),new M(o,t),new M(t,e),new M(e,n)]},R.prototype.getConstrainedPeelPosition=function(i){return this.constraints.forEach(function(t){var e=this.getFlipConstraintOffset(t,i);e&&(t=new D(t.center,t.radius-e)),i=t.constrainPoint(i)},this),i},R.prototype.getFlipConstraintOffset=function(t,e){var i=this.getOption("flipConstraintOffset");if(t===this.flipConstraint&&i){var n=this.corner.subtract(this.center),o=this.corner.subtract(t.center),s=o.getAngle(),s=(o.rotate(-s),e.subtract(t.center).rotate(-s));if(n.x*n.y<0&&(s.y*=-1),0<s.x&&0<s.y)return f(s.getAngle(),45,0)*i}},R.prototype.getPeelLineSegment=function(t){var e=this.corner.subtract(t).scale(.5),i=t.add(e);0===e.x&&0===e.y&&(e=t.subtract(this.center));t=e.getLength(),t=Math.max(this.width,this.height)/t*10,t=e.rotate(-90).scale(t);return new M(i.add(t),i.subtract(t))},R.prototype.setBackTransform=function(t){var e=this.flipPointHorizontally(this.corner),i=2*(this.peelLineRotation-90),e=t.subtract(e.rotate(i)),i="translate("+l(e.x)+"px, "+l(e.y)+"px) rotate("+l(i)+"deg)";y(this.backLayer,i),y(this.topShadowElement,i)},R.prototype.getPeelLineDistance=function(){var t,e;this.peelLineRotation<90?(e=R.Corners.TOP_RIGHT,i=R.Corners.BOTTOM_LEFT):this.peelLineRotation<180?(e=R.Corners.BOTTOM_RIGHT,i=R.Corners.TOP_LEFT):this.peelLineRotation<270?(e=R.Corners.BOTTOM_LEFT,i=R.Corners.TOP_RIGHT):this.peelLineRotation<360&&(e=R.Corners.TOP_LEFT,i=R.Corners.BOTTOM_RIGHT);var i=new M(t=this.getCornerPoint(e),e=this.getCornerPoint(i)).scale(2),i=this.peelLineSegment.getIntersectPoint(i);return i?t.subtract(i).getLength()/t.subtract(e).getLength():2},R.prototype.setEffects=function(){var t=this.getPeelLineDistance();this.setTopShadow(t),this.setBackShadow(t),this.setBackReflection(t),this.setBottomShadow(t),this.setFade()},R.prototype.setTopShadow=function(t){var e,i,n,o,s,r,h,a,p;this.getOption("topShadow")&&(n=this.getOption("topShadowBlur"),e=this.getOption("topShadowOffsetX"),i=this.getOption("topShadowOffsetY"),a=this.getOption("topShadowAlpha"),o=this.exponential(t,5,a),this.usesBoxShadow?(s=this.topShadowElement,r=e,h=i,t=n,a=0,p=o,s.style[c]=w(r,h,t,a,p)):(p=this.topShadowElement,e=e,i=i,n=n,o=o,p.style[u]="drop-shadow("+w(e,i,n,null,o)+")"))},R.prototype.distributeOrLinear=function(t,e,i){return e?(e=t,2*(i||1)*(.5-Math.abs(e-.5))):t*i},R.prototype.exponential=function(t,e,i){return i*d(Math.pow(1+t,e)-1)},R.prototype.setBackReflection=function(t){var e,i,n,o,s=[];this.canSetLinearEffect("backReflection",t)&&(o=this.getOption("backReflectionDistribute"),n=this.getOption("backReflectionSize"),i=this.getOption("backReflectionOffset"),e=this.getOption("backReflectionAlpha"),o=(n=(i=t-i)-(o=this.distributeOrLinear(t,o,n)))-o,s.push(v(0,0)),s.push(v(0,o)),s.push(v(e,n)),s.push(v(0,i))),S(this.backReflectionElement,180-this.peelLineRotation,s)},R.prototype.setBackShadow=function(t){var e,i,n,o,s=[];this.canSetLinearEffect("backShadow",t)&&(n=this.getOption("backShadowSize"),i=this.getOption("backShadowOffset"),e=this.getOption("backShadowAlpha"),o=this.getOption("backShadowDistribute"),o=(n=(i=t-i)-(o=this.distributeOrLinear(t,o,n)))-o,s.push(L(0,0)),s.push(L(0,o)),s.push(L(e,n)),s.push(L(e,i))),S(this.backShadowElement,180-this.peelLineRotation,s)},R.prototype.setBottomShadow=function(t){var e,i,n,o,s,r,h=[];this.canSetLinearEffect("bottomShadow",t)&&(e=this.getOption("bottomShadowSize"),r=this.getOption("bottomShadowOffset"),i=this.getOption("bottomShadowDarkAlpha"),n=this.getOption("bottomShadowLightAlpha"),s=this.getOption("bottomShadowDistribute"),r=(s=(o=t-(.025-r))-this.distributeOrLinear(t,s,.03)*e-r)-(.02*e-r),h=[L(0,0),L(0,r),L(n,s),L(n,o),L(i,t)]),S(this.bottomShadowElement,this.peelLineRotation+180,h)},R.prototype.canSetLinearEffect=function(t,e){return this.getOption(t)&&0<e},R.prototype.setFade=function(){var t,e=this.fadeThreshold,i=1;e&&(e<(t=void 0!==this.timeAlongPath?this.timeAlongPath:this.getAmountClipped())&&(i=(1-t)/(1-e)),b(this.topLayer,i),b(this.backLayer,i),b(this.bottomShadowElement,i))},R.prototype.flipPointHorizontally=function(t){return new _(t.x-2*(t.x-this.center.x),t.y)},R.prototype.init=function(){this.getOption("setPeelOnInit")&&this.setPeelPosition(this.corner),T(this.el,g("ready"))},A.getDefs=function(){return this.defs||(this.svg=E("svg",null,{class:g("svg-clip-element")}),this.defs=E("defs",this.svg)),this.defs},A.createClipPath=function(t,e){var i=A.getId(),n=E("clipPath",this.getDefs()),e=E(e.type,n,e.attributes);return k(n,"id",i),i="url(#"+i+")",t.style[o]=i,e},A.getId=function(){return A.id||(A.id=1),"svg-clip-"+A.id++},A.prototype.setPoints=function(t){t=t.map(function(t){return l(t.x)+","+l(t.y)}).join(" ");k(this.shape,"points",t)},D.prototype.containsPoint=function(t){if(this.boundingRectContainsPoint(t)){var e=this.center.x-t.x,t=this.center.y-t.y;return(e*=e)+(t*=t)<=this.radius*this.radius}return!1},D.prototype.boundingRectContainsPoint=function(t){return t.x>=this.center.x-this.radius&&t.x<=this.center.x+this.radius&&t.y>=this.center.y-this.radius&&t.y<=this.center.y+this.radius},D.prototype.constrainPoint=function(t){var e;return this.containsPoint(t)||(e=t.subtract(this.center).getAngle(),t=this.center.add(new _(this.radius,0).rotate(e))),t},B.getArea=function(t){var n=0,o=0;return t.forEach(function(t,e,i){i=i[(e+1)%i.length];n+=t.x*i.y,o+=t.y*i.x}),(n-o)/2},B.prototype.addPoint=function(t){this.points.push(t)},B.prototype.getPoints=function(){return this.points},I.prototype.getPointForTime=function(t){var e=Math.pow(1-t,3),i=3*t*Math.pow(1-t,2),n=3*Math.pow(t,2)*(1-t),t=Math.pow(t,3);return new _(e*this.p1.x+i*this.c1.x+n*this.c2.x+t*this.p2.x,e*this.p1.y+i*this.c1.y+n*this.c2.y+t*this.p2.y)},M.EPSILON=1e-6,M.prototype.getPointForTime=function(t){return this.p1.add(this.getVector().scale(t))},M.prototype.scale=function(t){return new M(this.p1.add(this.p2.subtract(this.p1).scale(t)),this.p2.add(this.p1.subtract(this.p2).scale(t)))},M.prototype.getPointDeterminant=function(t){t=(t.x-this.p1.x)*(this.p2.y-this.p1.y)-(t.y-this.p1.y)*(this.p2.x-this.p1.x);return-M.EPSILON<t&&t<M.EPSILON&&(t=0),t},M.prototype.getIntersectPoint=function(t){var e=this;function i(t,e){return t.x*e.y-t.y*e.x}var n=e.p2.subtract(e.p1),o=t.p2.subtract(t.p1),s=i(t.p1.subtract(e.p1),n),r=i(n,o);if(0==r)return null;s/=r,r=i(t.p1.subtract(e.p1),o)/r;return 0<=r&&r<=1&&0<=s&&s<=1?e.p1.add(n.scale(r)):null},M.prototype.getAngle=function(){return this.getVector().getAngle()},M.prototype.getVector=function(){return this.vector||(this.vector=this.p2.subtract(this.p1)),this.vector},_.DEGREES_IN_RADIANS=180/Math.PI,_.degToRad=function(t){return t/_.DEGREES_IN_RADIANS},_.radToDeg=function(t){for(var e=t*_.DEGREES_IN_RADIANS;e<0;)e+=360;return e},_.vector=function(t,e){t=_.degToRad(t);return new _(Math.cos(t)*e,Math.sin(t)*e)},_.prototype.add=function(t){return new _(this.x+t.x,this.y+t.y)},_.prototype.subtract=function(t){return new _(this.x-t.x,this.y-t.y)},_.prototype.scale=function(t){return new _(this.x*t,this.y*t)},_.prototype.getLength=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},_.prototype.getAngle=function(){return _.radToDeg(Math.atan2(this.y,this.x))},_.prototype.setAngle=function(t){return _.vector(t,this.getLength())},_.prototype.rotate=function(t){return this.setAngle(this.getAngle()+t)},o=a("clipPath"),i=a("transform"),c=a("boxShadow"),u=a("filter"),(e=document.createElement("div").style).cssText="background:linear-gradient(45deg,#9f9,white);",n=-1<(e.backgroundImage||"").indexOf("gradient"),R.supported=!(!o||!i),R.effectsSupported=n,t.Peel=R}(window);
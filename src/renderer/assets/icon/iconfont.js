(function(window) {
let svgSprite='<svg><symbol id="el-icon-llmt-home" viewBox="0 0 1024 1024"><path d="M1012.772284 457.405591L534.61302 73.387427a31.958876 31.958876 0 0 0-9.147334-6.402827 31.847336 31.847336 0 0 0-8.875134-2.63399 32.235169 32.235169 0 0 0-6.124488-0.292665 31.865755 31.865755 0 0 0-21.079084 9.330506L9.862625 457.151811c-12.489452 12.489452-12.489452 32.737612 0 45.227064 12.489452 12.489452 32.737612 12.489452 45.227064 0l72.853262-58.303894v483.414965c0 17.662265 14.3181 31.980365 31.980365 31.980365H415.765215c8.831132 0 16.826224-3.579525 22.613021-9.367345a32.116465 32.116465 0 0 0 5.507434-7.369851 31.833009 31.833009 0 0 0 3.85991-15.244192V575.960731h127.921462v351.528192a31.836079 31.836079 0 0 0 4.63046 16.5837c5.608741 9.231245 15.759939 15.397688 27.349905 15.397688H863.49033c17.662265 0 31.980365-14.3181 31.980365-31.980365V444.748317l72.075549 57.885361c12.489452 12.489452 32.737612 12.489452 45.227064 0s12.488429-32.738635-0.001024-45.228087zM831.508941 895.509581H639.627772V543.980365c0-17.662265-14.3181-31.980365-31.980365-31.980365H415.765215c-17.662265 0-31.980365 14.3181-31.980365 31.980365v351.529216H191.902658V392.886135l320.057433-256.141728 319.54885 256.635985v502.129189z"  ></path></symbol></svg>'; let script=function() {
let scripts=document.getElementsByTagName('script'); return scripts[scripts.length-1];
}(); let shouldInjectCss=script.getAttribute('data-injectcss'); let ready=function(fn) {
if (document.addEventListener) {
if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
setTimeout(fn, 0);
} else {
var loadFn=function() {
document.removeEventListener('DOMContentLoaded', loadFn, false); fn();
}; document.addEventListener('DOMContentLoaded', loadFn, false);
}
} else if (document.attachEvent) {
IEContentLoaded(window, fn);
} function IEContentLoaded(w, fn) {
let d=w.document, done=false, init=function() {
if (!done) {
done=true; fn();
}
}; var polling=function() {
try {
d.documentElement.doScroll('left');
} catch (e) {
setTimeout(polling, 50); return;
}init();
}; polling(); d.onreadystatechange=function() {
if (d.readyState=='complete') {
d.onreadystatechange=null; init();
}
};
}
}; let before=function(el, target) {
target.parentNode.insertBefore(el, target);
}; let prepend=function(el, target) {
if (target.firstChild) {
before(el, target.firstChild);
} else {
target.appendChild(el);
}
}; function appendSvg() {
let div, svg; div=document.createElement('div'); div.innerHTML=svgSprite; svgSprite=null; svg=div.getElementsByTagName('svg')[0]; if (svg) {
svg.setAttribute('aria-hidden', 'true'); svg.style.position='absolute'; svg.style.width=0; svg.style.height=0; svg.style.overflow='hidden'; prepend(svg, document.body);
}
} if (shouldInjectCss&&!window.__iconfont__svg__cssinject__) {
window.__iconfont__svg__cssinject__=true; try {
document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>');
} catch (e) {
console&&console.log(e);
}
}ready(appendSvg);
})(window);

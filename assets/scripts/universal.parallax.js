var universalParallax=function(){var e=function(e,a){a<1.2&&(a=0),window.addEventListener("scroll",function(){for(var t=0;e.length>t;t++){var n=e[t].parentElement,l=n.scrollHeight,r=n.getBoundingClientRect().top,s=(window.innerHeight-l)/2,i=l+2*(s-s/a);e[t].style.height=i+"px";var o=r/a;e[t].style.top=o+"px"}})};this.init=function(a){void 0===a&&(a={}),a={speed:void 0!==a.speed?a.speed:4,className:void 0!==a.className?a.className:"parallax"};for(var t=document.getElementsByClassName(a.className),n=0;t.length>n;n++){var l=document.createElement("div");t[n].parentNode.insertBefore(l,t[n]),l.appendChild(t[n]);var r=t[n].parentElement;r.className+="parallax--container","relative"!==window.getComputedStyle(r.parentElement,null).getPropertyValue("position")&&(this.style.position="relative");var s=t[n].dataset.parallaxImage;void 0!==s&&(t[n].style.backgroundImage="url("+s+")",1===t[n].classList.length&&"parallax"===t[n].classList[0]&&Object.assign(t[n].style,{"background-repeat":"no-repeat","background-position":"center","background-size":"cover"}))}e(t,a.speed)}};


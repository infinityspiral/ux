"use strict";window.onload=function(){var a=document.querySelectorAll("video");a.forEach(function(a){a.defaultMuted=!0,a.muted=!0,a.loop=!0,a.autoplay=!0,a.addEventListener("click",function(a){a.currentTarget.play()}),a.click()});// const quickNavLinks = document.querySelectorAll('.project-jump')
// quickNavLinks.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault()
//
//     const dest = e.currentTarget.getAttribute('href')
//     const destEl = document.querySelector(dest.toString())
//     getCoords(destEl, -92)
//   })
//
//   item.addEventListener('touchstart', e => {
//     e.preventDefault()
//
//     const dest = e.currentTarget.getAttribute('href')
//     const destEl = document.querySelector(dest.toString())
//     getCoords(destEl, -116)
//   })
// })
var b=document.querySelector(".progress-indicator"),c=function(){var a=Math.abs(document.querySelector("body").getBoundingClientRect().height)-window.innerHeight,c=window.scrollY,d=parseInt(100*(c/a));b.style.width="".concat(d,"%")};c();var d=document.querySelector(".sticky-header"),e=function(){var a=window.scrollY;// currPos > stickyHeaderEl.getBoundingClientRect().height ? document.querySelector('.quick-nav').classList.add('stickied') : document.querySelector('.quick-nav').classList.remove('stickied')
a>d.getBoundingClientRect().height?d.classList.add("stickied"):d.classList.remove("stickied"),a>d.getBoundingClientRect().height?document.querySelector(".main-content").classList.add("stickied"):document.querySelector(".main-content").classList.remove("stickied")};e(),window.addEventListener("scroll",function(){c(),e()});var f=document.querySelector("nav.menu"),g=document.querySelector(".menu-close");g.addEventListener("click",function(a){a.preventDefault(),f.classList.remove("active")});var h=document.querySelector(".menu-open");h.addEventListener("click",function(a){a.preventDefault(),f.classList.add("active")});var i=document.querySelectorAll(".menu .project");i.forEach(function(a){a.addEventListener("click",function(){f.classList.remove("active")})})};
//# sourceMappingURL=app.js.map
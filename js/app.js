"use strict";window.onload=function(){var a=document.querySelectorAll("video");a.forEach(function(a){a.defaultMuted=!0,a.muted=!0,a.loop=!0,a.autoplay=!0,a.addEventListener("click",function(b){console.log(a.paused),b.currentTarget.play()}),a.click()});// const projectMenuBtn = document.querySelector('.project-jump-menu')
// const quickNav = document.querySelector('.quick-nav')
// const toggleProjectMenu = (e) => {
//   e.preventDefault()
//   quickNav.classList.toggle('active')
//   projectMenuBtn.classList.toggle('active')
// }
//
// projectMenuBtn.addEventListener('click', e => {
//   toggleProjectMenu(e)
// })
//
// projectMenuBtn.addEventListener('touchstart', e => {
//   toggleProjectMenu(e)
// })
var b=document.querySelectorAll(".project-jump");b.forEach(function(a){a.addEventListener("click",function(a){a.preventDefault();var b=a.currentTarget.getAttribute("href"),d=document.querySelector(b.toString());c(d,-92),quickNav.classList.remove("active"),projectMenuBtn.classList.remove("active")}),a.addEventListener("touchstart",function(a){a.preventDefault();var b=a.currentTarget.getAttribute("href"),d=document.querySelector(b.toString());c(d,-116),quickNav.classList.remove("active"),projectMenuBtn.classList.remove("active")})});var c=function(a,b){var c=a.getBoundingClientRect().top;window.scrollBy({top:c+b,behavior:"auto"// or smooth
})}};
//# sourceMappingURL=app.js.map
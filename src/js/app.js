window.onload = () => {

    const videoEl = document.querySelectorAll('video');

    videoEl.forEach(item=>{

        item.defaultMuted = true;
        item.loop = true;
        item.autoplay = true;
        item.addEventListener('click', e =>{
            console.log(item.paused)
            e.currentTarget.play();
        });
        item.click();
    })
};

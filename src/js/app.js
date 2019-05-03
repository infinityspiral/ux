window.onload = () => {

    const videoEl = document.querySelectorAll('video');

    videoEl.forEach(item=>{

        item.defaultMuted = true;
        item.loop = true;
        item.autoplay = true;
        item.addEventListener('click', e =>{
            e.currentTarget.play();
        });
        item.click();
    })
};

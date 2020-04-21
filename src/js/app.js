window.onload = () => {
  const videoEl = document.querySelectorAll('video')

  videoEl.forEach(item => {
    item.defaultMuted = true
    item.muted = true
    item.loop = true
    item.autoplay = true
    item.addEventListener('click', e => {
      console.log(item.paused)
      e.currentTarget.play()
    })
    item.click()
  })

  const projectMenuBtn = document.querySelector('.expertise')
  const quickNav = document.querySelector('.quick-nav')
  const toggleProjectMenu = (e) => {
    e.preventDefault()
    quickNav.classList.toggle('active')
    projectMenuBtn.classList.toggle('active')
  }

  projectMenuBtn.addEventListener('click', e => {
    toggleProjectMenu(e)
  })

  projectMenuBtn.addEventListener('touchstart', e => {
    toggleProjectMenu(e)
  })

  const quickNavLinks = document.querySelectorAll('.project-jump')
  quickNavLinks.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      const dest = e.currentTarget.getAttribute('href')
      const destEl = document.querySelector(dest.toString())
      getCoords(destEl, -76)
      quickNav.classList.remove('active')
      projectMenuBtn.classList.remove('active')
    })

    item.addEventListener('touchstart', e => {
      e.preventDefault()

      const dest = e.currentTarget.getAttribute('href')
      const destEl = document.querySelector(dest.toString())
      getCoords(destEl, -116)
      quickNav.classList.remove('active')
      projectMenuBtn.classList.remove('active')
    })
  })

  const getCoords = (elem, offset) => {
    const scrollOffset = offset
    const coordsY = elem.getBoundingClientRect().top
    window.scrollBy({
      top: coordsY + scrollOffset,
      behavior: 'auto' // or smooth
    })
  }
}

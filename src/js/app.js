window.onload = () => {
  const videoEl = document.querySelectorAll('video')

  videoEl.forEach(item => {
    item.defaultMuted = true
    item.muted = true
    item.loop = true
    item.autoplay = true
    item.addEventListener('click', e => {
      e.currentTarget.play()
    })
    item.click()
  })

  const quickNavLinks = document.querySelectorAll('.project-jump')
  quickNavLinks.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      const dest = e.currentTarget.getAttribute('href')
      const destEl = document.querySelector(dest.toString())
      getCoords(destEl, -92)
    })

    item.addEventListener('touchstart', e => {
      e.preventDefault()

      const dest = e.currentTarget.getAttribute('href')
      const destEl = document.querySelector(dest.toString())
      getCoords(destEl, -116)
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

  const progressEl = document.querySelector('.progress-indicator')
  const updateProgressIndicator = () => {
    const pageHeight = Math.abs(document.querySelector('body').getBoundingClientRect().height) - window.innerHeight
    const currPos = window.scrollY
    const pos = parseInt(currPos / pageHeight * 100)
    progressEl.style.width = `${pos}%`
  }
  updateProgressIndicator()

  const stickyHeaderEl = document.querySelector('.sticky-header')
  const updateHeaderSize = () => {
    const currPos = window.scrollY
    currPos > stickyHeaderEl.getBoundingClientRect().height ? stickyHeaderEl.classList.add('stickied') : stickyHeaderEl.classList.remove('stickied')
    currPos > stickyHeaderEl.getBoundingClientRect().height ? document.querySelector('.quick-nav').classList.add('stickied') : document.querySelector('.quick-nav').classList.remove('stickied')
    currPos > stickyHeaderEl.getBoundingClientRect().height ? document.querySelector('.main-content').classList.add('stickied') : document.querySelector('.main-content').classList.remove('stickied')
  }
  updateHeaderSize()

  window.addEventListener('scroll', (e) => {
    updateProgressIndicator()
    updateHeaderSize()
  })
}

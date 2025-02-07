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

  // const quickNavLinks = document.querySelectorAll('.project-jump')
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
    // currPos > stickyHeaderEl.getBoundingClientRect().height ? document.querySelector('.quick-nav').classList.add('stickied') : document.querySelector('.quick-nav').classList.remove('stickied')
    currPos > stickyHeaderEl.getBoundingClientRect().height ? document.querySelector('.main-content').classList.add('stickied') : document.querySelector('.main-content').classList.remove('stickied')
  }
  updateHeaderSize()

  window.addEventListener('scroll', (e) => {
    updateProgressIndicator()
    updateHeaderSize()
  })
  const navMenu = document.querySelector('nav.menu')
  const menuCloseEl = document.querySelector('.menu-close')
  menuCloseEl.addEventListener('click', e => {
    e.preventDefault()
    navMenu.classList.remove('active')
  })
  const menuOpenEl = document.querySelector('.menu-open')
  menuOpenEl.addEventListener('click', e => {
    e.preventDefault()
    navMenu.classList.add('active')
  })

  const projectEl = document.querySelectorAll('.menu .project')

  projectEl.forEach(item => {
    item.addEventListener('click', e => {
      navMenu.classList.remove('active')
    })
    // item.click()
  })

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzQOF_mWVbxkbhEVYlv4bkQOoNPdmAw2_rQdaKXTFn7w4PlJSqQPUwEqVEHpZ3G0RuT/exec'
  const form = document.getElementById('#contactForm')
  form.addEventListener('submit', e => {
    e.preventDefault()
    alert('test')
  //   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  //     .then(response => alert('Thank you! your form is submitted successfully.'))
  //     .then(() => { window.location.reload() })
  //     .catch(error => console.error('Error!', error.message))
  })
}

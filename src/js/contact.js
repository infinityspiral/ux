window.onload = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzQOF_mWVbxkbhEVYlv4bkQOoNPdmAw2_rQdaKXTFn7w4PlJSqQPUwEqVEHpZ3G0RuT/exec'
  const contactForm = document.getElementById('contactForm')
  const contactFormBtn = document.getElementById('submitContact')
  const contactFormStatus = document.getElementById('formStatus')
  contactForm.addEventListener('submit', e => {
    e.preventDefault()
    contactFormBtn.innerText = 'Sending...'
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
      .then(response => {
        contactFormBtn.style.display = 'none'
        contactFormStatus.style.display = 'block'
        // alert('Thank you! your form is submitted successfully.')
      })
      .catch(error => {
        contactFormBtn.disabled = true
        contactFormBtn.innerText = 'Try again later.'
        console.error('Error!', error.message)
      })
  })

  const defaultTitle = document.title
  window.addEventListener('blur', e => {
    document.title = 'Come back!'
  })
  window.addEventListener('focus', e => {
    document.title = defaultTitle
  })

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
}

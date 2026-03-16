function validateEmail (email) {
  if (!email || typeof email !== 'string') return false

  // Must contain exactly one @
  const atCount = (email.match(/@/g) || []).length
  if (atCount !== 1) return false

  const [local, domain] = email.split('@')

  // Local part checks
  if (!local || local.length > 64) return false
  if (local.startsWith('.') || local.endsWith('.')) return false
  if (local.includes('..')) return false
  if ((local.match(/\./g) || []).length > 3) return false // New rule: max 3 dots

  // Domain checks
  if (!domain || !domain.includes('.')) return false
  if (domain.startsWith('.') || domain.endsWith('.')) return false
  if (domain.startsWith('-') || domain.endsWith('-')) return false
  if (domain.includes('..')) return false

  // Validate each domain label
  const labels = domain.split('.')
  for (const label of labels) {
    if (label.length < 1 || label.length > 63) return false
    if (!/^[a-zA-Z0-9-]+$/.test(label)) return false
  }

  // TLD must be at least 2 chars and only letters
  const tld = labels[labels.length - 1]
  if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) return false

  // Total length check
  if (email.length > 254) return false

  return true
}
function validateName (name) {
  if (!name || typeof name !== 'string') return false

  // Trim and split by whitespace
  const words = name.trim().split(/\s+/).filter(word => word.length > 0)

  // Must have at least one word
  if (words.length === 0) return false

  // Each word must:
  // - Be 2–30 characters long (reasonable name length)
  // - Start with a letter
  // - Contain only letters
  // - Not be all uppercase (reject random gibberish like "aGHyLSOQQNSJVIuPO")
  for (const word of words) {
    if (word.length < 2 || word.length > 30) return false
    if (!/^[a-zA-Z][a-zA-Z]*$/.test(word)) return false
    if (word === word.toUpperCase() && word.length > 1) return false // Reject ALL CAPS gibberish
  }

  return true
}
window.addEventListener('load', () => {
  // window bar messaging
  const defaultTitle = document.title
  window.addEventListener('blur', e => {
    document.title = 'Come back!'
  })
  window.addEventListener('focus', e => {
    document.title = defaultTitle
  })

  // video
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
    // contact
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzQOF_mWVbxkbhEVYlv4bkQOoNPdmAw2_rQdaKXTFn7w4PlJSqQPUwEqVEHpZ3G0RuT/exec'
    const contactForm = document.getElementById('contactForm')
    const contactFormBtn = document.getElementById('submitContact')
    const contactFormStatus = document.getElementById('formStatus')

  if (contactForm) {
    const fullName = contactForm.querySelector('#fullName')
    const email = contactForm.querySelector('#email')

    contactForm.addEventListener('submit', e => {
      e.preventDefault()
      contactFormBtn.innerText = 'Sending...'

      if (validateName(fullName.value) && validateEmail(email.value)) {
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
      } else {
        contactFormBtn.style.display = 'none'
        contactFormStatus.style.display = 'block'
      }
    })
  }
})

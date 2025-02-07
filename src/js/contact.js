window.onload = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzQOF_mWVbxkbhEVYlv4bkQOoNPdmAw2_rQdaKXTFn7w4PlJSqQPUwEqVEHpZ3G0RuT/exec'
  const contactForm = document.getElementById('contactForm')
  contactForm.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
      .then(response => alert('Thank you! your form is submitted successfully.'))
      .then(() => { window.location.reload() })
      .catch(error => console.error('Error!', error.message))
  })
}

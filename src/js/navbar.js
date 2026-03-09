window.addEventListener('load', () => {
  /* ================================================================
         NavBar + Section Nav — vanilla JS behaviour
         ================================================================ */
  (function () {
    const nav = document.getElementById('mainNav')
    const burger = document.getElementById('burgerBtn')
    const drawer = document.getElementById('mobileDrawer')

    // ── Sticky scroll shadow ──────────────────────────────────────
    if (nav.dataset.sticky === 'true') {
      const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 4)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }

    // ── Desktop dropdowns ─────────────────────────────────────────
    const dropdownTriggers = nav.querySelectorAll('.ds-nav__links .ds-nav__link[aria-haspopup]')

    function closeAllDropdowns (except) {
      dropdownTriggers.forEach(btn => {
        if (btn === except) return
        btn.setAttribute('aria-expanded', 'false')
        document.getElementById(btn.getAttribute('aria-controls')).hidden = true
      })
    }

    dropdownTriggers.forEach(btn => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'))
      btn.addEventListener('click', e => {
        e.stopPropagation()
        const isOpen = btn.getAttribute('aria-expanded') === 'true'
        closeAllDropdowns(btn)
        btn.setAttribute('aria-expanded', String(!isOpen))
        panel.hidden = isOpen
      })
    })

    document.addEventListener('click', () => closeAllDropdowns(null))
    nav.addEventListener('click', e => e.stopPropagation())
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllDropdowns(null) })

    // ── Mobile drawer open/close ──────────────────────────────────
    function openDrawer () {
      burger.setAttribute('aria-expanded', 'true')
      burger.setAttribute('aria-label', 'Close menu')
      drawer.hidden = false
      drawer.style.animation = 'ds-drawer-in .22s ease'
      syncDrawerPanel() // show correct panel
    }
    function closeDrawer () {
      burger.setAttribute('aria-expanded', 'false')
      burger.setAttribute('aria-label', 'Open menu')
      drawer.hidden = true
    }

    burger.addEventListener('click', () => {
      burger.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer()
    })

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeDrawer()
    })

    // ── Mobile accordion sub-menus ────────────────────────────────
    const drawerToggles = drawer.querySelectorAll('.ds-nav__drawer-toggle')
    drawerToggles.forEach(btn => {
      const sub = document.getElementById(btn.getAttribute('aria-controls'))
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true'
        drawerToggles.forEach(b => {
          if (b === btn) return
          b.setAttribute('aria-expanded', 'false')
          document.getElementById(b.getAttribute('aria-controls')).hidden = true
        })
        btn.setAttribute('aria-expanded', String(!isOpen))
        sub.hidden = isOpen
      })
    })

    // Close drawer when any drawer link is tapped
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeDrawer())
    })

    // ── Active nav link (hash-based) ──────────────────────────────
    function setActiveNavLink () {
      const hash = location.hash || '#'
      nav.querySelectorAll('.ds-nav__link, .ds-nav__drawer-link').forEach(el => {
        el.classList.toggle('is-active', el.getAttribute('href') === hash)
      })
    }
    window.addEventListener('hashchange', setActiveNavLink)
    setActiveNavLink()

    /* ==============================================================
           SECTION NAV
           Discovers all <section data-title>, builds desktop sidebar
           and mobile drawer panel, tracks active section.
           ============================================================== */

    const sectionNavEl = document.getElementById('sectionNav')
    const drawerPanelMain = document.getElementById('drawerPanelMain')
    const drawerPanelSections = document.getElementById('drawerPanelSections')
    const drawerSectionLinks = document.getElementById('drawerSectionLinks')
    const drawerBackBtn = document.getElementById('drawerBackBtn')

    // Discover sections
    const sections = Array.from(document.querySelectorAll('[data-title]'))

    // Auto-assign ids if missing
    sections.forEach((sec, i) => { if (!sec.id) sec.id = 'ds-sec-' + i })

    // Smooth-scroll helper (works around sticky header height)
    function scrollToSection (sec) {
      const offset = nav.offsetHeight + 12
      const top = sec.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    // Which drawer panel to show: section panel if any section is visible
    function syncDrawerPanel () {
      if (sections.length === 0) return
      const anyVisible = sections.some(sec => {
        const r = sec.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })
      drawerPanelMain.hidden = anyVisible
      drawerPanelSections.hidden = !anyVisible
    }

    if (sections.length > 0) {
      /* ── Build desktop sidebar ─────────────────────────────────── */
      sections.forEach((sec, i) => {
        if (i > 0) {
          const hr = document.createElement('div')
          hr.className = 'ds-section-nav__divider'
          sectionNavEl.appendChild(hr)
        }

        const a = document.createElement('a')
        a.href = '#' + sec.id
        a.className = 'ds-section-nav__link'
        a.dataset.sectionId = sec.id
        a.innerHTML =
                    '<span class="ds-section-nav__dot"></span>' +
                    `<span class="ds-section-nav__label">${sec.dataset.title}</span>`

        a.addEventListener('click', e => {
          e.preventDefault()
          scrollToSection(sec)
        })
        sectionNavEl.appendChild(a)
      })

      sectionNavEl.classList.add('is-visible')

      /* ── Build mobile drawer section panel ─────────────────────── */
      sections.forEach(sec => {
        const a = document.createElement('a')
        a.href = '#' + sec.id
        a.className = 'ds-nav__drawer-link'
        a.dataset.sectionId = sec.id
        a.textContent = sec.dataset.title
        a.addEventListener('click', e => {
          e.preventDefault()
          closeDrawer()
          // slight delay so drawer animation finishes before scroll
          setTimeout(() => scrollToSection(sec), 130)
        })
        drawerSectionLinks.appendChild(a)
      })

      /* ── Back button ───────────────────────────────────────────── */
      drawerBackBtn.addEventListener('click', () => {
        drawerPanelSections.hidden = true
        drawerPanelMain.hidden = false
      })

      /* ── IntersectionObserver — active state ───────────────────── */
      function updateActive (id) {
        sectionNavEl.querySelectorAll('.ds-section-nav__link').forEach(a => {
          a.classList.toggle('is-active', a.dataset.sectionId === id)
        })
        drawerSectionLinks.querySelectorAll('.ds-nav__drawer-link').forEach(a => {
          a.classList.toggle('is-active', a.dataset.sectionId === id)
        })
      }

      // Seed with first section
      if (sections[0]) updateActive(sections[0].id)

      const observer = new IntersectionObserver(entries => {
        // pick the entry nearest the top of the viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) updateActive(visible[0].target.id)
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      })

      sections.forEach(sec => observer.observe(sec))
    }

    /* ==============================================================
           Expose syncDrawerPanel so openDrawer() can call it
           ============================================================== */
    function syncDrawerPanel () {
      if (sections.length === 0) return
      const anyVisible = sections.some(sec => {
        const r = sec.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })
      drawerPanelMain.hidden = anyVisible
      drawerPanelSections.hidden = !anyVisible
    }
  })()
})

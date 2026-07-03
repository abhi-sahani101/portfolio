document.addEventListener("DOMContentLoaded", () => {

  /* -------------- NAVBAR SCROL ------------ */
  const navbar = document.querySelector(".custom-navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  /* ------------- TYPING ANIMATION -------------- */
  function typingEffect(elementId, texts) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let i = 0, j = 0;
    let isDeleting = false;

    function type() {
      el.textContent = texts[i].substring(0, j);

      if (!isDeleting) {
        j++;
        if (j === texts[i].length + 1) {
          isDeleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % texts.length;
        }
      }
      setTimeout(type, isDeleting ? 60 : 120);
    }
    type();
    
  }

  typingEffect("typing-text", [
    "Front-End Developer",
    "UI/UX Enthusiast",
    "JavaScript Developer",
    "React Learner"
  ]);

  typingEffect("about-typing-text", [
    "HTML, CSS & JavaScript",
    "Bootstrap & Responsive Design",
    "Modern UI Development",
    "Front-End Technologies"
  ]);

  /* -------------- COUNTER ON SCROLL ----------- */
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  function runCounters() {
    if (counterStarted) return;

    counters.forEach(counter => {
      let target = +counter.dataset.target;
      let count = 0;
      let step = target / 80;

      function update() {
        count += step;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      }
      update();
    });

    counterStarted = true;
  }

  /* ------ SKILLS BAR ------ */
  const skillBars = document.querySelectorAll(".progress-bar");
  const skillsSection = document.getElementById("skills");
  let skillsAnimated = false;

  function animateSkills() {
    skillBars.forEach(bar => {
      bar.style.width = bar.dataset.skill + "%";
    });
    skillsAnimated = true;
  }

  /* ---------- SCROLL ANIMATIONS ------------- */
  const projectCards = document.querySelectorAll(".project-card");
  const timelineItems = document.querySelectorAll(".timeline-item");

  function revealOnScroll() {
    const trigger = window.innerHeight - 100;

    if (skillsSection && !skillsAnimated &&
        skillsSection.getBoundingClientRect().top < trigger) {
      animateSkills();
    }

    projectCards.forEach(card => {
      if (card.getBoundingClientRect().top < trigger) {
        card.classList.add("show");
      }
    });

    timelineItems.forEach(item => {
      if (item.getBoundingClientRect().top < trigger) {
        item.classList.add("show");
      }
    });

    counters.length && runCounters();
  }

  window.addEventListener("scroll", revealOnScroll);

  /* --------------- CONTACT FORM --------------- */
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill all fields";
        formMessage.style.color = "red";
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = "Invalid email address";
        formMessage.style.color = "red";
        return;
      }

      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "lightgreen";
      contactForm.reset();
    });
  }

  /* --------------- FOOTER YEAR ------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------- SCROLL TO TOP ------------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display =
        window.scrollY > 300 ? "flex" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

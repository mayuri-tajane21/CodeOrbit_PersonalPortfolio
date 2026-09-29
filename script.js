
document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            menuToggle.textContent =
                navLinks.classList.contains("active") ? "✕" : "☰";
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }


    /* ================================
       ACTIVE NAVIGATION
    ================================= */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    });


    /* ================================
       TYPING EFFECT
    ================================= */

    const typingText = document.getElementById("typingText");

    const roles = [
        "Frontend Developer",
        "Web Developer",
        "Computer Science Student",
        "Creative Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }

        } else {

            typingText.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 75);
    }

    typeEffect();


    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, .glass-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* ================================
       PROJECT HOVER TILT
    ================================= */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });


    /* ================================
       BUTTON CLICK EFFECT
    ================================= */

    document.querySelectorAll(".primary-button, .outline-button, .nav-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                button.style.transform = "scale(0.96)";

                setTimeout(() => {
                    button.style.transform = "";
                }, 120);

            });

        });


    /* ================================
       FOOTER YEAR
    ================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});

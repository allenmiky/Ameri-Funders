document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Optional: unobserve so it animates only once
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    // Select all sections (jitne bhi animate karne hain)
    const sections = document.querySelectorAll(
        ".section-1, .section-2, .section-3, .section-4, .sec5-main-container, .section-6, .section-7, .section-8, .section-9, .section-10"
    );

    sections.forEach(sec => {
        sec.classList.add("scroll-up"); // initial hidden state
        observer.observe(sec);
    });
});
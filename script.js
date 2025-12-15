// Toggle expand on click
document.querySelectorAll('.step-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});


// Slider JS
 (function () {
            const track = document.getElementById('track');
            const viewport = track.parentElement;
            const prevBtn = document.querySelector('.btn.prev');
            const nextBtn = document.querySelector('.btn.next');
            const dotsContainer = document.getElementById('dots');

            let autoPlayDelay = 3000;
            let autoplayTimer = null;

            let originals = Array.from(track.querySelectorAll('.card'));
            if (originals.length === 0) return;

            const originalCount = originals.length;
            let slideW = originals[0].getBoundingClientRect().width;
            let gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 20;
            let step = slideW + gap;

            const firstClone = originals[0].cloneNode(true);
            const lastClone = originals[originals.length - 1].cloneNode(true);
            track.insertBefore(lastClone, track.firstChild);
            track.appendChild(firstClone);

            let slides = Array.from(track.children);
            let index = 1;
            let isAnimating = false;

            function buildDots() {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < originalCount; i++) {
                    const d = document.createElement('div');
                    d.className = 'dot' + (i === 0 ? ' active' : '');
                    d.addEventListener('click', () => { goTo(i); resetAutoplay(); });
                    dotsContainer.appendChild(d);
                }
            }

            function updateSlideMeasurements() {
                slideW = slides[1].getBoundingClientRect().width;
                gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 20;
                step = slideW + gap;
            }

            function setPosition(noAnim) {
                const vw = viewport.clientWidth;
                const centerOffset = (vw - slideW) / 2;
                const x = index * step - centerOffset;
                track.style.transition = noAnim ? 'none' : 'transform .6s cubic-bezier(.2,.8,.2,1)';
                track.style.transform = `translateX(-${x}px)`;
                const logical = ((index - 1) % originalCount + originalCount) % originalCount;
                dotsContainer.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === logical));
            }

            function next() { if (isAnimating) return; isAnimating = true; index++; setPosition(false); resetAutoplay(); }
            function prev() { if (isAnimating) return; isAnimating = true; index--; setPosition(false); resetAutoplay(); }
            function goTo(i) { if (isAnimating) return; isAnimating = true; index = i + 1; setPosition(false); }

            track.addEventListener('transitionend', () => {
                isAnimating = false;
                if (index === 0) { index = originalCount; setPosition(true); }
                if (index === originalCount + 1) { index = 1; setPosition(true); }
            });

            function startAutoplay() { stopAutoplay(); autoplayTimer = setInterval(next, autoPlayDelay); }
            function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }
            function resetAutoplay() { stopAutoplay(); startAutoplay(); }

            nextBtn.addEventListener('click', next);
            prevBtn.addEventListener('click', prev);

            window.addEventListener('resize', () => { updateSlideMeasurements(); setPosition(true); });

            updateSlideMeasurements();
            buildDots();
            setPosition(true);
            startAutoplay();
        })();

        
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navBar = document.getElementById("nav-bar");

  if (menuToggle && navBar) {
    menuToggle.addEventListener("click", () => {
      navBar.classList.toggle("show");
    });

    // mobile pe link click hote hi band karne ke liye
    const navLinks = navBar.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navBar.classList.remove("show");
      });
    });
  }
});

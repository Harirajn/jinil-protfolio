/* ==========================================================================
   Jinil Films - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Video Modal Lightbox
  const videoModal = document.getElementById('videoModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openVideoModal(videoUrl, title) {
    if (!videoModal || !modalIframe) return;

    modalVideoTitle.textContent = title || 'Wedding Film';
    modalIframe.src = videoUrl;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal || !modalIframe) return;

    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    // Immediate reset of src to stop audio/video
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  // Attach click listeners to all work cards
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoUrl = card.getAttribute('data-video');
      const title = card.getAttribute('data-title');
      if (videoUrl) {
        openVideoModal(videoUrl, title);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeVideoModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // 3. Category Filter
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
});

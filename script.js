/* ==========================================================================
   Jinil Krishna Films - Interactive Script & Automatic Video Sync
   ========================================================================== */

/* --------------------------------------------------------------------------
   YOUTUBE AUTO-SYNC CONFIGURATION
   Whenever you upload a new video to YouTube, it will automatically appear
   on your website! 
   
   Instructions:
   - Paste your YouTube Channel ID (starts with 'UC...') 
     OR your YouTube Playlist ID (starts with 'PL...') below.
   - Example: youtubeChannelId: 'UCxxxxxxxxxxxxxxxxxxxxxx'
   -------------------------------------------------------------------------- */
const SYNC_CONFIG = {
  youtubeChannelId: '',   // Paste your YouTube Channel ID here
  youtubePlaylistId: '',  // Or paste a specific Playlist ID here
};

/* Curated fallback films (shown when no YouTube ID is configured or offline) */
const CURATED_FILMS = [
  {
    title: "Julian & Isabella",
    category: "destination",
    location: "Lake Como, Italy",
    desc: "Villa Balbianello • Destination Highlight Film",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    duration: "4:35"
  },
  {
    title: "Liam & Sophia",
    category: "highlight",
    location: "Napa Valley, California",
    desc: "Meadowood Estate • Full Highlight Reel",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    duration: "5:20"
  },
  {
    title: "Marcus & Elena",
    category: "teaser",
    location: "Oia, Santorini",
    desc: "Aegean Sunset • 60-Second Social Teaser",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    duration: "1:15"
  },
  {
    title: "Alexander & Camille",
    category: "destination",
    location: "Paris, France",
    desc: "Chateau de Chantilly • Cinematic Feature",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    duration: "6:50"
  },
  {
    title: "Noah & Aria",
    category: "highlight",
    location: "Kumarakom, Kerala",
    desc: "Waterfront Palace • Traditional Highlight",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    duration: "4:40"
  },
  {
    title: "Ethan & Chloe",
    category: "teaser",
    location: "Aspen, Colorado",
    desc: "Mountain Elopement • Cinematic Teaser",
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1",
    thumbnail: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    duration: "1:30"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Dates (Footer Year & Booking Availability)
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = currentYear;

  const availabilityText = document.getElementById('availabilityText');
  if (availabilityText) {
    availabilityText.textContent = `Available for ${currentYear} / ${nextYear} Weddings`;
  }

  // 2. Video Modal System
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
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeVideoModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // 3. Render Film Cards Function
  const worksGrid = document.getElementById('worksGrid');

  function renderFilmCards(films) {
    if (!worksGrid) return;
    worksGrid.innerHTML = '';

    films.forEach(film => {
      const card = document.createElement('article');
      card.className = 'work-card';
      card.setAttribute('data-category', film.category || 'highlight');
      card.setAttribute('data-video', film.videoUrl);
      card.setAttribute('data-title', `${film.title} — ${film.location || 'Wedding Film'}`);

      card.innerHTML = `
        <div class="card-media">
          <img src="${film.thumbnail}" alt="${film.title} Wedding Film" loading="lazy">
          <div class="media-overlay"></div>
          <button class="play-btn" aria-label="Play Film">
            <i class="fas fa-play"></i>
          </button>
          <span class="film-length"><i class="far fa-clock"></i> ${film.duration || 'Film'}</span>
        </div>
        <div class="card-meta">
          <span class="card-loc">${film.location || 'Cinematic Film'}</span>
          <h3 class="card-title">${film.title}</h3>
          <p class="card-desc">${film.desc || 'Wedding Film by Jinil Krishna'}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        openVideoModal(film.videoUrl, `${film.title} — ${film.location || ''}`);
      });

      worksGrid.appendChild(card);
    });

    setupFiltering();
  }

  // 4. Category Filter Logic
  function setupFiltering() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.work-card');

    filterPills.forEach(pill => {
      // Avoid duplicate event bindings
      const newPill = pill.cloneNode(true);
      pill.parentNode.replaceChild(newPill, pill);

      newPill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        newPill.classList.add('active');

        const filterValue = newPill.getAttribute('data-filter');

        cards.forEach(card => {
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
  }

  // 5. Automatic YouTube Feed Sync
  async function loadVideos() {
    const hasChannel = Boolean(SYNC_CONFIG.youtubeChannelId.trim());
    const hasPlaylist = Boolean(SYNC_CONFIG.youtubePlaylistId.trim());

    if (!hasChannel && !hasPlaylist) {
      // Use curated collection if no YouTube ID is provided yet
      renderFilmCards(CURATED_FILMS);
      return;
    }

    try {
      let rssUrl = '';
      if (hasPlaylist) {
        rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(SYNC_CONFIG.youtubePlaylistId.trim())}`;
      } else {
        rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(SYNC_CONFIG.youtubeChannelId.trim())}`;
      }

      // Convert YouTube RSS to JSON via public free CORS converter
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'ok' && data.items && data.items.length > 0) {
        const youtubeFilms = data.items.map(item => {
          // Robust Video ID extraction (supports watch?v=, youtu.be/, shorts/, and embed/)
          let videoId = '';
          const vMatch = item.link.match(/[?&]v=([^&#]+)/);
          if (vMatch) {
            videoId = vMatch[1];
          } else {
            const shortMatch = item.link.match(/youtu\.be\/([^?&#]+)/) || item.link.match(/shorts\/([^?&#]+)/);
            if (shortMatch) videoId = shortMatch[1];
          }
          
          // Smart Categorization: checks title & description for keywords or hashtags
          const textToScan = `${item.title} ${item.description || ''}`.toLowerCase();
          let category = 'highlight'; // Default category

          if (textToScan.includes('#teaser') || textToScan.includes('teaser') || textToScan.includes('trailer') || textToScan.includes('short')) {
            category = 'teaser';
          } else if (textToScan.includes('#destination') || textToScan.includes('destination') || textToScan.includes('elopement')) {
            category = 'destination';
          } else if (textToScan.includes('#highlight') || textToScan.includes('highlight')) {
            category = 'highlight';
          }

          return {
            title: item.title,
            category: category,
            location: "Wedding Film",
            desc: item.author || "Jinil Krishna Films",
            videoUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`,
            thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            duration: "HD"
          };
        });

        renderFilmCards(youtubeFilms);
      } else {
        // Fallback if API fails or playlist is empty
        renderFilmCards(CURATED_FILMS);
      }
    } catch (err) {
      console.warn("Could not sync YouTube feed, showing curated films:", err);
      renderFilmCards(CURATED_FILMS);
    }
  }

  // Initialize
  loadVideos();
});

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const filterButtons = document.querySelectorAll(".filter-button");
const galleryGrid = document.querySelector("#gallery-grid");
const worldScene = document.querySelector("[data-world-scene]");
const mascotLayer = document.querySelector("[data-mascot-layer]");
const heroScene = document.querySelector("[data-hero-scene]");

const galleryData = [
  {
    src: "images/gallery/campus-1.jpg",
    category: "campus",
    tag: "Campus",
    title: "Graduation Ceremony",
    text: "Graduation ceremony at Renmin University of China, June 2024."
  },
  {
    src: "images/gallery/campus-2.jpg",
    category: "campus",
    tag: "Campus",
    title: "Anniversary Performance",
    text: "Performance for the 20th anniversary celebration of Peking University HSBC Business School, October 2024."
  },
  {
    src: "images/gallery/campus-3.jpg",
    category: "campus",
    tag: "Campus",
    title: "Field Labor Practice",
    text: "Field labor practice at Renmin University of China, May 2023."
  },
  {
    src: "images/gallery/campus-4.jpg",
    category: "campus",
    tag: "Campus",
    title: "Floorball Club Founding",
    text: "Founding of the floorball club at Renmin University of China, September 2022."
  },
  {
    src: "images/gallery/campus-5.jpg",
    category: "campus",
    tag: "Campus",
    title: "Conference Participation",
    text: "Attending the IBDS X IPUR Conference on Health, Risk, and Decision-Making 2026, May 2026."
  },
  {
    src: "images/gallery/travel-1.jpg",
    category: "travel",
    tag: "Travel",
    title: "Guilin",
    text: "Travel notes from Guilin, Guangxi, May 2025."
  },
  {
    src: "images/gallery/travel-2.jpg",
    category: "travel",
    tag: "Travel",
    title: "Shenzhen",
    text: "A moment from Shenzhen, Guangdong, February 2026."
  },
  {
    src: "images/gallery/travel-3.jpg",
    category: "travel",
    tag: "Travel",
    title: "Hong Kong",
    text: "Urban impressions from Hong Kong, March 2026."
  },
  {
    src: "images/gallery/travel-4.jpg",
    category: "travel",
    tag: "Travel",
    title: "Xi'an",
    text: "Travel notes from Xi'an, Shaanxi, February 2026."
  },
  {
    src: "images/gallery/travel-5.jpg",
    category: "travel",
    tag: "Travel",
    title: "Kyoto",
    text: "A winter trip to Kyoto, Japan, January 2024."
  },
  {
    src: "images/gallery/research-1.jpg",
    category: "research",
    tag: "Research",
    title: "Fieldwork in Chengdu",
    text: "Conducting fieldwork in Chengdu, Sichuan, January 2021."
  },
  {
    src: "images/gallery/research-2.jpg",
    category: "research",
    tag: "Research",
    title: "Project Completion",
    text: "Completion of an Undergraduate Innovation Training Program project, March 2023."
  },
  {
    src: "images/gallery/research-3.jpg",
    category: "research",
    tag: "Research",
    title: "Obstacle-Avoidance Vehicle Experiment",
    text: "Participating in an autonomous obstacle-avoidance vehicle experiment, January 2026."
  },
  {
    src: "images/gallery/research-4.jpg",
    category: "research",
    tag: "Research",
    title: "Experimental Collaboration",
    text: "Working on an autonomous obstacle-avoidance vehicle experiment, January 2026."
  },
  {
    src: "images/gallery/research-5.jpg",
    category: "research",
    tag: "Research",
    title: "Presentation at Tsinghua",
    text: "Giving a presentation at the School of Journalism and Communication, Tsinghua University, May 2026."
  }
];

const renderGallery = () => {
  if (!galleryGrid) {
    return;
  }

  galleryGrid.innerHTML = galleryData
    .map(
      (item) => `
        <figure class="gallery-item reveal" data-category="${item.category}">
          <img src="${item.src}" alt="${item.title}" data-placeholder="${item.title}" />
          <figcaption>
            <span class="gallery-tag">${item.tag}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </figcaption>
        </figure>
      `
    )
    .join("");
};

const handleImageFallbacks = (images) => {
  images.forEach((image) => {
    image.addEventListener("error", () => {
      const label = image.dataset.placeholder || "Gallery Image";
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="galleryGradient" x1="0" x2="1">
              <stop offset="0%" stop-color="#f5eef8" />
              <stop offset="100%" stop-color="#e1d6e5" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" rx="30" fill="url(#galleryGradient)" />
          <rect x="92" y="92" width="616" height="416" rx="28" fill="#fffdfd" />
          <circle cx="218" cy="194" r="44" fill="#cdbad5" />
          <path d="M150 432 L304 278 L416 368 L528 246 L650 432 Z" fill="#8ea1c6" />
          <text x="400" y="545" text-anchor="middle" font-family="Arial" font-size="34" fill="#6b6075">${label}</text>
        </svg>
      `;

      image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    });
  });
};

const setupNavigation = () => {
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navToggle) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
};

const setupGalleryFilters = (items) => {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      items.forEach((item) => {
        const matches = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hidden", !matches);
      });
    });
  });
};

const revealOnScroll = (items) => {
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  items.forEach((item) => observer.observe(item));
};

const enableOptionalForestArt = () => {
  if (!worldScene) {
    return;
  }

  const imageLayer = worldScene.querySelector(".hero-scene__image");
  const backgroundSrc = worldScene.dataset.backgroundSrc;

  if (!imageLayer || !backgroundSrc) {
    return;
  }

  const forestImage = new Image();

  forestImage.addEventListener("load", () => {
    imageLayer.style.backgroundImage = `url("${backgroundSrc}")`;
    worldScene.classList.add("has-forest-art");
  });

  forestImage.src = backgroundSrc;
};

const initMascot = () => {
  if (!worldScene) {
    return;
  }

  const mascot = document.querySelector("[data-mascot]");

  if (!mascot) {
    return;
  }

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");

  let bounds = null;
  let reduceMotion = reduceMotionQuery.matches;
  let coarsePointer = coarsePointerQuery.matches;
  let mascotWidth = 52;
  let mascotHeight = 48;
  let initialized = false;
  let facing = 1;

  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const home = { x: 0, y: 0 };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const setStaticMode = () => {
    worldScene.classList.toggle("page-world--static-mascot", coarsePointer || reduceMotion);
    if (mascotLayer) {
      mascotLayer.classList.toggle("page-mascot-layer--static", coarsePointer || reduceMotion);
    }
  };

  const getAvoidanceRects = () =>
    [...document.querySelectorAll(".hero-panel, .info-panel, .content-card, .about-photo-card, .gallery-item, .contact-panel, .research-note")]
      .map((item) => item.getBoundingClientRect())
      .filter((rect) => rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth);

  const keepClearOfContent = (x, y) => {
    if (!bounds) {
      return { x, y };
    }

    const gap = Math.max(18, window.innerWidth * 0.018);
    let safeX = x;
    let safeY = y;

    getAvoidanceRects().forEach((rect) => {
      const avoid = {
        left: rect.left - gap,
        right: rect.right + gap,
        top: rect.top - gap,
        bottom: rect.bottom + gap
      };

      const overlaps =
        safeX < avoid.right &&
        safeX + mascotWidth > avoid.left &&
        safeY < avoid.bottom &&
        safeY + mascotHeight > avoid.top;

      if (!overlaps) {
        return;
      }

      const leftOption = avoid.left - mascotWidth;
      const rightOption = avoid.right;
      const leftDistance = Math.abs(safeX - leftOption);
      const rightDistance = Math.abs(safeX - rightOption);
      const canMoveLeft = leftOption >= bounds.left;
      const canMoveRight = rightOption <= bounds.right;

      if (canMoveRight && (!canMoveLeft || rightDistance <= leftDistance)) {
        safeX = rightOption;
      } else if (canMoveLeft) {
        safeX = leftOption;
      } else {
        safeY = safeY < rect.top ? avoid.top - mascotHeight : avoid.bottom;
      }
    });

    return {
      x: clamp(safeX, bounds.left, bounds.right),
      y: clamp(safeY, bounds.top, bounds.bottom)
    };
  };

  const measureBounds = () => {
    const mascotRect = mascot.getBoundingClientRect();

    mascotWidth = mascotRect.width || mascotWidth;
    mascotHeight = mascotRect.height || mascotHeight;

    const sideInset = Math.max(16, window.innerWidth * 0.02);
    const topInset = Math.max(62, window.innerHeight * 0.1);
    const bottomInset = Math.max(24, window.innerHeight * 0.04);

    bounds = {
      left: sideInset,
      right: Math.max(sideInset, window.innerWidth - mascotWidth - sideInset),
      top: topInset,
      bottom: Math.max(topInset, window.innerHeight - mascotHeight - bottomInset)
    };

    home.x = clamp(window.innerWidth * (coarsePointer ? 0.68 : 0.74), bounds.left, bounds.right);
    home.y = clamp(window.innerHeight * (coarsePointer ? 0.74 : 0.68), bounds.top, bounds.bottom);

    if (!initialized) {
      current.x = home.x;
      current.y = home.y;
      target.x = home.x;
      target.y = home.y;
      initialized = true;
    } else if (coarsePointer || reduceMotion) {
      target.x = home.x;
      target.y = home.y;
    } else {
      current.x = clamp(current.x, bounds.left, bounds.right);
      current.y = clamp(current.y, bounds.top, bounds.bottom);
      target.x = clamp(target.x, bounds.left, bounds.right);
      target.y = clamp(target.y, bounds.top, bounds.bottom);
    }
  };

  const moveTowardPointer = (event) => {
    if (coarsePointer || reduceMotion || event.pointerType === "touch") {
      return;
    }

    if (event.clientX < 0 || event.clientX > window.innerWidth || event.clientY < 0 || event.clientY > window.innerHeight) {
      target.x = home.x;
      target.y = home.y;
      return;
    }

    measureBounds();

    const verticalAnchor = event.clientY < window.innerHeight * 0.34 ? 0.42 : 0.76;
    const localX = event.clientX - mascotWidth * 0.5;
    const localY = event.clientY - mascotHeight * verticalAnchor;
    const safeTarget = keepClearOfContent(localX, localY);

    target.x = clamp(safeTarget.x, bounds.left, bounds.right);
    target.y = clamp(safeTarget.y, bounds.top, bounds.bottom);
  };

  const animate = (time) => {
    const followEnabled = !reduceMotion && !coarsePointer;
    const ease = followEnabled ? 0.085 : 0.12;
    const deltaX = target.x - current.x;
    const deltaY = target.y - current.y;

    current.x += deltaX * ease;
    current.y += deltaY * ease;

    const speed = Math.hypot(deltaX, deltaY);
    const isMoving = followEnabled && speed > 1.05;

    if (isMoving && Math.abs(deltaX) > 0.2) {
      facing = deltaX < 0 ? -1 : 1;
    }

    const bobAmplitude = reduceMotion ? 0 : isMoving ? 2.2 : 3.4;
    const bobOffset = Math.sin(time * 0.0048) * bobAmplitude;
    const tilt = reduceMotion ? 0 : isMoving ? clamp(deltaX * 0.075, -4.5, 4.5) : Math.sin(time * 0.0022) * 1;

    mascot.style.setProperty("--mascot-x", `${current.x.toFixed(2)}px`);
    mascot.style.setProperty("--mascot-y", `${(current.y + bobOffset).toFixed(2)}px`);
    mascot.style.setProperty("--mascot-scale-x", String(facing));
    mascot.style.setProperty("--mascot-tilt", `${tilt.toFixed(2)}deg`);
    mascot.dataset.moving = String(isMoving);

    window.requestAnimationFrame(animate);
  };

  setStaticMode();
  measureBounds();

  window.addEventListener("pointermove", moveTowardPointer, { passive: true });
  document.addEventListener("pointerleave", () => {
    target.x = home.x;
    target.y = home.y;
  });

  const syncPointerPreferences = () => {
    reduceMotion = reduceMotionQuery.matches;
    coarsePointer = coarsePointerQuery.matches;
    setStaticMode();
    measureBounds();
  };

  const watchMediaQuery = (query) => {
    if (query.addEventListener) {
      query.addEventListener("change", syncPointerPreferences);
    } else if (query.addListener) {
      query.addListener(syncPointerPreferences);
    }
  };

  watchMediaQuery(reduceMotionQuery);
  watchMediaQuery(coarsePointerQuery);

  window.addEventListener(
    "resize",
    () => {
      measureBounds();
    },
    { passive: true }
  );

  window.requestAnimationFrame(animate);
};

renderGallery();
setupNavigation();

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryImages = document.querySelectorAll(".gallery-item img");
const revealItems = document.querySelectorAll(".reveal");

handleImageFallbacks(galleryImages);
setupGalleryFilters(galleryItems);
revealOnScroll(revealItems);
enableOptionalForestArt();
initMascot();

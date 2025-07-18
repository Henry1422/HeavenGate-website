document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.getElementById('menuTrigger');
    const mobileMenu = document.getElementById('mobileMenu');

    menuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        menuTrigger.classList.toggle('active');
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuTrigger.classList.remove('active');
        }
    });

    document.querySelectorAll('.mobile-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuTrigger.classList.remove('active');
        });
    });
});






const track = document.querySelector(".carousel-track");
const cards = Array.from(track.children);
const nextButton = document.querySelector(".carousel-button.next");
const prevButton = document.querySelector(".carousel-button.prev");
const container = document.querySelector(".carousel-container");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
let cardWidth = cards[0].offsetWidth;
let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) * 2;

// Debounce function
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// Initialize carousel
function initializeCarousel() {
	cardWidth = cards[0].offsetWidth;
	cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) * 2;

	// Center the initial card
	const initialOffset = container.offsetWidth / 2 - cardWidth / 2;
	track.style.transform = `translateX(${initialOffset}px)`;
	updateCarousel();
}

// Update carousel state
function updateCarousel() {
	// Update card classes
	cards.forEach((card, index) => {
		card.classList.remove(
			"is-active",
			"is-prev",
			"is-next",
			"is-far-prev",
			"is-far-next"
		);

		if (index === currentIndex) {
			card.classList.add("is-active");
		} else if (index === currentIndex - 1) {
			card.classList.add("is-prev");
		} else if (index === currentIndex + 1) {
			card.classList.add("is-next");
		} else if (index < currentIndex - 1) {
			card.classList.add("is-far-prev");
		} else if (index > currentIndex + 1) {
			card.classList.add("is-far-next");
		}
	});

	// Update indicators
	indicators.forEach((indicator, index) => {
		indicator.classList.toggle("active", index === currentIndex);
	});
}

// Move to a specific slide
function moveToSlide(targetIndex) {
	if (targetIndex < 0 || targetIndex >= cards.length) {
		return; // Prevent moving out of bounds
	}

	const amountToMove = targetIndex * (cardWidth + cardMargin);
	const containerCenter = container.offsetWidth / 2;
	const cardCenter = cardWidth / 2;
	const targetTranslateX = containerCenter - cardCenter - amountToMove;

	track.style.transform = `translateX(${targetTranslateX - 25}px)`;
	currentIndex = targetIndex;
	updateCarousel();
}

// Event Listeners
nextButton.addEventListener("click", () => {
	const nextIndex = currentIndex + 1;
	if (nextIndex < cards.length) {
		moveToSlide(nextIndex);
	}
});

prevButton.addEventListener("click", () => {
	const prevIndex = currentIndex - 1;
	if (prevIndex >= 0) {
		moveToSlide(prevIndex);
	}
});

// Indicator clicks
indicators.forEach((indicator, index) => {
	indicator.addEventListener("click", () => {
		moveToSlide(index);
	});
});

// Window resize handler
window.addEventListener(
	"resize",
	debounce(() => {
		initializeCarousel();
		moveToSlide(currentIndex);
	}, 250)
);

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
	initializeCarousel();
});

// Autoplay every 4 seconds (4000 ms)
setInterval(() => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= cards.length) {
    nextIndex = 0; // loop back to first
  }
  moveToSlide(nextIndex);
}, 4000);


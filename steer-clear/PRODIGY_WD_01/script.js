let items = document.querySelectorAll('.slider .list .item');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// auto run slider
let refreshInterval = setInterval(() => {
    nextSlide();
}, 5000);

// Function to go to the next slide
function nextSlide() {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}

// Function to go to the previous slide
function prevSlide() {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}

// Function to update the slider display
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Function to ensure the active thumbnail is in view
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    if (!thumbnailActive) return; // In case no thumbnail is active
    
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Event listener for mouse wheel to scroll through items
window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        // Scroll down (next slide)
        nextSlide();
    } else {
        // Scroll up (previous slide)
        prevSlide();
    }
});

// Click on thumbnail to go to a specific slide
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

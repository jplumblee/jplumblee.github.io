// Get references to the video element and video container
const video = document.getElementById('main-video');
const videoContainer = document.querySelector('.video-container');
const overlayContainer = document.querySelector('.overlay-container');

// Define an array of video sources and corresponding button labels
const videoSources = [
    { src: 'intro.mp4', label: 'Introduction' },
    { src: 'option1.mp4', label: 'Option 1' },
    { src: 'option2.mp4', label: 'Option 2' },
    { src: 'option3.mp4', label: 'Option 3' }
];

// Variable to keep track of the initial video load
let isInitialVideoLoaded = false;

// Function to create and add overlay buttons
function createOverlayButtons() {
    // Clear existing buttons
    overlayContainer.innerHTML = '';

    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            loadVideoUnmuted(source.src, index === 0);
        });
        overlayContainer.appendChild(button);
    });
}

// Function to load and play the video unmuted
function loadVideoUnmuted(videoSrc, shouldMute) {
    video.src = videoSrc;
    video.load();
    video.muted = shouldMute;
    video.addEventListener('loadeddata', () => {
        video.play();
    });
}

// Function to handle video container click
function handleVideoContainerClick() {
    if (video.muted) {
        video.muted = false;
    } else if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Function to handle initial video load
function loadInitialVideo() {
    isInitialVideoLoaded = true;
    loadVideoUnmuted(videoSources[0].src, true);
    createOverlayButtons();
}

// Add event listener for the initial video load
video.addEventListener('loadeddata', loadInitialVideo);

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);
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

// Function to create and add overlay buttons
function createOverlayButtons() {
    // Clear existing buttons
    overlayContainer.innerHTML = '';

    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            loadVideo(source.src, index !== 0);
        });
        overlayContainer.appendChild(button);
    });
}

// Function to load the video
function loadVideo(videoSrc, shouldPlay) {
    return new Promise((resolve) => {
        video.src = videoSrc;
        video.muted = false;
        video.load();

        video.addEventListener('loadedmetadata', () => {
            resolve();
            if (shouldPlay) {
                video.play();
            }
        });
    });
}

// Function to handle video container click
function handleVideoContainerClick() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Function to load the initial video
async function loadInitialVideo() {
    await loadVideo(videoSources[0].src, false);
    video.muted = true;
    video.play();
    createOverlayButtons();
}

// Load the initial video
loadInitialVideo();

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);
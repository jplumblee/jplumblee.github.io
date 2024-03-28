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

// Function to load and play the video
function loadVideo(videoSrc, shouldPlay) {
    video.src = videoSrc;
    video.muted = false;
    video.load();

    if (shouldPlay) {
        video.play();
    }
}

// Function to handle video container click
function handleVideoContainerClick() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Function to initialize the video player
function initializeVideoPlayer() {
    loadVideo(videoSources[0].src, false);
    createOverlayButtons();
    video.muted = true;
    video.play();
}

// Add event listener for the canplay event
video.addEventListener('canplay', initializeVideoPlayer);

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);
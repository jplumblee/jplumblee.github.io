// Get references to the video element and video container
const video = document.getElementById('main-video');
const videoContainer = document.querySelector('.video-container');
const overlayContainer = document.querySelector('.overlay-container');
const captionContainer = document.createElement('div');
captionContainer.classList.add('caption-container');
videoContainer.appendChild(captionContainer);

// Define an array of video sources and corresponding button labels
const videoSources = [
    { src: 'intro.mp4', label: 'Introduction', srt: 'introcaptions.srt' },
    { src: 'option1.mp4', label: 'Option 1', srt: 'option1captions.srt' },
    { src: 'option2.mp4', label: 'Option 2', srt: 'option2captions.srt' },
    { src: 'option3.mp4', label: 'Option 3', srt: 'option3captions.srt' }
];

// Variable to store the parsed captions
let captions = [];

// Variable to track if the initial video has been unmuted
let isInitialVideoUnmuted = false;

// Function to create and add overlay buttons
function createOverlayButtons() {
    // Clear existing buttons
    overlayContainer.innerHTML = '';

    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            loadVideo(source.src, source.srt, index !== 0);
        });
        overlayContainer.appendChild(button);
    });
}

// Function to load the video and captions
function loadVideo(videoSrc, srtSrc, shouldPlay) {
    return new Promise((resolve) => {
        video.src = videoSrc;
        video.muted = false;
        video.controls = false; // Remove the default video controls
        video.load();

        video.addEventListener('loadedmetadata', () => {
            resolve();
            if (shouldPlay) {
                video.play();
            }
        });

        // Load the captions
        fetch(srtSrc)
            .then(response => response.text())
            .then(data => {
                captions = parseSRT(data);
            });
    });
}

// Function to parse the SRT file
function parseSRT(srtText) {
    // ... (same as before)
}

// Function to parse the timestamp
function parseTimestamp(timestamp) {
    // ... (same as before)
}

// Function to display the captions
function displayCaptions() {
    // ... (same as before)
}

// Function to handle video container click
function handleVideoContainerClick() {
    if (video.muted) {
        video.muted = false;
        isInitialVideoUnmuted = true;
    } else {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
}

// Function to load the initial video
async function loadInitialVideo() {
    await loadVideo(videoSources[0].src, videoSources[0].srt, false);
    video.muted = true;
    video.play();
    createOverlayButtons();
}

// Load the initial video
loadInitialVideo();

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);

// Update captions every 100ms
setInterval(displayCaptions, 100);
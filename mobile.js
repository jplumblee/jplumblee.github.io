// Get references to the video element, video container, and loading screen
const video = document.getElementById('main-video');
const videoContainer = document.querySelector('.video-container');
const overlayContainer = document.querySelector('.overlay-container');
const captionContainer = document.createElement('div');
captionContainer.classList.add('caption-container');
overlayContainer.appendChild(captionContainer);
const loadingScreen = document.querySelector('.loading-screen');
const wipe = document.getElementById('wipe');

// Define an array of video sources and corresponding button labels
const videoSources = [
    { src: 'intro.mp4', label: 'Introduction', srt: 'introcaptions.srt' },
    { src: 'option1.mp4', label: 'Simplicity', srt: 'option1captions.srt' },
    { src: 'option2.mp4', label: 'Next Steps', srt: 'option2captions.srt' },
    { src: 'option3.mp4', label: 'Big Picture', srt: 'option3captions.srt' }
];

// Variable to store the parsed captions
let captions = [];

// Variable to track if the initial video has been unmuted
let isInitialVideoUnmuted = false;

// Function to create and add overlay buttons
function createOverlayButtons() {
    // Clear existing buttons
    overlayContainer.innerHTML = '';
    overlayContainer.appendChild(captionContainer);

    videoSources.forEach((source, index) => {
        if (index !== 0) {
            const button = document.createElement('button');
            button.textContent = source.label;
            button.classList.add('overlay-button');
            button.setAttribute('data-video', source.src);
            button.addEventListener('click', () => {
                loadVideo(source.src, source.srt, true);
            });
            overlayContainer.appendChild(button);
        }
    });
}

// Function to preload videos
function preloadVideos() {
    videoSources.forEach((source, index) => {
        if (index !== 0) {
            const preloadVideo = document.createElement('video');
            preloadVideo.setAttribute('src', source.src);
            preloadVideo.setAttribute('preload', 'auto');
            preloadVideo.style.display = 'none';
            document.body.appendChild(preloadVideo);
        }
    });
}

// Function to load the video and captions
function loadVideo(videoSrc, srtSrc, shouldPlay) {
    return new Promise((resolve) => {
        // Animate the wipe transition
        wipe.style.height = '100%';
        setTimeout(() => {
            video.src = videoSrc;
            video.muted = false;
            video.controls = false; // Remove the default video controls
            video.load();

            video.addEventListener('loadedmetadata', () => {
                resolve();
                if (shouldPlay) {
                    video.play();
                }
                // Load the captions
                fetch(srtSrc)
                    .then(response => response.text())
                    .then(data => {
                        captions = parseSRT(data);
                        displayCaptions(); // Display captions immediately after loading
                    });
            });

            // Reset the wipe transition
            setTimeout(() => {
                wipe.style.height = '0';
            }, 500); // Adjust the delay to match the transition duration in CSS
        }, 500); // Adjust the delay to match the transition duration in CSS
    });
}

// Function to parse the SRT file
function parseSRT(srtText) {
    const subtitles = [];
    const lines = srtText.trim().split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (!isNaN(parseInt(lines[i]))) {
            const subtitle = {};
            subtitle.index = parseInt(lines[i]);
            const [start, end] = lines[++i].split(' --> ');
            subtitle.start = parseTimestamp(start);
            subtitle.end = parseTimestamp(end);
            subtitle.text = lines[++i];
            subtitles.push(subtitle);
            i++;
        }
    }

    return subtitles;
}

// Function to parse the timestamp
function parseTimestamp(timestamp) {
    const [hours, minutes, seconds] = timestamp.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds.replace(',', '.'));
}

// Function to display the captions
function displayCaptions() {
    const currentTime = video.currentTime;
    const currentCaption = captions.find(caption => currentTime >= caption.start && currentTime <= caption.end);

    if (currentCaption) {
        captionContainer.textContent = currentCaption.text;
        captionContainer.style.display = 'block'; // Show the caption container
    } else {
        captionContainer.textContent = '';
        captionContainer.style.display = 'none'; // Hide the caption container
    }
}

// Function to handle video container click and touch events
function handleVideoContainerInteraction(event) {
    event.preventDefault(); // Prevent default touch behavior

    if (video.muted) {
        video.muted = false;
        video.currentTime = 0; // Restart the video from the beginning
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
    loadingScreen.style.display = 'flex'; // Show the loading screen
    await loadVideo(videoSources[0].src, videoSources[0].srt, false);
    video.muted = true;
    video.play();
    createOverlayButtons(); // Create buttons for the intro video
    loadingScreen.style.display = 'none'; // Hide the loading screen
}

// Load the initial video
loadInitialVideo();

// Add click and touch event listeners to the video container
videoContainer.addEventListener('click', handleVideoContainerInteraction);
videoContainer.addEventListener('touchstart', handleVideoContainerInteraction);

// Update captions every 100ms
setInterval(displayCaptions, 100);

// Show/hide buttons based on the currently playing video
video.addEventListener('loadedmetadata', () => {
    const currentVideoSrc = video.getAttribute('src');
    const buttons = overlayContainer.querySelectorAll('.overlay-button');
    buttons.forEach(button => {
        const buttonVideoSrc = button.getAttribute('data-video');
        if (buttonVideoSrc === currentVideoSrc) {
            button.classList.add('hidden');
        } else {
            button.classList.remove('hidden');
        }
    });
});

// Preload videos
preloadVideos();
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

    videoSources.forEach(source => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            video.src = source.src;
            video.load(); // Load the new video source
            playVideoUnmuted(); // Play the new video unmuted
            createOverlayButtons(); // Re-create buttons for the new video
        });
        overlayContainer.appendChild(button);
    });
}

// Function to play the video unmuted
function playVideoUnmuted() {
    video.muted = false;
    video.play();
}

// Function to handle video container click
function handleVideoContainerClick(event) {
    // Check if the click target is not the overlay buttons
    if (!event.target.classList.contains('overlay-button')) {
        if (video.muted) {
            playVideoUnmuted();
        } else {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    }
}

// Initialize the video and create overlay buttons
video.addEventListener('loadedmetadata', () => {
    video.muted = true; // Set the video to muted initially
    video.play(); // Autoplay the video on mute
    createOverlayButtons();
});

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);
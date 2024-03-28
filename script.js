// Get references to the video element and overlay container
const video = document.getElementById('main-video');
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
            video.play();
            createOverlayButtons(); // Re-create buttons for the new video
        });
        overlayContainer.appendChild(button);
    });
}

// Initialize the video and create overlay buttons
video.addEventListener('loadedmetadata', () => {
    createOverlayButtons();
});

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('main-video', {
        height: '540',
        width: '960',
        videoId: 'N2TGRTRZqLg', // Default video to load
        playerVars: {
            'autoplay': 1,  // Autoplay on load
            'controls': 0,
            'mute': 1,  // Start muted
            'cc_load_policy': 1, // Closed captions load by default
            'playsinline': 1, // Play inline on mobile devices
            'enablejsapi': 1  // Enable API controls
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    createOverlayButtons(); // Create overlay buttons when the player is ready
    
    // Hide the loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'none';

    // Setup click to unmute and restart video for the first video only
    player.addEventListener('click', function() {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.unMute();
            player.seekTo(0);
        }
    });
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Actions for when the video ends
    }
}

// Function to load a new video based on the button clicked
function loadVideo(videoId) {
    player.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
        suggestedQuality: 'high'
    });
    // Additional reset to maintain object-fit style
    document.querySelector('.video-wrapper iframe').style.objectFit = 'cover'; // Reinforce object-fit
}

// Function to create and add overlay buttons
function createOverlayButtons() {
    const overlayContainer = document.querySelector('.overlay-container');
    overlayContainer.innerHTML = ''; // Clear existing buttons

    const videoSources = [
        { id: '-50w4vyIkig', label: 'The Difference Matters' },
        { id: 'RRN9j5OkJ20', label: "You've Got Support" },
        { id: 'oUhr0ri-57c', label: 'Sandra Dee Freebies' }
    ];

    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            loadVideo(source.id);
        });
        overlayContainer.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('main-video');
    const videoContainer = document.querySelector('.video-container');
    const overlayContainer = document.querySelector('.overlay-container');
    const captionContainer = document.createElement('div');
    captionContainer.classList.add('caption-container');
    videoContainer.appendChild(captionContainer);
    const loadingScreen = document.querySelector('.loading-screen');
    const wipe = document.getElementById('wipe');

    // Define an array of video sources and corresponding button labels
    const videoSources = [
        { src: 'intro.mp4', label: 'Introduction', srt: 'introcaptions.srt' },
        { src: 'option1.mp4', label: 'Simplicity', srt: 'option1captions.srt' },
        { src: 'option2.mp4', label: 'Next Steps', srt: 'option2captions.srt' },
        { src: 'option3.mp4', label: 'Big Picture', srt: 'option3captions.srt' }
    ];

    // Function to hide the loading screen
    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';  // Hide the loading screen
    }

    // Function to create and add overlay buttons
    function createOverlayButtons() {
        overlayContainer.innerHTML = '';  // Clear existing buttons

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
                            parseSRT(data);
                            displayCaptions(); // Display captions immediately after loading
                        });
                });

                // Reset the wipe transition
                setTimeout(() => {
                    wipe.style.height = '0';
                }, 300); // Adjust the delay to match the transition duration in CSS
            }, 300); // Adjust the delay to match the transition duration in CSS
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

    // Load the initial video
    async function loadInitialVideo() {
        loadingScreen.style.display = 'flex'; // Show the loading screen
        await loadVideo(videoSources[0].src, videoSources[0].srt, false);
        video.muted = true;
        video.play();
        createOverlayButtons(); // Create buttons for the intro video
        hideLoadingScreen();   // Hide the loading screen once the video is ready
    }

    // Event listener to hide loading screen when video can play through
    video.addEventListener('canplaythrough', hideLoadingScreen);

    // Start the initial video load process
    loadInitialVideo();
});

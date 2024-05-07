document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('main-video');
    const loadingScreen = document.querySelector('.loading-screen');
    const overlayContainer = document.querySelector('.overlay-container');
    const captionContainer = document.createElement('div');
    captionContainer.classList.add('caption-container');
    video.parentNode.insertBefore(captionContainer, video.nextSibling);

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
            const button = document.createElement('button');
            button.textContent = source.label;
            button.classList.add('overlay-button');
            button.addEventListener('click', () => {
                loadVideo(index);
            });
            overlayContainer.appendChild(button);
        });
    }

    // Function to load the video and captions
    function loadVideo(index) {
        const source = videoSources[index];
        video.src = source.src;
        video.load();  // Start loading the video

        // Attach event listeners to handle video loading states
        video.addEventListener('loadeddata', hideLoadingScreen, { once: true });
        video.addEventListener('canplay', hideLoadingScreen, { once: true });

        // Optionally, load captions if needed
        if (source.srt) {
            fetch(source.srt)
                .then(response => response.text())
                .then(data => {
                    parseSRT(data);
                    displayCaptions(); // Display captions immediately after loading
                });
        }
    }

    // Function to parse SRT data
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

    // Function to parse the timestamp into seconds
    function parseTimestamp(timestamp) {
        const [hours, minutes, seconds] = timestamp.split(':');
        return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds.replace(',', '.'));
    }

    // Function to display captions
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

    // Load the initial video and setup overlay buttons
    createOverlayButtons();
    loadVideo(0);  // Load the initial video
});

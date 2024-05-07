document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('main-video');
    const previewImage = document.getElementById('preview-image');
    const buttonContainer = document.getElementById('button-container');
    const videoSources = [
        { src: 'intro.mp4', label: 'Introduction', preview: 'intro_preview.jpg' },
        { src: 'option1.mp4', label: 'Simplicity', preview: 'simplicity_preview.jpg' },
        { src: 'option2.mp4', label: 'Next Steps', preview: 'nextsteps_preview.jpg' },
        { src: 'option3.mp4', label: 'Big Picture', preview: 'bigpicture_preview.jpg' }
    ];

    function showPreviewImage(sourceIndex) {
        const source = videoSources[sourceIndex];
        previewImage.src = source.preview;  // Set the preview image source
        previewImage.style.display = 'block'; // Show the preview image
        video.style.display = 'none'; // Hide the video until it's ready
    }

    function loadVideo(index) {
        const source = videoSources[index];
        video.src = source.src;
        video.load();

        // Listen for when the video can play, and switch from image to video
        video.addEventListener('canplay', function() {
            video.style.display = 'block';
            previewImage.style.display = 'none'; // Hide the preview image
        }, { once: true });
    }

    // Create buttons for each video source
    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            showPreviewImage(index);
            loadVideo(index);
        });
        buttonContainer.appendChild(button);
    });

    // Initialize with the first video
    showPreviewImage(0);
    loadVideo(0);
});

document.addEventListener('DOMContentLoaded', function() {
    const previewImage = document.getElementById('preview-image');
    const buttonContainer = document.getElementById('button-container');
    const videoSources = [
        { src: 'intro.mp4', label: 'Introduction', preview: 'intro_preview.jpg' },
        { src: 'option1.mp4', label: 'Simplicity', preview: 'simplicity_preview.jpg' },
        { src: 'option2.mp4', label: 'Next Steps', preview: 'nextsteps_preview.jpg' },
        { src: 'option3.mp4', label: 'Big Picture', preview: 'bigpicture_preview.jpg' }
    ];

    function updatePreviewImage(sourceIndex) {
        const source = videoSources[sourceIndex];
        previewImage.src = source.preview;  // Set the preview image source
    }

    videoSources.forEach((source, index) => {
        const button = document.createElement('button');
        button.textContent = source.label;
        button.classList.add('overlay-button');
        button.addEventListener('click', () => {
            updatePreviewImage(index);
        });
        buttonContainer.appendChild(button);
    });

    updatePreviewImage(0);  // Initialize with the first video's preview image
});

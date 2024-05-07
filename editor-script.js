document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate-files');
    generateButton.addEventListener('click', generateFiles);

    // Updates the preview when input fields change
    document.getElementById('button-text').addEventListener('input', function () {
        updatePreview();
    });
});

function updatePreview() {
    const buttonText = document.getElementById('button-text').value;
    const previewButton = document.getElementById('preview-button');
    previewButton.textContent = buttonText;
}

function generateFiles() {
    // Code to generate HTML, CSS, and JavaScript files based on the current configuration
    alert('Generating files...');
    console.log('Generating files...');
    // Implementation needed here
}

function setupEditor() {
    // Initialization code for setting up the editor
    console.log('Editor is being set up...');
    updatePreview(); // Initial preview setup
}

setupEditor();

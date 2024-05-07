document.getElementById('generate-files').addEventListener('click', generateFiles);
document.getElementById('video-source').addEventListener('change', updatePreview);
let buttonCount = 0;

function addButtonConfig() {
    buttonCount++;
    const container = document.createElement('div');
    container.innerHTML = `
        <label>Button ${buttonCount} Text:</label>
        <input type="text" id="button-text-${buttonCount}" value="Button ${buttonCount}">
        <label>X Position (%):</label>
        <input type="range" id="button-x-${buttonCount}" min="0" max="100" value="50">
        <label>Y Position (%):</label>
        <input type="range" id="button-y-${buttonCount}" min="0" max="100" value="50">
    `;
    document.getElementById('buttons-container').appendChild(container);
    updateButtonConfigEvents(buttonCount);
}

function updateButtonConfigEvents(index) {
    document.getElementById(`button-text-${index}`).addEventListener('input', () => updateButton(index));
    document.getElementById(`button-x-${index}`).addEventListener('input', () => updateButton(index));
    document.getElementById(`button-y-${index}`).addEventListener('input', () => updateButton(index));
    updatePreview();
}

function updatePreview() {
    const videoSource = document.getElementById('video-source').value;
    const videoElement = document.getElementById('preview-video');
    videoElement.src = videoSource;
    videoElement.load();
}

function updateButton(index) {
    let button = document.getElementById(`preview-button-${index}`);
    if (!button) {
        button = document.createElement('div');
        button.id = `preview-button-${index}`;
        button.className = 'overlay-button';
        document.querySelector('.preview-container').appendChild(button);
    }
    const buttonText = document.getElementById(`button-text-${index}`).value;
    const buttonX = document.getElementById(`button-x-${index}`).value;
    const buttonY = document.getElementById(`button-y-${index}`).value;
    button.textContent = buttonText;
    button.style.left = `${buttonX}%`;
    button.style.top = `${buttonY}%`;
}

function generateFiles() {
    alert('Files are being generated...');
    // Logic to generate and download the HTML, CSS, and JS files based on the current configuration
}

window.onload = function() {
    addButtonConfig(); // Add initial button config
};

// Get references to the GUI elements
const frameShapeSelect = document.getElementById('frame-shape');
const frameBorderCheckbox = document.getElementById('frame-border');
const frameBorderColorInput = document.getElementById('frame-border-color');
const frameBorderWeightInput = document.getElementById('frame-border-weight');
const frameRadiusInput = document.getElementById('frame-radius');

const buttonSpacingInput = document.getElementById('button-spacing');
const buttonStackingHorizontalRadio = document.getElementById('button-stacking-horizontal');
const buttonStackingVerticalRadio = document.getElementById('button-stacking-vertical');
const buttonFontStyleSelect = document.getElementById('button-font-style');
const buttonFontColorInput = document.getElementById('button-font-color');
const buttonFontSizeInput = document.getElementById('button-font-size');
const buttonWidthInput = document.getElementById('button-width');
const buttonHeightInput = document.getElementById('button-height');
const buttonColorInput = document.getElementById('button-color');
const buttonLocationSelect = document.getElementById('button-location');
const buttonOpacityInput = document.getElementById('button-opacity');
const buttonBorderCheckbox = document.getElementById('button-border');
const buttonBorderColorInput = document.getElementById('button-border-color');
const buttonBorderWeightInput = document.getElementById('button-border-weight');
const buttonRadiusInput = document.getElementById('button-radius');

const captionVisibilityCheckbox = document.getElementById('caption-visibility');
const captionLocationSelect = document.getElementById('caption-location');
const captionFontStyleSelect = document.getElementById('caption-font-style');
const captionFontColorInput = document.getElementById('caption-font-color');
const captionFontSizeInput = document.getElementById('caption-font-size');
const captionOpacityInput = document.getElementById('caption-opacity');
const captionTextWrapSelect = document.getElementById('caption-text-wrap');

const loadingLogoUploadInput = document.getElementById('loading-logo-upload');
const loadingStyleSelect = document.getElementById('loading-style');
const smallLogoHyperlinkCheckbox = document.getElementById('small-logo-hyperlink');

const previewContainer = document.getElementById('preview-container');
const generateButton = document.getElementById('generate-button');

// Function to generate the customized video player
function generateVideoPlayer() {
  // Get the values from the GUI elements
  const frameShape = frameShapeSelect.value;
  const frameBorder = frameBorderCheckbox.checked;
  const frameBorderColor = frameBorderColorInput.value;
  const frameBorderWeight = frameBorderWeightInput.value;
  const frameRadius = frameRadiusInput.value;

  const buttonSpacing = buttonSpacingInput.value;
  const buttonStacking = buttonStackingHorizontalRadio.checked ? 'horizontal' : 'vertical';
  const buttonFontStyle = buttonFontStyleSelect.value;
  const buttonFontColor = buttonFontColorInput.value;
  const buttonFontSize = buttonFontSizeInput.value;
  const buttonWidth = buttonWidthInput.value;
  const buttonHeight = buttonHeightInput.value;
  const buttonColor = buttonColorInput.value;
  const buttonLocation = buttonLocationSelect.value;
  const buttonOpacity = buttonOpacityInput.value;
  const buttonBorder = buttonBorderCheckbox.checked;
  const buttonBorderColor = buttonBorderColorInput.value;
  const buttonBorderWeight = buttonBorderWeightInput.value;
  const buttonRadius = buttonRadiusInput.value;

  const captionVisibility = captionVisibilityCheckbox.checked;
  const captionLocation = captionLocationSelect.value;
  const captionFontStyle = captionFontStyleSelect.value;
  const captionFontColor = captionFontColorInput.value;
  const captionFontSize = captionFontSizeInput.value;
  const captionOpacity = captionOpacityInput.value;
  const captionTextWrap = captionTextWrapSelect.value;

  const loadingLogo = loadingLogoUploadInput.files[0];
  const loadingStyle = loadingStyleSelect.value;
  const smallLogoHyperlink = smallLogoHyperlinkCheckbox.checked;

  // Generate the customized interactive-video.html file
  let interactiveVideoHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Video</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css?family=${buttonFontStyle}" rel="stylesheet">
</head>
<body>
  <div class="video-container">
    <div class="video-wrapper">
      <video id="main-video" playsinline>
        <source src="intro.mp4" type="video/mp4">
      </video>
      <div id="wipe"></div>
      <div class="overlay-container">
        <!-- Overlay buttons will be added here dynamically -->
      </div>
      <a href="https://www.humanry.com/" target="_blank"><div class="logo"></div></a>
      <div class="loading-screen">
        <div class="loading-logo"></div>
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

  // Generate the customized styles.css file
  let stylesCSS = `body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container {
  position: relative;
  width: ${frameShape === 'square' ? '600px' : (frameShape === 'portrait' ? '450px' : '800px')};
  height: ${frameShape === 'square' ? '600px' : (frameShape === 'portrait' ? '600px' : '450px')};
  overflow: hidden;
  ${frameBorder ? `border: ${frameBorderWeight}px solid ${frameBorderColor};` : ''}
  ${frameRadius ? `border-radius: ${frameRadius}px;` : ''}
}

.video-container video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 100%;
}

#wipe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: black;
  z-index: 1;
  transition: height 0.5s ease;
}

.overlay-container {
  position: absolute;
  ${buttonLocation === 'top-left' ? 'top: 20px; left: 20px;' :
    buttonLocation === 'top-center' ? 'top: 20px; left: 50%; transform: translateX(-50%);' :
    buttonLocation === 'top-right' ? 'top: 20px; right: 20px;' :
buttonLocation === 'bottom-left' ? 'bottom: 20px; left: 20px;' :
buttonLocation === 'bottom-center' ? 'bottom: 20px; left: 50%; transform: translateX(-50%);' :
'bottom: 20px; right: 20px;'}
display: flex;
${buttonStacking === 'horizontal' ? 'flex-direction: row;' : 'flex-direction: column;'}
align-items: center;
}

.overlay-button {
background-color: ${buttonColor};
color: ${buttonFontColor};
padding: ${buttonHeight / 2}px ${buttonWidth / 2}px;
${buttonBorder ? border: ${buttonBorderWeight}px solid ${buttonBorderColor}; : ''}
border-radius: ${buttonRadius}px;
cursor: pointer;
margin: ${buttonSpacing}px;
font-size: ${buttonFontSize}px;
opacity: ${buttonOpacity};
}

.overlay-button.hidden {
display: none;
}

.clickable {
cursor: pointer;
}

.caption-container {
position: absolute;
${captionLocation === 'top' ? 'top: 20px;' :
captionLocation === 'bottom' ? 'bottom: 20px;' :
'top: 50%; transform: translateY(-50%);'}
left: 50%;
transform: translateX(-50%);
background-color: rgba(0, 0, 0, 0.7);
color: ${captionFontColor};
padding: 5px 10px;
font-size: ${captionFontSize}px;
font-family: '${captionFontStyle}', sans-serif;
text-align: center;
max-width: 80%;
white-space: ${captionTextWrap};
opacity: ${captionOpacity};
${captionVisibility ? 'display: block;' : 'display: none;'}
}

.logo {
position: absolute;
bottom: 20px;
right: 20px;
width: 40px;
height: 40px;
background-image: url('icon1.png');
background-size: cover;
cursor: ${smallLogoHyperlink ? 'pointer' : 'default'};
}

.loading-screen {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.8);
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
}

.loading-logo {
width: 200px;
height: 200px;
background-image: url('${loadingLogo ? URL.createObjectURL(loadingLogo) : 'icon1.png'}');
background-size: cover;
${loadingStyle === 'spinner' ? 'animation: spin 1s linear infinite;' : ''}
}

@keyframes spin {
0% {
transform: rotate(0deg);
}
100% {
transform: rotate(360deg);
}
}

.progress-bar {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 220px;
height: 220px;
border-radius: 50%;
border: 4px solid #4dc0bb;
border-top-color: transparent;
${loadingStyle === 'progress-bar' ? 'animation: progress 1s linear infinite;' : 'display: none;'}
}

@keyframes progress {
0% {
transform: translate(-50%, -50%) rotate(0deg);
}
100% {
transform: translate(-50%, -50%) rotate(360deg);
}
}`;

// Generate the customized script.js file
let scriptJS = `// Get references to the video element, video container, and loading screen
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

// Variable to store the parsed captions
let captions = [];

// Variable to track if the initial video has been unmuted
let isInitialVideoUnmuted = false;

// Function to create and add overlay buttons
function createOverlayButtons() {
// Clear existing buttons
overlayContainer.innerHTML = '';

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

// Function to handle video container click
function handleVideoContainerClick() {
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

// Add click event listener to the video container
videoContainer.addEventListener('click', handleVideoContainerClick);

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
preloadVideos();`;

// Create a ZIP file containing the customized files
const zip = new JSZip();
zip.file('interactive-video.html', interactiveVideoHTML);
zip.file('styles.css', stylesCSS);
zip.file('script.js', scriptJS);
zip.generateAsync({ type: 'blob' })
.then(content => {
// Create a download link for the ZIP file
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(content);
downloadLink.download = 'interactive-video.zip';
downloadLink.click();
});
}

// Add event listener to the generate button
generateButton.addEventListener('click', generateVideoPlayer);
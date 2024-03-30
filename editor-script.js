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

const previewVideo = document.getElementById('preview-video');
const previewOverlayContainer = document.getElementById('preview-overlay-container');
const previewWipe = document.getElementById('preview-wipe');

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

  // Update the preview container with the customized styles
  previewVideo.style.width = frameShape === 'square' ? '600px' : (frameShape === 'portrait' ? '450px' : '800px');
  previewVideo.style.height = frameShape === 'square' ? '600px' : (frameShape === 'portrait' ? '600px' : '450px');
  previewVideo.parentElement.style.border = frameBorder ? `${frameBorderWeight}px solid ${frameBorderColor}` : 'none';
  previewVideo.parentElement.style.borderRadius = frameRadius ? `${frameRadius}px` : '0';

  previewOverlayContainer.style.top = buttonLocation.startsWith('top') ? '20px' : 'auto';
  previewOverlayContainer.style.bottom = buttonLocation.startsWith('bottom') ? '20px' : 'auto';
  previewOverlayContainer.style.left = buttonLocation.endsWith('left') ? '20px' : 'auto';
  previewOverlayContainer.style.right = buttonLocation.endsWith('right') ? '20px' : 'auto';
  previewOverlayContainer.style.transform = buttonLocation === 'top-center' || buttonLocation === 'bottom-center' ? 'translateX(-50%)' : 'none';
  previewOverlayContainer.style.flexDirection = buttonStacking === 'horizontal' ? 'row' : 'column';

  // Clear existing preview buttons
  previewOverlayContainer.innerHTML = '';

  // Create preview buttons
  videoSources.forEach((source, index) => {
    if (index !== 0) {
      const previewButton = document.createElement('button');
      previewButton.textContent = source.label;
      previewButton.classList.add('overlay-button');
      previewButton.style.backgroundColor = buttonColor;
      previewButton.style.color = buttonFontColor;
      previewButton.style.padding = `${buttonHeight / 2}px ${buttonWidth / 2}px`;
      previewButton.style.border = buttonBorder ? `${buttonBorderWeight}px solid ${buttonBorderColor}` : 'none';
      previewButton.style.borderRadius = `${buttonRadius}px`;
      previewButton.style.margin = `${buttonSpacing}px`;
      previewButton.style.fontSize = `${buttonFontSize}px`;
      previewButton.style.opacity = buttonOpacity;
      previewOverlayContainer.appendChild(previewButton);
    }
  });

  // Generate the customized index.html file
  let indexHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Video</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css?family=${buttonFontStyle}" rel="stylesheet">
  <script>
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = "mobile.html";
    }
  </script>
</head>
<body>
  <div class="video-container clickable">
    <video id="main-video" width="${frameShape === 'square' ? '600' : (frameShape === 'portrait' ? '450' : '800')}" height="${frameShape === 'square' ? '600' : (frameShape === 'portrait' ? '600' : '450')}">
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

</div> <script src="script.js"></script> </body> </html>`;
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
${frameBorder ? border: ${frameBorderWeight}px solid ${frameBorderColor}; : ''}
${frameRadius ? border-radius: ${frameRadius}px; : ''}
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

// Generate the customized script.js file (remains the same as before)

// Create a ZIP file containing the customized files
const zip = new JSZip();
zip.file('index.html', indexHTML);
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

// Set default values based on the current video's attributes
frameShapeSelect.value = 'square';
frameBorderCheckbox.checked = false;
frameBorderColorInput.value = '#000000';
frameBorderWeightInput.value = '0';
frameRadiusInput.value = '0';

buttonSpacingInput.value = '10';
buttonStackingHorizontalRadio.checked = true;
buttonFontStyleSelect.value = 'inherit';
buttonFontColorInput.value = '#4dc0bb';
buttonFontSizeInput.value = '16';
buttonWidthInput.value = '100';
buttonHeightInput.value = '40';
buttonColorInput.value = 'rgba(0, 0, 0, 0.5)';
buttonLocationSelect.value = 'bottom-center';
buttonOpacityInput.value = '1';
buttonBorderCheckbox.checked = true;
buttonBorderColorInput.value = '#4dc0bb';
buttonBorderWeightInput.value = '2';
buttonRadiusInput.value = '5';

captionVisibilityCheckbox.checked = true;
captionLocationSelect.value = 'bottom';
captionFontStyleSelect.value = 'inherit';
captionFontColorInput.value = '#ffffff';
captionFontSizeInput.value = '20';
captionOpacityInput.value = '0.8';
captionTextWrapSelect.value = 'wrap';

loadingLogoUploadInput.value = '';
loadingStyleSelect.value = 'logo';
smallLogoHyperlinkCheckbox.checked = true;

// Add event listener to the generate button
generateButton.addEventListener('click', generateVideoPlayer);
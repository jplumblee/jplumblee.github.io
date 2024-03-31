// ... (previous code remains the same) ...

// Function to generate the customized video player
function generateVideoPlayer() {
  // ... (previous code remains the same) ...

  const button1Text = document.getElementById('button1-text').value;
  const button2Text = document.getElementById('button2-text').value;
  const button3Text = document.getElementById('button3-text').value;

  // Update the preview container with the customized styles
  // ... (previous code remains the same) ...

  // Create preview buttons
  const buttonTexts = [button1Text, button2Text, button3Text];
  videoSources.forEach((source, index) => {
    if (index !== 0) {
      const previewButton = document.createElement('button');
      previewButton.textContent = buttonTexts[index - 1];
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
  <link href="https://fonts.googleapis.com/css?family=${buttonFontStyle.replace(/"/g, "'")}" rel="stylesheet">
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
<button class="overlay-button" data-video="option1.mp4">${button1Text}</button>
<button class="overlay-button" data-video="option2.mp4">${button2Text}</button>
<button class="overlay-button" data-video="option3.mp4">${button3Text}</button>
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
font-family: ${captionFontStyle.replace(/"/g, "'")};
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

document.getElementById('button1-text').value = 'Option 1';
document.getElementById('button2-text').value = 'Option 2';
document.getElementById('button3-text').value = 'Option 3';

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
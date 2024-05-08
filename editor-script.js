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
const button1Text = document.getElementById('button1-text');
const button2Text = document.getElementById('button2-text');
const button3Text = document.getElementById('button3-text');
const captionVisibilityCheckbox = document.getElementById('caption-visibility');
const captionLocationSelect = document.getElementById('caption-location');
const captionFontStyleSelect = document.getElementById('caption-font-style');
const captionFontColorInput = document.getElementById('caption-font-color');
const captionFontSizeInput = document.getElementById('caption-font-size');
const captionOpacityInput = document.getElementById('caption-opacity');
const captionTextWrapSelect = document.getElementById('caption-text-wrap');
const loadingLogoUploadInput = document.getElementById('loading-logo-upload');
const loadingStyleSelect = document.getElementById('loading-style');
const loadingColorInput = document.getElementById('loading-color'); // New input for loading screen color
const loadingSpinnerStyleSelect = document.getElementById('loading-spinner-style'); // New input for spinner style
const smallLogoHyperlinkCheckbox = document.getElementById('small-logo-hyperlink');
const generateButton = document.getElementById('generate-button');
// Set default values based on the current video's attributes
frameShapeSelect.value = 'square';
frameBorderCheckbox.checked = false;
frameBorderColorInput.value = '#000000';
frameBorderWeightInput.value = '0';
frameRadiusInput.value = '0';
buttonSpacingInput.value = '10';
buttonStackingHorizontalRadio.checked = true;
buttonFontStyleSelect.value = 'Archivo, sans-serif';
buttonFontColorInput.value = '#4dc0bb';
buttonFontSizeInput.value = '16';
buttonWidthInput.value = '120';
buttonHeightInput.value = '40';
buttonColorInput.value = 'rgba(0, 0, 0, 0.5)';
buttonLocationSelect.value = 'bottom-center';
buttonOpacityInput.value = '100';
buttonBorderCheckbox.checked = true;
buttonBorderColorInput.value = '#4dc0bb';
buttonBorderWeightInput.value = '2';
buttonRadiusInput.value = '5';
button1Text.value = 'Simplicity';
button2Text.value = 'Next Steps';
button3Text.value = 'Big Picture';
captionVisibilityCheckbox.checked = true;
captionLocationSelect.value = 'bottom';
captionFontStyleSelect.value = 'Archivo, sans-serif';
captionFontColorInput.value = '#ffffff';
captionFontSizeInput.value = '20';
captionOpacityInput.value = '80';
captionTextWrapSelect.value = 'pre-wrap';
loadingLogoUploadInput.value = '';
loadingStyleSelect.value = 'logo';
loadingColorInput.value = '#000000'; // Default loading screen color
loadingSpinnerStyleSelect.value = 'solid'; // Default spinner style
smallLogoHyperlinkCheckbox.checked = true;
// Function to update the preview
function updatePreview() {
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
const previewContainer = document.getElementById('preview-container');
const previewVideo = document.getElementById('preview-video');
const previewOverlayContainer = document.getElementById('preview-overlay-container');
const previewCaptionContainer = document.getElementById('preview-caption-container');
const previewLoadingScreen = document.getElementById('preview-loading-screen');
const previewLoadingLogo = document.getElementById('preview-loading-logo');
const previewLoadingSpinner = document.getElementById('preview-loading-spinner');
previewContainer.className = frameShape;
previewContainer.style.borderRadius = frameRadius + 'px';
previewContainer.style.border = frameBorder ? ${frameBorderWeight}px solid ${frameBorderColor} : 'none';
previewOverlayContainer.style.flexDirection = buttonStacking === 'horizontal' ? 'row' : 'column';
previewOverlayContainer.className = overlay-container ${buttonLocation};
previewCaptionContainer.style.display = captionVisibility ? 'block' : 'none';
previewCaptionContainer.style.textAlign = captionLocation === 'center' ? 'center' : (captionLocation === 'right' ? 'right' : 'left');
previewCaptionContainer.style.fontSize = captionFontSize + 'px';
previewCaptionContainer.style.color = captionFontColor;
previewCaptionContainer.style.fontFamily = captionFontStyle;
previewCaptionContainer.style.opacity = captionOpacity / 100;
previewCaptionContainer.style.whiteSpace = captionTextWrap;
previewOverlayContainer.innerHTML = '';
const buttonTexts = [button1Text.value, button2Text.value, button3Text.value];
buttonTexts.forEach((buttonText, index) => {
const button = document.createElement('button');
button.textContent = buttonText;
button.classList.add('overlay-button');
button.style.margin = buttonSpacing + 'px';
button.style.padding = ${buttonHeight / 2}px ${buttonWidth / 2}px;
button.style.fontSize = buttonFontSize + 'px';
button.style.color = buttonFontColor;
button.style.fontFamily = buttonFontStyle;
button.style.backgroundColor = buttonColor;
button.style.border = buttonBorder ? ${buttonBorderWeight}px solid ${buttonBorderColor} : 'none';
button.style.borderRadius = buttonRadius + 'px';
button.style.opacity = buttonOpacity / 100;
previewOverlayContainer.appendChild(button);
});
// Update loading screen preview
previewLoadingScreen.style.backgroundColor = loadingColorInput.value;
previewLoadingLogo.style.backgroundImage = loadingLogoUploadInput.value ? url(${URL.createObjectURL(loadingLogoUploadInput.files[0])}) : 'url("icon1.png")';
previewLoadingLogo.style.display = loadingStyleSelect.value === 'logo' ? 'block' : 'none';
previewLoadingSpinner.style.display = loadingStyleSelect.value === 'spinner' ? 'block' : 'none';
previewLoadingSpinner.style.borderStyle = loadingSpinnerStyleSelect.value;
previewLoadingSpinner.style.borderColor = loadingColorInput.value;
// Update video preview
previewVideo.poster = 'intro.jpg'; // Set the video poster to a stillframe image
previewVideo.load();
}
// Add event listeners to update the preview in real-time
frameShapeSelect.addEventListener('change', updatePreview);
frameBorderCheckbox.addEventListener('change', updatePreview);
frameBorderColorInput.addEventListener('input', updatePreview);
frameBorderWeightInput.addEventListener('input', updatePreview);
frameRadiusInput.addEventListener('input', updatePreview);
buttonSpacingInput.addEventListener('input', updatePreview);
buttonStackingHorizontalRadio.addEventListener('change', updatePreview);
buttonStackingVerticalRadio.addEventListener('change', updatePreview);
buttonFontStyleSelect.addEventListener('change', updatePreview);
buttonFontColorInput.addEventListener('input', updatePreview);
buttonFontSizeInput.addEventListener('input', updatePreview);
buttonWidthInput.addEventListener('input', updatePreview);
buttonHeightInput.addEventListener('input', updatePreview);
buttonColorInput.addEventListener('input', updatePreview);
buttonLocationSelect.addEventListener('change', updatePreview);
buttonOpacityInput.addEventListener('input', updatePreview);
buttonBorderCheckbox.addEventListener('change', updatePreview);
buttonBorderColorInput.addEventListener('input', updatePreview);
buttonBorderWeightInput.addEventListener('input', updatePreview);
buttonRadiusInput.addEventListener('input', updatePreview);
button1Text.addEventListener('input', updatePreview);
button2Text.addEventListener('input', updatePreview);
button3Text.addEventListener('input', updatePreview);
captionVisibilityCheckbox.addEventListener('change', updatePreview);
captionLocationSelect.addEventListener('change', updatePreview);
captionFontStyleSelect.addEventListener('change', updatePreview);
captionFontColorInput.addEventListener('input', updatePreview);
captionFontSizeInput.addEventListener('input', updatePreview);
captionOpacityInput.addEventListener('input', updatePreview);
captionTextWrapSelect.addEventListener('change', updatePreview);
loadingLogoUploadInput.addEventListener('change', updatePreview);
loadingStyleSelect.addEventListener('change', updatePreview);
loadingColorInput.addEventListener('input', updatePreview); // New event listener
loadingSpinnerStyleSelect.addEventListener('change', updatePreview); // New event listener
// Function to generate the customized video player
// ... (same as before)
// Add event listener to the generate button
generateButton.addEventListener('click', generateVideoPlayer);
// Update the preview initially
updatePreview();
</document_content>
</document>

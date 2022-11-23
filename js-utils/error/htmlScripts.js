function getHtmlScripts() {
  return [toggleDisplay, toggleElementDisplay, htmlErrorToggle, htmlImageToggle].map(
    f => `${f.toString()}`
  );
}

function htmlErrorToggle(errorName) {
  document
    .querySelectorAll(`tr:not(.header).${errorName}`)
    .forEach(toggleElementDisplay);
}

function htmlImageToggle(htmlElementContainer) {
  const img = htmlElementContainer.querySelector('img');
  toggleElementDisplay(img);
}

function toggleElementDisplay(e) {
  e.style.display = e.style?.display === 'none' ? '' : 'none';
}

function toggleDisplay(cssSelector) {
  document.querySelectorAll(cssSelector).forEach(toggleElementDisplay);
}

module.exports = { getHtmlScripts };

export function decodeHtml(html) {
    let areaElement = document.createElement('textarea');
    areaElement.innerHTML = html;
    return areaElement.value;
  }

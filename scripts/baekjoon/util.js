// Upload icon - Set Loading Icon
/* start upload will inject a spinner on left side to the "Run Code" button */
function startUpload() {
  elem = document.getElementById('BaekjoonHub_progress_anchor_element');
  if (elem !== undefined) {
    elem = document.createElement('span');
    elem.id = 'BaekjoonHub_progress_anchor_element';
    elem.className = 'runcode-wrapper__8rXm';
    elem.style = 'margin-left: 10px;padding-top: 0px;';
  }
  elem.innerHTML = `<div id="BaekjoonHub_progress_elem" class="BaekjoonHub_progress"></div>`;
  target = document.getElementById('status-table').childNodes[1].childNodes[0].childNodes[3];
  if (target.childNodes.length > 0) {
    target.childNodes[0].append(elem);
  }
  // start the countdown
  startUploadCountDown();
}

// Upload icon - Set Completed Icon
/* This will create a tick mark before "Run Code" button signalling BaekjoonHub has done its job */
function markUploaded() {
  elem = document.getElementById('BaekjoonHub_progress_elem');
  elem.className = '';
  style = 'display: inline-block;transform: rotate(45deg);height:13px;width:5px;border-bottom:3px solid #78b13f;border-right:3px solid #78b13f;';
  elem.style = style;
}

// Upload icon - Set Failed Icon
/* This will create a failed tick mark before "Run Code" button signalling that upload failed */
function markUploadFailed() {
  elem = document.getElementById('BaekjoonHub_progress_elem');
  elem.className = '';
  style = 'display: inline-block;transform: rotate(45deg);height:13px;width:5px;border-bottom:3px solid red;border-right:3px solid red;';
  elem.style = style;
}

/* inject css style required for the upload progress feature */
function injectStyle() {
  const style = document.createElement('style');
  style.textContent = '.BaekjoonHub_progress {\
    display: inline-block; \
    pointer-events: none; \
    width: 0.8em; \
    height: 0.8em; \
    border: 0.4em solid transparent; \
    border-color: #eee; \
    border-top-color: #3E67EC; \
    border-radius: 50%; \
    animation: loadingspin 1.0s linear infinite; } @keyframes loadingspin { 100% { transform: rotate(360deg) }}';
  document.head.append(style);
}

/* Util function to check if an element exists */
function checkElem(elem) {
  return elem && elem.length > 0;
}

/* A function that recursively checks that all values of object are not '' */
function isNotEmpty(obj) {
  if (obj === undefined || obj === null || obj === '' || obj === [] || obj === {}) return false;
  if (typeof obj !== 'object') return true;
  if (obj.length === 0) return false;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      // eslint-disable-next-line no-unused-vars
      if (!isNotEmpty(obj[key])) return false;
    }
  }
  return true;
}

function ready() {
  return isNotEmpty(bojData);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

function unescapeHtml(text) {
  const unescaped = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
  };
  return text.replace(/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g, function (m) {
    return unescaped[m];
  });
}

String.prototype.escapeHtml = function () {
  return escapeHtml(this);
};

String.prototype.unescapeHtml = function () {
  return unescapeHtml(this);
};

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(`0x${p1}`);
    }),
  );
}

function b64DecodeUnicode(b64str) {
  return decodeURIComponent(
    atob(b64str)
      .split('')
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );
}

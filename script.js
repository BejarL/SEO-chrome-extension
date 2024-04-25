// Inject a shadow DOM container into the current page
const shadowHost = document.createElement('div');
document.body.appendChild(shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// Add styles and content to the shadow DOM
const style = document.createElement('style');
style.textContent = `
  * { font-family: Arial, sans-serif; }
  p { color: blue; }
`;
shadowRoot.appendChild(style);

const contentElement = document.createElement('p');
contentElement.textContent = 'This content is isolated within a shadow DOM.';
shadowRoot.appendChild(contentElement);

document.addEventListener('DOMContentLoaded', function () {
    initializeEditor();
});

function initializeEditor() {
    tinymce.init({
        selector: '#editor',
        plugins: 'autolink lists link image charmap print preview anchor',
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        setup: editor => {
            let debounceTimer;
            editor.on('Change', function (e) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(updateSEOAnalysis, 500);
            });
            editor.on('keyup', function (e) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const content = editor.getContent({ format: 'html' });
                    const seoDetails = advancedSEOMetrics(content);
                    updateRealTimeSuggestions(seoDetails);
                }, 500);
            });
        }
    });
}

function updateSEOAnalysis() {
    const content = tinymce.activeEditor.getContent({ format: 'text' });
    const seoScore = calculateSEOScore(content);
    document.getElementById('seoScore').innerText = 'SEO Score: ' + seoScore;
}

function calculateSEOScore(content) {
    let score = 0;
    if (document.querySelector('meta[name="description"]')?.getAttribute('content').length > 0) {
        score += 20;
    }
    const textLength = content.length;
    score += textLength > 1500 ? 30 : textLength > 500 ? 10 : 0;
    const boldTags = (content.match(/<strong>(.*?)<\/strong>/g) || []).length;
    if (boldTags > 5) score -= 10;
    return score;
}

function updateRealTimeSuggestions(details) {
    let suggestions = "";
    if (details.headers < 3) suggestions += "Consider adding more headers. ";
    if (details.imagesAltMissing > 0) suggestions += "Add alt text to images. ";
    document.getElementById('seoSuggestions').innerText = suggestions;
}

function advancedSEOMetrics(content) {
    let details = {
        headers: 0,
        imagesAltMissing: 0,
        imagesAltGeneric: 0,
        headerOrder: true,
        brokenLinks: 0
    };
    const doc = new DOMParser().parseFromString(content, 'text/html');
    details.headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    details.headerOrder = checkHeaderOrder(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    Array.from(doc.getElementsByTagName('img')).forEach(img => {
        if (!img.alt) details.imagesAltMissing++;
        else if (["image", "photo"].includes(img.alt.toLowerCase())) details.imagesAltGeneric++;
    });
    return details;
}

function checkHeaderOrder(headers) {
    let lastLevel = 0;
    for (const header of headers) {
        const level = parseInt(header.tagName.substring(1), 10);
        if (lastLevel !== 0 && level > lastLevel + 1) return false;
        lastLevel = level;
    }
    return true;
}

document.getElementById('applyChanges').addEventListener('click', function () {
    const editedContent = tinymce.activeEditor.getContent({ format: 'html' });
    fetch('/apply-edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Changes successfully applied!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to apply changes: ' + error.message);
        });
});

document.getElementById('refreshAnalysis').addEventListener('click', function () {
    updateSEOAnalysis();
});
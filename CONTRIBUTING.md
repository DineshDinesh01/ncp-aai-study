# Contributing to NCP-AAI Study Guide

## How to Add a New Topic

1. Create: `notes/<domain-slug>/<topic-slug>.md`
2. Use the 9-section template from README
3. Run: `python scripts/generate_site.py --topic <your-topic-slug>`
4. Open `website/topics/<your-topic-slug>.html` to preview
5. Add it to the sidebar in `website/assets/js/script.js` (searchIndex)
6. Submit a pull request

## How to Add a Practice Question

Add to `website/mock-tests/index.html` following the existing `.quiz-question` pattern:
```html
<div class="quiz-question" data-answer="X" data-domain="llm">
  <div class="quiz-q-text">Your question?</div>
  <div class="quiz-options">
    <div class="quiz-option" data-value="A"><span class="opt-key">A</span> Option A</div>
    ...
  </div>
  <button class="quiz-check-btn">Check Answer</button>
  <div class="quiz-feedback">Explanation of the correct answer.</div>
</div>
```

## Code Style

- All Python: PEP 8
- All HTML: 2-space indentation
- No API keys committed — use `.env` and `.gitignore`

## Questions?

Open an issue on GitHub.

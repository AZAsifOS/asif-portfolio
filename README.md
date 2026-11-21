# MD. Asifuzzaman — Developer Portfolio

A responsive single-page portfolio built with HTML, CSS and vanilla JavaScript. The existing visual identity, theme toggle, navigation, project galleries and section layout are retained.

## Featured projects

- **MindScope — Student Mental Health XAI** — https://mindscope-cit8.onrender.com/  
  Source: https://github.com/AZAsifOS/MindScope
- **Asif Hardware & Battery Shop** — https://asif-hardware-updated.onrender.com/  
  Source: https://github.com/AZAsifOS/asif-hardware-updated

## Run locally

Open the folder in VS Code and use Live Server, or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Main files

- `index.html` — page content and metadata
- `style.css` — visual design, responsive layout, animation and reduced-motion support
- `script.js` — navigation, theme persistence, galleries, scroll reveal, project transitions and contact form

## Before publishing

1. Copy your existing `profile.jpg` into the project root.
2. Copy your existing complete `images/` folder into the project root. Do not rename the screenshot files.
3. Add your own CV PDF as `Asif_CV.pdf` in the project root.
4. Test both project galleries and the CV download after copying the assets.

See `ASSET_SETUP.txt` for the full list of referenced images.

## Contact form behavior

The contact form validates the fields and opens the visitor's email application with a prefilled message addressed to `mdasifuzzaman135@gmail.com`. It does not submit to or store data on a server. A server-backed form requires a configured backend or third-party form endpoint.

## MindScope research note

MindScope is an educational research prototype. Its model output is not a clinical diagnosis or a clinically validated assessment.

# ryanjvig.github.io

Personal site for Ryan Vig, served by GitHub Pages at <https://ryanjvig.github.io>. Plain HTML and CSS with no build step.

- `index.html`: home page and project list
- `assets/css/site.css`: shared styles for the site pages
- `medimorph.html`, `medimorphprivacypolicy.html`: MediMorph support page and privacy policy. **The App Store listing links to these URLs, so don't rename them.**
- `fractal.html`, `fractalusage.html`: Newton fractal visualizer and its guide
- `newtongraph.html`, `newtongraphgalois.html`, `newtonreport.pdf`: more Newton's method work
- `crossslash.html`: browser game, not linked from the site but still reachable directly

## Adding a project

Copy one `<li class="project">` block in `index.html`. For a new solver on `*.solver.gg`, copy the Euchre entry, keep the `solver.gg` kind label, and point it at the new subdomain.

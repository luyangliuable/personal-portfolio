# Personal Portfolio

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [Personal Portfolio](#personal-portfolio)
  - [Roadmap](#roadmap)

<!-- markdown-toc end -->

## Website Roadmap

### Completed Tasks:
- [x] **Landing Page:** Added personal introduction.
- [x] **Blog Integration:** Successfully integrated a blogging feature.
- [x] **Mobile Responsiveness:** Optimized for phone screens.
- [x] **Deployment:** Website live at [this link](http://170.64.250.107/).

### Upcoming Features:
- [ ] **Backend Storage:** Store posts as markdown and manage them inside a volume backend.
- [ ] **User Profiles:** 'About website' page to display user information such as location, browser, IP address, and name (only if provided voluntarily).
- [ ] **Website Mascot:** Introduce a mascot (e.g. dog, cat, clippy) that appears on the site. This mascot should be able to read visible content and interact using the OpenAI API.
  * Mascot can detect html elements and climb on top determined by randomness
- [ ] **Browser Compatibility:** Ensure website compatibility with older browsers.
- [ ] **Coding Tools:** Integrate tools for coding-related tasks like hex to RGBA conversion, shell commands, and maybe an online version of emacs.
- [ ] **CSS Showcases:** Display my CodePen projects that showcase CSS tricks.
- [ ] Convert all [Coding Notes](https://github.com/luyangliuable/coding-notes ) into a section on personal website and rendered.

  

## Development

### Frontend

```sh
npm i
npm start
```

### Backend

```sh
rustup override set nightly
cargo build
cargo run
```

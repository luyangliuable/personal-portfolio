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
- [x] **Backend Storage:** Store posts as markdown and manage them inside a volume backend.
- [x] Featured Content section with cool candle + dark room animation effect
* [x] Store images and assets on the rust backend for enhanced speed and performance.

### Upcoming Features:
* [ ] Login system: users can login or continue as guests when using some tooks
* [ ] Mood tracker: track what made user happy or sad and give statiscs on what things most likely going to make user sad/happy
* [ ] Fitness Tracker: Monitor your gym advancements and create personalized workout routines. Additionally, earn scores based on a unique formula I developed.
* [ ] Meet sleek: Essentially when2meet, but offering a superior UI/UX experience.
* [ ] Set up email functionality: Implement the feature to email guests with mood tracker and gym log data.
* [ ] Time Capsule Letters: Create a platform where users can write letters to their future selves and have them sent via SMTP at a predetermined date and time.
* [ ] HexaBridger: A tool that assists in converting various color formats including RGBA to HEX.
* [ ] CSSCrossbrowser: Develop a tool to transform CSS code for seamless compatibility across all browsers.
* [ ] Anoyletters: Introduce a feature for posting anonymous letters, released on a daily or weekly basis.
* [ ] Convert all [Coding Notes](https://github.com/luyangliuable/coding-notes ) into a section on personal website and rendered.
* [ ] Blog Reading page show [snake](https://lab.hakim.se/progress-nav/#dev ) like table of contents animation effect as user reads hard to explain but we'll see.
* [ ] Set up TLS certificate and encryption
* [ ] When components mount have cool fade in or ease in effect.
* [ ] Cookie functionality
* [ ] Tracker to see what ip address visited page, how many clicks, how long etc.
* [ ] Time Capsule Letters: Let user specify a letter to write to future self and website send to them on a specified date.
* [ ] Man of the day: bash command of the day
* [ ] Algorithm of the day: show a new algorithm everyday
* [ ] Experimental and optional machine learning model training app: let user upload data to train a model on website and let them use
* [ ] Set up TLS certificate and encryption
- [ ] **User Profiles:** 'About website' page to display user information such as location, browser, IP address, and name (only if provided voluntarily).
- [ ] **Website Mascot:** Introduce a mascot (e.g. dog, cat, clippy) that appears on the site. This mascot should be able to read visible content and interact using the OpenAI API.
  * Mascot can detect html elements and climb on top determined by randomness
- [ ] **Browser Compatibility:** Ensure website compatibility with older browsers.
- [ ] Nyan cat website scroll progress
- [ ] **Coding Tools:** Integrate tools for coding-related tasks like hex to RGBA conversion, shell commands, and maybe an online version of emacs.
- [ ] Turn stuff on this website into packages for others to use.
- [ ] **CSS Showcases:** Display my CodePen projects that showcase CSS tricks.
  

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

* Only version that will work on linux due to bug with rust compiler and proc-macro2
nightly-2023-03-01-x86_64-unknown-linux-gnu

* Version confirmed to will work on mac os. So far it is pretty smooth it is shocking since it is an arm architecture and nightly.
stable-aarch64-apple-darwin (default)
rustc 1.65.0 (897e37553 2022-11-02)

* No version of rust can run this on windows currently

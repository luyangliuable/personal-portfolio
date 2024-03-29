# Personal Portfolio

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [Personal Portfolio](#personal-portfolio)
  - [Roadmap](#roadmap)

<!-- markdown-toc end -->
  

## Development

### Frontend

#### HTML Element Conventions
When naming CSS classes, it's generally a good idea to follow naming conventions that are descriptive and consistent to maintain readability and scalability in your code. Here is an example of CSS naming conventions following the BEM (Block, Element, Modifier) methodology which can be useful for structuring your CSS in a more maintainable way:

Each element should have a **main component** (i.e. .component), a wrapper (i.e. .component__wrapper) and a content segment (.component__content).

```
┌──────────────────────────────────────────────────────────────┐
│ .component__wrapper                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │.component                                                │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │                                                          │ │
│ │ ┌──────────────────────────────────────────────────────┐ │ │
│ │ │Heading                                               │ │ │
│ │ └──────────────────────────────────────────────────────┘ │ │
│ │                                                          │ │
│ │                                                          │ │
│ │                                                          │ │
│ │ ┌──────────────────────────────────────────────────────┐ │ │
│ │ │.component__content                                   │ │ │
│ │ ├──────────────────────────────────────────────────────┤ │ │
│ │ │                                                      │ │ │
│ │ │    xx xx xx xxxxxxx x xx x x xx x xxxxxxxxxxxxx      │ │ │
│ │ │    xxxxxxxx                                  xxxxx   │ │ │
│ │ │    x     xxx xxxx x   x  x xxxxxx x  x xx xx x   x   │ │ │
│ │ │    x xxx xxxxxx xxxxx      xxx       x x  x xxxx x   │ │ │
│ │ │    xx       xxxxxxxxx xxx xx        xx x      xxxx   │ │ │
│ │ │    x      xxxx   x  x      x x x  x  x xx  x xxx x   │ │ │
│ │ │    x   xxxx x               x           x   x    x   │ │ │
│ │ │    x          x x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   │ │ │
│ │ │    x  xxxx  x x  xxxxxxxxxx xxxxxxxxxxxxxxx          │ │ │
│ │ │        xxxxxxxxxx                                    │ │ │
│ │ └──────────────────────────────────────────────────────┘ │ │
│ │                                                          │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

```css
/* Block component */
.component {
  /* styles */
}

/* Element: wrapper around the component */
.component__wrapper {
  /* styles */
}

/* Element: content inside the component */
.component__content {
  /* styles */
}

/* Element: heading inside the content */
.component__content__heading {
  /* styles for h1 */
}

/* Element: text below the heading inside the content */
.component__content__text {
  /* styles for the text below h1 */
}

```


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

| Platform | Nightly Toolchain                           | Notes                                                                                                                |
|:--------:|:-------------------------------------------:|----------------------------------------------------------------------------------------------------------------------|
| Linux    | nightly-2023-03-01-x86_64-unknown-linux-gnu | Only version that will work on linux due to bug with rust compiler and proc-macro2                                   |
| Mac Os   | stable-aarch64-apple-darwin                 | Version confirmed to will work on mac os. So far it is pretty smooth it is shocking since it is an arm architecture. |
| Windows  |                                             | No version of rust can run this on windows currently                                                                 |


## Website Roadmap

### Completed Tasks:
- [x] **Landing Page:** Added personal introduction.
- [x] **Blog Integration:** Successfully integrated a blogging feature.
- [x] **Mobile Responsiveness:** Optimized for phone screens.
- [x] **Deployment:** Website live at [this link](http://170.64.250.107/).
- [x] **Backend Storage:** Store posts as markdown and manage them inside a volume backend.
- [x] Featured Content section with cool candle + dark room animation effect
* [x] Store images and assets on the rust backend for enhanced speed and performance.
* [x] Set up TLS certificate and encryption
* [x] Blog Reading page show [snake](https://lab.hakim.se/progress-nav/#dev ) like table of contents animation effect as user reads hard to explain but we'll see.
* [x] Login system: users can login or continue as guests when using some tooks

### Upcoming Features:
* [ ] Website Footer
* [ ] Mood tracker: track what made user happy or sad and give statiscs on what things most likely going to make user sad/happy
* [ ] Fitness Tracker: Monitor your gym advancements and create personalized workout routines. Additionally, earn scores based on a unique formula I developed.
* [ ] Meet sleek: Essentially when2meet, but offering a superior UI/UX experience.
* [ ] Set up email functionality: Implement the feature to email guests with mood tracker and gym log data.
* [ ] Time Capsule Letters: Create a platform where users can write letters to their future selves and have them sent via SMTP at a predetermined date and time.
* [ ] HexaBridger: A tool that assists in converting various color formats including RGBA to HEX.
* [ ] CSSCrossbrowser: Develop a tool to transform CSS code for seamless compatibility across all browsers.
* [ ] Anoyletters: Introduce a feature for posting anonymous letters, released on a daily or weekly basis.
* [ ] Convert all [Coding Notes](https://github.com/luyangliuable/coding-notes ) into a section on personal website and rendered.
* [ ] When components mount have cool fade in or ease in effect.
* [ ] Cookie functionality
* [ ] Tracker to see what ip address visited page, how many clicks, how long etc.
* [ ] Time Capsule Letters: Let user specify a letter to write to future self and website send to them on a specified date.
* [ ] Man of the day: bash command of the day
* [ ] Algorithm of the day: show a new algorithm everyday
* [ ] Experimental and optional machine learning model training app: let user upload data to train a model on website and let them use
- [ ] **User Profiles:** 'About website' page to display user information such as location, browser, IP address, and name (only if provided voluntarily).
- [ ] **Website Mascot:** Introduce a mascot (e.g. dog, cat, clippy) that appears on the site. This mascot should be able to read visible content and interact using the OpenAI API.
  * Mascot can detect html elements and climb on top determined by randomness
- [ ] **Browser Compatibility:** Ensure website compatibility with older browsers.
- [ ] Nyan cat website scroll progress
- [ ] **Coding Tools:** Integrate tools for coding-related tasks like hex to RGBA conversion, shell commands, and maybe an online version of emacs.
- [ ] Turn stuff on this website into packages for others to use.
- [ ] **CSS Showcases:** Display my CodePen projects that showcase CSS tricks.

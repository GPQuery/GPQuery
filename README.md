# gpquery

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Structure

### Front-End

```
client/
│
│
├── app/
│   │
│   ├── main/                               --> Main Component (Home Page)
│   │   ├── main.component.js               --> Main Component Script File
│   │   ├── main.component.spec.js          --> Main Component Unit Test
│   │   ├── main.routes.js                  --> Main Component Routes
│   │   ├── main.pug                        --> Main Component Template
│   │   └── main.scss                       --> Main Component Styles
│   │
│   ├── app.config.js                       --> Application-Wide Config
│   ├── app.constants.js                    --> Constants; Injected from `server/config/environment/shared.js`
│   ├── app.js                              --> Root Application Script File
│   └── app.scss                            --> Root Application Stylesheet
│
│
├── components/                             --> Components
│   │
│   ├── footer/
│   │   ├── footer.component.js
│   │   ├── footer.pug
│   │   └── footer.scss
│   │
│   ├── modal/
│   │   ├── modal.service.js
│   │   ├── modal.pug
│   │   └── modal.scss
│   │
│   ├── navbar/
│   │   ├── navbar.component.js
│   │   └── navbar.pug
│   │
│   ├── ui-router/
│   │   └── ui-router.mock.js               --> Mock Service for Unit Testing
│   │
│   └── util/
│       ├── util.module.js
│       └── util.service.js                 --> General Utility Service
│
│
├── assets/                                 --> Static Assets
│   │
│   ├── data/
│   │   ├── 
│   │   ├── 
│   │   └── 
│   │
│   ├── fonts/
│   │   ├── 
│   │   ├── 
│   │   └── 
│   │
│   ├── icons/
│   │   ├── 
│   │   ├── 
│   │   └── 
│   │
│   └── images/
│       ├── 
│       ├── 
│       └── 
│
│
├── .eslintrc                               --> ESLint Config for Client Files
├── .htaccess                               --> Apache Server Config
├── index.html                              --> Index
├── _index.html                             --> Template for Root HTML File
├── favicon.ico                             -->
├── polyfills.js                            -->
└── robots.txt                              -->
```

### Back-End

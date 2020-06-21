<br />
<p align="center">
  <a href="https://github.com/YannickSpoerl/laundry">
    <img src="https://github.com/YannickSpoerl/laundry/blob/master/public/img/icons/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">LAUNDRY</h3>

  <p align="center">
    Plan laundry in your shared flat!
    <br />
    <br />
    <a href="https://laundry.yannickspoerl.de">View Demo</a>
    ·
    <a href="https://github.com/YannickSpoerl/laundry/blob/master/CHANGELOG.md">Changelog</a>
    ·
    <a href="https://github.com/YannickSpoerl/laundry/issues">Report Bug</a>
    ·
    <a href="https://github.com/YannickSpoerl/laundry/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

A Progressive Web App to manage laundry in your shared flat on your phone or desktop. Hosted on Github, with Firestore as Database for Realtime Sync.

<p align="center">
  <img src="https://user-images.githubusercontent.com/33640025/85009695-29d42580-b15f-11ea-98a5-812e3a185562.png" width="444" height="346"/>
  <!--   -->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!--   -->
  <img src="https://user-images.githubusercontent.com/33640025/85009696-2a6cbc00-b15f-11ea-964a-6fdaf70f665b.png" width="170" height="346"/>
</p>


### Built With

* [Vue.js](https://vuejs.org/)
* [Firebase](https://firebase.google.com/)
* [Vuetify](https://vuetifyjs.com)
* [Vuexfire](https://vuefire.vuejs.org/vuexfire/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuei18n](https://kazupon.github.io/vue-i18n/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/YannickSpoerl/laundry.git
```
2. Install NPM packages
```sh
npm install --save
```



<!-- USAGE EXAMPLES -->
## Usage

Add your firebase config to ``src/app.config.json``:
```json
firebaseConfig: {
  "apiKey": "api-key",
  "authDomain": "project-id.firebaseapp.com",
  "databaseURL": "https://project-id.firebaseio.com",
  "projectId": "project-id",
  "storageBucket": "project-id.appspot.com",
  "messagingSenderId": "sender-id",
  "appId": "app-id",
}
```

Create following collections in the firebase-database:

- ``flatmates``, with sample document:
```json
{
  "name": "John Doe"
}
```

- ``categories``, with sample document:
```json
{
  "name": "Light"
}
```
- ``temperatures``, with sample document:
```json
{
  "degree": 60"
}
```

- ``laundries``, with sample document:
```json
{
  "created": "8. June 2020 at 11:08:00 UTC+2",
  "planned": "12. June 2020 at 14:00:00 UTC+2",
  "plannedBy": "John Doe",
  "category": "Light",
  "temperature": 60,
  "participants": [ "John Doe" ],
  "loaded": [],
  "full": false,
  "started": false
}
```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/YannickSpoerl/laundry/blob/master/LICENSE.md) for more information.



<!-- CONTACT -->
## Contact

Yannick Spoerl - [@yannickspoerl](https://twitter.com/yannickspoerl)

Project Link: [https://github.com/YannickSpoerl/laundry](https://github.com/YannickSpoerl/laundry)
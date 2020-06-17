
<h1 align="center">
  <br>
    Laundry
</h1>

<h4 align="center">Plan the laundry in your shared flat!</h4>

<p align="center">
</p>

<p align="center">
  <a href="#development">Development</a> •
  <a href="#changelog">Changelog</a> •
  <a href="#license">License</a> •
  <a href="https://github.com/YannickSpoerl/laundry/blob/master/SECURITY.md">Security</a> •
    <a href="https://github.com/YannickSpoerl/laundry/issues">Issues</a> 
</p>

## Development

### Set up
```
git clone https://github.com/YannickSpoerl/laundry.git
cd laundry
npm install --save
```

### Add your firebase config to ``src/plugins/vuefire``
```
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
}
```

### Compile with hot-reloads for development
```
npm run serve
```

### Compile and minify for production
```
npm run build
```

### Lint and fix files
```
npm run lint
```

## Changelog

- [Changelog](https://github.com/YannickSpoerl/laundry/blob/master/CHANGELOG.md).

## License

- [License](https://github.com/YannickSpoerl/laundry/blob/master/LICENSE.md).

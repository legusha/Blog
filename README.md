# Analogue-medium

This application has several assess such as "dev" and "free", depending on the selected assess, in UI the display of actions changes.

Conditions that are described below in tasks correspond to the mode "free".

##### Known bugs

* If remove post,all posts of the user are deleted. See [Json-server](https://github.com/typicode/json-server/pull/756). But this flag --no-delete-cascade not working.

### First you need to run json-server

## Project setup
```
npm install
```

### Run json-server
```
npm run server
```

### Compiles and hot-reloads for development assess
```
npm run serve:dev
```

### Compiles and hot-reloads for free assess
```
npm run serve:free
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production and run static server
```
npm run build:run
```

### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

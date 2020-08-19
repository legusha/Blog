# Analogue-medium

###### This application has several assess such as "dev" and "free", depending on the selected assess, in UI the display of actions changes

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

### Lints and fixes files
```
npm run lint
```

### Task description
```
Тестовое задание “Аналог Medium”.
Аутентификация.
Реализовать прототип аутентификации используя логин и пароль из базы данных.

Форма аутентификации должна валидироваться перед отправкой запроса. Для прототипа логин производится на фронте, подразумевается что Вы получите пользователя по полю email, сверите пароли и если они совпадают то “залогините” пользователя опираясь на его role.

Также должен быть реализован выход пользователя.
Не залогиненный пользователь.
Не залогиненый пользователь может лишь просматривать посты, он не может ни создавать новые, ни “хлопать” за существующие.
Читатель (role: reader).
Читатель не может создавать и редактировать существующие посты, но может хлопать за существующие, количество хлопков по типу Medium, не ограничено.
Писатель (role: writer).
Писатель может создавать, редактировать и удалять свои посты, но не может “хлопать”.
UI/UX.
Использование buefy обязательно. Кастомизировать его не нужно.


Требования к UI:


Наличие пагинации, если постов больше 10.
Наличие работоспособных кнопок для каждой роли.
Отдельный экран для логина.
Отдельный экран для создания / редактирования поста.

Значение кнопки хлопков должно изменяться без перезагрузки страницы.
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

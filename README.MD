Hi! This is my mini project for my portfolio

# INSTALLATION

1. Clone the repository

2. Install all dependencies

```

npm i

```

3. Run nodemon

```

npm run dev

```

# ENDPOINT & REQUEST:

### Method:

```

POST

```

### link:

```

localhost:3500/api/v1/weather

```

### QUERY PARAMS:

### KEY & VALUE

`key: q`

`value: {city name}`

example in Postman:

`key` `value`

`q` `jakarta`

after that, the full link should be like this

```

localhost:3500/api/v1/weather?q=jakarta

```

normally it should be

```
localhost:3500/api/v1/weather?q=jakarta&appid={{api token key}}
```

but since i alredy sent the token automatically, no need to sent it again in params

for more documentation about this project, you can see it at file `swagger.yaml`

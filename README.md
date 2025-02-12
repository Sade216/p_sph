# Typescript project template.

### Bun + Hono + Vite + React + MongoDB:

***

To install dependencies:

```
bun install
```

## Server

To run:
```
bun start
```
Dev mode:
```
bun dev
```

## Frontend

Go to front folder:
```
cd ./frotend/
```

To run:
```
bun start
```

Dev mode:
```
bun dev
```

Build(server need static files):
```
bun run build
```

You'll need to **setup DB connection** in ***.env*** file (in the root directory):
```
URL_DATABASE='your_postgres_database_url'
```

***

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

> [!NOTE]
>
> ## Info/Информация
>
> Re-creating my graduation project https://github.com/Sade216/SPH_client and https://github.com/Sade216/SPH_server with an updated stack and TypeScript.
>
> ***
> 
> Пересоздание моего дипломного проекта https://github.com/Sade216/SPH_client и https://github.com/Sade216/SPH_server с обновлённым стеком и TypeScript.
>


# SPH

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

<div align="center">

# ✨ Uniswap V3 APY

![Forks](https://img.shields.io/github/forks/hsnice16/uniswap-v3-apy)
![Stars](https://img.shields.io/github/stars/hsnice16/uniswap-v3-apy)

</div>

Backend API that provides the Uniswap V3 protocol on Ethereum APY information.

> Base URL: https://uniswap-v3-apy.onrender.com
>
> It is deployed on Render, and
>
> "Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.
>
> Spinning up a service takes a few seconds, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily."

---

## 📋 API Reference

### Get the APY

```HTTP
GET /v1/apy
```

#### Query parameters

| param       | type   | description                                            |
| ----------- | ------ | ------------------------------------------------------ |
| poolAddress | string | The pool address you want to get APY for (`required`). |

**Example**

```HTTP
GET /v1/apy?poolAddress=0xcbcdf9626bc03e24f779434178a73a0b4bad62ed
```

<div align="center">
• • •
</div>

### Save a pool

```HTTP
POST /v1/pool

Request Body
{ "address": "string" }
```

<div align="center">
• • •
</div>

### Delete a pool

```HTTP
DELETE /v1/pool

Request Body
{ "address": "string" }
```

---

## ⚙️ Develop Locally

### Pull the code

```shell
git clone git@github.com:hsnice16/uniswap-v3-apy.git
cd uniswap-v3-apy
```

### Run in a Docker Container or start the server manually

#### ➡️ Run in a Docker Container

You will need [docker](https://www.docker.com/get-started/) on your local machine for this.

##### • Build the image

```shell
docker build -t hsnice16/uniswap-v3-apy:1.0 .
```

##### • Run container

```shell
docker run -p 8080:8080 hsnice16/uniswap-v3-apy:1.0
```

<div align="center">
• • •
</div>

#### ➡️ Run manually

##### • Install dependencies

```shell
npm install
```

##### • Run in watch mode

This way when you will make any changes you won't have to restart the server again.

```shell
npm run watch
```

_The server is running on [localhost:8080](http://localhost:8080/)_

---

## 🐳 Use its Docker Image

This is present as a Docker Image on Hub, so you can use that if you want.

### Pull the image

```shell
docker pull hsnice16/uniswap-v3-apy:1.0
```

### Run container

```shell
docker run -p 8080:8080 hsnice16/uniswap-v3-apy:1.0
```

_The server is running on [localhost:8080](http://localhost:8080/)_

---

## ⏭️ Next Steps

Things that can make it even better.

- Place a rate limiter for endpoints.
- Reverse proxy to secure backend servers, caching, and balance load.
- Write an OpenAPI specification for endpoints and create a Swagger dashboard using that, to make the API documentation more readable.

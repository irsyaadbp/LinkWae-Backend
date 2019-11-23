<h1 align="center">LinkWae App RESTful API</h1>

# Overview
## List of Contents
* [Introduction](#introduction)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#installation)   
* [Endpoints](#endpoints)

## Introduction

**LinkWae is a cloning application from LinkAja.**
LinkWae API is an API that helps users to make transactions on the LinkWae Application. There are already several LinkAja features that have been implemented at LinkWae such as buying credit, paying merchants, paying bills, donations,

The following is LinkWae Entity Relationship Diagram (ERD) :
![ERD LinkWae (1)](https://user-images.githubusercontent.com/29118699/69460054-bc693d80-0da5-11ea-9c61-56771ae1ec4e.png)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.17.0-green.svg?style=rounded-square)](https://nodejs.org/) [![body-parser](https://img.shields.io/badge/bodyparser-v1.19.0-red)](https://www.npmjs.com/package/body-parser) [![MySQL](https://img.shields.io/badge/mysql-v2.17.1-blue?style=rounded-square)](https://www.npmjs.com/package/mysql)  [![morgan](https://img.shields.io/badge/morgan-v1.9.1-success?style=rounded-square)](https://www.npmjs.com/package/body-parser) [![dotenv](https://img.shields.io/badge/dotenv-v8.2.0-black?style=rounded-square)](https://www.npmjs.com/package/dotenv) [![cors](https://img.shields.io/badge/cors-v2.8.5-blueviolet?style=rounded-square)](https://www.npmjs.com/package/cors) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.5.1-blue?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. Text Editor (ex. Sublime Text, Visual Studio Code)

## Getting Started
![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

#### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

#### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)
#### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.

#### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

#### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |

### Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm i` or `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Change a file, **./src/connect/connect.js**. [instruction here](#change-connect-file)
6. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
7. Setup the database. [instruction here](#setup-database)
8. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
9. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/transactions)
10. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Duplicate **.env.example** file to **.env** on code editor and change the variable or copy the code below :
```
DB_HOST = 'localhost'
DB_USER = 'username'
DB_PASSWORD = 'password'
DB_DATABASE = 'database'
PORT = 5000
```
## Change connect file
file to **connect.js** on code editor and change the variable or copy the code below :
```
'use-strict';

const Sequelize = require('sequelize');

module.exports = new Sequelize(
	process.env.DB_DATABASE, 
	process.env.DB_USER, 
	process.env.DB_PASSWORD,
	{
	  host: process.env.DB_HOST,
	  dialect: 'mysql',
	  operatorsAliases : false,

	  pool: {
	    max: 5,
	    min: 0,
	    acquire: 30000,
	    idle: 10000
	  },
	}
);
```

## Setup Database
You can import file **`database.sql`** to **phpmyadmin**.

## Endpoints

#### **Homepage Endpoint**

- **Request** : **`GET /`**
- **Response** :
    ```
    {
        "message": "Welcome to Backend LinkWae"
    }
    ```
    
#### **User Endpoint**
* **Register User**
    - **Request** : **`POST /users/register`**
    ```
    {
        "phone" : "81393739033",
        "pin" : "123561",
        "name" : "huwaida",
        "email" : "hafizhahuwaida@gmail.com",
        "expo_token" : "123432"
    }
    ```
    - **Response** :
    ```
      {
        "status": "success",
        "response": {
            "user": {
                "id": 21,
                "name": "huwaida",
                "phone": "81393739033",
                "email": "hafizhahuwaida@gmail.com",
                "image": "/images/avatar.png"
            },
            "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJodXdhaWRhIiwicGhvbmUiOiI4MTM5MzczOTAzMyIsImVtYWlsIjoiaGFmaXpoYWh1d2FpZGFAZ21haWwuY29tIiwiaWF0IjoxNTc0NDA0ODQzfQ.75OGSK8ZBk8mV_vF_WgMOejWVIxj5O-50jv7lPo6hRU"
        }
    }
    ```
* **Login User**
    - **Request** : **`POST /users/login`**
    ```
    {
        "phone" : "81393739052",
        "pin" : "112345",
        "expo_token" : "123432"
    }
    ```
    - **Response** :
     ```
          {
            "status": "success",
            "response": {
                "user": {
                    "id": 13,
                    "name": "Nitha Huwaida",
                    "phone": "81393739052",
                    "email": "bitha@gmail.com",
                    "image": null
                },
                "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJOaXRoYSBIdXdhaWRhIiwicGhvbmUiOiI4MTM5MzczOTA1MiIsImVtYWlsIjoiYml0aGFAZ21haWwuY29tIiwiaWF0IjoxNTc0NDA1MTI3fQ.VrQ1lyVV2is-vGNysbLkHbVg_5rrG9bKU71qXuBcPL4"
            }
        }
     ```
* **Check Authentication**
    - **Request** : **`POST /users/checkAuth`**
    ```
    {
        "phone" : "81393739052"
    }
    ```
    - **Response** :
     ```
          {
            "status": "success",
            "response": {
                "phone": "81393739052",
                "isRegistered": true
            }
        }
     ```
* **Verify OTP**
    - **Request** : **`POST /users/verifyOtp`**
    - **Response** :
    ```
        {
        "status": "success"
        response : 'Verify OTP succcess'
        }
    ```
* **Send OTP**
    - **Request** : **`POST /users/sendOtpEmail`**
    ```
    {
        "email": "hafizhahuwaida@gmail.com",
        "type" : "verify"
    }
    ```
    - **Response** :
     ```
        {
            "status": "success",
            "response": "Successfully sent otp code to email hafizhahuwaida@gmail.com"
        }
     ```
* **Change Image**
    - **Request** : **`POST /users/changeImage`**
    -  **IMPORTANT!** image is **` file upload `**
    ```
    {
        "phone" : "081393739052",
        "image" : "image-profile-1574416941135.jpg"
    }
    ```
    - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "message": "Success change Image",
            "user": {
                "id": 13,
                "name": "Nitha Huwaida",
                "phone": "81393739052",
                "email": "bitha@gmail.com",
                "image": "/images/uploads/image-profile-1574416941135.jpg"
            }
        }
    }
    ```
* **Reset Pin**
    - **Request** : **`POST /resetPin`**
    ```
    {
        "email" : "hafizhahuwaida@gmail.com",
        "pin" : "123456"
    }
    ```
    - **Response** :
    ```
          {
            "status": "success",
            "response": {
                "message": "Success reset pin",
                "user": {
                    "id": 21,
                    "name": "huwaida",
                    "phone": "81393739033",
                    "email": "hafizhahuwaida@gmail.com",
                    "image": "/images/avatar.png"
                }
            }
        }
    ```
* **Verify Email**
    - **Request** : **`POST /users/verifyEmail`**
    - **Response** :
     ```
    {
        "status": "success"
        response : 'Verify OTP succcess'
    }
     ```
* **Request Token**
    - **Request** : **`POST /users/requestToken`**
    ```
    {
        "phone" : "81393739052",
        "pin" : "123456"
    }
    ```
    - **Response** :
    ```
      {
        "status": "success",
        "response": {
            "token": "9935867545",
            "user": {
                "id": 13,
                "name": "Nitha Huwaida",
                "phone": "81393739052",
                "email": "bitha@gmail.com",
                "image": null
            }
        }
    }
    ```
* **Change Pin**
    - **Request** : **`POST /users/changePin`**
    ```
    {
        "phone" : "81393739052",
        "old_pin" : "123456",
        "new_pin" : "321456"
    }
    ```
    - **Response** :
    ```
      {
        "status": "success",
        "response": {
            "message": "Success change pin",
            "user": {
                "id": 13,
                "name": "Nitha Huwaida",
                "phone": "81393739052",
                "email": "bitha@gmail.com",
                "image": null
            }
        }
    }
    ```
 * **Get All Users**
      - **Request** : **`GET /users/`**
      - **Response** :
    ```
    {
        "status": "success",
        "response": [
            {
                "id": 10,
                "phone": "849235353923",
                "name": "icak",
                "email": "irsyaad@irsaad.com",
                "image": "/images/avatar.png",
                "type": "FA",
                "balance": 0,
                "token": "$2b$10$9.OC/OzxYgTOurnaNQ1v1ujKd4BhI4g4GPS14hkrN4aLxdV9lWsLa",
                "expo_token": "",
                "date_add": "2019-11-19T16:54:22.000Z",
                "date_update": "2019-11-20T16:46:41.000Z"
            }
        ]
    }
    ```
 * **Get User By Id**
      - **Request** : **`GET /users/id/:user_id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "id": 13,
            "phone": "81393739052",
            "name": "Nitha Huwaida",
            "email": "bitha@gmail.com",
            "image": null,
            "type": "B",
            "balance": 68610,
            "token": "",
            "expo_token": "",
            "date_add": "2019-11-20T00:48:44.000Z",
            "date_update": "2019-11-21T16:19:15.000Z"
        }
    }
    ```
 * **Get User By Phone**
      - **Request** : **`GET /users/phone/:phone`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "id": 13,
            "phone": "81393739052",
            "name": "Nitha Huwaida",
            "email": "bitha@gmail.com",
            "image": null,
            "type": "B",
            "balance": 68610,
            "token": "",
            "expo_token": "",
            "date_add": "2019-11-20T00:48:44.000Z",
            "date_update": "2019-11-21T16:19:15.000Z"
        }
    }
    ```
#### **CRUD Category Endpoint**

* **Get All Categories**
      - **Request** : **`GET /categories`**
      - **Response** :
    ```
            {
            "status": "success",
            "response": [
                {
                    "id": 1,
                    "name": "Reta Beauty Clinic Yogyakarta",
                    "address": "Jl Kaliurang No16 KM 7",
                    "detail": "Reta Beauty Clinic ",
                    "longitude": "-7.761260",
                    "latitude": "110.380531",
                    "parent_category": "merchants"
                },
                {
                    "id": 2,
                    "name": "Pasley Bakery Kaliurang Yogya",
                    "address": "Jl Kaliurang KM 5.3 No A19",
                    "detail": "Pasley Bakery Kaliurang Yogya",
                    "longitude": "-7.759644",
                    "latitude": "110.381317",
                    "parent_category": "merchants"
                }
            }
        ]
    }
    ```
* **Get Category By Id**
      - **Request** : **`GET /categories/id/:id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "id": 8,
            "name": "YAYASAN BUMN HADIR UTK NEGERI",
            "address": null,
            "detail": "yayasan_bumn",
            "longitude": null,
            "latitude": null,
            "parent_category": "donation"
        }
    }
    ```
* **Get All Category By Category Parent**
      - **Request** : **`GET /categories/parent/:parent`**
      -  **IMPORTANT!** There are only 4 category parent **`merchants, ppob, balance, donation`** 
      - **Response** :
    ```
    {
        "status": "success",
        "response": [
            {
                "id": 3,
                "name": "pulsa",
                "address": null,
                "detail": "ppob pulsa",
                "longitude": null,
                "latitude": null,
                "parent_category": "ppob"
            },
            {
                "id": 4,
                "name": "listrik",
                "address": null,
                "detail": "ppob listrik",
                "longitude": null,
                "latitude": null,
                "parent_category": "ppob"
            }
        ]
    }
    ```
 * **Post Category**
      - **Request** : **`POST /categories`**
      ```
      {
            "name": "De'Sushi Jogja",
            "address": "Jl Kaliurang , Pogung Kidul,Sinduadi, Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284 -Yogyakarta",
            "detail": "De'Sushi",
            "longitude": "-7.759644",
            "latitude": "110.381317",
            "parent_category": "donation"
      }
      ```
      - **Response** :
    ```
    {
        "status": "success",
        "response": {
            "id": 11,
            "name": "De'Sushi Jogja",
            "address": "Jl Kaliurang , Pogung Kidul,Sinduadi, Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284 -Yogyakarta",
            "detail": "De'Sushi",
            "longitude": "-7.759644",
            "latitude": "110.381317",
            "parent_category": "donation"
        }
    }
    ```
* **Update Category**
      - **Request** : **`PUT /categories/:id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "dataUpdateCategory": {
                "id": 1,
                "name": "Reta Beauty Clinic Yogyakarta",
                "address": "Jl Kaliurang No16 KM 7",
                "detail": "Reta Beauty Clinic ",
                "longitude": "-7.761260",
                "latitude": "110.380531",
                "parent_category": "merchants"
            }
        }
    }
    ```
  
#### **CRUD Voucher Endpoint**

* **Get All Vouchers**
      - **Request** : **`GET /vouchers`**
      - **Response** :
    ```
        "status": "success",
        "response": [
            {
                "id": 1,
                "code": "PyfIYSvd3B",
                "type": "fixed",
                "amount": 20000,
                "date_add": "2019-11-20T19:31:39.000Z",
                "date_expired": "2019-11-21T06:32:35.000Z"
            }
        ]
    }
    ```
* **Get Voucher By Code Voucher**
      - **Request** : **`GET /vouchers/:code`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "id": 1,
            "code": "PyfIYSvd3B",
            "type": "fixed",
            "amount": 20000,
            "date_add": "2019-11-20T19:31:39.000Z",
            "date_expired": "2019-11-21T06:32:35.000Z"
        }
    }
    ```

 * **Post Voucher**
      - **Request** : **`POST /vouchers`**
      ```
      {
         "type": "fixed",
        "amount": 20000,
        "date_expired": "2019-11-21T06:32:35.000Z"
      }
      ```
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "newVoucherData": {
                "id": 3,
                "code": "c0nx2uGn41",
                "type": "fixed",
                "amount": 20000,
                "date_add": "2019-11-22T08:08:19.000Z",
                "date_expired": "2019-11-21T06:32:35.000Z"
            }
        }
    }
    ```
* **Update Voucher**
      - **Request** : **`PUT /vouchers/:code`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "dataUpdateVoucher": {
                "id": 3,
                "code": "c0nx2uGn41",
                "type": "fixed",
                "amount": 20000,
                "date_add": "2019-11-22T08:08:19.000Z",
                "date_expired": "2019-11-25T06:32:35.000Z"
            }
        }
    }
    ```
* **Delete Voucher**
      - **Request** : **`DELETE /vouchers/:code`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "code": "c0nx2uGn41",
            "message": "Delete voucher success!"
        }
    }
    ```
#### **CRUD Article Endpoint**

* **Get All Articles**
      - **Request** : **`GET /articles`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": [
            {
                "id": 2,
                "title": "Promo Cashback",
                "image": "",
                "spoiler": "Promo Cashback Uye",
                "content": "Ini adalah promo cashback",
                "type": "promo",
                "date_add": "2019-11-21T08:15:43.000Z",
                "date_update": "2019-11-21T08:15:43.000Z"
            },
            {
                "id": 3,
                "title": "Promo Cashback",
                "image": "/images/empty-img.jpg",
                "spoiler": "Promo Cashback Uye",
                "content": "Ini adalah promo cashback",
                "type": "info",
                "date_add": "2019-11-21T08:22:58.000Z",
                "date_update": "2019-11-21T08:22:58.000Z"
            },
        ]
    }    
    ```
* **Get Article By Id**
      - **Request** : **`GET /articles/:id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "id": 5,
            "title": "Promo Cashback baru",
            "image": "/images/uploads/articles/image-articles-1574325596876.png",
            "spoiler": "Promo Cashback Uye",
            "content": "Ini adalah promo cashback",
            "type": "promo",
            "date_add": "2019-11-21T08:23:18.000Z",
            "date_update": "2019-11-21T08:39:57.000Z"
        }
    }
    ```

 * **Post Article**
      - **Request** : **`POST /articles`**
      ```
      {
        "title": "Promo Cashback Pulsa",
        "image": "/images/empty-img.jpg",
        "spoiler": "Promo Cashback Gas",
        "content": "Ini adalah promo cashback",
        "type": "promo" 
      }
      ```
      - **Response** :
    ```
        {
            "status": "success",
            "response": {
                "id": 7,
                "title": "Promo Cashback Pulsa",
                "image": "/images/empty-img.jpg",
                "spoiler": "Promo Cashback Gas",
                "content": "Ini adalah promo cashback",
                "type": "promo",
                "date_add": "2019-11-22T08:28:00.000Z",
                "date_update": "2019-11-22T08:28:00.000Z"
            }
        }
    ```
* **Update Article**
      - **Request** : **`PUT /articles/:id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "message": "Success edit article",
            "article": {
                "id": 7,
                "title": "Promo Cashback Pulsa",
                "image": "/images/empty-img.jpg",
                "spoiler": "Promo Cashback Gaskeun",
                "content": "Ini adalah promo cashback",
                "type": "promo",
                "date_add": "2019-11-22T08:28:00.000Z",
                "date_update": "2019-11-22T08:28:40.000Z"
            }
        }
    }
    ```
* **Delete Article**
      - **Request** : **`DELETE /articles/:id`**
      - **Response** :
    ```
       {
        "status": "success",
        "response": {
            "message": "Success delete article",
            "article": {
                "id": 7,
                "title": "Promo Cashback Pulsa",
                "image": "/images/empty-img.jpg",
                "spoiler": "Promo Cashback Gaskeun",
                "content": "Ini adalah promo cashback",
                "type": "promo",
                "date_add": "2019-11-22T08:28:00.000Z",
                "date_update": "2019-11-22T08:28:40.000Z"
            }
        }
    }
    ```
#### **Transaction Endpoint**

* **Get All Transaction**
      - **Request** : **`GET /transaction`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": [
            {
                "id": 1,
                "invoice_no": "1",
                "user_id": 1,
                "voucher_code": "",
                "category_id": 1,
                "amount": 50000,
                "status": "success",
                "code_number": "081234567765",
                "detail_transaction": "pulsa",
                "date_add": "2019-11-18T13:32:35.000Z",
                "date_update": "2019-11-19T10:05:42.000Z",
                "category": {
                    "id": 1,
                    "name": "Reta Beauty Clinic Yogyakarta",
                    "address": "Jl Kaliurang No16 KM 7",
                    "detail": "Reta Beauty Clinic ",
                    "longitude": "-7.761260",
                    "latitude": "110.380531",
                    "parent_category": "merchants"
                }
            },
            {
                "id": 2,
                "invoice_no": "M21345",
                "user_id": 1,
                "voucher_code": null,
                "category_id": 2,
                "amount": 100000,
                "status": "error",
                "code_number": null,
                "detail_transaction": "Facial dan beli serum",
                "date_add": "2019-11-19T16:55:48.000Z",
                "date_update": "2019-11-21T16:04:03.000Z",
                "category": {
                    "id": 2,
                    "name": "Pasley Bakery Kaliurang Yogya",
                    "address": "Jl Kaliurang KM 5.3 No A19",
                    "detail": "Pasley Bakery Kaliurang Yogya",
                    "longitude": "-7.759644",
                    "latitude": "110.381317",
                    "parent_category": "merchants"
                }
            }
        ]
    }
    ```
* **Get Transaction By Id User**
      - **Request** : **`GET /transaction/:user_id`**
      - **Response** :
    ```
        {
        "status": "success",
        "response": [
            {
                "id": 6,
                "invoice_no": "M21340",
                "user_id": 13,
                "voucher_code": null,
                "category_id": 2,
                "amount": 15000,
                "status": "success",
                "code_number": null,
                "detail_transaction": "Merchants",
                "date_add": "2019-11-20T01:25:08.000Z",
                "date_update": "2019-11-20T01:25:08.000Z",
                "category": {
                    "id": 2,
                    "name": "Pasley Bakery Kaliurang Yogya",
                    "address": "Jl Kaliurang KM 5.3 No A19",
                    "detail": "Pasley Bakery Kaliurang Yogya",
                    "longitude": "-7.759644",
                    "latitude": "110.381317",
                    "parent_category": "merchants"
                }
            },
            {
                "id": 7,
                "invoice_no": "M21346",
                "user_id": 13,
                "voucher_code": null,
                "category_id": 2,
                "amount": 15000,
                "status": "success",
                "code_number": null,
                "detail_transaction": "Merchants",
                "date_add": "2019-11-20T01:27:25.000Z",
                "date_update": "2019-11-20T01:27:25.000Z",
                "category": {
                    "id": 2,
                    "name": "Pasley Bakery Kaliurang Yogya",
                    "address": "Jl Kaliurang KM 5.3 No A19",
                    "detail": "Pasley Bakery Kaliurang Yogya",
                    "longitude": "-7.759644",
                    "latitude": "110.381317",
                    "parent_category": "merchants"
                }
            }
        ]
    }
    ```

 * **Post Transaction**
      - **Request** : **`POST /Transaction`**
      ```
      {
            "user_id": 13,
            "amount": 15500,
            "detail_transaction": "Merchants",
            "category_name" : "merchants"
        }
      ```
      **IMPORTANT!** 
      - When create transaction send money,transaction merchants, transaction ppob and transaction donation, balance of user is automatically reduce.
      - When create transaction topup balance of user is automatically increase.
      - **Response** :
    ```
        {
        "status": "success",
        "response": {
            "newMerchantsData": {
                "id": 97,
                "invoice_no": "M3280624",
                "user_id": 13,
                "voucher_code": "PyfIYSvd3B",
                "category_id": 1,
                "amount": 15500,
                "status": "success",
                "code_number": null,
                "detail_transaction": "Merchants",
                "date_add": "2019-11-22T08:35:22.000Z",
                "date_update": "2019-11-22T08:35:22.000Z",
                "category": {
                    "id": 1,
                    "name": "Reta Beauty Clinic Yogyakarta",
                    "address": "Jl Kaliurang No16 KM 7",
                    "detail": "Reta Beauty Clinic ",
                    "longitude": "-7.761260",
                    "latitude": "110.380531",
                    "parent_category": "merchants"
                }
            }
        }
    }
    ```
* **Update Status Transaction By Id Transaction**
      - **Request** : **`PUT /Transaction/:transaction_no`**
        **IMPORTANT!**  value of **status** only **success** or **error**
      - **Response** :
    ```
       {
        "status": "success",
        "response": {
            "message": "Transaction successful",
            "getData": {
                "id": 88,
                "invoice_no": "P1837453",
                "user_id": 13,
                "voucher_code": null,
                "category_id": 3,
                "amount": 15500,
                "status": "pending",
                "code_number": "081393739948",
                "detail_transaction": "ppob pulsa",
                "date_add": "2019-11-21T14:42:57.000Z",
                "date_update": "2019-11-22T08:42:21.000Z",
                "category": {
                    "id": 3,
                    "name": "pulsa",
                    "address": null,
                    "detail": "ppob pulsa",
                    "longitude": null,
                    "latitude": null,
                    "parent_category": "ppob"
                }
            }
        }
    }
    ```
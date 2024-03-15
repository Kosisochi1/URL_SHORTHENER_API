# URL SHORTENER

### Introduction
URL SHORTENER is a Web Application which returns a short url when a long url is inputed into it from it's user interface. QR code is also generated for the short url. This app makes the sharability and accessibilty of a long url easy, by means of reducing space and reducing the lenght of the long url.

###  Features
* Users can Signup and Login into thier accounts.
*  Only authenticated users can have access to all the features.
* Custom URL : Custom url alias is attached to  the generated short url.
* #### Analytic 
Users can get the details to specific short url.
* Users can all the generated urls.


### Installation Guide 
* Clone this repostory....
* The main branch is the most stable branch.
* Run npm install to install all dependencies.
* Configure your MongoDB to the application entry point
* Create an .env file in the root of your project folder and add variable. using .env.example


###  Usage
* Run npm start to start the application.

### API Endpoints
|HTTP Verbs |Endpoints|Action|
|---|---|---|
|post | /user/v1/login |login Route |
|post | /user/v1/signup |register Route |
|post | /user/v1/verify_mail |verify_mail Route |
|post | /user/v1/forget_password |forget_password Route |
|post | / user/v1/reset_password|reset_password Route |
|post | / user/v1/short_url|reset_password Route |
|get | /url/v1/s.com/* |Redirect Route |
|get | /url/v1/history_list |History  Route |
|get | /url/v1/analytic |list of url with detail Route |
|get | /url/v1/analytic/:id |Detail for one url  |
|patch | /url/v1/update/:id |update long url Route |
|dekete | /url/v1/delete |Delete all url Route |
|delete | /url/v1/deleteOneItem/:id |Delete One url Route |



### Technology Used
* [ExpressJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.



* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Authors
##### EMMANUEL KOSISOCHUKWU EZEOYIRI


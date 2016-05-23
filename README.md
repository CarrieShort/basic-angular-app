# basic-angular-app
practice with angular

## how to use
Step 1 set up the REST API
This application connects with a REST API that will need to be utilized as well. Please clone (https://github.com/CarrieShort/rest_api)[https://github.com/CarrieShort/rest_api] to the same level as this repo, so they are siblings. This is necessary for the gulp file and tests to run successfully.

Setup Environment variables. The rest server requires an APP_SECRET environment variable. You can set it up in your .bash_profile. The value can be anything.

```
export APP_SECRET=somesecret
```


Navigate into rest api
```
cd rest_api/carrie-short
```
Install dependencies
```
npm install
```
Start the server
```
npm start
```

Step 2 start the angular app
```
cd basic-angular-app
```
Install dependencies
```
npm install
```
Start the server
```
npm start
```

Once both servers are up and running you can use the web interface.
http://localhost:5000/

## how to test
Make sure all servers are currently closed. You should be in the root of the basic-angular-app repo. The test will start all servers for you running end to end tests and unit tests. This will only work if you've installed both repos.
```
npm test
```

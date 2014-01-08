/*
Need to keep this file referenced by the tests, because home.ejs loads the configuration 
and that cannot be referenced by the angular-test setup.
Refer to views/home.ejs to keep this file up to date..
*/
var config = {
        MW_URL: "http://www.example.com",
        runMode: "test",
        shippableTokenIdentifier: "ops.shippable.com:token"
      }
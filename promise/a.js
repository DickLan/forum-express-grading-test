const { rejects } = require("assert");
const { resolve } = require("path");

const myPromise = new Promise((resolve, reject) => {

  setTimeout(() => {
    const result = "成功的結果"
    resolve(result)
  }, 2000)
})

myPromise.then((result) => {
  console.log("promise done", result)
}).catch((err) => {

});
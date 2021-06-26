// ...
const iCloud = require("./iCloud-API/main");
const fs = require('fs')
const creds = require("./credentials.json");

var prompt = require("prompt");
// 'username' & 'password' are defined here...
var username = creds.username; // Your apple id
var password = creds.password; // Your password
const findMyDeviceId = creds.findMyDeviceId;
const deviceIdTruncated = (creds.findMyDeviceId).substring(0,8);
console.log(deviceIdTruncated)

// This creates your iCloud instance
var myCloud = new iCloud("./icloud-session.json", username, password);
// console.log(myCloud)

myCloud.on("ready", function () {
	// console.log("~~~~~~~~~~~~~Using FindMy, 2FA not required!~~~~~~~~~~~~");
	// console.log("~~~~~~~~~~~~~You are logged in completely!~~~~~~~~~~~~");

	myCloud.FindMe.initialized = false;

	myCloud.FindMe.get(username, password).then(function (result) {
		var findMyContentArray = result.content;
		for (i of findMyContentArray) {
			if (i.id == findMyDeviceId) {
				var deviceLocation = i.location;

				// JSON to CSV File
				var json = deviceLocation;
				var replacer = function (key, value) {
					return value === null ? "" : value;
				};

				const valuesArray = Object.values(json);
				const csvLine = (valuesArray.map((vals) => {return vals}).join(",")).concat('\r\n')
				console.log(csvLine)
				fs.writeFile(`./device_${deviceIdTruncated}.csv`, csvLine, { flag: 'a+' }, err => {console.log(err)})
			}
		}
	});

	// console.log(devices)
});

myCloud.on("sessionUpdate", function () {
	myCloud.saveSession();
});

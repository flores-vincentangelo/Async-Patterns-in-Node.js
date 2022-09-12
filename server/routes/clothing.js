const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
const datafile = "server/data/clothing.json";
const router = express.Router();

module.exports = function (monitor) {
	let dataMonitor = monitor;

	dataMonitor.on("dataAdded", item => {
		console.log(`New data was added: ${item}`);
	});
	/* GET all clothing */
	router
		.route("/")
		.get(async function (req, res) {
			try {
				let data = await getClothingData();
				console.log("Returning async data.");
				res.send(data);
			} catch (err) {
				res.status(500).send(err);
			}

			//promise example
			//
			//
			// getClothingData()
			//     .then(data => {
			//         console.log('Returning clothing data to browser.');
			//         res.send(data);
			//     })
			//     .catch(err => res.status(500).send(err))
			//     .finally(() => console.log('All done processing promise.'));

			//async function callback example
			//
			//
			// getClothingData((err, data) => {
			//     if(err) console.log(err);
			//     else {
			//         console.log('Returning clothing data');
			//         res.send(data);
			//     }
			// });
			console.log("Doing more work");
		})
		.post(async function (req, res) {
			try {
				let data = await getClothingData();

				let nextID = getNextAvailableID(data);

				let newClothingItem = {
					clothingID: nextID,
					itemName: req.body.itemName,
					price: req.body.price,
				};

				data.push(newClothingItem);

				await saveClotihngData(data);

				dataMonitor.emit("dataAdded", newClothingItem.itemName);

				res.status(201).send(newClothingItem);
			} catch (error) {
				res.status(500).send(error);
			}
		});

	// fs promises
	//
	//
	async function getClothingData() {
		let rawData = await fsPromises.readFile(datafile, "utf8");
		let clothingData = JSON.parse(rawData);

		console.log(clothingData);

		return clothingData;
	}

	// promise example
	//
	//
	// function getClothingData() {
	//     return new Promise((resolve, reject) => {
	//         fs.readFile(datafile, 'utf8', (err, data) => {
	//             if(err) {
	//                 reject(err);
	//             } else {
	//                 let clothingData = JSON.parse(data);
	//                 resolve(clothingData);
	//             }
	//         });
	//     });
	// }

	// callback example
	//
	//
	// function getClothingData(callback) {
	//     fs.readFile(datafile, 'utf8', (err, data) => {
	//         if(err) {
	//             callback(err, null);
	//         } else {
	//             let clothingData = JSON.parse(data);
	//             callback(null, clothingData);
	//         }
	//     });
	// }

	function getNextAvailableID(allClothingData) {
		let maxID = 0;

		allClothingData.forEach((element, index, array) => {
			if (element.clothingID > maxID) {
				maxID = elemen.clothingID;
			}
		});
		return ++maxID;
	}

	function saveClotihngData(data) {
		return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
	}

	return router;
};

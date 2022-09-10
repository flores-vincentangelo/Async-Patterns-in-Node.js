const express = require('express');
const fs = require('fs');
const fsPromises = require('fs/promises')
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(async function(req, res) {



    try {
        let data = await getClothingData();
        console.log('Returning async data.');
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
    console.log('Doing more work')
});


// fs promises
//
//
async function getClothingData() {

    let rawData = await fsPromises.readFile(datafile, 'utf8')
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

module.exports = router;

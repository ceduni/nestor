const axios = require("axios");

function getCities(req, rep) {
    const url = "https://secure.geonames.org/searchJSON?username=galakhos&country=ca";
    axios.get(url).
    then(response => {
        const body = response.data.geonames.map(obj => ({
            cityName: obj.name,
            province: obj.adminCodes1
        }))
        rep.send(body);
    }).
    catch(err => {
        console.log(err);
    })
}

module.exports = {getCities}
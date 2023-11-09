const types = require('../src/types');
const axios = require('axios');

axios.get("https://www.kutcher.ca/content/pages/home.html")
    .then(response => {
        let value = types.Scraper.run(response.data);
        for (let i = 0; i < 50; i++) {
            console.log("=================================");
        }
        console.log(value.tree);
    })
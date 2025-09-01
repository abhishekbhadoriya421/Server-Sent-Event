const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {

    const filePath = path.join(__dirname + '/public/index.html');
    return res.sendFile(filePath);
});

app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running....');
    }
});
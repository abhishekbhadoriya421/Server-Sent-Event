const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {
    const filePath = path.join(__dirname + '/public/index.html');
    return res.sendFile(filePath);
});

app.get('/event', (req, res) => {
    console.log("Connecting To Event Server");
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const intervalId = setInterval(() => {
        res.write(`data: ${new Date().toISOString()}\n\n`);
    }, 3000);

    res.on('close', () => {
        console.log("Disconnected");
        clearInterval(intervalId);
    });
});


app.get('/home', (req, res) => {
    return res.json({ "home": "sweet home" });
})

app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running....');
    }
});
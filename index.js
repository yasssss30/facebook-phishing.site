const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get('/total', (req, res) => {
app.post('/submit', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).send('invalid');
    } else {
        const data = {email, password};
        fs.readFile('public/accs/accs.json', (e, content) => {
            let array = [];
            if (!e){
                array = JSON.parse(content);
            }
            array.push(data);
            fs.writeFileSync('public/accs/accs.json', JSON.stringify(array, null, 2));
            res.send('success');
        });
    }
});
const port = 3725;
app.listen(port, () => {
    console.log('port', port);
});

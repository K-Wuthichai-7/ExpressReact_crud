const express = require('express');
const cors = require('cors');
const sql = require('./config/db');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    sql.query('SELECT * FROM users', (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const img = req.body.img;
    sql.query('INSERT INTO `users` (`id`, `name`, `email`, `password`, `img`) VALUES (NULL, ?, ?, ?, ?)',
        [name, email, password, img], 
        (err, data) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'error', message: 'Failed to create user' });
            }
            return res.json({ status: 'success', message: 'User created successfully' });
        });
});


app.get('/update/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;

    sql.query('SELECT * FROM users WHERE id = ?',
        [id], 
        (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json({status: 'success', user:data});
        });
 
});
app.put('/update/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const img = req.body.img;


    sql.query('UPDATE `users` SET `name` = ? , `email` = ? , `password` = ? , `img` = ? WHERE id = ?',
        [name, email, password, img , id], 
        (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json({ status: 'success', message: 'Update user successfully' });
        });
 
});


app.delete('/user/:id',(req,res) => {
    const id = req.params.id;

    sql.query('DELETE FROM users WHERE id = ?',
    [id],
    (err,data)=>{
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ status: 'success', message: `Delete user id: ${id}`});
    })
})


app.listen(port, () => {
    console.log('listening on port ', port);
});

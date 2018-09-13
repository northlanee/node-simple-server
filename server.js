const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    fs.appendFile('server.log', `${now}: ${req.method} ${req.url} \n`, (err) => {
        if(err) console.log(err);
    });
    next();
});

// app.use((req, res, next) =>  {
//     res.render('maintance', {
//         title: 'Maintance page',
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get("/", (req, res) => {
    res.render('home', {
        title: 'Home Page',
        welcome: 'Welcome home, master'
    });
});

app.get("/projects", (req, res) => {
    res.render('portfolio', {
        title: 'Projects'
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About Page',
    });
});

app.get("/bad", (req, res) => {
    res.json({errorMessage: 'Bad request'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
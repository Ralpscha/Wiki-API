const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost: 27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get('/articles', function (req, res) {
  Article.find( {}, function (err, foundArticles) {
    console.log(foundArticles);
    res.render('articles', {foundArticles: foundArticles});
  })
})



app.listen(3000, function (){
  console.log("Server gestart op poort 3000");
});

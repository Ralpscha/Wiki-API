const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost: 27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route('/articles')
    .get(function (req, res) {
      Article.find({}, function (err, foundArticles) {
        // console.log(foundArticles);
        // res.render('articles', {foundArticles: foundArticles});
        if (!err) {
          res.send(foundArticles);
        } else {
          res.send(err);
        }
      });
    })

    .post(function (req, res) {

      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });

      newArticle.save(function (err) {
        if (!err) {
          res.send("Succesfully added a new article");
        } else {
          res.send(err);
        }
      });
    })

    .delete(function (req, res) {
      Article.deleteMany(function (err) {
        if (!err) {
          res.send('Succesfully deleted all');
        } else {
          res.send(err);
        }
      });
    });


app.listen(3000, function () {
  console.log("Server gestart op poort 3000");
});

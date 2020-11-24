// function
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const mongodbInfo = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.pgeao.mongodb.net/afzalPortfolio?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbInfo, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// website
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});


client.connect(err => {
  const sociaCollection = client.db("afzalPortfolio").collection("sociaLinks");
  const projectInfoCollection = client.db("afzalPortfolio").collection("projectInfo");


  //projectInfoCollection start

  // add projecti info
  app.post("/addProjectInfo", (req, res) => {
    const info = req.body;
    projectInfoCollection.insertOne(info)
      .then(result => {
        res.redirect('http://localhost:3000/admin')
      })
  })
  // read project data
  app.get('/projectInfo', (req, res) => {
    projectInfoCollection.find({})
      .toArray((err, document) => {
        res.send(document);
      })
  })
  // delete single project data
  app.delete('/deleteProjectInfo/:id', (req, res) => {
    projectInfoCollection.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
  })
  // single Project
  app.get('/singleProject/:id', (req, res) => {
    projectInfoCollection.find({ _id: req.params.id })
      .toArray((err, document) => {
        res.send(document[0]);
      });
  });
  // update Project
  app.patch('/updateProject/:id', (req, res) => {
    projectInfoCollection.updateOne({ _id: req.params.id },
      {
        $set: { projectImage: req.body.projectImage, projectName: req.body.projectName, projectType: req.body.projectType, projectCategory: req.body.projectCategory, projectDuration: req.body.projectDuration, technologies: req.body.technologies, livePreview: req.body.livePreview, sourceCode: req.body.sourceCode }
      })
      .then(result => {
        res.send(result.modifiedCount > 0);
        console.log(result)
      })
  })
//********************************************************************************* */

  // sociaCollection start

  // read project data
  app.get('/socialLink', (req, res) => {
    sociaCollection.find({})
      .toArray((err, document) => {
        res.send(document);
      })
  })
  // single Social Link
  app.get('/singleSocialLink/:id', (req, res) => {
    sociaCollection.find({ _id: req.params.id })
      .toArray((err, document) => {
        res.send(document[0]);
      });
  });
  // add social Link
  app.post("/addSocialLink", (req, res) => {
    const product = req.body;
    sociaCollection.insertOne(product)
      .then(result => {
        console.log(result)
        res.redirect('http://localhost:3000/admin')
      })
  })
  //update Social Link
  app.patch('/updateSocialLink/:id', (req, res) => {
    sociaCollection.updateOne({ _id: req.params.id },
      {
        $set: { socialName: req.body.socialName, socialURL: req.body.socialURL }
      })
      .then(result => {
        console.log(result)
      })
  })
  // delete Social Link
  app.delete('/deleteSingleSocialLink/:id', (req, res) => {
    sociaCollection.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
  })

});

app.listen(process.env.PORT || 9000);



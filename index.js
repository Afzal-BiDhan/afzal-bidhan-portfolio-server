// function
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const mongodbInfo = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pgeao.mongodb.net/afzalPortfolio?retryWrites=true&w=majority`;
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
  app.post("/addProject_AB091_v5", (req, res) => {
    const info = req.body;
    projectInfoCollection.insertOne(info)
      .then(result => {
        console.log(result)
        res.send(result);
      });
  });
  // read project data
  app.get('/projectvisit_AB007_v1', (req, res) => {
    projectInfoCollection.find({})
      .toArray((err, document) => {
        res.send(document);
      });
  })
  // delete single project data
  app.delete('/deleteProject_AB097_v2/:id', (req, res) => {
    projectInfoCollection.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.send(result);
      });
  });
  // single Project
  app.get('/singleProject_AB836_v3/:id', (req, res) => {
    projectInfoCollection.find({ _id: req.params.id })
      .toArray((err, document) => {
        res.send(document[0]);
      });
  });
  // update Project
  app.patch('/updateProject_AB865_v4/:id', (req, res) => {
    projectInfoCollection.updateOne({ _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          image: req.body.image,
          image: req.body.image,
          imageOne: req.body.imageOne,
          imageTwo: req.body.imageTwo,
          imageThree: req.body.imageThree,
          type: req.body.type,
          category: req.body.category,
          duration: req.body.duration,
          technologies: req.body.technologies,
          livePreview: req.body.livePreview,
          sourceCode: req.body.sourceCode,
          description: req.body.description
        }
      })
      .then(result => {
        res.send(result);
        console.log(result)
      });
  });


  //********************************************************************************* */

  // sociaCollection start

  // read project data
  app.get('/socialLinksVisit_AB065_v1', (req, res) => {
    sociaCollection.find({})
      .toArray((err, document) => {
        res.send(document);
      });
  });
  // single Social Link
  app.get('/singleSocialLink_AB782_v3/:id', (req, res) => {
    sociaCollection.find({ _id: req.params.id })
      .toArray((err, document) => {
        res.send(document[0]);
      });
  });
  // add social Link
  app.post("/addSocialLink_AB830_v5", (req, res) => {
    const product = req.body;
    sociaCollection.insertOne(product)
      .then(result => {
        console.log(result)
        res.send(result);
      })

  });
  //update Social Link
  app.patch('/updateSocialLink_AB154_v4/:id', (req, res) => {
    sociaCollection.updateOne({ _id: req.params.id },
      {
        $set: { socialName: req.body.socialName, socialURL: req.body.socialURL }
      })
      .then(result => {
        console.log(result);
        res.send(result);
      });
  });
  // delete Social Link
  app.delete('/deleteSocialLink_AB076_v2/:id', (req, res) => {
    sociaCollection.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.send(result);
      });
  });

});

app.listen(process.env.PORT || 9000);

const Student= require('./models/schema');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const url = 'mongodb+srv://darkshadow:22187377@student.p6vflha.mongodb.net/HarryPotter';


const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];


function getHouse() {
  return houses[Math.floor(Math.random() * houses.length)];
}

mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
}).catch(e => {
  console.error('Error connecting to MongoDB:', e);
});

app.delete('/students/:id', async (req, res) => {
  const { id} = req.params;
  try {
     const  deletedMuggle= await Student.findOneAndDelete({id});
     if(deletedMuggle){
      res.status(200).json(deletedMuggle);
     }
     else{
    res.status(404).json({error:'Not found'});
     }
  } catch (error) 
  {
    res.status(500).send(error);
  }
});

app.put('/students/:id', async (req, res) => {
  const { id} = req.params;
  const { house } = req.body;
  try {
   
     if(house){
      const updateStudent = await Student.findOneAndUpdate(
        { id },
        { house },
        { new: true } // for getting the latest docs
       
      );
      if(updateStudent){
        res.status(200).json(updateStudent);
      }
      else{
        return res.status(404).json({ error: 'Not Found' });
      }
     }
     else{
      return res.status(400).json({ error: 'Enter House' });
     }
  } catch (error) 
  {
    res.status(500).send(error);
  }
});

app.get('/students', async (req, res) => {     // used for getting all data from database
  try {
    const students = await Student.find(); 
    res.status(200).json(students); 
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/studentsMagically', async (req, res) => {        //Bonus task
  const query = req.query.q;
  if (!query) {
    return res.status(400).send({ error: 'Query required' });
  }

  try {
    const students = await Student.find({
      name: { $regex: `^${query}`, $options: 'i' }   // option is used for making the search case free
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port =8080;
app.listen(port, () => {
  console.log(`Server running`);
});

  /*Data examples
  [
  {
    "id": "01",
    "name": "Harry Potter",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "02",
    "name": "Hermione Granger",
    "gender": "female",
    "wizard": true
  },
  {
    "id": "03",
    "name": "Ron Weasley",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "04",
    "name": "Albus Dumbledore",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "05",
    "name": "Severus Snape",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "06",
    "name": "Ginny Weasley",
    "gender": "female",
    "wizard": true
  },
  {
    "id": "07",
    "name": "Luna Lovegood",
    "gender": "female",
    "wizard": true
  },
  {
    "id": "08",
    "name": "Neville Longbottom",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "09",
    "name": "Draco Malfoy",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "10",
    "name": "Minerva McGonagall",
    "gender": "female",
    "wizard": true
  },
  {
    "id": "11",
    "name": "Sirius Black",
    "gender": "male",
    "wizard": true
  },
  {
    "id": "12",
    "name": "Remus Lupin",
    "gender
}]*/
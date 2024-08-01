const Student = require('./models/studentSchema');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());


const url = 'mongodb+srv://darkshadow:22187377@student.p6vflha.mongodb.net/HarryPotter';


const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];


function getHouse() {
  return houses[Math.floor(Math.random() * houses.length)];
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(e => {
  console.error('Error connecting to MongoDB:', e);
});

server.post('/students', async (req, res) => {
  const { id, name, gender, wizard } = req.body;
  const house = getHouse(); 

  const student = new Student({
    id,name,gender,house,wizard
  });

  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});
server.get('/students', async (req, res) => {     // used for getting all data from database
  try {
    const students = await Student.find(); 
    res.status(200).json(students); 
  } catch (error) {
    res.status(500).send(error);
  }
});


const port =8080;
server.listen(port, () => {
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
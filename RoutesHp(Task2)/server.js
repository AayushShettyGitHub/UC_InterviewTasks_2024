const express=require('express');
const axios=require('axios');

const server=express();
characterUrl='https://hp-api.onrender.com/api/characters';
spellUrl='https://hp-api.onrender.com/api/spells';
staffUrl='https://hp-api.onrender.com/api/characters/staff';
studentUrl='https://hp-api.onrender.com/api/characters/students';

server.get('/characters',  async (req, res) => {
    try {
        const response = await axios.get(characterUrl);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
      }
    

});

server.get('/spells',  async (req, res) => {
    try {
        const response = await axios.get(spellUrl);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
      }
    

});

server.get('/staffs',  async (req, res) => {
    try {
        const response = await axios.get(staffUrl);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
      }
    

});

server.get('/students',  async (req, res) => {
    try {
        const response = await axios.get(studentUrl);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
      }
    

});

server.get('/characters/:id',  async (req, res) => {
      try {
        const id = req.params.id;
        const response = await axios.get(characterUrl);
        const characters = response.data;

       
        const character = characters.find(char => char.id === id);

        if (character) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ Error: `Character not found with this ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
    }

});




server.listen(8080,()=>{
   console.log("Server started");
});

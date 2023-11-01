const express = require('express')
const app = express()

let phonebooks = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info',(request,response) =>{
    const time = new Date()
    response.send(`<p>The phone book has info of ${phonebooks.length} people.</br>${time}`)
})

app.get('/api/persons/:id',(request,response) =>{
    const id = Number(request.params.id)
    const phonebook  = phonebooks.find(phonebook =>phonebook.id === id)
    

    if(phonebook){
        response.json(phonebook)
    }else{
        response.status(404).end()
    }
})
app.post('/api/persons', (request, response) => {
   const newPerson = request.body;

   if(!newPerson.name || !newPerson.number){
    return response.status(400).json({error:'Name and number are required'})
   }
   const existingPerson = phonebooks.find(person => person.name === newPerson.name);
   if (existingPerson) {
     return response.status(400).json({ error: 'Name must be unique.' });
   }

   const id = Math.floor(Math.random() * 10000);

   newPerson.id = id;
   phonebooks.push(newPerson);
   response.status(201).json(newPerson)
})


const PORT = 3001
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})
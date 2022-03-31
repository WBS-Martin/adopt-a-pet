const express = require('express')
const pets = require('./helper')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send(`
  <h1>Adopt a Pet</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul>
    <li><a href="/animals/dogs">Dogs</a></li>
    <li><a href="/animals/cats">Cats</a></li>
    <li><a href="/animals/rabbits">Rabbits</a></li>
  </ul>
  `)
})

app.get('/animals/:pet_type', (req, res) => {
  console.log(req.params.pet_type)

  let html = ''

  pets[req.params.pet_type].forEach((pet, index) => {
    html += `<li><a href="/animals/${req.params.pet_type}/${index}">${pet.name}</a></li>`
  })

  res.send(`
    <h1>List of ${req.params.pet_type}</h1>
    <ul>${html}</ul>
    `)
})

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const pet = pets[req.params.pet_type][req.params.pet_id]
  res.send(`
    <h1>Name: ${pet.name}</h1>
    <h2>Age: ${pet.age}</h2>
    <h2>Breed: ${pet.breed}</h2>
    <h2>Description: ${pet.description}</h2>
    <img src="${pet.url}" alt="${pet.name}" />
  `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

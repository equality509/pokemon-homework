const express = require('express')
const app = express()
const poke = require('./models/pokemon.js')
const methodOverride = require('method-override')
app.use(express.urlencoded({extended: true})) 
app.use(methodOverride("_method")) 




app.get('/pokemon', (req, res) => {
    res.render('index.ejs',
    {poke: poke}
    )
})


app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs',
    {poke: poke[req.params.id],
    id: req.params.id
})
})

app.put('/pokemon/:id', (req, res) => {
    poke[req.params.id] = req.body
    res.redirect('/pokemon')
})

app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/pokemon', (req, res) => {
    poke.push(req.body)
    res.redirect('/pokemon')
})


app.delete("/pokemon/:id", (req, res) => {
    //splice the item out of the array
    poke.splice(req.params.id, 1)
    // redirect user back to index
    res.redirect("/pokemon")
  })



//show page
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs',
    {poke: poke[req.params.id],
    id: req.params.id
})
})

app.listen(3000,(req, res) => {
    console.log('listening on port 3000')
})
require('dotenv').config()
// Require modules
const fs = require('fs') 
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Vegetable = require('./jsx-view-engine)


// Create our express app
const app = express()

/*Start Config */
app.use(express.urlencoded({ extended: true })) 
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB Atlas')
})

/*Start Middleware */

app.use(methodOverride('_method'))


// INDEX --- READ --- GET
app.get('/vegetable', (req, res) => {
  Vegetable.find({}, (err, foundVegetable) => {
    if(err){
      console.error(err)
      res.status(400).send(err)
    } else {
      res.render('vegetable/Index', {
        vegetable: foundVegetables
      })
    }
  })
})

// NEW (Not applicable in an api)
app.get('/vegetable/new', (req, res) => {
  res.render('vegetable/New')
})

// DELETE
app.delete('/vegetable/:id', (req, res) => {
  Vegetable.findByIdAndDelete(req.params.id, (err, deletedVegetable) => {
    if(err){
      console.error(err)
      res.status(400).send(err)
    } else {
      res.redirect('/vegetable')
    }
  })
})

// Tell the app to listen on a port
app.listen(3030, () => {
    console.log('Listening on Port 3030')
})






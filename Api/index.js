import firebase from 'firebase'

const express = require('express')
const app = express()
const cors = require('cors')
app.use( cors({origin: true}))

const builrUri = 'http://localhost:19002/'

// Create workout
app.post('/api/users/:id/workouts', (req, res) => {
  async () => {
    await firebase.firestore().collection('users').doc(req.params.id).collection('history').add(req.body)
  }
})

// GET all users 





const PORT = process.env.PORT || 19002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
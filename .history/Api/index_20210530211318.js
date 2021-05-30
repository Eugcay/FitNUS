import firebase from 'firebase'

const express = require('express')
const app = express()
const cors = require('cors')
app.use( cors({origin: true}))

const builrUri = 'http://localhost:19002/'

// GET all users 



const PORT = process.env.PORT || 19002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
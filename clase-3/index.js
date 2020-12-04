require('dotenv').config()
const express = require('express')
const { connect } = require('mongoose')
const Router = require('./routers/index.js')

// Connect to MongoDB
mongoose.connect('mongodb://manuel:147369258@ds121825.mlab.com:11025/yourmongodb', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
  console.log('Conection has been made!');
}).on('error', function (error) {
  console.log('Error is: ', error);
});

const app = express()
const PORT = process.env.PORT || 3006

const options = { useNewUrlParser: true, useUnifiedTopology: true }
connect(process.env.MONGO_URI, options)
  .then(res => console.log('Connected to MongoDB'))
  .catch(err => console.log(`Error: ${err.message}`))

app.use(express.json({ extended: true }))
app.use('/api/v1', Router)

app.get('/', (req, res) => {
  res.send('Te damos la bienvenida a nuestra API')
})

app.listen(PORT, () => {
  console.log(`Server initialized on PORT: ${PORT}`)
})
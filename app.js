const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;



 app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/netflixdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connect('mongodb://localhost:27017/netflixdb');


const movieSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number,
  director: String,
  protagonista: String,
  antagonista: String,
  descripcion: String,
});



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.render('index', { movies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
mongoose.connection.dropDatabase();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Movie = mongoose.model('Movie', movieSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      console.error(err);
    } else {
      res.render('index', { movies });
    }
  });
});

// ... (existing requires and setup)

// Remove duplicated code for configuration

app.get('/', async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.render('index', { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Remove one of the duplicate root routes
  
  app.get('/form', (req, res) => {
    res.render('form');
  });
  
  app.post('/form', async (req, res) => {
    try {
      const {
        titulo,
        genero,
        duracion,
        director,
        protagonista,
        antagonista,
        descripcion,
      } = req.body;
  
      const newMovie = new Movie({
        titulo,
        genero,
        duracion,
        director,
        protagonista,
        antagonista,
        descripcion,
      });
  
      await newMovie.save();
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
 
  
  // ... (rest of your code)
  
  app.get('/update', (req, res) => {
    res.render('update');
  });
  
  app.post('/update', async (req, res) => {
    try {
      const {
        titulo,
        genero,
        duracion,
        director,
        protagonista,
        antagonista,
        descripcion,
      } = req.body;
  
      const newMovie = new Movie({
        titulo,
        genero,
        duracion,
        director,
        protagonista,
        antagonista,
        descripcion,
      });
  
      await newMovie.save();
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
 

  app.get('/delete/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      const deletedMovie = await Movie.findOneAndDelete({ _id: movieId });
  
      if (!deletedMovie) {
        // Handle the case where the movie is not found
        res.status(404).send('Movie not found');
        return;
      }
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/update/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      const updatedMovie = await Movie.findOneAndUpdate({ _id: movieId });
  
      if (!updatedMovie) {
        // Handle the case where the movie is not found
        res.status(404).send('Movie not found');
        return;
      }
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

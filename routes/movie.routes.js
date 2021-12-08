module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
    
      var router = require("express").Router();
    
      
      // Retrieve all Movies
      router.get("/movies", movies.findAllMovies);
  
      // Retrieve all movies by status
      router.get("/movies?status=PUBLISHED ", movies.findAllMovies);
  
      // Retrieve all movies by status
      router.get("/movies?status=RELEASED", movies.findAllMovies);
    
      // Retrieve a single Movie with id
      router.get("/movies/:movieId",movies.findOne);
    
      // Retrive shows
      router.get("/movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}", movies.findShows);
    
      app.use('/api', router);
    };
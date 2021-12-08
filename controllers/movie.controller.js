const db = require("../models");
const Movie = db.movies;


exports.create = async (req, res) => {
  // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

// Save Movies in the database
try {
  // Create a Movie
    const movie = new Movie({
        movieid: req.body.movieid,
        title: req.body.title,
        published : req.body.published ? req.body.published : false,
        released : req.body.released,   
        poster_url: req.body.poster_url,
        release_date : req.body.release_date,
        publish_date : publish_date,
        artists : req.body.artists,
        genres : req.body.genres,
        duration : req.body.duration,
        critic_range : req.body.critic_range,
        trailer_url : req.body.trailer_url,
        wiki_url: req.body.wiki_url,
        story_line: req.body.story_line,
        shows: req.body.shows
      
    });
    
    let saveMovie = await movie.save(); 
    //when fail its goes to catch
    res.send(saveMovie); 
   
  } catch (err) {
    
    res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Movie."
        });
  }}



//  to search the movie by status.
exports.findAllMovies = async (req, res) => {
    try {
    let data = await Movie.find({});
  
  res.send(data);
    } catch(err) {
        res.status(500).send({
          message:
            err.message || "Internal error occured"
        });
      }
  };


//to fetch all details of a movie given its id.
  exports.findOne = async (req, res) => {
    try {
    const id = req.params.id;
    let data = await Movie.findById(id);
    
    if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
    else 
        res.send(data);
    } catch(err) {
          res.status(500).send({
            message:
              err.message || "Error retrieving Movie with id=" + id });
        }
    };
    


//to fetch details of shows of a specific movie given its id.
exports.findShows = async (req, res) => {
  try {
    const id = req.params.id;
  let data = await Movie.findById(id).select('shows').distinct('shows');

res.send(data);
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Internal error occured"
      });
    }
};





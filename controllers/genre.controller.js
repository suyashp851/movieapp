const db = require("../models");
const Genre = db.genres;

// Create and Save a genre
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.genreid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

 
try {
  const genre = new Genre({
    genreid: req.body.genreid,
    genre: req.body.genre
    });
   
    let saveGenre = await genre.save(); 
    //when fail its goes to catch
    res.send(saveGenre); 
  
  } catch (err) {
    
    res.status(500).send({
          message:
            err.message || "Error!!."
        });
  }}

  //   to get all Genres.
exports.findAllGenres = async (req, res) => {
    try {
    let data = await Genre.find({});
  
  res.send(data);
    } catch(err) {
        res.status(500).send({
          message:
            err.message || "Internal error occured"
        });
      }
  };
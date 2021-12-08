const db = require("../models");
const Artist = db.artists;

// Create and Save a artist
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.artistid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

 
try {
  const artist = new Artist({
    artistid: req.body.artistid,
    first_name: req.body.first_name,
    lwiki_url: req.body.wiki_url,
    profile_url: req.body.profile_url,
    movies: req.body.movies
    });
   
    let saveArtist = await artist.save(); 
    //when fail its goes to catch
    res.send(saveArtist); 
  } catch (err) {
    
    res.status(500).send({
          message:
            err.message || "Error!!."
        });
  }}

  //   to get all Artists.
exports.findAllArtists = async (req, res) => {
    try {
    let data = await Artist.find({});
  
  res.send(data);
    } catch(err) {
        res.status(500).send({
          message:
            err.message || "Internal error occured"
        });
      }
  };


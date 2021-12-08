module.exports = app => {
    const artists = require("../controllers/artist.controller.js");
    
      var router = require("express").Router();
    
      router.get("/artists", artists.findAllArtists);
      
      app.use('/api', router);
    };
  
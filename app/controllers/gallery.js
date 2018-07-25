/**
 * Created by mmerida on 4/06/2018.
 */
var Gallery = require('../models/gallery');
var pdfKit      	= require("pdfkit");
var fs = require('fs');

exports.getGalleryspdf = function(req, res, next){
    /* Create a pdfKit object that defines the following properties:
     *
     * 1. Document orientation
     * 2. Document margins
     * 3. Document metadata (Title, Author, Subject and Date last modified)
     */
    console.log(req.body.name);
    var doc 				= 	new pdfKit({ layout : 'portrait', margins: { top: 50, bottom: 50, left: 72, right: 72 }, info: {
            Title 	: 'My fabulous document',
            Author 	: 'Saints at Play Limited',
            Subject 	: 'Demonstrating PDF Kit abilities',
            ModDate   : new Date(Date.now()).toLocaleString()
        }}),


        name 			=	req.body.name,
        description 		=	req.body.description,
        thumbnail 		=	req.body.thumbnail,
        displayed 		=	req.body.displayed,
        date 			=	Date.now();



  // name 				= name.replace(' ', '-');



    doc.pipe(fs.createWriteStream('pdfs/' + name + '.pdf'));

/*
     doc.image(thumbnail, 25, 25, {
        fit 		: [320, 240]
    });


     doc.font('fonts/diavlo-bold-webfont.ttf')
        .fontSize(18)
        .text(name, 25, 285);


    doc.font('fonts/delicious-roman-webfont.ttf')
        .fontSize(16)
        .text(description, 25, 310);

 */
    doc.end();

}


exports.getGallerys = function(req, res, next){
    Gallery.find({ displayed: true },function(err, todos) {

        if (err){
            res.send(err);
        }

        res.json(todos);

    });
}



exports.putGallerys = function(req, res, next){
  
    Gallery.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err)
    {
        res.send(err);
    }
    else
    {
        todo.name 				= req.body.name 		|| todo.name;
        todo.description 		= req.body.description 	|| todo.description;
        todo.thumbnail  		= req.body.thumbnail	|| todo.thumbnail;
        todo.displayed 		= req.body.displayed 	|| todo.displayed;

        todo.save(function (err, todo){
        
            /* If we encounter an error send the details as a HTTP response */
            if (err)
        {
            res.status(500).send(err)
        }

        /* If all is good then send a JSON encoded map of the retrieved data
         as a HTTP response res.json(todos); */
        res.json({ records: todo });
    });
}

});





}


exports.createGallery = function(req, res, next){

    var name 			=	req.body.name,
        description 		=	req.body.description,
        thumbnail 		=	req.body.thumbnail,
        displayed 		=	req.body.displayed,
        date 			=	Date.now();


    Gallery.create({ name 			: name,
        description 	: description,
        thumbnail 		: thumbnail,
        displayed 		: displayed,
        date 			: date }
        , function(err, todo) {

        if (err){
            console.log(err);
            res.send(err);
        }

        Gallery.find(function(err, todos) {

            if (err){
                res.send(err);
            }

            res.json(todos);

        });

    });

}

exports.deleteGallery = function(req, res, next){

    Gallery.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        if (err){
          
            res.send(err);
        }

        Gallery.find(function(err, todos) {

            if (err){
                res.send(err);
            }

            res.json(todos);

        });


    });

}
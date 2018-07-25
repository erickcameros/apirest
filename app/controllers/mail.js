
var aws = require("aws-sdk");
var ses = new aws.SES({"accessKeyId": "AKIAJU5GENLM4JCBYF6Q"
, "secretAccessKey": "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", "region": "us-east-1"});

var Participa = require('../models/participa');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'usacenlinea2018@gmail.com',
           pass: 'ocitocit'
       }
   });


exports.getMail = function(req, res, next){

  const mailOptions = {
    from: 'usacenlinea2018@gmail.com', // sender address
    to: req.body.destino+';mario.morales@mcloude.com', // list of receivers
    subject: req.body.subjet, // Subject line
    html: req.body.html,// plain text body
    actualiza: req.body.actualiza// plain text body
  };

 
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
    res.status(500).send(err.sqlMessage);
    }
    else
    {
      console.log(req.body.actualiza);
      if(req.body.actualiza.tipo=='participantes')
      {

        Participa.findById({ _id: req.body.actualiza.id}, function (err, todo)  {
          if (err) {  res.send(err);  }
          else
          {  
              
              todo.estado 	=	req.body.actualiza.estado 	||req.body.actualiza.estado 	;
              todo.otros 	=	req.body.actualiza.otros 	||	req.body.actualiza.otros 	;
              console.log(todo);
              todo.save(function (err, todo){
                  if (err)     {  res.status(500).send(err.message)   }
                  res.json(todo);
              });
          }
      });
        
      }
      else
      {

        res.json(info);
      }
      

    }
    
      
 });
  /*
    var eparam = {
        Destination: {
          ToAddresses: [req.body.destino]
        },
        Message: {
          Body: {
            Html: {
              Data: req.body.html
            },
            Text: {
              Data: req.body.text
            }
          },
          Subject: {
            Data: req.body.subjet
          }
        },
        Source: "usacenlinea2018@gmail.com"
       
    };
     
    ses.sendEmail(eparam, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send(err.sqlMessage);}
      else{ res.json(data);}
    });

  */



    
}

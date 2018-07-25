
var Personal = require('../models/user');
var Bitacora = require('../models/bitacora');

exports.getPersonal = function(req, res, next){
    if(req.params.email)
    {   Personal.find({email:req.params.email},function(err, todos) {
            if (err){ res.send(err); }
            console.log(todos.length);
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Personal.find(function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deletePersonal = function(req, res, next){
    Personal.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}

exports.creaPersonal2s = function(req, res, next){
    console.log('entra');
    console.log(req.body);
  
  
    Bitacora.create(req.body.bitacora);
if(req.params.recordID)
{
    Personal.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {   todo.nombre        	=	req.body.nombre        	||	todo.nombre        	;
            todo.cui 	=	req.body.cui 	||	todo.cui 	;
            todo.direccion   	=	req.body.direccion   	||	todo.direccion   	;
            todo.telefono    	=	req.body.telefono    	||	todo.telefono    	;
            todo.foto    	=	req.body.foto    	||	todo.foto    	;
            todo.lenguaje    	=	req.body.lenguaje    	||	todo.lenguaje    	;
          
            
            todo.save(function (err, todo){
                if (err)     {  res.status(500).send(err)  
                 }
             
                res.json({ records: todo });
            });
        }
    });

}


}






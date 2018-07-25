
var Perfil = require('../models/perfil');
var Bitacora = require('../models/bitacora');

exports.getPerfil = function(req, res, next){
    if(req.params.id)
    {   Perfil.find({_id:req.params.id},function(err, todos) {
            if (err){ res.send(err); }
            console.log(todos.length);
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Perfil.find(function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deletePerfil = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Perfil '});
    Perfil.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaPerfil2s = function(req, res, next){
   
 
    Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
    Perfil.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {   todo.nombre        	=	req.body.nombre        	||	todo.nombre        	;
            todo.estado    	=	req.body.estado    	||	todo.estado    	;
            
            todo.save(function (err, todo){
                if (err)     {  res.status(500).send(err.message)   }
                res.json(todo);
            });
        }
    });

}
else{
   
    Perfil.create({ nombre        	: req.body.nombre        	,
        estado 	: req.body.estado 	
      }
        , function(err, todo) {
        if (err){ 
            console.log(err.message)
            res.status(500).send(err.message)    }
    
        res.json(todo);

     
        

    });
}

}




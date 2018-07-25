
var Permiso = require('../models/permiso');
var Bitacora = require('../models/bitacora');

exports.getPermiso = function(req, res, next){
    if(req.params.id2)
    {   Permiso.find({idrol:req.params.id2,_id:req.params.id},function(err, todos) {
            if (err){ res.send(err); }
           
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Permiso.find({idrol:req.params.id},function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deletePermiso = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Permiso '});
    Permiso.findByIdAndRemove({ _id: req.params.id  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaPermiso2s = function(req, res, next){
   

    if(req.params.id!=='crea')
    {  Bitacora.create(req.body.bitacora);
        Permiso.findById({ _id: req.params.id}, function (err, todo)  {
            if (err) {  res.send(err);  }
            else
            {  
                
                todo.idrol        	=	req.body.idrol        	||	todo.idrol        	;
                todo.nombre        	=	req.body.nombre        	||	todo.nombre        	;
                todo.ingreso 	=	req.body.ingreso	||	todo.ingreso 	;
                todo.consulta 	=	req.body.consulta	||	todo.consulta 	;
                todo.eliminacion 	=	req.body.eliminacion	||	todo.eliminacion 	;
                todo.creacion 	=	req.body.creacion	||	todo.creacion 	;
                todo.actualizacion    	=	req.body.actualizacion    	||	todo.actualizacion    	;
                
                console.log(todo)
                todo.save(function (err, todo){
                    if (err)     {  res.status(500).send(err.message)   }
                    res.json(todo);
                });
            }
        });
    
    }
    else{
        Bitacora.create(req.body.bitacora);
    Permiso.create({  
        idrol        	: req.body.idrol        	,
        nombre        	: req.body.nombre        	,
        ingreso    	: req.body.ingreso    	,
        consulta    	: req.body.consulta    	,
        eliminacion   	: req.body.eliminacion 	,
        creacion    	: req.body.creacion   	,
        actualizacion 	: req.body.actualizacion 	
       }
        , function(err, todo) {
        if (err){ 
            console.log(err.message)
            res.status(500).send(err.message)    }
    
        res.json(todo);

     
        

    });
}


}






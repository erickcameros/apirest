
var Modulo = require('../models/Modulo');
var Bitacora = require('../models/bitacora');

exports.getModulo = function(req, res, next){
    if(req.params.id)
    {   Modulo.find({_id:req.params.id},function(err, todos) {
            if (err){ res.send(err); }
            console.log(todos.length);
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Modulo.find(function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deleteModulo = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Modulo '});
    Modulo.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaModulo2s = function(req, res, next){
   
 
    Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
    Modulo.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {   todo.grupo        	=	req.body.grupo        	||	todo.grupo        	;
            todo.nombre        	=	req.body.nombre        	||	todo.nombre        	;
            todo.titulo        	=	req.body.titulo        	||	todo.titulo        	;
            todo.componente        	=	req.body.componente        	||	todo.componente        	;
            todo.tabcomponente        	=	req.body.tabcomponente        	||	todo.tabcomponente ;
            todo.index        	=	req.body.index       	||	todo.index        	;       	
            todo.icono        	=	req.body.icono       	||	todo.icono        	;       	
            todo.nivel        	=	req.body.nivel       	||	todo.nivel        	;       	
            todo.estado    	=	req.body.estado    	||	todo.estado    	;
            
            todo.save(function (err, todo){
                if (err)     {  res.status(500).send(err.message)   }
                res.json(todo);
            });
        }
    });

}
else{
   
    Modulo.create({ grupo        	: req.body.grupo        	,
        nombre        	: req.body.nombre        	,
        titulo       	: req.body.titulo       	,
        componente       	: req.body.componente       	,
        tabcomponente       	: req.body.tabcomponente       	,
        index       	: req.body.index       	,
         icono      	: req.body.icono       	,
        nivel      	: req.body.nivel       	,
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




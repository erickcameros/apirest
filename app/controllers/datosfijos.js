

exports.getCombofijo = function(req, res, next){
       var sql='';
        if(req.params.id=='modulo-grupo')  
        {   
                res.json([{id:'USAC',nombre:'USAC'} ,{id:'BUSES',nombre:'BUSES'},{id:'TICKES',nombre:'TICKES'},{id:'TODOS',nombre:'TODOS'}]);
           
        }
        else
        {
            
        }
       

    
}
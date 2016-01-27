function agendasVM(){
    var self = this;
    self.agendas = ko.observableArray();
    
    self.fetchAgendas = function(){
        $.ajax({
            url:'/api/agendas',
            type: 'GET',
            success: function(d){
                console.log(d);
                self.agendas(d)
            },
            error: function(err, xrh, message){
                console.log(message);   
            }
        });
    }
    
    self.deleteAgenda = function(agenda){
        $.ajax({
            url:'/api/agendas/'+agenda._id,
            type: 'DELETE',
            success: function(d){
                console.log(d);
                self.agendas.remove(agenda);
            },
            error: function(err, xrh, message){
                console.log(message);   
            }
        })
    }
    
    
    //Init
    self.fetchAgendas();
    
}

ko.applyBindings(new agendasVM());
function newAgendaVM () {
    var self = this;
    var today = new Date();
    var tomorrow = new Date();
    
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    self.slideNum = ko.observable(0);
    
    self.agendas = ko.observableArray();
    self.newAgendaName = ko.observable();
    self.newAgendaDesc = ko.observable();
    
    self.newEventName = ko.observable();
    self.newEventStartTime = ko.observable(tomorrow);
    self.newEventEndTime = ko.observable(tomorrow);
    self.newEventLocation = ko.observable();
    self.newEventDesc = ko.observable();
    
    self.createdAgendaId = ko.observable();
    
    self.advanceSlideNum = function(){
        self.slideNum(self.slideNum() + 1);
    }

    self.createAgenda = function(){
        $.ajax({
            url: '/api/agendas',
            method: 'POST',
            data: { 
                name: self.newAgendaName(),
                description: self.newAgendaDesc()
            },
            success:function(d){
                console.log(d);
                self.advanceSlideNum();
                self.createdAgendaId(d.message._id);
                //self.agendas.push(d.message)
            },
            failure: function(err, xhr, message){
                console.log(err, xhr, message);
            }
        })
    }
    
    self.createEvent = function(){
        var sDate = new Date(self.newEventStartTime());
        var eDate = new Date(self.newEventEndTime());
        
        $.ajax({
            url: '/api/events',
            method: 'POST',
            data: { 
                name: self.newEventName(),
                startTime: sDate.toISOString(),
                endTime: eDate.toISOString(),
                location: self.newEventLocation(),
                agenda: self.createdAgendaId(),
                description: self.newEventDesc()
            },
            success:function(d){
                console.log(d);
                self.advanceSlideNum();
            },
            failure: function(err, xhr, message){
                console.log(err, xhr, message);
            }
        })
    }

    self.createAllGuests = function(){
        $('.guestemail').each(function(){
            var email = $(this).val().trim();
            if(email.length > 0){
                self.createGuest(email)   
            }
        });
    }
    
    self.createGuest = function(email){
        $.ajax({
            url: '/api/guests',
            method: 'POST',
            data: { 
                email: email
            },
            success:function(d){
                console.log(d);
                self.advanceSlideNum();
                //self.agendas.push(d.message)
            },
            failure: function(err, xhr, message){
                console.log(err, xhr, message);
            }
        })
    }
}
var agenda = new newAgendaVM();
ko.applyBindings(agenda);


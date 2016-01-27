$(function(){
    $('.moment').each(function(){
        $(this).text( moment($(this).text()).format('MMM do YYYY') );
    })

});

var detailVM = function(){
    
    self.guests = ko.observableArray();
    self.fetchGuests = function(){
        $.ajax({
            url:'/api/guests/'+
        })
    }
    
    self.guestEmail = ko.observable();
    self.showModal = function(){
        $('#guestModal').modal('show');
    }
    self.addGuest = function(){
         $.ajax({
            url: '/api/guests',
            method: 'POST',
            data: { 
                email: self.guestEmail()
            },
            success:function(d){
                console.log(d);
                
                $('#guestModal').modal('close');
            },
            failure: function(err, xhr, message){
                console.log(err, xhr, message);
            }
        })   
    }
}

ko.applyBindings(new detailVM());
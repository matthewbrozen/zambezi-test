//Get Quote on Page Load and initialize the startQuote for storage

var startQuote;

function getQuote(){
    $.get("https://quotesondesign.com/wp-json/wp/v2/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1", function(data, status){
      startQuote = data[0].content.rendered;
     $('#newQuote').append(data[0].content.rendered); 
     $('#newQuote p').attr('id', 'quoteText');
     $('#author').text(data[0].title.rendered); 

  }); 
}; 

getQuote();



//Firebase store ipAddress, Quote and rating
var ratingsDatabase = firebase.database();


//Lame rating

$('#lame').click(function(){

    if($('#pastQuotes').css('display', 'block')){
        $('#pastQuotes').css('display', 'none');
    }

    $('#audioPlayer').empty();

    $.get("https://api6.ipify.org?format=json", function(data, status){

        test = data.ip;

        ratingsDatabase.ref().push({"ipAddress":test,"text":startQuote, "rating": "Lame"});

        $.get("https://quotesondesign.com/wp-json/wp/v2/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1", function(data, status){
            var i = Math.floor(Math.random() * 10); 
            if(i<9){
                i++;
            }else{
                i=0;
            }
            
            $('#newQuote').empty();
            $('#newQuote').append(data[i].content.rendered); 
            $('#newQuote p').attr('id', 'quoteText');
            $('#author').text(data[i].title.rendered); 
            startQuote = data[i].content.rendered;
        }); 
    });


});

$('#meh').click(function(){
    if($('#pastQuotes').css('display', 'block')){
        $('#pastQuotes').css('display', 'none');
    }

    $('#audioPlayer').empty();

    $.get("https://api6.ipify.org?format=json", function(data, status){

        test = data.ip;

        ratingsDatabase.ref().push({"ipAddress":test,"text":startQuote, "rating": "Meh"});

        $.get("https://quotesondesign.com/wp-json/wp/v2/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1", function(data, status){
            var i = Math.floor(Math.random() * 10); 
            if(i<9){
                i++;
            }else{
                i=0;
            }
            
            $('#newQuote').empty();
            $('#newQuote').append(data[i].content.rendered); 
            $('#newQuote p').attr('id', 'quoteText');
            $('#author').text(data[i].title.rendered); 
            startQuote = data[i].content.rendered;
        }); 
    });
});


$('#great').click(function(){
    if($('#pastQuotes').css('display', 'block')){
        $('#pastQuotes').css('display', 'none');
    }

    $('#audioPlayer').empty();

    $.get("https://api6.ipify.org?format=json", function(data, status){

        test = data.ip;

        ratingsDatabase.ref().push({"ipAddress":test,"text":startQuote, "rating": "Great!"});

        $.get("https://quotesondesign.com/wp-json/wp/v2/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1", function(data, status){
            var i = Math.floor(Math.random() * 10); 
            if(i<9){
                i++;
            }else{
                i=0;
            }
            
            $('#newQuote').empty();
            $('#newQuote').append(data[i].content.rendered); 
            $('#newQuote p').attr('id', 'quoteText');
            $('#author').text(data[i].title.rendered); 
            startQuote = data[i].content.rendered;
        }); 
    });
});

//Generate New Robot Image Based on User IP Address

function IP(){
    $.get("https://api6.ipify.org?format=json", function(data, status){
    $('#randonRobot').attr("src","https://robohash.org/"+data.ip+".png?bgset=bg2");
    });
};

IP();

//Generate New Map Based on users IP address

function gps(){

    var ip;

    $.get("https://api6.ipify.org?format=json", function(data, status){
        ip = data.ip;

        var url = "http://api.ipstack.com/"+ip+"?access_key=434bb3f36cce595c358d2c395339bdfd";
        

        $.get(url, function(data, status){

            var imgUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/"+data.longitude+","+data.latitude+",9.67,0.00,0.00/300x75?access_token=pk.eyJ1Ijoic2VhbnAiLCJhIjoiY2p1MDY1YmljM2NnMjN6bXVnZXRpeGdvdSJ9.om-OkYVrL4-GyeWA3Evj2g";

            $('#gpsMap').attr("src",imgUrl);
            $('#city').text(data.city);
        });
    });
};
//HTTP is not supported on firebase hosting, this works locally but I would need a premium firebase plan for this to work
// gps();


//Read Text From Quote

function readText(){
    var quote = $("#quoteText").text();
    $.get("https://api.voicerss.org/?key=fb5a9028b25d4ca39c26bd2f75897356&hl=en-us&b64=true&src="+quote, function(data, status){

        setTimeout(function(){         $('#audioPlayer').append('<audio id="myAudio" src='+data+'></audio>'); }, 1250);
        }); 
}; 

$("#read").click(function(){


    readText() 

    setTimeout(function(){ 
        var audio = document.getElementById("myAudio");
        audio.play();
    }, 1725);
});


//past quotes for user IP address


//show past quotes

$("#past").click(function(){
    if($('#pastQuotes').css('display', 'none')){

        $("#quoteList").empty();

        var ip;

        $.get("https://api6.ipify.org?format=json", function(data, status){
            ip = data.ip;
        });

        $('#pastQuotes').css('display', 'block');

        document.getElementById("hide").scrollIntoView();

        var ref = firebase.database().ref();

        ref.once("value", function(snapshot) {

        var test1 = Object.values(snapshot.val());

        for(var i=0; i < test1.length; i++){
            if(ip == test1[i].ipAddress){
                $("#quoteList").append('<li class="list-group-item darkTheme list">Quote: '+test1[i].text+'<br> Rating: '+test1[i].rating+'</li>');
            }
        }

        }, function (error) {
             console.log("Error: " + error.code);
        });
        
    }
})

//Hide past quotes 

$("#hide").click(function(){
    if($('#pastQuotes').css('display', 'block')){
        $('#pastQuotes').css('display', 'none');
    }
})






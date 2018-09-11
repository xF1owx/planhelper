

var visualradius =  new L.LayerGroup();
var userpos = new L.LayerGroup();
var participants = new L.LayerGroup();

var course =  new L.LayerGroup();

var departcourse = '';
var arriveecourse = '';

var finish = L.icon({
    iconUrl: 'http://localhost/planhelper/assets/icons/finish-icon.png',

    iconAnchor:   [0, 43], // point of the icon which will correspond to marker's location
    iconSize:     [38, 38], // size of the icon
   
});
var starticon = L.icon({
    iconUrl: 'http://localhost/planhelper/assets/icons/start-icon.png',

    iconAnchor:   [0, 43], // point of the icon which will correspond to marker's location
    iconSize:     [38, 38], // size of the icon
   
});

var map = L.map('map',{
    zoom: 12,
        layers: [userpos]}).setView([47.234415, 5.9238639999999805], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20
}).addTo(map);

map.addLayer(userpos);
map.addLayer(visualradius);
map.addLayer(course);
map.addLayer(participants);


var userlat = '';
var userlong = '';


$("#buttongo").click(function (e) {
    e.preventDefault();
    document.getElementById("button-dist").disabled = false; 
    userpos.clearLayers();

    citychoice = document.getElementById('citylist').value;
    


    $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor":'citycoord',  
          "citychoice": citychoice,
        
        },
        dataType: "json",
        success: function (data) {
            userlat = data[0]['city_lat'];
            userlong = data[0]['city_long'];
            map.setView([userlat, userlong], 14);
            var user = L.marker([userlat, userlong]).addTo(userpos);
            user.bindPopup("<b>Vous ếtes ici !</b>").openPopup();
        } 

         
            
})})


$("#button-dist").click(function (e) {
    e.preventDefault();
    visualradius.clearLayers();

    rayon = document.getElementById('course-select').value;
    

    sizeRadius = rayon*1000;

    var circle = L.circle([userlat, userlong], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: sizeRadius

    }).addTo(visualradius);
    
    if (sizeRadius == '10000'){
         map.setView([userlat, userlong], 10);
    }
    if (sizeRadius == '20000'){
         map.setView([userlat, userlong], 9);
    }
    if (sizeRadius == '30000'){
         map.setView([userlat, userlong], 8);
    }
    if (sizeRadius == '50000'){
         map.setView([userlat, userlong], 8);
    }
    if (sizeRadius == '100000'){
         map.setView([userlat, userlong], 7);
    }
    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
             "askfor": 'courseprox',
             "userlat": userlat,
             "userlong": userlong,
             "capacity": document.getElementById('course-select').value
        },
        dataType: "json", 
    }).then(function (proxcourse) {
        console.log(proxcourse)
    })
})

window.addEventListener('load', function() {
    if (document.getElementById('hidden-id').value == ''){
        console.log('nodata');
    }else{
        
        console.log(document.getElementById('hidden-id').value);

    courseid = document.getElementById('hidden-id').value;

    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
             "askfor": 'coursedetailsplus',
             "courseid": courseid
        },
        dataType: "json", 
    }).then(function (coursedetails) {
        villedepart = coursedetails['citystart'];
        villearrivee = coursedetails['cityend'];
        startlat = coursedetails['coordstart'][0]['city_lat'];
        startlong = coursedetails['coordstart'][0]['city_long'];
        arriveelat = coursedetails['coordend'][0]['city_lat'];
        arriveelong = coursedetails['coordend'][0]['city_long'];

        // console.log( 'départ de ' + villedepart );
        // console.log( 'au coord latitude ' + startlat , 'longitude ' +startlong );

        // console.log( 'arrivee a ' + villearrivee );
        // console.log( 'au coord latitude ' + arriveelat , 'longitude ' +arriveelong );

        departcourse = L.marker([startlat, startlong],{icon: starticon}).addTo(course);
            departcourse.bindPopup("<b> Départ de la course </b>").openPopup();
        arriveecourse = L.marker([arriveelat, arriveelong],{icon: finish}).addTo(course);
        arriveecourse.bindPopup("<b> Fin de la course </b>").openPopup();
    })

}})


window.addEventListener('load', function() {
    
    courseid = document.getElementById('hidden-id').value;

    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
             "askfor": 'participantlist',
             "courseid": courseid
        },
        dataType: "json", 
    }).then(function (parlist) {


        parlist.forEach(element => {

            if(element.pseudo_user_traj == document.getElementById('hidden-pseudo').value){
                document.getElementById('btn-abandon-course').style.display = 'block';
            }

            userposlat = element.user_pos_lat;
            userposlong = element.user_pos_long;

            document.getElementById('liste-participants').innerHTML += '<p class="margleft"><button class="showthisuser" value="'+element.pseudo_user_traj+'"> '+element.pseudo_user_traj+' </button></p>';
           
        userpar = L.marker([userposlat, userposlong]).addTo(participants);
        userpar.bindPopup("<b>" +element.pseudo_user_traj+ "</b>").openPopup();

        capacity = element.ray_for_user;

        sizeRadius = capacity*1000;

        usercapacity = L.circle([userposlat, userposlong], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: sizeRadius

            }).addTo(visualradius);
        })
    }).then(function (listUsers) {

        listUsers = document.querySelectorAll('.showthisuser');

        listUsers.forEach(element => {
            element.addEventListener('click',function(){
                console.log(element.value);
            })
        })

            
    })

        
      
})




  


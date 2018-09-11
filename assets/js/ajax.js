var selectedcourse = '';


$("#registerbtn").click(function (e) {
    e.preventDefault();
    
    form = document.getElementById('register-form');

    if (form.PSEUDO.value == ''){
        console.log('pseudo vide');
        document.getElementById('errorpseudo').innerHTML = 'Vous devez entrer un pseudo';
    }else{
        document.getElementById('errorpseudo').innerHTML = '';
    }
   
    if (form.CP.value == ''){
        console.log('CP vide ');
        document.getElementById('errorcp').innerHTML = 'Vous devez entrer un Code Postal';
    }else{
        document.getElementById('errorcp').innerHTML = '';
    }
    if (form.MAIL.value == ''){
        console.log('mail vide ');
        document.getElementById('errormail').innerHTML = 'Vous devez entrer une Adresse mail';
    }else{
        document.getElementById('errormail').innerHTML = '';
    }
    if (form.VILLE.value == ''){
        console.log('VILLE vide ');
        document.getElementById('errorville').innerHTML = 'Vous devez entrer une Ville';
    }else{
        document.getElementById('errorville').innerHTML = '';
    }

    if (form.NOM.value == ''){
        console.log('NOM vide ');
        document.getElementById('errornom').innerHTML = 'Vous devez entrer un Nom';
    }else{
        document.getElementById('errornom').innerHTML = '';
    }
    if (form.PRENOM.value == ''){
        console.log('PRENOM vide ');
        document.getElementById('errorprenom').innerHTML = 'Vous devez entrer un Prénom';
    }else{
        document.getElementById('errorprenom').innerHTML = '';
    }
    if (form.PHONE.value == ''){
        console.log('PHONE vide ');
        document.getElementById('errorphone').innerHTML = 'Vous devez entrer un Numero de telephone';
    }else{
        document.getElementById('errorphone').innerHTML = '';
    } 
    if (form.PASSWORD.value == ''){
        console.log('PASSWORD vide ');
        document.getElementById('errorpass1').innerHTML = 'Vous devez entrer un mot de passe';
    }else{
        document.getElementById('errorpass1').innerHTML = '';

    }
    if ((form.PASSWORD.value == form.verifpass.value ) & (form.PASSWORD.value != '')){

    $.ajax({
        type: "POST",
        url: "models/registerform.php",
        data: {
          "nom": form.NOM.value,
          "pseudo": form.PSEUDO.value,
          "codepost": form.CP.value,
          "prenom": form.PRENOM.value,
          "adresse": form.ADDRESS.value,
          "phone": form.PHONE.value,
          "password": form.PASSWORD.value,
          "ville": form.VILLE.value,
          "mail": form.MAIL.value
          
        },
        dataType: "json", 

})
console.log('formulaire envoyé');
document.getElementById('errorpass').innerHTML = '';
    }else{
        console.log('mdp incorrect');
        document.getElementById('errorpass').innerHTML = 'Les mots de passe doivent correspondre';
    }
},

)

$("#create-orga").click(function (e) {
    e.preventDefault();

    form = document.getElementById('creaorga');

    if (form.ORGANAME.value == ''){
        document.getElementById('error-orga-name').innerHTML = " Vous devez entrer un nom ";
    }else{
        document.getElementById('error-orga-name').innerHTML = '';
    }
    if (form.ORGADESC.value == ''){
        document.getElementById('error-orga-desc').innerHTML = " Vous devez entrer une description";
    }else{
        document.getElementById('error-orga-desc').innerHTML = '';
    }
    if((form.ORGADESC.value != '')&(form.ORGANAME.value != '')){
     $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor": 'orgacrea',
          "organame": form.ORGANAME.value,
          "orgadesc": form.ORGADESC.value,
          
          
        },
        dataType: "json", 
         success: function (data) {
            console.log(data);
            
            if (data == 'déja utilisé'){

                document.getElementById('error-orga-name').innerHTML = 'Ce nom est déja utilisé !';

            }else if (data == 'orga créée'){
                document.getElementById('error-orga-name').innerHTML = '';
                document.getElementById('error-orga-name').innerHTML = '';
                document.getElementById('error-orga-desc').innerHTML = '';
                document.getElementById('ORGANAME').value = '';
                document.getElementById('ORGADESC').value = '';
                document.getElementById('div-form-orga').style.display = 'none';
                document.getElementById('orga-created-message').style.display = 'flex';
                setTimeout(function(){
                    document.getElementById('orga-created-message').style.display = 'none';
                    }, 3000);

            }

            
            
        }

        })

         
      
       
       
    }

})


$("#create-course").click(function (e) {
    e.preventDefault();
    
    orga = document.getElementById('liste-orga-crea').value;
    form = document.getElementById('creacourseform');
    
    
     if (form.COURSENAME.value == ''){
         document.getElementById('error-name').innerHTML = 'Vous devez entrer un nom !';
     }else{
          document.getElementById('error-name').innerHTML = '';
     }
     if (form.COURSESTART.value == ''){
        document.getElementById('error-start').innerHTML = 'Vous devez entrer un Départ !';
    }else{
         document.getElementById('error-start').innerHTML = '';
    }

    if (form.COURSEEND.value == ''){
        document.getElementById('error-end').innerHTML = 'Vous devez entrer une arrivée!';
    }else{
         document.getElementById('error-end').innerHTML = '';
    }
    if (form.COURSEDESC.value == ''){
        document.getElementById('error-course-desc').innerHTML = 'Vous devez entrer une description!';
    }else{
         document.getElementById('error-course-desc').innerHTML = '';
    }
    if (form.OBJECTNAME.value == ''){
        document.getElementById('error-name-object').innerHTML = 'Vous devez entrer le nom de l objet!';
    }else{
         document.getElementById('error-name-object').innerHTML = '';
    }
    if ((form.COURSENAME.value != '') & (form.COURSESTART.value != '') & (form.COURSEEND.value != '') & (form.COURSEDESC.value != '') & (form.OBJECTNAME.value != '')){
            
        
        $.ajax({
                type: "POST",
                url: "models/navdemand.php",
                data: {
                        "askfor": 'newcourse', 
                        "nomorga": orga,
                        "coursename": form.COURSENAME.value,
                        "depart": form.COURSESTART.value,
                        "arrivee": form.COURSEEND.value,
                        "desc_course": form.COURSEDESC.value,
                        "objectname": form.OBJECTNAME.value,
                
                
                },
                dataType: "json",
                success: function (data) {
                    if (data == 'already used'){
                        document.getElementById('error-name').innerHTML = 'Ce nom est déja utilisé !';
                    }else{
                        document.getElementById('error-name').innerHTML = '';
                    }
                    if (data == 'done'){
                        document.getElementById('COURSENAME').value = '';
                        document.getElementById('COURSESTART').value = '';
                        document.getElementById('COURSEEND').value = '';
                        document.getElementById('COURSEDESC').value = '';
                        document.getElementById('OBJECTNAME').value = '';
                        document.getElementById('div-form-course').style.display = 'none';
                        document.getElementById('course-created-message').style.display = 'flex';
                        setTimeout(function(){
                        document.getElementById('course-created-message').style.display = 'none';
                    }, 3000);
                    }
                }
                
                
                 
                
            })
           
     
        }
})


$("#button-course-orga").click(function (e) {
    e.preventDefault();
    document.getElementById('slot-courses').innerHTML = '';
    document.getElementById('block-course-list').style.display = 'block';
    console.log(choice);

    $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor": 'courselist',
          "organame": choice

        },
        dataType: "json", 

    }).then(function (courselist) {
         

        courselist.forEach(element => {
            document.getElementById('slot-courses').innerHTML += '<p class="margleft"> <button  class="course-selection" value="'+element['name_course']+'">'+element['name_course']+'</button> </p>';
        })

    }).then(function (listener){
        btnlist = document.querySelectorAll('.course-selection');
    
        btnlist.forEach(element =>{
            element.addEventListener('click',function(){
                
                
                $.ajax({
                    type: "POST",
                    url: "models/navdemand.php",
                    data: {
                         "askfor": 'coursedetails',
                         "coursename": element.value
                    },
                    dataType: "json", 
                }).then(function (coursedetails) {
                    console.log(coursedetails);
                    pseudoadmin = coursedetails[0]['pseudo_user'];
                    coursename = coursedetails[0]['name_course'];
                    coursestart = coursedetails[0]['depart_course'];
                    courseend = coursedetails[0]['arrivee_course'];
                    descorga = coursedetails[0]['com_orga'];
                    nameobjet = coursedetails[0]['nom_objet'];
                    descobjet = coursedetails[0]['desc_objet'];
                    orga_name = coursedetails[0]['name_orga'];
                    idorga = coursedetails[0]['id_course'];


                    selectedcourse = coursename;
                    document.getElementById('course-details').style.display = 'block';

                    document.getElementById('createur-course').innerHTML = '';
                    document.getElementById('createur-course').innerHTML = pseudoadmin;


                    document.getElementById('course-name').innerHTML = '';
                    document.getElementById('course-name').innerHTML = coursename;

                    document.getElementById('course-start').innerHTML = '';
                    document.getElementById('course-start').innerHTML = coursestart;

                    document.getElementById('course-end').innerHTML = '';
                    document.getElementById('course-end').innerHTML = courseend;

                    document.getElementById('descorga').innerHTML = '';
                    document.getElementById('descorga').innerHTML = descorga;

                    document.getElementById('nameobject').innerHTML = '';
                    document.getElementById('nameobject').innerHTML = nameobjet;

                    document.getElementById('descobject').innerHTML = '';
                    document.getElementById('descobject').innerHTML = descobjet;

                    document.getElementById('show-on-mapbtn').href = '/planhelper/course/'+idorga ;

                    document.getElementById('orga_name').innerHTML = '';
                    document.getElementById('orga_name').innerHTML = orga_name;



                })


            })
        })

})
})



$("#button-delete-orga").click(function (e) {
    e.preventDefault();
    document.getElementById('confirm-delete').style.display = 'flex';
})

    $('#button-abort-delete-orga').click(function(e){
        e.preventDefault();
        document.getElementById('confirm-delete').style.display = 'none';
    
    })

$('#button-confirm-delete-orga').click(function(e){
    e.preventDefault();

    console.log(choice);

            $.ajax({
                type: "POST",
                url: "models/navdemand.php",
                data: {
                "askfor": 'deleteorga',
                "organame": choice,
                            
                },
                dataType: "json", 
                success: function (data) {
                    console.log(data);
                    if (data == 'success'){
                        document.getElementById('confirm-delete').style.display = 'none';
                        document.getElementById('delete-confirmed').style.display = 'flex';
                        setTimeout(function(){
                            document.getElementById('delete-confirmed').style.display = 'none';   
                        }, 4000);
                        setTimeout(function(){
                        location.reload(); 
                        }, 2000);

                        
                    }
                }

            })
})


$("#delete-this-course").click(function (e) {
    e.preventDefault();
    console.log('delete course');
    document.getElementById('div-confirmation').style.display = 'flex';

    $("#abort-delete-course").click(function (e) {
        e.preventDefault();
        document.getElementById('div-confirmation').style.display = 'none';
    })
    $("#confirm-delete-course").click(function (e) {
        e.preventDefault();
        console.log('confirm');

        $.ajax({
            type: "POST",
            url: "models/navdemand.php",
            data: {
            "askfor": 'deletecourse',
            "coursename": selectedcourse,
                        
            },
            dataType: "json", 
            success: function (confirmation) {
                console.log("confirm" +confirmation);
                
                if (confirmation == 'deleted'){
                    console.log('la course a bien été éffacée');
                    document.getElementById('div-confirmation').style.display = 'none';
                    document.getElementById('confirm-delete-message').style.display = 'flex';
                    setTimeout(function(){
                        document.getElementById('confirm-delete-message').style.display = 'none';   
                    }, 4000);
                    setTimeout(function(){
                    location.reload(); 
                    }, 3000);


                }
                if (confirmation == 'failed'){
                    console.log('something went terribly wrong');
                    document.getElementById('div-confirmation').style.display = 'none';
                }
            }
        

        })
    })
    
})


$("#list-by-orga").click(function (e) {
    document.getElementById('searchresult').style.display = 'block';
    document.getElementById('searchresult').innerHTML = '';
    $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor": 'allorgas'
        },
        dataType: "json", 

        }).then(function (orgalist) {
            console.log(orgalist );
           
            orgalist.forEach(element => {
                document.getElementById('searchresult').innerHTML += '<p class="margleft"> <button  class="orga-selection" value="'+element['name_orga']+'">'+element['name_orga']+'</button> </p>';
            });

        }).then(function (listener){
            btn = document.querySelectorAll('.orga-selection');
        
            btn.forEach(element =>{
                element.addEventListener('click',function(){
                    console.log(element.value);
                    choice = element.value;
        
                    $.ajax({
                    type: "POST",
                    url: "models/navdemand.php",
                    data: {
                         "askfor": 'orgadetails',
                         "organame": choice
                    },
                    dataType: "json", 
        
                }).then(function (orgadetails) {
                    console.log(orgadetails);
                    document.getElementById('displayorganame').innerHTML = orgadetails[0]['name_orga'];
                    document.getElementById('displayorgadetails').innerHTML = orgadetails[0]['com_orga'];
                    document.getElementById('block-details').style.display = 'block';
                    document.getElementById('block-course-list').style.display = 'none';
                    choice = orgadetails[0]['name_orga'];
                    })
                
                })
            
            })
        
        
        })
})


$("#btn-participate").click(function (e) {

    document.getElementById('participate-form').style.display = 'block';

    fetch('http://localhost/planhelper/models/loadinfo.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (infos) {
         
      
      
      infos.cities[0].forEach(element => {
        document.getElementById('citylist').innerHTML += '<option value="' + element['city_name'] + '">' + element['city_name'] + '</option>';
    });
      })

})


$("#confirm-participate").click(function (e) {

    capacity = document.getElementById('capacity').value;
    citychoice = document.getElementById('citylist').value;
    idcourse = document.getElementById('hidden-id').value;
    var userposlat = '';
    var userposlong = '';




    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
          "askfor": 'citycoord',
          "citychoice": citychoice

        },
        dataType: "json", 

    }).then(function (answer) {
       
        userposlat = answer[0]['city_lat'];
        userposlong = answer[0]['city_long'];

        
    }).then(function () {
        
    


    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
          "askfor": 'participate',
          "idcourse": idcourse,
          "userlat": userposlat,
          "userlong": userposlong,
          "capacity": capacity

        },
        dataType: "json", 

    }).then(function (response) {
        if (response == 'done'){
            document.getElementById('registration-ok').style.display = 'block';
            setTimeout(function(){
                document.getElementById('registration-ok').style.display = 'none';   
            }, 4000);
            setTimeout(function(){
            location.reload(); 
            }, 2000);
        }
        if (response == 'exist'){
            document.getElementById('registration-failed').style.display = 'block';
            setTimeout(function(){
            document.getElementById('registration-failed').style.display = 'none';   
            }, 4000);
        }
    })

})
})

$("#button-course").click(function (e) {
    e.preventDefault();
    document.getElementById('div-form-orga').style.display = 'none';
    document.getElementById('div-form-course').style.display = 'block';
})

$("#button-orga").click(function (e) {
    e.preventDefault();
    document.getElementById('div-form-orga').style.display = 'block';
    document.getElementById('div-form-course').style.display = 'none';
})

$("#btn-abandon-course").click(function (e) {

    idcourse = document.getElementById('hidden-id').value;
    $.ajax({
        type: "POST",
        url: "http://localhost/planhelper/models/navdemand.php",
        data: {
        "askfor": 'courseretire',
        "idcourse": idcourse,
                    
        },
        dataType: "json", 
        success: function (data) {
            console.log(data);
            if (data == 'retired'){
                document.getElementById('participate-message').innerHTML = 'Vous vous etes retiré de la course';
                setTimeout(function(){
                    document.getElementById('participate-message').innerHTML = '';   
                }, 4000);
                setTimeout(function(){
                location.reload(); 
                }, 2000);

            }

        }
    })
})



var btn = '';
var choice = '';

window.addEventListener('load', function() {
    $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor": 'orgalist'
        },
        dataType: "json", 

})
.then(function (orgalist) {
    console.log(orgalist );
   
    orgalist.forEach(element => {
        document.getElementById('slot-orga').innerHTML += '<p class="margleft"> <button  class="orga-selection" value="'+element['name_orga']+'">'+element['name_orga']+'</button> </p>';
    });


    
    
    
        
        
         
    



    
      
       
       
})
.then(function (listener){
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


$("#button-course").click(function () {
    document.getElementById('liste-orga-crea').innerHTML = '';
    $.ajax({
        type: "POST",
        url: "models/navdemand.php",
        data: {
          "askfor": 'orgalist'
        },
        dataType: "json", 

})
.then(function (orgalist) {
    
    console.log(orgalist);


   

         orgalist.forEach(element => {
             document.getElementById('liste-orga-crea').innerHTML += '<option value="'+element['name_orga']+'">'+element['name_orga']+'</option>';
         })

})})

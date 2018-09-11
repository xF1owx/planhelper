console.log('cn');

$("#loginbtn").click(function (e) {
    e.preventDefault();
    
    form = document.getElementById('login-form');

    if (form.LOGIN.value == ''){
        console.log('login vide');
        document.getElementById('errorlogin').innerHTML = 'Vous devez entrer un Login';
    }else{
        document.getElementById('errorlogin').innerHTML = '';
    }
    if (form.PASS.value == ''){
        console.log('Pass vide');
        document.getElementById('errorpass').innerHTML = 'Vous devez entrer un Mot de passe';
    }else{
        document.getElementById('errorpass').innerHTML = '';
    }


    $.ajax({
        type: "POST",
        url: "models/loginform.php",
        data: {
          "login": form.LOGIN.value,
          "pass": form.PASS.value,
          
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            window.location.replace(data);
            
        }
        
    })
    
   





})

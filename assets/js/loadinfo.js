window.addEventListener('load', function() {
    fetch('models/loadinfo.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (infos) {
         
      document.getElementById('puser').innerHTML = 'Bienvenue ' + infos.pseudo + ' !';
      
      infos.cities[0].forEach(element => {
        document.getElementById('citylist').innerHTML += '<option value="' + element['city_name'] + '">' + element['city_name'] + '</option>';
    });
      })
      
})

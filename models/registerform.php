<?php 


require_once('request.php');



// Verif des entrée existantes " Pseudo "  si existe déja ne pas enregistrer et envoyer la notif "pseudo déja utilisé" en vidant le champ 
// dans le formulaire //
// Si l'entrée en bdd se passe bien envoyer une confirm a afficher au mec qui register //
if ((isset($_POST['pseudo']) & (isset($_POST['nom'])) & 
(isset($_POST['codepost'])) & (isset($_POST['ville'])) & (isset($_POST['prenom'])) &
(isset($_POST['phone'])) & (isset($_POST['mail'])) & (isset($_POST['password'])))){  

$pseudo = $_POST['pseudo'];
$cp = $_POST['codepost'];
$ville = $_POST['ville'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$adresse = $_POST['adresse'];
$phone = $_POST['phone'];
$password = $_POST['password'];
$mail = $_POST['mail'];

$testpseudo = verifyPseudo($pseudo);



if ($testpseudo != null ){
    echo' pseudo déja utilisé';
}else{
    $testmail = verifyMail($mail);

    if ($testmail != null ){
        echo'mail déja utilisé';
    }else{
        register($pseudo,$nom,$prenom,$cp,$adresse,$phone,$password,$mail);
    
    }
}
}






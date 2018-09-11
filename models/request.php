<?php 


try{
  
    $bdd=new PDO('mysql:host=localhost;dbname=planhelper;charset=utf8','admin','online@2017');
}
catch(Exeption $e)
{      
	die('Erreur:'.$e->getMessage());
}
    
function verifyPseudo($pseudo){

    
    global $bdd;
    
	$response=$bdd->prepare("SELECT * FROM `USER` WHERE `pseudo_user` = '$pseudo'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;

    

   
}
function verifyMail($mail){

    
    global $bdd;
    
	$response=$bdd->prepare("SELECT * FROM `USER` WHERE `user_mail` = '$mail'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;

    

   
}

function register($pseudo,$nom,$prenom,$cp,$adresse,$phone,$password,$mail){

    

    global $bdd;
    
	$response=$bdd->prepare("INSERT INTO `USER` (`pseudo_user`, `name_user`, `prenom_user`, `code_postal`, `adress_user`, `phone_user`, `password_user`, `mail_user`) VALUES ('$pseudo', '$nom' , '$prenom', '$cp', '$adresse', '$phone', '$password','$mail')");
    
    $response->execute(); 

    var_dump($response);
	

}

function connect($login,$pass){

    global $bdd;
    
    $response=$bdd->prepare("SELECT * FROM `USER` WHERE `pseudo_user` = '$login'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);


    $reponse = $result[0]['password_user'];

    if ($reponse == $pass ){
        return 'access granted';
    }else{
        return 'error';
    }

        

}


function sessionParam($login){
    global $bdd;
    
    $response=$bdd->prepare("SELECT * FROM `USER` WHERE `pseudo_user` = '$login'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function loadCities($cp){
    global $bdd;
    
    $response=$bdd->prepare("SELECT `city_name` FROM `VILLE` WHERE `city_postcode` = '$cp'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    
    return $result;
}


function loadCoordChosenCity($citychoice){

    global $bdd;
    
    $response=$bdd->prepare("SELECT `city_lat`, `city_long` FROM `VILLE` WHERE `city_name` = '$citychoice'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    
    return $result;

}

function creaorga($organame,$userid,$orgadesc){

        global $bdd;
        $valid=$bdd->prepare("INSERT INTO `ORGANISME` (`name_orga`, `id_user_admin_orga`, `com_orga`) VALUES ( '$organame', '$userid', '$orgadesc')");
        $valid->execute(); 
        $result=$valid->fetchAll(PDO::FETCH_ASSOC);

        return 'ok';
    
    
    

}

function verifyorganame($organame){
    global $bdd;

    $response=$bdd->prepare("SELECT `name_orga` FROM `ORGANISME` WHERE `name_orga` = '$organame'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function userorgalist($userid){
    global $bdd;

    $response=$bdd->prepare("SELECT `name_orga`, `com_orga` FROM `ORGANISME` WHERE `id_user_admin_orga` = '$userid' " );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function orgadetails($organame){

    global $bdd;
    $response=$bdd->prepare("SELECT `name_orga`, `com_orga` FROM `ORGANISME` WHERE `name_orga` = '$organame' " );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function verifyCourseName($coursename){
    global $bdd;
    
	$response=$bdd->prepare("SELECT * FROM `COURSE` WHERE `name_course` = '$coursename'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}

function  creacourse($idorga,$coursename,$iduser,$objectname,$coursedesc,$villedepart,$villearrivee){

    global $bdd;
    $response=$bdd->prepare("INSERT INTO `COURSE` (`id_organisme`, `name_course`, `id_user_createur`, `nom_objet`, `desc_objet`, `depart_course`, `arrivee_course`) VALUES ('$idorga', '$coursename', '$iduser', '$objectname', '$coursedesc', '$villedepart', '$villearrivee')" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function getId($orga){

    global $bdd;
    $response=$bdd->prepare("SELECT `id_orga` FROM `ORGANISME` WHERE `name_orga` = '$orga' " );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function courseListOfOrga($idorga){

    global $bdd;
    $response=$bdd->prepare("SELECT `name_course` FROM `COURSE` WHERE `id_organisme` = '$idorga' " );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function deleteCourseOrga($idorga){

    global $bdd;
    $response=$bdd->prepare("DELETE FROM `COURSE` WHERE `COURSE`.`id_organisme` = '$idorga'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
    
}

function deleteOrga($idorga){
    global $bdd;
    $response=$bdd->prepare("DELETE FROM `ORGANISME` WHERE `ORGANISME`.`id_orga` = '$idorga'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function loadCourseDetails($coursename){

    global $bdd;
    $response=$bdd->prepare("SELECT `id_course`,`name_course`, `pseudo_user`,`nom_objet`,`depart_course`,`arrivee_course`,`name_orga`,`com_orga`,`desc_objet` FROM `COURSE`
    INNER JOIN `USER` ON `COURSE`.`id_user_createur` = `USER`.`id_user`
    INNER JOIN `ORGANISME` ON `COURSE`.`id_organisme` = `ORGANISME`.`id_orga`
    WHERE `COURSE`.`name_course` = '$coursename'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function getStartCity($course_id){


    global $bdd;
    $response=$bdd->prepare("SELECT `depart_course` FROM `COURSE` WHERE `id_course` = '$course_id' ");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;



}
function getEndCity($course_id){


    global $bdd;
    $response=$bdd->prepare("SELECT `arrivee_course` FROM `COURSE` WHERE `id_course` = '$course_id' ");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;


}
function getEndCoord($cityend){


    global $bdd;
    $response=$bdd->prepare("SELECT `city_lat`,`city_long` FROM `VILLE` WHERE `city_name` = '$cityend' ");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;


}

function getStartCoord($citystart){


    global $bdd;
    $response=$bdd->prepare("SELECT `city_lat`,`city_long` FROM `VILLE` WHERE `city_name` = '$citystart'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;


}

function verifyifadmin($coursename){
    global $bdd;
    $response=$bdd->prepare(" SELECT `id_user_createur` FROM `COURSE` WHERE `name_course` = '$coursename'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;


   
}

function getCourseId($coursename){

    global $bdd;
    $response=$bdd->prepare(" SELECT `id_course` FROM `COURSE` WHERE `name_course` = '$coursename'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

} 

function deleteCourseFromCourse($courseid){
    global $bdd;
    $response=$bdd->prepare("DELETE FROM `COURSE` WHERE `id_course` = '$courseid'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function deleteCourseFromTraj($courseid){
    global $bdd;
    $response=$bdd->prepare("DELETE FROM `TRAJ` WHERE `id_course` = '$courseid'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function liscourseofthisorga($idorga){

    global $bdd;
    $response=$bdd->prepare("SELECT `id_course` FROM `COURSE` WHERE `id_organisme` = '$idorga'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}
function listAllOrgas(){

    global $bdd;
    $response=$bdd->prepare("SELECT `name_orga` FROM `ORGANISME`" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;


}

function getUserName($iduser){
    global $bdd;
    
	$response=$bdd->prepare("SELECT `pseudo_user` FROM `USER` WHERE `id_user` = '$iduser'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}

function verifyIfIsAlreadyParticipating($pseudouser,$idcourse){
    global $bdd;
    
	$response=$bdd->prepare("SELECT `pseudo_user_traj` FROM `TRAJ` WHERE `pseudo_user_traj` = '$pseudouser' AND `id_course` = '$idcourse'");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}


function participateCourse($idcourse,$userlat,$userlong,$capacity,$pseudouser){

    global $bdd;
    
	$response=$bdd->prepare("INSERT INTO `TRAJ` (`id_course`, `pseudo_user_traj`, `ray_for_user`, `user_pos_lat`, `user_pos_long`) VALUES ('$idcourse', '$pseudouser', '$capacity', '$userlat', '$userlong');");
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;

}

function loadParticipants($idcourse){
    global $bdd;
    $response=$bdd->prepare("SELECT * FROM `TRAJ` WHERE `id_course` = '$idcourse'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;

}

function retirefromCourse($idcourse,$pseudouser){
    global $bdd;
    $response=$bdd->prepare("DELETE FROM `TRAJ` WHERE `id_course` = '$idcourse' AND `pseudo_user_traj` = '$pseudouser'" );
    $response->execute(); 
    $result=$response->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}





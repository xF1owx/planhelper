<?php 
require_once('request.php');

session_start();

$cp = $_SESSION['cp'];

$citynames = loadCities($cp);



$infos = array(
    "pseudo" => $_SESSION['pseudo_user'],
    "codepost" => $_SESSION['cp'],
    "cities" => array($citynames),
    
);

echo json_encode($infos);
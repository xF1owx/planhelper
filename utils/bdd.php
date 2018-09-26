<?php

try{
  
    $bdd=new PDO('mysql:host=localhost;dbname=planhelper;charset=utf8','admin','');
}
catch(Exeption $e)
{      
	die('Erreur:'.$e->getMessage());
}
    

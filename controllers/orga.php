<?php 

session_start();

if (!isset($_SESSION['pseudo_user'])){
    header('Location: /planhelper/home');
}

require_once 'vendor/autoload.php';



$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader, array('cache' => false));
require_once('models/request.php');


$template = $twig->load('orga.html');

echo $template->render(array());

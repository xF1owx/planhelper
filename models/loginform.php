<?php 


require_once('request.php');

if ((isset($_POST['login'])) & (isset($_POST['pass']))){

    $pass = $_POST['pass'];
    $login = $_POST['login'];

    $status = connect($login,$pass);

    // var_dump($status);

    if ($status == 'access granted'){

        $info = sessionParam($login);
     
        session_start();

        $_SESSION['id_user'] = $info[0]['id_user'];
        $_SESSION['pseudo_user'] = $info[0]['pseudo_user'];
        $_SESSION['cp'] = $info[0]['code_postal'];
        

        // var_dump($_SESSION['id_user']);
        // var_dump($_SESSION['pseudo_user']);
        
        echo json_encode('/planhelper/accountPage');
        

        
    }else {
        echo 'erreur';
    }

}
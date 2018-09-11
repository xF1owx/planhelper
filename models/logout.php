<?php 

session_start();

session_destroy(); //destroy the session
header("location:/planhelper/home"); //to redirect back to "index.php" after logging out
exit();
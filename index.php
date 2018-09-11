<?php

$url = $_SERVER['REQUEST_URI'];


switch ($url) {

    
case '/planhelper/home':
case '/planhelper/home/' :
require_once('controllers/home.php');
break;

case '/planhelper':
case '/planhelper/' :
require_once('controllers/home.php');
break;

case '/planhelper/register':
case '/planhelper/register/' :
require_once('controllers/register.php');
break;

case '/planhelper/accountPage':
case '/planhelper/accountPAge/' :
require_once('controllers/accountPage.php');
break;

case '/planhelper/creation':
case '/planhelper/creation/' :
require_once('controllers/creation.php');
break;

case '/planhelper/orga':
case '/planhelper/orga/' :
require_once('controllers/orga.php');
break;

case '/planhelper/participate':
case '/planhelper/participate/' :
require_once('controllers/participate.php');
break;

}

if (isset($_GET['id'])){
require_once('controllers/pageCourse.php');

}
<?php 
session_start();
if (!isset($_SESSION['pseudo_user'])){
    header('Location: /planhelper/home');
}
require_once 'vendor/autoload.php';


$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader, array('cache' => false));
require_once('models/request.php');


$template = $twig->load('course.html');

echo $template->render(array());

$courseid = $_GET['id'];

?> 
<script type="text/javascript">
   
            document.getElementById("hidden-id").value = "<?php echo $courseid; ?>";
            document.getElementById("hidden-pseudo").value = "<?php echo $_SESSION['pseudo_user']; ?>";
            
      
</script>

<?php


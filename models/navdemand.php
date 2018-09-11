<?php
require_once('request.php');
session_start();



if (isset($_POST['askfor'])){

    
    

    if (($_POST['askfor']) == 'citycoord'){
        if (isset($_POST['citychoice'])){
            $citychoice = $_POST['citychoice'];
        }

        $response = loadCoordChosenCity($citychoice);
        echo json_encode($response);
    }



    if (($_POST['askfor']) == 'orgacrea'){
        if (isset($_POST['organame'])){
            $organame = $_POST['organame'];
        }
        if (isset($_POST['orgadesc'])){
            $orgadesc = $_POST['orgadesc'];
        }
        $userid = $_SESSION['id_user'];


        $testorganame = verifyorganame($organame);
            if ($testorganame != null){
                echo json_encode('déja utilisé');
            }else{
                $response = creaorga($organame,$userid,$orgadesc);

                echo json_encode('orga créée');
            }
       

       
    }
    if (($_POST['askfor']) == 'orgalist'){

        $userid = $_SESSION['id_user'];

        $response = userorgalist($userid);
        if ($response != null){ 
        echo json_encode($response);
        }
        else{
            echo 'no';
        }
    }
    if (($_POST['askfor']) == 'orgadetails'){

        $organame = $_POST['organame'];

        $response = orgadetails($organame);
        
        echo json_encode($response);
    }
    
    if (($_POST['askfor']) == 'newcourse'){
        
        $orga = $_POST['nomorga'];
        $coursename = $_POST['coursename'];
        $villedepart =  $_POST['depart'];
        $villearrivee =  $_POST['arrivee'];
        $coursedesc = $_POST['desc_course'];
        $objectname = $_POST['objectname'];

        $valid = verifyCourseName($coursename);

        

        if ($valid != null ){

            echo json_encode('already used');

        }else{

            $idorga = getId($orga);
            $idorga = $idorga[0]['id_orga'];
            

            $iduser = $_SESSION['id_user'];

            

            creacourse($idorga,$coursename,$iduser,$objectname,$coursedesc,$villedepart,$villearrivee);

            echo json_encode('done');
        }


        
        
        
        
    }

    if (($_POST['askfor']) == 'courselist'){

        $orga = $_POST['organame'];
        
        $idorga = getId($orga);
        
        $idorga = $idorga[0]['id_orga'];

        $courselist = courseListOfOrga($idorga);

        echo json_encode($courselist);

    }

    if (($_POST['askfor']) == 'deleteorga'){

        $orga = $_POST['organame'];

        $idorga = getId($orga);
        
        $idorga = $idorga[0]['id_orga'];

        
        $idscourse = liscourseofthisorga($idorga);

        

        foreach ($idscourse as $value){

            $courseid = $value['id_course'];

            deleteCourseFromCourse($courseid);
            deleteCourseFromTraj($courseid);
        }

        deleteCourseOrga($idorga);
        deleteOrga($idorga);

        echo json_encode('success');
       
    }
    if (($_POST['askfor']) == 'coursedetails'){

        $coursename = $_POST['coursename'];
        
        $coursedetails = loadCourseDetails($coursename);
        

        echo json_encode($coursedetails);

    }
    if (($_POST['askfor']) == 'coursedetailsplus'){

        $course_id = $_POST['courseid'];

        $citystart = getStartCity($course_id);
        $cityend = getEndCity($course_id);

        $citystart = $citystart[0]['depart_course'];
        $cityend = $cityend[0]['arrivee_course'];

        
        $startcoord = getStartCoord($citystart);
        $endcoord = getEndCoord($cityend);

        $arr = array("citystart" => $citystart, "coordstart" => $startcoord, "cityend" => $cityend , "coordend" => $endcoord);

        echo json_encode($arr);
        


    }
    if (($_POST['askfor']) == 'courseprox'){
        $capacity = $_POST['capacity'];
        $userlat = $_POST['userlat'];
        $userlong = $_POST['userlong'];

        // $proxCourses = loadProxCourse($userlat,$userlong,$capacity);
        var_dump($capacity);
        var_dump($userlat);
        var_dump($userlong);

        echo json_encode('course a prox');
    }

    if (($_POST['askfor']) == 'deletecourse'){

        $coursename = $_POST['coursename'];
        $iduser = $_SESSION['id_user'];

        $admin = verifyifadmin($coursename);

        if ($admin = $iduser){
            
            $courseid = getCourseId($coursename);

            $courseid = $courseid[0]['id_course'];
            

            deleteCourseFromCourse($courseid);
            deleteCourseFromTraj($courseid);


            echo json_encode('deleted');
        }else{
            echo json_encode('failed');
        }

       
    }
    if (($_POST['askfor']) == 'allorgas'){

        $searchorga = listAllOrgas();

        echo json_encode($searchorga);
    }
    if (($_POST['askfor']) == 'citycoord'){

        $citychoice = $_POST['citychoice'];

        $coord = loadCoordChosenCity($citychoice);

    }
    if (($_POST['askfor']) == 'participate'){

            $idcourse = $_POST['idcourse'];
            $userlat = $_POST['userlat'];
            $userlong = $_POST['userlong'];
            $capacity = $_POST['capacity'];
            $iduser = $_SESSION['id_user'];
            $pseudouser = getUserName($iduser);

            $pseudouser = $pseudouser[0]['pseudo_user'];

            $alreadyparticipating = verifyIfIsAlreadyParticipating($pseudouser,$idcourse);

            if ($alreadyparticipating != null){
                echo json_encode('exist');
            }else{

                participateCourse($idcourse,$userlat,$userlong,$capacity,$pseudouser);

               
            echo json_encode('done');
            }

    }

    if (($_POST['askfor']) == 'participantlist'){

        $idcourse = $_POST['courseid'];

        $courseData = loadParticipants($idcourse);

        echo json_encode($courseData);
    }
    if (($_POST['askfor']) == 'courseretire'){

        $idcourse = $_POST['idcourse'];
        $iduser = $_SESSION['id_user'];
        
        $pseudouser = getUserName($iduser);
        $pseudouser = $pseudouser[0]['pseudo_user'];

        retirefromCourse($idcourse,$pseudouser);

        echo json_encode('retired');
    }






    





}

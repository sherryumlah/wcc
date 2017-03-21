<?php
if(isset($_POST['submit'])){
    $to = "email@domain.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subject = "WCC Contact Form";
    $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    header('Location: thanks.html');
    }
?>

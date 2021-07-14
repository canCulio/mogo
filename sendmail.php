<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail ->CharSet = 'UTF-8';
    $mail ->setLanguage('en', 'phpmailer/language/');
    $mail ->IsHTML(true);

    //Sender
    $mail ->setFrom('info@mogo.com', 'Be Creative with Mogo');
    //Receiver
    $mail ->addAddress('mbeylirey@yahoo.com');
    //Subject
    $mail->Subject = "Hello! You've got mail!";

    //Body of mail
    $body = '<h1>You have got mail!</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
    }

    //Add file
    if(!empty($_FILES['image']['tmp_name'])){
        //path
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        //uploading file
        if(copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Image attached</strong></p>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail>Body = $body;

    //Sending
    if(!$mail->send()){
        $message = 'Error';
    }else{
        $message = 'Message sent!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>
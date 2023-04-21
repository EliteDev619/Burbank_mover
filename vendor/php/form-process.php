<?php

$EmailTo = "support@burbankmovers.org";
$Subject = "New Message from Contact page on Burbank Movers";

$success = false;
$errorMSG = array();
$name = $email = $subject = $message = null;
$fields = array(
    'name' => "Name is required ",
    'email' => "Email is required ",
    'subject' => "Subject is required ",
    'message' => "Message is required "
);

foreach($fields as $key => $e_message){
    if (empty($_POST[$key])) {
        $errorMSG[] = $e_message;
    } else {
        $$key = $_POST[$key];
    }
}

// prepare email body text
$Body = null;
$Body .= "<p><b>Name:</b> {$name}</p>";
$Body .= "<p><b>Email:</b> {$email}</p>";
$Body .= "<p><b>Subject:</b> {$subject}</p>";
$Body .= "<p><b>Message:</b> </p><p>{$message}</p>";

// send email
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:  ' . $name . ' <' . $email .'>' . " \r\n" .
            'Reply-To: '.  $email . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

if($name && $email && $message){
    $success = mail($EmailTo, $Subject, $Body, $headers );
}

if(empty($errorMSG)){
    $errorMSG[] = "Something went wrong :(";
}

echo json_encode(array(
    'success' => $success,
    'message' => $errorMSG
));

die();
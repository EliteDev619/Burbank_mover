<?php
$errorMSG = "";

function getNumber() {
    $filename = 'orderNum.txt';
    $number = file_get_contents($filename);
    $number++;
    file_put_contents($filename, $number);
    return $number;
}

if (empty($_POST["completename"])) {
    $errorMSG = "Complete name required ";
} else {
    $completename = $_POST["completename"];
}

if (empty($_POST["email"])) {
    $errorMSG = "Email required ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["phonenr"])) {
    $errorMSG .= "Phone number required ";
} else {
    $phonenr= $_POST["phonenr"];
}

if (empty($_POST["movingfrom"])) {
    $errorMSG .= "Address from required ";
} else {
    $movingfrom= $_POST["movingfrom"];
}

if (empty($_POST["movingto"])) {
    $errorMSG .= "Address to required ";
} else {
    $movingto = $_POST["movingto"];
}

if (empty($_POST["movesize"])) {
    $errorMSG .= "Move size required ";
} else {
    $movesize = $_POST["movesize"];
}

if (empty($_POST["start"])) {
    $errorMSG .= "Move date required ";
} else {
    $start = date($_POST["start"]);
}
$comments = $_POST["comments"];

$EmailTo = "info@303movers.com";
$Subject = "Moving Quote Request from Burbank Movers Q-" .getNumber();

// prepare email body text

$body = "<table border='1'>
<tr>
  <th colspan='2' style='background-color:#ccc; color:black;'>Customer Info.</th>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Name</td>
  <td>$completename</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Email</td>
  <td>$email</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Phone</td>
  <td>$phonenr</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Moving From</td>
  <td>$movingfrom</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Moving To</td>
  <td>$movingto</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Move Size</td>
  <td>$movesize</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Move Date</td>
  <td>$start</td>
</tr>
<tr>
  <td style='background-color:#f2f2f2;'>Comments</td>
  <td>$comments</td>
</tr>
</table>";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $completename <$email>";

// send email
$success = mail($EmailTo, $Subject, $body, $headers);
// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>
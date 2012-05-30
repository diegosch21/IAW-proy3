<?php

session_start();
$_SESSION['user'] = 'visit';
unset ( $_SESSION['username'] );

header("Location: index.php");
exit;


?>
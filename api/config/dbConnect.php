<?php
// Database configuration
$dbServer = "localhost";  // Replace with your database server hostname
$dbUsername = "root";     // Replace with your database username
$dbPassword = "";         // Replace with your database password
$dbName = "allevents"; // Replace with your database name

// Create connection
$link = mysqli_connect($dbServer, $dbUsername, $dbPassword, $dbName);

// Check connection
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

?>

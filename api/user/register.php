<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, ngrok-skip-browser-warning
");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// I
require_once "../config/dbConnect.php";

$response = array();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = trim($data->email);
    
    $check_email_query = "SELECT user_id FROM users WHERE email = ?";
    if ($stmt_check = mysqli_prepare($link, $check_email_query)) {
        mysqli_stmt_bind_param($stmt_check, "s", $email);
        mysqli_stmt_execute($stmt_check);
        mysqli_stmt_store_result($stmt_check);
        
        if (mysqli_stmt_num_rows($stmt_check) > 0) {
            $response['error'] = "Email already exists.";
            http_response_code(400); 
        } else {
            $password = trim($data->password);
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $created_at = date('Y-m-d H:i:s'); 
            
            $insert_query = "INSERT INTO users (email, password, created_at) VALUES (?, ?, ?)";
            if ($stmt_insert = mysqli_prepare($link, $insert_query)) {
                mysqli_stmt_bind_param($stmt_insert, "sss", $email, $hashed_password, $created_at);
                if (mysqli_stmt_execute($stmt_insert)) {
                    $response['message'] = "User registered successfully.";
                    http_response_code(201); 
                } else {
                    $response['error'] = "Registration failed. Please try again later.";
                    http_response_code(500); 
                }
                mysqli_stmt_close($stmt_insert); 
            } else {
                $response['error'] = "Internal Server Error. Please try again later.";
                http_response_code(500); 
            }
        }
        mysqli_stmt_close($stmt_check); 
    } else {
        $response['error'] = "Internal Server Error. Please try again later.";
        http_response_code(500); 
    }
} else {
    $response['error'] = "Email and password are required.";
    http_response_code(400); 
}

echo json_encode($response);
?>

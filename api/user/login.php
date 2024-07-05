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
require_once "../config/dbConnect.php";

$response = array();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($data->email) && !empty($data->password)) {
        $email = trim($data->email);
        $select_query = "SELECT user_id, email, password FROM users WHERE email = ?";
        if ($stmt = mysqli_prepare($link, $select_query)) {
            mysqli_stmt_bind_param($stmt, "s", $email);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            if (mysqli_stmt_num_rows($stmt) == 1) {
                mysqli_stmt_bind_result($stmt, $user_id, $email, $hashed_password);
                if (mysqli_stmt_fetch($stmt)) {
                    if (password_verify(trim($data->password), $hashed_password)) {
                        session_start();
                        $_SESSION["loggedin"] = true;
                        $_SESSION["user_id"] = $user_id;
                        $_SESSION["email"] = $email;
                        $response['message'] = "Login successful.";
                        $token = base64_encode(json_encode(['user_id' => $_SESSION['user_id'], 'email' => $_SESSION['email']]));
                        $response['token']=$token;
                        http_response_code(200); 
                    } else {
                        $response['error'] = "Invalid email or password.";
                        http_response_code(401); 
                    }
                }
            } else {
                $response['error'] = "Invalid email or password.";
                http_response_code(401); // Unauthorized
            }
            mysqli_stmt_close($stmt);
        }
    } else {
        $response['error'] = "Email and password are required.";
        http_response_code(400); // Bad Request
    }
    
    echo json_encode($response);
}else{
    http_response_code(404); 

}
    ?>

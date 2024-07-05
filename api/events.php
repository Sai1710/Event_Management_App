<?php
require_once "./config/dbConnect.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,ngrok-skip-browser-warning
");

session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    $response['error'] = "Unauthorized access.";
    http_response_code(401); 
    echo json_encode($response);
    exit;
}




switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $response = array();
        $user_id = $_SESSION["user_id"];
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->event_name) && !empty($data->location) && !empty($data->start_time) && !empty($data->end_time) && !empty($data->category) && !empty($data->description)) {
            $event_name = htmlspecialchars(strip_tags($data->event_name));
            $location = htmlspecialchars(strip_tags($data->location));
            $start_time = htmlspecialchars(strip_tags($data->start_time));
            $end_time = htmlspecialchars(strip_tags($data->end_time));
            $category = htmlspecialchars(strip_tags($data->category));
            $description = htmlspecialchars(strip_tags($data->description));
    
            if (isset($_FILES['banner_image'])) {
                $file_name = $_FILES['banner_image']['name'];
                $file_tmp = $_FILES['banner_image']['tmp_name'];
                $file_type = $_FILES['banner_image']['type'];
                $file_error = $_FILES['banner_image']['error'];
    
                $upload_directory = "./uploads/";
    
                $target_path = $upload_directory . $file_name;
                if (move_uploaded_file($file_tmp, $target_path)) {
                    $banner_image = $target_path;
                } else {
                    $response['error'] = "Failed to upload image.";
                    http_response_code(500); 
                    echo json_encode($response);
                    exit;
                }
            } else {
                $banner_image = null; 
            }
    
            $insert_query = "INSERT INTO events (event_name, location, start_time, end_time, category, banner_image, description, organizer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            
            if ($stmt = mysqli_prepare($link, $insert_query)) {
                mysqli_stmt_bind_param($stmt, "sssssssi", $event_name, $location, $start_time, $end_time, $category, $banner_image, $description, $user_id);
                
                if (mysqli_stmt_execute($stmt)) {
                    echo json_encode(array("message" => "Event added successfully"));
                    http_response_code(201); 
                } else {
                    echo json_encode(array("error" => "Failed to add event!"));
                    http_response_code(500); 
                }
    
              
                mysqli_stmt_close($stmt);
            } else {
                echo json_encode(array("error" => "Internal Server Error. Please try again later."));
                http_response_code(500); 
            }
        } else {
            echo json_encode(array("error" => "All fields are necessary"));
            http_response_code(400); // Bad Request
        }
        break;

    case 'GET':
        
        if (isset($_GET['id'])) {
       
            $event_id = intval($_GET['id']);
            $select_query = "SELECT * FROM events WHERE event_id = ?";
            
            if ($stmt = mysqli_prepare($link, $select_query)) {
                mysqli_stmt_bind_param($stmt, "i", $event_id);
                
                if (mysqli_stmt_execute($stmt)) {
                    $result = mysqli_stmt_get_result($stmt);
                    
                    if ($event = mysqli_fetch_assoc($result)) {
                        http_response_code(200); // OK
                        echo json_encode($event);
                    } else {
                        http_response_code(404); 
                        echo json_encode(array("error" => "Event not found."));
                    }
                } else {
                    http_response_code(500); 
                    echo json_encode(array("error" => "Failed to fetch event. Please try again later."));
                }
    
                mysqli_stmt_close($stmt);
            } else {
                http_response_code(500); 
                echo json_encode(array("error" => "Internal Server Error. Please try again later."));
            }
        } else {
        
            $select_query = "SELECT * FROM events";
    
            if ($result = mysqli_query($link, $select_query)) {
                $events = array();
                
                while ($row = mysqli_fetch_assoc($result)) {
                    $events[] = $row;
                }
                
                http_response_code(200); // OK
                echo json_encode($events);
            } else {
                http_response_code(500); 
                echo json_encode(array("error" => "Failed to fetch events. Please try again later."));
            }
        }
        break;

    case 'DELETE':
        
        parse_str(file_get_contents("php://input"), $_DELETE);

        if (isset($_DELETE['id'])) {
            $event_id = intval($_DELETE['id']);
            $check_query = "SELECT organizer_id FROM events WHERE id = ?";
            
            if ($stmt = mysqli_prepare($link, $check_query)) {
                mysqli_stmt_bind_param($stmt, "i", $event_id);

                if (mysqli_stmt_execute($stmt)) {
                    $result = mysqli_stmt_get_result($stmt);

                    if ($event = mysqli_fetch_assoc($result)) {
                        $organizer_id = $event['organizer_id'];
                        $current_user_id = 1;

                        if ($current_user_id == $organizer_id) {
                            $delete_query = "DELETE FROM events WHERE id = ?";

                            if ($stmt = mysqli_prepare($link, $delete_query)) {
                                mysqli_stmt_bind_param($stmt, "i", $event_id);

                                if (mysqli_stmt_execute($stmt)) {
                                    http_response_code(200); // OK
                                    echo json_encode(array("message" => "Event deleted successfully."));
                                } else {
                                    http_response_code(500); 
                                    echo json_encode(array("error" => "Failed to delete event. Please try again later."));
                                }

                                mysqli_stmt_close($stmt);
                            } else {
                                http_response_code(500); 
                                echo json_encode(array("error" => "Internal Server Error. Please try again later."));
                            }
                        } else {
                            http_response_code(403); 
                            echo json_encode(array("error" => "You are not authorized to delete this event."));
                        }
                    } else {
                        http_response_code(404); 
                        echo json_encode(array("error" => "Event not found."));
                    }
                } else {
                    http_response_code(500); 
                    echo json_encode(array("error" => "Failed to fetch event. Please try again later."));
                }

                mysqli_stmt_close($stmt);
            } else {
                http_response_code(500); 
                echo json_encode(array("error" => "Internal Server Error. Please try again later."));
            }
        } else {
            http_response_code(400); 
            echo json_encode(array("error" => "Event ID is required."));
        }
        break;

    default:
        http_response_code(405); 
        echo json_encode(array("error" => "Method not allowed."));
        break;
}

mysqli_close($link);
?>

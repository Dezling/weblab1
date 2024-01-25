<?php

error_reporting(-1);

$response = array(
    'x' => '',
    'y' => '',
    'r' => '',
    'result' => '',
    'executed_at' => '',
    'execution_time' => ''
);

$start_exec = microtime(1);

// Values validation
function check_x($x): bool
{
    return $x >= -2 and $x <= 2;
}

function check_y($y): bool
{
    return $y >= -3 and $y <= 5;
}

function check_r($r): bool
{
    return $r >= 1 and $r <= 5;
}

function isValidValues($x, $y, $r): bool{
    return check_x($x) and check_y($y) and check_r($r);
}

// Checking hit on shapes
function check_rectangle($x, $y, $r): bool{
    return($x <= 0 and $y >= 0 and abs($x) <= $r and $y <= $r/2);
}

function check_circle($x, $y, $r): bool{
    return($x >= 0 and $y >= 0 and (pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)));
}

function check_triangle($x, $y, $r): bool{
    return($x <= 0 and $y <= 0 and abs($x) + abs($y) <= $r/2);
}

function check_hit($x, $y, $r): string
{
    if (check_rectangle($x, $y, $r)) return "Попадание";
    else if (check_circle($x, $y, $r)) return "Попадание";
    else if (check_triangle($x, $y, $r)) return "Попадание";
    else return "Промах";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $x = isset($_POST["x-select"]) ? $_POST["x-select"] : "";
    $y = isset($_POST["y-select"]) ? $_POST["y-select"] : "";
    $r = isset($_POST["r-select"]) ? $_POST["r-select"] : "";

    if (isValidValues($x, $y, $r)) {
        $result = check_hit($x, $y, $r);
    } else {
        $result = "Ошибка введенных данных";
    }

    $executed_at = date(DATE_RFC2822);
    $execution_time = microtime(1) - $start_exec;

    $response['x'] = $x;
    $response['y'] = $y;
    $response['r'] = $r;
    $response['result'] = $result;
    $response['executed_at'] = $executed_at;
    $response['execution_time'] = $execution_time;

    header("Content-Type: application/json");
    echo json_encode($response);
}
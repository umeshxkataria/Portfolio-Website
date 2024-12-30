<?php
// MailerLite API Key
$API_KEY = "YeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDBmMWQ2Y2ZkNzQ4MGExZjY0MWMzZTIzNzY0MTExODE3NDk4MjNiNTY5MTIwZWI4MzI2MmM1NTEzMGRiMjcxOThiYmQyMWM2MTA1MTYyZWEiLCJpYXQiOjE3MzU1NDgwNTIuNTU4ODE2LCJuYmYiOjE3MzU1NDgwNTIuNTU4ODE4LCJleHAiOjQ4OTEyMjE2NTIuNTU1MjAxLCJzdWIiOiIxMjYzNzgyIiwic2NvcGVzIjpbXX0.w0sSNUrm3c-cvPqG71mC9Bywa5wtzmi6w4iTO-3RsdvIpuvoAWe8l79sD23_zO9xujIdAv22eon8UkWDBfKyr6uWWLlES7DNKaK9XbfTbXu_tQ1_mugCWKsGPuhXSnXFY19s7FQOfMcanS9pRtxYnTU8EFACyRFqJ7SwF3bMosKIXwTbJHfMPZIJfOoKZIHMZLTtIDKfCfmaDPe20uFpxQ3nRpe9MdSN6FxRlVK0K0PkQ2B1ISSspOlJS8O4ul84ZXkXTwBKq2sxxwz4EcRnOFuaaBwIwMLY2lurgAIJHo2zW3P2MCb5-pTtGuaVwLUqlM33cSPD6ZeDi1-NmfCFlvN6cX7QYgO2BzVL5fjBLNgXskhTEZ9FuxQanIstDNvLd5LZAEz8yaXQ1jLPJ94WASZWCxwdictjUNEoe8Ds-1OfGG7dUyLktDpo9vxBhThR8RwkYlCdc8KL5vA0l5YHrCeydQtvWsAuARK8-d8Qzcypy_C7pDN8pDDVTf5P9DLe1f0zcxsYEYq6A5Mrpq7jS7DELUPW8IcszwtkDXwRnL-pQkWW51YIYRkqfqLA88IWbyu7oHlK9Lc3CLsP1NurVuQAPuBj_D00Cpu8dmUU37vTdoZMp-aXpZaQYXXh3pedBb8piILrRbcI7LAHxWXORpTxCriVZI-bEK32br1sCZQ";

// MailerLite Group ID (optional: if you want to add subscribers to a specific group)
$GROUP_ID = "142132918921201328";

/**********************************************************************************

All the work runs below

**********************************************************************************/

// Allow only POST method
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["email"])) {

    $email = $_POST["email"];

    // Send headers
    header('Content-type: application/json');

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        // Prepare the API request
        $url = "https://connect.mailerlite.com/api/subscribers";

        $data = [
            "email" => $email,
        ];

        if (!empty($GROUP_ID)) {
            $data["groups"] = [$GROUP_ID];
        }

        $options = [
            "http" => [
                "header"  => [
                    "Content-type: application/json",
                    "Authorization: Bearer $API_KEY",
                ],
                "method"  => "POST",
                "content" => json_encode($data),
            ],
        ];

        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        // Handle API response
        if ($response !== false) {
            $responseData = json_decode($response, true);
            if (isset($responseData["id"])) {
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => $responseData["message"] ?? "Unknown error occurred."
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to connect to MailerLite API."
            ]);
        }
    } else {
        // Invalid email
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email address."
        ]);
    }
} else {
    // Method not allowed
    header('HTTP/1.1 403 Forbidden');
    echo json_encode([
        "status" => "error",
        "message" => "Forbidden request."
    ]);
}
?>

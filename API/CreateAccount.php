<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    $Username = $_POST['Username'];
    $Password = $_POST['Password'];
    //No idea how to increment Userid

    // Probably something along the lines of
    // $Userid = $inData["Userid"];
    // $Userid = incrementer++;
    // we would need to store $incrementer somewhere

    $conn = new mysqli("poosddb.ckbkojoxq1y0.us-east-1.rds.amazonaws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $test = "SELECT Username FROM User where Username='" . $Username . "'";
        $result = mysqli_query($conn, $test);

        if (mysqli_num_rows($result) > 0 )
        {
            $conn->close();
            returnWithError( "Username already exists" );
        }
        else
        {
            $hash = password_hash($Password, PASSWORD_DEFAULT);
            $timestamp = date("F j, Y \a\t g:ia");
            $sql = "INSERT INTO User (Userid, Username, Password, DateCreated, LastLogin) VALUES ('0', '" . $Username . "','" . $hash . "', '" . $timestamp . "','" . $timestamp . "')";
        }
    }

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

<?php
  $_POST = json_decode(file_get_contents('php://input'), true);
  $Userid = $_POST['Userid'];
  $Contactid = $_POST["Contactid"];
  $ContactFirstName = $_POST["ContactFirstName"];
  $ContactLastName = $_POST["ContactLastName"];
  $ContactNumber = $_POST["ContactNumber"];
  $Address = $_POST["Address"];
	//$ContactName = $_POST['ContactName']; //Not necessary?
	$Contactid = $_POST['Contactid'];
  $conn = new mysqli("poosddb.ckbkojoxq1y0.us-east-1.rds.amazonaws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $sql = "UPDATE Contact SET ContactFirstName='" . $ContactFirstName . "', ContactLastName='" . $ContactLastName . "', ContactNumber='" . $ContactNumber . "', Address='" . $Address . "' WHERE Contactid='" . $Contactid . "'";
        if ($conn->query($sql) != TRUE)
        {
            $conn->close();
            returnWithError( "Error updating contact" );
        }
        else
        {
            $conn->close();
            $message = '{"error":"", "result":"edited contact"}';
            sendResultInfoAsJson($message);
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
?>

<?php
  $_POST = json_decode(file_get_contents('php://input'), true);
  $Userid = $_POST['Userid'];
	//$ContactName = $_POST['ContactName']; //Not necessary?
	$Contactid = $_POST['Contactid'];
  $conn = new mysqli("poosddb.ckbkojoxq1y0.us-east-1.rds.amazonaws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $sql = "DELETE FROM Contact WHERE Userid='" . $Userid . "' AND Contactid='" . $Contactid . "'";
        if ($conn->query($sql) != TRUE)
        {
            $conn->close();
            returnWithError( "Error deleting contact" );
        }
        else
        {
            $conn->close();

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

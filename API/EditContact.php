<?php
  $_POST = json_decode(file_get_contents('php://input'), true);
  $Userid = $_POST['Userid'];
  $Contactid = $row["Contactid"];
  $ContactFirstName = $row["ContactFirstName"];
  $ContactLastName = $row["ContactLastName"];
  $ContactNumber = $row["ContactNumber"];
  $Address = $row["Address"];
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

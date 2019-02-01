<?php
	
	$ContactName = $_POST['ContactName'];
	$ContactNumber = $_POST['ContactNumber'];
	$Address = $_POST['Address'];
	$Userid = $_POST['Userid'];
	$Contactid = $_POST['Contactid'];

	$conn = new mysqli("poosddb.ckbkojoxqly0.us-east-1.rds.amazonraws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO Contact (Contactid,Userid,ContactName,ContactNumber,Address) VALUES (" . $Contactid . "," . $Userid . ",'" . $ContactName . "','" . $ContactNumber . "','" . $Address . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		else 
		{
			$conn->close();
		}
	}
	
	returnWithError("");

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

<?php
	$inData = getRequestInfo();
	
	$ContactName = $inData["ContactName"];
	$ContactNumber = $inData["ContactNumber"];
	$Address = $inData["Address"];
	$Userid = $inData["Userid"];

	$conn = new mysqli("52.91.19.201", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO Contact (Userid,ContactName,ContactNumber,Address) VALUES (" . $userId . ",'" . $ContactName . "','" . $ContactNumber . "','" . $Address . "')";
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
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
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
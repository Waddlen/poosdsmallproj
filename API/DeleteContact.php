<?php
    
    $conn = new mysqli("52.91.19.201", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $sql = "DELETE FROM Contact WHERE Userid='" . $_POST['Userid'] . "' AND ContactName='" . $_POST['ContactName'] . "'";
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
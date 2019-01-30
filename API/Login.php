<?php
	
	$Username = "";
	$Userid = 0;
	$Firstname = "";
	$Lastname = "";

	$conn = new mysqli("52.91.19.201", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$passwordFromPost = $_POST['Password'];
		$sql = "SELECT Userid,Username FROM User where Username='" . $_POST['Username'] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();

			$passwordFromDB = password_hash($row["Password"], PASSWORD_DEFAULT);
			if (!password_verify($passwordFromPost,$passwordFromDB)) {
				$conn->close();
				returnWithError( "Invalid Password" );
			}

			$Username = $row["Username"];
			$Firstname = $row["Firstname"];
			$Lastname = $row["Lastname"];
			$Userid = $row["Userid"];

			$timestamp = date("F j, Y \a\t g:ia");
			$timesql = "UPDATE User SET LastLogin='" . $timestamp . "' WHERE Userid='" . $Userid . "'";
			
			if ($conn->query($sql) !== TRUE)
			{
				$conn->close();
				returnWithError( "Error updating record" );
			}

			$conn->close();
		
			returnWithInfo($Username, $Firstname, $Lastname, $Userid );
		}
		else
		{
			$conn->close();
			
			returnWithError( "No Records Found" );
		}
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"Userid":0,"Username":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

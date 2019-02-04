<?php

	$Username = "";
	$Userid = 0;
	$_POST = json_decode(file_get_contents('../FrontEnd/data.JSON'), true);
	$conn = new mysqli("poosddb.ckbkojoxq1y0.us-east-1.rds.amazonaws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$passwordFromPost = $_POST['Password'];
		$sql = "SELECT * FROM User where Username='" . $_POST['Username'] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();

			$passwordFromDB = $row["Password"];
			if (!password_verify($passwordFromPost,$passwordFromDB)) {
				$conn->close();
				//echo "1";
				returnWithError( "Invalid Password" );
			}
			else
			{
				$Username = $row["Username"];
				$DateCreated = $row["DateCreated"];
				$LastLogin = $row["LastLogin"];
				$Userid = $row["Userid"];

				$timestamp = date("F j, Y \a\t g:ia");
				$timesql = "UPDATE User SET LastLogin='" . $timestamp . "' WHERE Userid='" . $Userid . "'";

				if ($conn->query($timesql) !== TRUE)
				{
					$conn->close();
					returnWithError( "Error updating record" );
				}

				$conn->close();

				//echo "0";
				returnWithInfo($Username, $Userid, $DateCreated, $LastLogin );
			}
		}
		else
		{
			$conn->close();

			//echo "2";
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
		$retValue = '{"Username":"","DateCreated":"","LastLogin":"","Userid":"0","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $Username, $Userid, $DateCreated, $LastLogin )
	{
		$retValue = '{"Username":"' . $Username . '","DateCreated":"' . $DateCreated . '","LastLogin":"' . $LastLogin . '","Userid":"' . $Userid . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>

<?php
  $_POST = json_decode(file_get_contents('php://input'), true);
	$searchResults = "";
	$searchCount = 0;
	$conn = new mysqli("poosddb.ckbkojoxq1y0.us-east-1.rds.amazonaws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * from Contact where Userid='" . $_POST['Userid'] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
        $Contactid = $row["Contactid"];
				$Userid = $row["Userid"];
				$ContactFirstName = $row["ContactFirstName"];
				$ContactLastName = $row["ContactLastName"];
        $ContactNumber = $row["ContactNumber"];
				$Address = $row["Address"];
				$searchResults .= '{"Contactid":"' . $Contactid . '","Userid":"' . $Userid . '","ContactFirstName":"' . $ContactFirstName . '","ContactLastName":' . $ContactLastName . ',"ContactNumber":"' . $ContactNumber . '","Address":"' . $Address . '","error":""}';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	returnWithInfo( $searchResults );
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"Username":"","Userid":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>

<?php
	$conn = new mysqli("poosddb.ckbkojoxqly0.us-east-1.rds.amazonraws.com", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		die("Connection Failed. " . mysqli_connect_error());
	} 
	else
	{
		echo("Connection Succeeded. ");
	}
	
?>

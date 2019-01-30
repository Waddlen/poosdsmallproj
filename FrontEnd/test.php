<?php
	$conn = new mysqli("52.91.19.201", "poosdAdmin", "DontForgetThis321", "poosdDB");
	if ($conn->connect_error) 
	{
		die("Connection Failed. " . mysqli_connect_error());
	} 
	else
	{
		echo("Connection Succeeded. ");
	}
	
?>
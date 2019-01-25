Current server information
--------------------------
ec2-52-91-19-201.compute-1.amazonaws.com

52.91.19.201

Uses POOSDKP.pem



---------------


SSH in:

chmod 600 ./POOSDKP.pem (ensure file permissions are sufficiently private)

ssh -i POOSDKP.pem ubuntu@ec2-52-91-19-201.compute-1.amazonaws.com

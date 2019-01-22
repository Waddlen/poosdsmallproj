Current server information
--------------------------
ec2-34-237-2-215.compute-1.amazonaws.com
34.237.2.215
Uses POOSDKP.pem



SSH in:
chmod 600 ./POOSDKP.pem (ensure file permissions are sufficiently private)
ssh -i POOSDKP.pem ubuntu@ec2-34-237-2-215.compute-1.amazonaws.com
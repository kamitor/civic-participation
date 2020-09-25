#!/bin/bash

chmod 400 ../keys/ec2.pem
ssh -i ../keys/ec2.pem ubuntu@ec2-18-133-123-232.eu-west-2.compute.amazonaws.com
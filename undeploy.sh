#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <AWS_PROFILE_NAME>";
  exit 1;
fi

cd multi-demo-app
AWS_PROFILE=$1 serverless remove
cd ..

cd infra
AWS_PROFILE=$1 terraform destroy -auto-approve;
cd ..
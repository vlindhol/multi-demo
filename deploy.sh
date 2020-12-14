#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <AWS_PROFILE_NAME>";
  exit 1;
fi

cd infra;
AWS_PROFILE=$1 terraform init
AWS_PROFILE=$1 terraform apply -auto-approve;
cd ..;

cd multi-demo-app;
npm i;
AWS_PROFILE=$1 serverless
AWS_PROFILE=$1 serverless deploy
cd ..

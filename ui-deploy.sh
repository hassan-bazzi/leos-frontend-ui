if [[ ! $1 ]]; then
  echo 'specify uat or prod';
  exit;
fi
if [[ "$1" == "prod" ]]; then 
  echo "sdafds";
  npm run build:production;
  aws s3 sync ./build/ s3://$1-leos-ui --acl public-read
  aws cloudfront create-invalidation --distribution-id=E2REPSSEXY60RX --paths=/*
else
  npm run build:uat;
  aws s3 sync ./build/ s3://$1-leos-ui --acl public-read
  aws cloudfront create-invalidation --distribution-id=E3O18WNNDZ43XQ --paths=/*
fi;

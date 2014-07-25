#!/bin/bash
DIGITS=8
DIR=qrcodes
URL_BASE="http://otoshimono.herokuapp.com/"
API_URL_BASE="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="
if [ $# -lt 1 ]
then
  echo "usage: $0 [loop number]"
  exit
fi

if [ ! -e $DIR ]
then
  mkdir $DIR
fi

for i in `seq 1 1 $1`
do
  ID=`LC_CTYPE=C tr -dc A-Za-z0-9 < /dev/urandom | head -c $DIGITS | xargs`
  LOGIN_URL=${URL_BASE}login/${ID}
  PROFILE_URL=${URL_BASE}profile/${ID}
  exec `wget -O ${DIR}/${ID}_login.png "${API_URL_BASE}${LOGIN_URL}"`
  exec `wget -O ${DIR}/${ID}_profile.png "${API_URL_BASE}${PROFILE_URL}"`
done;

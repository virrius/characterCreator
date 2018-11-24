#!/bin/sh
echo "Started - lambda $1"

if [ "$1" = "build" ]; then
  cd $HOME_DIR/lambdas/getFunction && npm install
  cd $HOME_DIR/lambdas/timeFunction && npm install
  c


elif [ "$1" = "package" ]; then
  cd $HOME_DIR/lambdas/getFunction && zip -9rq getFunction.zip .
  cd $HOME_DIR/lambdas/timeFunction && zip -9rq timeFunction.zip .



fi
echo "Ended - lambda $1"
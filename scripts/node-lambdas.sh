#!/bin/sh
echo "Started - lambda $1"

if [ "$1" = "build" ]; then
  cd $HOME_DIR/lambdas/authFunction && npm install
  cd $HOME_DIR/lambdas/loadFunction && npm install
  cd $HOME_DIR/lambdas/getcharsFunction && npm install
  cd $HOME_DIR/lambdas/regFunction && npm install
  cd $HOME_DIR/lambdas/saveFormFunction && npm install
  c


elif [ "$1" = "package" ]; then
  cd $HOME_DIR/lambdas/authFunction && zip -9rq authFunction.zip .
  cd $HOME_DIR/lambdas/loadFunction && zip -9rq timeFunction.zip .
   cd $HOME_DIR/lambdas/getcharsFunction && zip -9rq getcharsFunction.zip .
    cd $HOME_DIR/lambdas/regFunction && zip -9rq regFunction.zip .
     cd $HOME_DIR/lambdas/saveFormFunction && zip -9rq saveFormFunction.zip .



fi
echo "Ended - lambda $1"
#!/bin/bash

rm -rf ./TextInputLayoutDemo/node_modules/rn-textinputlayout
packName=`npm pack`
cd ./TextInputLayoutDemo
npm install ../$packName
cd ../


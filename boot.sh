#!/bin/sh
cd /home/minion/ops
nvm use v0.10.28
npm install
node app.js

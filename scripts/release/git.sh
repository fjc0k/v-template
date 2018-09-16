#!/bin/sh

yarn build

git add -A
git commit -m 'update'
git push origin master

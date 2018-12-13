#!/bin/sh
screen -ls | grep Detached | cut -d. -f1 | xargs kill 


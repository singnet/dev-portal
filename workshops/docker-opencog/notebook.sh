#!/bin/bash

source /home/relex/.profile
source /home/relex/miniconda3/bin/activate pmvqa3
cd /home/relex/opencog-intro-master/ && exec jupyter notebook --ip=0.0.0.0

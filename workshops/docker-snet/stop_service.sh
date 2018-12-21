#!/bin/sh
for pid in `pidof python3`; do kill $pid; done
for pid in `pidof snetd-linux-amd64`; do kill $pid; done


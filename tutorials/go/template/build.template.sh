#!/bin/bash

go generate server.go
go build server.go
go build client.go

//go:generate protoc -I ./service_spec --go_out=plugins=grpc:./service_spec ./service_spec/tutorial.proto
// __PROJECT__
// __SERVICE_PORT__

package main

import (
	"fmt"
	"os"
	"time"
	"strconv"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	pb "__PROTO_DIR__"
)

const (
	address = "localhost:__SERVICE_PORT__"
)

// TEST_CODE
func doSomething(conn *ClientConn) (*pb.output, error) {
	fmt.Printf("Testing %v...\n", address)
	return nil, nil
}

func main() {
    // Connect to the server
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		fmt.Printf("did not connect: %v\n", err)
	}
	defer conn.Close()

    // Call TEST_CODE
	r, err := doSomething(conn)
	if err != nil {
		fmt.Printf("error: %v\n", err)
	} else {
	    fmt.Printf("%v\n", r.V)
	}
}
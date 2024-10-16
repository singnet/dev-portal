//go:generate protoc -I ./service_spec --go_out=plugins=grpc:./service_spec ./service_spec/tutorial.proto
// __PROJECT__
// __SERVICE_PORT__

package main

import (
	"fmt"
	"net"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	pb "__PROTO_DIR__"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":__SERVICE_PORT__"
)

type server struct{}

// SERVICE_API
func (s *server) doSomething(ctx context.Context, in *input) (*pb.output, error) {
	return nil, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
	}
	s := grpc.NewServer()

	// Check the compiled proto file (.pb.go) to get this Register method name
	pb.RegisterServiceDefinitionServer(s, &server{})
	reflection.Register(s)

	fmt.Printf("Server listening on 0.0.0.0%v\n", port)
	if err := s.Serve(lis); err != nil {
		fmt.Printf("Failed to serve: %v\n", err)
	}
}

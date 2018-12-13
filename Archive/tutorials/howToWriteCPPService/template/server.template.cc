#include <grpc/grpc.h>
#include <grpcpp/server.h>
#include <grpcpp/server_builder.h>
#include <grpcpp/server_context.h>
#include <grpcpp/security/server_credentials.h>

#include "__PROJECT__.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::ServerReader;
using grpc::ServerReaderWriter;
using grpc::ServerWriter;
using grpc::Status;

// PROTO_TYPES
using __PROJECT__::ServiceDefinition;
using __PROJECT__::Input;
using __PROJECT__::Output;

class ServiceImpl final : public ServiceDefinition::Service {

    public:

        explicit ServiceImpl() {
        }

        // SERVICE_API

        Status doSomething(ServerContext* context, const Input* input, Output* output) override {
            return Status::OK;
        }
};

void RunServer() {
    std::string server_address("0.0.0.0:__SERVICE_PORT__");
    ServiceImpl service;

    ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);
    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    server->Wait();
}

int main(int argc, char** argv) {
    RunServer();
    return 0;
}

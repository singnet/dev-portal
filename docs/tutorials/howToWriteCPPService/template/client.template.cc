#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>
#include <grpcpp/create_channel.h>
#include <grpcpp/security/credentials.h>
#include "__PROJECT__.grpc.pb.h"

using grpc::Channel;
using grpc::ClientContext;
using grpc::ClientReader;
using grpc::ClientReaderWriter;
using grpc::ClientWriter;
using grpc::Status;

// PROTO_TYPES
using __PROJECT__::ServiceDefinition;
using __PROJECT__::Numbers;
using __PROJECT__::Result;

class ServiceClient {

    public:

        ServiceClient(std::shared_ptr<Channel> channel) : stub_(ServiceDefinition::NewStub(channel)) {
        }

        // TEST_CODE

        void doSomething(int argc, char** argv) {
            Input input;
            Output output;

            ClientContext context;
            Status status = stub_->doSomething(&context, input, &output);
            if (status.ok()) {
            } else {
                std::cout << "doSomething rpc failed." << std::endl;
            }
        }

    private:

      std::unique_ptr<ServiceDefinition::Stub> stub_;
};

int main(int argc, char** argv) {
    ServiceClient guide(grpc::CreateChannel("localhost:__SERVICE_PORT__", grpc::InsecureChannelCredentials()));
    guide.doSomething(argc, argv);
    return 0;
}

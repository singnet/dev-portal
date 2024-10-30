import grpc

import echo_service_pb2
import echo_service_pb2_grpc

def main():
    channel = grpc.insecure_channel('localhost:12345')
    service = echo_service_pb2_grpc.EchoServiceStub(channel)

    request = echo_service_pb2.EchoRequest()
    request.message = "test"
    response = service.echo(request)
    print(response)

if __name__ == "__main__":
    main()

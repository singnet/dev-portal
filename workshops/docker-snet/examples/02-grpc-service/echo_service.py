from concurrent import futures
import grpc
import time

import echo_service_pb2
import echo_service_pb2_grpc

class EchoServiceServicer(echo_service_pb2_grpc.EchoServiceServicer):

  def echo(self, request, context):
      response = echo_service_pb2.EchoResponse()
      response.message = "echo: " + request.message
      return response


def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    echo_service_pb2_grpc.add_EchoServiceServicer_to_server(
        EchoServiceServicer(),
        server)
    server.add_insecure_port('127.0.0.1:12345')
    server.start()

    while True:
        time.sleep(1)

if __name__ == "__main__":
    main()

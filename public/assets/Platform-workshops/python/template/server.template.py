# __PROJECT__
# __SERVICE_PORT__

import sys
from concurrent import futures
import time

import grpc

sys.path.append("./service_spec")
import __PYTHON_PB2__ as pb2
import __PYTHON_PB2_GRPC__ as pb2_grpc


# SERVICE_API
class ServiceDefinition(pb2_grpc.ServiceDefinitionServicer):

    def doSomething(self, request, context):
        return pb2.Output()


def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_ServiceDefinitionServicer_to_server(ServiceDefinition(), server)
    server.add_insecure_port('[::]:__SERVICE_PORT__')
    server.start()
    print("Server listening on 0.0.0.0:{}".format(__SERVICE_PORT__))
    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    main()

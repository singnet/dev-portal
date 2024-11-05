# __PROJECT__
# __SERVICE_PORT__

import sys
import grpc

sys.path.append("./service_spec")
import __PYTHON_PB2__ as pb2
import __PYTHON_PB2_GRPC__ as pb2_grpc


# TEST_CODE
def doSomething(channel):
    # Check the compiled proto file (.py) to get method names
    stub = pb2_grpc.ServiceDefinitionStub(channel)
    response = stub.doSomething(pb2.Input())
    return response


def main():
    # Connect to the server
    with grpc.insecure_channel('localhost:__SERVICE_PORT__') as channel:
        # Call TEST_CODE
        doSomething(channel)


if __name__ == '__main__':
    main()
# Integration gRPC Service

## Overview

This guide demonstrates how to integrate your AI service with the SingularityNET platform using gRPC. The gRPC protocol provides efficient, language-agnostic communication with built-in support for streaming, authentication, and error handling.

## Prerequisites

Before starting, ensure you have:

- Python 3.10 or higher
- Basic understanding of Protocol Buffers
- Familiarity with gRPC concepts
- SingularityNET daemon installed

## Integration Steps

### Step 1: Define Your Service Protocol

Create a `.proto` file that describes your service interface. This file defines the request/response messages and service methods.

#### Example: `example.proto`

```protobuf
syntax = "proto3";

package example;

// Input message with multiple fields
message Query {
    string query = 1;
    bool _type = 2;
}

// Output message with multiple response fields
message Answer {
    string answer = 1;
    string answer2 = 2;
    string answer3 = 3;
}

// Service definition with RPC methods
service Example {
    rpc call(Query) returns (Answer) {}
}
```

### Step 2: Install Required Dependencies

Install the gRPC tools and runtime libraries:

```bash
# Install gRPC and Protocol Buffer compiler
python -m pip install grpcio grpcio-tools

# Optional: Install additional dependencies
python -m pip install grpcio-reflection  # For server reflection
python -m pip install grpcio-health-checking  # For health checks
```

### Step 3: Generate Python Code from Proto File

Use the Protocol Buffer compiler to generate Python bindings:

```bash
# Generate Python code from proto file
python -m grpc_tools.protoc \
    -I. \
    --python_out=. \
    --grpc_python_out=. \
    example.proto
```

This command generates two files:
- `example_pb2.py` - Contains message classes
- `example_pb2_grpc.py` - Contains service classes

### Step 4: Implement the gRPC Server

Create your service implementation by extending the generated servicer class:

#### `server.py`

```python
import time
import logging
import argparse
from concurrent import futures

import grpc
import example_pb2
import example_pb2_grpc
from utility import Model  # Your AI model or business logic

# Constants
_ONE_DAY_IN_SECONDS = 60 * 60 * 24
_MAX_WORKERS = 10

class calculatorr(example_pb2_grpc.calculatorr):
    """
    Service implementation class
    """
    
    def __init__(self):
        """Initialize your model or service dependencies"""
        self.model = Model()
        logging.info("Service initialized successfully")
    
    def call(self, request, context):
        """
        Implement the RPC method defined in proto file
        
        Args:
            request: The Query message from client
            context: gRPC context for the RPC
            
        Returns:
            Answer message with processing results
        """
        try:
            # Extract request parameters
            query = request.query
            _type = request._type
            
            # Process request using your model
            logging.info(f"Processing request: query='{query}', type={_type}")
            result, result2, result3 = self.model.predict(query, _type)
            
            # Log results for debugging
            logging.debug(f"Results: {result}, {result2}, {result3}")
            
            # Return response message
            return example_pb2.Answer(
                answer=result,
                answer2=result2,
                answer3=result3
            )
            
        except Exception as e:
            # Log error and set gRPC error status
            logging.error(f"Error processing request: {e}")
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return example_pb2.Answer()

def serve():
    """
    Start the gRPC server
    """
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='gRPC Server')
    parser.add_argument('--host', type=str, default='127.0.0.1',
                        help='Server host address')
    parser.add_argument('--port', type=int, default=8010,
                        help='Server port number')
    parser.add_argument('--workers', type=int, default=_MAX_WORKERS,
                        help='Maximum number of worker threads')
    args = parser.parse_args()
    
    # Configure server
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=args.workers),
        options=[
            ('grpc.max_send_message_length', 50 * 1024 * 1024),
            ('grpc.max_receive_message_length', 50 * 1024 * 1024)
        ]
    )
    
    # Add servicer to server
    example_pb2_grpc.add_calculatorr_to_server(
        calculatorr(), server
    )
    
    # Bind to address and start
    server_address = f"{args.host}:{args.port}"
    server.add_insecure_port(server_address)
    server.start()
    
    logging.info(f"Server started on {server_address}")
    logging.info("Press Ctrl+C to stop the server")
    
    # Keep server running
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        logging.info("Shutting down server...")
        server.stop(grace=5)  # 5 second grace period
        logging.info("Server stopped")

if __name__ == '__main__':
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Start server
    serve()
```

### Step 5: Create a Test Client

Implement a client to test your service:

#### `client.py`

```python
import time
import logging
import argparse

import grpc
import example_pb2
import example_pb2_grpc

def test_service(stub):
    """
    Test the service with sample data
    
    Args:
        stub: gRPC service stub
    """
    start_time = time.time()
    
    # Prepare request
    query = "What is artificial intelligence?"
    _type = True
    
    # Make RPC call
    request = example_pb2.Query(query=query, _type=_type)
    response = stub.call(request)
    
    # Calculate response time
    elapsed_time = time.time() - start_time
    
    # Display results
    print("\n" + "=" * 80)
    print(f"Response Time: {elapsed_time:.3f}s")
    print(f"Answer 1: {response.answer}")
    print(f"Answer 2: {response.answer2}")
    print(f"Answer 3: {response.answer3}")
    print("=" * 80 + "\n")

def run_client():
    """
    Run the gRPC client
    """
    # Parse arguments
    parser = argparse.ArgumentParser(description='gRPC Client')
    parser.add_argument('--host', default='127.0.0.1', type=str,
                        help='Server host address')
    parser.add_argument('--port', default=8010, type=int,
                        help='Server port number')
    parser.add_argument('--timeout', default=30, type=int,
                        help='Request timeout in seconds')
    args = parser.parse_args()
    
    # Create channel and stub
    server_address = f"{args.host}:{args.port}"
    
    with grpc.insecure_channel(
        server_address,
        options=[
            ('grpc.max_send_message_length', 50 * 1024 * 1024),
            ('grpc.max_receive_message_length', 50 * 1024 * 1024)
        ]
    ) as channel:
        # Create stub
        stub = example_pb2_grpc.ExampleStub(channel)
        
        try:
            # Test the service
            logging.info(f"Connecting to {server_address}")
            test_service(stub)
            
        except grpc.RpcError as e:
            logging.error(f"RPC failed: {e.code()}: {e.details()}")
        except Exception as e:
            logging.error(f"Unexpected error: {e}")

if __name__ == '__main__':
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    
    # Run client
    run_client()
```

### Step 6: Configure for SingularityNET

When registering your service with SingularityNET, specify the following parameters:

```bash
# Set service type to gRPC
snet service metadata-init \
    --service-type grpc \
    --encoding proto \
    ...
```

## Advanced Features

### Health Checking

Implement health checking for production services:

```python
from grpc_health.v1 import health_pb2_grpc
from grpc_health.v1.health import HealthServicer

# Add health servicer to your server
health_servicer = HealthServicer()
health_pb2_grpc.add_HealthServicer_to_server(health_servicer, server)
```

### Server Reflection

Enable server reflection for debugging:

```python
from grpc_reflection.v1alpha import reflection

# Enable reflection
reflection.enable_server_reflection(SERVICE_NAMES, server)
```

### SSL/TLS Security

For production deployments, use secure channels:

```python
# Load certificates
with open('server.crt', 'rb') as f:
    server_cert = f.read()
with open('server.key', 'rb') as f:
    server_key = f.read()

# Create credentials
credentials = grpc.ssl_server_credentials([(server_key, server_cert)])

# Add secure port
server.add_secure_port(server_address, credentials)
```

## Best Practices

### Error Handling

- Always wrap service methods in try-catch blocks
- Use appropriate gRPC status codes
- Provide meaningful error messages
- Log errors for debugging

### Performance Optimization

- Use connection pooling for clients
- Implement proper thread pools for servers
- Consider streaming for large data transfers
- Monitor and tune message size limits

### Testing

- Write unit tests for service methods
- Implement integration tests with test clients
- Use load testing tools for performance validation
- Test error scenarios and edge cases

## Troubleshooting

### Common Issues and Solutions

#### Port Already in Use

```bash
# Check if port is in use
netstat -an | grep 8010

# Kill process using the port
lsof -i :8010
kill -9 <PID>
```

#### Import Errors

```bash
# Ensure generated files are in Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

#### Connection Refused

- Verify server is running
- Check firewall settings
- Ensure correct host and port

## Resources

- [Protocol Buffers Guide](https://developers.google.com/protocol-buffers/docs/pythontutorial)
- [SingularityNET Daemon Documentation](https://github.com/singnet/snet-daemon)
- [Example Service Repository](https://github.com/singnet/example-service)

## Support

If you encounter issues or have questions:

1. Search existing [GitHub issues](https://github.com/singnet/snet-daemon/issues)
2. Contact support or open a new issue with detailed information

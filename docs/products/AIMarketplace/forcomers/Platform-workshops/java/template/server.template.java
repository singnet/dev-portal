import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;

import java.io.IOException;
import java.util.logging.Logger;

public class JavaServer {

    private static final Logger logger = Logger.getLogger(JavaServer.class.getName());

    private Server server;

    private void start() throws IOException {
        /* The port on which the server should run */
        int port = __SERVICE_PORT__;
        server = ServerBuilder.forPort(port)
                .addService(new ServiceDefinitionImpl())
                .build()
                .start();
        logger.info("Server listening on " + port);
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                // Use stderr here since the logger may have been reset by its JVM shutdown hook.
                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                JavaServer.this.stop();
                System.err.println("*** server shut down");
            }
        });
    }

    private void stop() {
        if (server != null) {
            server.shutdown();
        }
    }

    /**
     * Await termination on the main thread since the grpc library uses daemon threads.
     */
    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    /**
     * Main launches the server from the command line.
     */
    public static void main(String[] args) throws IOException, InterruptedException {
        final JavaServer server = new JavaServer();
        server.start();
        server.blockUntilShutdown();
    }

    //SERVICE_API
    static class ServiceDefinitionImpl extends ServiceDefinitionGrpc.ServiceDefinitionImplBase {

        @Override
        public void doSomething(Input request, StreamObserver<Output> responseObserver) {
            
        }
    }
}
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaClient {
    private static final Logger logger = Logger.getLogger(JavaClient.class.getName());

    private final ManagedChannel channel;
    private final ServiceDefinitionGrpc.ServiceDefinitionBlockingStub blockingStub;

    public JavaClient(String host, int port) {
        this(ManagedChannelBuilder.forAddress(host, port).usePlaintext().build());
    }

    JavaClient(ManagedChannel channel) {
        this.channel = channel;
        blockingStub = ServiceDefinitionGrpc.newBlockingStub(channel);
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    // TEST_CODE
    public void doSomething(int a, int b) {
    }

    public static void main(String[] args) throws Exception {
        JavaClient client = null;
        try {
            int port = __SERVICE_PORT__;
            int paramA = Integer.valueOf(args[0]);
            int paramB = Integer.valueOf(args[1]);
            client = new JavaClient("localhost", port);
            System.out.println("Client connected on port: " + String.valueOf(port));
            client.div(paramA, paramB);
        }catch (ArrayIndexOutOfBoundsException ex) {
            System.out.println("Two parameters needed. Example: 100 50");
            client.shutdown();
        }catch (Exception ex) {
            ex.printStackTrace();
        }finally {
            client.shutdown();
        }
    }
}
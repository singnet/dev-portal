# Introduce in training

## ❗️ Currently under development ❗️

The AI developer needs to implement 8 methods for daemon <a href="/assets/files/training.proto" download>training.proto</a>  
There will be no cost borne by the consumer in calling these methods,
pricing will apply when you actually call the training methods defined.
AI consumer will call all these methods:

```proto
service Model {

  // Free
  // Can pass the address of the model creator
  rpc create_model(NewModel) returns (ModelID) {}

  // Free
  rpc validate_model_price(ValidateRequest) returns (PriceInBaseUnit) {}

  // Paid
  rpc upload_and_validate(stream UploadInput) returns (StatusResponse) {}

  // Paid
  rpc validate_model(ValidateRequest) returns (StatusResponse) {}

  // Free, one signature for both train_model_price & train_model methods
  rpc train_model_price(ModelID) returns (PriceInBaseUnit) {}

  // Paid
  rpc train_model(ModelID) returns (StatusResponse) {}

  // Free
  rpc delete_model(ModelID) returns (StatusResponse) {
    // After model deletion, the status becomes DELETED in etcd
  }

  // Free
  rpc get_model_status(ModelID) returns (StatusResponse) {}
}
```

There will be no cost borne by the consumer in calling these methods, pricing will apply when you actually call the training methods defined.

## Scheme

<ImageViewer src="/assets/images/products/AIMarketplace/daemon/daemon_training.png" alt="The scheme of the daemon's work with training methods"/>

## Limitations

-   Only service type grpc support training;
-   You can't change training.proto file.

## Step by step

1.  Write your service proto file with training methods. You should mark training methods with trainingMethodIndicator from training.proto (import it):

    ```proto
    syntax = "proto3";
    package service;
    import "training.proto";
    option go_package = "../service";

    message sttResp{
        string result = 1;
    }

    message sttInput{
        training.ModelID model_id = 1;
        bytes speech = 2;
    }

    message randomInput{
        training.ModelID model_id = 1;
        string prompt = 2;
    }

    message randomOutput{
        string response = 2;
    }

    service TrainToUse {
        rpc random(randomInput) returns (randomOutput){}
    }

    service ProMethods{
        rpc stt(sttInput) returns (sttResp) {
            option (training.dataset_description) = "Additional requirements";
            option (training.dataset_files_type) = "png, mp4, txt, mp3";
            option (training.dataset_type) = "zip, tar.gz";
            option (training.dataset_max_count_files) = 100;
            option (training.dataset_max_size_mb) = 100;
            option (training.dataset_max_size_single_file_mb) = 10;
            option (training.default_model_id) = "default";
            option (training.max_models_per_user) = 5;
        }

        rpc easy_trained(sttInput) returns (sttResp) {
            option (training.dataset_type) = "zip";
            option (training.dataset_max_size_mb) = 25;
            option (training.default_model_id) = "default";
            option (training.max_models_per_user) = 100;
        }
    }

    message BasicSttInput {
        string text = 1;
    }

    service BasicMethods{
        // basic method without modelID
        rpc stt(BasicSttInput) returns(sttResp){

        }

        // basic method without modelID
        rpc easy(BasicSttInput) returns(sttResp){

        }
    }
    ```


2.  [Generate gRPC code](https://grpc.io/docs/languages/python/quickstart/#generate-grpc-code) for your programming language.
    For example, we will use Python.

        Install grpc tools for python:
    ```sh
    pip3 install grpcio
    pip3 install grpcio-tools
    ```

    Then generate pb files for training.proto and for your service.proto:
    ```sh
    python -m grpc_tools.protoc -I. --python_out=. --pyi_out=. --grpc_python_out=. .\training.proto
    ```

3.  Implement and write server logic for model methods. Example:

    ```python
    from concurrent import futures
    import grpc

    import training_pb2_grpc
    import training_pb2
    from training_pb2_grpc import ModelServicer

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    training_pb2_grpc.add_ModelServicer_to_server(ModelServicer(), server)
    server.add_insecure_port("[::]:5002")  # you should use this port in daemon in config.model_training_endpoint
    server.start()
    server.wait_for_termination()


    class Training(training_pb2_grpc.ModelServicer):

        def create_model(self, request, context):
            # your logic
            # model_id = generate_model_ID()
            return training_pb2.ModelID(model_id="NEW_RANDOM_ID")

        def get_model_status(self, request, context):
            # your logic
            # TODO
            return training_pb2.StatusResponse(training_pb2.READY_TO_USE)

        def delete_model(self, request, context):
            # your logic
            # TODO
            return training_pb2.StatusResponse(training_pb2.DELETED)

        def validate_model_price(self, request, context):
            # your logic
            # TODO
            return training_pb2.PriceInBaseUnit(price=1)  # 1 cog

        def train_model_price(self, request, context):
            # your logic
            # TODO
            return training_pb2.PriceInBaseUnit(price=1)  # 1 cog

        def train_model(self, request, context):
            # your logic
            # TODO
            return training_pb2.StatusResponse(training_pb2.TRAINING)

        def upload_and_validate(self, request, context):
            # your logic
            # TODO
            return training_pb2.StatusResponse(training_pb2.VALIDATING)
        def validate_model(self, request, context):
            # your logic
            # TODO
            return training_pb2.StatusResponse(training_pb2.VALIDATING)

    ```

4.  Then implement your service proto and run service.

5.  Prepare daemon config and run daemon:

    `model_maintenance_endpoint` — this is for gRPC server endpoint for Model Maintenance like create_model, delete_model, get_model_status (example in 3 point);

    `model_training_endpoint` — this is for gRPC server endpoint for your training methods;

    `model_training_enabled` — need to be true for training.

    But you can use one endpoint for all configs (model_maintenance_endpoint, model_training_endpoint, service_endpoint).

    **Notice**: If in config `enable_dynamic_pricing` is True and method is training (trainingMethodIndicator = "true") request will go
    through model_training_endpoint instead of service_endpoint.

6.  Test and call model methods via SDK, for example: [Python SDK](/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaSDK/)
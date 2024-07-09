---
# Page settings
layout: default
keywords: triton onboarding
comments: false
title: Deploying triton-based service to the SNET platform
description: Deploying triton-based service to the SNET platform

# Micro navigation
micro_nav: true
---

# Deploying triton-based service to the SNET platform
This document provides all necessary information on how to deploy your AI service using Triton Inference Server and publish it to the SingularityNET platform.

This is a general instruction, if you want to see ready-to-deploy service - you can referense [this repository](https://github.com/singnet/Hate-Speech-Triton)

## Guideline for deploying service
The guide will consist of the following steps:
1. [Converting model to onnx format](#convert)
2. [Organization of the service repository](#repo)
3. [Setting up configuration files](#setup)
4. [Local deployment and usage](#dev)
5. [Moving post and preprocessing to the backend](#ens)
6. [Using dynamic batching and instance group](#imp)
7. [Preparing protobuf files for publishing](#proto)
8. [Preparing service demo frontend files](#demo)
9. [Publishing service on marketplace](#publish)

<a name="convert">1. Converting model to onnx format</a>
This can be done multiple ways from different frameworks (pytorch, tensorflow, huggingface and etc.)
You can find examples and instructions on how to do it in these links:

[Github](https://github.com/triton-inference-server/tutorials/tree/main/Conceptual_Guide/Part_1-model_deployment)

[HuggingFace](https://huggingface.co/blog/convert-transformers-to-onnx)

[PyTorch](https://pytorch.org/tutorials/advanced/super_resolution_with_onnxruntime.html)

<a name="repo">2. Organization of the service repository</a>
The repository should look like:
```
service_model_repo/
└── your_service
    ├── 1
    │   └── model.onnx
    └── config.pbtxt
```

Where:
1. `service_model_repo` - service root directory
2. `your_service` - model directory
3. folder `1` - contain models under version 1
4. `config.pbtxt` - models configurations files

<a name="setup">3. Setting up configuration files</a>
Your `config.pbtxt` for model should look something like this:
```
name: "your_service"
backend: "onnxruntime"
max_batch_size : 0

input [
    {
        name: "input_ids"
        data_type: TYPE_INT64
        dims: [ 1 , -1 ]
    },
    {
        name: "attention_mask"
        data_type: TYPE_INT64
        dims: [ 1, -1 ]
    }
]
output [
    {
        name: "output"
        data_type: TYPE_FP32
        dims: [ -1, 4 ]
    }
]
```
Where:
1. `name` - service directory name
2. `backend` - selected backend ([More info](https://github.com/triton-inference-server/backend))
3. `max_batch_size` - batch size limit
4. `input` and `output` blocks - blocks describing input and output tensors
5. Block fields:
   + `name` - name of tensor
   + `data_type` - tensor data type
   + `dims` - tensor dimensions

How to define dims:

In case of our example service: we are working with a BERT-like model which has standard inputs input_ids and focus_mask. The shape of which is `[1, -1]` (One-dimensional tensor of length N).

The result is known in advance because the model returns a list of four elements (each element is the probability that the text belongs to the class at that index). Therefore, the output form will be `[-1, 4]`, `-1` since the model can accept N texts at a time.

From here you can also establish that the inputs are of type `INT` and the output is `FLOAT`.

You should adjust this config file to represent input and output format of model you use. This is just the example on how to format the file.

<a name="dev">4. Local deployment and usage</a>
Launching the docker-based inference server:
```
docker run --gpus='"device=0"' -it --shm-size=256m --rm -p8000:8000 -p8001:8001 -p8002:8002 -v /{full_path_to}/service_model_repo:/models nvcr.io/nvidia/tritonserver:23.12-py3 tritonserver --model-repository=/models

Replace {full_path_to} with absolute path to parent directory of service_model_repo folder
```

Building a client application (python):

```python
import struct

import torch
from transformers import AutoTokenizer
import tritonclient.http as httpclient

from BERTweet.TweetNormalizer import normalizeTweet

# Sample text
text = 'Sample text'

# Tokenize and preprocess the text
tokenizer = AutoTokenizer.from_pretrained("vinai/bertweet-large")
normalized_text = normalizeTweet(text)
tokens = tokenizer(normalized_text, padding="longest", return_tensors="pt")
tokens = {k: torch.tensor(v, device='cpu') for k, v in tokens.items()}
# Extract input tensors
input_ids = tokens['input_ids']
attention_mask = tokens['attention_mask']

# Instantiate the Triton HTTP client
client = httpclient.InferenceServerClient(url="localhost:8000")

# Create InferInput objects for each input tensor
input_ids_input = httpclient.InferInput("input_ids", input_ids.shape, datatype="INT64")
input_ids_input.set_data_from_numpy(input_ids.cpu().numpy(), binary_data=True)

attention_mask_input = httpclient.InferInput("attention_mask", attention_mask.shape, datatype="INT64")
attention_mask_input.set_data_from_numpy(attention_mask.cpu().numpy(), binary_data=True)

# Perform inference
inputs = [input_ids_input, attention_mask_input]
response = client.infer(model_name="hate_speech_detection", inputs=inputs)

# Optionally, you can print the response
response_dict = vars(response)

# Assuming _buffer contains the binary data
binary_data = response_dict['_buffer']

# Decode binary data based on the datatype (FP32 in this case)
decoded_data = struct.unpack('f' * (len(binary_data) // 4), binary_data)

# Assuming the prediction is a list of probabilities
prediction = list(decoded_data)

# generate answer
res = []
res.append({"text": text,
            "hate": prediction[0],
            "abusing": prediction[1],
            "neutral": prediction[2],
            "spam": prediction[3]})
print(res)
```

Make call:

```
# pip install tritonclient[http]

python client.py
```

<a name="ens">5. Moving post and preprocessing to the backend</a>
The client application from the last part turned out to be unnecessary large. Let's move post and preprocessing to our backend to fix it.

Need to use [Model Ensembles](https://github.com/triton-inference-server/tutorials/tree/main/Conceptual_Guide/Part_5-Model_Ensembles)

Here is an repo folder structure for our example service, your final repository will look something like this:
```
hatespeech_repo/
├── hate_speech_detection
│   ├── 1
│   │   └── model.onnx
│   └── config.pbtxt
└── ensemble_model
│   ├── 1
│   │   
│   └── config.pbtxt
└── preprocessing
│   ├── 1
│   │   └── model.py
│   └── config.pbtxt
└── postprocessing
    ├── 1
    │   │
    │   └──BERTweet
    │   │         └──TweetNormalizer.py
    │   └── model.py
    └── config.pbtxt
```
After write configs:

`preprocessing:`
```
name: "preprocessing"
backend: "python"
max_batch_size: 0
input [
    {
        name: "input_text"
        data_type: TYPE_STRING
        dims: [ -1 ]
    }
]
output [
    {
        name: "input_ids"
        data_type: TYPE_INT64
        dims: [ 1, -1 ]
    },
    {
    name: "attention_mask"
    data_type: TYPE_INT64
    dims: [ 1, -1 ]
    }
]
```

`postprocessing:`
```
name: "postprocessing"
backend: "python"
max_batch_size: 0
input [
    {
        name: "output"
        data_type: TYPE_FP32
        dims: [ -1, 4 ]
    }
]
output [
    {
        name: "answer"
        data_type: TYPE_STRING
        dims: [ -1 ]
    }
]
```
`ensemble_model:`

```
name: "ensemble_model"
platform: "ensemble"
max_batch_size: 0
input [
  {
    name: "input_text"
    data_type: TYPE_STRING
    dims: [ -1 ]
  }
]
output [
  {
    name: "answer"
    data_type: TYPE_STRING
    dims: [ -1 ]
  }
]

ensemble_scheduling {
  step [
    {
      model_name: "preprocessing"
      model_version: -1
      input_map {
        key: "input_text"
        value: "input_text"
      }
      output_map {
        key: "input_ids"
        value: "input_ids"
      }
      output_map {
        key: "attention_mask"
        value: "attention_mask"
      }
    },
    {
      model_name: "hate_speech_detection"
      model_version: -1
      input_map {
        key: "input_ids"
        value: "input_ids"
      }
      input_map {
        key: "attention_mask"
        value: "attention_mask"
      }
      output_map {
        key: "output"
        value: "output"
      }
    },
    {
      model_name: "postprocessing"
      model_version: -1
      input_map {
        key: "output"
        value: "output"
      }
      output_map {
        key: "answer"
        value: "answer"
      }
    }
  ]
}
```

`hate_speech_detection` the same from previous parts.

Configs done, now on to model.py files.

`preprocessing:`

```python
import json

import torch
from transformers import AutoTokenizer
import triton_python_backend_utils as pb_utils

from BERTweet.TweetNormalizer import normalizeTweet


class TritonPythonModel:
    """Your Python model must use the same class name. Every Python model
    that is created must have "TritonPythonModel" as the class name.
    """

    def initialize(self, args):
        """`initialize` is called only once when the model is being loaded.
        Implementing `initialize` function is optional. This function allows
        the model to initialize any state associated with this model.
        Parameters
        ----------
        args : dict
          Both keys and values are strings. The dictionary keys and values are:
          * model_config: A JSON string containing the model configuration
          * model_instance_kind: A string containing model instance kind
          * model_instance_device_id: A string containing model instance device ID
          * model_repository: Model repository path
          * model_version: Model version
          * model_name: Model name
        """

        # You must parse model_config. JSON string is not parsed here
        model_config = json.loads(args["model_config"])

        # Get OUTPUT0 configuration
        output0_config = pb_utils.get_output_config_by_name(
            model_config, "input_ids"
        )

        # Convert Triton types to numpy types
        self.output0_dtype = pb_utils.triton_string_to_numpy(
            output0_config["data_type"]
        )

        # Get OUTPUT1 configuration
        output1_config = pb_utils.get_output_config_by_name(
            model_config, "attention_mask"
        )

        # Convert Triton types to numpy types
        self.output1_dtype = pb_utils.triton_string_to_numpy(
            output1_config["data_type"]
        )

    def execute(self, requests):
        """`execute` MUST be implemented in every Python model. `execute`
        function receives a list of pb_utils.InferenceRequest as the only
        argument. This function is called when an inference request is made
        for this model. Depending on the batching configuration (e.g. Dynamic
        Batching) used, `requests` may contain multiple requests. Every
        Python model, must create one pb_utils.InferenceResponse for every
        pb_utils.InferenceRequest in `requests`. If there is an error, you can
        set the error argument when creating a pb_utils.InferenceResponse
        Parameters
        ----------
        requests : list
          A list of pb_utils.InferenceRequest
        Returns
        -------
        list
          A list of pb_utils.InferenceResponse. The length of this list must
          be the same as `requests`
        """

        output0_dtype = self.output0_dtype
        output1_dtype = self.output1_dtype
        responses = []

        # Every Python backend must iterate over everyone of the requests
        # and create a pb_utils.InferenceResponse for each of them.
        for request in requests:
            # Get INPUT0
            in_1 = pb_utils.get_input_tensor_by_name(
                request, "input_text"
            )
            
            # Preprocessing inputs 
            tokenizer = AutoTokenizer.from_pretrained("vinai/bertweet-large")
            in_1 = in_1.as_numpy()
            in_1[0] = in_1[0].decode('utf-8')
            text = [normalizeTweet(in_1[0])]
            input_ids = tokenizer(text, return_tensors="pt")
            tokens = {k: torch.tensor(v, device='cpu') for k, v in input_ids.items()}

            # Extract input tensors
            input_ids = tokens['input_ids']
            attention_mask = tokens['attention_mask']

            
            out_tensor_0 = pb_utils.Tensor(
                "input_ids", input_ids.numpy().astype(output0_dtype)
            )

            out_tensor_1 = pb_utils.Tensor(
                "attention_mask", attention_mask.numpy().astype(output1_dtype)
            )

            # Create InferenceResponse. You can set an error here in case
            # there was a problem with handling this inference request.
            # Below is an example of how you can set errors in inference
            # response:
            #
            # pb_utils.InferenceResponse(
            #    output_tensors=..., TritonError("An error occurred"))
            inference_response = pb_utils.InferenceResponse(
                output_tensors=[out_tensor_0, out_tensor_1]
            )
            responses.append(inference_response)
        # You should return a list of pb_utils.InferenceResponse. Length
        # of this list must match the length of `requests` list.
        return responses

    def finalize(self):
        """`finalize` is called only once when the model is being unloaded.
        Implementing `finalize` function is OPTIONAL. This function allows
        the model to perform any necessary clean ups before exit.
        """
        print("Cleaning up...")
```

`postprocessing:`

```python
import json

import numpy as np
import triton_python_backend_utils as pb_utils


class TritonPythonModel:
    """Your Python model must use the same class name. Every Python model
    that is created must have "TritonPythonModel" as the class name.
    """

    def initialize(self, args):
        """`initialize` is called only once when the model is being loaded.
        Implementing `initialize` function is optional. This function allows
        the model to initialize any state associated with this model.
        Parameters
        ----------
        args : dict
          Both keys and values are strings. The dictionary keys and values are:
          * model_config: A JSON string containing the model configuration
          * model_instance_kind: A string containing model instance kind
          * model_instance_device_id: A string containing model instance device ID
          * model_repository: Model repository path
          * model_version: Model version
          * model_name: Model name
        """

        # You must parse model_config. JSON string is not parsed here
        model_config = json.loads(args["model_config"])

        # Get OUTPUT0 configuration
        output0_config = pb_utils.get_output_config_by_name(
            model_config, "answer"
        )

        # Convert Triton types to numpy types
        self.output0_dtype = pb_utils.triton_string_to_numpy(
            output0_config["data_type"]
        )

    def execute(self, requests):
        """`execute` MUST be implemented in every Python model. `execute`
        function receives a list of pb_utils.InferenceRequest as the only
        argument. This function is called when an inference request is made
        for this model. Depending on the batching configuration (e.g. Dynamic
        Batching) used, `requests` may contain multiple requests. Every
        Python model, must create one pb_utils.InferenceResponse for every
        pb_utils.InferenceRequest in `requests`. If there is an error, you can
        set the error argument when creating a pb_utils.InferenceResponse
        Parameters
        ----------
        requests : list
          A list of pb_utils.InferenceRequest
        Returns
        -------
        list
          A list of pb_utils.InferenceResponse. The length of this list must
          be the same as `requests`
        """

        output0_dtype = self.output0_dtype
        responses = []

        # Every Python backend must iterate over everyone of the requests
        # and create a pb_utils.InferenceResponse for each of them.
        for request in requests:
            # Get INPUT0
            in_1 = pb_utils.get_input_tensor_by_name(
                request, "output"
            )
            in_1 = in_1.as_numpy()[0]

            # Assuming the prediction is a list of probabilities
            prediction = list(in_1)
            # generate answer
            answ = json.dumps({
                "hate": str(prediction[0]),
                "abusing": str(prediction[1]),
                "neutral": str(prediction[2]),
                "spam": str(prediction[3])
                })
            
            answ = np.array([answ], dtype="object")
            out_tensor_0 = pb_utils.Tensor(
                "answer", answ
            )

            # Create InferenceResponse. You can set an error here in case
            # there was a problem with handling this inference request.
            # Below is an example of how you can set errors in inference
            # response:
            #
            # pb_utils.InferenceResponse(
            #    output_tensors=..., TritonError("An error occurred"))
            inference_response = pb_utils.InferenceResponse(
                output_tensors=[out_tensor_0]
            )
            responses.append(inference_response)
        # You should return a list of pb_utils.InferenceResponse. Length
        # of this list must match the length of `requests` list.
        return responses

    def finalize(self):
        """`finalize` is called only once when the model is being unloaded.
        Implementing `finalize` function is OPTIONAL. This function allows
        the model to perform any necessary clean ups before exit.
        """
        print("Cleaning up...")
```

Everything is ready to start the server:
```
docker run --gpus='"device=0"' -it --shm-size=256m --rm -p8000:8000 -p8001:8001 -p8002:8002 -v /{full_path_to}/service_model_repo:/models nvcr.io/nvidia/tritonserver:23.12-py3 tritonserver --model-repository=/models
```

Building a client application:
```python
import time

import numpy as np
import tritonclient.grpc as grpcclient
from tritonclient.utils import np_to_triton_dtype


# define client
client = grpcclient.InferenceServerClient(url="localhost:8001")

# processing text
text_data = 'Sample text'
text_obj = np.array([text_data], dtype="object")

# convert input to tensor
input_tensors = [grpcclient.InferInput("input_text", text_obj.shape, np_to_triton_dtype(text_obj.dtype))]
input_tensors[0].set_data_from_numpy(text_obj)

# make call 
start_time = time.time()
results = client.infer(model_name="ensemble_model", inputs=input_tensors)
print("--- %s seconds ---" % (time.time() - start_time))

# convert answer to string
output_data = results.as_numpy("answer").astype(str)
print(output_data)
```
Then run client application:
```
# conda activate env_name
python client.py
# answer: ['{"hate": "0.0007111975", "abusing": "0.0004021231", "neutral": "0.0011137378", "spam": "0.9977728"}']
```

<a name="imp">6. Using dynamic batching and instance group</a>
Dynamic Batching and Concurrent Model Execution are features of Triton that improve throughput ([More info](https://github.com/triton-inference-server/tutorials/tree/main/Conceptual_Guide/Part_2-improving_resource_utilization)).
To use them, just add the model configuration file:
```
name: "postprocessing"
backend: "python"
max_batch_size: 0
input [
    {
        name: "output"
        data_type: TYPE_FP32
        dims: [ -1, 4 ]
    }
]
output [
    {
        name: "answer"
        data_type: TYPE_STRING
        dims: [ -1 ]
    }
]

instance_group [{ kind: KIND_GPU }]
dynamic_batching { }
```
Also you can analyze you model using [Triton Analyzer](https://github.com/triton-inference-server/tutorials/tree/main/Conceptual_Guide/Part_2-improving_resource_utilization#measuring-performance)

<a name="proto">7. Preparing proto files for publishing</a>
Though you can use default triton protobuf files for publishing, it is not recommended. The reason is that default proto files contain configuration and management methods, which can be accessed by users. So to avoid ill intent actions from the users, proto files are reduced to contain only methods which are necessary to call the service.

```protobuf
// This is a .proto file for platform services utilizing Triton Inference Server
// All configuration methods are removed, leaving only methods for service calls
// This is done to remove risk of ill intent actions from users to modify your
// model or server. If you need original functionality of Triton server feel free
// to use original .proto files which can be found here: 
// https://github.com/triton-inference-server/common/tree/main/protobuf
// Please note that health.proto uses the same name as internal proto file of the daemon
// If you need this functionaluty rename health file to something else and use accordingly.

syntax = "proto3";

package inference;

//@@.. cpp:namespace:: inference

//@@
//@@.. cpp:var:: service InferenceService
//@@
//@@   Inference Server GRPC endpoints.
//@@
service GRPCInferenceService
{
  //@@  .. cpp:var:: rpc ModelInfer(ModelInferRequest) returns
  //@@       (ModelInferResponse)
  //@@
  //@@     Perform inference using a specific model.
  //@@
  rpc ModelInfer(ModelInferRequest) returns (ModelInferResponse) {}

  //@@  .. cpp:var:: rpc ModelStreamInfer(stream ModelInferRequest) returns
  //@@       (stream ModelStreamInferResponse)
  //@@
  //@@     Perform streaming inference.
  //@@
  rpc ModelStreamInfer(stream ModelInferRequest) returns (stream ModelStreamInferResponse) {}
}

//@@
//@@.. cpp:var:: message InferParameter
//@@
//@@   An inference parameter value.
//@@
message InferParameter
{
  //@@  .. cpp:var:: oneof parameter_choice
  //@@
  //@@     The parameter value can be a string, an int64,
  //@@     an uint64, a double, or a boolean
  //@@
  //@@     Note: double and uint64 are currently
  //@@           placeholders for future use and
  //@@           are not supported for custom parameters
  //@@
  oneof parameter_choice
  {
    //@@    .. cpp:var:: bool bool_param
    //@@
    //@@       A boolean parameter value.
    //@@
    bool bool_param = 1;

    //@@    .. cpp:var:: int64 int64_param
    //@@
    //@@       An int64 parameter value.
    //@@
    int64 int64_param = 2;

    //@@    .. cpp:var:: string string_param
    //@@
    //@@       A string parameter value.
    //@@
    string string_param = 3;

    //@@    .. cpp:var:: double double_param
    //@@
    //@@       A double parameter value.
    //@@
    double double_param = 4;

    //@@    .. cpp:var:: uint64 uint64_param
    //@@
    //@@       A uint64 parameter value.
    //@@
    //@@       Not supported for custom parameters
    //@@
    uint64 uint64_param = 5;
  }
}

//@@
//@@.. cpp:var:: message InferTensorContents
//@@
//@@   The data contained in a tensor represented by the repeated type
//@@   that matches the tensor's data type. Protobuf oneof is not used
//@@   because oneofs cannot contain repeated fields.
//@@
message InferTensorContents
{
  //@@
  //@@  .. cpp:var:: bool bool_contents (repeated)
  //@@
  //@@     Representation for BOOL data type. The size must match what is
  //@@     expected by the tensor's shape. The contents must be the flattened,
  //@@     one-dimensional, row-major order of the tensor elements.
  //@@
  repeated bool bool_contents = 1;

  //@@
  //@@  .. cpp:var:: int32 int_contents (repeated)
  //@@
  //@@     Representation for INT8, INT16, and INT32 data types. The size
  //@@     must match what is expected by the tensor's shape. The contents
  //@@     must be the flattened, one-dimensional, row-major order of the
  //@@     tensor elements.
  //@@
  repeated int32 int_contents = 2;

  //@@
  //@@  .. cpp:var:: int64 int64_contents (repeated)
  //@@
  //@@     Representation for INT64 data types. The size must match what
  //@@     is expected by the tensor's shape. The contents must be the
  //@@     flattened, one-dimensional, row-major order of the tensor elements.
  //@@
  repeated int64 int64_contents = 3;

  //@@
  //@@  .. cpp:var:: uint32 uint_contents (repeated)
  //@@
  //@@     Representation for UINT8, UINT16, and UINT32 data types. The size
  //@@     must match what is expected by the tensor's shape. The contents
  //@@     must be the flattened, one-dimensional, row-major order of the
  //@@     tensor elements.
  //@@
  repeated uint32 uint_contents = 4;

  //@@
  //@@  .. cpp:var:: uint64 uint64_contents (repeated)
  //@@
  //@@     Representation for UINT64 data types. The size must match what
  //@@     is expected by the tensor's shape. The contents must be the
  //@@     flattened, one-dimensional, row-major order of the tensor elements.
  //@@
  repeated uint64 uint64_contents = 5;

  //@@
  //@@  .. cpp:var:: float fp32_contents (repeated)
  //@@
  //@@     Representation for FP32 data type. The size must match what is
  //@@     expected by the tensor's shape. The contents must be the flattened,
  //@@     one-dimensional, row-major order of the tensor elements.
  //@@
  repeated float fp32_contents = 6;

  //@@
  //@@  .. cpp:var:: double fp64_contents (repeated)
  //@@
  //@@     Representation for FP64 data type. The size must match what is
  //@@     expected by the tensor's shape. The contents must be the flattened,
  //@@     one-dimensional, row-major order of the tensor elements.
  //@@
  repeated double fp64_contents = 7;

  //@@
  //@@  .. cpp:var:: bytes bytes_contents (repeated)
  //@@
  //@@     Representation for BYTES data type. The size must match what is
  //@@     expected by the tensor's shape. The contents must be the flattened,
  //@@     one-dimensional, row-major order of the tensor elements.
  //@@
  repeated bytes bytes_contents = 8;
}

//@@
//@@.. cpp:var:: message ModelInferRequest
//@@
//@@   Request message for ModelInfer.
//@@
message ModelInferRequest
{
  //@@
  //@@  .. cpp:var:: message InferInputTensor
  //@@
  //@@     An input tensor for an inference request.
  //@@
  message InferInputTensor
  {
    //@@
    //@@    .. cpp:var:: string name
    //@@
    //@@       The tensor name.
    //@@
    string name = 1;

    //@@
    //@@    .. cpp:var:: string datatype
    //@@
    //@@       The tensor data type.
    //@@
    string datatype = 2;

    //@@
    //@@    .. cpp:var:: int64 shape (repeated)
    //@@
    //@@       The tensor shape.
    //@@
    repeated int64 shape = 3;

    //@@    .. cpp:var:: map<string,InferParameter> parameters
    //@@
    //@@       Optional inference input tensor parameters.
    //@@
    map<string, InferParameter> parameters = 4;

    //@@    .. cpp:var:: InferTensorContents contents
    //@@
    //@@       The tensor contents using a data-type format. This field
    //@@       must not be specified if tensor contents are being specified
    //@@       in ModelInferRequest.raw_input_contents.
    //@@
    InferTensorContents contents = 5;
  }

  //@@
  //@@  .. cpp:var:: message InferRequestedOutputTensor
  //@@
  //@@     An output tensor requested for an inference request.
  //@@
  message InferRequestedOutputTensor
  {
    //@@
    //@@    .. cpp:var:: string name
    //@@
    //@@       The tensor name.
    //@@
    string name = 1;

    //@@    .. cpp:var:: map<string,InferParameter> parameters
    //@@
    //@@       Optional requested output tensor parameters.
    //@@
    map<string, InferParameter> parameters = 2;
  }

  //@@  .. cpp:var:: string model_name
  //@@
  //@@     The name of the model to use for inferencing.
  //@@
  string model_name = 1;

  //@@  .. cpp:var:: string model_version
  //@@
  //@@     The version of the model to use for inference. If not
  //@@     given the latest/most-recent version of the model is used.
  //@@
  string model_version = 2;

  //@@  .. cpp:var:: string id
  //@@
  //@@     Optional identifier for the request. If specified will be
  //@@     returned in the response.
  //@@
  string id = 3;

  //@@  .. cpp:var:: map<string,InferParameter> parameters
  //@@
  //@@     Optional inference parameters.
  //@@
  map<string, InferParameter> parameters = 4;

  //@@
  //@@  .. cpp:var:: InferInputTensor inputs (repeated)
  //@@
  //@@     The input tensors for the inference.
  //@@
  repeated InferInputTensor inputs = 5;

  //@@
  //@@  .. cpp:var:: InferRequestedOutputTensor outputs (repeated)
  //@@
  //@@     The requested output tensors for the inference. Optional, if not
  //@@     specified all outputs specified in the model config will be
  //@@     returned.
  //@@
  repeated InferRequestedOutputTensor outputs = 6;

  //@@
  //@@  .. cpp:var:: bytes raw_input_contents
  //@@
  //@@     The data contained in an input tensor can be represented in
  //@@     "raw" bytes form or in the repeated type that matches the
  //@@     tensor's data type. Using the "raw" bytes form will
  //@@     typically allow higher performance due to the way protobuf
  //@@     allocation and reuse interacts with GRPC. For example, see
  //@@     https://github.com/grpc/grpc/issues/23231.
  //@@
  //@@     To use the raw representation 'raw_input_contents' must be
  //@@     initialized with data for each tensor in the same order as
  //@@     'inputs'. For each tensor, the size of this content must
  //@@     match what is expected by the tensor's shape and data
  //@@     type. The raw data must be the flattened, one-dimensional,
  //@@     row-major order of the tensor elements without any stride
  //@@     or padding between the elements. Note that the FP16 and BF16 data
  //@@     types must be represented as raw content as there is no
  //@@     specific data type for a 16-bit float type.
  //@@
  //@@     If this field is specified then InferInputTensor::contents
  //@@     must not be specified for any input tensor.
  //@@
  repeated bytes raw_input_contents = 7;
}

//@@
//@@.. cpp:var:: message ModelInferResponse
//@@
//@@   Response message for ModelInfer.
//@@
message ModelInferResponse
{
  //@@
  //@@  .. cpp:var:: message InferOutputTensor
  //@@
  //@@     An output tensor returned for an inference request.
  //@@
  message InferOutputTensor
  {
    //@@
    //@@    .. cpp:var:: string name
    //@@
    //@@       The tensor name.
    //@@
    string name = 1;

    //@@
    //@@    .. cpp:var:: string datatype
    //@@
    //@@       The tensor data type.
    //@@
    string datatype = 2;

    //@@
    //@@    .. cpp:var:: int64 shape (repeated)
    //@@
    //@@       The tensor shape.
    //@@
    repeated int64 shape = 3;

    //@@    .. cpp:var:: map<string,InferParameter> parameters
    //@@
    //@@       Optional output tensor parameters.
    //@@
    map<string, InferParameter> parameters = 4;

    //@@    .. cpp:var:: InferTensorContents contents
    //@@
    //@@       The tensor contents using a data-type format. This field
    //@@       must not be specified if tensor contents are being specified
    //@@       in ModelInferResponse.raw_output_contents.
    //@@
    InferTensorContents contents = 5;
  }

  //@@  .. cpp:var:: string model_name
  //@@
  //@@     The name of the model used for inference.
  //@@
  string model_name = 1;

  //@@  .. cpp:var:: string model_version
  //@@
  //@@     The version of the model used for inference.
  //@@
  string model_version = 2;

  //@@  .. cpp:var:: string id
  //@@
  //@@     The id of the inference request if one was specified.
  //@@
  string id = 3;

  //@@  .. cpp:var:: map<string,InferParameter> parameters
  //@@
  //@@     Optional inference response parameters.
  //@@
  map<string, InferParameter> parameters = 4;

  //@@
  //@@  .. cpp:var:: InferOutputTensor outputs (repeated)
  //@@
  //@@     The output tensors holding inference results.
  //@@
  repeated InferOutputTensor outputs = 5;

  //@@
  //@@  .. cpp:var:: bytes raw_output_contents
  //@@
  //@@     The data contained in an output tensor can be represented in
  //@@     "raw" bytes form or in the repeated type that matches the
  //@@     tensor's data type. Using the "raw" bytes form will
  //@@     typically allow higher performance due to the way protobuf
  //@@     allocation and reuse interacts with GRPC. For example, see
  //@@     https://github.com/grpc/grpc/issues/23231.
  //@@
  //@@     To use the raw representation 'raw_output_contents' must be
  //@@     initialized with data for each tensor in the same order as
  //@@     'outputs'. For each tensor, the size of this content must
  //@@     match what is expected by the tensor's shape and data
  //@@     type. The raw data must be the flattened, one-dimensional,
  //@@     row-major order of the tensor elements without any stride
  //@@     or padding between the elements. Note that the FP16 and BF16 data
  //@@     types must be represented as raw content as there is no
  //@@     specific data type for a 16-bit float type.
  //@@
  //@@     If this field is specified then InferOutputTensor::contents
  //@@     must not be specified for any output tensor.
  //@@
  repeated bytes raw_output_contents = 6;
}

//@@
//@@.. cpp:var:: message ModelStreamInferResponse
//@@
//@@   Response message for ModelStreamInfer.
//@@
message ModelStreamInferResponse
{
  //@@
  //@@  .. cpp:var:: string error_message
  //@@
  //@@     The message describing the error. The empty message
  //@@     indicates the inference was successful without errors.
  //@@
  string error_message = 1;

  //@@
  //@@  .. cpp:var:: ModelInferResponse infer_response
  //@@
  //@@     Holds the results of the request.
  //@@
  ModelInferResponse infer_response = 2;
}
```

<a name="demo">8. Preparing service demo frontend files</a>

There is no "right" way to do it, you can approach this step in many different ways. But you can checkout [this repo](https://github.com/singnet/Hate-Speech-Triton) and use it as an working example.

<a name="publish">9. Publishing service on marketplace</a>
From this point you can publish your service through [publisher portal](https://publisher.singularitynet.io/) as usual.

If you are not familiar with the process of creation of organization and publishing serivces, you can follow [this guide](https://dev.singularitynet.io/docs/ai-developers/SNET_Full_Guide_(Mainnet)) to get better understanding of the parameters you must provide during this process.

In the process of publishing service make sure to use triton protobuf file specified earlier and your demo files.
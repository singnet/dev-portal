# Preparing Your AI Service Repository

> This guide applies only to **Full-Stack Hosting** mode. If you are using **Daemon Only** mode, skip directly to the [Deployment Guide](/docs/products/DecentralizedAIPlatform/HaaS/deployment/).

In Full-Stack mode, the platform builds a Docker container from your GitHub repository, deploys it as a serverless endpoint on RunPod, and handles all infrastructure automatically. You only need to write your AI logic — the platform takes care of the rest.

[Template repository on GitHub](https://github.com/singnet/dummy-cpu-model-runpod)



## Repository Structure

Your repository must follow the template structure. The table below describes each file and whether you should modify it:

| File | Editable | Description |
|------|----------|-------------|
| `customer_main.py` | Yes | Your AI service logic — the only Python file you need to write |
| `requirements.txt` | Yes | Python dependencies for your service |
| `profile.json` | Yes | Test request payload used for profiling during deployment |
| `runpod_handler.py` | No | RunPod serverless handler — managed by the platform |
| `Dockerfile` | No | Container build configuration — managed by the platform |

> **Important:** Do not modify `runpod_handler.py` or `Dockerfile`. These files are managed by the platform and ensure proper integration with the serverless infrastructure, logging, and error reporting.



## Writing `customer_main.py`

This is the entry point for your AI service. Define a single function `run(input_data)` that accepts a dictionary of input parameters and returns a result.

### Function Signature

```python
def run(input_data):
    # input_data — dictionary containing the request parameters
    # Must return a JSON-serializable result
    ...
    return result
```

### Example: Calculator Service

```python
def run(input_data):
    a = input_data.get("a")
    b = input_data.get("b")
    operation = input_data.get("op")

    if a is None or b is None or operation not in {"add", "sub", "mul", "div"}:
        return {"error": "Missing or invalid input"}

    result = {
        "add": a + b,
        "sub": a - b,
        "mul": a * b,
        "div": a / b if b != 0 else "inf"
    }[operation]

    return result
```

### Example: Image Classification Service

```python
from transformers import pipeline

classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

def run(input_data):
    image_url = input_data.get("image_url")

    if not image_url:
        return {"error": "image_url is required"}

    predictions = classifier(image_url)

    return {"predictions": predictions}
```

### Key Points

- The `run` function receives exactly what the caller sends in the `input` field of the request
- Return any JSON-serializable value — dict, list, string, number, etc.
- Any output to `stdout` (via `print()`) is captured and sent to the platform logging system
- Unhandled exceptions are caught by the handler and reported automatically
- You can import any libraries specified in your `requirements.txt`
- Heavy model loading should be done **outside** the `run` function (at module level) so it happens once at container startup, not on every request



## Configuring `requirements.txt`

Add the Python packages your service needs. The file **must** retain the following platform dependencies:

```
runpod==1.7.12
sentry-sdk==2.46.0
```

Add your own dependencies below. For example, for a service using PyTorch and Transformers:

```
runpod==1.7.12
sentry-sdk==2.46.0
torch==2.1.0
transformers==4.36.0
numpy==1.26.0
Pillow==10.1.0
```

> **Important:** Do not remove or change the versions of `runpod` and `sentry-sdk`. These packages are required for the platform integration and monitoring.



## Creating `profile.json`

This file contains a sample request that the platform uses to verify your service works correctly after deployment (the **profiling** step). It must match the input format your `run` function expects.

### Format

```json
{
  "input": {
    ...
  }
}
```

The `input` object is passed directly as the `input_data` argument to your `run` function.

### Example: Calculator Service

```json
{
  "input": {
    "a": 3,
    "b": 4,
    "op": "mul"
  }
}
```

### Example: Image Classification Service

```json
{
  "input": {
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
  }
}
```

### Important Notes

- The profiling step sends this request to your deployed service and verifies a valid response is returned
- If profiling fails, the deployment will not complete and the status will change to `ERROR`
- Choose test data that exercises a representative path through your code
- For services that process large files, use a small or lightweight test input to keep profiling fast



## Deployment Lifecycle

When you deploy using Full-Stack mode, the platform processes your repository through the following stages:

| Stage | Status | Description |
|-------|--------|-------------|
| 1 | `VALIDATING` | Repository structure and required files are validated |
| 2 | `REGISTERING` | Service is registered in the platform infrastructure |
| 3 | `PUSHING_NEW_VERSION` | Code is prepared for the build pipeline |
| 4 | `BUILDING` | Docker image is built from your repository |
| 5 | `DEPLOYING` | Container is deployed to the serverless infrastructure |
| 6 | `PROFILING` | Test request from `profile.json` is sent to verify the service |
| 7 | `UP` | Service is live and ready to handle requests |

If any stage fails, the status changes to `ERROR`. Check the deployment logs in the Publisher Portal for details.



## Updating Your Service

To deploy a new version of your AI service, push changes to the connected GitHub repository. The platform will detect the update and automatically redeploy through the full lifecycle (from `VALIDATING` to `UP`).

No manual action is required in the Publisher Portal — the deployment is triggered by git push.



## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| `VALIDATING` fails | Missing required files | Ensure `customer_main.py`, `requirements.txt`, and `profile.json` are present in the repository root |
| `BUILDING` fails | Invalid dependencies in `requirements.txt` | Check that all packages and versions are valid and compatible |
| `PROFILING` fails | `profile.json` does not match expected input format | Verify the test payload matches what your `run` function expects |
| `PROFILING` fails | Runtime error in `customer_main.py` | Test your code locally before pushing; check deployment logs for the stack trace |
| `ERROR` after `DEPLOYING` | Service crashes at startup | Ensure model loading and initialization code handles errors gracefully |



## Next Steps

Once your repository is ready, proceed to the [Deployment Guide](/docs/products/DecentralizedAIPlatform/HaaS/deployment/) to deploy your service through the Publisher Portal.

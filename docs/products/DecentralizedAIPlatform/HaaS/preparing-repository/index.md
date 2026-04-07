# Preparing Your AI Service Repository

::: tip
This guide applies only to **Full-Stack Hosting** mode. If you are using **Daemon Only** mode, skip directly to the [Deployment Guide](/docs/products/DecentralizedAIPlatform/HaaS/deployment/).
:::

In Full-Stack mode, the platform builds a Docker container from your GitHub repository, deploys it as a serverless endpoint on RunPod, and handles all infrastructure automatically. You only need to write your AI logic — the platform takes care of the rest.

:::: tip Template Repository
Clone or fork the template to get started:
[github.com/singnet/dummy-cpu-model-runpod](https://github.com/singnet/dummy-cpu-model-runpod)
::::

## Repository Structure

Your repository must follow the template structure:

| File | Editable | Description |
|------|----------|-------------|
| `customer_main.py` | Yes | Your AI service logic — the only Python file you need to write |
| `requirements.txt` | Yes | Python dependencies for your service |
| `profile.json` | Yes | Test request payload used for profiling during deployment |
| `runpod_handler.py` | No | RunPod serverless handler — managed by the platform |
| `Dockerfile` | No | Container build configuration — managed by the platform |

::: danger
Do not modify `runpod_handler.py` or `Dockerfile`. These files are managed by the platform and ensure proper integration with the serverless infrastructure, logging, and error reporting.
:::

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

# Load model once at startup — not on every request
classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

def run(input_data):
    image_url = input_data.get("image_url")

    if not image_url:
        return {"error": "image_url is required"}

    predictions = classifier(image_url)

    return {"predictions": predictions}
```

### Key Points

| Aspect | Detail |
|--------|--------|
| **Input** | `run` receives exactly what the caller sends in the `input` field |
| **Output** | Return any JSON-serializable value — dict, list, string, number |
| **Logging** | `print()` output is captured and sent to the platform logging system |
| **Errors** | Unhandled exceptions are caught and reported automatically |
| **Dependencies** | Import any library specified in your `requirements.txt` |
| **Model loading** | Do it **outside** `run` (at module level) so it happens once at startup |

## Configuring `requirements.txt`

Add the Python packages your service needs. The file **must** retain the platform dependencies:

```
runpod==1.7.12
sentry-sdk==2.46.0
```

Add your own dependencies below. For example:

```
runpod==1.7.12
sentry-sdk==2.46.0
torch==2.1.0
transformers==4.36.0
numpy==1.26.0
Pillow==10.1.0
```

::: danger
Do not remove or change the versions of `runpod` and `sentry-sdk`. These packages are required for platform integration and monitoring.
:::

## Creating `profile.json`

This file contains a sample request that the platform uses to verify your service works correctly after deployment (the **profiling** step). The `input` object is passed directly as the `input_data` argument to your `run` function.

### Calculator Service Example

```json
{
  "input": {
    "a": 3,
    "b": 4,
    "op": "mul"
  }
}
```

### Image Classification Example

```json
{
  "input": {
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
  }
}
```

::: warning
- If profiling fails, the deployment will **not** complete and the status changes to `ERROR`
- Choose test data that exercises a representative path through your code
- For services that process large files, use a small or lightweight test input to keep profiling fast
:::

## Deployment Lifecycle

When you deploy using Full-Stack mode, the platform processes your repository through these stages:

| Stage | Status | Description |
|-------|--------|-------------|
| 1 | `VALIDATING` | Repository structure and required files are validated |
| 2 | `REGISTERING` | Service is registered in the platform infrastructure |
| 3 | `PUSHING_NEW_VERSION` | Code is prepared for the build pipeline |
| 4 | `BUILDING` | Docker image is built from your repository |
| 5 | `DEPLOYING` | Container is deployed to the serverless infrastructure |
| 6 | `PROFILING` | Test request from `profile.json` is sent to verify the service |
| 7 | `UP` | Service is live and ready to handle requests |

::: danger
If any stage fails, the status changes to `ERROR`. Check the deployment logs in the Publisher Portal for details.
:::

## Updating Your Service

To deploy a new version of your AI service, push changes to the connected GitHub repository. The platform detects the update and automatically redeploys through the full lifecycle (from `VALIDATING` to `UP`).

No manual action is required — the deployment is triggered by git push.

## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| `VALIDATING` fails | Missing required files | Ensure `customer_main.py`, `requirements.txt`, and `profile.json` are in the repository root |
| `BUILDING` fails | Invalid dependencies | Check that all packages and versions in `requirements.txt` are valid and compatible |
| `PROFILING` fails | Payload mismatch | Verify `profile.json` matches what your `run` function expects |
| `PROFILING` fails | Runtime error | Test your code locally before pushing; check deployment logs for the stack trace |
| `ERROR` after `DEPLOYING` | Startup crash | Ensure model loading and initialization code handles errors gracefully |

## Next Steps

::: tip
Once your repository is ready, proceed to the [Deployment Guide](/docs/products/DecentralizedAIPlatform/HaaS/deployment/) to deploy your service through the Publisher Portal.
:::

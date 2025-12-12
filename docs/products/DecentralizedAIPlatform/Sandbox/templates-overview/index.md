# Templates overview
## Introduction
The `Templates` tab in the `UI Sandbox` provides you with a set of ready-to-use templates that streamline your development process by offering predefined structures for various types of input and output data.

<ImageViewer src="/assets/images/products/Sandbox/templates.webp" alt="Templates-tab"/>

These templates serve as a foundation for integrating services, allowing you to modify and extend them according to your needs.

## Overview of the Templates Tab
The **Templates** tab allows you to select preconfigured templates for different types of data processing. These templates include essential components and a basic structure that you can further customize.

### Search bar  
You can use the search bar to quickly find templates by filtering based on names and descriptions. Entering a keyword will display all templates that match your search query.

### Filtering by data type
You can filter templates based on their input and output data types. Available filter options:  
- **`Text`**  
- **`Image`**  
- **`Audio`**  
- **`File`**

You can select one or multiple `filters`, and the displayed `templates` will include at least one of the selected data types.

### Template selection process
From the list of templates, as shown in the picture above, you can select the option you need.

When you select a template, a confirmation dialog appears:
  > **Hands up!**  
  > Are you sure you want to open *[Template Name]* template? All current unsaved data will be lost.  
  >  
  > **PROCEED** | **CANCEL**

If you click **`PROCEED`**:
  - Your current project session will be terminated.
  - A new project will be created that contains only the essential files (`index.js` and `style.css`).

If you click **`CANCEL`**:
  - The dialog will be closed.  

## List of available templates
Each template provides a structure for handling specific types of data.

<style>
    .columns-group {
        --input-column-width: 15%;
        --output-column-width: 15%;
        --description-column-width: 60%;
    }

    .columns-group col.input {
        width: var(--input-column-width);
    }

    .columns-group col.output {
        width: var(--output-column-width);
    }

    .columns-group col.description {
        width: var(--description-column-width);
    }

    tr {
        height: 3em;
        line-height: 1.5em;
        word-wrap: break-word;
        white-space: normal;
    }  
</style>

### Text processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Text</td>
            <td>Text</td>
            <td>Processes text input and returns a text result, such as for analysis or transformation.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>Image</td>
            <td>Accepts text and generates an image, such as a visualization or artwork. The data is transmitted in base64 format.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>Audio</td>
            <td>Converts text into audio, such as text-to-speech synthesis. The data is transmitted in base64 format.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>File</td>
            <td>Generates a file based on text input, such as a document or dataset. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### Image processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Image</td>
            <td>Text</td>
            <td>Processes an image and outputs text, such as descriptions or metadata.</td>
        </tr>
        <tr>
            <td>Image</td>
            <td>Image</td>
            <td>Accepts an image and returns another image, such as an edited or transformed version. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### Audio processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Audio</td>
            <td>Text</td>
            <td>Processes an audio input and returns text, such as a transcription of speech.</td>
        </tr>
        <tr>
            <td>Audio</td>
            <td>Audio</td>
            <td>Accepts an audio file and returns another audio file, for example, with applied effects or transformations. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### File processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>File</td>
            <td>Text</td>
            <td>Analyzes a file and returns extracted text content or metadata.</td>
        </tr>
        <tr>
            <td>File</td>
            <td>File</td>
            <td>Accepts a file and returns another file, such as after processing or conversion. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

## For Non-ReactJS Developers

If you are not familiar with ReactJS, this section explains the basic concepts used in the templates.

### Basic Structure

Each template is a React functional component that receives two props:

- `serviceClient` - Used to make calls to your AI service
- `isComplete` - Boolean indicating whether the service call has finished

```jsx
const MyService = ({ serviceClient, isComplete }) => {
    // Component logic here
    return (
        <div>
            {/* UI elements */}
        </div>
    );
};

export default MyService;
```

### State Management with useState

React uses `useState` to manage component state. State variables trigger UI updates when changed.

```jsx
import React, { useState } from "react";

const MyService = ({ serviceClient, isComplete }) => {
    // Declare state variable with initial value
    const [inputText, setInputText] = useState("");
    const [output, setOutput] = useState(null);
    
    // setInputText("new value") updates inputText and re-renders
};
```

### Making Service Calls

The `serviceClient.unary()` method sends requests to your AI service:

```jsx
const submitAction = () => {
    // Get method descriptor from generated stubs
    const methodDescriptor = MyService["methodName"];
    
    // Create request object
    const request = new methodDescriptor.requestType();
    request.setFieldName(inputValue);
    
    // Make the call
    serviceClient.unary(methodDescriptor, {
        request,
        onEnd: (response) => {
            if (response.status === 0) {
                setOutput(response.message.getValue());
            }
        }
    });
};
```

### Available UI Components

The Sandbox provides pre-built components:

| Component | Import | Purpose |
|-----------|--------|--------|
| `StyledButton` | `@integratedComponents/StyledButton` | Action buttons |
| `OutlinedTextArea` | `@commonComponents/OutlinedTextArea` | Text input fields |
| `FileUploader` | `@commonComponents/FileUploader` | File upload |
| `ImageUploader` | `@commonComponents/ImageUploader` | Image upload |
| `AudioUploader` | `@commonComponents/AudioUploader` | Audio upload |

## Template Code Examples

Below are code patterns for different input/output types. These show the key modifications needed for each template type.

### Image Input Example

For services that accept image input:

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import ImageUploader from "@commonComponents/ImageUploader";
import { ImageService } from "./service_pb_service";
import "./style.css";

const ImageToText = ({ serviceClient, isComplete }) => {
    const [imageData, setImageData] = useState(null);
    const [output, setOutput] = useState(null);

    const handleImageUpload = (data) => {
        // data contains base64 encoded image
        setImageData(data);
    };

    const submitAction = () => {
        const methodDescriptor = ImageService["analyze"];
        const request = new methodDescriptor.requestType();
        
        // Set base64 image data
        request.setImage(imageData);
        
        serviceClient.unary(methodDescriptor, {
            request,
            onEnd: (response) => {
                if (response.status === 0) {
                    setOutput(response.message.getDescription());
                }
            }
        });
    };

    return (
        <div className="service-container">
            {!isComplete ? (
                <div className="content-box">
                    <h4>Upload Image</h4>
                    <ImageUploader onUpload={handleImageUpload} />
                    <StyledButton
                        btnText="Analyze"
                        onClick={submitAction}
                        disabled={!imageData}
                    />
                </div>
            ) : (
                <div className="content-box">
                    <h4>Result</h4>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
};

export default ImageToText;
```

### Audio Input Example

For services that accept audio input:

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import AudioUploader from "@commonComponents/AudioUploader";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import { AudioService } from "./service_pb_service";
import "./style.css";

const AudioToText = ({ serviceClient, isComplete }) => {
    const [audioData, setAudioData] = useState(null);
    const [transcription, setTranscription] = useState(null);

    const handleAudioUpload = (data) => {
        // data contains base64 encoded audio
        setAudioData(data);
    };

    const submitAction = () => {
        const methodDescriptor = AudioService["transcribe"];
        const request = new methodDescriptor.requestType();
        
        request.setAudio(audioData);
        
        serviceClient.unary(methodDescriptor, {
            request,
            onEnd: (response) => {
                if (response.status === 0) {
                    setTranscription(response.message.getText());
                }
            }
        });
    };

    return (
        <div className="service-container">
            {!isComplete ? (
                <div className="content-box">
                    <h4>Upload Audio</h4>
                    <AudioUploader onUpload={handleAudioUpload} />
                    <StyledButton
                        btnText="Transcribe"
                        onClick={submitAction}
                        disabled={!audioData}
                    />
                </div>
            ) : (
                <div className="content-box">
                    <h4>Transcription</h4>
                    <OutlinedTextArea value={transcription} />
                </div>
            )}
        </div>
    );
};

export default AudioToText;
```

### File Input Example

For services that accept file input:

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import FileUploader from "@commonComponents/FileUploader";
import { FileService } from "./service_pb_service";
import "./style.css";

const FileToText = ({ serviceClient, isComplete }) => {
    const [fileData, setFileData] = useState(null);
    const [fileName, setFileName] = useState("");
    const [output, setOutput] = useState(null);

    const handleFileUpload = (data, name) => {
        setFileData(data);
        setFileName(name);
    };

    const submitAction = () => {
        const methodDescriptor = FileService["process"];
        const request = new methodDescriptor.requestType();
        
        request.setFileContent(fileData);
        request.setFileName(fileName);
        
        serviceClient.unary(methodDescriptor, {
            request,
            onEnd: (response) => {
                if (response.status === 0) {
                    setOutput(response.message.getResult());
                }
            }
        });
    };

    return (
        <div className="service-container">
            {!isComplete ? (
                <div className="content-box">
                    <h4>Upload File</h4>
                    <FileUploader onUpload={handleFileUpload} />
                    {fileName && <p>Selected: {fileName}</p>}
                    <StyledButton
                        btnText="Process"
                        onClick={submitAction}
                        disabled={!fileData}
                    />
                </div>
            ) : (
                <div className="content-box">
                    <h4>Result</h4>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
};

export default FileToText;
```

### Image Output Example

For services that return images (base64):

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import { ImageGenerator } from "./service_pb_service";
import "./style.css";

const TextToImage = ({ serviceClient, isComplete }) => {
    const [prompt, setPrompt] = useState("");
    const [imageBase64, setImageBase64] = useState(null);

    const submitAction = () => {
        const methodDescriptor = ImageGenerator["generate"];
        const request = new methodDescriptor.requestType();
        
        request.setPrompt(prompt);
        
        serviceClient.unary(methodDescriptor, {
            request,
            onEnd: (response) => {
                if (response.status === 0) {
                    // Response contains base64 image
                    setImageBase64(response.message.getImage());
                }
            }
        });
    };

    return (
        <div className="service-container">
            {!isComplete ? (
                <div className="content-box">
                    <h4>Enter Prompt</h4>
                    <OutlinedTextArea
                        label="Prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <StyledButton
                        btnText="Generate"
                        onClick={submitAction}
                        disabled={!prompt}
                    />
                </div>
            ) : (
                <div className="content-box">
                    <h4>Generated Image</h4>
                    {imageBase64 && (
                        <img
                            src={`data:image/png;base64,${imageBase64}`}
                            alt="Generated"
                            style={{ maxWidth: "100%" }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TextToImage;
```

## Adapting Templates to Your Service

To use a template with your service:

1. **Generate stub files** from your `.proto` file using the commands in [Generating Stubs](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/generating-stubs/)

2. **Import the correct service** from your generated stubs:
   ```jsx
   import { YourService } from "./your_service_pb_service";
   ```

3. **Update the method descriptor** to match your service method:
   ```jsx
   const methodDescriptor = YourService["yourMethodName"];
   ```

4. **Set request fields** according to your `.proto` definition:
   ```jsx
   request.setFieldName(value);  // Generated setter methods
   ```

5. **Extract response data** using generated getter methods:
   ```jsx
   response.message.getFieldName();  // Generated getter methods
   ```

See the [Using Templates Guide](/docs/products/DecentralizedAIPlatform/Sandbox/Guidelines/using-templates/) for a complete walkthrough with the Calculator example.

# How to use Templates
## Introduction
This guide will help you understand how to use the template library to quickly create a UI for your services.

## Where to get a project template
To use the `Templates library`, select any of the following options on the start screen: `New Project` or `Open Project` or `Open Templates`. Then go to the right half of the workspace and select the template you need in the `Templates` tab. You can also use the `search` and `filters` to quickly find the template you need.

## Files in the template
When you select a template, a new project is loaded containing two files:
- **`index.js`** – Implements the core functionality of the template.
- **`style.css`** – Contains style definitions (Hidden by default).

::: tip
To access the hidden files, click on the eye icon next to the files list.
:::

### `index.js` File (TextToText template)
```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import "./style.css";

const TextToText = ({ serviceClient, isComplete }) => {
    const [output, setOutput] = useState();

    const ServiceInput = () => {
        const [textInput, setTextInput] = useState();

        const isAllowedToRun = () => {
            return !!textInput;
        };

        const onActionEnd = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }

            // setOutput(message.getValue());
        };

        const submitAction = () => {
            // const methodDescriptor = ;
            // const request = new methodDescriptor.requestType();

            // request.setValue(textInput)

            const props = {
                request,
                preventCloseServiceOnEnd: false,
                onEnd: onActionEnd,
            };

            serviceClient.unary(methodDescriptor, props);
        };

        return (
            <div className={"content-box"}>
                <h4>{"Input"}</h4>
                <div className={"content-box"}>
                    <OutlinedTextArea
                        type={"text"}
                        label={"Text"}
                        helperTxt={"Enter text"}
                        value={textInput}
                        onChange={(event) => setTextInput(event.target.value)}
                    />
                </div>
                <div className={"content-box"}>
                    <StyledButton
                        btnText={"Submit"}
                        variant={"contained"}
                        onClick={submitAction}
                        disabled={!isAllowedToRun()}
                    />
                </div>
            </div>
        );
    };

    const ServiceOutput = () => {
        if (!output) {
            return (
                <div className={"content-box"}>
                    <h4>
                        {"Something went wrong..."}
                    </h4>
                </div>
            );
        }

        return (
            <div className={"content-box"}>
                <h4>
                    {"Output"}
                </h4>
                <div className={"content-box"}>
                    <OutlinedTextArea
                        type={"text"}
                        value={output}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={"service-container"}>
            {!isComplete ? <ServiceInput /> : <ServiceOutput />}
        </div>
    );
};

export default TextToText;
```

### `style.css` File (Hidden by default)

```css
.service-container {
    padding: 10px;
}

.content-box {
    margin-bottom: 15px;
}

.content-box .MuiSelect-select {
    min-width: 200px;
}
```

## Customizing Templates for Your Service
Let's now transform the `Text-to-Text` template into a simple `Calculator Service` that performs `addition`. We will explain every change in detail.

### Transforming the Input Section
For a `Calculator`, you need two numbers to perform an `addition` operation. Therefore, we replace the single `textInput` state variable with two variables: `firstValue` and `secondValue`. Both are initialized as empty strings."

::: tip
Variables can be named differently based on your preference.
:::

#### Change: Replace the Single Input with Two Inputs

- **Before:**
```jsx
const [textInput, setTextInput] = useState();
```

- **After:**
  ```jsx
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  ```

---

For the UI update, we add two separate `input` fields with the titles before each, so that the user can identify and enter the `first` and the `second` numbers required for the `addition` operation. The `OutlinedTextArea` is used with a `Heading-4` (`h4`) to indicate and input required values.

#### Change: Update the UI to Display Two Input Fields

- **Before (Original UI):**
```jsx
<h4>{"Input"}</h4>
<div className={"content-box"}>
    <OutlinedTextArea
        type={"text"}
        label={"Text"}
        helperTxt={"Enter text"}
        value={textInput}
        onChange={(event) => setTextInput(event.target.value)}
    />
</div>
```

- **After:**
```jsx
<h4>{"Input values"}</h4>
<div className={"content-box"}>
    <OutlinedTextArea
        label={"First value"}
        value={firstValue}
        onChange={(event) =>
            setFirstValue(event.target.value)
        }
    />
</div>
<div className={"content-box"}>
    <OutlinedTextArea
        label={"Second value"}
        value={secondValue}
        onChange={(event) =>
            setSecondValue(event.target.value)
        }
    />
</div>
```

---

### Updating the `Submit Action` to Use the `add` Method

We set the `addition` operation by using `Calculator["add"]` from the `Calculator` service. The input values from the `firstValue` and the `secondValue` are assigned to the request using `setA()` and `setB()`, respectively. This ensures that the backend receives the correct values for the `addition` operation.

#### Change: Update the `API Call` Code

- **Before (Commented-Out Code):**
```jsx
const submitAction = () => {
    // const methodDescriptor = ;
    // const request = new methodDescriptor.requestType();

    // request.setValue(textInput)

    const props = {
        request,
        preventCloseServiceOnEnd: false,
        onEnd: onActionEnd,
    };

    serviceClient.unary(methodDescriptor, props);
};
```

- **After:**
```jsx
const submitAction = () => {
    const methodDescriptor = Calculator["add"];
    const request = new methodDescriptor.requestType();

    request.setA(firstValue);
    request.setB(secondValue);

    const props = {
        request,
        preventCloseServiceOnEnd: false,
        onEnd: onActionEnd,
    };

    serviceClient.unary(methodDescriptor, props);
};
```

---

### Updating the Response Handling

By un-commenting this line, the result returned from the backend is stored in the `output` state, which will later be displayed to the user.

#### Change: Uncomment and Update the Response Handling

- **Before (Commented-Out):**
```jsx
// setOutput(message.getValue());
```

- **After:**
```jsx
setOutput(message.getValue());
```

---

### Updating the Output Formatting
The heading `{"Service call completed with output:"}` is used alongside other blocks to separate the block `title` from the actual `result`. The `result` is displayed in a read-only `OutlinedTextArea`, ensuring a consistent and clear presentation.

#### Change: Replace the Original ServiceOutput Component

- **Before:**
```jsx
const ServiceOutput = () => {
    if (!output) {
        return (
            <div className={"content-box"}>
                <h4>
                    {"Something went wrong..."}
                </h4>
            </div>
        );
    }

    return (
        <div className={"content-box"}>
            <h4>
                {"Output"}
            </h4>
            <div className={"content-box"}>
                <OutlinedTextArea
                    type={"text"}
                    value={output}
                />
            </div>
        </div>
    );
};
```

- **After:**
```jsx
const ServiceOutput = () => {
    if (typeof output !== "number") {
        return (
            <div className={"content-box"}>
                <h4>
                    {"Something went wrong..."}
                </h4>
            </div>
        );
    }

    return (
        <div className={"content-box"}>
            <h4>
                {"Service call completed with output:"}
            </h4>
            <div className={"content-box"}>
                <OutlinedTextArea
                    value={output}
                />
            </div>
        </div>
    );
};
```

## Final File: index.js (Calculator – Addition)
Below is the complete `index.js` implementation after all modifications:

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import { Calculator } from "./example_pb_service";
import "./style.css"

const calculator = ({ serviceClient, isComplete }) => {
    const [output, setOutput] = useState(null);

    const ServiceInput = () => {
        const [firstValue, setFirstValue] = useState();
        const [secondValue, setSecondValue] = useState();

        const isAllowedToRun = () => {
            return !!firstValue && !!secondValue;
        };

        const onActionEnd = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }

            setOutput(message.getValue());
        };

        const submitAction = () => {
            const methodDescriptor = Calculator["add"];
            const request = new methodDescriptor.requestType();

            request.setA(firstValue);
            request.setB(secondValue);

            const props = {
                request,
                preventCloseServiceOnEnd: false,
                onEnd: onActionEnd,
            };

            serviceClient.unary(methodDescriptor, props);
        };

        return (
            <div className={"content-box"}>
                <h4>{"Input values"}</h4>
                <div className={"content-box"}>
                    <OutlinedTextArea
                        label={"First value"}
                        value={firstValue}
                        onChange={(event) =>
                            setFirstValue(event.target.value)
                        }
                    />
                </div>
                <div className={"content-box"}>
                    <OutlinedTextArea
                        label={"Second value"}
                        value={secondValue}
                        onChange={(event) =>
                            setSecondValue(event.target.value)
                        }
                    />
                </div>
                <div className={"content-box"}>
                    <StyledButton
                        btnText={"Submit"}
                        variant={"contained"}
                        onClick={submitAction}
                        disabled={!isAllowedToRun()}
                    />
                </div>
            </div>
        );
    };

    const ServiceOutput = () => {
        if (typeof output !== "number") {
            return (
                <div className={"content-box"}>
                    <h4>
                        {"Something went wrong..."}
                    </h4>
                </div>
            );
        }

        return (
            <div className={"content-box"}>
                <h4>
                    {"Service call completed with output:"}
                </h4>
                <div className={"content-box"}>
                    <OutlinedTextArea
                        value={output}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={"service-container"}>
            {!isComplete ? <ServiceInput /> : <ServiceOutput />}
        </div>
    );
};

export default calculator;

```

## Summary of Changes
1. **State and Input Fields:**  
   - **Changed:** Replaced the single `textInput` with two state variables: `firstValue` and `secondValue`.  
   - **Explanation:** Two inputs are required to perform an addition operation; therefore, we created two state variables and updated the UI accordingly.

2. **Submit Action Modification:**  
   - **Changed:** Hardcoded the API call to use `Calculator["add"]` and converted input values from strings to numbers.  
   - **Explanation:** By using the "add" method, we ensure that the backend performs addition.

3. **Response Handling:**  
   - **Changed:** Un-commented and updated `setResponse(message.getValue());`.  
   - **Explanation:** This captures the result returned by the backend and stores it in the state for display.

4. **Output Formatting:**  
   - **Changed:** Updated the ServiceOutput component to use `<h4>` tags for headings and an OutlinedTextArea to display the result, as shown in the provided format.  
   - **Explanation:** This format clearly separates the heading ("Service call completed with output:") from the actual output, ensuring consistent presentation.

## Required Stub Files for Any Service
For any service to work within the project, two essential stub files must be included:
1. **`example_pb_service.js`** – Contains the interface for interacting with the service.  
2. **`example_pb.js`** – Auxiliary file for service communication.  

These files are automatically generated from the `.proto` definition and are necessary for handling requests and responses between the frontend and the backend. 
Add them to our project to ensure proper functionality.

### About `example_pb_service.js` and `example_pb.js`
- **`example_pb_service.js`**:  
  This file provides an abstraction layer for making service calls. It contains method descriptors for each operation (e.g., `add`, `subtract`) exposed by the service. Each method descriptor includes:
  - The expected input and output message types.
  - The gRPC method name.

It simplifies service method calls by handling the details of the gRPC protocol.

- **`example_pb.js`**:  
  This file contains definitions of the message types used by the service, as defined in the `.proto` file. These include:
  - `Numbers`: Represents the two numbers (`a` and `b`) involved in a calculation.
  - `Result`: Represents the output value of a calculation.

It provides logic to convert messages into a binary format (serialization) and back (deserialization), enabling communication with the service

### Download the Required Service Files:
- <a href="/assets/files/example_pb_service.js" download>example_pb_service.js</a>  
- <a href="/assets/files/example_pb.js" download>example_pb.js</a>  


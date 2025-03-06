# How to create a UI for the Calculator service

## You can watch the video for easy understanding:

<iframe width="560" height="315" src="https://www.youtube.com/embed/rG-s3Q4gRs4?si=ywvxdc-2m2pytNwW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Introduction
This guide explains how to extend an existing UI project (use the `New project` menu item) to create a calculator with basic arithmetic operations (`add`, `subtract`, `multiply`, and `divide`). The focus is on how to integrate service calls into your application. We will go step by step through the modifications needed in the provided files.

## Files Overview
You will work with the following files:
1. **`index.js`**: Implements the calculator's functionality and user interface;
2. **`style.css`**: Provides styles for the calculator components (Hidden by default);
3. **`example_pb_service.js`**: Contains the interface for interacting with the calculator service. (Must be uploaded to the project);
4. **`example_pb.js`**: Auxiliary file for service communication. (Must be uploaded to the project).

::: tip
To access the hidden files, click on the eye icon next to the files list.
:::


### About `example_pb_service.js` and `example_pb.js`

- **example_pb_service.js**:
  This file provides an abstraction layer for making service calls. It contains method descriptors for each operation (e.g., `add`, `subtract`) exposed by the Calculator service. Each method descriptor includes:
  - The expected input and output message types.
  - The gRPC method name.

It simplifies service method calls by handling the details of the gRPC protocol.

- **`example_pb.js`**:
  This file contains definitions of the message types used by the Calculator service, as defined in the `.proto` file. These include:
  - `Numbers`: Represents the two numbers (`a` and `b`) involved in a calculation.
  - `Result`: Represents the output value of a calculation.

It provides logic to convert messages into a binary format (serialization) and back (deserialization), enabling communication with the service

Download the required service files:
- <a href="/assets/files/example_pb_service.js" download>example_pb_service.js</a> 
- <a href="/assets/files/example_pb.js" download>example_pb.js</a>

And then `upload` them into the project using `upload button` near the files list in the `Workspace`.

## Step-by-Step Modifications
### 1. Importing Required Components
We start with the import statements, which bring in the necessary libraries and UI elements.
**Original imports:**
```jsx
import React, { useState } from "react";
import StyledButton from '@integratedComponents/StyledButton';
import "./style.css"
```
#### `React, { useState }`:
* `React` is a core library that allows us to build user interfaces using components.
* `useState` is a function that helps us manage state in our component. We'll explain this in detail later when we start using it.

#### `style.css`:
* This is the `CSS` file used to style the components. This one lets you define and apply styles to the components.

#### `StyledButton`:
* One of the prepared components presented in the library that represents a clickable button. We’ll use it in the `Form` to submit the `action`.

#### New imports to add:
- **Before:**
```jsx
import React, { useState } from "react";
import StyledButton from '@integratedComponents/StyledButton';
import "./style.css"
```

- **After:**
```jsx
import React, { useState } from "react";
import StyledButton from '@integratedComponents/StyledButton';
import OutlinedTextArea from '@commonComponents/OutlinedTextArea';
import OutlinedDropDown from '@commonComponents/OutlinedDropdown';
import { Calculator } from "./example_pb_service";
import "./style.css"
```

#### `OutlinedDropDown`:
* This is a custom dropdown component, located in the `commonComponents` part of the Library. It lets us display a list of options (like `add`, `subtract`, etc.) for the user to choose from.

#### `OutlinedTextArea`:
* Another custom component for text input. This allows the user to type values into text fields (e.g., first value and second value).

#### `{Calculator}`:
* This is imported from a file that contains predefined methods for making remote procedure calls (RPCs) to a server. We'll use it to call mathematical operations from a service.

### 2. ServiceInput Component: Getting User Input
The ServiceInput component will be responsible for collecting data from the user, such as the two numbers (firstValue and secondValue) and the operation (action). It will then send this data to the backend for processing.

**The place where we are currently working on:**
```jsx
const ServiceInput = () => {
    const [input, setInput] = useState();

    <...>

};
```

#### Setting up state with useState:
- **Before:**
```jsx
const [input, setInput] = useState();
```

- **After:**
```jsx
const [firstValue, setFirstValue] = useState("");
const [secondValue, setSecondValue] = useState("");
const [action, setAction] = useState("");
```

#### What is `useState`?
* `useState` is a `React Hook` that allows you to create `state variables` in your component. State variables store information that can change over time, like user input.
* For example, `firstValue` will store the value entered by the user for the first number. `setFirstValue` is the function used to `update that state` whenever the user types something into the input field.

#### Why `useState("")`?
* `useState("")` initializes the state variable with an `empty string`. This is because we expect the user to input text (like a number), so we start with an empty string.

#### Handling form submission:
We need a function that will check if the inputs are valid and submit the data to the server.

- **Before:**
```jsx
const isAllowedToRun = () => {
    return !!input;
};
```

- **After:**
```jsx
const isAllowedToRun = () => {
    return !!firstValue && !!secondValue && !!action;
};
```

#### What does `!!firstValue` mean?
* The double exclamation mark (!!) is a trick to convert a value into a boolean. If firstValue is an empty string, it will return false. If it has any content, it returns true. This ensures that the submit button is disabled unless the user has entered values for all fields.

#### Handling the Action (button click):
When the user clicks `"Submit"`, we need to call the backend with the data entered in the `Form`. This is handled by the `submitAction` function.
- **Before:**
```jsx
const submitAction = () => {
    // const methodDescriptor = ;
    // const request = new methodDescriptor.requestType();

    // request.setValue(input)

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
    const methodDescriptor = Calculator[action];
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
#### What is `Calculator[action]`?
* The Calculator object contains predefined methods for the operations (like `add`, `sub`, etc.). `Calculator[action]` dynamically selects the method based on the user's `choice` (`action`).

#### What is `request.setA(firstValue)`?
* This line creates a request object and sets the values (`firstValue` and `secondValue`) to be sent to the backend. It converts the string input into numbers if necessary.

#### Why `serviceClient.unary`?
* `serviceClient.unary` is used to make a call to the backend using gRPC (a remote procedure call mechanism). We are sending the request and defining what happens when the action ends (success or failure).

### Displaying the Input Fields:
Next, we render the input fields and the dropdown to allow the user to enter the values and choose the action.
- **Before:**
```jsx
return (
    <div className={"content-box"}>
        <h4>{"Input"}</h4>
        <div className={"content-box"}>
            {/* Input blocks here */}
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
```

- **After:**
```jsx
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
            <h4>{"Action"}</h4>
            <OutlinedDropDown
                label={"Select action"}
                list={[
                    { value: "add", label: "Add" },
                    { value: "sub", label: "Subtract" },
                    { value: "mul", label: "Multiply" },
                    { value: "div", label: "Divide" },
                ]}
                onChange={(event) => setAction(event.target.value)}
                value={action}
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
```

#### What is `event.target.value`?
* `event` refers to the event object that is triggered when the user interacts with an element (like typing in a text field or selecting an option).
* `event.target` refers to the DOM element that triggered the event (in this case, the input field or dropdown).
* `event.target.value` is the value of the input field. For example, when the user types into the text box, event.target.value will give us the string they typed.

#### Why `onChange={(event) => setFirstValue(event.target.value)}`?
* `onChange` is an event handler that triggers when the user types in the text box. It updates the `firstValue` state with the new value typed by the user.

### 3. `ServiceOutput` Component: Displaying the Result
The `ServiceOutput` component shows the result of the operation once the backend has processed it.
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
                {/* Output blocks here */}
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
#### What does `typeof output !== "number"` do?
* This checks if the `output` is a valid number. If the backend returns an unexpected result (such as an error or invalid data), an error message is displayed.

#### Why display the result with `{output}`?
* This uses the `output` value returned by the backend to show the result of the calculation.

### Final Step: Combining Everything in the Main Component
The main component returns either the `ServiceInput` (if `isComplete` is `false`) or the `ServiceOutput` (if `isComplete` is `true`).

```jsx
return (
    <div className={"service-container"}>
        {!isComplete ? <ServiceInput /> : <ServiceOutput />}
    </div>
);
```

#### What does `!isComplete ? <ServiceInput /> : <ServiceOutput />` mean?
* This is a `ternary operator`. If `isComplete` is `false`, it shows the `ServiceInput` form. Otherwise, it shows the `ServiceOutput` with the result.

**This completes the guide. The provided explanations clarify how each piece of code contributes to the overall functionality of the calculator service.**


## Final File
Below is the complete `index.js` implementation:

```jsx
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import OutlinedDropDown from "@commonComponents/OutlinedDropdown";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import { Calculator } from "./example_pb_service";
import "./style.css"

const ExampleService = ({ serviceClient, isComplete }) => {
    const [output, setOutput] = useState(null);

    const ServiceInput = () => {
        const [firstValue, setFirstValue] = useState();
        const [secondValue, setSecondValue] = useState();
        const [action, setAction] = useState();

        const isAllowedToRun = () => {
            return !!firstValue && !!secondValue && !!action;
        };

        const onActionEnd = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }

            setOutput(message.getValue());
        };

        const submitAction = () => {
            const methodDescriptor = Calculator[action];
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
                    <h4>{"Action"}</h4>
                    <OutlinedDropDown
                        label={"Select action"}
                        list={[
                            { value: "add", label: "Add" },
                            { value: "sub", label: "Subtract" },
                            { value: "mul", label: "Multiply" },
                            { value: "div", label: "Divide" },
                        ]}
                        onChange={(event) => setAction(event.target.value)}
                        value={action}
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

export default ExampleService;
```
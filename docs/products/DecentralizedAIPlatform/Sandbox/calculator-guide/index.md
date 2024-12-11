# Guide to Using the Calculator Service

This guide explains how to extend an existing project to create a calculator with basic arithmetic operations (add, subtract, multiply, and divide). The focus is on how to integrate service calls into your application. We will go step by step through the modifications needed in the provided files.

## Files Overview

You will work with the following files:

1. **index.js**: Implements the calculator's functionality and user interface.
2. **style.js**: Provides styles for the calculator components.
3. **example_pb_service.js**: Contains the interface for interacting with the calculator service.
4. **example_pb.js**: Auxiliary file for service communication.

### About `example_pb_service.js` and `example_pb.js`

- **example_pb_service.js**:
  This file provides an abstraction layer for making service calls. It contains method descriptors for each operation (e.g., `add`, `subtract`) exposed by the Calculator service. Each method descriptor includes:
  - The expected input and output message types.
  - The gRPC method name.

  It simplifies the process of calling a service method by encapsulating the details of the gRPC protocol.

- **example_pb.js**:
  This file contains definitions of the message types used by the Calculator service, as defined in the `.proto` file. These include:
  - `Numbers`: Represents the two numbers (`a` and `b`) involved in a calculation.
  - `Result`: Represents the output value of a calculation.

  It provides serialization and deserialization logic for these messages, enabling communication with the service in binary format.

Download the required service files:
- <a href="/assets/files/example_pb_service.js" download>example_pb_service.js</a> 
- <a href="/assets/files/example_pb.js" download>example_pb.js</a>

## Step-by-Step Modifications

### 1. Importing Required Components
Add the following imports to the top of `index.js`:

```js
import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Calculator } from "./example_pb_service";
```

These components will be used to build the UI for the calculator.

### 2. Creating the Input Form
Create a `ServiceInput` component for entering values and selecting an operation. This component uses `useState` to manage input fields and operation selection.

#### Code Breakdown:

**Define State Variables:**

```js
const [firstValue, setFirstValue] = useState("");
const [secondValue, setSecondValue] = useState("");
const [action, setAction] = useState("");
```

Here, `firstValue` and `secondValue` store the numbers the user inputs, while `action` tracks the selected arithmetic operation.

**Handle Input Changes:**

```js
const onValueChange = (event) => {
    if (event.target.name === "firstValue") {
        setFirstValue(event.target.value);
    } else if (event.target.name === "secondValue") {
        setSecondValue(event.target.value);
    }
};

const handleChangeAction = (event) => {
    setAction(event.target.value);
};
```

These functions update the state variables whenever the user types a number or selects an operation from the dropdown menu.

**Build the Input Form:**

```js
const ServiceInput = ({ onSubmitAction }) => {
    return (
        <div className={classes.serviceMainPage}>
            <Typography variant="h2">Input values</Typography>

            {/* Input fields for the numbers */}
            <TextField
                id="firstValue"
                label="First value"
                name="firstValue"
                variant="outlined"
                onChange={onValueChange}
            />
            <TextField
                id="secondValue"
                label="Second value"
                name="secondValue"
                variant="outlined"
                onChange={onValueChange}
            />

            {/* Dropdown menu for the operation */}
            <FormControl style={{ minWidth: "120px" }}>
                <InputLabel>Action</InputLabel>
                <Select
                    value={action}
                    onChange={handleChangeAction}
                >
                    <MenuItem value={"add"}>Add</MenuItem>
                    <MenuItem value={"sub"}>Subtract</MenuItem>
                    <MenuItem value={"mul"}>Multiply</MenuItem>
                    <MenuItem value={"div"}>Divide</MenuItem>
                </Select>
            </FormControl>

            {/* Submit button for sending inputs and operation */}
            <Button
                variant="contained"
                onClick={() => onSubmitAction(action, firstValue, secondValue)}
                disabled={!(firstValue && secondValue && action)}
            >
                Submit
            </Button>
        </div>
    );
};
```

This component collects the user's inputs and sends them to the parent component via the `onSubmitAction` callback.

### 3. Sending Data to the Service
The `submitAction` function is responsible for creating a request and sending data to the service.

#### Code Breakdown:

**Prepare and Send Request:**

```js
const submitAction = (action, firstValue, secondValue) => {
    // Determine the service method based on the selected action
    const methodDescriptor = Calculator[action];
    const request = new methodDescriptor.requestType();

    // Set the values in the request
    request.setA(firstValue);
    request.setB(secondValue);

    // Prepare the properties for the service call
    const props = {
        request,
        preventCloseServiceOnEnd: false, // Do not close service on response
        onEnd: onActionEnd,             // Callback for handling response
    };

    // Send the request using the unary method
    serviceClient.unary(methodDescriptor, props);
};
```

This function creates a request object, fills it with the user-provided inputs, and sends it to the service.

### 4. Handling the Response
The `onActionEnd` function processes the service's response and sets the result.

```js
const onActionEnd = (response) => {
    const { message, status, statusMessage } = response;

    // Handle errors based on the response status
    if (status !== 0) {
        throw new Error(statusMessage);
    }

    // Extract and set the result from the response
    setResponse(message.getValue());
};
```

This function checks for errors in the response and updates the state with the result if successful.

### 5. Displaying the Result
Create a `ServiceOutput` component to show the result or an error message.

#### Code:

```js
const ServiceOutput = ({ response }) => {
    if (!response) {
        return <Typography variant="h4">Something went wrong...</Typography>;
    }

    // Display the result of the service call
    return (
        <Typography variant="h4">
            Service call completed with output: {response}
        </Typography>
    );
};
```

This component displays either the result or an error message based on the `response` prop.

### 6. Main Component
Combine `ServiceInput` and `ServiceOutput` in the main `ExampleService` component. Use `isComplete` to toggle between input and output views.

```js
const ExampleService = ({ isComplete }) => {
    const [response, setResponse] = useState(undefined);

    return (
        <div className={classes.serviceContainer}>
            {/* Render input form or output based on completion status */}
            {!isComplete ? (
                <ServiceInput onSubmitAction={submitAction} />
            ) : (
                <ServiceOutput response={response} />
            )}
        </div>
    );
};

export default withStyles(useStyles)(ExampleService);
```

This component ties together the input and output components to form the complete calculator interface.

This completes the guide. The provided explanations clarify how each piece of code contributes to the overall functionality of the calculator service.


## Final File
Below is the complete `index.js` implementation:

```js
import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OutlinedDropDown from '../../common/OutlinedDropdown';
import OutlinedTextArea from '../../common/OutlinedTextArea';
import { Calculator } from "./example_pb_service";

const ExampleService = ({ serviceClient, isComplete }) => {
    const classes = useStyles();
    const [response, setResponse] = useState(null);

    const ServiceInput = () => {

        const [firstValue, setFirstValue] = useState("");
        const [secondValue, setSecondValue] = useState("");
        const [action, setAction] = useState("");


        const isAllowedToRun = () => {
            return !!firstValue && !!secondValue && !!action;
        };

        const onActionEnd = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }

            setResponse(message.getValue());
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
            <div className={classes.contentBox}>
                <Typography variant="h4">Input values</Typography>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        label={"First value"}
                        value={firstValue}
                        onChange={(event) =>
                            setFirstValue(event.target.value)
                        }
                    />
                </div>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        label={"Second value"}
                        value={secondValue}
                        onChange={(event) =>
                            setSecondValue(event.target.value)
                        }
                    />
                </div>
                <div className={classes.contentBox}>
                    <Typography variant="h4">Action</Typography>
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
                <div className={classes.contentBox}>
                    <Button
                        variant={"contained"}
                        onClick={submitAction}
                        disabled={!isAllowedToRun()}
                    >
                        {"Submit"}
                    </Button>
                </div>
            </div>
        );
    };

    const ServiceOutput = () => {
        if (typeof response !== "number") {
            return (
                <div>
                    <Typography variant="h4">
                        Something went wrong...
                    </Typography>
                </div>
            );
        }

        return (
            <div>
                <Typography variant="h4">
                    Service call completed with output {response}
                </Typography>
            </div>
        );
    };

    return (
        <div className={classes.serviceContainer}>
            {!isComplete ? <ServiceInput /> : <ServiceOutput />}
        </div>
    );
};

export default withStyles(useStyles)(ExampleService);
```
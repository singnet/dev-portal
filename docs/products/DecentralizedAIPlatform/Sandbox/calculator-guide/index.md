# Guide to Using the Calculator Service

This guide explains how to extend an existing project to create a calculator with basic arithmetic operations (add, subtract, multiply, and divide). The focus is on how to integrate service calls into your application. We will go step by step through the modifications needed in the provided files.

## Files Overview

You will work with the following files:

1. **index.js**: Implements the calculator's functionality and user interface.
2. **style.css**: Provides styles for the calculator components.
3. **example_pb_service.js**: Contains the interface for interacting with the calculator service.
4. **example_pb.js**: Auxiliary file for service communication.

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
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ServiceInput = ({ onSubmitAction }) => {
    const classes = useStyles();
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");
    const [action, setAction] = useState("");

    const availableToRunToggle = () => {
        if (
            firstValue.length > 0 &&
            secondValue.length > 0 &&
            action.length > 0
        ) {
            return true;
        }
        return false;
    };

    const handleChangeAction = (event) => {
        setAction(event.target.value);
    };

    const onValueChange = (event) => {
        if (event.target.name === "firstValue") {
            setFirstValue(event.target.value);
        } else if (event.target.name === "secondValue") {
            setSecondValue(event.target.value);
        }
    };

    const ActionSelect = () => {
        return (
            <FormControl style={{ minWidth: "120px" }}>
                <InputLabel>Action</InputLabel>
                <Select
                    value={action}
                    label="Actions"
                    onChange={handleChangeAction}
                >
                    <MenuItem value={"Add"}>Add</MenuItem>
                    <MenuItem value={"Subtract"}>Subtract</MenuItem>
                    <MenuItem value={"Multiply"}>Multiply</MenuItem>
                    <MenuItem value={"Divide"}>Divide</MenuItem>
                </Select>
            </FormControl>
        );
    };

    return (
        <div className={classes.serviceMainPage}>
            <div className={classes.contentBox}>
                <Typography variant="h2">Input values</Typography>
                <TextField
                    id="outlined-basic"
                    label="First value"
                    name="firstValue"
                    variant="outlined"
                    onChange={onValueChange}
                />
                <TextField
                    id="outlined-basic"
                    label="Second value"
                    name="secondValue"
                    variant="outlined"
                    onChange={onValueChange}
                />
                <ActionSelect />
            </div>
            <Button
                variant="contained"
                onClick={() => onSubmitAction(action, firstValue, secondValue)}
                disabled={!availableToRunToggle()}
            >
                {"Submit"}
            </Button>
        </div>
    );
};

const ServiceOutput = ({ response }) => {
    if (response === undefined) {
        return (
            <div>
                <Typography variant="h2">Something went wrong...</Typography>
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h2">
                Service call completed with output {response}
            </Typography>
        </div>
    );
};

const ExampleService = ({ isComplete }) => {
    const classes = useStyles();
    const [response, setResponse] = useState(undefined);

    const onActionEnd = (response) => {
        const { message, status, statusMessage } = response;

        if (status !== 0) {
            throw new Error(statusMessage);
        }

        setResponse(message.getValue());
    };

    const submitAction = (action, firstValue, secondValue) => {
        alert(`
          action: ${action}
          firstValue: ${firstValue}
          secondValue: ${secondValue}
        `);

        // const methodDescriptor = Calculator[action];
        // const request = new methodDescriptor.requestType();

        // request.setA(firstValue);
        // request.setB(secondValue);

        // const props = {
        //   request,
        //   preventCloseServiceOnEnd: false,
        //   onEnd: onActionEnd,
        // };

        // serviceClient.unary(methodDescriptor, props);
    };

    return (
        <div className={classes.serviceContainer}>
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

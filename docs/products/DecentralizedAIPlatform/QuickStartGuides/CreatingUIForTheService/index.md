# Creating a UI for a Service Integration

## Introduction

This guide outlines the process of extending an existing UI project to integrate a service that handles user input and performs operations via remote procedure calls (RPC). The focus is on how to connect the UI with a backend service and manage user interactions effectively.

## File Structure

You will work with the following files:

1. **index.js** – Implements the UI logic and service integration.
2. **style.css** – Defines styles for UI components (hidden by default).
3. **service\_pb\_service.js** – Provides the interface for service communication.
4. **service\_pb.js** – Contains message definitions for data exchange with the backend.

### About service\_pb\_service.js and service\_pb.js

- **service\_pb\_service.js**: Defines method descriptors for service operations, simplifying gRPC calls.
- **service\_pb.js**: Handles serialization and deserialization of messages used in service communication.

## Implementation Steps

### 1. Import Required Components

Modify imports to include necessary components and the service interface:

```jsx
import React, { useState } from "react";
import StyledButton from '@integratedComponents/StyledButton';
import OutlinedTextArea from '@commonComponents/OutlinedTextArea';
import OutlinedDropDown from '@commonComponents/OutlinedDropdown';
import { Service } from "./service_pb_service";
import "./style.css";
```

### 2. Handling User Input

Define state variables to manage user input and selection:

```jsx
const [firstValue, setFirstValue] = useState("");
const [secondValue, setSecondValue] = useState("");
const [action, setAction] = useState("");
```

Ensure input validation before enabling submission:

```jsx
const isAllowedToRun = () => {
    return !!firstValue && !!secondValue && !!action;
};
```

### 3. Submitting Data to the Service

Construct a request object and send data to the backend:

```jsx
const submitAction = () => {
    const methodDescriptor = Service[action];
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

### 4. Rendering the UI

Provide input fields and dropdown for user interaction:

```jsx
return (
    <div className={"content-box"}>
        <h4>{"Input values"}</h4>
        <OutlinedTextArea label={"First value"} value={firstValue} onChange={(e) => setFirstValue(e.target.value)} />
        <OutlinedTextArea label={"Second value"} value={secondValue} onChange={(e) => setSecondValue(e.target.value)} />
        <OutlinedDropDown label={"Select action"} list={[
            { value: "add", label: "Add" },
            { value: "sub", label: "Subtract" },
            { value: "mul", label: "Multiply" },
            { value: "div", label: "Divide" },
        ]} onChange={(e) => setAction(e.target.value)} value={action} />
        <StyledButton btnText={"Submit"} variant={"contained"} onClick={submitAction} disabled={!isAllowedToRun()} />
    </div>
);
```

### 5. Displaying the Result

Render output after receiving the response:

```jsx
const ServiceOutput = () => {
    if (typeof output !== "number") {
        return <h4>{"Something went wrong..."}</h4>;
    }
    return (
        <div className={"content-box"}>
            <h4>{"Service call completed with output:"}</h4>
            <OutlinedTextArea value={output} />
        </div>
    );
};
```

### 6. Combining Components in the Main Component

```jsx
return (
    <div className={"service-container"}>
        {!isComplete ? <ServiceInput /> : <ServiceOutput />}
    </div>
);
```

## Conclusion

This guide provides an overview of integrating a service into a UI, handling user input, sending requests, and displaying results. Developers can expand upon this foundation to suit their specific application needs.


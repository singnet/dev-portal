# Guide to Using the Templates

When you select a template, a new project is loaded containing two files:
- **`index.js`** – Implements the core functionality of the template.
- **`styles.js`** – Contains styling definitions.

Below is an example of the **Text-to-Text** template.

### index.js File

```javascript
import React, { useState } from "react";
import StyledButton from "@integratedComponents/StyledButton";
import OutlinedTextArea from "@commonComponents/OutlinedTextArea";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const TextToText = ({ serviceClient, isComplete }) => {
    const classes = useStyles();
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
            // request.setValue(textInput);

            const props = {
                request,
                preventCloseServiceOnEnd: false,
                onEnd: onActionEnd,
            };

            serviceClient.unary(methodDescriptor, props);
        };

        return (
            <div className={classes.contentBox}>
                <h4>{"Input"}</h4>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        type={"text"}
                        label={"Text"}
                        helperTxt={"Enter text"}
                        value={textInput}
                        onChange={(event) => setTextInput(event.target.value)}
                    />
                </div>
                <div className={classes.contentBox}>
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
                <div className={classes.contentBox}>
                    <h4>{"Something went wrong..."}</h4>
                </div>
            );
        }

        return (
            <div className={classes.contentBox}>
                <h4>{"Output"}</h4>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        type={"text"}
                        value={output}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={classes.serviceContainer}>
            {!isComplete ? <ServiceInput /> : <ServiceOutput />}
        </div>
    );
};

export default withStyles(useStyles)(TextToText);
```

### styles.js File

```javascript
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
    serviceContainer: {
        padding: "10px",
    },
    contentBox: {
        marginBottom: "15px",
        "& .MuiSelect-select": {
            minWidth: "200px",
        }
    },
}));

export default useStyles;
```

## Customizing Templates for Your Service

Let's now transform the Text-to-Text template into a simple Calculator Service that performs addition. We will explain every change in detail.

### Transforming the Input Section

For a calculator, you need two numbers to perform an addition operation. Therefore, we replace the single `textInput` state variable with two variables—`firstValue` and `secondValue`—both initialized to an empty string. 
> Variables don't necessarily have to be named this way, you can name them in your own way.

#### Change: Replace the Single Input with Two Inputs

- **Before:**
  ```javascript
  const [textInput, setTextInput] = useState();
  ```

- **After:**
  ```javascript
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  ```

---

For the UI update, we add two separate input fields so that the user can enter the first and second numbers required for the addition operation. A read-only OutlinedTextArea is used as a heading to indicate "Input values."

#### Change: Update the UI to Display Two Input Fields

- **Before (Original UI):**
  ```jsx
  <h4>{"Input"}</h4>
  <div className={classes.contentBox}>
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
  <h4>
    {"Input values"}
  </h4>
  <div className={classes.contentBox}>
      <OutlinedTextArea
          type={"text"}
          label={"First number"}
          helperTxt={"Enter first number"}
          value={firstValue}
          onChange={(event) => setFirstValue(event.target.value)}
      />
  </div>
  <div className={classes.contentBox}>
      <OutlinedTextArea
          type={"text"}
          label={"Second number"}
          helperTxt={"Enter second number"}
          value={secondValue}
          onChange={(event) => setSecondValue(event.target.value)}
      />
  </div>
  ```

---

### Updating the Submit Action to Use the "add" Method

We hardcode the operation by using `Calculator["add"]` from the Calculator service. The input values from firstValue and secondValue are assigned to the request using `setA()` and `setB()`, respectively. This ensures that the backend receives the correct values for the addition operation.

#### Change: Update the API Call Code

- **Before (Commented-Out Code):**
  ```javascript
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
  ```javascript
  const submitAction = () => {
      const methodDescriptor = Calculator["add"]; // Use the "add" operation
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
  ```javascript
  // setOutput(message.getValue());
  ```

- **After:**
  ```javascript
  setOutput(message.getValue());
  ```

---

### Updating the Output Formatting

This format clearly separates the heading ("Service call completed with output:") from the actual result. The result is displayed in a read-only OutlinedTextArea, ensuring a consistent and clear presentation.

#### Change: Replace the Original ServiceOutput Component

- **Before:**
  ```jsx
  const ServiceOutput = () => {
      if (!output) {
          return (
              <div className={classes.contentBox}>
                  <h4>{"Something went wrong..."}</h4>
              </div>
          );
      }
  
      return (
          <div className={classes.contentBox}>
              <h4>{"Output"}</h4>
              <div className={classes.contentBox}>
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
              <div className={classes.contentBox}>
                  <h4>
                      {"Something went wrong..."}
                  </h4>
              </div>
          );
      }
  
      return (
          <div className={classes.contentBox}>
              <h4>
                  {"Service call completed with output:"}
              </h4>
              <div className={classes.contentBox}>
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

```javascript
import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import Button from "@mui/material/Button";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import { Calculator } from "./example_pb_service";

const ExampleService = ({ serviceClient, isComplete }) => {
    const classes = useStyles();
    const [response, setResponse] = useState(null);

    const ServiceInput = () => {
        // Changed: Two state variables for two inputs (first and second numbers)
        const [firstValue, setFirstValue] = useState("");
        const [secondValue, setSecondValue] = useState("");

        // We no longer need an "action" state since we hardcode the "add" operation.
        const isAllowedToRun = () => {
            return !!firstValue && !!secondValue;
        };

        const onActionEnd = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }

            // Changed: Un-commented response handling
            setResponse(message.getValue());
        };

        const submitAction = () => {
            // Changed: Use the "add" method from Calculator
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
            <div className={classes.contentBox}>
                <h4>
                    {"Input values"}
                </h4>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        type={"text"}
                        label={"First number"}
                        helperTxt={"Enter first number"}
                        value={firstValue}
                        onChange={(event) => setFirstValue(event.target.value)}
                    />
                </div>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        type={"text"}
                        label={"Second number"}
                        helperTxt={"Enter second number"}
                        value={secondValue}
                        onChange={(event) => setSecondValue(event.target.value)}
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
                <div className={classes.contentBox}>
                    <h4>
                        {"Something went wrong..."}
                    </h4>
                </div>
            );
        }

        return (
            <div className={classes.contentBox}>
                <h4>
                    {"Service call completed with output:"}
                </h4>
                <div className={classes.contentBox}>
                    <OutlinedTextArea
                        value={response}
                    />
                </div>
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

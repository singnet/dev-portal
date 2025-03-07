# Tutorial on developing a console calculator

This is an example of how to use SingularityNET Python SDK to create a console calculator that works using a service 
on the SingularityNET platform.

## Description

It is assumed that there is an application provider (developer), who pays for all the
transactions and service calls.

So, the application must have the next console interface:

```powershell
Welcome to the calculator powered by SingularityNET platform!
Please type the expression you want to calculate, e.g. 2 + 3.
Type 'exit' to exit the program.
Calculator> 34 * 4 
Calculating 34 * 4...
34 * 4 = 134
Calculator> 103 - 82
Calculating 103 - 82...
103 - 82 = 21
Calculator> exit
```

## Development

### Install package

Before the beginning we need to install `snet.sdk` package:

```sh
pip install snet.sdk
```

### Configuration

Firstly, we need to configure the SDK and service client. We create a configuration dictionary and initialize the SDK instance with it.

_Note:_ Don't forget to import the `snet.sdk` package.

```python
from snet import sdk

"""
SDK configuration provided by the application provider.
To run the application, replace 'private_key' and 'eth_rpc_endpoint' with your values.
"""
config = sdk.config.Config(
    private_key="YOUR_PRIVATE_KEY",  # Replace with your Ethereum private key
    eth_rpc_endpoint="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",  # Replace with your Alchemy API key
    concurrency=False, 
    force_update=False 
)

# Initialize the SnetSDK instance
snet_sdk = sdk.SnetSDK(config)
```

#### What to Replace
- `private_key`: Your Ethereum account private key for signing transactions.
- `eth_rpc_endpoint`: Use the Alchemy RPC endpoint with your API key:
   ```
   https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
   ```

To get your **Alchemy API Key**, follow [this guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).


Calculator service is deployed on the sepolia network. To create a client of this service we need to pass `org_id`, 
`service_id` and `group_name` to `create_service_client` method:

```python
calc_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f",
                                             service_id="Exampleservice", group_name="default_group")
```

### User input parsing

Secondly, we need to write a function that will process and parse user input. 

```python
def parse_expression(expression):
    elements = list(expression.split())
    if len(elements) != 3:
        raise Exception(f"Invalid expression '{expression}'. Three items required.")

    a = int(elements[0])
    b = int(elements[2])
    if elements[1] not in ["+", "-", "*", "/"]:
        raise Exception(f"Invalid expression '{expression}'. Operation must be '+' or '-' or '*' or '/'")
    elif not isinstance(a, (float, int)) or not isinstance(b, (float, int)):
        raise Exception(f"Invalid expression '{expression}'. Operands must be integers or floating point numbers.")
    op = elements[1]

    return a, b, op
```

This function splits the passed expression entered by the user into separate elements and checks their correctness. 
In case of invalid input, exceptions are thrown, otherwise three elements of the required types are returned.

### Main cycle

The calculator service accepts the name of the method on which the arithmetic operation depends. Therefore, we will 
add a dictionary to match the operation symbol and the method name in the service.

```python
operators = {
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div"
}
```

Now we can write the main function:

```python
def main():
    print("""
Welcome to the calculator powered by SingularityNET platform!
Please type the expression you want to calculate, e.g. 2 + 3.
Type 'exit' to exit the program.""")
    while True:
        expression = input("Calculator> ")
        if expression == "exit":
            break
        try:
            a, b, op = parse_expression(expression)
            print(f"Calculating {a} {op} {b}...")
            result = calc_client.call_rpc(operators[op], "Numbers", a=a, b=b)
            print(f"{a} {op} {b} = {result}")
        except Exception as e:
            print(e)


if __name__ == "__main__":
    main()
```

In an "infinite" loop, user input is read. If `exit` is entered, the program terminates. Otherwise, the expression 
is parsed using the `parse_expression` function and, if no errors occur, its result is calculated using the previously 
created instance of the ServiceClient class - `calc_client`, using `call_rpc` method. The result is then displayed 
on the screen.

The entire application code can be viewed at the 
[link](https://github.com/singnet/snet-sdk-python/blob/master/examples/calculator.py) to GitHub.


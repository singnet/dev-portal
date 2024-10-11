## Tutorial on developing a console application

This is an example of how to use SingularityNET Python SDK to create a console application that uses all the 
core functionality of the SDK.

### Description

It is assumed that there is an application provider (developer), who pays for all the
transactions and service calls.

The application should have a main menu and a submenu where the user enters the command name. 
The application should request additional parameters for a specific command after entering the command itself.

So, the application must have the next console interface:

```
Hello, welcome to the Snet SDK console application!
To use the application, type the name of the command you want to execute.
Available commands:
	organizations - print a list of organization ids from Registry
	services - print a list of service ids for an organization from Registry
	balance - print the account balance and the escrow balance
	deposit - deposit AGIX tokens into MPE
	block - print the current block number
	service - go to the services menu
	channel - go to the channels menu
	help - print a list of available commands in the main menu
	exit - exit the application
To print a list of available commands, type 'help'
>>> channel
Available commands:
	update - update a list of initialized payment channels
	list - print a list of initialized payment channels
	open - open a new payment channel
	add-funds - add funds to a channel
	extend-expiration - extend expiration of a channel
	help - print a list of available commands in the channels menu
	back - return to the main menu
	exit - exit the application
channel >>> back
Available commands:
	organizations - print a list of organization ids from Registry
	services - print a list of service ids for an organization from Registry
	balance - print the account balance and the escrow balance
	deposit - deposit AGIX tokens into MPE
	block - print the current block number
	service - go to the services menu
	channel - go to the channels menu
	help - print a list of available commands in the main menu
	exit - exit the application
>>> services
Enter organization id: 26072b8b6a0e448180f8c0e702ab6d2f
Services:
	Exampleservice
>>> exit
```

### Development

#### Install package

Before the beginning we need to install `snet.sdk` package:

```sh
pip install snet.sdk
```

#### Configuration

Firstly, we need to configure sdk and service client. So we create a config dict and then an sdk instance with
that config. 

_Note:_ don't forget to import `snet.sdk` package.

```python
from snet import sdk

"""
SDK configuration that is configured by the application provider.
To run the application you need to change the 'private_key', 'eth_rpc_endpoint' and 'identity_name' values.
"""
config = sdk.config.Config(private_key="YOUR_PRIVATE_KEY",
                               eth_rpc_endpoint=f"https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
                               concurrency=False,
                               force_update=False)

snet_sdk = sdk.SnetSDK(config)  # the 'SnetSDK' instance
```

Here you need to set private values: `private_key`, `eth_rpc_endpoint` and possibly change some others.

#### Global variables

The application will locally store created service clients as well as open payment channels for these services.
In addition, there must be an active service - the one for which methods are called, channels are opened, etc.

```python
initialized_services = []  # the list of initialized service clients
active_service: sdk.service_client.ServiceClient  # the currently active service
channels = []  # the list of open channels
```

The concept of the application is that when the user enters any command, the corresponding function should be called.
To implement this concept, we need a dict that will associate command names with the corresponding functions.

```python
"""
Commands available in the application with their descriptions and functions to call.
"""
commands = {
    "main": {
        "organizations": (list_organizations, "print a list of organization ids from Registry"),
        "services": (list_services_for_org, "print a list of service ids for an organization from Registry"),
        "balance": (balance, "print the account balance and the escrow balance"),
        "deposit": (deposit, "deposit AGIX tokens into MPE"),
        "block": (block_number, "print the current block number"),
        "service": (lambda: None, "go to the services menu"),
        "channel": (lambda: None, "go to the channels menu"),
        "help": (commands_help, "print a list of available commands in the main menu"),
        "exit": (lambda: exit(0), "exit the application")
    },

    "service": {
        "add": (create_service_client,
                "create a new service client. If it the first time, the new service becomes active"),
        "use": (switch_service, "switch the active service"),
        "call": (call, "call the active service method"),
        "info": (print_service_info, "output services, methods and messages in a service"),
        "list": (list_initialized_services, "print a list of initialized services"),
        "help": (commands_help, "print a list of available commands in the services menu"),
        "back": (lambda: None, "return to the main menu"),
        "exit": (lambda: exit(0), "exit the application")
    },

    "channel": {
        "update": (update_channels, "update a list of initialized payment channels"),
        "list": (list_channels, "print a list of initialized payment channels"),
        "open": (open_channel, "open a new payment channel"),
        "add-funds": (add_funds, "add funds to a channel"),
        "extend-expiration": (extend_expiration, "extend expiration of a channel"),
        "help": (commands_help, "print a list of available commands in the channels menu"),
        "back": (lambda: None, "return to the main menu"),
        "exit": (lambda: exit(0), "exit the application")
    }
}
```

This dict is divided into three parts: the `main` part is responsible for the main menu, the `channel` part is 
responsible for the channel submenu, and `service` is responsible for the service submenu. `commands` performs 
several functions at once. It associates commands with their corresponding functions, stores descriptions for the 
commands needed for the `help` command, and also defines the list of commands available in 
the current menu. So one of the dict parts should be active to perform two last functions.

```python
active_commands: dict = commands["main"] # the list of available commands in the active menu
```

`active_commands` is changed when changing menu. 

#### Main function

```python
def main():
    """
    The function, which is called when the application is started.
    Manages global variables and calls the appropriate functions.
    """
    global active_commands

    print("""
Hello, welcome to the Snet SDK console application!
To use the application, type the name of the command you want to execute.""")
    commands_help()
    print("To print a list of available commands, type 'help'")

    prefix = ">>> "
    while True:
        command = input(prefix).strip()
        if command in active_commands:
            active_commands[command][0]()
        else:
            print(f"Command '{command}' is not found. Please try again.")
            continue

        if command in ["back", "service", "channel"]:
            if command == "back":
                command = "main"
                prefix = ">>> "
            else:
                prefix = command + " >>> "
            active_commands = commands[command]
            commands_help()


if __name__ == "__main__":
    main()

```

The "main" function processes user input, calls the necessary functions, and also switches the menu (when the 
corresponding command is entered) by changing the values of the "active_commands" and "prefix" variables. Of course, 
all this happens in an "infinite" loop (until the "exit" command is called).

#### Functions for commands

There are lots of functions to implement, that can be viewed in `commands` dict. For example, `list_services_for_org`,
`deposit`, `create_service_client`, `call`, `open_channel`, etc. All these functions use SDK functionality and 
global variables, and prompt the user for additional input if needed. Also some of them do some checks on user input 
if necessary and possible.

Not all functions will be described here, but the full program code with comments can be viewed at the 
[link](https://github.com/Arondondon/snet-sdk-python/blob/depelopment-app-example/examples/console_app.py) to GitHub

###### list_services_for_org

The function, which is called when the user enters the command 'services' in the main menu.
Prints the list of services IDs, related to the organization specified by the user.
The list is got from the MPE contract using 'get_organization_list'.

```python
def list_services_for_org():
    org_id = input("Enter organization id: ").strip()
    print("Services:")
    print(*map(lambda x: '\t' + x, snet_sdk.get_services_list(org_id=org_id)), sep="\n")
```

###### create_service_client

The function, which is called when the user enters the command 'add' in the service menu.
Creates a service client, related to the service specified by the user, and adds it to the
list of initialized services. The creation occurs using 'create_service_client'.

```python
def create_service_client():
    org_id = input("Enter organization id: ").strip()
    service_id = input("Enter service id: ").strip()
    group_name = input("Enter payment group name: ").strip()

    service = snet_sdk.create_service_client(org_id=org_id, service_id=service_id, group_name=group_name)
    initialized_services.append(service)

    global active_service
    if active_service is None:
        active_service = service
```

###### commands_help

The function, which is called when the user enters the command 'help' in any menu.
Prints the list of available commands with descriptions depending on the active menu.

```python
def commands_help():
    global active_commands
    print("Available commands:")
    for command in active_commands.items():
        print(f'\t{command[0]} - {command[1][1]}')
```

###### call

The function, which is called when the user enters the command 'call' in the service menu.
Calls the method specified by the user of the active service using `call_rpc` method. It gets data about the service
using the 'get_services_and_messages_info' and parses the resulting dict to display the correct names of the input
and output values to the user.

```python
def call():
    global active_service
    if active_service is None:
        print("No initialized services!\n"
              "Please enter 'service' to go to the service menu and then enter 'add' to add a service.")
        return None

    method_name = input("Enter method name: ")

    services, messages = active_service.get_services_and_messages_info()
    is_found = False
    for service in services.items():
        for method in service[1]:
            print(method[0], method_name)
            if method[0] == method_name:
                input_type = method[1]
                output_type = method[2]
                is_found = True
                break
        if is_found:
            break

    if not is_found:
        print(f"Method '{method_name}' is not found in service")
        return None

    inputs = {var[1]: float(input(f"{var[1]}: ")) for var in messages[input_type]}

    print("Service calling...")

    result = active_service.call_rpc(method_name, input_type, **inputs)
    outputs = {var[1]: getattr(result, var[1]) for var in messages[output_type]}

    print("Result:", *map(lambda x: f"{x[0]}: {x[1]}", outputs.items()), sep="\n")
```

###### update_channels

The function, which is called when the user enters the command 'update' in the channel menu.
Updates the list of open channels stored in 'channels'. Gets the list of open channels using
'load_open_channels' for each initialized service.
The specified method searches for channels through the blockchain, which is why it takes quite a long time
to work, so there is a warning for the user about this at the beginning.

```python
def update_channels():
    if active_service is None:
        print("No initialized services!\n"
              "Please enter 'service' to go to the service menu and then enter 'add' to add a service.")
        return None

    is_continue = input("""Updating the channel list makes sense if the channel data has changed through other entry points. 
This procedure may take several minutes. 
Continue? (y/n): """).strip() == 'y'
    if not is_continue:
        return None

    print("Updating the channel list...")
    global channels
    channels.clear()

    for service in initialized_services:
        load_channels = service.load_open_channels()
        for channel in load_channels:
            channels.append((channel, service.org_id, service.service_id, service.group['group_name']))

    print("Channels updated! Enter 'list' to print the updated list.")
```

###### open_channel

The function, which is called when the user enters the command 'open' in the channel menu.
Opens a new channel for the active service. Checks the balance of the MPE contract and asks the user
if they want to deposit AGIX tokens into it if there isn't enough funds. Opens the channel using 'open_channel'
or 'deposit_and_open_channel' with the user-specified amount of AGIX tokens in cogs and expiration time.

```python
def open_channel():
    global active_service
    global channels
    additions = False
    if active_service is None:
        print("No initialized services! The channel can only be opened for the service!\n"
              "Please enter 'service' to go to the service menu and then enter 'add' to add a service.")
        return None
    else:
        is_continue = input("The new channel will be opened for the active service. Continue? (y/n): ").strip() == 'y'
        if not is_continue:
            return None

    amount = int(input("Enter amount of AGIX tokens in cogs to put into the channel: ").strip())

    balance = snet_sdk.account.escrow_balance()
    is_deposit = False
    if balance < amount:
        print(f"Insufficient balance!\n\tCurrent MPE balance: {balance}\n\tAmount to put: {amount}")
        is_deposit = input("Would you like to deposit needed amount of AGIX tokens in advance? (y/n): ").strip() == 'y'
        if not is_deposit:
            print("Channel is not opened!")
            return None

    expiration = int(input("Enter expiration time in blocks: ").strip())

    if is_deposit:
        channel = active_service.open_channel(amount=amount, expiration=expiration)
    else:
        channel = active_service.deposit_and_open_channel(amount=amount, expiration=expiration)
    channels.append((channel, active_service.org_id, active_service.service_id, active_service.group['group_name']))
```

The entire application code can be viewed at the 
[link](https://github.com/singnet/snet-sdk-python/blob/master/examples/console_app.py) to GitHub.


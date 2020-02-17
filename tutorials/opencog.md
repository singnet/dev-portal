---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Write an OpenCog Service to SingularityNET
description: Getting started with OpenCog for your AI Service

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: View all docs
        url: '/docs'
---

[atomese]: https://wiki.opencog.org/w/Atomese
[scheme]: https://wiki.opencog.org/wikihome/index.php/Scheme
[services-readme]: https://github.com/singnet/opencog-services
[contribution-guidelines]: /docs/guidelines



-------------------------------

_Before following this tutorial, make sure you've installed [Docker](https://www.docker.com/)_

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we'll create an Opencog service and publish it in SingularityNET.

## Step 1: Setting up with Docker

Setup and run a docker container.

```
$ git clone https://github.com/singnet/opencog-services.git
$ docker build -t opencog_service_dev opencog-services/Docker/
$ docker run --name OPENCOG_SERVICE_DEV -ti opencog_service_dev /bin/bash
```

From this point we follow the turorial in the Docker container's prompt.

The code in this repo is used to start and publish an Opencog service in
SingularityNET. `bin/server` is the executable that actually listen for requests.
`bin/client` can be used to send commands to the server locally (without Blockchain).

Note that there's **only one** Opencog service, which expects comands like this:

```
# ./bin/client sync Echo foo bar
foo bar
```

The service will issue the comand `Echo` passing 2 arguments: `foo` and `bar`.
Thus, to implement a **new Opencog service**, we'll actually need to implement a class
which is linked to `bin/server` to provide the new command. So from now on we
use the terminology "command" instead of "service" because we'll actually
implement a new "command" to the Opencog "service" which is already in place.

The `sync` keyword in the above command line is not relevant here.
Take a look at [this document][services-readme] for details.

**Note:** If you decided to run the server to actually test the client command
above, make sure you kill it before moving on.

## Step 2: Implementing "Hello World" commands

We'll implement 2 versions of a "Hello world" command, one in C++ and another
in Scheme. We need different names for the two commands so we'll call them
HelloWorld and HelloWorld2 respectively.

### Step 2a: C++

For the C++ command, we need to implement a C++ class (with separated .h and .cc) in `src/cpp-services`.
The class is supposed to have the exact name of the command in `CamelCase` notation.
So the header file `src/cpp-services/HelloWorld.h` will look like this:

```
#ifndef _OPENCOGSERVICES_HELLOWORLD_H
#define _OPENCOGSERVICES_HELLOWORLD_H

#include "../OpencogSNETService.h"

namespace opencogservices
{

class HelloWorld : public OpencogSNETService
{

public:

    bool execute(std::string &output, const std::vector<std::string> &args);

    HelloWorld();
    ~HelloWorld();

private:

};

}

#endif // _OPENCOGSERVICES_HELLOWORLD_H
```

The command class need to inherit from `OpencogSNETService`. The only required
method is `execute()` but `OpencogSNETService` has other implemented helper
methods explained [here](#Additional-helper-methods-in-OpencogSNETService).

`execute()` expects a reference to std::string where its output is supposed to
be written and a std::vector with the input arguments. In our case we expect no
arguments.

So we only need to implement `execute()` in `src/cpp-services/HelloWorld.cc`. In our case it may
look like this:

```
#include "HelloWorld.h"

using namespace opencogservices;
using namespace std;

HelloWorld::HelloWorld() {}
HelloWorld::~HelloWorld() {}

bool HelloWorld::execute(string &output, const vector<std::string> &args)
{
    output.assign("Hello World");
    return false;
}
```

`execute()` is supposed to return `true` if and only if an error occurred so
our `HelloHorld` implementation will just return `false` meaning that
everything is OK.

Once the class is ready, edit `src/OpencogSNETServiceFactory.cc` and add an
`#include` statement and another `else if` clause in the method `factory()`
according to your new command name.

Although `OpencogSNETServiceFactory` may compile if you use different names for
the command and C++ class, you are supposed to use the exact same name.

To compile our new command just cd to `src/` and:

```
# make clean
# make
```

OK we are ready to test our new C++ command.

### Step 2b: Scheme

For the Scheme command, we need to implement a [Scheme][scheme] file in
`src/scm-services` with the exact name of the command in `CamelCase` notation
defining a funcion named `execute` which expects one single argument (a list with
all the arguments to the function).

So our Scheme file `src/scm-services/HelloWorld2.scm` will look like this:

```
(define (execute args)
    "Hello World 2"
)
```

If the command expects arguments, they will be passed as a list to the function.
You can make an arbritary number of valid Scheme calls in your file e.g.
load new modules, define several global variables or helper functions etc.
The only requisite is that you nned to define a function with the exact name of the
command expecting a list of arguments as the only parameter.

**Important:** Anything the command send to `stdout` (e.g. by calling the
function `(display)`) will be considered as part of the output.

So we're done with the Scheme command.

## Step 3: Testing Commands

We are ready to test our two new commands. `cd` to the root directory and start
the server:

```
# ./bin/server &
```

Now call our new commands:

```
# ./bin/client sync HelloWorld
Hello World
# ./bin/client sync HelloWorld2
Hello World 2

```

## Step 4: Integrate into OpenCog Service

Once your commands are working properly, it's time to make a PR to integrate
then in the SingularityNET Opencog service. Make sure you read our
[contribution guidelines][contribution-guidelines] before going on.

Before issuing a PR, chek if your new commands implementation is compliant
with some basic standards for tests and documentation. in the root directory run:

```
# ./scripts/compliance_check.sh
tests/HelloWorld is mising
tests/HelloWorld/testCases.txt is mising
tests/HelloWorld/baseline is mising
docs/HelloWorld.md is mising
```

Note that we're missing a lot of files. Basically we need to provide test cases
for a regression test and a `.md` documentation for our new commands.

### Step 4a: Integration Test

First, we'll create the test cases for both commands.

```
# cd tests
# mkdir -p HelloWorld/baseline
```

Create a new file `HelloWorld/testCases.txt` like this:

```
{"test-cases": [
{"input": "", "output": "t.txt"}
]}

```

`testCases.txt` lists all the test cases in a JSON array. Each entry is a hash
with "input" and "output". the first key is the input parameters of the test
case and second one is the name of the file (which is expected to be in
`HelloWorld/baseline/`) with the respective expected output.

We have only one test case so create `HelloWorld/baseline/t.txt` like this:

```
Hello World
```

Execute integration tests:

```
./bin/runTests
Runing tests for Echo...
Runing tests for EchoScheme...
Runing tests for PatternMiner...
Runing tests for HelloWorld...
Runing tests for HelloWorld2...
Could execute tests for HelloWorld2
```

Still missing the test cases for HelloWorld2. Follow the same steps and run the
regression tests again to make sure all the tests pass. **NOTE**: The Scheme
commands append an extra `\n` at the end of the output. So your baseline output
file need to have this empty line at the end.

### Step 4b: Creating Documentation

Now we need to create a proper documentation for our new commands. Create
`docs/HelloWorld.md` and `docs/HelloWorld2.md`. You are advised to use one of
the documents of other commands as template for your own.

Use a MarkDown previewer of your choice. When you are done with the documentation, call:

```
# ./scripts/buildDocs.sh
```

This script will use your newly created documents to update the HTML
user's guide of SingularityNET Opencog Services. Those HTML files are in the
repository as well so don't forget to commit them in your PR.

You also need to update the main `README.md` of the repository. Edit it and
look for the secion "Opencog services to SingularityNET". Add your newly
created commands to the list with a simple description of their arguments
and what is their expected output.

## Step 5: Submitting PR

You are ready to submit your PR. Read our
[contribution guidelines][contribution-guidelines] before submiting it.

## Additional helper methods in OpencogSNETService

The superclass inherited by your command has a couple of helper methods and variables.

```
    opencog::AtomSpace atomSpace;

    virtual void loadModules();

    bool loadAtomeseFile(std::string &errorMessage, const std::string &url);
    void evaluateScheme(const std::string &scmLine);
    void evaluateScheme(std::string &output, const std::string &scmLine);
    void setConfigurationParameters(const std::string jsonString);

```

- **loadModules()**: Loads required SCM modules. Default implementation loads only (use-modules (opencog)) This method is called in OpencogSNETService constructor.
- **atomSpace**: a variable containing the AtomSpace object used to execute any Opencog call.
- **loadAtomeseFile()**: Fetches the contents of the passed URL (which is supposed to be a .scm file with an Atomese knowledge base) and load it in **atomSpace**. Any errors are reported in `errorMessage`.
- **evaluateScheme()**: Evaluates the passed Scheme command (any Opencog's scheme functions use the public **atomSpace**). The Scheme command output is discarded.
- **evaluateScheme()**: Evaluates the passed Scheme command (any Opencog's scheme functions use the public **atomSpace**). The Scheme command output is returned in `output`.
- **setConfigurationParameters()**: Use the passed JSON hash to set Opencog's configuration parameters (e.g. `{"Max_thread_num": "8", "Pattern_Max_Gram": "3"}`)

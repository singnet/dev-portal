# Contribution

Are you ready to contribute to SingularityNET? We'd love to have you on board, and we will help you as much as we can. 

## Questions and help
This is our guideline for [Issues and Bugs](#issues-and-bugs) and for [Feature Requests](#feature-requests).

You can meet and chat with other developers via the following channels:
* [Developer Telegram](https://t.me/AGIDevelopers)
* [Developer Forum](https://community.singularitynet.io/c/developers)


## Issues and Bugs
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting a ticket to our GitHub issues. Even better, you can decide to submit a pull request to our projects if you decide to fix it.

**Please see the Submission Guidelines below**.

## Feature Requests
You can request a new feature by submitting a ticket to any of our repositories in the issues tab. For example, if you would like to give feedback about our Developer Portal, please do that [here](https://github.com/singnet/dev-portal-v2/issues).

If you would like to implement a new feature then consider what kind of change it is:
-   **Major Changes** that you wish to contribute to the project should be discussed first. Please open a ticket which clearly states that it is a feature request in the title and explain clearly what you want to achieve in the description, and the developers team will discuss with you what should be done in that ticket. You can then start working on a Pull Request.
-   **Small Changes** can be proposed without any discussion. Open up a ticket which clearly states that it is a feature request in the title. Explain your change in the description, and you can propose a Pull Request straight away.

## Submission Guidelines

### Submitting an Issue
Before you submit your issue, please first search the archive. It could be that your question was already answered or the issue was already reported.

If your issue appears to be a bug, and has not been reported, open a new issue. Help us minimize the effort we need to take to fix issues and adding new features by not reporting duplicate issues. Providing the following information will increase the chances of your issue being dealt with quickly:

-   **Overview of the issue** - If an error is being thrown, a stack trace helps.
-   **Motivation for or Use Case** - Explain why this is a bug for you.
-   **Reproduce the error** - An unambiguous set of steps to reproduce the error.
-   **Related issues** - Has a similar issue been reported before?
-   **Suggest a Fix** - If you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit).
-   **Project Version(s)** - Is it a regression?
-   **Operating System** - Indicate the used operating system.

### Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

-   Search GitHub for an open or closed Pull Request that relates to your submission.
-   Fork our repository and make your changes.
-   Include appropriate test cases.
-   Follow our [Coding Rules](#coding-rules).
-   Ensure that all tests pass.
-   Commit your changes using a descriptive commit message that follows our
    [commit message conventions](#commit-message-format).

    ```sh
    git commit -a
    ```

    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

-   In GitHub, send a pull request to the original repository.
-   If we suggest changes then:

    -   Make the required updates.
    -   Re-run all the tests on your sample generated project to ensure tests are still passing.
    -   Rebase your branch and force push to your GitHub repository (this will update your Pull Request).

That's it! Thank you for your contribution!

#### Resolving pull request conflicts
Sometimes your PR will have merge conflicts with the original repository's master branch. There are several ways to solve this but if not done correctly this can end up as a true nightmare. So here is one method that works quite well.

-   First, fetch the latest version from the original repository

    ```sh
    git fetch original_repository_git_url
    ```

-   Merge your changes with the latest changes from the original repository.

    ```sh
    git merge FETCH_HEAD
    ```

-   Commit and push your changes.

    ```sh
    git add.
    git commit -a
    git push
    ```

## Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

-   All features or bug fixes **must be tested** by one or more tests.
-   The project must have unit tests and integration tests to all features.
-   Code files **must be** formatted using default code style of each used language.
-   All code files **must be** well documented.

## Git Commit Guidelines
Please ensure to [squash](https://help.github.com/articles/about-git-rebase/#commands-available-while-rebasing) unnecessary commits so that your commit history is clean.

### Commit Message Format
We prefer well formatted commit messages - it makes it easier to understand what was done and why it was done, and it helps inform our decisions to accept your PRs or to request for a change.

Each commit message consists of a **header**, a **body** and a **footer**.

```sh
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Header
The header contains a succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize first letter
-   no dot (.) at the end

### Body
If your change is simple, the body is optional. Just as in the header, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer is the place to reference GitHub issues that this commit **Closes**.

You **must** use the [GitHub keywords](https://help.github.com/articles/closing-issues-via-commit-messages) for
automatically closing the issues referenced in your commit.

### Example
For example, here is a good commit message:

```sh
upgrade to Python 3.10+

upgrade the project builds to use the new Python 3.10+
see https://www.python.org/download/releases/

Fix #1234
```

## Developer Portal
If you would like to contribute by helping us improve, expand, or otherwise enhance the SingularityNET Developer Portal you are welcome to do so. You can send a PR for simple changes, or first open an issue for big changes [here](https://github.com/singnet/dev-portal-v2/issues).

[singnet-home]: https://www.singularitynet.io
[singnet-github]: https://github.com/singnet
[dnn-github]: https://github.com/singnet/dnn-model-services
[contribution-guidelines]: /docs/products/AIMarketplace/Forcomers/contribution-guidelines/.md
[cpp-tutorial]: /docs/products/AIMarketplace/Forcomers/Platform-workshops/cpp/index.md
[java-tutorial]: /docs/products/AIMarketplace/Forcomers/Platform-workshops/java/index.md
[go-tutorial]: /docs/products/AIMarketplace/Forcomers/Platform-workshops/go/index.md
[python-tutorial]: /docs/products/AIMarketplace/Forcomers/Platform-workshops/python/index.md
[opencog-tutorial]: /docs/products/AIMarketplace/Forcomers/opencog/.md
[service-tutorial]: /docs/products/AIMarketplace/Forcomers/publish/.md
[naming-standards]: /docs/products/AIMarketplace/Forcomers/naming-standards/.md
[grpc]: https://grpc.io/
[grpc-docs]: https://grpc.io/docs/
[opencog]: https://opencog.org/
[opencog-services]: https://github.com/singnet/opencog-services

## Guidelines for service integration in SingularityNET  

These are guidelines to help SingularityNET developers to write/integrate new
AI services to the platform.

## <a name="languages"></a> Supported languages

SingularityNET services use [gRPC][grpc] which is an open-source universal RPC
framework. So any new service must provide its API in gRPC.

gRPC supports several programming languages and a guide for each of them is
available [here][grpc-docs].

- C++
- Java
- Python
- Go
- Ruby
- C#
- Node.js
- Android Java
- Objective-C
- PHP

There are tutorials with step-by-step instructions for implementing a new
service in each of these languages:

- [How to write a SingularityNET service in C++](/docs/products/AIMarketplace/Forcomers/Platform-workshops/cpp/index.md)
- [How to write a SingularityNET service in Python](/docs/products/AIMarketplace/Forcomers/Platform-workshops/python/index.md)
- [How to write a SingularityNET service in Java](/docs/products/AIMarketplace/Forcomers/Platform-workshops/java/index.md)
- [How to write a SingularityNET service in Go](/docs/products/AIMarketplace/Forcomers/Platform-workshops/go/index.md)

If you already have a gRPC service, this tutorial explains how to publish it in
SingularityNET:

- [How to publish a service][service-tutorial]

Make sure you follow our [naming standardisation guidelines][naming-standards].

## <a name="frameworks"></a> AI frameworks

There are a couple of AI frameworks integrated to SingularityNET so you
can just add new functionalities to services which are already published.

- [Opencog][opencog]: an open-source software project aimed at directly
confronting the AGIX challenge, using mathematical and biological inspiration
and professional software engineering techniques.

There are tutorials with step-by-step instructions on how to extend the
existing AI framework service in order to implement new functionalities:

- [How to write an Opencog service for SingularityNET][opencog-tutorial]

## <a name="thirdparty"></a> Third-party code and models

Before publishing a service based on third-party code or model(s), make sure
you follow all the guidelines below.

1. The service is FREE.
1. The main documentation of the service (e.g. README.md) mentions (crystal clear)
that the service is based on third-party work.
1. The original work (code, paper, model etc) is clearly mentioned and properly
linked in README.
1. The authors of the original code or model(s) are clearly mentioned
in README.
1. Any licenses attached to the original work is mentioned in README.
1. The terms of any license attached to the original work allows its use in
SNET.

See [this example][dnn-github] of third-party based service documentation which
is fully compliant with these guidelines.

## <a name="docs"></a> Service documentation

All the following documentation is mandatory for any service.

1. **README** describing the
structure of the repository and how to build/test the service. This is a sort
of "developer's guide" aimed at people interested in extending or reusing the
service.
1. **docs/index.html** pointed by standard Github Pages describing how to use
the service. This is the "user's guide" of your service.
1. **LICENSE** with SNET standard license.

If you are extending an existing service. Follow any particular guidelines of
the specific project and make sure you update all the aforementioned documents
accordingly.

See [this example][opencog-services] of service documentation which
is fully compliant with these guidelines.

## <a name="contributing"></a> Contributing to existing projects

SingularityNET have several AI service integration projects. See our
[github][singnet-github] for a list of them.
Before contributing to any of thees, please read our [contribution-guidelines].

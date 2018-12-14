# Contributing

Are you ready to contribute to SingularityNET ? We'd love to have you on board, and we will help you as much as we can. Here are the guidelines we'd like you to follow so that we can be of more help:

-   [Questions and help](#question)
-   [Issues and Bugs](#issue)
-   [Feature Requests](#feature)
-   [Submission Guidelines](#submit)
-   [Coding Rules](#rules)
-   [Git Commit Guidelines](#commit)

## <a name="question"></a> Questions and help
This is our guideline for [Issues and Bugs](#issue) and for [Feature Requests](#feature).

If you have a question on using this project, please join our [Telegram chat room](https://telegram.me/singularitynet) or use the project name tag on [StackOverflow](http://stackoverflow.com/tags/singularitynet).

## <a name="issue"></a> Issues and Bugs

If you find a bug in the source code or a mistake in the documentation, you can help us by submitting a ticket to our GitHub issues. Even better, you can submit a Pull Request to our projects.

**Please see the Submission Guidelines below**.

## <a name="feature"></a> Feature Requests

You can request a new feature by submitting a ticket to our GitHub issues. 
If you would like to implement a new feature then consider what kind of change it is:

-   **Major Changes** that you wish to contribute to the project should be discussed first. Please open a ticket which clearly states that it is a feature request in the title and explain clearly what you want to achieve in the description, and the developers team will discuss with you what should be done in that ticket. You can then start working on a Pull Request.
-   **Small Changes** can be proposed without any discussion. Open up a ticket which clearly states that it is a feature request in the title. Explain your change in the description, and you can propose a Pull Request straight away.

## <a name="submit"></a> Submission Guidelines

### Submitting an Issue

Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and has not been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues. Providing the following information will increase the
chances of your issue being dealt with quickly:

-   **Overview of the issue** - if an error is being thrown a stack trace helps
-   **Motivation for or Use Case** - explain why this is a bug for you
-   **Reproduce the error** - an unambiguous set of steps to reproduce the error.
-   **Related issues** - has a similar issue been reported before?
-   **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
    causing the problem (line of code or commit)
-   **Project Version(s)** - is it a regression?
-   **Operating System** - Inform the used operating system

### Submitting a Pull Request

Before you submit your pull request consider the following guidelines:

-   Search GitHub for an open or closed Pull Request
    that relates to your submission.
-   Fork our repository and make your changes.
-   Include appropriate test cases.
-   Follow our [Coding Rules](#rules).
-   Ensure that all tests pass
-   Commit your changes using a descriptive commit message that follows our
    [commit message conventions](#commit-message-format).

    ```shell
    git commit -a
    ```

    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

-   In GitHub, send a pull request to the original repository.
-   If we suggest changes then

    -   Make the required updates.
    -   Re-run all the tests on your sample generated project to ensure tests are still passing.
    -   Rebase your branch and force push to your GitHub repository (this will update your Pull Request).

That's it! Thank you for your contribution!

#### Resolving pull request conflicts

Sometimes your PR will have merge conflicts with the original repository's master branch. There are several ways to solve this but if not done correctly this can end up as a true nightmare. So here is one method that works quite well.

-   First, fetch the latest version from the original repository

    ```bash
    git fetch original_repository_git_url
    ```

-   Merge tour chagnes with the lastest changes from the original repository.

    ```bash
    git merge FETCH_HEAD
    ```

-   Commit and push your changes.

    ```bash
    git add.
    git commit -a
    git push
    ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

-   All features or bug fixes **must be tested** by one or more tests.
-   The project must have unity tests and integration tests to all features.
-   Code files **must be** formatted using default code style of each used language.
-   All code files **must be** well documented.

## <a name="commit"></a> Git Commit Guidelines

We prefer well formatted commit messages. Please try the following example.

Please ensure to [squash](https://help.github.com/articles/about-git-rebase/#commands-available-while-rebasing) unnecessary commits so that your commit history is clean.

### <a name="commit-message-format"></a> Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Header

The Header contains a succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize first letter
-   no dot (.) at the end

### Body

If your change is simple, the Body is optional.

Just as in the Header, use the imperative, present tense: "change" not "changed" nor "changes".
The Body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer is the place to reference GitHub issues that this commit **Closes**.

You **must** use the [GitHub keywords](https://help.github.com/articles/closing-issues-via-commit-messages) for
automatically closing the issues referenced in your commit.

### Example

For example, here is a good commit message:

```
upgrade to Python 3.6.1

upgrade the project builds to use the new Python 3.6.1,
see https://www.python.org/download/releases/

Fix #1234
```

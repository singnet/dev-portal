# Execution

There are a few options in how you would like to run the TUI or CLI. This section aims to explain what they are, and where they may be useful.&#x20;



## Default

To start the TUI normally, you just need to execute the run script written for your operating system:

#### Linux

```
bash linux_run.sh
```

#### MacOS

```
bash macos_run.sh
```

#### Windows

```
.\windows_run.bat
```



## Update

The `update` flag is instructs the run script to update the virtual environment, if any changes were made to the `requirements.txt` file, and pip.&#x20;

You can run the TUI in update mode as follows:

#### Linux

```bash
bash linux_run.sh update
```

#### MacOS

```bash
bash macos_run.sh update
```

#### Windows

```powershell
.\windows_run.bat update
```

<mark style="color:red;">NOTE</mark>: You only need to run the update flag if you would like to update pip, or there have been changes to the requirements.txt file (if the version of the CLI, or other python dependancies, has been altered).&#x20;



## Developer Mode

The `dev` flag runs the TUI in developer mode. In this mode you can live-edit the CSS files for the TUI. In essence, any changes to the textual CSS file in the project, will be reflected in an instance of the TUI running in dev mode.

You can run the TUI in dev mode as follows:

#### Linux

```bash
bash linux_run.sh dev
```

#### MacOS

```bash
bash macos_run.sh dev
```

#### Windows

```powershell
.\windows_run.bat dev
```

You may want to utilize this mode if you would like to make changes to the TUI default appearance.&#x20;



## CLI-only mode

If you would like to run the CLI directly, without using the Custom Command menu or the TUI in general, you can do so by activating the virtual environment. This should give you direct access to the CLI through your terminal.&#x20;

#### UNIX

```bash
# Change directory to the root folder for the TUI
cd <TUI Dir>
# Activate virtual environemnt
source tui_venv/bin/activate
```

#### Windows

<pre class="language-powershell"><code class="lang-powershell"># Change directory to the root folder for the TUI
cd &#x3C;TUI Dir>
# Activate virtual environemnt
<strong>tui_venv\Scripts\activate
</strong></code></pre>



Once the environment is activated, you can call the CLI with the `snet` command:

```bash
snet <command>
```



To deactivate the environment, once you are done with your CLI session, run the following:

```bash
deactivate
# If the above does not work try:
source deactivate
```

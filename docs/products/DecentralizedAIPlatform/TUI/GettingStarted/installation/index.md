# Installation

All you need to do to install the TUI, is to execute the appropriate run script for your operating system.&#x20;

It will automatically install python, create a virtual environment, install the python dependencies, and start the TUI app.&#x20;

## Step 1: Download the TUI to your machine

Start by cloning the Github repo with the following command

<pre class="language-bash"><code class="lang-bash"><strong># Change directory to where you would like to store the TUI
</strong><strong>cd &#x3C;Folder Path>
</strong><strong># Clone the repo with the git command
</strong><strong>git clone https://github.com/vbrltech/sNET-TUI.git
</strong></code></pre>

## Step 2: Execute the appropriate run script

After cloning the repo, all you have to do is call the "run" script designed for your operating system.

### **Linux (Bash)**

```bash
# Navigate to the TUI folder through your bash shell
cd <TUI Repo Path>
# make the script executable
chmod +x linux_run.sh
# Call the run script
./linux_run.sh
```

### **MacOS (Zsh/Bash)**

```bash
# Navigate to the TUI folder through your zsh/bash shell
cd <TUI Repo Path>
# make the script executable
chmod +x macos_run.sh
# Call the run script
./macos_run.sh
```

<mark style="color:red;">NOTE</mark>: You may run into an issue where it states `Need sudo access on MacOS (eg. the user __ needs to be an Administrator)`. Just run the following commands to ensure the script is executable and has administrator privileges:&#x20;

```bash
sudo macos_run.sh
# Then enter your password once you are prompted for it
# It will state the command wasn't found. Now run the script again
./macos_run.sh
```

### **Windows (CMD)**

You can just double click the batch script in your file explorer if preferred, or:

```powershell
# Navigate to the TUI folder through your CMD shell
cd <TUI Repo Path>
# Call the run script
.\windows_run.bat
```

This will "start" the TUI installation, displaying it in a new terminal window. Please continue to the next section to continue your TUI install, and first-time setup.

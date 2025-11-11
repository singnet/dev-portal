# Publishing Methods Comparison

Choose the right tool for publishing your AI service. This guide compares the three available methods to help you make an informed decision.

## Quick Decision Guide

**New to the platform?** → Start with **Publisher Portal**  
**Automating deployments?** → Use **CLI**  
**Want full control with visual feedback?** → Try **TUI**

---

## Comparison Table

| Feature | Publisher Portal | CLI | TUI |
|---------|-----------------|-----|-----|
| **Interface** | Web browser | Command line | Terminal UI |
| **Best For** | Beginners, one-time setups | Automation, CI/CD | Interactive management |
| **Learning Curve** | Easy | Moderate | Moderate |
| **Setup Time** | ~30 min | ~15 min | ~20 min |
| **Prerequisites** | Web browser, wallet | Python, CLI tools | Python, terminal |
| **Visual Feedback** | ✅ Full GUI | ❌ Text only | ✅ Interactive TUI |
| **Step Validation** | ✅ Real-time | ❌ Manual | ✅ Interactive |
| **Scriptable** | ❌ No | ✅ Yes | ❌ No |
| **CI/CD Integration** | ❌ No | ✅ Yes | ❌ No |
| **Batch Operations** | ❌ Limited | ✅ Yes | ⚠️ Sequential |
| **Offline Usage** | ❌ No | ✅ Yes | ✅ Yes |
| **Documentation** | In-app tooltips | Man pages | Built-in help |

---

## Detailed Comparison

### 1. Publisher Portal 🌐

**Overview**: Web-based interface for visual, step-by-step service publishing.

#### Pros ✅

- **No command-line knowledge required**
- **Visual, guided workflow** with step-by-step wizards
- **Real-time validation** of inputs and configuration
- **In-app help** and tooltips throughout the process
- **Preview capabilities** before blockchain publication
- **Error recovery** with clear error messages
- **Wallet integration** built-in (MetaMask)
- **Best for learning** the platform concepts

#### Cons ❌

- **Not scriptable** - each action must be done manually
- **No automation** - can't integrate with CI/CD pipelines
- **Requires internet** - no offline capabilities
- **Single service workflow** - not efficient for multiple services
- **Browser-dependent** - requires modern web browser

#### Best Use Cases

- 🆕 First-time service publishers
- 🎓 Learning the platform workflow
- 🔧 One-time service setup
- 📱 Users without command-line access
- 🏢 Organizations preferring GUI tools

#### Getting Started

[→ Publisher Portal Guide](./onboarding-via-publisher/)

---

### 2. Command Line Interface (CLI) 💻

**Overview**: Terminal-based tool for programmatic service management and automation.

#### Pros ✅

- **Fully scriptable** - automate entire workflows
- **CI/CD integration** - perfect for automated deployments
- **Batch operations** - manage multiple services efficiently
- **Works offline** - no internet required except for blockchain transactions
- **Version controlled** - track changes in configuration files
- **Reproducible** - same commands produce same results
- **Fast for power users** - quickest method once learned
- **Remote access friendly** - works over SSH

#### Cons ❌

- **Steeper learning curve** - requires terminal proficiency
- **Less visual feedback** - text-only output
- **Manual validation** - need to verify inputs yourself
- **Error messages** can be technical
- **Documentation lookup** - need to remember or reference commands
- **No undo** - must carefully verify before executing

#### Best Use Cases

- 🤖 Automated deployments and updates
- 🔄 CI/CD pipeline integration
- 📦 Managing multiple services
- 🚀 Production deployments
- 👨‍💻 Experienced developers
- 🔁 Repetitive operations

#### Getting Started

[→ CLI Guide](./onboarding-via-cli/)

---

### 3. Terminal User Interface (TUI) 🖥️

**Overview**: Interactive terminal application combining command-line power with visual navigation.

#### Pros ✅

- **Interactive menus** - navigate visually within terminal
- **Real-time feedback** - see changes immediately
- **Form validation** - built-in input checking
- **Works remotely** - perfect for SSH sessions
- **Keyboard-driven** - mouse optional, efficient for power users
- **Context-aware help** - help available at each step
- **Better than CLI** for complex workflows
- **Better than GUI** for remote access

#### Cons ❌

- **Not scriptable** - interactive only
- **Still requires terminal** comfort
- **Limited CI/CD** integration options
- **Sequential workflow** - one task at a time
- **Display requirements** - needs proper terminal emulator
- **Learning curve** exists but milder than CLI

#### Best Use Cases

- 🔄 Interactive service management
- 🖥️ Remote server management via SSH
- ⚡ Power users wanting visual feedback
- 🔧 Complex configuration tasks
- 📊 Monitoring and troubleshooting
- 🎮 Users comfortable with terminals but wanting guidance

#### Getting Started

[→ TUI Guide](./onboarding-via-tui/)

---

## Workflow Comparison

### Organization Creation

| Task | Publisher Portal | CLI | TUI |
|------|-----------------|-----|-----|
| Enter organization details | Form wizard | Single command | Interactive menu |
| Add payment groups | Step-by-step | Configuration file | Form with validation |
| Add members | GUI interface | Commands | Menu-driven |
| Publish to blockchain | Button click | Command execution | Confirm dialog |

### Service Publication

| Task | Publisher Portal | CLI | TUI |
|------|-----------------|-----|-----|
| Upload proto files | Drag & drop | File path argument | File selector |
| Configure metadata | Visual forms | JSON/YAML config | Interactive forms |
| Set pricing | GUI calculator | Command options | Menu with preview |
| Configure daemon | Step-by-step | Config file | Form wizard |
| Publish service | Wizard completion | Single command | Confirm dialog |

### Updates & Maintenance

| Task | Publisher Portal | CLI | TUI |
|------|-----------------|-----|-----|
| Update metadata | Edit forms | Commands/config | Navigate & edit |
| Add endpoints | GUI interface | Add command | Menu option |
| Modify pricing | Calculator | Command | Interactive update |
| Manage channels | Dashboard | List/filter commands | Browse & manage |

---

## Decision Matrix

### Choose **Publisher Portal** if:

- ✅ You're new to blockchain and smart contracts
- ✅ You prefer visual, guided workflows
- ✅ You're setting up a single service
- ✅ You don't need automation
- ✅ You want to learn the platform concepts first

### Choose **CLI** if:

- ✅ You want to automate deployments
- ✅ You're integrating with CI/CD pipelines
- ✅ You manage multiple services
- ✅ You're comfortable with command-line tools
- ✅ You need reproducible, version-controlled setups
- ✅ You're working in production environments

### Choose **TUI** if:

- ✅ You work primarily in terminal environments
- ✅ You need remote access capabilities
- ✅ You want interactive guidance with terminal efficiency
- ✅ You're comfortable with keyboard navigation
- ✅ You prefer visual feedback but use terminals
- ✅ You're managing services via SSH

---

## Can I Switch Methods?

**Yes!** All three methods interact with the same blockchain smart contracts and IPFS metadata. You can:

- Set up with Publisher Portal, manage with CLI
- Create with CLI, update with TUI
- Mix and match based on task requirements

**Your choice of tool doesn't lock you in.**

---

## Learning Path Recommendation

### Recommended Progression

1. **Start**: Publisher Portal (learn concepts)
2. **Grow**: TUI (gain efficiency)
3. **Scale**: CLI (automate everything)

### Alternative for Experienced Developers

If you're already comfortable with blockchain and command-line tools:

1. **Start**: CLI documentation
2. **Fallback**: TUI for complex configuration
3. **Reference**: Publisher Portal for visual confirmation

---

## Summary

| Method | Learning | Speed | Control | Automation |
|--------|----------|-------|---------|------------|
| **Publisher Portal** | ⭐⭐⭐ Easy | ⭐⭐ Moderate | ⭐⭐ Medium | ⭐ None |
| **CLI** | ⭐⭐ Moderate | ⭐⭐⭐ Fast | ⭐⭐⭐ Full | ⭐⭐⭐ Full |
| **TUI** | ⭐⭐ Moderate | ⭐⭐⭐ Fast | ⭐⭐⭐ Full | ⭐ None |

---

## Next Steps

Ready to get started? Choose your method:

1. [→ Publisher Portal Guide](./onboarding-via-publisher/)
2. [→ CLI Guide](./onboarding-via-cli/)
3. [→ TUI Guide](./onboarding-via-tui/)

Or review the [Complete Onboarding Guide](./complete-onboarding-guide/) which covers all methods in detail.

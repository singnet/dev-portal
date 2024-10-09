# How do I select text, and copy/paste?

### Linux

You can select text by holding the following button combination:

<pre class="language-bash"><code class="lang-bash"><strong># Hold SHIFT button while you select text
</strong><strong>SHIFT
</strong></code></pre>

You should be able to copy paste as normal, with your system commands.&#x20;

```bash
# Linux default copy/paste
CTRL+(C/V)
```



### MacOS

You can select text by holding the following button combination:

<pre class="language-bash"><code class="lang-bash"><strong># Hold OPTION button and SHIFT button simultaneously while you select text
</strong><strong>⌥ + SHIFT
</strong></code></pre>

You should be able to copy paste as normal, with your system commands:

```bash
# MacOS default copy/paste 
⌘+(C/V)
```



### Windows

You can select text by holding the following button combination:

<pre class="language-bash"><code class="lang-bash"><strong># Hold SHIFT button while you select text
</strong><strong>SHIFT
</strong></code></pre>

You can copy text as normal, with your system commands:

```bash
# Windows default copy
CTRL+C
```

On Windows, you may run into a conflict with the modifier key when it comes to pasting. This is due to the fact that the TUI puts the terminal in application mode, and that Microsoft will do anything in their power not to add `SHIFT+INSERT`.

You can bypass this by changing your terminal settings, [as detailed here. ](https://superuser.com/questions/16313/keyboard-shortcut-to-paste-in-windows-command-prompt)

Or if your terminal has a toolbar, you can paste text through the following menu selection:

![Windows Menu Paste](/assets/images/products/AIMarketplace/TUI/TUIWindowsPaste.png)Windows Menu Paste

A complete and easy fix to the issue, however, is to install [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?ocid=webpdpshare), as detailed in [this part of the FAQ](./the-tui-looks-really-bad-on-my-screen-what-do-i-do.md)

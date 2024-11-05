# The TUI looks really bad on my screen! What do I do?

As the TUI runs in terminal, a lot of the visual aspects are decided by your terminal settings (text size, font, spacing, etc.). This can lead to wildly different results across devices and resolutions. Here are some common fixes across the different OS's

<mark style="color:red;">NOTE</mark>: If the fixes below do not work, it may be because your window is not wide enough to fully view the TUI. Everything should still work as intended, however, you may notice some buttons clipping off screen. You may even completely lose the `Exit` button if your window is too short, however, you can exit by utilizing your systems default kill process shortcut. There is also a circle button at the top left of the TUI, this opens the command pallete, which you can use to quit the application.&#x20;

### Linux

All Linux distros come with a terminal emulator that can run Textual apps. If the navigation bar is clipping off screen, we suggest reducing the font size, and line spacing, in your terminal settings.&#x20;

### MacOS

On MacOS, you can (mostly) fix this by:&#x20;

-   Opening settings -> profiles > Text tab
-   &#x20;Changing the font settings to produce reasonable results&#x20;
    -   Menlo Regular font
    -   Character spacing of 1
    -   Line spacing of 0.805
    -   If you want to use another font, you may have to tweak the line spacing until you get good results.

However, this still doesn't change the fact that the default MacOS terminal is limited to 256 colors. You can fix this by utilizing any of the terminal emulators listed below

-   [ITerm2](https://iterm2.com)
-   [Kitty](https://sw.kovidgoyal.net/kitty/)
-   [WezTerm](https://wezfurlong.org/wezterm/)

### Windows

For "missing glyphs" issues like the screenshot below, or any other strange visual bugs you may encounter, utilize the [Windows Terminal](https://github.com/microsoft/terminal?tab=readme-ov-file#microsoft-store-recommended) emulator.&#x20;

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/TUIWindowsVisualBug.webp" alt="Visual bug"/>

You can install it from the [Windows Store](https://aka.ms/terminal) directly, this is the recommended installation.

If you are utilizing a Windows Server machine, the windows store is not authorized. Therefore, you can use [this installer](https://github.com/JEFuller/install-windows-terminal/releases/tag/v1.0.0) to install the emulator to your server.&#x20;

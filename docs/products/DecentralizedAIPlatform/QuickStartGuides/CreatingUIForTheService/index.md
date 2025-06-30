# Developer Guide: Creating a UI for a Service Integration

## Introduction
This guide walks you through the process of integrating a remote service into an existing UI project. You will learn how to set up your environment, build the interface, connect it to the service, and handle responses efficiently.

## Getting Started

### When You First Visit
Upon opening the [**UI Sandbox Portal**](https://ai-ui-constructor.singularitynet.io/), you will be presented with an option to start a new UI project or load an existing one.

* **New Project** – Creates an empty UI structure to start from scratch.
* **Open Project** – Allows you to upload an existing project archive.
* **Open Templates** – Provides predefined UI templates that can be customized for different services.
* **Open Example** – Loads a working UI example that you can explore and modify.

## Workspace Overview
Once you start a project, the workspace consists of two main sections:

### Left Panel – Code Editor
The left panel contains the files needed to create and manage your UI.

#### File Structure
- **`index.js`** – Implements UI logic and handles service communication.
- **`style.css`** – Defines styles for UI components.
- **Service Communication File** – Facilitates interactions with the backend.

#### Code Display Settings
- Adjust font size and line spacing for better readability.

### Right Panel – UI Preview & Resources
The right panel contains:

- **Preview Tab** – Displays the compiled UI output.
- **Library Tab** – Lists available UI components with descriptions.
- **Templates Tab** – Provides pre-built UI elements.

## Steps to Integrate the Service

### 1. Setting Up the UI
Navigate to the **Library Tab** to browse and select the UI components you need, such as:
- Input fields for user data.
- Dropdown menus.
- Buttons for submitting actions.
- File&Image Uploaders
- and many more!

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/LibrarySection.webp" alt="Library section"/>

Alternatively, visit the **Templates Tab** to use a pre-built UI layout that suits your needs.

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/TemplatesSection.webp" alt="Templates section"/>

### 2. Capturing User Input
Ensure the UI collects and validates user input before sending requests:
- Use state variables to store input values.
- Implement validation to prevent incomplete or incorrect submissions.

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/CodeSection.webp" alt="Code section"/>

### 3. Compiling and Testing Your UI
Click **Compile** to test your UI:
- Enter required service details.
- Ensure the correct dependencies are available.
- Verify that the output appears correctly in the preview.

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/SuccessCompiled.webp" alt="Success compiled"/>

## Saving and Exporting
- Click **Export Project** or use **Ctrl+S** to download your UI as a .zip archive.
- Navigate to the **Publisher** to deploy your UI.

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/ExportProject.webp" alt="Export project button"/>

## Need Help?
If you encounter issues, use the **Feedback Form** to report problems or ask questions. Include necessary details like **OrganizationID**, **ServiceID**, **Endpoint**, and attachments if needed.

<ImageViewer src="/assets/images/products/Sandbox/interface-overview/FeedbackForm.webp" alt="Feedback Form"/>

Happy coding!

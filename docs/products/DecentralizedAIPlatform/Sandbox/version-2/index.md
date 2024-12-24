# UI Sandbox version 2

We are pleased to announce the release of UI Sandbox Version 2.

This new version introduces a range of improvements designed to make the platform more user-friendly and efficient. With an optimized interface and enhanced functionality, developers can now manage projects with greater ease and clarity.

Explore the new version here: [AI UI Constructor](https://ai-ui-constructor.singularitynet.io/).

## Updated DEMO UI Development Workflow
The process for creating DEMO UIs has been significantly streamlined. The Sandbox application has been decoupled from the SNET DAPP and restructured as a standalone web application equipped with additional development tools. The updated workflow is as follows:

1. Generate Stub Files
Use your .proto file to generate .js stub files. Follow the guide here: [Generating Stubs](../../SDK/JavascriptSDKs/generating-stubs/).

2. Access the Sandbox
Navigate to the [AI UI Constructor](https://ai-ui-constructor.singularitynet.io/).

3. Sign In or Register
Log in using your Cognito account. If you do not have an account, you can create one using the Sign Up form.

4. Create a New Project
Select New Project from the menu options to initiate a new workspace.

5. Upload Stub Files
Upload the generated stub files to your project.

6. Edit Project Files
Modify index.js and styles.js as needed. Additional files can also be uploaded or created within the project.

7. Compile the Code
Use the Compile button to build and test the application.

8. Provide Application Details
Populate the fields for OrganisationID, ServiceId, and Endpoint in the preview application section.

9. Debug and Iterate
Debug the application code and repeat the Compile process until the desired results are achieved.

10. Export the Project
Once the project is complete, download the files in a .zip format using the Export Project button.

11. Publish the DEMO
Deploy the completed DEMO application through the Publisher Portal.

## UI Sandbox Workflow Diagram
Below is a visual representation of the new Sandbox workflow:

<ImageViewer src="/assets/images/products/Sandbox/new.webp" alt="Workflow"/>
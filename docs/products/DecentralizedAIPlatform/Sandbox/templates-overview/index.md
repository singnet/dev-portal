# Templates overview
## Introduction
The `Templates` tab in the `UI Sandbox` provides you with a set of ready-to-use templates that streamline your development process by offering predefined structures for various types of input and output data.

<ImageViewer src="/assets/images/products/Sandbox/templates.webp" alt="Templates-tab"/>

These templates serve as a foundation for integrating services, allowing you to modify and extend them according to your needs.

## Overview of the Templates Tab
The **Templates** tab allows you to select preconfigured templates for different types of data processing. These templates include essential components and a basic structure that you can further customize.

### Search bar  
You can use the search bar to quickly find templates by filtering based on names and descriptions. Entering a keyword will display all templates that match your search query.

### Filtering by data type
You can filter templates based on their input and output data types. Available filter options:  
- **`Text`**  
- **`Image`**  
- **`Audio`**  
- **`File`**

You can select one or multiple `filters`, and the displayed `templates` will include at least one of the selected data types.

### Template selection process
From the list of templates, as shown in the picture above, you can select the option you need.

When you select a template, a confirmation dialog appears:
  > **Hands up!**  
  > Are you sure you want to open *[Template Name]* template? All current unsaved data will be lost.  
  >  
  > **PROCEED** | **CANCEL**

If you click **`PROCEED`**:
  - Your current project session will be terminated.
  - A new project will be created that contains only the essential files (`index.js` and `styles.js`).

If you click **`CANCEL`**:
  - The dialog will be closed.  

## List of available templates
Each template provides a structure for handling specific types of data.

<style>
    .columns-group {
        --input-column-width: 15%;
        --output-column-width: 15%;
        --description-column-width: 60%;
    }

    .columns-group col.input {
        width: var(--input-column-width);
    }

    .columns-group col.output {
        width: var(--output-column-width);
    }

    .columns-group col.description {
        width: var(--description-column-width);
    }

    tr {
        height: 3em;
        line-height: 1.5em;
        word-wrap: break-word;
        white-space: normal;
    }  
</style>

### Text processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Text</td>
            <td>Text</td>
            <td>Processes text input and returns a text result, such as for analysis or transformation.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>Image</td>
            <td>Accepts text and generates an image, such as a visualization or artwork. The data is transmitted in base64 format.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>Audio</td>
            <td>Converts text into audio, such as text-to-speech synthesis. The data is transmitted in base64 format.</td>
        </tr>
        <tr>
            <td>Text</td>
            <td>File</td>
            <td>Generates a file based on text input, such as a document or dataset. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### Image processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Image</td>
            <td>Text</td>
            <td>Processes an image and outputs text, such as descriptions or metadata.</td>
        </tr>
        <tr>
            <td>Image</td>
            <td>Image</td>
            <td>Accepts an image and returns another image, such as an edited or transformed version. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### Audio processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Audio</td>
            <td>Text</td>
            <td>Processes an audio input and returns text, such as a transcription of speech.</td>
        </tr>
        <tr>
            <td>Audio</td>
            <td>Audio</td>
            <td>Accepts an audio file and returns another audio file, for example, with applied effects or transformations. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

### File processing templates
<table>
    <colgroup class="columns-group">
        <col class="input">
        <col class="output">
        <col class="description">
    </colgroup>
    <thead>
        <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>File</td>
            <td>Text</td>
            <td>Analyzes a file and returns extracted text content or metadata.</td>
        </tr>
        <tr>
            <td>File</td>
            <td>File</td>
            <td>Accepts a file and returns another file, such as after processing or conversion. The data is transmitted in base64 format.</td>
        </tr>
    </tbody>
</table>

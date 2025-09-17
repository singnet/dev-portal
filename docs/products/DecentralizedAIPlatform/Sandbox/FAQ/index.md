# UI Sandbox - Frequently Asked Questions

This comprehensive FAQ addresses common questions about building, testing, and publishing UI components for the SingularityNET Marketplace using the UI Sandbox.

## General Questions

<AccordionItem :id="what-is-ui-sandbox">
  <template #title>
    What is UI Sandbox and why should I use it?
  </template>
  <template #description>
  
    UI Sandbox is a powerful development environment specifically designed for creating custom user interfaces for AI services on the SingularityNET platform. 
    
    Key benefits include:
    - No local setup required: Develop directly in your browser
    - Real-time preview: See changes instantly as you code
    - Component library: Access pre-built UI components
    - Easy deployment: Export and publish directly to the marketplace
    - Collaboration: Share projects with team members
    
    The sandbox eliminates the complexity of setting up a local development environment while providing all the tools needed to create professional service interfaces.
  </template>
</AccordionItem>

<AccordionItem :id="version-differences">
  <template #title>
    What's the difference between Version 1 and Version 2?
  </template>
  <template #description>
  
    Version 1 (Legacy):
    - Integrated within the SNET DAPP
    - Basic editing capabilities
    - Manual configuration required
    - Limited debugging tools
    
    Version 2 (Current - Recommended):
    - Standalone web application at ai-ui-constructor.singularitynet.io
    - Enhanced development tools and debugging
    - Improved component library
    - Streamlined workflow with fewer manual steps
    - Better performance and reliability
    - Advanced features like module creation and sharing
    
    We strongly recommend using Version 2 for all new projects.
  </template>
</AccordionItem>

## Development Questions

<AccordionItem :id="external-libraries">
  <template #title>
    How can I use external JavaScript libraries in my UI?
  </template>
  <template #description>
  
    Due to platform security and performance requirements, you cannot directly install npm packages. However, there are several effective workarounds:
    
    Option 1: CDN Embedding (Recommended)
    ```javascript
    // 1. Download the minified version from cdnjs.com
    // 2. Include it in your UI archive as lib.min.js
    // 3. Import in your index.js:
    import './lib.min.js';
    
    // Now use the library globally
    const result = LibraryName.someFunction();
    ```
    
    Option 2: Manual Integration
    ```javascript
    // Copy the library code directly into a file
    // utils/library.js
    export function libraryFunction() {
      // Library code here
    }
    
    // Import and use
    import { libraryFunction } from './utils/library.js';
    ```
    
    Option 3: Backend Processing
    For complex operations or heavy libraries:
    ```javascript
    // Call your backend service
    const response = await fetch('https://your-api.com/process', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    ```
    
    This approach keeps the UI lightweight while leveraging powerful backend processing.
  </template>
</AccordionItem>

<AccordionItem :id="component-library">
  <template #title>
    What components are available in the built-in library?
  </template>
  <template #description>
  
    The UI Sandbox provides a comprehensive component library including:
    
    Form Components:
    - Text inputs and textareas
    - Dropdowns and select lists
    - Checkboxes and radio buttons
    - File upload components
    - Date and time pickers
    
    Display Components:
    - Cards and panels
    - Tables and data grids
    - Charts and graphs
    - Image and video displays
    - Loading indicators
    
    Layout Components:
    - Grid systems
    - Flexbox containers
    - Tabs and accordions
    - Modal dialogs
    - Navigation menus
    
    Utility Components:
    - Alerts and notifications
    - Tooltips and popovers
    - Progress bars
    - Badges and labels
    
    All components are styled to match the SingularityNET design system and are fully responsive.
  </template>
</AccordionItem>

<AccordionItem :id="api-integration">
  <template #title>
    How do I connect my UI to the AI service backend?
  </template>
  <template #description>
  
    The UI Sandbox provides built-in methods for service communication:
    
    Basic Service Call:
    ```javascript
    // The service object is automatically injected
    async function callService(inputData) {
      try {
        // Prepare the request
        const request = {
          method: 'processData',
          params: inputData
        };
        
        // Call the service
        const response = await service.call(request);
        
        // Handle the response
        displayResults(response.data);
      } catch (error) {
        console.error('Service call failed:', error);
        showError(error.message);
      }
    }
    ```
    
    Handling Different Response Types:
    ```javascript
    // Text response
    if (response.type === 'text') {
      document.getElementById('output').textContent = response.data;
    }
    
    // Image response
    if (response.type === 'image') {
      const img = document.createElement('img');
      img.src = `data:image/png;base64,${response.data}`;
      document.getElementById('output').appendChild(img);
    }
    
    // JSON response
    if (response.type === 'json') {
      renderJsonData(response.data);
    }
    ```
    
    The sandbox handles authentication, payment channels, and error handling automatically.
  </template>
</AccordionItem>

## Testing & Debugging

<AccordionItem :id="local-testing">
  <template #title>
    How can I test my UI locally before publishing?
  </template>
  <template #description>
  
    The UI Sandbox provides several testing options:
    
    1. Preview Mode:
    - Click the "Preview" button in the sandbox
    - Test with mock data
    - Verify responsive design
    - Check error handling
    
    2. Test with Real Service:
    ```javascript
    // Enable test mode in your code
    const TEST_MODE = true;
    
    if (TEST_MODE) {
      // Use test endpoint
      service.endpoint = 'https://test.your-service.com';
      // Use test data
      const testInput = { sample: 'data' };
      testServiceCall(testInput);
    }
    ```
    
    3. Export and Local Testing:
    - Export your UI package
    - Run locally with a simple HTTP server:
    ```bash
    # Using Python
    python -m http.server 8000
    
    # Using Node.js
    npx http-server
    ```
    
    4. Console Debugging:
    - Use browser developer tools
    - Add console.log statements
    - Monitor network requests
    - Check for JavaScript errors
  </template>
</AccordionItem>

<AccordionItem :id="common-errors">
  <template #title>
    What are common errors and how do I fix them?
  </template>
  <template #description>
  
    Error: "Service not responding"
    - Check if your service daemon is running
    - Verify the endpoint URL is correct
    - Ensure payment channel has sufficient funds
    
    Error: "Invalid input format"
    ```javascript
    // Validate input before sending
    function validateInput(data) {
      if (!data || typeof data !== 'object') {
        throw new Error('Input must be an object');
      }
      // Add specific validations
      if (!data.requiredField) {
        throw new Error('Required field missing');
      }
      return true;
    }
    ```
    
    Error: "UI not loading"
    - Check for syntax errors in JavaScript
    - Verify all imports are correct
    - Ensure index.html is properly structured
    - Check browser console for specific errors
    
    Error: "Component not rendering"
    ```javascript
    // Ensure DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize your components here
      initializeUI();
    });
    ```
    
    Performance Issues:
    - Optimize large data handling
    - Use pagination for lists
    - Lazy load heavy resources
    - Minimize DOM manipulations
  </template>
</AccordionItem>

## Publishing & Deployment

<AccordionItem :id="publishing-process">
  <template #title>
    How do I publish my UI to the marketplace?
  </template>
  <template #description>
  
    Follow these steps to publish your UI:
    
    Step 1: Prepare Your Package
    - Ensure all files are in the correct structure:
    ```
    ui-package/
    ├── index.html       # Main HTML file
    ├── index.js         # Main JavaScript
    ├── styles.css       # Styling
    └── assets/          # Images, fonts, etc.
    ```
    
    Step 2: Test Thoroughly
    - Run all test cases
    - Verify responsive design
    - Check error handling
    - Test with different input types
    
    Step 3: Export from Sandbox
    - Click "Export" in the UI Sandbox
    - Download the .zip package
    - Review the exported files
    
    Step 4: Upload to Publisher Portal
    1. Log into [Publisher Portal](https://publisher.singularitynet.io)
    2. Navigate to your service
    3. Go to "UI Components" section
    4. Upload your .zip package
    5. Add version notes and description
    
    Step 5: Submit for Review
    - Submit your UI for review
    - Address any feedback
    - Once approved, it will be live on the marketplace
    
    The entire process typically takes 24-48 hours after submission.
  </template>
</AccordionItem>

<AccordionItem :id="updating-ui">
  <template #title>
    How do I update an existing UI?
  </template>
  <template #description>
  
    Updating your UI follows a versioning system:
    
    1. Make Your Changes:
    - Import existing UI into sandbox
    - Make necessary modifications
    - Test all changes thoroughly
    
    2. Version Management:
    ```javascript
    // Add version info to your UI
    const UI_VERSION = '2.0.0';
    const CHANGELOG = {
      '2.0.0': 'Added new visualization features',
      '1.1.0': 'Fixed input validation',
      '1.0.0': 'Initial release'
    };
    ```
    
    3. Backward Compatibility:
    - Ensure new versions work with existing service versions
    - Handle deprecated features gracefully:
    ```javascript
    // Support old and new API formats
    function handleResponse(response) {
      // New format
      if (response.version >= 2) {
        return response.data;
      }
      // Legacy format
      return response.result || response;
    }
    ```
    
    4. Deploy Update:
    - Upload new version through Publisher Portal
    - Previous version remains available
    - Users automatically get the latest version
    - Option to rollback if issues arise
  </template>
</AccordionItem>

## Advanced Topics

<AccordionItem :id="custom-modules">
  <template #title>
    How do I create reusable modules?
  </template>
  <template #description>
  
    Creating reusable modules helps maintain consistency across multiple services:
    
    1. Create a Module:
    ```javascript
    // modules/dataVisualizer.js
    export class DataVisualizer {
      constructor(container) {
        this.container = container;
      }
      
      renderChart(data, type = 'bar') {
        // Chart rendering logic
      }
      
      renderTable(data, options = {}) {
        // Table rendering logic
      }
    }
    ```
    
    2. Export as Package:
    ```javascript
    // modules/index.js
    export { DataVisualizer } from './dataVisualizer.js';
    export { FormValidator } from './formValidator.js';
    export { ApiClient } from './apiClient.js';
    ```
    
    3. Use in Multiple UIs:
    ```javascript
    import { DataVisualizer } from './modules/index.js';
    
    const viz = new DataVisualizer('output-container');
    viz.renderChart(serviceResponse.data);
    ```
    
    4. Share with Community:
    - Package your modules
    - Document usage and API
    - Share through GitHub or npm
    - Contribute to the UI Sandbox library
  </template>
</AccordionItem>

<AccordionItem :id="performance-optimization">
  <template #title>
    How can I optimize my UI performance?
  </template>
  <template #description>
  
    Follow these best practices for optimal performance:
    
    1. Minimize Bundle Size:
    ```javascript
    // Load resources on demand
    async function loadHeavyLibrary() {
      if (!window.HeavyLib) {
        await import('./heavy-lib.js');
      }
      return window.HeavyLib;
    }
    ```
    
    2. Optimize Rendering:
    ```javascript
    // Use document fragments for bulk updates
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
      const element = createItemElement(item);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
    ```
    
    3. Implement Virtual Scrolling:
    ```javascript
    // For large lists
    class VirtualList {
      renderVisible(items, scrollTop, containerHeight) {
        const visibleItems = this.getVisibleItems(
          items, 
          scrollTop, 
          containerHeight
        );
        this.render(visibleItems);
      }
    }
    ```
    
    4. Cache Service Responses:
    ```javascript
    const cache = new Map();
    
    async function getCachedData(key) {
      if (cache.has(key)) {
        return cache.get(key);
      }
      const data = await service.call(key);
      cache.set(key, data);
      return data;
    }
    ```
    
    5. Use Web Workers for Heavy Processing:
    ```javascript
    // Process data in background
    const worker = new Worker('processor.js');
    worker.postMessage({ cmd: 'process', data: largeDataset });
    worker.onmessage = (e) => {
      displayResults(e.data);
    };
    ```
  </template>
</AccordionItem>

## Support & Resources

Where can I get help if I'm stuck?
  
Multiple support channels are available:

### Documentation:
- [UI Sandbox Guide](/docs/products/DecentralizedAIPlatform/Sandbox/)
- [Developer Tutorials](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboarding/)
- [API Reference](/docs/products/DecentralizedAIPlatform/SDK/sdk-concept/)

---

### Community Support:
- [Discord Channel](https://discord.gg/snet) - Real-time help
- [Community Forum](https://community.singularitynet.io) - Detailed discussions
- [GitHub Discussions](https://github.com/singnet/snet-dapp/discussions) - Technical questions

---

### Direct Support:
- Email: support@singularitynet.io
- Response time: Usually within 24-48 hours

---

### Video Tutorials:
- [Getting Started with UI Sandbox](https://youtube.com/...)
- [Building Your First Service UI](https://youtube.com/...)
- [Advanced UI Techniques](https://youtube.com/...)

---

### When asking for help, provide:
- Clear description of the issue
- Steps to reproduce
- Error messages or screenshots
- Relevant code snippets
- Browser and OS information

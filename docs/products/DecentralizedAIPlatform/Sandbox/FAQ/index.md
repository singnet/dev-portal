# UI Sandbox — Frequently Asked Questions

This FAQ answers common questions about how to build and publish UI components for the SingularityNET Marketplace using the UI Sandbox.

<AccordionItem :id="external-libraries">
  <template #title>
    Why can't I directly use external libraries in my UI?
  </template>
  <template #description>
  
    Currently, it's not possible to directly import external libraries (e.g., via npm install) into the UI on the SingularityNET Marketplace. This limitation helps ensure performance and stability of the platform.

    However, there are two recommended workarounds:

    1) Embed the library manually via CDN 
    You can download the .min.js version of the library from a CDN like cdnjs.com, include it in your UI archive, and import it as a local file:

    // index.js  
    import './lib.js';

    2) Use your own backend for processing 
    For heavier libraries or dynamic visualizations, consider offloading logic to your own server. For example, generate a chart server-side and return it as an image to your UI.

    This keeps the Marketplace UI lightweight while still enabling advanced functionality.
  </template>
</AccordionItem>

# API Registry

Extract service api (model) to the given protodir. Get metadata from registry

<figure><img src="../../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-17 at 6.05.57 PM.png" alt=""><figcaption><p>Get Service API Registry page</p></figcaption></figure>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet service get-api-registry [-h] [--registry-at REGISTRY_AT]
                              ORG_ID SERVICE_ID PROTO_DIR
</code></pre>

User Flow:

* Input the proto directory, service id and org id for the service
* Input any optional parameters you would like
* Click the "Get API Registry" button

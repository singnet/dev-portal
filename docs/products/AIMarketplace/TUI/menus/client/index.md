# Client

<figure><img src="../../../../../public/assets/images/products/TUI/Screenshot 2024-08-17 at 6.15.31 PM.png" alt=""><figcaption><p>Client page</p></figcaption></figure>

**Overview**

The "Client" page is utilized for making calls to services on the marketplace. It provides functionalities for calling regular methods, or service low-level calls. It also allows the users to interact/modify the unidirectional payment channels utilized for service method calls.&#x20;

**Detailed Structure and Features**

* **Main Organization Display**
  * **Organization Information**
    * The main display of the Client page presents the user with a list of all their initialized channels. Showcasing each channels organization id, service id, group name, channel id, nonce, amount of AGIX tokens, and the expiration time for each channel
* **Sub-page buttons**
  * **Call page:** Call server. We ask state of the channel from the server if needed. Channel should be already initialized.
  * **Call low level page:** Low level function for calling the server. Service should be already initialized.
  * **Get channel state page:** Get channel state in stateless manner
  * **Channels menu:** Menu for interacting with/modifying unidirectional payment channels

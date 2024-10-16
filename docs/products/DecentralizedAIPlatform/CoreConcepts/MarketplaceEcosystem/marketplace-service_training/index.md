## Why support for Training on platform ? 
Currently all calls on the market place dapp are Inference call
SingularityNET is solving this difficulty for AI systems on the Platform and Marketplace by allowing developers to offer multiple training models of their algorithm. The end-user can pick whether it wants to use the model trained on chest x-rays or the one trained on dental x-rays. The end-user can even provide their own training data to create a unique training model specifically suited to their exact data. This multi-model opportunity will allow developers to offer flexible, trainable, and customizable AI’s through our decentralized Marketplace, to better serve AI consumers - and enable access to high-quality AI services for all. This Platform upgrade is well underway, with functionality added to the Platform daemon already. The next step will be to upgrade the SDK, Marketplace front-end, publisher, and other systems to support multi-model AIs and model training calls.
**Please note**:The Model Is stored at the AI developers end
Daemon / platform only controls metadata of the  model Id and who has access to these models and the status of these models 

## MetaData of Model -  CREATE/UPDATE/DELETE/GETDETAILS
AI consumer can call any of the below from marketplace dapp/ platform componetns like SDKs/snet-cli 

Please note that calls made for any change on metadata of the model is free.
Platform gives you a tools to ONLY to update the metadata associated with the model 
metadata of a model 

## Create model Service
 Request to create a model, please note as part of MVP1, there will not be any workflows associated with model request approval

 Here all the complexity of creating a training is abstracted from the users. It become easy for the user to create and edit their trainings. 
 If the training is available inside the model then the Models tab will appear.
 ![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_models.png)

 The first step in requesting a custom model is to create a project. The REQUEST A NEW MODEL button will help the users to create the model. The models you create in this project inherit the name of the project. Once the REQUEST A NEW MODEL button is clicked it will open a new window where the user can enter the details.
 AI consumers , will pass the below details 

- list of addresses that can access this model ( applicable if model is not public) 

- if model is public 

- Description of the model

In return the AI conusmer will get back a model ID

![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_newmodelrequest.png)

The available training models are displayed under the training method drop down box.

![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_newmodelrequest_trainingmethods.png)

# Training a model 
Once the model is created , AI consumer can invoke training methods , of course the expectation here is to pass the model Id as part of the request 

training methods are identified by special method annotations ,  just like any other method calls training calls  will be chargable , please not how the trainig  input is passed is very specific to the method being trained !!!

For example it can be a link to a public folder of images / music / or a plain input of many texts 

- Please note this is entirely in control of the AI developer and expose services on how to receive data to train models 

- The onus of Storing the actual Model and training it is the responsibility of the AI developer

- AI developer can mark  training methods ( a method is marked as a trainign method through method level options from GRPC) , this way the AI developer has full control on the request message to the trainign methods .

AI consumer will pay for training a methods, AI developer needs to define these methods as part of the service proto !!

# UpdateModelAccess
AI consumer can add/remove addresses associated with a given model , can also make this public from private and viceversa.

# Existing model Service
**Important**: Metamask is a plugin which is used by the SingularityNET platform. This plugin allows the user to connect with the existing models. 


![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_existingmodel.png)

Under the existing model, it will provide the details regarding the models created with model name, model Id, model description, status, access and the last update details.

# Edit model Service
The Edit button provide a new scope to change the details in the existing models.

![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_models_edit.png)

# Delete model Service
AI consumer had created and can request that the model be deleted.
The delete button provide a service to delete the models.

![marketplace](/assets/images/products/AIMarketplace/core-concepts/marketplace_training_models_delete.png)

# GetModelStatus
Pass the model Id and get back the training status of this model 

# GetAllAccessibleModels
An AI consumer can always call back this method to determine the list of models associated to a given address , this can be used while making inference calls , the AI consumer can pick the model of their choice if multiple models are available 

# Complete process video

<Video src="/assets/images/products/AIMarketplace/core-concepts/marketplace_training_models_samplevideo.mp4"/>
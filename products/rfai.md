---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Request for AI (RFAI)
description: Learn how to use the Request for AI portal, and how it works.

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: MPE Stateless Client
        url: '/docs/concepts/mpe-stateless-client'
    next:
        content: Back to Concepts
        url: '/docs/concepts/'

---

The [Request for AI Portal](https://rfai.singularitynet.io/) allows users make request for AI services that they would like to see them built and deployed onto the SingularityNET Network. 

Users can back requests with AGI tokens as a reward for having a service developed. 

The AGI tokens are transferred to the developer who submits a valid solution for the request. 

The RFAI portal fosters the community by enabling users to promote developers to publish services.


## Making a request for an AI service

* Any AI service request must associate with corresponding AGI tokens.
* Furnish sufficient details for discussion and development and invoked in the form of a github pull requests to [this](https://github.com/singnet/rfai-proposal) repo. You can view the template for the request [here](https://github.com/singnet/rfai-proposal/blob/master/rfai-proposal-template.md)
* Specify the expiry date for the request. Make a post dated date, so if no submission is made, you can withdraw your funds.
* A request created will need to be approved by the foundation before it shows up for everybody.

## Backing an AI Service
* To request for an AI service, you need to associate with corresponding AGI tokens
* Transfer the tokens to the RFAI escrow from the "User profile Account's" menu. 
This is a two step process
    * Approve the number of tokens to deposit
    * Deposit the tokens

**Note**: You can request for an AI service or back any approved request


## Request Approval

* The foundation reviews all request and approves them. In general look for:
    * Clear problem description
    * Resolved relevant problem can help the community
    * criteria for Quantitative evaluation  
* After approval, the approved requests are visible in the portal


## Solution Submission

* Submissions are evaluated by the SingularityNet foundation to ensure that the acceptance criteria as specified in the request is met and the problem is solved for.
* Include the github repo of your code during submission. 
* Submitter must publish the service, using the same address used while submitting the solution.

The submission is evaluated as follows
* The specified acceptance criteria in the request must be met.
    * Any performance metrics specified against provided test datasets should be met.
    * Submission should be a service deployed on the SingularityNet platform.


## Voting for a Solution

  * Foundation can vote to shortlist the submissions
  * Users backing the service request can vote for any submission (not just the shortlisted ones)
  * Validation of the solution are performed offline.

## Claiming tokens for a submission

  * Can avail claims after the evaluation period and before the expiry date,  
  * Solution submitter can claim before the expiry of the request
  * Claims are calculated based on the votes from backing users.
      * In case there are no votes from any backing user, foundation votes are considered
  * Backing users or foundation members, can avail claims based on the number of votes. 

## Reclaiming Tokens
  * AGI tokens (used to back a service request ) can be reclaimed by the backer, after the service request has expired

## Closing a Request

  * Foundation can authorize closure of a request after the request approved.
  * Request owner can close the request before its approval from the foundation.
  * AGI tokens can be claimed back by the backers.
  * Request status will change to closed

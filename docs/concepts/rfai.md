---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Request for AI
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

The Request for AI Portal (RFAI) lets users make requests for AI services that they would like to see built and deployed onto the SingularityNET Network. Users can back requests with AGI tokens as a reward for having a service developed. The AGI tokens are transferred to the developer who submits a valid solution for the request. 
The RFAI portal fosters the community by enabling users to incentivize developers to publish services.


## Making a request for an AI service

* Any request for an AI service should be backed by AGI tokens.
* Requests should be detailed enough to allow discussion and development and should be in the form of a github pull requests to [this](https://github.com/singnet/rfai-proposal) repo. You can view the template for the request [here](https://github.com/singnet/rfai-proposal/blob/master/rfai-proposal-template.md)
* Provide an expiry date for the request. Meaning the date post which you can withdraw your funds if no submission has been made
* A request created will need to be approved by the foundation before it shows up for everybody

## Backing an AI Service
* In order to request for an AI service, you need to back it with AGI tokens
* You need to transfer tokens to the RFAI escrow from the user profile Account's menu. This is a two step process
    * Approve the number of tokens to deposit
    * Deposit the tokens
* You are now set to make a request for an AI service or back any approved request


## Request Approval

* The foundation will review all requests and will approve them. In general we look for
    * Clear problem description
    * Relevant problem which if solved will help the community
    * Quantitative evaluation criteria 
* Once approved the request is visible for all on the portal


## Solution Submission

* All submissions are evaluated by the SingularityNet foundation to ensure that the acceptance criteria as specified in the request is met and the problem is solved for.
* The submission should include the github repo of your code
* The submitter should be using the same address used to publish the service while submitting the solution.
* The submission is evaluated as follows
* The specified acceptance criteria in the request must be met
    * Any performance metrics specified against provided test datasets should be met
    * Submission should be a service deployed on the SingularityNet platform


## Voting for a Solution

  * Foundation will vote to shortlist the submissions
  * Users backing the service request can vote for any submission (not just the shortlisted ones)
  * Only the users who are backing a service request can vote for a submission
  * Validation of the solution will be performed offline.

## Claiming tokens for a submission

  * Claims can be made only after the evaluation period and before the expiry date
  * Solution submitter can claim any time before expiry of the request
  * Claims will be calculated based on the votes from backing users
      * In case there are no votes from any backing user, foundation votes are considered
  * Claims will be distributed based on the number of votes either by backing users or by foundation members

## Reclaiming Tokens
  * AGI tokens used to back a service request can be reclaimed by the backer after the service request has expired

## Closing a Request

  * Only the foundation can close a request after it has been approved.
  * Request owner can close the request before its approval from the foundation.
  * AGI tokens can be claimed back by the backers.
  * Request status will change to closed

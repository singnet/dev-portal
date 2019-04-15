---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Request for AI
description: Learn how to use the Request for AI portal, and how does it work.

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

The Request for AI portal is a platform that allows any member of the community to make requests for AI services to be published on the SingularityNET Registry.
These requests are backed by AGI tokens, which are transferred to the developer who submits a valid solution for the request.

## Request for AI Service

* Anyone should be able to request for a service in the Web Portal;
* Requester can back on the Service Request;
* Service Request details will be available in IPFS and the hash will be in BlockChain Contract;
* There is an expiry for the Service Request;
* When a new requested is created it will be in a Open State until foundation is Approved;
* Requester can extend the request only when it is not approved means in Open state.

## Request Approval

* Request will be approved by any member from Foundation which is managed in the Contract;
* Once approved request state changes to approved and available to accept the submissions;
* During approval foundation needs to provide following details:
  * Submission duration in blocknumbers;
  * Evaluation duration in blocknumbers;
  * Expiration duration in case of any change from the expiration provide by the requester.

## Back the Request

* Anyone can back into the request when the request is approved by the foundation;
* Backing will be accepted for a non expired request until evaluation completed;
* Even foundation members can also back into the request.

## Proposal or Solution Submission

* Anyone can submit the solution for a given request which is ready to accept the submissions;
* Solution are accepted only during the submission phase as provide by the foundation.

## Voting a Solution

* Foundation will vote to shortlist the submissions;
* Backers can vote to any submission not only to shortlisted ones;
* Right now only backers in the respective request can vote for the submission;
* Validation of the solution will be performed offline. Solution will be available as part of Marketplace.

## Claims

* Claims can be done only after the evaluation;
* Solution submitter can claim any time before expiry of the request;
* Claims will be calculated based on the votes from backers;
* In case if there is no votes from backers, foundation votes are considered;
* Claims will be distributed based on the number of votes either by backers or by foundation members;
* Foundation member pledged amount will be distributed as per the respective member shortlisting.

## Reclaim Pledge

* Backers can reclaim the pledged amount only when the request is expired;
* No solution submitter can claim when the request is expired.

## Close Request

* Only foundation can forcible close the request even after the approval;
* Pledges will be given back to the respective backers of the request;
* Request status will changed to Closed.

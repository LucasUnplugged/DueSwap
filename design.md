# DueSwap

## Architecture

<App as main>
  <Header as header>
    {
      abc
    }
    - ABC


----

## Instructions

Read up about [Uniswap](https://medium.com/scalar-capital/uniswap-a-unique-exchange-f4ef44f807bf) and create a web application to emulate Uniswap by querying pool information using [The Graph’s Uniswap subgraph](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2). Feel free to use the [Uniswap front-end](https://app.uniswap.org/#/swap) as a guide for the layout and required components, but don’t try to replicate it in full.


Don’t worry if you don’t complete it, we understand the framework is new to you. We’re mostly interested in how you approach a new challenge, your reasoning, how you balance the requirements with the time constraint, and how you design a solution. Feel free to make any necessary assumptions to complete the exercise, just explain them. Send to us whatever you have before the meeting and we can discuss your work during the tech interview.


The app should have the following components:
- Input token - select which asset should be sold
- Output token - select which asset should be bought
- Consider the case where the user selects the same asset for both input and output
- Input amount field - amount of token to sell
- Output amount field - calculate the amount of the token that will be bought
- Pool Volume - display the USD pool (pair) volume for the last 24 hours
# DueSwap

- Use query params for setting the input and output tokens
- Use Blitz's login/sign-up pages, instead of a wallet
  - On signup/login, redirect to the swap page, with query params intact

---

## Architecture

```
_app
  <Grid as main>
    <Header as header>
      Wordmark
      Swap
      Pool
      Login
      Toggle
  `/swap?in=${inToken}&out=${outToken}`
    <Box as article>
      <Stack as section>
        "Swap"
        <Token>
        <Info>
        <Button>
          "Login to swap"
          "Swap"
  `/login`
  `/signup`

<App as main>
  <Header as header>
    {
      abc
    }
    - ABC
```

---

## Models

---

## Instructions

Read up about [Uniswap](https://medium.com/scalar-capital/uniswap-a-unique-exchange-f4ef44f807bf) and create a web application to emulate Uniswap by querying pool information using [The Graph’s Uniswap subgraph](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2). Feel free to use the [Uniswap front-end](https://app.uniswap.org/#/swap) as a guide for the layout and required components, but don’t try to replicate it in full.

> - Don’t worry if you don’t complete it, we understand the framework is new to you.
> - We’re mostly interested in how you approach a new challenge, your reasoning, how you balance the requirements with the time constraint, and how you design a solution.
> - Feel free to make any necessary assumptions to complete the exercise, just explain them.
> - Send to us whatever you have before the meeting and we can discuss your work during the tech interview.

---

## Requirements

The app should have the following components:

- Input token - select which asset should be sold
- Output token - select which asset should be bought
- Consider the case where the user selects the same asset for both input and output
- Input amount field - amount of token to sell
- Output amount field - calculate the amount of the token that will be bought
- Pool Volume - display the USD pool (pair) volume for the last 24 hours

---

## Features

- Features
  - Max price.
  - Expiring orders.
  - ERC-20 to ERC-20 swaps are also possible without requiring a separate liquidity pool.
    - An order for REP <> ZRX, for example, would route through the REP/ETH pair, and then automatically through the ZRX/ETH pair.
  - Liquidity providers must supply an equal amount of both sides of a trading pair.
    - Uniswap interface helps ensure no mistakes are made.
    - Once you add a relatively equal amount of both, the contract mints and sends the market maker “liquidity tokens”, which entitle them to X% of the liquidity available in the pool.
  - Reflects changes in the Coinbase pair price (after some arbitrage).
  - 0.3% of all trade volume is distributed proportionally to all liquidity providers.
  - No listing fees.
  - Very low gas (minting?) cost.

---

# Notes & Assumptions

- There is an non-fatal error on the Swap page, that states "Can't perform a React state update on a component that hasn't mounted yet". This appears to be a known issue on the version of I'm using, and I don't have time to dig much deeper than that at the moment.
- Used login instead of wallet connection, mainly because it comes with Blitz.js, and I didn't want to worry about figuring out wallets.
- Haven't implemented much in terms of error handling and notifications.

---

# Possible Improvements

- Generated `gql` queries based on Type passed in for the data, plus search params
- Saving user's most recent choices to local storage, then to DB, once they login

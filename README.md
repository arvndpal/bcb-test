## Description

BCB test

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Http Endpoints

#### 1. Get all transactions

http://localhost:3000/all

method: GET

#### 2. Get status of each transaction by transaction id

http://localhost:3000/0xc817643232e94aec05b910aaa536dc5718299a089d6ec517a2706715b8f148a81

#### 3. get history of each transaction by transaction id

http://localhost:3000/history/0x6b47a98e8c0a930596bd4abece164c47f32db28f1b84ea1f169be9d3820e0cba

method: GET

#### 4. Get status of all transactions in one call

http://localhost:3000/status/all

method: GET

#### 5. Create a new transaction

http://localhost:3000/create

method: POST

body:

```{
    "TransactionId": "0xc817643232e94aec05b910aaa536dc5718299a089d6ec517a2706715b8f148a81",
    "FromAddress": "0xEf6aE5F5108d210CB45fc8d50c07689374B3b2b2",
    "ToAddress": "0xaB51d4a8DA4d981dfca0Bf64aEE96054B0D7C23e",
    "TokenName": "USDC",
    "Amount": "100010000.11",
    "Status": "Initiated"
}
```

#### 6. Update a transaction

http://localhost:3000/0x6b47a98e8c0a930596bd4abece164c47f32db28f1b84ea1f169be9d3820e0cba
method: PATCH
body

```
{
    "oldStatus": "Initiated",
    "newStatus": "Completed"
}
```

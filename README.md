# Profitability Calculator

## Overview
This application fetches data from a google sheet which is deployed on sheetsDB. 

## Working
1. First we enter all the necessary fields in the form.
2. When we press the "Calculate Fees" button, we hit an endpoint this : POST /api/v1/profitability-calculator
3. On hitting this endpoint, we use the form data and collect information about different types of fee from the sheet that is deployed on sheetsDB.
4. The backend is running on port 3000 locally.
5. The frontend is running on port 5173 locally.
6. The data is returned in JSON format which is used to populate the frontend of the application.

## Explanation of business terms:

Product Category: Determines referral fee percentage and category-specific requirements
Selling Price: Your listing price, including GST
Weight: Actual product weight, affects shipping costs
Shipping Mode:

Easy Ship: Amazon picks up and delivers, you store
FBA: Amazon stores and ships

Service Level:

Standard: Regular delivery timeline
Express: Faster delivery, higher fees

Product Size:

Standard: Normal sized items
Oversize: Larger items with special handling

Location:

Local: Within city delivery
National: Pan-India delivery

These factors combine to determine your total Amazon fees and potential profits.


## Current Features
- Interactive pricing calculator
- Fee structure visualization
- Detailed cost breakdown
- Dynamic fee calculations

### API Endpoint
```http
POST /api/v1/profitability-calculator
```
Request example
<img width="556" alt="Screenshot 2025-01-07 at 1 58 15 AM" src="https://github.com/user-attachments/assets/3f16d6ee-847c-40e1-8d85-84fbed4bba18" />

Response example
<img width="563" alt="Screenshot 2025-01-07 at 1 58 46 AM" src="https://github.com/user-attachments/assets/0108c23e-4443-4e39-a600-4136f3fcb87b" />

Displayed on frontend
<img width="1470" alt="Screenshot 2025-01-07 at 1 59 23 AM" src="https://github.com/user-attachments/assets/7706d83d-021c-4685-ab6e-bff4df8d7448" />

### Goals achieved
- Created a backend API to manage fee structures
- Integration with the given spreadsheet data
- Dynamic fee calculation (From the api)

## Extending the Project
How to run:
   1. Clone the repository
   2. Install dependencies for both frontend and backend - `npm install`
   3. Frontend - `npm run dev`
   4. Backend - `node index.js`

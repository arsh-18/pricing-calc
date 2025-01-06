const express = require("express");
const axios = require("axios");
const cors = require("cors");  

const { 
  calculateReferralFee, 
  calculateClosingFee, 
  calculateWeightHandlingFee, 
  calculateOtherFee, 
} = require("./utils"); 

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["POST"],       
    allowedHeaders: ["Content-Type"], 
}));

app.use(express.json()); 
  
const sheetUrls = [
  'https://sheetdb.io/api/v1/380af4fmbw03z/?sheet=Referral fees',
  'https://sheetdb.io/api/v1/380af4fmbw03z/?sheet=Closing fees',
  'https://sheetdb.io/api/v1/380af4fmbw03z/?sheet=Weight handling fees',
  'https://sheetdb.io/api/v1/380af4fmbw03z/?sheet=Other fees',
];

async function fetchDataFromSheet(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
}

async function extractData(formData) {
  const sheetPromises = sheetUrls.map(url => fetchDataFromSheet(url));

  try {
    const allData = await Promise.all(sheetPromises);

    const referralFeesData = allData[0];
    const closingFeesData = allData[1];
    const weightHandlingFeesData = allData[2];
    const otherFeesData = allData[3];

    let arshReferralFee = calculateReferralFee(formData.productCategory, formData.sellingPrice, referralFeesData);
    if (arshReferralFee == null) arshReferralFee = 0;

    let arshClosingFee = calculateClosingFee(formData.sellingPrice, formData.shippingMode, formData.serviceLevel, closingFeesData);
    let arshOtherFee = calculateOtherFee(formData.productSize, formData.serviceLevel, otherFeesData);
    let arshWeightHandlingFee = calculateWeightHandlingFee(formData.weight, formData.shippingMode, formData.serviceLevel, formData.productSize, formData.location, weightHandlingFeesData);

    arshReferralFee = parseInt(arshReferralFee.toString(), 10);
    arshClosingFee = parseInt(arshClosingFee.toString(), 10);
    arshOtherFee = parseInt(arshOtherFee.toString(), 10);
    arshWeightHandlingFee = parseInt(arshWeightHandlingFee.toString(), 10);

    let arshTotalFee = arshReferralFee + arshClosingFee + arshOtherFee + arshWeightHandlingFee;
    let arshNetEarnings = formData.sellingPrice - arshTotalFee;

    return {
      arshReferralFee,
      arshWeightHandlingFee,
      arshClosingFee,
      arshOtherFee,
      arshTotalFee,
      arshNetEarnings
    };

  } catch (error) {
    console.error('Error extracting data from sheets:', error);
    return {}; 
  }
}


app.post('/api/v1/profitability-calculator', async (req, res) => {
    const { productSize, location, serviceLevel, sellingPrice, weight, productCategory, shippingMode } = req.body;

    try {
        const result = await extractData(req.body);

        if (Object.keys(result).length === 0) {
            return res.status(500).json({ error: "Error in calculations, please try again" });
        }

        return res.json({
            breakdown: {
                referralFee: result.arshReferralFee.toFixed(2),
                weightHandlingFee: result.arshWeightHandlingFee.toFixed(2),
                closingFee: result.arshClosingFee.toFixed(2),
                otherFee: result.arshOtherFee.toFixed(2),
            },
            totalFees: result.arshTotalFee.toFixed(2),
            netEarnings: result.arshNetEarnings.toFixed(2)
        });
    } catch (error) {
        console.error("Error in profitability calculation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

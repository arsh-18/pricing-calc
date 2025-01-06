function calculateReferralFee(category, sellingPrice, referralFeesData) {
  for (const data of referralFeesData) {
      if (data.Category === category) {
      if (data["Price Range (INR)"] === "All" || isPriceInRange(sellingPrice, data["Price Range (INR)"])) {
          const feePercentage = parseFloat(data["Referral Fee Percentage"].replace('%', '')) / 100;
          const referralFee = sellingPrice * feePercentage;
          console.log("Calculated referral fee:", referralFee); 
          return referralFee;
      }
      }
  }
  return null;
}

function isPriceInRange(price, range) {
  const [min, max] = range.split(' and ').map(val => val.replace('<=', '').replace('>', '').replace('INR', '').trim());
  const minValue = min ? parseInt(min) : null;
  const maxValue = max ? parseInt(max) : null;

  if (minValue && maxValue) {
      return price >= minValue && price <= maxValue;
  } else if (minValue) {
      return price <= minValue;
  } else if (maxValue) {
      return price > maxValue;
  }
  return false;
}
    
function calculateClosingFee(sellingPrice, shippingMode, serviceLevel, closingFeesData) {
  let fee = null;
  let priceRangeKey = '';
  
  if (sellingPrice <= 250) {
    priceRangeKey = '0-250';
  } else if (sellingPrice <= 500) {
    priceRangeKey = '251-500';
  } else if (sellingPrice <= 1000) {
    priceRangeKey = '501-1000';
  } else {
    priceRangeKey = '1000+';
  }

  for (const data of closingFeesData) {
    if (data["Price Range (₹)"] === priceRangeKey) {
      if (shippingMode !== 'FBA') {
        if (shippingMode === 'Easy Ship') {
          fee = data['Easy Ship (Standard)'];
        } else {
          fee = data[shippingMode];
        }
      } else {
        if (serviceLevel === 'Standard' || serviceLevel === 'Basic') {
          fee = data['FBA Normal'];
        } else {
          fee = data['FBA Exception'];
        }
      }
    }
  }

  if (typeof fee === 'string') {
    fee = parseInt(fee.replace('₹', '').trim(), 10);
  }

  console.log("Calculated closing fee:", fee); 
  return fee ?? 0;
}
    
function calculateWeightHandlingFee(weight, shippingMode, serviceLevel, productSize, location, weightHandlingFeesData) {
  let total = 0;

  if (productSize === 'Standard') {
    for (const data of weightHandlingFeesData) {
      if (shippingMode === 'Easy Ship' && serviceLevel === 'Basic' && data["Service Level"] === 'Easy Ship Standard Size - Basic') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'Easy Ship' && serviceLevel === 'Standard' && data["Service Level"] === 'Easy Ship Standard Size - Standard') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'Easy Ship' && serviceLevel === 'Advanced' && data["Service Level"] === 'Easy Ship Standard Size - Advanced') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'Easy Ship' && serviceLevel === 'Premium' && data["Service Level"] === 'Easy Ship Standard Size - Premium') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Basic' && data["Service Level"] === 'FBA Standard Size - Basic') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Standard' && data["Service Level"] === 'FBA Standard Size - Standard') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Advanced' && data["Service Level"] === 'FBA Standard Size - Advanced') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Premium' && data["Service Level"] === 'FBA Standard Size - Premium') {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      }
    }
    if (weight > 0.5) {
      for (const data of weightHandlingFeesData) {
        if (shippingMode === 'Easy Ship' && data["Service Level"] === 'Easy Ship Standard Size - All Levels' && data["Weight Range"] === 'Additional 500g up to 1kg') {
          total += parseInt(data[`${location}`].replace('₹', '').trim());
        } else if (shippingMode === 'FBA' && data["Service Level"] === 'FBA Standard Size - All Levels' && data["Weight Range"] === 'Additional 500g up to 1kg') {
          total += parseInt(data[`${location}`].replace('₹', '').trim());
        }
      }
    }

    let extra = weight - 1;
    let first = 0;
    let second = 0;
    if (extra <= 4) {
      first = extra;
    } else {
      first = 4;
      second = extra - 4;
    }

    if (first > 0) {
      for (const data of weightHandlingFeesData) {
        if (shippingMode === 'Easy Ship' && data["Service Level"] === 'Easy Ship Standard Size - All Levels' && data["Weight Range"] === 'Additional kg after 1kg') {
          total += first * (parseInt(data[`${location}`].replace('₹', '').trim()));
        } else if (shippingMode === 'FBA' && data["Service Level"] === 'FBA Standard Size - All Levels' && data["Weight Range"] === 'Additional kg after 1kg') {
          total += first * (parseInt(data[`${location}`].replace('₹', '').trim()));
        }
      }
    }

    if (second > 0) {
      for (const data of weightHandlingFeesData) {
        if (shippingMode === 'Easy Ship' && data["Service Level"] === 'Easy Ship Standard Size - All Levels' && data["Weight Range"] === 'Additional kg after 5kg') {
          total += second * (parseInt(data[`${location}`].replace('₹', '').trim()));
        } else if (shippingMode === 'FBA' && data["Service Level"] === 'FBA Standard Size - All Levels' && data["Weight Range"] === 'Additional kg after 5kg') {
          total += second * (parseInt(data[`${location}`].replace('₹', '').trim()));
        }
      }
    }
  } else {
    for (const data of weightHandlingFeesData) {
      if (shippingMode === 'Easy Ship' && data["Service Level"] === 'Easy Ship Heavy & Bulky - All Levels' && data["Weight Range"] === "First 12kg") {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Basic' && data["Service Level"] === 'FBA Heavy & Bulky - Basic' && data["Weight Range"] === "First 12kg") {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && serviceLevel === 'Standard' && data["Service Level"] === 'FBA Heavy & Bulky - Standard' && data["Weight Range"] === "First 12kg") {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      } else if (shippingMode === 'FBA' && (serviceLevel === 'Premium' || serviceLevel === 'Advanced') && data["Service Level"] === 'FBA Heavy & Bulky - Premium/Advanced' && data["Weight Range"] === "First 12kg") {
        total += parseInt(data[`${location}`].replace('₹', '').trim());
      }
    }

    if (weight > 12) {
      let extra = weight - 12;
      for (const data of weightHandlingFeesData) {
        if (shippingMode === 'Easy Ship' && data["Service Level"] === 'Easy Ship Heavy & Bulky - All Levels' && data["Weight Range"] === "") {
          total += extra * (parseInt(data[`${location}`].replace('₹', '').trim()));
        } else if (shippingMode === 'FBA' && serviceLevel === 'Basic' && data["Service Level"] === 'FBA Heavy & Bulky - All Levels' && data["Weight Range"] === "") {
          total += extra * (parseInt(data[`${location}`].replace('₹', '').trim()));
        }
      }
    }
  }

  console.log("Calculated weight handling fee:", total); 
  return total;
}
    
function calculateOtherFee(productSize, serviceLevel, otherFeesData) {
  let fee = 0;

  for (const data of otherFeesData) {
    if (data["Fee Type"] === "Pick & Pack Fee") {
      if (productSize === "Standard" && data["Category"] === "Standard Size") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      } else if (productSize === "Heavy & Bulky" && data["Category"] === "Oversize/Heavy & Bulky") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      }
    }

    if (data["Fee Type"] === "Storage Fee" && data["Category"] === "All Categories") {
      fee += parseInt(data['Rate'].replace('₹', '').trim().split(' ')[0]);
    }

    if (data["Fee Type"] === "Removal Fees") {
      if (productSize === "Standard" && serviceLevel === "Standard" && data["Category"] === "Standard Size - Standard Shipping") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      } else if (productSize === "Standard" && serviceLevel !== "Standard" && data["Category"] === "Standard Size - Expedited Shipping") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      } else if (productSize === "Heavy & Bulky" && serviceLevel === "Standard" && data["Category"] === "Heavy & Bulky - Standard Shipping") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      } else if (productSize === "Heavy & Bulky" && serviceLevel !== "Standard" && data["Category"] === "Heavy & Bulky - Expedited Shipping") {
        fee += parseInt(data['Rate'].replace('₹', '').trim());
      }
    }
  }

  console.log("Calculated other fee:", fee); 
  return fee;
}       

module.exports = {
  calculateReferralFee,
  isPriceInRange,
  calculateClosingFee,
  calculateWeightHandlingFee,
  calculateOtherFee,
};
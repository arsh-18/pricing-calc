import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { PricingFormData } from '../types';

const categories = [
  'Automotive - Helmets & Riding Gloves',
  'Automotive - Tyres & Rims',
  'Automotive Vehicles',
  'Baby - Hardlines',
  'Baby - Strollers',
  'Baby - Diapers',
  'Books',
  'Automotive – 2-Wheelers 4-Wheelers and Electric Vehicles',
  'Automotive – Car and Bike parts',
  'Automotive – Cleaning kits',
  'Automotive Accessories',
  'Vehicle Tools and Appliances',
  'Oils Lubricants',
  'Automotive – Batteries and air fresheners',
  'Car Electronics Devices',
  'Car Electronics Accessories',
  'Baby Hardlines',
  'Movies',
  'Music',
  'Musical Instruments - Guitars',
  'Musical Instruments - Keyboards',
  'Musical Instruments - Microphones',
  'Musical Instruments - Others',
  'Video Games - Online game services',
  'Video Games - Accessories',
  'Video Games - Consoles',
  'Business and Industrial Supplies - Scientific Supplies',
  'OTC Medicine',
  'Masks',
  'Weighing Scales & Fat Analyzers',
  '3D Printers',
  'Business and Industrial Supplies - Material Handling Equipment',
  'Business and Industrial Supplies - Electrical Testing',
  'Business and Industrial Supplies - Power tools & accessories',
  'Occupational Safety Supplies',
  'Stethoscopes',
  'Packing materials',
  'Power & hand Tools and Water Dispenser',
  'Office products - Office supplies',
  'Office products - Electronic Devices',
  'Office products - Arts and Crafts',
  'Office products - Writing Instruments',
  'Apparel - Accessories',
  'Apparel - Sweat Shirts and Jackets',
  'Apparel - Shorts',
  'Apparel - Baby',
  'Apparel - Ethnic wear',
  'Apparel - Other innerwear',
  'Apparel - Sleepwear',
  'Apparel - Sarees and Dress Materials',
  'Apparel - Men\'s T-shirts',
  'Apparel - Womens\' Innerwear / Lingerie',
  'Backpacks',
  'Eyewear',
  'Fashion Jewellery',
  'Fine Jewellery - Gold Coins',
  'Fine Jewellery - studded',
  'Fine Jewellery - unstudded and solitaire',
  'Silver Jewellery',
  'Flip Flops Fashion Sandals and Slippers',
  'Handbags',
  'Luggage - Suitcase & Trolleys',
  'Luggage - Travel Accessories',
  'Kids shoes',
  'Shoes',
  'Shoes - Sandals & Floaters',
  'Wallets',
  'Watches',
  'Cables and Adapters',
  'Camera Accessories',
  'Camera Lenses',
  'Camera and Camcorder',
  'Cases Covers Skins Screen Guards',
  'Desktops',
  'Electronic Accessories',
  'Electronic Devices',
  'Entertainment Collectibles',
  'Fashion Smartwatches',
  'GPS Devices',
  'Hard Disks',
  'Headsets Headphones and Earphones',
  'Keyboards and Mouse',
  'Kindle Accessories',
  'Laptop Bags & Sleeves',
  'Laptop and Camera Battery',
  'Laptops',
  'Memory Cards',
  'Mobile phones',
  'Tablets',
  'Modems & Networking Devices',
  'Monitors',
  'PC Components',
  'Power Banks & Chargers',
  'Printers & Scanners',
  'Software Products',
  'Speakers',
  'Television',
  'Landline Phones',
  'Smart Watches & Accessories',
  'USB Flash Drives',
  'Projectors Home Theatre Systems',
  'Grocery - herbs and spices',
  'Grocery & Gourmet - Oils',
  'Grocery - Dried fruits and nuts',
  'Grocery - Hampers and gifting',
  'Pet food',
  'Pet Products',
  'Beauty - Fragrance',
  'Beauty - Haircare Bath and Shower',
  'Beauty - Makeup',
  'Face Wash',
  'Moisturizer cream',
  'Sunscreen',
  'Deodrants',
  'Facial steamers',
  'Prescription Medicine',
  'Health & Personal Care - Medical Equipment & Contact Lens',
  'Health and Personal Care - Ayurvedic products',
  'Health & Household - Sports Nutrition',
  'Health and Personal Care - Contact lens',
  'Health and Household - Household Cleaning',
  'Health and Household - Vitamins & Supplements',
  'Luxury Beauty',
  'Car Cradles Lens Kits and Tablet Cases',
  'Personal Care Appliances - Electric Massagers',
  'Personal Care Appliances - Grooming & Styling',
  'Personal Care Appliances - Glucometer',
  'Personal Care Appliances - Thermometers',
  'Bean Bags & Inflatables',
  'Mattresses',
  'Rugs and Doormats',
  'Clocks',
  'Wall Art',
  'Home - Fragrance & Candles',
  'Bedsheets Blankets and covers',
  'Home furnishing',
  'Containers Boxes Bottles Kitchen Storage',
  'Home improvement - Accessories',
  'Home improvement (excl. accessories)',
  'Tiles & Flooring Accessories',
  'Wires',
  'Ladders Kitchen and Bath fixtures',
  'Home Storage',
  'Wallpapers & Wallpaper Accessories',
  'Home Decor Products',
  'Wall Paints and Tools',
  'Home - Waste & Recycling',
  'Craft materials',
  'Water Purifier and Accessories',
  'Water Heaters and Accessories',
  'Home improvement - Kitchen & Bath',
  'Sanitaryware',
  'Home Safety & Security Systems',
  'Inverter and Batteries',
  'Cleaning and Home Appliances',
  'Indoor Lighting',
  'Doors and Windows',
  'LED Bulbs and Battens',
  'Cushion Covers',
  'Curtains and Curtain Accessories',
  'Slipcovers and Kitchen Linens',
  'Safes and Lockers',
  'Lawn & Garden - Solar Panels',
  'Lawn & Garden - Leaf blower',
  'Lawn & Garden - Commercial Agricultural',
  'Lawn & Garden - Chemical Pest Control',
  'Lawn & Garden - Solar Devices',
  'Lawn and Garden - Planters',
  'Lawn and Garden - Plants Seeds & Bulbs',
  'Lawn & Garden - Outdoor equipments',
  'Kitchen - Non Appliances',
  'Kitchen - Glassware & Ceramicware',
  'Kitchen - Gas Stoves & Pressure Cookers',
  'Large Appliances (excl. specified)',
  'Large Appliances - Accessories',
  'Large Appliances - Chimneys',
  'Large Appliances - Refrigerators',
  'Small Appliances',
  'Fans and Robotic Vacuums',
  'Bicycles',
  'Sports & Outdoors - Footwear',
  'Coin Collectibles',
  'Silver Coins & Bars',
  'Furniture - Other products',
  'Consumable Physical Gift Card',
  'Warranty Services'
];


export default function PricingCalculator() {
  const [formData, setFormData] = useState<PricingFormData>({
    productCategory: categories[0],
    sellingPrice: 0,
    weight: 0.5,
    shippingMode: 'Easy Ship',
    serviceLevel: 'Standard',
    productSize: 'Standard',
    location: 'Local'
  });

  const [results, setResults] = useState<any>(null);

  // const handleCalculate = () => {
  //   const calculatedFees = calculateTotalFees(formData);
  //   setResults(calculatedFees);
  // };

  const handleCalculateUpdated = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/profitability-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); 
      console.log(data); 
      setResults(data); 
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sellingPrice' || name === 'weight' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Amazon Pricing Calculator</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Category
                </label>
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Mode
                  </label>
                  <select
                    name="shippingMode"
                    value={formData.shippingMode}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Easy Ship</option>
                    <option>FBA</option>
                    <option>Self Ship</option>
                    <option>Seller Flex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Level
                  </label>
                  <select
                    name="serviceLevel"
                    value={formData.serviceLevel}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Premium</option>
                    <option>Advanced</option>
                    <option>Standard</option>
                    <option>Basic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Size
                  </label>
                  <select
                    name="productSize"
                    value={formData.productSize}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Standard</option>
                    <option>Heavy & Bulky</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Local</option>
                    <option>Regional</option>
                    <option>National</option>
                    <option>IXD</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCalculateUpdated}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate Fees
              </button>
            </div>
            {results && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referral Fee:</span>
                    <span className="font-medium">₹{results.breakdown.referralFee ? results.breakdown.referralFee : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Handling Fee:</span>
                    <span className="font-medium">₹{results.breakdown.weightHandlingFee ? results.breakdown.weightHandlingFee : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Closing Fee:</span>
                    <span className="font-medium">₹{results.breakdown.closingFee ? results.breakdown.closingFee : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Other Fee:</span>
                    <span className="font-medium">₹{results.breakdown.otherFee ? results.breakdown.otherFee : 'N/A'}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total Fees:</span>
                    <span className="text-blue-600">₹{results.totalFees ? results.totalFees : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Net Earnings:</span>
                    <span className="text-green-600">₹{results.netEarnings ? results.netEarnings : 'N/A'}</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
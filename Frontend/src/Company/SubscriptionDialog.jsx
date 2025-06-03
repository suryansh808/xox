import { useState } from 'react';


const subscriptionPlans = {
  '1 Month': { price: 2499, gst: 18 },
  '3 Months': { price: 6490, gst: 18 },
  '6 Months': { price: 11890, gst: 18 },
  '1 Year': { price: 21890, gst: 18 },
};

const SubscriptionDialog = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleClose = () => {
    setSelectedPlan('');
    onClose();
  };

  const handlePay = () => {
    if (!selectedPlan) return;

    const { price } = subscriptionPlans[selectedPlan];
    // Simulate API call payload
    const payload = {
      plan: selectedPlan,
      amount: price, // EXCLUDING GST
    };

    console.log('Initiating payment with:', payload);

    alert(`Initiating payment of ₹${price} for ${selectedPlan}`);
    handleClose();
  };

  const getPriceDetails = () => {
    if (!selectedPlan) return null;
    const { price, gst } = subscriptionPlans[selectedPlan];
    const gstAmount = (price * gst) / 100;
    const total = price + gstAmount;
    return `${price} + ${gst}% GST`;
  };

  if (!isOpen) return null;

  return (
    <div id="modal-backdrop">
      <div className="modal-content">
        <h2>Select a Subscription Plan</h2>
        <select onChange={handleChange} value={selectedPlan}>
          <option value="" disabled>Select duration</option>
          {Object.keys(subscriptionPlans).map((plan) => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>

        {selectedPlan && (
          <>
            <div className="price-details">
              <strong>{getPriceDetails()}</strong>
            </div>
            <button className="pay-btn" onClick={handlePay}>Confirm</button>
          </>
        )}

        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default SubscriptionDialog;

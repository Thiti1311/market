import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useBag } from './../contexts/BagContext';
import './../styles/Payment.css';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();
  const { clearBag } = useBag();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardNumber && cardHolderName && expiryMonth && expiryYear && cvv) {
      setShowSuccessPopup(true);

      console.log({
        cardNumber,
        cardHolderName,
        expiryMonth,
        expiryYear,
        cvv
      });

      setCardNumber('');
      setCardHolderName('');
      setExpiryMonth('');
      setExpiryYear('');
      setCvv('');
    }
  };

  const handleClosePopup = () => {
    clearBag();
    setShowSuccessPopup(false);
    navigate('/');
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit} className="form-payment">
        <div className="insert-data">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="Only Numbers"
            maxLength="16"
            minLength="15"
            pattern="\d{15,16}"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div className="insert-data">
          <label htmlFor="cardHolderName">Cardholder Name</label>
          <input
            type="text"
            id="cardHolderName"
            placeholder="RAM"
            pattern="[a-zA-ZÀ-ÿ\s]{3,}"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            required
          />
        </div>

        <div className="insert-data">
          <div className="expiry-date">
            <select
              id="expiryMonth"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              required
            >
              <option value="" disabled>Expiry Month</option>
              {[...Array(12).keys()].map(month => (
                <option key={month + 1} value={month + 1}>
                  {month + 1}
                </option>
              ))}
            </select>

            <select
              id="expiryYear"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              required
            >
              <option value="" disabled>Expiry Year</option>
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034].map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="insert-data">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            placeholder="-"
            maxLength="4"
            minLength="3"
            pattern="\d{3,4}"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>

        <button type="submit">Checkout</button>
      </form>

      {showSuccessPopup && (
        <div className="success-popup">
          <FaCheckCircle size={50} color="green" />
          <h2>Purchase made successfully!</h2>
          <button onClick={handleClosePopup}>Fechar</button>
        </div>
      )}
    </div>

  );
};

export default PaymentForm;

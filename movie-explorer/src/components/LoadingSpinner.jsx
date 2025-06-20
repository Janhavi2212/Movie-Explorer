import React from 'react';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
    <div className="spinner-border text-info" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
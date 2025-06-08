import React, { useEffect, useState } from 'react';
import Admin1 from './Admin1';
import Admin2 from './Admin2';

const Admin = ({ setMinus, minus }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        // Use consistent breakpoint (1024 in both cases)
        setIsLargeScreen(window.innerWidth >= 1024);
      };
      
      // Set initial value
      checkScreenSize();
      
      // Add event listener
      window.addEventListener("resize", checkScreenSize);
      
      // Cleanup
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []); // Empty dependency array is fine here since setIsLargeScreen is stable

  return isLargeScreen ? 
    <Admin2 setMinus={setMinus} minus={minus} /> : 
    <Admin1 setMinus={setMinus} minus={minus} />;
}

export default Admin;

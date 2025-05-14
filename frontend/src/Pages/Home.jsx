import { useEffect, useState } from "react";
import ContactUs from '../Components/ContactUs'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
function Home() {
  useEffect(() => {
    document.title = "Inventory Management System";
  }, []);

  return (
   <div className="App">    
    <Hero />
    <ContactUs />
    <Footer />
   </div>
  );
}

export default Home;

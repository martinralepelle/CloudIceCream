import { useState } from "react";
import { Link } from "wouter";
import InfoModal from "./InfoModal";

export default function Footer() {
  const [modalContent, setModalContent] = useState<{
    open: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    open: false,
    title: "",
    content: null,
  });

  const openModal = (title: string, content: React.ReactNode) => {
    setModalContent({
      open: true,
      title,
      content,
    });
  };

  return (
    <>
      <footer className="bg-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold font-poppins text-gray-800 mb-4">clouds</h3>
              <p className="text-gray-600">
                Handcrafted ice cream made with love and the finest ingredients.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Help</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => openModal("Logistics", (
                      <div className="space-y-4">
                        <p>At Clouds, we take pride in our lightning-fast delivery system for cold delicacies.</p>
                        <p className="font-medium">Our Promise:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Delivery within 5 minutes of your order.</li>
                          <li>Special packaging that keeps your ice cream frozen and perfect.</li>
                          <li>Temperature-controlled vehicles for freshness.</li>
                          <li>Real-time tracking of your order.</li>
                        </ul>
                        <p>We deliver to all locations within our service areas. Shipping fees may apply based on distance.</p>
                      </div>
                    ))}
                    className="text-gray-600 hover:text-primary transition-colors text-left"
                  >
                    Logistics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openModal("Contact Us", (
                      <div className="space-y-4">
                        <p>Have questions or need assistance? We're here to help!</p>
                        <p>Our customer service team is available 7 days a week from 9am to 9pm.</p>
                        <p className="font-medium">Quick contact:</p>
                        <p>Email: <a href="mailto:admin@cloudsicecream.com" className="text-primary hover:underline">admin@cloudsicecream.com</a></p>
                        <p>Phone: (555) 123-4567</p>
                      </div>
                    ))}
                    className="text-gray-600 hover:text-primary transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openModal("Privacy Policy", (
                      <div className="space-y-4">
                        <p>At Clouds Ice Cream, we take your privacy seriously.</p>
                        <p className="font-medium">Data Collection:</p>
                        <p>We collect only essential information needed to process your orders and enhance your shopping experience.</p>
                        <p className="font-medium">Data Usage:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Order processing and delivery</li>
                          <li>Account management</li>
                          <li>Improving our products and services</li>
                          <li>Personalized recommendations (with your consent)</li>
                        </ul>
                        <p className="font-medium">Your Rights:</p>
                        <p>You have the right to access, modify, or delete your personal information at any time.</p>
                        <p>For full details, please see our complete Privacy Policy document.</p>
                      </div>
                    ))}
                    className="text-gray-600 hover:text-primary transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-lg font-medium hover:bg-primary/90 transition-colors">Join</button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Clouds. All rights reserved.
          </div>
        </div>
      </footer>

      <InfoModal
        title={modalContent.title}
        open={modalContent.open}
        onOpenChange={(open) => setModalContent({ ...modalContent, open })}
      >
        {modalContent.content}
      </InfoModal>
    </>
  );
}

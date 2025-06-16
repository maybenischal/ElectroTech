import React from 'react'

const Footer = () => {
  return (
    <div>
        <div>
            <div className="w-full bg-gray-800 text-white py-4">
                <div className="w-[95%] m-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
                    </div>
                    <div>
                        <ul className="flex space-x-4">
                            <li><a href="/privacy-policy" className="text-white hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="text-white hover:underline">Terms of Service</a></li>
                            <li><a href="/contact-us" className="text-white hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
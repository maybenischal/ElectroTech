const Contact = () => {
  return (
    <div>
      {/* Section Title */}
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-[36px] font-bold text-center my-4">Contact Files</h1>

      </div>

      {/* Contact Section */}
      <div className="flex items-center justify-center items-start gap-8">
        <img
          src="/Images/desk-gadgets.jpg"
          alt="Contact Us"
          className="h-110 w-210 object-cover rounded-lg shadow-lg"
        />

        <div className="flex flex-col justify-center items-start mt-10">

          <p className="text-lg">Company Name: <span className="text-md font-bold">ElectroTech</span> </p>
          <p className="text-lg">Physical Address: <span className="text-md font-bold">Kathmandu, Nepal</span> </p>
          <p className="text-lg">Phone Number: <span className="text-md font-bold">9807079643</span> </p>
          <p className="text-lg">Email Address: <span className="text-md font-bold">electrotech@gmail.com</span> </p>
          <p className="text-lg">Business Hours: <span className="text-md font-bold">Monday to Friday, 9:00 AM - 6:00 PM</span> </p>

          <p className="text-lg">For more information,<span className="text-md font-bold">Contact us on Whatsapp</span> </p>

        </div>
      </div>
    </div>
  );
};

export default Contact;

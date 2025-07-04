
const Contact = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <p className="text-3xl font-medium">Latest Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className=" my-10 flex items-center justify-center mt-10">
        <img src="/Images/Apple_Buds_1.png" alt="" className="h-50 object-contain" />
        <div className="flex flex-col justify-center items-start">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p>Kathmandu, Nepal</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
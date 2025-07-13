import {
  Upload, Package, FileText, Tag,
  DollarSign, Monitor, Camera
} from 'lucide-react';
import { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

interface Specification {
  key: string;
  value: string;
}

interface AddProductsProps {
  token: string;
}

const AddProducts = ({ token }: AddProductsProps) => {
  console.log(token);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [specifications, setSpecifications] = useState<Specification[]>([{ key: "", value: "" }]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("type", productType)
      formData.append("brand", brand)


      const specificationsMap: { [key: string]: string } = {};
      specifications.forEach((spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          specificationsMap[spec.key] = spec.value;
        }
      });

      formData.append("specifications", JSON.stringify(specificationsMap))
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      })
      console.log(response.data)
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Success value:", response.data.success);
      console.log("Success type:", typeof response.data.success);

      if (response.data.success) {
        toast.success(response.data.message)

        // Reset form
        setName("");
        setPrice("");
        setDescription("");
        setProductType("");
        setBrand("");
        setImage(null);
        setSpecifications([{ key: "", value: "" }]);
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  };

  // Specification handlers for UI only
  const handleSpecificationChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specifications];
    updated[index][field] = val;
    setSpecifications(updated);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    const updated = [...specifications];
    updated.splice(index, 1);
    setSpecifications(updated);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="bg-white rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gray-100 px-8 py-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="w-8 h-8" />
              Add New Product
            </h1>
            <p className="text-gray-800 mt-2">Fill in the details to add a new product to your inventory</p>
          </div>

          <form onSubmit={onSubmitHandler} className="p-8 space-y-6">

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex text-lg font-semibold text-gray-700 items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Product Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed product description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex text-lg font-semibold text-gray-700 items-center gap-2">
                <Camera className="w-5 h-5" />
                Product Image
              </label>

              <label
                htmlFor="fileUpload"
                className="cursor-pointer relative border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all"
              >
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-contain shadow-md"
                    />
                    <span className="mt-4 text-sm text-red-600 hover:underline">Click to change image</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-gray-500">Upload Your Image</p>
                  </>
                )}
              </label>

              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(file);
                }}
                required
              />
            </div>

            {/* Category and Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Product Type
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none appearance-none"
                  required
                >
                  <option value="">Select Product Type</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Airbuds">Airbuds</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4  py-3 border border-gray-300 rounded-lg appearance-none outline-none"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="DELL">DELL</option>
                  <option value="HP">HP</option>
                  <option value="ASUS">ASUS</option>
                  <option value="MSI">MSI</option>
                  <option value="Acer">Acer</option>
                </select>
              </div>
            </div>

            {/* Dynamic Specifications */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Technical Specifications
              </h3>

              {specifications.map((spec, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Specification Name (e.g., RAM)"
                    value={spec.key}
                    onChange={(e) => handleSpecificationChange(index, "key", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required={specifications.length > 1}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Value (e.g., 16GB DDR5)"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required={specifications.length > 1}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="text-white bg-red-500 p-3 rounded-md cursor-pointer"
                      disabled={specifications.length === 1}
                      title={specifications.length === 1 ? "At least one specification required" : ""}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSpecification}
                className="mt-2 border p-2 bg-gray-700 text-white rounded-md cursor-pointer"
              >
                + Add Specification
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // Reset form or navigate away if needed
                  setName("");
                  setPrice("");
                  setDescription("");
                  setProductType("");
                  setBrand("");
                  setImage(null);
                  setSpecifications([{ key: "", value: "" }]);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg
                transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Add Product
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default AddProducts;
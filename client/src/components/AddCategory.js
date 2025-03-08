import React, { useState } from "react";

const AddCategory = () => {
    const [formData, setFormData] = useState({
        code: "",
        header: "",
        description: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://your-backend-url/api/categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert("Category added successfully!");
            setFormData({ code: "", header: "", description: "" });
          } else {
            alert("Failed to add category.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while adding the category.");
        }
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-700 font-medium">
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="header" className="block text-gray-700 font-medium">
                Header
              </label>
              <input
                type="text"
                id="header"
                name="header"
                value={formData.header}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save Category
            </button>
          </form>
        </div>
      );
}

export default AddCategory

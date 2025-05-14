import React, { useEffect, useState } from "react";
import ItemForm from "../Components/ItemForm";
import ItemList from "../Components/ItemList";
import Aside from "../Components/Aside";
import Navbar from "../Components/Navbar";


const InventoryPage = () => {

  // Test: Uncomment this to simulate an error
// throw new Error("Simulated crash!");


  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [editId, setEditId] = useState(null);



  const handleDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
    });    
    if (res.ok) {
      setItems(items.filter((item) => item._id !== id));
    }
  };
  
  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setCode(item.code || "");
    setCategory(item.category || "");
    setPrice(item.price);
    setQuantity(item.quantity);
  };
  

  const cancelEdit = () => {
    setEditId(null);
    setName('');
    setCode('');
    setCategory('');
    setPrice('');
    setQuantity('');
  };
  
  

  useEffect(() => {
    document.title = "IMS - Inventory";

    const fetchItems = async () => {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, code, category, price, quantity };
  
    try {
      let response;
      if (editId) {
        response = await fetch(`http://localhost:5000/api/products/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        });
      } else {
        response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        });
      }
  
      if (response.ok) {
        const data = await response.json();
        if (editId) {
          setItems(items.map((item) => (item._id === editId ? data : item)));
          setSuccessMessage("✅ Item Updated!");
        } else {
          setItems([...items, data]);
          setSuccessMessage("✅ Item Added!");
        }
  
        // Reset form
        setEditId(null);
        setName('');
        setCode('');
        setCategory('');
        setPrice('');
        setQuantity('');
  
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error("Error submitting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  



 const isFormValid = name && category && price && quantity;


  return (
    <div className="min-h-screen w-full flex flex-col bg-white p-1">
        {/* Navbar - Red */}
    <div className="h-16 w-full  flex items-center justify-center" >
      <Navbar/>
    </div>


     {/* Content Area */}
     <div className="flex flex-1 w-full gap-2 ">

     {/* Aside - Blue */}
     <div className="w-48 flex justify-center">
     <Aside/>
     </div>


      {/* itemlist  */}
      <div className="w-[70%]  bg-[#F2F3F5]  border border-[#9E9E9E] rounded-lg flex justify-center">
        <ItemList items={items} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>

        {/* item form area */}
      <div className="w-[30%]  flex justify-center shadow">
        <ItemForm
            name={name}
            code={code}
            category={category}
            price={price}
            quantity={quantity}
            setName={setName}
            setCode={setCode}
            setCategory={setCategory}
            setPrice={setPrice}
            setQuantity={setQuantity}
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            successMessage={successMessage}
            editId={editId}
            cancelEdit={cancelEdit}
        />
      </div>

     </div>
</div>
  );
};

export default InventoryPage;




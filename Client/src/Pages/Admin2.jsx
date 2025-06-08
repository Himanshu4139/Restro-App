import React, { useState, useEffect} from 'react';
import { FaHome, FaHamburger, FaPlus, FaQrcode, FaSignOutAlt, FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { MdRestaurantMenu } from "react-icons/md";
import { RiMenuSearchFill } from "react-icons/ri";
import Card1 from '../Components/Card1';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChanges } from '../redux/slices/changesSlice';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import Model from '../Components/Model';
import Createmenu from './Createmenu';
import Createcategory from './Createcategory';
import LogOut from '../Components/LogOut';
import Option1 from '../Components/Option1';



const Admin2 = ({ setMinus, minus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [change, setChange] = useState(false);
  const [category, setSelectedCategory] = useState('All');
  const [showModel2, setShowModel2] = useState(false);
  const [order, setOrder] = useState([]);
  const [cookies] = useCookies(['token']);
  const { id } = jwtDecode(cookies.token);
  const [value, setValue] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showModel1, setShowModel1] = useState(false);
  const [num , setNum] = useState(0);

  const [shop, setShop] = useState('');


  const handleClose = () => {
    setShowModel(false);
}

const handleClose1 = () => {
  setShowModel1(false);
}

const handleClose2 = () => {
  setShowModel2(false);
}

  const model = <Model onClose={handleClose}>
        <Createmenu setShowModel={setShowModel} setChange={setChange} />
    </Model>

const model1 = <Model onClose={handleClose1}>
<Createcategory setShowModel={setShowModel1} setChange={setChange} />
</Model>

const model2 = <Model onClose={handleClose2}>
<LogOut setShowModel={setShowModel2} setChange={setChange} />
</Model>




//my  shop name
  useEffect(() => {
    if (cookies.token) {
      const { id } = jwtDecode(cookies.token);
      axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
      .then(res=>{
        setShop(res.data.admin.shopName);
        //console.log(res.data.admin);
      })
      .catch(err=>{
        console.log(err);
      })

    }}
  , []);

  const downloadQRCode = () => {
          const canvas = document.getElementById('qr-gen');
          if (canvas) {
              canvas.toBlob((blob) => {
                  saveAs(blob, 'qrcode.png');
              });
          }
      };
  
      useEffect(() => {
          if (cookies) {
              const user = jwtDecode(cookies.token);
              setValue(user.id);
          }
      }, []);

      useEffect(() => {
        const { id } = jwtDecode(cookies.token);
        axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
          .then((response) => {
            setNum(response.data.admin.menu.length);
          })
          .catch((error) => {
            console.error('Error fetching menu items:', error);
          });
        },);

  const filteredFoodItems = num;

  const [activeOrderTab, setActiveOrderTab] = useState('inProcess');


  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard' },
    // { icon: <FaHamburger />, label: 'Orders' },
    // { icon: <FaUser />, label: 'Profile' },
    // { icon: <FaPlus />, label: 'Add Category' },
    { icon: <FaPlus />, label: 'Add Menu' },
    { icon: <FaQrcode />, label: 'QR Code' },
    { icon: <FaSignOutAlt />, label: 'Logout' }
  ];


  const user = {
    username: 'John Doe',
    shopName: 'Delicious Bites',
    shopThumbnail: '/shop-thumbnail.jpg',
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleMenuClick = (label) => {
    setActiveSection(label);
    if (label === 'Add Menu') {
      setActiveSection('Dashboard');
      setShowModel(true);
    }
    else if (label === 'Logout') {
      setActiveSection('Dashboard');
      setShowModel2(true);
    }
  };


  const toggleOrderSidebar = () => {
    setIsOrderOpen(!isOrderOpen);
  };


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
        .then((res) => {
            setOrder(res.data.admin.orders);
        })
        .catch(err => {
            console.error(err);
        })
}, )

const handleUpdate = async(orderId) =>{
  await axios.put(`${import.meta.env.VITE_URL}admin/food/updateOrder/${orderId}`,{
      value:id
  })
  .then((res)=>{
      dispatch(toggleChanges());
  })
  .catch(err=>{
      console.error(err);
  })
}

  const findNo = order.filter((item) => item.status === 'inProcess');

  const filteredOrders = order.filter((item) =>
    activeOrderTab === 'inProcess'
        ? item.status === 'inprocess'
        : item.status === 'completed'
);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-full md:w-64 bg-gradient-to-b from-gray-800 to-gray-700 text-gray-300 shadow-lg">
        <div className="p-6 flex items-center justify-between md:justify-start md:space-x-3">
          <div className="flex items-center space-x-4">
            <img
              src='https://logowik.com/content/uploads/images/chef-restaurant5078.logowik.com.webp'
              alt="Shop Thumbnail"
              className="h-12 w-12 rounded-full object-cover border-2 border-orange-500"
            />
            <span className="font-bold text-xl text-gray-300">
              {shop}
            </span>
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <MdRestaurantMenu size={25} />
            ) : (
              <RiMenuSearchFill size={25} />
            )}
          </button>
        </div>
        <nav className={`mt-6 md:block ${isMenuOpen ? "block" : "hidden"}`}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.label)}
              className={`flex items-center px-6 py-4 w-full cursor-pointer text-left transition-colors ${
                activeSection === item.label
                  ? "bg-orange-400 text-black"
                  : "hover:text-amber-500"
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-4">
        {(activeSection === "Dashboard" || activeSection === "Add Menu") && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
                <p className="text-gray-400">Welcome back, Admin</p>
              </div>
              <button
                onClick={toggleOrderSidebar}
                className="md:hidden px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center transition-colors"
              >
                <FaShoppingCart className="mr-2" /> Orders
              </button>
            </div>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search food items..."
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center transition-colors"
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="mb-6 w-11/12 mx-auto">
              <h2 className="text-xl font-bold text-gray-100 mb-4">
                Categories
              </h2>
              <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide ">
                {/* All Category */}
                <div
                  className={`flex flex-col items-center flex-shrink-0 cursor-pointer transition-opacity ${
                    category === "All"
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  <div
                    className={`h-16 w-16 rounded-full overflow-hidden border-2 transition-colors ${
                      category === "All"
                        ? "border-orange-500"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <img
                      src="https://media.istockphoto.com/id/1625128179/photo/composition-of-well-balanced-food-for-healthy-eating.jpg?s=612x612&w=is&k=20&c=FfjR9w3_gP7hKgj__1KcOkeT41b-D4q7zpHAOfFLeng="
                      alt="All"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mt-2">All</p>
                </div>

                {/* Dynamic Categories */}

                <Option1
                  change={change}
                  setSelectedCategory={setSelectedCategory}
                  minus={minus}
                  selectedCategory={category}
                />

                {/* Add Category Button */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="h-16 w-16 rounded-full border-2 border-dashed border-gray-500 flex justify-center items-center cursor-pointer hover:border-orange-400 hover:text-orange-400 transition-colors"
                    onClick={() => setShowModel1(true)}
                  >
                    <FaPlus className="text-2xl text-gray-400" />
                  </div>
                  <p className="text-gray-400 mt-2">Add</p>
                </div>
              </div>
            </div>

            {/* Food Items Section */}

            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-orange-400">
                  Food Items
                </h2>
                <p className="text-gray-400">{filteredFoodItems} items found</p>
              </div>

              {filteredFoodItems > 0 ? (
                
                <div className="max-h-[90vh] overflow-y-auto pr-2">
                  <div className="grid grid-rows-1 gap-2 min-w-0">
                    <Card1
                      change={change}
                      setChange={setChange}
                      category={category}
                      searchTerm={searchTerm} 
                    />
                  </div>
                </div>
              
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    No food items found matching your criteria
                  </p>
                </div>
              )}
            </div>
            {showModel && model}
            {showModel1 && model1}
            {showModel2 && model2}
          </div>
        )}

        {activeSection === "QR Code" && (
          <div className="flex flex-col items-center justify-center h-full bg-gray-800">
            <QRCodeCanvas
              id="qr-gen"
              value={value}
              size={512}
              className="mb-4 w-8 h-8"
            />
            <button
              onClick={downloadQRCode}
              className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>

      {/* Right Order Sidebar */}
      <div
        className={`${
          isOrderOpen ? "block" : "hidden"
        } md:block w-full md:w-96 bg-gray-800 text-gray-300 shadow-lg flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold text-orange-400">Orders</h2>
          <button
            onClick={toggleOrderSidebar}
            className="md:hidden text-gray-300"
          >
            <MdRestaurantMenu size={25} />
          </button>
        </div>

        {/* Order Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-3 font-medium ${
              activeOrderTab === "inProcess"
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveOrderTab("inProcess")}
          >
            Processing
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              activeOrderTab === "completed"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveOrderTab("completed")}
          >
            Completed
          </button>
        </div>

        {/* Orders List */}

        {/* have to change the ui */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredOrders.length > 0 ? (
            <div className="space-y-3">
              {filteredOrders
                .slice()
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((item, index) => (
                  <div key={item._id} className="mb-3">
                    <div className="bg-gray-800 rounded-lg shadow-xs p-3 border border-gray-700 hover:shadow-sm transition-shadow">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          {activeOrderTab === "inProcess" ? (
                            <h3 className="text-sm font-semibold text-gray-500">
                              Order #{index + 1}
                            </h3>
                          ) : (
                            <p className="text-orange-500 text-xs font-medium">
                              Completed
                            </p>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-1 mb-2">
                        {item.orderDetails.map((items) => (
                          <div
                            key={items._id}
                            className="flex justify-between items-center text-gray-400 text-xs"
                          >
                            <span className="truncate max-w-[100px] sm:max-w-[160px]">
                              {items.itemName}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">
                                ×{items.itemQuantity}
                              </span>
                              <span className="font-medium text-green-400">
                               Per Item: ₹{items.itemPrice}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-500">
                        <div className="text-sm font-bold text-green-500">
                        Total:  ₹{item.orderPrice}
                        </div>
                        {activeOrderTab === "inProcess" && (
                          <button
                            className="bg-orange-500 text-gray-700 font-semibold px-2 py-1 rounded text-xs hover:bg-orange-600 transition-colors  border-orange-400 hover:shadow-inner"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {/* {filteredOrders.map((order) => (
                <div key={order.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Pending' ? 'bg-orange-500' : 
                      order.status === 'Processing' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <ul className="mb-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-300">• {item}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-400 font-bold">${order.total}</span>
                    <div className="space-x-2">
                      {order.status !== 'Completed' && (
                        <button 
                          onClick={() => completeOrder(order.id)}
                          className="text-xs bg-green-600 hover:bg-green-500 px-2 py-1 rounded transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <button className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-700 rounded-lg">
              <p className="text-gray-400">
                {activeOrderTab === "inProcess"
                  ? "No processing orders"
                  : "No completed orders"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer */}
      {/* <footer className="mt-8 bg-gray-800 text-gray-400 py-4 w-full md:hidden">
        <div className="flex flex-col items-center justify-between px-6">
          <div className="mb-4">
            <p className="text-center">
              &copy; 2025 Delicious Bites. All Rights Reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Admin2;

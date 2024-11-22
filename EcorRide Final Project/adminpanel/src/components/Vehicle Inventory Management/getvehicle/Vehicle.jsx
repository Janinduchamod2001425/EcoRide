import React, { useEffect, useState } from 'react'
import "./vehicle.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';


const Vehicle = () => {

  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getallvehicle");
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehcicles data:', error);
      }
    };
    fetchData();
  }, [])


  // Delete vehicles
  const deleteVehicle = async (vehicleId) => {
    try {

      const confirmDeletion = window.confirm('Are you sure you want to remove this vehicle');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/deletevehicle/${vehicleId}`);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== vehicleId));
      setFilteredVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== vehicleId));
      toast.success(response.data.msg, { position: "top-center", className: "alert" });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredVehicles(
      vehicles.filter(
        (vehicle) =>
          vehicle.license.toLowerCase().includes(query) ||
          vehicle.category.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.status.toLowerCase().includes(query) ||
          vehicle.price.toLowerCase().includes(query)
      )
    );
  };

  // Calculate total number of vehicles
  const totalVehicles = vehicles.length;



  // Calculate vehicle statistics
  const vehicleCategorys = {};
  vehicles.forEach(vehicle => {
    vehicleCategorys[vehicle.category] = (vehicleCategorys[vehicle.category] || 0) + 1;
  });
  // Calculate vehicle availability statistics

  const vehicleAvailability = {
    "Available": {},
    "Rented": {},
    "Not Available": {}
  };

  // Loop through vehicles to calculate availability statistics
  vehicles.forEach(vehicle => {
    const statusCategory = vehicle.status === "Available" ? "Available" : (vehicle.status === "Rented" ? "Rented" : "Not Available");
    const category = vehicle.category;

    // Initialize count for status category and type if not present
    if (!vehicleAvailability[statusCategory][category]) {
      vehicleAvailability[statusCategory][category] = 0;
    }

    // Increment count for status category and type
    vehicleAvailability[statusCategory][category]++;
  });

  // CSV data for export
  const csvData = [
    ["Total Vehicles", totalVehicles], // Add total number of vehicles
    ["Available Vehicles", Object.keys(vehicleAvailability["Available"]).length], // Add count of available vehicles
    ["Rented Vehicles", Object.keys(vehicleAvailability["Rented"]).length], // Add count of rented vehicles
    ["Not Available Vehicles", Object.keys(vehicleAvailability["Not Available"]).length], // Add count of not available vehicles
    ["Vehicle Type", "Count"],
    ...Object.entries(vehicleCategorys), // Add count of vehicles by type
    [], // Empty row for better readability
    ["License", "Category", "Model", "Status", "Price"],
    ...filteredVehicles.map((vehicle) => [vehicle.license, vehicle.category, vehicle.model, vehicle.status, vehicle.price])
  ];
  return (
    <div className='userTable1'>
      <h1 className='headingTitle1'>Vehicles Details</h1>
      <br />
      <div className='total1'>All Vehicles <br /> <span style={{ fontSize: '40px', fontFamily: 'monospace', marginTop: '20px' }}>{totalVehicles}</span> </div><br />


      <ul className='vehcielBoxes1'>
        {Object.keys(vehicleCategorys).map(category => (
          <li className='subvehcile' key={category}>{category} <br /> <span style={{ fontSize: '40px', fontFamily: 'monospace', marginTop: '30px', color: 'white' }}>{vehicleCategorys[category]}</span> </li>
        ))}
      </ul>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className='rolesBoxes1'>
        <div className='total1'>
          <h3>Available Vehicles</h3>
          <br />
          <div>
            {Object.keys(vehicleAvailability["Available"]).length.toString()} Vehicles
          </div>

        </div><br />
        {Object.keys(vehicleAvailability["Available"]).map(category => (

          <div className='subRole1' key={category}>
            <h3>{category}</h3>
            <div>
              {vehicleAvailability["Available"][category].toString()} Vehicles
            </div>
          </div>
        ))}
      </div><br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className='rolesBoxes1'>
        <div className='total1'>
          <h3>Rented <br />Vehicles</h3>
          <div>
            {Object.keys(vehicleAvailability["Rented"]).length} Vehicles
          </div>
        </div><br />
        {Object.keys(vehicleAvailability["Rented"]).map(category => (
          <div className='subRole1' key={category}>
            <h3>{category}</h3>
            <div>
              {vehicleAvailability["Rented"][category]} Vehicles
            </div>
          </div>
        ))}
      </div><br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className='rolesBoxes1'>
        <div className='total1'>
          <h3>Not Available Vehicles <br /> (Maintenance)</h3>
          <div>
            {Object.keys(vehicleAvailability["Not Available"]).length} Vehicles
          </div>
        </div><br />
        {Object.keys(vehicleAvailability["Not Available"]).map(category => (
          <div className='subRole1' key={category}>
            <h3>{category}</h3>
            <div>
              {vehicleAvailability["Not Available"][category]} Vehicles
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      <div className='search-bar1'>
        <input className='searchBox1'
          type='text'
          placeholder='🔎 Search vehicles'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Link to='http://localhost:4000/admindashboard' className='homeButton'>Back To Main Site</Link>
      <Link to='/home' className='homeButton'>Back To Home</Link>
      <Link to={"/addvehicle"} className='addButton1'>Add Vehicle</Link>
      <CSVLink data={csvData} filename={"EcoRide_vehicleReport.csv"} className='downloadButton1'>Download Report</CSVLink>
      <table border={1} cellPadding={10} cellSpacing={0}>

        <thead>
          <tr>
            <th>Id</th>
            <th>License</th>
            <th>Category</th>
            <th>Model</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {
            filteredVehicles.map((vehicle, index) => {
              return (
                <tr key={vehicle._id}>
                  <td>{index + 1}</td>
                  <td>{vehicle.license}</td>
                  <td>{vehicle.category}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.price}</td>
                  <td className='actionButtons1'>
                    <button onClick={() => deleteVehicle(vehicle._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                    <Link to={`/editvehicle/` + vehicle._id}>Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}


export default Vehicle;
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./editvehicle.css";
import axios from 'axios';
import toast from 'react-hot-toast';

const EditVehicle = () => {

  // State Initialization and Parameter Retrieval 
  // vehicle : Initial state for user data fields.
  const vehicles = {
    license: "",
    category: "",
    model: "",
    status: "",
    price: "",
  }
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    // If category changes, update price
    if (name === 'category') {
        const priceMap = {
            "E-Car": 5000.00,
            "E-Van": 7000.00,
            "E-Bike": 3000.00,
            "E-Tuktuk": 4000.00
        };
        setVehicle({ ...vehicle, [name]: value, price: priceMap[value] || 0 });
    } else {
        setVehicle({ ...vehicle, [name]: value });
    }
}

  // useParams(): React hook to retrieve parameters from the URL, in this case, the id.
  const { id } = useParams();

  // useNavigate(): Hook from React Router for navigation.
  const navigate = useNavigate();

  // useState(): Hook to initialize state, user stores user data retrieved from the API.
  const [vehicle, setVehicle] = useState(vehicles);




  // useEffect(): React hook for handling side effects in function components. Here, it fetches user data based on the id parameter when the component mounts or when id changes.
  useEffect(() => {

    // axios.get(): Fetches user data from the specified API endpoint.
    axios.get(`http://localhost:8000/api/getonevehicle/${id}`)
      .then((response) => {
        //setUser(): Updates the user state with the received data.
        setVehicle(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id])

  // 
  const submitForm = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:8000/api/updatevehicle/${id}`, vehicle)
      .then((response) => {
        // toast.success(): Displays a success message 
        toast.success(response.data.msg, { position: "top-center", className: "alert" });
        navigate("/vehicle");
      }).catch(error => console.log(error));
  }

  // JSX Rendering the form
  return (
    <div className='addVehicle'>
      <Link to={"/vehicle"} className='backHome1'>Back to Home</Link>
      <h3>Update Vehicle</h3>
      <form className='addVehicleForm1' onSubmit={submitForm}>
        <div className='inputGroup1'>
          <label htmlFor="license">License</label>
          <input type="text" onChange={inputChangeHandler} value={vehicle.license} name="license" id="license" placeholder='License Plate No' />
        </div>
        <div className='inputGroup1'>
          <label htmlFor='category'>Category</label>
          <select
            className='inputGroup1'
            name='category'
            id='category'
            value={vehicle.category}
            onChange={inputChangeHandler}
            required
          >
            <option value='' disabled>
              Select vehicle category
            </option>
            <option value='E-Car'>E-Car</option>
            <option value='E-Van'>E-Van</option>
            <option value='E-Bike'>E-Bike</option>
            <option value='E-Tuktuk'>E-Tuktuk</option>
          </select>
        </div>
        <div className='inputGroup1'>
          <label htmlFor="model">Model</label>
          <input type="text" onChange={inputChangeHandler} value={vehicle.model} name="model" id="model" placeholder='Model' />
        </div>

        <div className='inputGroup1'>
          <label htmlFor='status'>Status</label>
          <select
            className='inputGroup1'
            name='status'
            id='status'
            value={vehicle.status}
            onChange={inputChangeHandler}
            required
          ><option value='' disabled>
              Select Status
            </option>
            <option value='Available'>Available</option>
            <option value='Not Available'>Not Available</option>
            <option value='Rented'>Rented</option>
          </select>
        </div>
        <div className='inputGroup1'>
          <label htmlFor='price'>Price</label>
          <input type='text' name='price' id='price' value={vehicle.price} readOnly />
        </div>

        <div className='inputGroup1'>
          <button type='submit'>Add Vehicle</button>
        </div>
      </form>

    </div>
  )
}

export default EditVehicle;
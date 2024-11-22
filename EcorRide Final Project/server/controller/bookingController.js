import Booking from '../model/bookingModel.js';

// C - Create (create a new reservation)
export const create = async (req, res)  => {
    try {
        const bookingData = new Booking(req.body);

        // check if the user exist
        if(!bookingData) {
            return res.status(404).json({msg: "Booking not found"});
        }

        const savedData = await bookingData.save();
        res.status(200).json({ msg: "Booking Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read (Read all reservations)
export const getAll = async (req, res) => {
    try {
        const bookingData = await Booking.find();

        // check if the booking exist
        if(!bookingData) {
            return res.status(404).json({msg: "Booking not found"});
        }

        // Display all bookings
        res.status(200).json(bookingData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read (Read paticular booking by id)
export const getOne =  async (req, res) => {
    try {
        
        // get the booking id
        const id = req.params.id;

        // pass the id to the function
        const bookingExist = await Booking.findById(id);

        // check if the booking exist
        if(!bookingExist) {
            return res.status(404).json({msg: "Booking not found"});
        }

        // Display the booking according to the id
        res.status(200).json(bookingExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update (Update paticular booking by id)
export const updateBooking = async (req, res) => {
    try {
        // get the user id
        const id = req.params.id;

        // pass the id to the function
        const bookingExist = await Booking.findById(id);

        // check if the booking exist
        if(!bookingExist) {
            return res.status(404).json({msg: "Booking not found"});
        }

        // Update the booking data
        const updateData = await Booking.findByIdAndUpdate(id, req.body, {new:true});

        // Display the updated data
        res.status(200).json({msg: "Booking Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete (Delete booking)
export const deleteBooking = async (req, res) => {
    try {
        // get the user id
        const id = req.params.id;

        // pass the id to the function
        const bookingExist = await Booking.findById(id);

        // check if the booking exist
        if(!bookingExist) {
            return res.status(404).json({msg: "Booking not found"});
        }

        // Delete the booking
        await Booking.findByIdAndDelete(id);
        res.status(200).json({msg: "Booking deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}
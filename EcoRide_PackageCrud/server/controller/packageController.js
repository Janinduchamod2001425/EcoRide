import Package from '../model/packageModel.js';
import Excel from 'exceljs';
import CusPackage from '../model/cuspackageModel.js';


// ____________________________________C - Create (create a new package)___________________________________
//validation for price field
const validatePrice = (price) => {
    return !isNaN(price);// NaN (Not-a-Number)
};
export const create = async (req, res) => {
    try {
        //validation
        const { packname, description, duration,vehicletype,price } = req.body; 
    if (!packname || !description || !duration || !vehicletype || isNaN(price)) {
        return res.status(400).json({ error1: 'All fields are required.' });
    }

     // Validate the price field
        if (!validatePrice(price)) {
            return res.status(400).json({ error2: 'Price must be numeric.' });
        }
        const packageData = new Package(req.body);

        // check if the package exist
        if (!packageData) {
            return res.status(404).json({ msg: "Package not found" });
        }

        const savedData = await packageData.save();
        res.status(200).json({ msg: "Package Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}




// _______________________________________R - Read (Read all packages)___________________________________

export const getAll = async (req, res) => {
    try {
        let packageData;
        const { firstLetter } = req.query;
        

        if (firstLetter) {
            packageData = await Package.find({packname: { $regex: `^${firstLetter}`, $options: 'i' } });


        }


        else {
            packageData = await Package.find();
        }

        // check if any packages exist
        if (!packageData || packageData.length === 0) {
            return res.status(404).json({ msg: "No packages found" });
        }

        // Display all packages
        res.status(200).json(packageData);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
//________________________________getCusPackage___________________________________


export const getAllcus = async (req, res) => {
    try {
        let cuspackageData;
        const { firstLetter } = req.query;

        if (firstLetter) {
            cuspackageData = await CusPackage.find({category: { $regex: `^${firstLetter}`, $options: 'i' } });


        } else {
            
            cuspackageData = await CusPackage.find();
        }

        // Check if any packages exist
        if (!cuspackageData || cuspackageData.length === 0) {
            return res.status(404).json({ msg: "No packages found" });
        }

        // Send back the list of packages
        res.status(200).json(cuspackageData);
    } catch (error) {
        // Handle errors and send back the error response
        res.status(500).json({ error: error.toString() });
    }
};


// ________________________________________R - Read (Read paticular package by id)____________________________

export const getOne = async (req, res) => {
    try {

        // get the package id
        const id = req.params.id;

        // pass the id to the function
        const packageExist = await Package.findById(id);

        // check if the package exist
        if (!packageExist) {
            return res.status(404).json({ msg: "Package not found" });
        }

        // Display the package according to the id
        res.status(200).json(packageExist);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


// _____________________________________U - Update (Update paticular package by id)_________________________________

export const updatePackage = async (req, res) => {
    try {
        // get the package id
        const id = req.params.id;

        // pass the id to the function
        const packageExist = await Package.findById(id);

        // check if the package exist
        if (!packageExist) {
            return res.status(404).json({ msg: "Package not found" });
        }

        // Update the package data
        const updateData = await Package.findByIdAndUpdate(id, req.body, { new: true });

        // Display the updated data
        res.status(200).json({ msg: "Package Updated Successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}




// ___________________________D - Delete (Delete package)_______________________________________________________

export const deletePackage = async (req, res) => {
    try {
        // get the package id
        const id = req.params.id;

        // pass the id to the function
        const packageExist = await Package.findById(id);

        // check if the package exist
        if (!packageExist) {
            return res.status(404).json({ msg: "Package not found" });
        }

        // Delete the package
        await Package.findByIdAndDelete(id);
        res.status(200).json({ msg: "Package deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// ___________________________D - Delete (Delete cuspackage)_______________________________________________________

export const deleteCusPackage = async (req, res) => {
    try {
        // get the package id
        const cusid = req.params.cusid;

        // pass the id to the function
        const cuspackageExist = await CusPackage.findById(cusid);

        // check if the package exist
        if (!cuspackageExist) {
            return res.status(404).json({ msg: "Package not found" });
        }

        // Delete the package
        await CusPackage.findByIdAndDelete(cusid);
        res.status(200).json({ msg: "Package deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}





//__________________________download Report__________________________________________________________________________________________

export const downloadReport = async (req, res) => {
    try {
        const packages = await Package.find();

        // Create Excel workbook and worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('CusPackages');

        // Define headers for Excel file
        worksheet.columns = [
            { header: 'Package ID', key: 'id', width: 30 },
            { header: 'Name', key: 'packname', width: 20 },
            { header: 'Description', key: 'description', width: 60 },
            { header: 'Vehicle Type', key: 'vehicletype', width: 20 },
            { header: 'Duration', key: 'duration', width: 15 },
            { header: 'Price', key: 'price', width: 15 },

        ];


        // Make header row bold
        worksheet.getRow(1).font = { bold: true };

        // Add data to the worksheet
        packages.forEach((pack) => {
            worksheet.addRow({
                id: pack._id,
                packname: pack.packname,
                description: pack.description,
                vehicletype: pack.vehicletype,
                duration: pack.duration,
                price: pack.price,
                // Add more columns' data as needed
            });
        });

        // Set response headers for Excel download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=packages.xlsx');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Error generating report' });
    }
};

//__________________________download CusReport__________________________________________________________________________________________

export const downloadCusReport = async (req, res) => {
    try {
        const cuspackages = await CusPackage.find();

        // Create Excel workbook and worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('CusPackages');

        // Define headers for Excel file
        worksheet.columns = [
            { header: 'Package ID', key: 'id', width: 30 },
            { header: 'User Name', key: 'customerName', width: 30 },
            { header: 'Description', key: 'description', width: 60 },
            { header: 'Require Date', key: 'require_date', width: 60 },
            { header: 'Category', key: 'category', width: 60 },
            { header: 'Features', key: 'features', width: 60 },
            { header: 'Vehicle Type', key: 'vehicletype', width: 20 },
            { header: 'Model', key: 'model', width: 20 },
            { header: 'Services', key: 'services', width: 20 },
            { header: 'Color', key: 'color', width: 20 },
            { header: 'Duration', key: 'duration', width: 15 },
            { header: 'Price', key: 'totalPrice', width: 15 },
        ];

        // Make header row bold
        worksheet.getRow(1).font = { bold: true };

        // Add data to the worksheet
        cuspackages.forEach((cuspack) => {
            worksheet.addRow({
                id: cuspack._id,
                userInfo:cuspack.userInfo,
                description: cuspack.description,
                require_date: cuspack.require_date,
                category: cuspack.category,
                features: cuspack.features,
                vehicletype: cuspack.vehicletype,
                model: cuspack.model,
                services: cuspack.services,
                color: cuspack.color,
                duration: cuspack.duration,
                totalPrice: cuspack.totalPrice,
                // Add more columns' data as needed
            });
        });

        // Set response headers for Excel download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=packages.xlsx');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Error generating report' });
    }
};



//_________________________________________________Package count______________________________________________

export const getCount = async (req, res) => {
    try {
        const count = await Package.countDocuments(); // Use Mongoose's countDocuments() method
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//_________________________________________________CusPackage count______________________________________________

export const getCusCount = async (req, res) => {
    try {
        const count = await CusPackage.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

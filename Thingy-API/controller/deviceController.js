const db = require('../models');

const getAllDevices = async (req, res) => {
    try {
        const devices = await db.Device.findAll({
            where: { user_id: req.user.userId }
        });
        res.json(devices);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getDevice = async (req, res) => {
    try {
        const device = await db.Device.findOne({
            where: {
                device_id: req.params.deviceId,
                user_id: req.user.userId
            }
        });

        if (!device) {
            return res.status(404).send('Device not found');
        }

        res.json(device);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createDevice = async (req, res) => {
    try {
        const { name, location,description } = req.body;
        const newDevice = await db.Device.create({
            name,
            location,
            description,
            user_id: req.user.userId
        });
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateDevice = async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const [updated] = await db.Device.update({ name, location, description }, {
            where: {
                device_id: req.params.deviceId,
                user_id: req.user.userId
            }
        });

        if (updated) {
            const updatedDevice = await db.Device.findOne({ where: { device_id: req.params.deviceId } });
            return res.status(200).json(updatedDevice);
        }
        
        throw new Error('Device not found');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// const deleteDevice = async (req, res) => {
//     try {
//         const deleted = await db.Device.destroy({
//             where: {
//                 device_id: req.params.deviceId,
//                 user_id: req.user.userId
//             }
//         });
//         if (deleted) {
//             return res.status(204).send("Device deleted");
//         }
//         throw new Error("Device not found");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

module.exports = {
    getAllDevices,
    getDevice,
    createDevice,
    updateDevice,
    //deleteDevice
};

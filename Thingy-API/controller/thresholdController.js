const db = require('../models');

const getThreshold = async (req, res) => {
    try {
        const threshold = await db.Threshold.findOne({
            where: {
                device_id: req.params.deviceId,
            }
        });

        if (!threshold) {
            return res.status(404).send('Threshold not found for this device');
        }

        res.json(threshold);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createOrUpdateThreshold = async (req, res) => {
    try {
        const { temp_max, temp_min, humidity_max, humidity_min, co2_max, co2_min } = req.body;

        let threshold = await db.Threshold.findOne({
            where: {
                device_id: req.params.deviceId,
            }
        });

        if (!threshold) {
            // If no threshold exists, create a new one
            threshold = await db.Threshold.create({
                temp_max,
                temp_min,
                humidity_max,
                humidity_min,
                co2_max,
                co2_min,
                device_id: req.params.deviceId
            });
        } else {
            // If a threshold exists, update it
            threshold = await threshold.update({
                temp_max,
                temp_min,
                humidity_max,
                humidity_min,
                co2_max,
                co2_min,
            });
        }

        res.status(201).json(threshold);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteThreshold = async (req, res) => {
    try {
        const threshold = await db.Threshold.findOne({
            where: {
                device_id: req.params.deviceId,
            }
        });

        if (!threshold) {
            return res.status(404).send('Threshold not found for this device');
        }

        await threshold.destroy();
        res.status(204).send('Threshold deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getThreshold,
    createOrUpdateThreshold,
    deleteThreshold,
};

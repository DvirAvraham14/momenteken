const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db_connection = require('../module/db');



router.get('/get_options', (req, res) => {

    const query = `SELECT id,company_name FROM company`;
    db_connection.query(query, (error, result) => {
        if (error) {
            res.status(400).json({ error });
        } else {
            console.log(result)
            res.status(200).json(result);
        }
    });
});

router.get('/get_company/:page?', (req, res) => {
    const page = req.params.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM company LIMIT ${limit} OFFSET ${offset}`;
    db_connection.query(query, (error, result) => {
        if (error) {
            res.status(400).json({ error });
        } else {
            console.log(result)
            res.status(200).json(result);
        }
    });
});

router.get('/get_mangers/:companyID', (req, res) => {
    const companyID = req.params.companyID;
    console.log(companyID)
    const query = `SELECT * FROM company_manger WHERE company_id = ${companyID}`;
    db_connection.query(query, (error, result) => {
        if (error) {
            res.status(400).json({ error });
        } else {
            console.log(result)
            res.status(200).json(result);
        }
    });
});


router.post('/add_mangers', function(req, res, next) {
    const managers = req.body.Manager;
    const company_id = req.body.company;

    managers.forEach((manager) => {
        const query = 'INSERT INTO `company_manger` (`company_id`, `first_name`, `last_name`, `manger_id`, `address`, `remarks`)' +
            ' VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            company_id,
            manager.first_name,
            manager.last_name,
            manager.manger_id,
            manager.address,
            manager.remarks,
        ];

        db_connection.query(query, values, (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error inserting managers' });
            } else {
                console.log(`Inserted manager with ID: ${result.insertId}`);
            }
        });
    });

    res.status(200).json({ message: 'Managers inserted successfully' });
});

router.post('/add_site/step1', async function (req, res, next) {
    try {
        const {
            site_name,
            promoter_id,
            operator_id,
            operator_stamp,
            operator_signature,
            max_employees,
            work_type,
            contractors
        } = req.body;

        // Insert the site data into the site table
        const siteQuery = 'INSERT INTO site (site_name, promoter_id, operator_id, operator_stamp, operator_signature, max_employees, work_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const siteValues = [site_name, promoter_id, operator_id, operator_stamp, operator_signature, max_employees, work_type];

        // Execute the site query
        const siteResult = await new Promise((resolve, reject) => {
            db_connection.query(siteQuery, siteValues, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        const siteId = siteResult.insertId;
        console.log(`Inserted site with ID: ${siteId}`);

        // Insert the contractors into the contractors table
        for (const obj of contractors) {
            const contractorsQuery =
                'INSERT INTO Subcontractors (site_id, work_type, address, person_in_charge, start_of_work, signature) VALUES (?, ?, ?, ?, ?, ?)';
            const contractorsValues = [siteId, obj.job, obj.address, obj.inCharge, obj.start_date, obj.signature];
            await db_connection.query(contractorsQuery, contractorsValues);
        }

        res.status(200).json({ message: 'Site and contractors added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the site and contractors' });
    }
});


router.post('/add_company', function(req, res, next) {
    let data = req.body;

    const { error, value } = validateCompanyData(data);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const query = 'INSERT INTO `company` (`company_name`, `city`, `zip_code`, `street`, `house_number`, `email`, `phone`, `mobile`, `fax`)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            data.c_name,
            data.c_city,
            data.c_zip,
            data.c_street,
            data.c_house_number,
            data.c_email,
            data.c_phone,
            data.m_preffix + data.c_mobile,
            data.c_fax
        ];

        db_connection.query(query, values, (error, results) => {
            if (error) {
                res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
            } else {
                res.status(200).json({ message: 'Company added successfully.' });
            }
        });
    }
});


const validateCompanyData = (data) => {
    const schema = Joi.object({
        c_name: Joi.string().min(3).max(20).required(),
        c_city: Joi.string().min(3).max(20).required(),
        c_zip: Joi.string().min(4).max(10).pattern(/^\d+$/).required(),
        c_street: Joi.string().min(3).max(20).required(),
        c_house_number: Joi.string().min(1).max(3).pattern(/^\d+$/).required(),
        c_email: Joi.string().email().required(),
        c_phone: Joi.string().required(),
        c_mobile: Joi.string().allow('').optional(),
        m_preffix: Joi.string().allow('').optional(),
        c_fax: Joi.string().allow('').optional(),
    });

    return schema.validate(data);
};


module.exports = router;



import { pool } from "../db/db.js";

const getSale = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        }
        const query = `SELECT * FROM salesrecord where id= ${id}`;
        const data = await pool.query(query);
        if (data[0].length <= 0) {
            return res.status(404).json({ success: false, message: "Data Not Found" });
        }

        return res.status(200).json({ success: true, message: "Data Fetched", data: data[0] });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

const updateSale = async (req, res) => {
    try {
        const { id, salesCost } = req.body;
        if (!id || !salesCost) {
            return res.status(400).json({ success: false, message: "All Fields are required" });
        }

        const timestamp = new Date();
        console.log(timestamp);
        const formattedTimestamp = timestamp.toISOString().slice(0, 19).replace('T', ' ');

        const query = `UPDATE salesrecord set salesCost= ${salesCost} , last_updated='${formattedTimestamp}'  where id= ${id} `;
        const data = await pool.query(query);
        if (data[0].affectedRows == 0) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const updatedData = await pool.query(`SELECT * FROM salesrecord where id= ${id}`);
        return res.status(200).json({ success: true, message: "Update Successful", updatedData: updatedData[0] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", Error: error.message });
    }
}

const getUpdatedData = async(req,res) => {
    try {
        const currentTime = new Date();
        const oneMinuteAgo = new Date(currentTime.getTime() - 3 * 1000);
        const sinceTime = oneMinuteAgo.toISOString().slice(0,19).replace('T', ' ');
        const query = `SELECT * FROM salesrecord where last_updated > '${sinceTime}'`;
        const data = await pool.query(query);
        if(data[0].length <=0){
            return res.status(404).json({ success: false, message: "Data Not Found" });
        }

        return res.status(200).json({ success: true, data: data[0] });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", Error: error.message });
    }
}

export { getSale, updateSale, getUpdatedData };
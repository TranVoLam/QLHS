const { request } = require('express')
const sql = require('mssql/msnodesqlv8')
require('dotenv').config()

const sqlConfig = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    pool: {
        max: 10,
        min: 1,
        idleTimeoutMillis: 3000
    },
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        connectionTimeout: 30000
    }, 
    driver: "msnodesqlv8"
}


getRequest = async () => {
    try {
        const pool = await sql.connect(sqlConfig)
        if (pool.connected) {
            console.log('Connected successfully!')
            return pool.request()
        } 
    } catch(err) {
        console.log(`connection: ${err}!`)
    }
}

executeQuery = async (query, params = {}) => {
    try {
        const request = await getRequest()
        for(const [key, { type, value }] of Object.entries(params)) {
            request.input(key, type, value)
        }
        const result = await request.query(query)
        // console.log(`db: ${Array.isArray(result.recordset)}  - result: ${result.recordset == ''}`)
        return result.recordset
    } catch(err) {
        console.log(`exe: ${err}!`)
    }
}

executeSP = async(sp, params = {}, output = {}) => {
    try {
        const request = await getRequest()
        for(const [key, { type, value }] of Object.entries(params)) {
            request.input(key, type, value)
        }
        for(const [key, value] of Object.entries(output)) {
            request.output(key, value)
        }
        const result = await request.execute(sp)
        if (result.recordset != [])
            // console.log(result)
            return result.recordset
    } catch(err) {
        console.log(`sp: ${err}`)
    }
}

nvarchar = (n) => sql.NVarChar(n)
varchar = (n) => sql.VarChar(n)

module.exports = {
    getRequest,
    executeQuery,
    executeSP,
    types: {
        int: sql.Int,
        date: sql.Date,
        bit: sql.Bit,
        varchar,
        nvarchar
    }
}


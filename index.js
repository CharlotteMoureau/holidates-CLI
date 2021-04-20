#!/usr/bin/env node

const axios = require('axios')
const { getCode } = require('country-list')

const url = 'https://date.nager.at/api/v2/publicholidays'

const cliArg = process.argv.slice(2)
const today = new Date()
let year = today.getFullYear()

if (cliArg.length > 1) {
    year = cliArg[1]
}

const countryCode = getCode(cliArg[0])

async function getHolidays() {
    try {
        const response = await axios.get(`${url}/${year}/${countryCode}`)
        let holiday = response.data
        holiday.forEach(singleHoliday => {
            console.log(`${singleHoliday.name}: ${singleHoliday.date}`)
        })
    } catch (error) {
        console.log(error)
    }
}

getHolidays()
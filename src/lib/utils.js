const { writeJSON, readJSON } = require("fs-extra")
const {join} = require("path")
const attendeesPath = join(__dirname,"../services/attendees/attendees.json")

const readDB = async filePath => {
  try {
    const fileJSON = await readJSON(filePath)
    console.log(fileJSON)
    return fileJSON
  } catch (error) {
   console.log(error)
  }
}

const writeDB = async (filePath, data) => {
  //writing on disk
  try {
    console.log(filePath)
    await writeJSON(filePath, data)
  } catch (error) {
   console.log(error)
  }
}

module.exports = {
  readDB,
  writeDB,
  getGuestList: async () => readDB(attendeesPath),
  writeGuestList: async (guestData) => writeDB(attendeesPath, guestData),
  // getUsers
  // getBooks

}
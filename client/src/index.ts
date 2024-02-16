import axios from "axios"

const SERVER_URL = "http://localhost:4000"
const CLIENT_ID = ""
const CLIENT_SECRET = ""

const main = () => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
  axios
    .get(SERVER_URL, { headers: { Authorization: `Basic ${auth}` } })
    .then((res) => console.log(res.data))
}
main()

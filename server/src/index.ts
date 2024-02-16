import express from "express"
import axios from "axios"

const PORT = 4000
const KEYCLOAK_URL = "http://localhost:8080"
const REALM = "master"

const basicAuthMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send("Authorization header is missing")
  }

  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
  const [clientId, clientSecret] = credentials.split(":")

  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      `grant_type=client_credentials`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    )

    if (response.data.access_token) {
      next()
    } else {
      return res.status(403).send("Access Denied")
    }
  } catch (error) {
    return res.status(403).send("Invalid credentials")
  }
}

const main = () => {
  const app = express()
  app.use(basicAuthMiddleware)
  app.get("/", (_req, res) => {
    res.send("Hello World")
  })
  app.listen(PORT, () => console.log(`Start: http://localhost:${PORT}`))
}
main()

import { sessionOptions, User } from "lib/user"
import { withIronSessionApiRoute } from "iron-session/next"
import { stringToInt } from "lib/utils"

export default withIronSessionApiRoute(async function Login(req, res) {
  const { phone } = JSON.parse(req.body) as { phone: string }
  const body = JSON.stringify({ phone: `+1${stringToInt(phone)}` })
  // console.log({ body })
  const resp = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    // @ts-ignore
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body,
  })
  if (resp.status === 200) {
    const data: User = await resp.json()
    if (data.id > 0) {
      req.session.user = data
      await req.session.save()
      res.status(200).json(data)
      return
    }
  }
  res.status(500).json({ error: "Login failed" })
}, sessionOptions)

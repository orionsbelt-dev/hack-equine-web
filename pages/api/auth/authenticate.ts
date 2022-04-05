import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions, User } from "lib/user"

export default withIronSessionApiRoute(async function authRoute(req, res) {
  const { passcode } = JSON.parse(req.body) as {
    passcode: string
  }
  const resp = await fetch(`${process.env.API_URL}/authenticate`, {
    method: "POST",
    // @ts-ignore
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: req.session.user?.phone, passcode }),
  })
  if (resp.status === 200) {
    const data: User = await resp.json()
    if (data.id > 0) {
      req.session.user = { ...req.session.user, ...data }
      await req.session.save()
      res.status(200).json(data)
      return
    }
  }
  res.status(500).json({ error: "Authentication failed" })
}, sessionOptions)

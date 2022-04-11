import { sessionOptions, User } from "lib/user"
import { withIronSessionApiRoute } from "iron-session/next"
import { stringToInt, apiRequest } from "lib/utils"

export default withIronSessionApiRoute(async function SignUp(req, res) {
  const { name, email, phone } = JSON.parse(req.body) as {
    name: string
    email: string
    phone: string
  }
  const body = JSON.stringify({
    name,
    email,
    phone: `+1${stringToInt(phone)}`,
  })
  const resp = await apiRequest("/signup", "POST", {}, body)
  if (resp.status === 200) {
    const data: User = await resp.json()
    if (data.id > 0) {
      req.session.user = data
      await req.session.save()
      res.status(200).json(data)
      return
    }
  }
  res.status(500).json({ error: "Sign up failed" })
}, sessionOptions)

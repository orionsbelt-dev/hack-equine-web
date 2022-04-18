import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/user"
import { apiRequest } from "lib/utils"
import { Barn } from "lib/barn"

export default withIronSessionApiRoute(async function Barn(req, res) {
  const { name } = JSON.parse(req.body) as {
    name: string
  }
  const resp = await apiRequest(
    `/barn`,
    "POST",
    {
      "x-session-token": req.session.user?.session_token,
    },
    JSON.stringify({
      name,
      user_id: req.session.user?.id,
    })
  )
  const data = (await resp.json()) as {
    barn?: Barn
    error?: string
  }
  if (resp.status !== 200) {
    res.status(resp.status).json({ error: data.error })
    return
  }
  res.status(200).json(data.barn)
}, sessionOptions)

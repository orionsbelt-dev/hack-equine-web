import { apiRequest, insertAt } from "lib/utils"
import { Barn } from "lib/barn"
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/user"

export default withIronSessionApiRoute(async function (req, res) {
  const query = req.query as {
    userID: string
  }
  const resp = await apiRequest(`/user/${query.userID}/barns`, "GET", {
    "x-session-token": req.session.user?.session_token,
  })
  const data = (await resp.json()) as {
    barns?: Barn[]
    error?: string
  }
  if (resp.status !== 200) {
    res
      .status(resp.status)
      .json({ error: "Failed to get barns: " + data.error })
    return
  }
  const barns = Array<Barn>()
  data.barns?.forEach((barn) => {
    if (barn.is_primary) {
      insertAt(barns, 0, barn)
    } else {
      barns.push(barn)
    }
  })
  res.status(200).json(barns)
}, sessionOptions)

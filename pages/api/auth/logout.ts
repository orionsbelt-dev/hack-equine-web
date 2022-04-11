import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/user"
import { apiRequest } from "lib/utils"

export default withIronSessionApiRoute(async (req, res) => {
  const body = JSON.stringify({
    session_token: req.session.user?.session_token,
  })
  const resp = await apiRequest("/logout", "POST", {}, body)
  if (resp.status !== 200) {
    console.error("Logout failed.", resp)
  }
  console.log({
    logoutRespStatus: resp.status,
    logoutRespStatusText: resp.statusText,
  })
  req.session.destroy()
  res.status(resp.status).redirect("/login")
}, sessionOptions)

import { Router } from "express"
import express from "express"
import path from "path"

const router = Router()

router.use((request, response, next) => {
  if (request.accepts(["text/html", "application/xhtml+xml", "text/event-stream"])) {
    next()
  } else {
    response.sendStatus(422)
  }
})

router.get("/kanban", (_request, response) => {
  const fixture = path.join(__dirname, "../tests/fixtures/kanban.html")

  response.status(200).sendFile(fixture)
})

const app = express()

app.use(express.static("."))
app.use(router)

app.listen(9000, "0.0.0.0", () => {
  console.log("Test server listening on port 9000")
})

export const TestServer = router

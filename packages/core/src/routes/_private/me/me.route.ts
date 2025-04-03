import { Router } from "express";

const router = Router();

router.get("/me", async (req, res) => {
  if (!req.user) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }

  const { sessionId, email } = req.user;
  res.send({
    email,
    sessionId,
  });
});

export default router;

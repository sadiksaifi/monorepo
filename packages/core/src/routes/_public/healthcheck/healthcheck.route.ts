import { Router } from "express";

const router = Router();

router.get("/healthcheck", async (req, res) => {
  res.send({
    message: "Healthy",
  });
});

export default router;

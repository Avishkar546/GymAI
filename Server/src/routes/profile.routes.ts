import { Router, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.js";

const profileRouter = Router();

// GET profile
profileRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// POST/UPSERT profile
profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, goal, experience, daysPerWeek, sessionLength, equipment, injuries, preferredSplit } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "bad request" });
    }

    if (
      !goal ||
      !experience ||
      !daysPerWeek ||
      !sessionLength ||
      !equipment ||
      preferredSplit === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const profile = await prisma.user_profiles.upsert({
      where: { user_id: userId },
      update: {
        goal,
        experience,
        days_per_week: daysPerWeek,
        session_length: sessionLength,
        equipment,
        injuries: injuries || null,
        preferred_split: preferredSplit,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        goal,
        experience,
        days_per_week: daysPerWeek,
        session_length: sessionLength,
        equipment,
        injuries: injuries || null,
        preferred_split: preferredSplit,
      },
    });

    res.status(201).json({ message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

export default profileRouter;

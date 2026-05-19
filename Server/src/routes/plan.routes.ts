import { Router, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.js";

const planRouter = Router();

// Simple workout plan generator based on user profile
function generateWorkoutPlan(profile: any) {
  const days = profile.days_per_week;
  const split = profile.preferred_split;
  const experience = profile.experience;

  const exercises: { [key: string]: string[] } = {
    chest: ["Bench Press", "Incline Press", "Dumbbell Flyes", "Cable Crossovers"],
    back: ["Barbell Rows", "Pull-ups", "Lat Pulldowns", "Face Pulls"],
    shoulders: ["Overhead Press", "Lateral Raises", "Reverse Flyes", "Upright Rows"],
    legs: ["Squats", "Leg Press", "Leg Curls", "Calf Raises"],
    biceps: ["Barbell Curls", "Dumbbell Curls", "Machine Curls", "Concentration Curls"],
    triceps: ["Tricep Dips", "Rope Pushdowns", "Skull Crushers", "Close Grip Press"],
  };

  let plan: any = {};

  if (split === "full_body") {
    for (let i = 1; i <= days; i++) {
      plan[`Day ${i}`] = [
        ...exercises.chest.slice(0, 2),
        ...exercises.back.slice(0, 2),
        ...exercises.legs.slice(0, 2),
      ];
    }
  } else if (split === "upper_lower") {
    for (let i = 1; i <= days; i++) {
      if (i % 2 === 1) {
        // Upper body
        plan[`Day ${i} (Upper)`] = [
          ...exercises.chest.slice(0, 2),
          ...exercises.back.slice(0, 2),
          ...exercises.shoulders.slice(0, 1),
        ];
      } else {
        // Lower body
        plan[`Day ${i} (Lower)`] = [...exercises.legs.slice(0, 3)];
      }
    }
  } else if (split === "ppl") {
    // Push/Pull/Legs
    const dayTypes = ["Push", "Pull", "Legs"];
    for (let i = 1; i <= days; i++) {
      const dayType = dayTypes[(i - 1) % 3];
      if (dayType === "Push") {
        plan[`Day ${i} (Push)`] = [
          ...exercises.chest.slice(0, 2),
          ...exercises.shoulders.slice(0, 2),
          ...exercises.triceps.slice(0, 1),
        ];
      } else if (dayType === "Pull") {
        plan[`Day ${i} (Pull)`] = [
          ...exercises.back.slice(0, 2),
          ...exercises.biceps.slice(0, 2),
        ];
      } else {
        plan[`Day ${i} (Legs)`] = [...exercises.legs.slice(0, 3)];
      }
    }
  } else {
    // Custom - Let AI decide (using full body for now)
    for (let i = 1; i <= days; i++) {
      plan[`Day ${i}`] = [
        ...exercises.chest.slice(0, 2),
        ...exercises.back.slice(0, 2),
        ...exercises.legs.slice(0, 1),
      ];
    }
  }

  return {
    workoutPlan: plan,
    duration: profile.session_length,
    frequency: profile.days_per_week,
    split: profile.preferred_split,
    notes: `This is a ${experience} level plan. Adjust weights and volume based on your comfort level.`,
  };
}

// Generate plan
planRouter.post("/generate", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const plan = generateWorkoutPlan(profile);

    res.status(200).json({ message: "Plan generated successfully", plan });
  } catch (error) {
    console.error("Error generating plan:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

export default planRouter;

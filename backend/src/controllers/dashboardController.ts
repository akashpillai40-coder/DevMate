import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    // Days Active

    const uniqueDays = new Set(
      checkIns.map((checkIn) => checkIn.date.toISOString().split("T")[0]),
    );

    const daysActive = uniqueDays.size;

    // LeetCode

    const leetCodeSolved = checkIns.filter(
      (checkIn) => checkIn.leetCode,
    ).length;

    // GitHub

    const githubCommits = checkIns.filter((checkIn) => checkIn.gitPush).length;

    // Recent Activity

    const recentActivity: {
      title: string;
      category: string;
      date: Date;
    }[] = [];

    for (const checkIn of checkIns) {
      if (checkIn.todayLog?.trim()) {
        recentActivity.push({
          title: checkIn.todayLog,
          category: "Daily Check-in",
          date: checkIn.date,
        });
      }

      if (checkIn.leetCode && checkIn.leetCodeProblem) {
        recentActivity.push({
          title: `Solved ${checkIn.leetCodeProblem}`,
          category: "DSA",
          date: checkIn.date,
        });
      }

      if (checkIn.gitPush) {
        recentActivity.push({
          title: "GitHub activity",
          category: "GitHub",
          date: checkIn.date,
        });
      }
    }

    recentActivity.sort((a, b) => b.date.getTime() - a.date.getTime());

    res.json({
      stats: {
        daysActive,
        leetCodeSolved,
        githubCommits,
      },
      recentActivity: recentActivity.slice(0, 5),
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

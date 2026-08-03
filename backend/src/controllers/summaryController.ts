import { Request, Response } from "express";
import prisma from "../config/prisma";
import { generateWeeklySummary } from "../services/sarvamAIServices"

     
const getWeekBounds = () => {
    
    const now = new Date()   //2026-08-03T05:15:30.123Z
    const day = now.getUTCDay();  //03
    const dayToMonday = day === 0 ? -6 : 1 - day

    const weekStart = new Date(now)
    weekStart.setUTCDate(now.getUTCDate() + dayToMonday)
    weekStart.setUTCHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6)
    weekEnd.setUTCHours(23, 59, 59, 999)
   

    return { weekStart, weekEnd}
}

      //----------------Weekly Summary Day 01 - 07---------------//
export const generateSummary = async(req: Request, res: Response)=> {
    try{
  
         const { weekStart, weekEnd } = getWeekBounds();

    const weeklyCheckIns = await prisma.checkIn.findMany({
        where: {
            userId: req.user!.id,
              date: {
                  gte: weekStart, lte: weekEnd
                    }, 
          },
         orderBy: { date: 'asc'}
        
    })
        if(weeklyCheckIns.length === 0) {
            return res.status(400).json({ message: 'No check-ins found for this week' })
        }

    const summaryText = await generateWeeklySummary(weeklyCheckIns)
         //save AI summary in WeeklySummary model

    const summary = await prisma.weeklySummary.create({
        data: {
            userId: req.user!.id,
            weekStart,
            weekEnd,
            summary: summaryText,
            feedBack: ''
        }
    })
     res.status(201).json({ summary })

    }catch(error: any) {
        res.status(500).json({ message: error.message})
    }
}
       //----------------All Weeks Summary (week 01 - 04)---------------//
    export const getSummaryHistory = async(req: Request, res: Response) => {
        try{
           const userId = req.user!.id

        const history = await prisma.weeklySummary.findMany({
            where: { userId },
            orderBy: { weekStart: 'desc'}
        })
        res.status(200).json({ history })
        }catch(error: any) {
        res.status(500).json({ message: error.message})
        } 
    }
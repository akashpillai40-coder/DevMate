import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCheckIn = async(req: Request, res: Response) => {
       try{
        const {todayLog, tomorrowLog, leetCode, leetCodeProblem, gitPush} = req.body
        const checkIn = await prisma.checkIn.create({
               data: {
                userId: req.user!.id,
                todayLog,
                tomorrowLog, 
                leetCode, 
                leetCodeProblem, 
                gitPush
            }
             
        })
        res.status(201).json({checkIn})
       }catch(error: any){
        res.status(500).json( {message: error.message})
       }
}

export const getTodayCheckIn = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    res.json({ checkIn })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
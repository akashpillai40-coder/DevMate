import { Request, Response } from "express";
import prisma from "../config/prisma";
import { rewriteText } from "../services/sarvamAIServices";
    

      //------------Daily Logs---------------//
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
        res.status(201).json({ checkIn })
        console.log("Saved Successfully...")
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
        //------------Weekly History---------------//
export const weeklyHistory = async(req: Request, res: Response) => {
    try{
        const weeklyLogs = await prisma.checkIn.findMany({
        where: {
             userId: req.user!.id,
            
        }, 
        orderBy: {
            date: 'desc'
        }
    })
     res.json({ weeklyLogs })
    }catch(error: any) {
        res.status(500).json({ message: error.message})
    }
   
}

         //------------Streaks History---------------//
  export const getStreaks = async(req: Request, res: Response) => {
       try{
         const leetCodeCount = await prisma.checkIn.count({
          where:{userId: req.user!.id, leetCode: true}
         })
         const gitPushCount = await prisma.checkIn.count({
          where:{ userId: req.user!.id, gitPush: true}
         })
         res.json({ leetCodeCount, gitPushCount})
       }catch(error: any) {
         res.json({ message: error.message})
       }
  }

   //------------AI Rewrite text---------------//
   export const rewrite = async(req: Request, res: Response) => {
      try{
         const { text } = req.body

         if(!text || !text.trim()){
          return res.status(400).json({ message: 'Text is required'})
         }
         const correctedText = await rewriteText(text) //AI service to rewrite the text
          res.json({ correctedText})

      }catch(error: any) {
        res.status(500).json({ message: error.message })
      }
   }
   
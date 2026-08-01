import prisma from "../config/prisma";
import { Request, Response } from "express";

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
     res.json( {weeklyLogs})
    }catch(error: any) {
        res.status(500).json({ message: error.message})
    }
   
}
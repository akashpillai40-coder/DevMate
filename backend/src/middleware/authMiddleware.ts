import jwt from "jsonwebtoken"
import prisma from "../config/prisma";
import { Request, Response, NextFunction } from "express";

interface JWTPayload{
    id:number
}

//protect middleware
export const protect = async(req: Request, res:Response, next:NextFunction) => {

const token = req.headers.authorization?.split(" ")[1];
if(!token){
    throw new Error("Invalid user")
}
const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JWTPayload

const user = await prisma.user.findUnique({
    where: {
        id:decoded.id
       }
    })
    if(!user) {
        throw new Error("User not Found!")
    }
    req.user = user;
    next()
    
}


import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import prisma from "../config/prisma";



        //-------Register User-----
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};


           //-------Login User-----
export const login = async( req: Request, res: Response ) => {
     const user = await loginUser(req.body); //given to service with data
     res.status(200).json(user);
}

             //-------Get user-----
export const getUser = async( req: Request, res: Response) => {
  try{
     const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select:{
        id: true,
        name: true,
        email: true
      }
     })
     console.log(user)
     res.status(200).json(user);
  }catch(error: any) {
     res.status(500).json({ message: error.message})
  }
   
}

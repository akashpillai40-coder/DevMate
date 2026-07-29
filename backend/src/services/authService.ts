import prisma from "../config/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterUserData) => {
   // Check email
  // Hash password
  // Save user
  // Return user

  const existingUser = await prisma.user.findFirst({
     where: {
    email: data.email,
  },
});

    if (existingUser) {
        throw new Error("Email already exists");
    }
  
    //hashing
const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });

    return user;
};

interface LoginUserData{
    email: string;
    password: string;
}

export const loginUser = async(data: LoginUserData) => {
   
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if(!user){
        throw new Error ("Invalid Email or password")
    }
     const isMatch = await bcrypt.compare(data.password, user.password)

     if(!isMatch) {
       
        throw new Error ("Invalid email or password")
     }

     const token =  jwt.sign({
                       id:user.id}, process.env.JWT_SECRET_KEY!,{
                        expiresIn: '7d',
                       })
        return {
         token,
        user:{
            id: user.id,
            name: user.name,
            email: user.email
        },
       
    }
    
    
  
}


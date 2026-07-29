import prisma from "../config/prisma";

interface CreateUserData {
    name: string;
    email: string;
    password: string
}


export const createUser = async( data: CreateUserData) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password

        },
    })
    return user
}
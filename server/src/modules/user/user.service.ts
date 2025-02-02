import { Injectable } from '@nestjs/common';
import prisma from 'src/db/prisma/client';

@Injectable()
export class UserService {
    async getById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }
    async findOne(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async create(email: string, password: string) {
        const user = await prisma.user.create({
            data: {
                email, password
            }
        })

        return user
    }
}

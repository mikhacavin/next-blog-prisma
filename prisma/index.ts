// my prisma client

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient();
}else{
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;

}

export default prisma;
import express from "express"
const router  = express.Router()
import dotenv from "dotenv"
import axios from "axios"
import jwt from "jsonwebtoken"
import { prisma } from "../PrismaLab/prisma.js"
import { OAuth2Client } from "google-auth-library"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const googleClientID = process.env.GOOGLE_AUD

console.log("The value of JWT secret is " + JWT_SECRET)

const client = new OAuth2Client(googleClientID)

router.post("/googleauth/user" , async(req,res)=>{
    console.log("done")
    const {idToken} = req.body
    if (!idToken) {
        return res.status(400).json({ msg: "ID token missing" })
    }

    try{
       console.log("try ke aandar first part")
       
       let ticket = await client.verifyIdToken({
        idToken,
        audience:googleClientID
       })

      let payload = ticket.getPayload()


      if (!payload.email_verified) {
        return res.status(401).json({ msg: "Email not verified" })
      }

      const googleSub = payload.sub

       // Checking the user 

      // console.log("Payload is " + payload)


       let findUser = await prisma.user.findFirst({
        where:{
          emailToken:googleSub
        }
       })

       if(findUser){
         let userId = findUser.id
         let token = jwt.sign({userId},JWT_SECRET)
         console.log("The token is " + token)
         return res.json({msg:"Welcome to the collab lesgooo...",token})
       }

       let userData = await prisma.user.create({
         data:{
            userName:payload.name,
            email:payload.email,
            emailToken:googleSub
         }
       })

       if(userData){
         let userId = userData.id
         let token = jwt.sign({userId},JWT_SECRET)
         console.log("The token is " + token)
         return res.json({msg:"Welcome to the collab lesgooo...",token})
       }
       
    }
    catch(error){
        console.log("bda wala error")
        return res.json({msg:"Something went wrong while verifying the user "})
    }
})

export default router
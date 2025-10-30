import express from "express"
const router  = express.Router()
import dotenv from "dotenv"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const googleAud = process.env.GOOGLE_AUD

console.log("The value of JWT secret is " + JWT_SECRET)

const checkAuth = async(token)=>{
  try{
  const res = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
  
    if (res.data.aud !== googleAud) throw new Error("Invalid Action");

    if (res.data.iss !== "accounts.google.com" && res.data.iss !== "https://accounts.google.com") throw new Error("Invalid issuer");

    if (!res.data.email_verified) throw new Error("Email not verified");

    console.log("done " + res.data)
    return res.data;
  }
  catch(error){
    return error
  }
}

router.post("/googleauth/user" , async(req,res)=>{
    console.log("done")
    const {idToken} = req.body
    try{
       console.log("try ke aandar first part")
       let getterData = await checkAuth(idToken)

      console.log("username is :" + getterData.name)

       let findUser = await prisma.user.findFirst({
        where:{
          emailToken:getterData.sub
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
            userName:getterData.name,
            email:getterData.email,
            emailToken:getterData.sub
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
        console.log("bda wala error" + error)
        return res.json({msg:"Something went wrong while verifying the user " + error})
    }
})

export default router
import { AuthenticatedRequest } from "@/middlewares";
import {Response} from "express"
import httpStatus from "http-status";

export async function getActivities(req:AuthenticatedRequest, res:Response){
const {userId} = req

try{
const activites = await activitiesService.findActivities(Number(userId))
return res.status(httpStatus.OK).send(activites)
}catch(error){
return res.sendStatus(httpStatus.NOT_FOUND)
}
}

export async function postActivities(req:AuthenticatedRequest ,res:Response){


}
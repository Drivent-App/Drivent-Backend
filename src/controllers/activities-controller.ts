import { AuthenticatedRequest } from "@/middlewares";
import activitesService from "@/services/activities-service";
import {Response} from "express"
import httpStatus from "http-status";

export async function getActivities(req:AuthenticatedRequest, res:Response){

try{
const activites = await activitesService.findAllActivities()
return res.status(httpStatus.OK).send(activites)
}catch(error){
return res.sendStatus(httpStatus.NOT_FOUND)
}
}

export async function postActivities(req:AuthenticatedRequest ,res:Response){
const {userId} = req;

try{

}catch(error){
return res.sendStatus(httpStatus.NOT_FOUND)
}
}
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Productpage=()=>{
        const id=useParams();

        useEffect(()=>{
            featch(getdatabyid)
        },[])

   if (!id || id===undefined || id===null )  return (
       <>ERROR NOT EXIST </>

       )}
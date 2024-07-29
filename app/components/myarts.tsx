import Link from "next/link"
import { BarChart, Delete, Edit, GitGraphIcon, LineChart } from "lucide-react";
import convertDate from "@/app/utils/dateConverter";
import Header from "./header";


function Myarts({title,description,date,thumbnail,id,onClick}:{onClick:any,id:string|undefined,title:string|undefined,description:string|undefined,date:string|undefined,thumbnail:string|undefined}) {
  return (<>
    <div className="bg-[#2C2D2F] mx-auto mb-[1em] flex gap-[1em] p-[1em] text-white font-[600] overflow-hidden w-[27.25em] h-[10em] rounded-[1em] ">
            <div className="w-[40%] h-full overflow-hidden rounded-[inherit] bg-yellow-300">
              <img src={thumbnail} className="w-full object-cover h-full" alt="image of" />
            </div>
            <div className="w-[50%]">
              <p>{title}</p>
              <p>{description}</p>
              <p>{convertDate(date)}</p>
              <div className="flex gap-[1em] mt-[2em]">
                <Link className="hover:bg-white p-[.2em] rounded w-[max-content] h-[max-content] hover:text-black" href={`/dashboard/analytics/${id}?title=${title}`} type="button"><LineChart/></Link>
                <Link  className="hover:bg-white p-[.2em] rounded w-[max-content] h-[max-content] hover:text-black" href={`/dashboard/new?edit=${id}`}><Edit/></Link>
                <div onClick={onClick} className="hover:bg-white p-[.2em] rounded w-[max-content] h-[max-content] hover:text-black"><Delete/></div>
              </div>
            </div>
          </div></>
  )
}

export default Myarts
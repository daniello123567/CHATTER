import type { Metadata} from "next"
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { GetArticleById } from "@/app/actions/supabaseactions";
type Props = {params:Params}

export async function generateMetadata({params}:Props):Promise<Metadata|undefined> {
  const id = params.id;
  const dataBoy = await GetArticleById(id);
  if(dataBoy){
  const {Title,Description,name} = dataBoy[0];
    return {
      title:Title,
      description:Description,
      icons:'/ff.svg',
      authors:[{name:name}],
     }
    }

}
async function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <>{children}</>
  )
}
export default RootLayout

import type { Metadata} from "next"
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { GetArticleById } from "@/app/actions/supabaseactions";
type Props = {params:Params}

export async function generateMetadata({params}:Props):Promise<Metadata|undefined> {
  const id = params.id;
  const data = await GetArticleById(id);
  const {Title,Description,name} = data[0];
    return {
      title:Title,
      description:Description,
      icons:'/ff.svg',
      authors:[{name:name}],
     }


}
async function layout({children}:{children:React.ReactNode}) {
  return (
    <>{children}</>
  )
}

export default layout

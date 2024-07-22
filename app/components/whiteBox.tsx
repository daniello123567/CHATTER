function WhiteBox({ Arrayofcontents }: { Arrayofcontents: Array<string> }) {

  const Compo = ({ content }: { content: string }) => {
    return <div className='w-[21.875rem] p-[1.41875rem] bg-white rounded-[.42125rem]'>{content}</div>
  }
  if (Arrayofcontents) {
    return <>{Arrayofcontents.map((content) => {
      return <Compo key={crypto.randomUUID()} content={content} />
    })}</>
  }
}

export default WhiteBox

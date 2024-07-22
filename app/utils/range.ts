function range (howmuch:number):Array<string|number>{
  const arr:Array<number|string> = []
  for(let i = 0; i < howmuch; i++){
    arr.push(i);
  }
  return arr;
}
export default range;


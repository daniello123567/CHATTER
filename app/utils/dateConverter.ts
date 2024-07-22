
function convertDate(dateString:any) {

  const date = new Date(dateString);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];

  const day = date.getDate();

  const year = date.getFullYear();


  return `${month} ${day}, ${year}`;

}
export default convertDate;

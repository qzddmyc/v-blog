/**
 * @param {String | Number | null} timestamp 时间戳
 */
function formatDate(timestamp) {
  const date = timestamp ? new Date(+timestamp) : new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export default formatDate;
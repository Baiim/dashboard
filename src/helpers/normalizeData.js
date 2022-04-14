export function limitString(data, length) {
  if (!data) {
    return '-';
  }
  if (data.length > length) {
    return data.substring(0, length).concat('...');
  }
  return data;
}

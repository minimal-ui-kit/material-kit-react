
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};
export default formatDate
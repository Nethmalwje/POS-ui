export function getCookie(name) {
  const value = `; ${document.cookie}`;
  console.log("cassf", value); // Debugging: Check the value of document.cookie
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  } else {
    return null;
  }
}

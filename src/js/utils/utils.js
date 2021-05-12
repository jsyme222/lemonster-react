export function slugTitle(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export function handle(endpoint, options = { method: "GET", header: {} }) {
  let opts = {
    method: options.method,
    mode: "cors",
    header: {
      ...options.header,
      "Content-Type": "application/json",
    },
  };
  let url = process.env.REACT_APP_API + endpoint;
  return fetch(url, opts)
    .then((d) => {
      if (d.status === 200) {
        return d.json();
      }
      throw d.status;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function makeDate(dateString) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  let year = dateString.slice(0, 4);
  let month = dateString.slice(5, 7);
  let day = dateString.slice(8, 10);
  let date = `${months[month]} ${day}, ${year}`;
  return date;
}

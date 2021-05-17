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

export function handle(endpoint, options) {
  let opts = {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=utf-8",
    },
    ...options,
  };
  let url = process.env.REACT_APP_API + endpoint;
  // console.log(opts);
  return fetch(url, opts)
    .then((d) => {
      if (d.status === 200) {
        return d.json();
      }
      throw d.status;
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
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
    10: "October",
    11: "November",
    12: "December",
  };
  let year = dateString.slice(0, 4);
  let month = dateString.slice(5, 7);
  let day = dateString.slice(8, 10);
  let date = `${months[month]} ${day}, ${year}`;
  return date;
}

export function parseURL(path) {
  let proto = "";
  if (!path.startsWith("http")) {
    proto = process.env.REACT_APP_API
  }
  if (path.startsWith("/")){
    proto = proto.slice(0, -1)
  }
  return proto + path
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

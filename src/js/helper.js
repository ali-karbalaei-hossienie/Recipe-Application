import { Time_secound } from "./config.js";

const TimeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("در خواست شما به دلیل کندی اینترنت ناموفق بود."));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const resp = await Promise.race([fetch(url), TimeOut(Time_secound)]);
    const data = await resp.json();
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, UploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UploadData),
    });
    const resp = await Promise.race([fetchPro, TimeOut(Time_secound)]);
    const data = await resp.json();
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

//utility function for showing timestamp on post
export const timeSince = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  
    let interval = Math.floor(seconds / 31536000); //make into year
  
    if (interval > 1) {
      return interval + " years";
    }
  
    interval = Math.floor(seconds / 2592000); //make into months
    if (interval > 1) {
      return interval + " months";
    }
  
    interval = Math.floor(seconds / 86400); //make into days
    if (interval > 1) {
      return interval + " days";
    }
  
    interval = Math.floor(seconds / 3600);//make into hours
    if (interval > 1) {
      return interval + " hours";
    }
  
    interval = Math.floor(seconds / 60);//make into minutes
    
    if (interval > 1) {
      return interval + " minutes";
    }
   
    return Math.floor(seconds)>5?Math.floor(seconds) + " seconds":"few seconds";//else finally second
  };
  //make request to server for fetching data
  export const connect = (endpoint, { body, ...customConfig } = {}) => {
    const token = localStorage.getItem("accesstoken");
    const headers = { "Content-Type": "application/json" };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const config = {
      method: body ? "POST" : "GET",
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    return fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, config).then(
      async (res) => {
        const data = await res.json();
  
        if (res.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      }
    );
  };
  
  export const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "complainlodger");
  
    return fetch(process.env.REACT_APP_UPLOAD_URL, {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  };
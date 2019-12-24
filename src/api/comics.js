import apiConfig from './api-config';

const fetchComicsByTitle = (title,page) => {
  return new Promise((resolve, reject) => {
    fetch(`https://gateway.marvel.com:443/v1/public/comics?title=${title}&apikey==${apiConfig.marvelapikey}`)
      .then(res => res.json())
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  })
};

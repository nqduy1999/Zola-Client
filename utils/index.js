import DefaultLayout from 'components/layouts';
import jwt_decode from 'jwt-decode';

export const urlHelper = {
  getUrlHomePage: () => ({
    layout: DefaultLayout,
    route: {
      to: '/'
    },
    initProps: {}
  })
};

export const getProvider = providerId => {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return new firebase.auth.GoogleAuthProvider();
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return new firebase.auth.FacebookAuthProvider();
    case firebase.auth.GithubAuthProvider.PROVIDER_ID:
      return new firebase.auth.GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
};

export const resizeImage = (imgOld, fileType, MAX_WIDTH, MAX_HEIGHT) => {
  let img = document.createElement('img');
  img.src = imgOld; //reader.result;
  let width = img.width;
  let height = img.height;
  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  // draw img canvas again
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // draw canvas
  ctx.drawImage(img, 0, 0);
  canvas.width = width;
  canvas.height = height;
  // draw canvas
  ctx.drawImage(img, 0, 0, width, height);
  const dataurl = canvas.toDataURL(fileType);
  return dataurl;
};

export const toDataUrl = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};

export const decodeUserEmail = auth => {
  let decoded = auth && jwt_decode(auth.accessToken);
  return decoded?.data?.email;
};

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

import React from 'react';

export default class FetchHandler  {
  apiURl = "https://macotedeboeuf.firebaseio.com";

  post(target, body) {
    return new Promise((resolve, reject) => {
      fetch(`${apiURl}/${target}.json`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(true)
        })
        .catch((error) =>{
          reject(false)
        })
    })
  }
}

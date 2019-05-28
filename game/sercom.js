/**
 * Sends a post request asynchronous in the back to the server.
 * @param {string} path The request path.
 * @param {Object} [reqinfo=] Additional information as a json object.
 *                            Can be used to send data from client to server.
 * @param {string} [responseType="json"] The data type of the response.
 * @param {function} [callback=] Callback function called when a response was successfull.
 */
function sendPostRequest(path, reqinfo={}, responseType='json', callback=(res)=>{}){
    let xhr = new XMLHttpRequest();
    //encode request information
    let urlencoded_reqdata = urlEncodeData(reqinfo);

    // open request and set properties
    xhr.open('POST', path, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = responseType;
    // send request
    xhr.send(urlencoded_reqdata);

    // execute callback on successfull response
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.response);
        }
    };
}

/**
 * Urlencodes a javascript object.
 * @param {Object} data 
 * @returns the urlencoded data as a string
 */
function urlEncodeData(data){
    let urlEncodedData = [];

    for(let name in data){
        urlEncodedData.push(`${name}=${data[name]}`);
    }

    urlEncodedData = urlEncodedData.join('&').replace(/\s/g, '+');
    return urlEncodedData;
}
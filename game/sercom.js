/**
 * Sends data from the client to the server 
 * as a POST request using AJAX.
 * @param {Object} data the data to send as an Javascript Object 
 * gets url encoded with {@link urlEncodeData} 
 */
function sendData(data){
    let xhr = new XMLHttpRequest();
    let urlEncodedData = urlEncodeData(data);
    
    // possible arror handling
    /*xhttp.addEventListener('error', (event) => {
        console.log('Something went wrong sending data!');
    });*/

    xhr.open('POST', '/clientpost', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //console.log('Send: ' + urlEncodedData);
    xhr.send(urlEncodedData);
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
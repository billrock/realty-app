export function getAll(query,cb){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"tenants?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"tenants";
    }
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function get(index, cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"tenant/"+index;
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function create(tenant,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"tenants";
    fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(tenant)
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function update(data,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"tenants/"+data.id;
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(checkStatus).then(parseJSON).then(cb);
}

function checkStatus(response){
    if (response.status >= 200 && response.status < 300){
        return response;
    }

    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response
    console.log(error);
    throw error;
}

function parseJSON(response){
   return response.json();
}

const tenants = {get, getAll,create, update};
export default tenants;



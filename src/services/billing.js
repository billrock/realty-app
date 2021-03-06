import axiosInstance from './axios';

export function getClientToken(){
    var url = process.env.REACT_APP_API+"billing/getClientToken";
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getPaymentSecret(){
    var url = process.env.REACT_APP_API + "billing/paymentSecret/me";
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getPaymentMethodMe(){
    var url = process.env.REACT_APP_API + "billing/paymentMethod/me";
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function setPaymentMethod(nonce){
    var url = process.env.REACT_APP_API+"billing/paymentMethod";
    return new Promise(function(resolve, reject){
        axiosInstance({
            method: 'post',
            url: url,
            data: {
                nonce: nonce
            }
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getPaymentMethod(){
    var url = process.env.REACT_APP_API + "billing/paymentMethod";
    return new Promise(function(resolve, reject){
        axiosInstance({
            method: 'get',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data){
                reject(err.response.data);
            }else{
                reject(err);
            }
        });
    });
}

export function getBillingEvents(id){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/billingCycles/" + id + "/billingEvents";
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getBillingEventsMe(id){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/billingCycles/" + id + "/billingEvents/me";
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getBillingCycles(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/billingCycles";
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getPromotions(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/promotions";
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCodes(query){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/codes";
        if (query) url += "?"+query;
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function createPromotionCode(promotionId, body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/promotions/" + promotionId + "/codes";
        axiosInstance({
            method: 'POST',
            url: url,
            data: body
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function validatePromoCode(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/codes/validate";
        axiosInstance({
            method: 'POST',
            url: url,
            data: body
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data) reject(err.response.data);
            else reject(err);
        }); 
    });
}

export function getUserCodeMe(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/users/codes/me";
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data) reject(err.response.data);
            else reject(err);
        });
    });
}

export function playBillingCycle(id){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "billing/billingEvents/play/" + id;
        axiosInstance({
            method: 'GET',
            url: url
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const billing = {
    getClientToken,
    getPaymentSecret,
    setPaymentMethod,
    getPaymentMethod,
    getPaymentMethodMe,
    getBillingEvents,
    getBillingEventsMe,
    getBillingCycles,
    getPromotions,
    getCodes,
    getUserCodeMe,
    createPromotionCode,
    validatePromoCode,
    playBillingCycle
};
export default billing;

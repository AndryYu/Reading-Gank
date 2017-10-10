import getUrl from './UrlUtil';

export const request = (url, method, body) => {
    let isOK;
    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method,
            header: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body
        })
            .then((response) => {
                if (response.ok) {
                    isOK = true;
                } else {
                    isOK = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOK) {
                    //resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”
                    resolve(responseData);
                } else {
                    //reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”
                    reject(responseData);
                }
            })
            //Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
            .catch((error) => {
                reject(error);
            });
    });
};
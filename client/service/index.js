export function queryItems(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() > 0.1){
                resolve([{
                    name: 'Mx',
                    age: '28'
                },{
                    name: 'Ricky',
                    age: '27'
                }]);
            }else{
                reject({ code: 504 });
            }
        }, 50);
    });
}

export function queryInfo(id){
    return new Promise(resolve => {
        setTimeout(() => {
            const info = {
                'a': 'This is a secret A.',
                'b': 'This is a secret B.',
                'c': 'This is a secret C.'
            };

            resolve(info[id]);
        }, 50);
    });
}
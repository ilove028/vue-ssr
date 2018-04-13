export function queryItems(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() > 0.3){
                resolve([{
                    name: 'Mx',
                    age: '28'
                },{
                    name: 'Ricky',
                    age: '27'
                }]);
            }else{
                reject({ errorMessage: 'TIME_OUT' });
            }
        }, 50);
    });
}
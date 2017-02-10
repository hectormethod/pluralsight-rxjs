import {Observable} from "rxjs";

export function load(url: string) {
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();
        // load is standard event raised when data is finished


        xhr.addEventListener("load", () => {
            if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
            } else {  //error 500

                observer.error(xhr.statusText);
            }

        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen( retryStrategy( {attempts: 8 , delay: 700}));
};
//this is doing all the work of the above load() method
export function loadWithFetch(url: string){
    return Observable.defer( () => {
        return  Observable.fromPromise(fetch(url).then(r => r.json()));
    });
}

function retryStrategy({attempts, delay}){
    return function(errors){
        return errors
            .scan( (acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0)
            .takeWhile (acc => acc < attempts )
            .delay(delay);
    }
}

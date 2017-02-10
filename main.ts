import {Observable} from "rxjs";
import {load, loadWithFetch} from "./loader";

let source = Observable.merge(
    Observable.of(1),
    Observable.from([2,3,4]),
    Observable.throw(new Error('stop')),
    Observable.of(5)
).catch(e => {
    console.log(`caught ${e}`);
    return Observable.of(10)
})

source.subscribe(
    value => console.log(`value ${value}`),
    error => console.log(error),
    () => console.log('complete')
)

// let button = document.getElementById("moviesButton");
// let output = document.getElementById("output");
//
// let click = Observable.fromEvent(button, "click");
//
//
// function renderMovies(movies) {
//     movies.forEach(m => {
//         let div = document.createElement("div");
//         let br = document.createElement("br");
//
//         div.innerText = m.title;
//         div.className = "label label-default";
//         output.appendChild(div);
//         output.appendChild(br);
//     });
// }
//
// loadWithFetch("movies.json");
//
// click.flatMap(e => loadWithFetch("movies.json"))
//     .subscribe(
//     renderMovies,
//     e => console.log(`error: ${e}`),
//     () => console.log(`complete`)
// );


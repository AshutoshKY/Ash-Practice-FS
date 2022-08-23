function f1() {
    console.log("First");
    setTimeout(function second() {
        console.log("Time out");
    }, 1000);
    console.log("Final");
}

function f3(){
    async function f(){
        // return 1;
        return Promise.resolve(1);
    }
    f().then(alert);
}

function f4(){
    async function f5(){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Done!"), 1000);
            setTimeout(() => reject("Not Done!"), 1000);
        });
        let result = await promise;
        alert(result);
    }
    f5();
}
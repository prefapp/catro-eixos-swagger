let ar = [];

let a = new Proxy(ar, {

    set: (A, item, valor) => {
        A[item] = valor;
        return true;
    }

})

a.push(1);
a.push(1);
a.push(1);
a.push(1);
a.push(1);
a.push(1);

console.log(a);

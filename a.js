class A{

    a(){

    }
}

A.prototype.foo = function(){console.log("foo");}

console.log(new A().foo());

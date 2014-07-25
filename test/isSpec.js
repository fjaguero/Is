﻿/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/is.d.ts" />
describe("Is", function () {
    it("should correctly check that string is shorter than 4 characters", function () {
        expect(Is("foo").isShorterThan(4).value).not.toBeUndefined();
    });

    it("should correctly check that string is longer than 2 characters", function () {
        expect(Is("foo").isLongerThan(2).value).not.toBeUndefined();
    });

    it("should return nothing when isLongerThan is false", function () {
        expect(Is("foo").isLongerThan(3).value).toBeUndefined();
    });

    it("should return nothing when isShorterThan is false", function () {
        expect(Is("foo").isShorterThan(3).value).toBeUndefined();
    });

    it("should return the value when equals is true", function () {
        expect(Is("foo").equals("foo").value).not.toBeUndefined();
    });

    it("should return nothing when equals is false", function () {
        expect(Is("foo").equals("").value).toBeUndefined();
    });

    it("should return the value when isNumber is true", function () {
        expect(Is(1).isNumber().value).not.toBeUndefined();
    });

    it("should return nothing when isNumber is false", function () {
        expect(Is("foo").isNumber().value).toBeUndefined();
    });

    it("should return the value when isLessThan is true", function () {
        expect(Is(1).isLessThan(2).value).not.toBeUndefined();
    });

    it("should return nothing when isLessThan is false", function () {
        expect(Is(1).isLessThan(0).value).toBeUndefined();
    });

    it("should return the value when isGreaterThan is true", function () {
        expect(Is(2).isGreaterThan(1).value).not.toBeUndefined();
    });

    it("should return nothing when isGreaterThan is false", function () {
        expect(Is(1).isGreaterThan(2).value).toBeUndefined();
    });

    it("should trigger 'then' if the chain is valid", function () {
        var count = 0;
        Is("foo").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should not trigger 'then' if the chain is not valid", function () {
        var count = 0;
        Is("foo").isNumber().then(function () {
            count = 1;
        });
        expect(count).toBe(0);
    });

    it("should trigger 'catch' if the chain is not valid", function () {
        var count = 0;
        Is(null).then(function () {
            count = 1;
        }).catch(function () {
            count = 2;
        });
        expect(count).toBe(2);
    });

    it("should trigger 'then' if  all are true", function () {
        var count = 0;
        Is("foo").is("foo").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should not trigger 'then' if  not all are true", function () {
        var count = 0;
        Is("foo").is("foo", "bar").then(function () {
            count = 1;
        });
        expect(count).toBe(0);
    });

    it("should not trigger 'then' if  not all are true", function () {
        var count = 0;
        Is("foo").is("foo", "length<3").then(function () {
            count = 1;
        });
        expect(count).toBe(0);
    });

    it("should trigger 'then' if  any are true", function () {
        var count = 0;
        Is("foo").any("foo", "bar").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should trigger 'then' if  any are true for equals", function () {
        var count = 0;
        Is("foo").any("foo").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should trigger 'then' if  any are not true for equals", function () {
        var count = 0;
        Is("foo").any("foo2").then(function () {
            count = 1;
        });
        expect(count).toBe(0);
    });

    it("should trigger then if any shorthand length checks are true", function () {
        var count = 0;
        Is("foo").any("length<4)", "length>10").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should trigger then if any shorthand length checks are true", function () {
        var count = 0;
        Is(1).any("<4)", ">10").then(function () {
            count = 1;
        });
        expect(count).toBe(1);
    });

    it("should trigger finally even when it fails", function () {
        var count = 0;
        Is(undefined).then(function () {
            count++;
        }).catch(function () {
            count++;
        }).finally(function () {
            count++;
        });
        expect(count).toBe(2);
    });

    it("should trigger finally even when it succeeds", function () {
        var count = 0;
        Is(1).then(function () {
            count++;
        }).finally(function () {
            count++;
        });
        expect(count).toBe(2);
    });

    it("should return true if an array has a value", function () {
        var count;
        Is([1, 2, 3]).contains(2).then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should return true if an array does not have a value", function () {
        var count;
        Is([1, 2, 3]).contains("foo").then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(0);
    });

    it("should return true if an array does not have a value and inverse is true", function () {
        var count;
        Is([1, 2, 3]).not().contains("foo").then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should return false if an array does  have a value and inverse is true", function () {
        var count;
        Is([1, 2, 3]).not().contains(2).then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(0);
    });

    it("should return true if an array is empty", function () {
        var count;
        Is([]).isEmptyArray().then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should return false if an array is empty and inverse is true", function () {
        var count;
        Is([]).not().isEmptyArray().then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(0);
    });

    it("should return false if an array is not empty", function () {
        var count;
        Is([1, 2, 3]).isEmptyArray().then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(0);
    });

    it("should return true if an array is not empty and inverse is true", function () {
        var count;
        Is([1, 2, 3]).not().isEmptyArray().then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should allow you to check a param of an object", function () {
        var count;
        Is({ foo: "bar", bar: "baz" }).prop("foo").equals("bar").prop("bar").isLongerThan(2).then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should allow you to check a param of an object if inverse is false", function () {
        var count;
        Is({ foo: "bar" }).prop("foo").not().equals("bar2").then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });

    it("should allow you to check all types of object params", function () {
        var count;
        var validEmail = function (val) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        };
        var complexObject = {
            arr: [1, 2, 3],
            str: "foo",
            num: 10,
            email: "joe.smith@fakeemail.com"
        };
        Is(complexObject).prop("arr").not().isEmptyArray().prop("arr").contains(3).prop("str").isLongerThan(2).prop("str").isShorterThan(4).prop("num").isNumber().prop("email").is(validEmail).then(function () {
            count = 1;
        }).catch(function () {
            count = 0;
        });
        expect(count).toBe(1);
    });
});
//# sourceMappingURL=isSpec.js.map

/*******************************************************************************
    Copyright (c) 2013, KAIST.
    All rights reserved.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.
 ******************************************************************************/

var x = 10;

function f() {
    if (Math.random()) return function() { x++; }
    else return function () { }
}

f()();

x = 20;

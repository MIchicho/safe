/*******************************************************************************
    Copyright (c) 2013, KAIST.
    All rights reserved.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.
 ***************************************************************************** */

function foo() {
	function bar() {
		var x;
		return x;
	}
	bar();
	return x;
}
foo();
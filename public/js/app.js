/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*
 * Metro 4 Components Library v4.2.18 build 695 (https://metroui.org.ua)
 * Copyright 2018 Sergey Pimenov
 * Licensed under MIT
 */

(function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], factory );
    } else {
        factory( jQuery );
    }
}(function( jQuery ) { 
'use strict';

var $ = jQuery;


// Source: js/metro.js
if (typeof jQuery === 'undefined') {
    throw new Error('Metro 4 requires jQuery!');
}

if ('MutationObserver' in window === false) {
    throw new Error('Metro 4 requires MutationObserver!');
}

var meta_init = $("meta[name='metro4:init']").attr("content");
var meta_locale = $("meta[name='metro4:locale']").attr("content");
var meta_week_start = $("meta[name='metro4:week_start']").attr("content");
var meta_animation_duration = $("meta[name='metro4:animation_duration']").attr("content");
var meta_callback_timeout = $("meta[name='metro4:callback_timeout']").attr("content");
var meta_timeout = $("meta[name='metro4:timeout']").attr("content");

if (window.METRO_INIT === undefined) {
    window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
}
if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

if (window.METRO_WEEK_START === undefined) {
    window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 1;
}
if (window.METRO_LOCALE === undefined) {
    window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
}
if (window.METRO_ANIMATION_DURATION === undefined) {
    window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 300;
}
if (window.METRO_CALLBACK_TIMEOUT === undefined) {
    window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
}
if (window.METRO_TIMEOUT === undefined) {
    window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
}
if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

window.METRO_MEDIA = [];

if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.values !== 'function') {
    Object.values = function(obj) {
        return Object.keys(obj).map(function(e) {
            return obj[e]
        });
    }
}

var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

var Metro = {

    version: "4.2.18",
    versionFull: "4.2.18.695 ",
    isTouchable: isTouch,
    fullScreenEnabled: document.fullscreenEnabled,
    sheet: null,

    controlsPosition: {
        INSIDE: "inside",
        OUTSIDE: "outside"
    },

    groupMode: {
        ONE: "one",
        MULTI: "multi"
    },

    aspectRatio: {
        HD: "hd",
        SD: "sd",
        CINEMA: "cinema"
    },

    fullScreenMode: {
        WINDOW: "window",
        DESKTOP: "desktop"
    },

    position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
    },

    popoverEvents: {
        CLICK: "click",
        HOVER: "hover",
        FOCUS: "focus"
    },

    stepperView: {
        SQUARE: "square",
        CYCLE: "cycle",
        DIAMOND: "diamond"
    },

    listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
    },

    events: {
        click: 'click.metro',
        start: 'touchstart.metro mousedown.metro',
        stop: 'touchend.metro mouseup.metro',
        move: 'touchmove.metro mousemove.metro',
        enter: 'touchstart.metro mouseenter.metro',
        leave: 'touchend.metro mouseleave.metro',
        focus: 'focus.metro',
        blur: 'blur.metro',
        resize: 'resize.metro',
        keyup: 'keyup.metro',
        keydown: 'keydown.metro',
        keypress: 'keypredd.metro',
        dblclick: 'dblclick.metro',
        input: 'input.metro',
        change: 'change.metro',
        cut: 'cut.metro',
        paste: 'paste.metro',
        drop: 'drop.metro',
        scroll: 'scroll.metro',
        scrollStart: 'scrollstart.metro',
        scrollStop: 'scrollstop.metro',
        mousewheel: 'mousewheel.metro',
        inputchange: "change.metro input.metro propertychange.metro cut.metro paste.metro copy.metro"
    },

    media_queries: {
        FS: "(min-width: 0px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
    },

    media_sizes: {
        FS: 0,
        SM: 576,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
    },

    media_mode: {
        FS: "fs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
    },

    actions: {
        REMOVE: 1,
        HIDE: 2
    },

    hotkeys: [],

    about: function(f){
        console.log("Metro 4 Components Library - v" + (f === true ? this.versionFull : this.version));
    },

    aboutDlg: function(f){
        alert("Metro 4 Components Library - v" + (f === true ? this.versionFull : this.version));
    },

    ver: function(f){
        return (f === true ? this.versionFull : this.version);
    },

    observe: function(){
        var observer, observerCallback;
        var observerConfig = {
            childList: true,
            attributes: true,
            subtree: true
        };
        observerCallback = function(mutations){
            mutations.map(function(mutation){

                if (mutation.type === 'attributes' && mutation.attributeName !== "data-role") {
                    var element = $(mutation.target);
                    var mc = element.data('metroComponent');
                    if (mc !== undefined) {
                        $.each(mc, function(){
                            var plug = element.data(this);
                            if (plug) plug.changeAttribute(mutation.attributeName);
                        });
                    }
                } else

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var i, obj, widgets = {}, plugins = {};
                    var nodes = mutation.addedNodes;

                    for(i = 0; i < nodes.length; i++) {

                        var node = mutation.addedNodes[i];

                        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                            return;
                        }
                        obj = $(mutation.addedNodes[i]);

                        plugins = obj.find("[data-role]");
                        if (obj.data('role') !== undefined) {
                            widgets = $.merge(plugins, obj);
                        } else {
                            widgets = plugins;
                        }
                        if (widgets.length) {
                            Metro.initWidgets(widgets);
                        }
                    }

                } else  {
                    //console.log(mutation);
                }
            });
        };
        observer = new MutationObserver(observerCallback);
        observer.observe($("html")[0], observerConfig);
    },

    init: function(){
        var widgets = $("[data-role]");
        var hotkeys = $("[data-hotkey]");
        var html = $("html");

        if (isTouch === true) {
            html.addClass("metro-touch-device");
        } else {
            html.addClass("metro-no-touch-device");
        }

        this.sheet = Utils.newCssSheet();

        this.observe();

        this.initHotkeys(hotkeys);
        this.initWidgets(widgets);

        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Utils.media(query)) {
                METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });

        this.about(true);

        return this;
    },

    initHotkeys: function(hotkeys){
        $.each(hotkeys, function(){
            var element = $(this);
            var hotkey = element.data('hotkey') ? element.data('hotkey').toLowerCase() : false;

            if (hotkey === false) {
                return;
            }

            if (element.data('hotKeyBonded') === true ) {
                return;
            }

            Metro.hotkeys.push(hotkey);

            $(document).on(Metro.events.keyup, null, hotkey, function(e){
                if (element === undefined) return;

                if (element[0].tagName === 'A' &&
                    element.attr('href') !== undefined &&
                    element.attr('href').trim() !== '' &&
                    element.attr('href').trim() !== '#') {
                    document.location.href = element.attr('href');
                } else {
                    element.click();
                }
                return METRO_HOTKEYS_BUBBLE_UP;
            });

            element.data('hotKeyBonded', true);
        });
    },

    initWidgets: function(widgets) {
        var that = this;

        $.each(widgets, function () {
            var $this = $(this), w = this;
            var roles = $this.data('role').split(/\s*,\s*/);
            roles.map(function (func) {
                if ($.fn[func] !== undefined && $this.attr("data-role-"+func) === undefined) {
                    $.fn[func].call($this);
                    $this.attr("data-role-"+func, true);

                    var mc = $this.data('metroComponent');

                    if (mc === undefined) {
                        mc = [func];
                    } else {
                        mc.push(func);
                    }
                    $this.data('metroComponent', mc);
                }
            });
        });
    },

    plugin: function(name, object){
        $.fn[name] = function( options ) {
            return this.each(function() {
                $.data( this, name, Object.create(object).init(options, this ));
            });
        };
    },

    destroyPlugin: function(element, name){
        var p, mc;
        element = Utils.isJQueryObject(element) ? element[0] : element;
        p = $(element).data(name);

        if (!Utils.isValue(p)) {
            throw new Error("Component can not be destroyed: the element is not a Ьуекщ 4 component.");
        }

        if (!Utils.isFunc(p['destroy'])) {
            throw new Error("Component can not be destroyed: method destroy not found.");
        }

        p['destroy']();
        mc = $(element).data("metroComponent");
        Utils.arrayDelete(mc, name);
        $(element).data("metroComponent", mc);
        $.removeData(element, name);
        $(element).removeAttr("data-role-"+name);
    },

    destroyPluginAll: function(element){
        element = Utils.isJQueryObject(element) ? element[0] : element;
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.destroyPlugin(element, this);
        });
    },

    initPlugin: function(element, name){
        element = $(element);
        try {
            if ($.fn[name] !== undefined && element.attr("data-role-"+name) === undefined) {
                $.fn[name].call(element);
                element.attr("data-role-"+name, true);

                var mc = element.data('metroComponent');

                if (mc === undefined) {
                    mc = [name];
                } else {
                    mc.push(name);
                }
                element.data('metroComponent', mc);
            }
        } catch (e) {
            console.log(e.message, e.stack);
        }
    },

    reinitPlugin: function(element, name){
        this.destroyPlugin(element, name);
        this.initPlugin(element, name);
    },

    reinitPluginAll: function(element){
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.reinitPlugin(element, this);
        });
    },

    noop: function(){},
    noop_true: function(){return true;},
    noop_false: function(){return false;},

    stop: function(e){
        e.stopPropagation();
        e.preventDefault();
    },

    requestFullScreen: function(element){
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            element.requestFullscreen();
        }
    },

    exitFullScreen: function(){
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            document.exitFullscreen();
        }
    },

    inFullScreen: function(){
        var fsm = (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        return fsm !== undefined;
    }
};

window['Metro'] = Metro;

$(window).on(Metro.events.resize, function(){
    window.METRO_MEDIA = [];
    $.each(Metro.media_queries, function(key, query){
        if (Utils.media(query)) {
            METRO_MEDIA.push(Metro.media_mode[key]);
        }
    });
});



// Source: js/utils/animation.js
var Animation = {

    duration: METRO_ANIMATION_DURATION,
    func: "swing",

    switch: function(current, next){
        current.hide();
        next.css({top: 0, left: 0}).show();
    },

    slideUp: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: -h
        }, duration, func);

        next.css({
            top: h,
            left: 0,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideDown: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: h
        }, duration, func);

        next.css({
            left: 0,
            top: -h,
            zIndex: 2
        }).animate({
            top: 0
        }, duration, func);
    },

    slideLeft: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: -w
        }, duration, func);

        next.css({
            left: w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    slideRight: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: w
        }, duration, func);

        next.css({
            left: -w,
            zIndex: 2
        }).animate({
            left: 0
        }, duration, func);
    },

    fade: function(current, next, duration){
        if (duration === undefined) {duration = this.duration;}
        current.animate({
            opacity: 0
        }, duration);
        next.css({
            top: 0,
            left: 0
        }).animate({
            opacity: 1
        }, duration);
    }

};

Metro['animation'] = Animation;

// Source: js/utils/colors.js
function RGB(r, g, b){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
}

function RGBA(r, g, b, a){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
    this.a = a || 1;
}

function HSV(h, s, v){
    this.h = h || 0;
    this.s = s || 0;
    this.v = v || 0;
}

function HSL(h, s, l){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
}

function HSLA(h, s, l, a){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
    this.a = a || 1;
}

function CMYK(c, m, y, k){
    this.c = c || 0;
    this.m = m || 0;
    this.y = y || 0;
    this.k = k || 0;
}

var Colors = {

    TYPES: {
        HEX: "hex",
        RGB: "rgb",
        RGBA: "rgba",
        HSV: "hsv",
        HSL: "hsl",
        CMYK: "cmyk",
        UNKNOWN: "unknown"
    },

    PALETTES: {
        ALL: "colorList",
        METRO: "colorListMetro",
        STANDARD: "colorListStandard"
    },

    colorListMetro: {
        lime: '#a4c400',
        green: '#60a917',
        emerald: '#008a00',
        blue: '#00AFF0',
        teal: '#00aba9',
        cyan: '#1ba1e2',
        cobalt: '#0050ef',
        indigo: '#6a00ff',
        violet: '#aa00ff',
        pink: '#dc4fad',
        magenta: '#d80073',
        crimson: '#a20025',
        red: '#CE352C',
        orange: '#fa6800',
        amber: '#f0a30a',
        yellow: '#fff000',
        brown: '#825a2c',
        olive: '#6d8764',
        steel: '#647687',
        mauve: '#76608a',
        taupe: '#87794e'
    },

    colorListStandard: {
        aliceBlue: "#f0f8ff",
        antiqueWhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedAlmond: "#ffebcd",
        blue: "#0000ff",
        blueViolet: "#8a2be2",
        brown: "#a52a2a",
        burlyWood: "#deb887",
        cadetBlue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerBlue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkBlue: "#00008b",
        darkCyan: "#008b8b",
        darkGoldenRod: "#b8860b",
        darkGray: "#a9a9a9",
        darkGreen: "#006400",
        darkKhaki: "#bdb76b",
        darkMagenta: "#8b008b",
        darkOliveGreen: "#556b2f",
        darkOrange: "#ff8c00",
        darkOrchid: "#9932cc",
        darkRed: "#8b0000",
        darkSalmon: "#e9967a",
        darkSeaGreen: "#8fbc8f",
        darkSlateBlue: "#483d8b",
        darkSlateGray: "#2f4f4f",
        darkTurquoise: "#00ced1",
        darkViolet: "#9400d3",
        deepPink: "#ff1493",
        deepSkyBlue: "#00bfff",
        dimGray: "#696969",
        dodgerBlue: "#1e90ff",
        fireBrick: "#b22222",
        floralWhite: "#fffaf0",
        forestGreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#DCDCDC",
        ghostWhite: "#F8F8FF",
        gold: "#ffd700",
        goldenRod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenYellow: "#adff2f",
        honeyDew: "#f0fff0",
        hotPink: "#ff69b4",
        indianRed: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderBlush: "#fff0f5",
        lawnGreen: "#7cfc00",
        lemonChiffon: "#fffacd",
        lightBlue: "#add8e6",
        lightCoral: "#f08080",
        lightCyan: "#e0ffff",
        lightGoldenRodYellow: "#fafad2",
        lightGray: "#d3d3d3",
        lightGreen: "#90ee90",
        lightPink: "#ffb6c1",
        lightSalmon: "#ffa07a",
        lightSeaGreen: "#20b2aa",
        lightSkyBlue: "#87cefa",
        lightSlateGray: "#778899",
        lightSteelBlue: "#b0c4de",
        lightYellow: "#ffffe0",
        lime: "#00ff00",
        limeGreen: "#32dc32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumAquaMarine: "#66cdaa",
        mediumBlue: "#0000cd",
        mediumOrchid: "#ba55d3",
        mediumPurple: "#9370db",
        mediumSeaGreen: "#3cb371",
        mediumSlateBlue: "#7b68ee",
        mediumSpringGreen: "#00fa9a",
        mediumTurquoise: "#48d1cc",
        mediumVioletRed: "#c71585",
        midnightBlue: "#191970",
        mintCream: "#f5fffa",
        mistyRose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajoWhite: "#ffdead",
        navy: "#000080",
        oldLace: "#fdd5e6",
        olive: "#808000",
        oliveDrab: "#6b8e23",
        orange: "#ffa500",
        orangeRed: "#ff4500",
        orchid: "#da70d6",
        paleGoldenRod: "#eee8aa",
        paleGreen: "#98fb98",
        paleTurquoise: "#afeeee",
        paleVioletRed: "#db7093",
        papayaWhip: "#ffefd5",
        peachPuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderBlue: "#b0e0e6",
        purple: "#800080",
        rebeccaPurple: "#663399",
        red: "#ff0000",
        rosyBrown: "#bc8f8f",
        royalBlue: "#4169e1",
        saddleBrown: "#8b4513",
        salmon: "#fa8072",
        sandyBrown: "#f4a460",
        seaGreen: "#2e8b57",
        seaShell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        slyBlue: "#87ceeb",
        slateBlue: "#6a5acd",
        slateGray: "#708090",
        snow: "#fffafa",
        springGreen: "#00ff7f",
        steelBlue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whiteSmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowGreen: "#9acd32"
    },

    colorList: {},

    options: {
        angle: 30,
        algorithm: 1,
        step: .1,
        distance: 5,
        tint1: .8,
        tint2: .4,
        shade1: .6,
        shade2: .3,
        alpha: 1
    },

    init: function(){
        this.colorList = $.extend( {}, this.colorListStandard, this.colorListMetro );
        return this;
    },

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
    },

    color: function(name, palette){
        palette = palette || this.PALETTES.ALL;
        return this[palette][name] !== undefined ? this[palette][name] : false;
    },

    palette: function(palette){
        palette = palette || this.PALETTES.ALL;
        return Object.keys(this[palette]);
    },

    colors: function(palette){
        var c = [];
        palette = palette || this.PALETTES.ALL;
        $.each(this[palette], function(){
            c.push(this);
        });
        return c;
    },

    hex2rgb: function(hex){
        var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( regex, function( m, r, g, b ) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
        return result ? {
            r: parseInt( result[1], 16 ),
            g: parseInt( result[2], 16 ),
            b: parseInt( result[3], 16 )
        } : null;
    },

    rgb2hex: function(rgb){
        return "#" +
            (( 1 << 24 ) + ( rgb.r << 16 ) + ( rgb.g << 8 ) + rgb.b )
                .toString( 16 ).slice( 1 );
    },

    rgb2hsv: function(rgb){
        var hsv = new HSV();
        var h, s, v;
        var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var delta = max - min;

        v = max;

        if (max === 0) {
            s = 0;
        } else {
            s = 1 - min / max;
        }

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * ( (g - b) / delta );
        } else if (max === r && g < b) {
            h = 60 * ( (g - b) / delta) + 360
        } else if (max === g) {
            h = 60 * ( (b - r) / delta) + 120
        } else if (max === b) {
            h = 60 * ( (r - g) / delta) + 240
        } else {
            h = 0;
        }

        hsv.h = h;
        hsv.s = s;
        hsv.v = v;

        return hsv;
    },

    hsv2rgb: function(hsv){
        var r, g, b;
        var h = hsv.h, s = hsv.s * 100, v = hsv.v * 100;
        var Hi = Math.floor(h / 60);
        var Vmin = (100 - s) * v / 100;
        var alpha = (v - Vmin) * ( (h % 60) / 60 );
        var Vinc = Vmin + alpha;
        var Vdec = v - alpha;

        switch (Hi) {
            case 0: r = v; g = Vinc; b = Vmin; break;
            case 1: r = Vdec; g = v; b = Vmin; break;
            case 2: r = Vmin; g = v; b = Vinc; break;
            case 3: r = Vmin; g = Vdec; b = v; break;
            case 4: r = Vinc; g = Vmin; b = v; break;
            case 5: r = v; g = Vmin; b = Vdec; break;
        }

        return {
            r: Math.round(r * 255 / 100),
            g: Math.round(g * 255 / 100),
            b: Math.round(b * 255 / 100)
        }
    },

    hsv2hex: function(hsv){
        return this.rgb2hex(this.hsv2rgb(hsv));
    },

    hex2hsv: function(hex){
        return this.rgb2hsv(this.hex2rgb(hex));
    },

    rgb2cmyk: function(rgb){
        var cmyk = new CMYK();

        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;

        cmyk.k = Math.min( 1 - r, 1 - g, 1 - b );
        cmyk.c = ( 1 - r - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.m = ( 1 - g - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.y = ( 1 - b - cmyk.k ) / ( 1 - cmyk.k );

        cmyk.c = Math.round( cmyk.c * 100 );
        cmyk.m = Math.round( cmyk.m * 100 );
        cmyk.y = Math.round( cmyk.y * 100 );
        cmyk.k = Math.round( cmyk.k * 100 );

        return cmyk;
    },

    cmyk2rgb: function(cmyk){
        var rgb = new RGB();

        var c = cmyk.c / 100;
        var m = cmyk.m / 100;
        var y = cmyk.y / 100;
        var k = cmyk.k / 100;

        rgb.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        rgb.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        rgb.b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        rgb.r = Math.round( rgb.r * 255 );
        rgb.g = Math.round( rgb.g * 255 );
        rgb.b = Math.round( rgb.b * 255 );

        return rgb;
    },

    hsv2hsl: function(hsv){
        var h, s, l;
        h = hsv.h;
        l = (2 - hsv.s) * hsv.v;
        s = hsv.s * hsv.v;
        s /= (l <= 1) ? l : 2 - l;
        l /= 2;
        return {h: h, s: s, l: l}
    },

    hsl2hsv: function(hsl){
        var h, s, v, l;
        h = hsl.h;
        l = hsl.l * 2;
        s = hsl.s * (l <= 1 ? l : 2 - l);
        v = (l + s) / 2;
        s = (2 * s) / (l + s);
        return {h: h, s: s, l: v}
    },

    rgb2websafe: function(rgb){
        return {
            r: Math.round(rgb.r / 51) * 51,
            g: Math.round(rgb.g / 51) * 51,
            b: Math.round(rgb.b / 51) * 51
        }
    },

    rgba2websafe: function(rgba){
        return {
            r: Math.round(rgba.r / 51) * 51,
            g: Math.round(rgba.g / 51) * 51,
            b: Math.round(rgba.b / 51) * 51,
            a: rgba.a
        }
    },

    hex2websafe: function(hex){
        return this.rgb2hex(this.rgb2websafe(this.toRGB(hex)));
    },

    hsv2websafe: function(hsv){
        return this.rgb2hsv(this.rgb2websafe(this.toRGB(hsv)));
    },

    hsl2websafe: function(hsl){
        return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(hsl))));
    },

    cmyk2websafe: function(cmyk){
        return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(cmyk)));
    },

    websafe: function(color){
        if (this.isHEX(color)) return this.hex2websafe(color);
        if (this.isRGB(color)) return this.rgb2websafe(color);
        if (this.isRGBA(color)) return this.rgba2websafe(color);
        if (this.isHSV(color)) return this.hsv2websafe(color);
        if (this.isHSL(color)) return this.hsl2websafe(color);
        if (this.isCMYK(color)) return this.cmyk2websafe(color);

        return color;
    },

    is: function(color){
        if (this.isHEX(color)) return this.TYPES.HEX;
        if (this.isRGB(color)) return this.TYPES.RGB;
        if (this.isRGBA(color)) return this.TYPES.RGBA;
        if (this.isHSV(color)) return this.TYPES.HSV;
        if (this.isHSL(color)) return this.TYPES.HSL;
        if (this.isCMYK(color)) return this.TYPES.CMYK;

        return this.TYPES.UNKNOWN;
    },

    toRGB: function(color){
        if (this.isHSV(color)) return this.hsv2rgb(color);
        if (this.isHSL(color)) return this.hsv2rgb(this.hsl2hsv(color));
        if (this.isRGB(color)) return color;
        if (this.isHEX(color)) return this.hex2rgb(color);
        if (this.isCMYK(color)) return this.cmyk2rgb(color);

        throw new Error("Unknown color format!");
    },

    toRGBA: function(color, alpha){
        var result = this.toRGB(color);
        result.a = alpha || 1;
        return result;
    },

    toHSV: function(color){
        return this.rgb2hsv(this.toRGB(color));
    },

    toHSL: function(color){
        return this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
    },

    toHSLA: function(color, alpha){
        var hsla;
        hsla = this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
        hsla.a = alpha || this.options.alpha;
        return hsla;
    },

    toHEX: function(color){
        return this.rgb2hex(this.toRGB(color));
    },

    toCMYK: function(color){
        return this.rgb2cmyk(this.toRGB(color));
    },

    toHexString: function(color){
        return this.toHEX(color);
    },

    toHsvString: function(color){
        var hsv = this.toHSV(color);
        return "hsv("+[hsv.h, hsv.s, hsv.v].join(",")+")";
    },

    toHslString: function(color){
        var hsl = this.toHSL(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%"].join(",")+")";
    },

    toHslaString: function(color){
        var hsl = this.toHSLA(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%", hsl.a].join(",")+")";
    },

    toCmykString: function(color){
        var cmyk = this.toCMYK(color);
        return "cmyk("+[cmyk.c, cmyk.m, cmyk.y, cmyk.k].join(",")+")";
    },

    toRgbString: function(color){
        var rgb = this.toRGB(color);
        return "rgb("+[rgb.r, rgb.g, rgb.b].join(",")+")";
    },

    toRgbaString: function(color){
        var rgb = this.toRGBA(color);
        return "rgba("+[rgb.r, rgb.g, rgb.b, rgb.a].join(",")+")";
    },

    toString: function(color){
        if (this.isHEX(color)) return this.toHexString(color);
        if (this.isRGB(color)) return this.toRgbString(color);
        if (this.isRGBA(color)) return this.toRgbaString(color);
        if (this.isHSV(color)) return this.toHsvString(color);
        if (this.isHSL(color)) return this.toHslString(color);
        if (this.isHSLA(color)) return this.toHslaString(color);
        if (this.isCMYK(color)) return this.toCmykString(color);

        throw new Error("Unknown color format!");
    },

    grayscale: function(color, output){
        output = output || "hex";
        var rgb = this.toRGB(color);
        var gray = Math.round(rgb.r * .2125 + rgb.g * .7154 + rgb.b * .0721);
        var mono = {
            r: gray,
            g: gray,
            b: gray
        };
        return this["rgb2"+output](mono);
    },

    darken: function(color, amount){
        if (amount === undefined) {
            amount = 10;
        }
        return this.lighten(color, -1 * Math.abs(amount));
    },

    lighten: function(color, amount){
        var type, res, alpha = 1, ring = amount > 0;

        var calc = function(_color, _amount){
            var col = _color.slice(1);

            var num = parseInt(col, 16);
            var r = (num >> 16) + _amount;

            if (r > 255) r = 255;
            else if  (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + _amount;

            if (b > 255) b = 255;
            else if  (b < 0) b = 0;

            var g = (num & 0x0000FF) + _amount;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            res = "#" + (g | (b << 8) | (r << 16)).toString(16);
            return res;
        };

        if (amount === undefined) {
            amount = 10;
        }

        type = this.is(color);

        if (type === this.TYPES.RGBA) {
            alpha = color.a;
        }

        do {
            res = calc(this.toHEX(color), amount);
            ring ? amount-- : amount++;
        } while (res.length < 7);

        switch (type) {
            case "rgb": return this.toRGB(res);
            case "rgba": return this.toRGBA(res, alpha);
            case "hsv": return this.toHSV(res);
            case "hsl": return this.toHSL(res);
            case "cmyk": return this.toCMYK(res);
            default: return res;
        }
    },

    isDark: function(color){
        var rgb = this.toRGB(color);
        var YIQ = (
            ( rgb.r * 299 ) +
            ( rgb.g * 587 ) +
            ( rgb.b * 114 )
        ) / 1000;
        return ( YIQ < 128 )
    },

    isLight: function(hex){
        return !this.isDark(hex);
    },

    isHSV: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "v" in val;
    },

    isHSL: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val;
    },

    isHSLA: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val && "a" in val;
    },

    isRGB: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val;
    },

    isRGBA: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val && "a" in val;
    },

    isCMYK: function(val){
        return Utils.isObject(val) && "c" in val && "m" in val && "y" in val && "k" in val;
    },

    isHEX: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isColor: function(color){
        return this.isHEX(color) || this.isRGB(color) || this.isRGBA(color) || this.isHSV(color) || this.isHSL(color) || this.isCMYK(color);
    },

    hueShift: function(h, s){
        h+=s;
        while (h >= 360.0) h -= 360.0;
        while (h < 0.0) h += 360.0;
        return h;
    },

    getScheme: function(color, name, format, options){
        this.options = $.extend( {}, this.options, options );

        var i;
        var scheme = [];
        var hsv;
        var that = this;

        hsv = this.toHSV(color);

        if (this.isHSV(hsv) === false) {
            console.log("The value is a not supported color format!");
            return false;
        }

        function convert(source, format) {
            var result = [];
            var o = that.options;
            switch (format) {
                case "hex": result = source.map(function(v){return Colors.toHEX(v);}); break;
                case "rgb": result = source.map(function(v){return Colors.toRGB(v);}); break;
                case "rgba": result = source.map(function(v){return Colors.toRGBA(v, o.alpha);}); break;
                case "hsl": result = source.map(function(v){return Colors.toHSL(v);}); break;
                case "cmyk": result = source.map(function(v){return Colors.toCMYK(v);}); break;
                default: result = source;
            }

            return result;
        }

        function clamp( num, min, max ){
            return Math.max( min, Math.min( num, max ));
        }

        function toRange(a, b, c){
            return a < b ? b : ( a > c ? c : a);
        }

        var rgb, h = hsv.h, s = hsv.s, v = hsv.v;
        var o = this.options;

        switch (name) {
            case "monochromatic":
            case "mono":
                if (o.algorithm === 1) {

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    scheme.push(hsv);

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));
                } else if (o.algorithm === 2) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        s = clamp(s - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else if (o.algorithm === 3) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else {
                    v = clamp(hsv.v + o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v + o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    scheme.push(hsv); s = hsv.s; v = hsv.v;

                    v = clamp(hsv.v - o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v - o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'complementary':
            case 'complement':
            case 'comp':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});
                break;

            case 'double-complementary':
            case 'double-complement':
            case 'double':
                scheme.push(hsv);

                console.log(h);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                console.log(h);

                break;

            case 'analogous':
            case 'analog':

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 0.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'triadic':
            case 'triad':
                scheme.push(hsv);
                for ( i = 1; i < 3; i++ ) {
                    h = this.hueShift(h, 120.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'tetradic':
            case 'tetra':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(hsv.h, -1 * o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'square':
                scheme.push(hsv);
                for ( i = 1; i < 4; i++ ) {
                    h = this.hueShift(h, 90.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'split-complementary':
            case 'split-complement':
            case 'split':
                h = this.hueShift(h, 180.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0 + o.angle);
                scheme.push({h: h, s: s, v: v});
                break;

            default: console.log("Unknown scheme name");
        }

        return convert(scheme, format);
    }
};

Metro['colors'] = Colors.init();

// Source: js/utils/easing.js
$.easing['jswing'] = $.easing['swing'];

$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});


// Source: js/utils/export.js
var Export = {

    init: function(){
        return this;
    },

    options: {
        csvDelimiter: "\t",
        csvNewLine: "\r\n",
        includeHeader: true
    },

    setup: function(options){
        this.options = $.extend({}, this.options, options);
        return this;
    },

    base64: function(data){
        return window.btoa(unescape(encodeURIComponent(data)));
    },

    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        var offset;
        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            var i;
            for (i = 0; i < slice.length; i = i + 1) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new window.Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {
            type: contentType
        });
    },

    tableToCSV: function(table, filename, options){
        var that = this, o = this.options;
        var body, head, data = "";
        var i, j, row, cell;

        o = $.extend({}, o, options);

        if (Utils.isJQueryObject(table)) {
            table = table[0];
        }

        if (Utils.bool(o.includeHeader)) {

            head = table.querySelectorAll("thead")[0];

            for(i = 0; i < head.rows.length; i++) {
                row = head.rows[i];
                for(j = 0; j < row.cells.length; j++){
                    cell = row.cells[j];
                    data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
                }
                data += o.csvNewLine;
            }
        }

        body = table.querySelectorAll("tbody")[0];

        for(i = 0; i < body.rows.length; i++) {
            row = body.rows[i];
            for(j = 0; j < row.cells.length; j++){
                cell = row.cells[j];
                data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
            }
            data += o.csvNewLine;
        }

        if (Utils.isValue(filename)) {
            return this.createDownload(this.base64("\uFEFF" + data), 'application/csv', filename);
        }

        return data;
    },

    createDownload: function (data, contentType, filename) {
        var blob, anchor, url;

        anchor = document.createElement('a');
        anchor.style.display = "none";
        document.body.appendChild(anchor);

        blob = this.b64toBlob(data, contentType);

        url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = filename || Utils.elementId("download");
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
        return true;
    }
};

Metro['export'] = Export.init();


// Source: js/utils/extensions.js
$.fn.extend({
    toggleAttr: function(a, v){
        return this.each(function(){
            var el = $(this);
            if (v !== undefined) {
                el.attr(a, v);
            } else {
                if (el.attr(a) !== undefined) {
                    el.removeAttr(a);
                } else {
                    el.attr(a, ""+a);
                }
            }
        });
    },
    clearClasses: function(){
        return this.each(function(){
            this.className = "";
        });
    }
});

Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

Array.prototype.clone = function () {
    return this.slice(0);
};

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.contains = function() {
    return !!~String.prototype.indexOf.apply(this, arguments);
};

String.prototype.toDate = function(format)
{
    var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
    var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    var formatItems     = normalizedFormat.split('-');
    var dateItems       = normalized.split('-');

    var monthIndex  = formatItems.indexOf("mm");
    var dayIndex    = formatItems.indexOf("dd");
    var yearIndex   = formatItems.indexOf("yyyy");
    var hourIndex     = formatItems.indexOf("hh");
    var minutesIndex  = formatItems.indexOf("ii");
    var secondsIndex  = formatItems.indexOf("ss");

    var today = new Date();

    var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
    var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
    var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

    var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
    var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
    var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year,month,day,hour,minute,second);
};

Date.prototype.format = function(format, locale){

    if (locale === undefined) {
        locale = "en-US";
    }

    var cal = (Metro.locales[locale] !== undefined ? Metro.locales[locale] : Metro.locales["en-US"])['calendar'];

    var date = this;
    var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = cal['days'],
        aMonths = cal['months'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function() {
            return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
        },
        getThursday = function() {
            var target = new Date(date);
            target.setDate(nDate - ((nDay+6)%7) + 3);
            return target;
        },
        zeroPad = function(nNum, nPad) {
            return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
        };
    return format.replace(/%[a-z]/gi, function(sMatch) {
        return {
            '%a': aDays[nDay].slice(0,3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0,3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString(),
            '%C': Math.floor(nYear/100),
            '%d': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': date.toISOString().slice(0,10),
            '%G': getThursday().getFullYear(),
            '%g': ('' + getThursday().getFullYear()).slice(2),
            '%H': zeroPad(nHour, 2),
            '%I': zeroPad((nHour+11)%12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
            '%k': '' + nHour,
            '%l': (nHour+11)%12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            '%M': zeroPad(date.getMinutes(), 2),
            '%p': (nHour<12) ? 'AM' : 'PM',
            '%P': (nHour<12) ? 'am' : 'pm',
            '%s': Math.round(date.getTime()/1000),
            '%S': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (function() {
                var target = getThursday(),
                    n1stThu = target.valueOf();
                target.setMonth(0, 1);
                var nJan1 = target.getDay();
                if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
            '%w': '' + nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': ('' + nYear).slice(2),
            '%Y': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        }[sMatch] || sMatch;
    });
};

Date.prototype.addHours = function(n) {
    this.setTime(this.getTime() + (n*60*60*1000));
    return this;
};

Date.prototype.addDays = function(n) {
    this.setDate(this.getDate() + (n));
    return this;
};

Date.prototype.addMonths = function(n) {
    this.setMonth(this.getMonth() + (n));
    return this;
};

Date.prototype.addYears = function(n) {
    this.setFullYear(this.getFullYear() + (n));
    return this;
};


// Source: js/utils/hotkeys.js
var hotkeys = {

    specialKeys: {
        8: "backspace",
        9: "tab",
        10: "return",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        59: ";",
        61: "=",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    },

    shiftNums: {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
        "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
        "datetime-local", "search", "color", "tel"],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
        filterInputAcceptingElements: METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS,
        filterTextInputs: METRO_HOTKEYS_FILTER_TEXT_INPUTS,
        filterContentEditable: METRO_HOTKEYS_FILTER_CONTENT_EDITABLE
    },

    keyHandler: function(handleObj){
        if (typeof handleObj.data === "string") {
            handleObj.data = {
                keys: handleObj.data
            };
        }

        // Only care when a possible input has been specified
        if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.keys.toLowerCase().split(" ");

        handleObj.handler = function(event) {
            //      Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target &&
                (hotkeys.options.filterInputAcceptingElements && hotkeys.textInputTypes.test(event.target.nodeName) ||
                    (hotkeys.options.filterContentEditable && $(event.target).attr('contenteditable')) ||
                    (hotkeys.options.filterTextInputs && $.inArray(event.target.type, hotkeys.textAcceptingInputTypes) > -1))
            )
            {
                return;
            }

            var special = event.type !== "keypress" && hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                modif = "",
                possible = {};

            $.each(["alt", "ctrl", "shift"], function(index, specialKey) {

                if (event[specialKey + 'Key'] && special !== specialKey) {
                    modif += specialKey + '+';
                }
            });

            // metaKey is triggered off ctrlKey erronously
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }

            if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
                modif = modif.replace("alt+ctrl+shift+", "hyper+");
            }

            if (special) {
                possible[modif + special] = true;
            }
            else {
                possible[modif + character] = true;
                possible[modif + hotkeys.shiftNums[character]] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if (modif === "shift+") {
                    possible[hotkeys.shiftNums[character]] = true;
                }
            }

            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }
};

$.each(["keydown", "keyup", "keypress"], function() {
    $.event.special[this] = {
        add: hotkeys.keyHandler
    };
});


// Source: js/utils/i18n.js
var Locales = {
    'en-US': {
        "calendar": {
            "months": [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            "days": [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
                "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
            ],
            "time": {
                "days": "DAYS",
                "hours": "HOURS",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MON",
                "day": "DAY",
                "year": "YEAR"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Cancel",
            "done": "Done",
            "today": "Today",
            "now": "Now",
            "clear": "Clear",
            "help": "Help",
            "yes": "Yes",
            "no": "No",
            "random": "Random",
            "save": "Save",
            "reset": "Reset"
        }
    },
    
    'cn-ZH': {
        "calendar": {
            "months": [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
            ],
            "days": [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                "日", "一", "二", "三", "四", "五", "六",
                "周日", "周一", "周二", "周三", "周四", "周五", "周六"
            ],
            "time": {
                "days": "天",
                "hours": "时",
                "minutes": "分",
                "seconds": "秒",
                "month": "月",
                "day": "日",
                "year": "年"
            }
        },
        "buttons": {
            "ok": "确认",
            "cancel": "取消",
            "done": "完成",
            "today": "今天",
            "now": "现在",
            "clear": "清除",
            "help": "帮助",
            "yes": "是",
            "no": "否",
            "random": "随机",
            "save": "保存",
            "reset": "重啟"
        }
    },
    
    
    'de-DE': {
        "calendar": {
            "months": [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ],
            "days": [
                "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                "Sn", "Mn", "Di", "Mi", "Do", "Fr", "Sa",
                "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"
            ],
            "time": {
                "days": "TAGE",
                "hours": "UHR",
                "minutes": "MIN",
                "seconds": "SEK"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Abbrechen",
            "done": "Fertig",
            "today": "Heute",
            "now": "Jetzt",
            "clear": "Reinigen",
            "help": "Hilfe",
            "yes": "Ja",
            "no": "Nein",
            "random": "Zufällig",
            "save": "Sparen",
            "reset": "Zurücksetzen"
        }
    },

    'hu-HU': {
        "calendar": {
            "months": [
                'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
                'Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'
            ],
            "days": [
                'Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat',
                'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz',
                'Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szom'
            ],
            "time": {
                "days": "NAP",
                "hours": "ÓRA",
                "minutes": "PERC",
                "seconds": "MP"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Mégse",
            "done": "Kész",
            "today": "Ma",
            "now": "Most",
            "clear": "Törlés",
            "help": "Segítség",
            "yes": "Igen",
            "no": "Nem",
            "random": "Véletlen",
            "save": "Mentés",
            "reset": "Visszaállítás"
        }
    },

    'ru-RU': {
        "calendar": {
            "months": [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            "days": [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНИ",
                "hours": "ЧАСЫ",
                "minutes": "МИН",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Отмена",
            "done": "Готово",
            "today": "Сегодня",
            "now": "Сейчас",
            "clear": "Очистить",
            "help": "Помощь",
            "yes": "Да",
            "no": "Нет",
            "random": "Случайно",
            "save": "Сохранить",
            "reset": "Сброс"
        }
    },

    'uk-UA': {
        "calendar": {
            "months": [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
                "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
            ],
            "days": [
                "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
                "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНІ",
                "hours": "ГОД",
                "minutes": "ХВИЛ",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Відміна",
            "done": "Готово",
            "today": "Сьогодні",
            "now": "Зараз",
            "clear": "Очистити",
            "help": "Допомога",
            "yes": "Так",
            "no": "Ні",
            "random": "Випадково",
            "save": "Зберегти",
            "reset": "Скинути"
        }
    },

    'es-MX': {
        "calendar": {
            "months": [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
            ],
            "days": [
                "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
                "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa",
                "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
            ],
            "time": {
                "days": "DÍAS",
                "hours": "HORAS",
                "minutes": "MINS",
                "seconds": "SEGS",
                "month": "MES",
                "day": "DÍA",
                "year": "AÑO"
            }
        },
        "buttons": {
            "ok": "Aceptar",
            "cancel": "Cancelar",
            "done": "Hecho",
            "today": "Hoy",
            "now": "Ahora",
            "clear": "Limpiar",
            "help": "Ayuda",
            "yes": "Si",
            "no": "No",
            "random": "Aleatorio",
            "save": "Salvar",
            "reset": "Reiniciar"
        }
    },

    'fr-FR': {
        "calendar": {
            "months": [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
                "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
            ],
            "days": [
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "De", "Du", "Ma", "Me", "Je", "Ve", "Sa",
                "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
            ],
            "time": {
                "days": "JOURS",
                "hours": "HEURES",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MOIS",
                "day": "JOUR",
                "year": "ANNEE"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulé",
            "done": "Fait",
            "today": "Aujourd'hui",
            "now": "Maintenant",
            "clear": "Effacé",
            "help": "Aide",
            "yes": "Oui",
            "no": "Non",
            "random": "Aléatoire",
            "save": "Sauvegarder",
            "reset": "Réinitialiser"
        }
    },

    'it-IT': {
        "calendar": {
            "months": [
                "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
                "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
            ],
            "days": [
                "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato",
                "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa",
                "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
            ],
            "time": {
                "days": "GIORNI",
                "hours": "ORE",
                "minutes": "MIN",
                "seconds": "SEC",
                "month": "MESE",
                "day": "GIORNO",
                "year": "ANNO"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulla",
            "done": "Fatto",
            "today": "Oggi",
            "now": "Adesso",
            "clear": "Cancella",
            "help": "Aiuto",
            "yes": "Sì",
            "no": "No",
            "random": "Random",
            "save": "Salvare",
            "reset": "Reset"
        }
    }
};

Metro['locales'] = Locales;


// Source: js/utils/md5.js
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}


/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = new Array(16), opad = new Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = new Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = new Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = [];
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var i;
    var output = new Array(input.length >> 2);
    for (i = 0; i < output.length; i++)
        output[i] = 0;
    for (i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return [a, b, c, d];
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}


// window.md5 = {
//     hex: function(val){
//         return hex_md5(val);
//     },
//
//     b64: function(val){
//         return b64_md5(val);
//     },
//
//     any: function(s, e){
//         return any_md5(s, e);
//     },
//
//     hex_hmac: function(k, d){
//         return hex_hmac_md5(k, d);
//     },
//
//     b64_hmac: function(k, d){
//         return b64_hmac_md5(k, d);
//     },
//
//     any_hmac: function(k, d, e){
//         return any_hmac_md5(k, d, e);
//     }
// };

//$.Metro['md5'] = hex_md5;

// Source: js/utils/mousewheel.js
var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
    toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
        ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
    slice  = Array.prototype.slice,
    nullLowestDeltaTimeout, lowestDelta;

if ( $.event.fixHooks ) {
    for ( var i = toFix.length; i; ) {
        $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    version: '3.1.12',

    setup: function() {
        if ( this.addEventListener ) {
            for ( var i = toBind.length; i; ) {
                this.addEventListener( toBind[--i], mousewheel_handler, false );
            }
        } else {
            this.onmousewheel = mousewheel_handler;
        }
        // Store the line height and page height for this particular element

        $.data(this, 'mousewheel-line-height', $.event.special.mousewheel.getLineHeight(this));
        $.data(this, 'mousewheel-page-height', $.event.special.mousewheel.getPageHeight(this));
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i = toBind.length; i; ) {
                this.removeEventListener( toBind[--i], mousewheel_handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
        // Clean up the data we added to the element
        $.removeData(this, 'mousewheel-line-height');
        $.removeData(this, 'mousewheel-page-height');
    },

    getLineHeight: function(elem) {
        var $elem = $(elem),
            $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
        if (!$parent.length) {
            $parent = $('body');
        }
        return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
    },

    getPageHeight: function(elem) {
        return $(elem).height();
    },

    settings: {
        adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
        normalizeOffset: true  // calls getBoundingClientRect for each event
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },

    unmousewheel: function(fn) {
        return this.unbind('mousewheel', fn);
    }
});


function mousewheel_handler(event) {
    var orgEvent   = event || window.event,
        args       = slice.call(arguments, 1),
        delta      = 0,
        deltaX     = 0,
        deltaY     = 0,
        absDelta   = 0,
        offsetX    = 0,
        offsetY    = 0;
    event = $.event.fix(orgEvent);
    event.type = 'mousewheel';

    // Old school scrollwheel delta
    if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
    if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
    if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
    if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

    // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
    if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaX = deltaY * -1;
        deltaY = 0;
    }

    // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
    delta = deltaY === 0 ? deltaX : deltaY;

    // New school wheel delta (wheel event)
    if ( 'deltaY' in orgEvent ) {
        deltaY = orgEvent.deltaY * -1;
        delta  = deltaY;
    }
    if ( 'deltaX' in orgEvent ) {
        deltaX = orgEvent.deltaX;
        if ( deltaY === 0 ) { delta  = deltaX * -1; }
    }

    // No change actually happened, no reason to go any further
    if ( deltaY === 0 && deltaX === 0 ) { return; }

    // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages

    if ( orgEvent.deltaMode === 1 ) {
        var lineHeight = $.data(this, 'mousewheel-line-height');
        delta  *= lineHeight;
        deltaY *= lineHeight;
        deltaX *= lineHeight;
    } else if ( orgEvent.deltaMode === 2 ) {
        var pageHeight = $.data(this, 'mousewheel-page-height');
        delta  *= pageHeight;
        deltaY *= pageHeight;
        deltaX *= pageHeight;
    }

    // Store lowest absolute delta to normalize the delta values
    absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

    if ( !lowestDelta || absDelta < lowestDelta ) {
        lowestDelta = absDelta;

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            lowestDelta /= 40;
        }
    }

    // Adjust older deltas if necessary
    if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
        // Divide all the things by 40!
        delta  /= 40;
        deltaX /= 40;
        deltaY /= 40;
    }

    // Get a whole, normalized value for the deltas
    delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
    deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
    deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

    // Normalise offsetX and offsetY properties
    if ( $.event.special.mousewheel.settings.normalizeOffset && this.getBoundingClientRect ) {
        var boundingRect = this.getBoundingClientRect();
        offsetX = event.clientX - boundingRect.left;
        offsetY = event.clientY - boundingRect.top;
    }

    // Add information to the event object
    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta;
    event.offsetX = offsetX;
    event.offsetY = offsetY;
    // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.
    event.deltaMode = 0;

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120
    if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

function nullLowestDelta() {
    lowestDelta = null;
}

function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return $.event.special.mousewheel.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
}

// Source: js/utils/scroll-events.js
var dispatch = $.event.dispatch || $.event.handle;
var special = jQuery.event.special,
    uid1 = 'D' + (+new Date()),
    uid2 = 'D' + (+new Date() + 1);

special.scrollstart = {
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                } else {
                    evt.type = 'scrollstart';
                    dispatch.apply(_self, arguments);
                }

                timer = setTimeout(function() {
                    timer = null;
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid1, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid1));
    }
};

special.scrollstop = {
    latency: 250,
    setup: function(data) {
        var _data = $.extend({
            latency: special.scrollstop.latency
        }, data);

        var timer,
            handler = function(evt) {
                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                timer = setTimeout(function() {
                    timer = null;
                    evt.type = 'scrollstop';
                    dispatch.apply(_self, _args);
                }, _data.latency);
            };

        $(this).on('scroll', handler).data(uid2, handler);
    },
    teardown: function() {
        $(this).off('scroll', $(this).data(uid2));
    }
};


// Source: js/utils/session-storage.js
var SessionStorage = {
    key: "METRO:APP",

    init: function( options ) {
        this.options = $.extend( {}, this.options, options );

        return this;
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    setKey: function(key){
        this.key = key;
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        window.sessionStorage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.nvl(window.sessionStorage.getItem(this.key + ":" + key), default_value);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        window.sessionStorage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(window.sessionStorage).length / divider;
    }
};

Metro['session'] = SessionStorage.init();

// Source: js/utils/storage.js
var Storage = {
    key: "METRO:APP",

    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );

        return this;
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    setKey: function(key){
        this.key = key;
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        window.localStorage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.nvl(window.localStorage.getItem(this.key + ":" + key), default_value);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        window.localStorage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(window.localStorage).length / divider;
    }
};

Metro['storage'] = Storage.init();

// Source: js/utils/tpl.js
var TemplateEngine = function(html, options) {
    var re = /<%(.+?)%>/g,
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

Metro['template'] = TemplateEngine;


// Source: js/utils/utilities.js
var Utils = {
    isUrl: function (val) {
        return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(val);
    },

    isTag: function(val){
        return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(val);
    },

    isColor: function (val) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isEmbedObject: function(val){
        var embed = ["iframe", "object", "embed", "video"];
        var result = false;
        $.each(embed, function(){
            if (val.indexOf(this) !== -1) {
                result = true;
            }
        });
        return result;
    },

    isVideoUrl: function(val){
        return /youtu\.be|youtube|vimeo/gi.test(val);
    },

    isDate: function(val){
        return (String(new Date(val)) !== "Invalid Date");
    },

    isInt: function(n){
        return Number(n) === n && n % 1 === 0;
    },

    isFloat: function(n){
        return Number(n) === n && n % 1 !== 0;
    },

    isTouchDevice: function() {
        return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    },

    isFunc: function(f){
        return this.isType(f, 'function');
    },

    isObject: function(o){
        return this.isType(o, 'object')
    },

    isArray: function(a){
        return Array.isArray(a);
    },

    isType: function(o, t){
        if (o === undefined || o === null) {
            return false;
        }

        if (typeof o === t) {
            return o;
        }

        if (this.isTag(o) || this.isUrl(o)) {
            return false;
        }

        if (typeof window[o] === t) {
            return window[o];
        }

        if (typeof o === 'string' && o.indexOf(".") === -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf(" ") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("(") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("[") !== -1) {
            return false;
        }

        var ns = o.split(".");
        var i, context = window;

        for(i = 0; i < ns.length; i++) {
            context = context[ns[i]];
        }

        return typeof context === t ? context : false;
    },

    isMetroObject: function(el, type){
        var $el = $(el), el_obj = $el.data(type);
        if ($el.length === 0) {
            console.log(type + ' ' + el + ' not found!');
            return false;
        }

        if (el_obj === undefined) {
            console.log('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
            return false;
        }

        return true;
    },

    isJQueryObject: function(el){
        return (typeof jQuery === "function" && el instanceof jQuery);
    },

    embedObject: function(val){
        if (typeof  val !== "string" ) {
            val = this.isJQueryObject(val) ? val.html() : val.innerHTML;
        }
        return "<div class='embed-container'>" + val + "</div>";
    },

    embedUrl: function(val){
        if (val.indexOf("youtu.be") !== -1) {
            val = "https://www.youtube.com/embed/" + val.split("/").pop();
        }
        return "<div class='embed-container'><iframe src='"+val+"'></iframe></div>";
    },

    secondsToTime: function(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    hex2rgba: function(hex, alpha){
        var c;
        alpha = isNaN(alpha) ? 1 : alpha;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length=== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
        }
        throw new Error('Hex2rgba error. Bad Hex value');
    },

    random: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
    },

    uniqueId: function () {
var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    elementId: function(prefix){
        return prefix+"-"+(new Date()).getTime()+Utils.random(1, 1000);
    },

    secondsToFormattedString: function(time){
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return [hours, minutes, seconds].join(":");
    },

    callback: function(f, args, context){
        return this.exec(f, args, context);
    },

    func: function(f){
        return new Function("a", f);
    },

    exec: function(f, args, context){
        var result;
        if (f === undefined || f === null) {return false;}
        var func = this.isFunc(f);
        if (func === false) {
            func = this.func(f);
        }

        try {
            result = func.apply(context, args);
        } catch (err) {
            result = null;
            if (METRO_THROWS === true) {
                throw err;
            }
        }
        return result;
    },

    isOutsider: function(el) {
        el = this.isJQueryObject(el) ? el : $(el);
        var rect;
        var clone = el.clone();

        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        el.parent().append(clone);

        rect = clone[0].getBoundingClientRect();
        clone.remove();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    inViewport: function(el){
        var rect = this.rect(el);

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    rect: function(el){
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return rect;
    },

    objectLength: function(obj){
        return Object.keys(obj).length;
    },

    percent: function(total, part, round_value){
        if (total === 0) {
            return 0;
        }
        var result = part * 100 / total;
        return round_value === true ? Math.round(result) : Math.round(result * 100) / 100;
    },

    camelCase: function(str){
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },

    dashedName: function(str){
        return str.replace(/([A-Z])/g, function(u) { return "-" + u.toLowerCase(); });
    },

    objectShift: function(obj){
        var min = 0;
        $.each(obj, function(i){
            if (min === 0) {
                min = i;
            } else {
                if (min > i) {
                    min = i;
                }
            }
        });
        delete obj[min];

        return obj;
    },

    objectDelete: function(obj, key){
        if (obj[key] !== undefined) delete obj[key];
    },

    arrayDelete: function(arr, val){
        arr.splice(arr.indexOf(val), 1);
    },

    arrayDeleteByKey: function(arr, key){
        arr.splice(key, 1);
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    objectClone: function(obj){
        var copy = {};
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    },

    github: function(repo, callback){
        var that = this;
        $.ajax({
            url: 'https://api.github.com/repos/' + repo,
            dataType: 'jsonp'
        })
        .done(function(data){
            that.callback(callback, [data.data]);
        });
    },

    detectIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    detectChrome: function(){
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },

    md5: function(s){
        return hex_md5(s);
    },

    encodeURI: function(str){
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },

    pageHeight: function(){
        var body = document.body,
            html = document.documentElement;

        return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    },

    cleanPreCode: function(selector){
        var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

        els.forEach(function(el){
            var txt = el.textContent
                .replace(/^[\r\n]+/, "")	// strip leading newline
                .replace(/\s+$/g, "");

            if (/^\S/gm.test(txt)) {
                el.textContent = txt;
                return;
            }

            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

            while (mat = re.exec(txt)) {
                len = mat[0].length;

                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }

            if (min === 1e3)
                return;

            el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "");
        });
    },

    coords: function(el){
        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        var box = el.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    },

    positionXY: function(e, t){
        switch (t) {
            case 'client': return this.clientXY(e);
            case 'screen': return this.screenXY(e);
            case 'page': return this.pageXY(e);
            default: return {x: 0, y: 0}
        }
    },

    clientXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
        };
    },

    screenXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
            y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
        };
    },

    pageXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
            y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        };
    },

    isRightMouse: function(e){
        return "which" in e ? e.which === 3 : "button" in e ? e.button === 2 : undefined;
    },

    hiddenElementSize: function(el, includeMargin){
        var clone = $(el).clone();
        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        $("body").append(clone);

        if (includeMargin === undefined) {
            includeMargin = false;
        }

        var width = clone.outerWidth(includeMargin);
        var height = clone.outerHeight(includeMargin);
        clone.remove();
        return {
            width: width,
            height: height
        }
    },

    getStyle: function(el, pseudo){
        if (Utils.isJQueryObject(el) === true) {
            el  = el[0];
        }
        return window.getComputedStyle(el, pseudo);
    },

    getStyleOne: function(el, property){
        return this.getStyle(el).getPropertyValue(property);
    },

    getTransformMatrix: function(el, returnArray){
        var computedMatrix = this.getStyleOne(el, "transform");
        var a = computedMatrix
            .replace("matrix(", '')
            .slice(0, -1)
            .split(',');
        return returnArray !== true ? {
            a: a[0],
            b: a[1],
            c: a[2],
            d: a[3],
            tx: a[4],
            ty: a[5]
        } : a;
    },

    computedRgbToHex: function(rgb){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        var result = "#";
        $.each(a, function(){
            var h = parseInt(this).toString(16);
            result += h.length === 1 ? "0" + h : h;
        });
        return result;
    },

    computedRgbToRgba: function(rgb, alpha){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        if (alpha === undefined) {
            alpha = 1;
        }
        a.push(alpha);
        return "rgba("+a.join(",")+")";
    },

    computedRgbToArray: function(rgb){
        return rgb.replace(/[^\d,]/g, '').split(',');
    },

    hexColorToArray: function(hex){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255];
        }
        return [0,0,0];
    },

    hexColorToRgbA: function(hex, alpha){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255, alpha ? alpha : 1].join(',')+')';
        }
        return 'rgba(0,0,0,1)';
    },

    getInlineStyles: function(el){
        var styles = {};
        if (this.isJQueryObject(el)) {
            el = el[0];
        }
        for (var i = 0, l = el.style.length; i < l; i++) {
            var s = el.style[i];
            styles[s] = el.style[s];
        }

        return styles;
    },

    updateURIParameter: function(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    getURIParameter: function(url, name){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getLocales: function(){
        return Object.keys(Metro.locales);
    },

    addLocale: function(locale){
        Metro.locales = $.extend( {}, Metro.locales, locale );
    },

    strToArray: function(str, delimiter){
        var a;

        if (!this.isValue(delimiter)) {
            delimiter = ",";
        }

        a = (""+str).split(delimiter);

        return a.map(function(s){
            return s.trim();
        })
    },

    aspectRatioH: function(width, a){
        if (a === "16/9") return width * 9 / 16;
        if (a === "21/9") return width * 9 / 21;
        if (a === "4/3") return width * 3 / 4;
    },

    aspectRatioW: function(height, a){
        if (a === "16/9") return height * 16 / 9;
        if (a === "21/9") return height * 21 / 9;
        if (a === "4/3") return height * 4 / 3;
    },

    valueInObject: function(obj, value){
        return Object.values(obj).indexOf(value) > -1;
    },

    keyInObject: function(){
        return Object.keys(obj).indexOf(value) > -1;
    },

    inObject: function(obj, key, val){
        return obj[key] !== undefined && obj[key] === val;
    },

    newCssSheet: function(media){
        var style = document.createElement("style");

        if (media !== undefined) {
            style.setAttribute("media", media);
        }

        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    },

    addCssRule: function(sheet, selector, rules, index){
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },

    media: function(query){
        return window.matchMedia(query).matches
    },

    mediaModes: function(){
        return METRO_MEDIA;
    },

    mediaExist: function(media){
        return METRO_MEDIA.indexOf(media) > -1;
    },

    inMedia: function(media){
        return METRO_MEDIA.indexOf(media) > -1 && METRO_MEDIA.indexOf(media) === METRO_MEDIA.length - 1;
    },

    isValue: function(val){
        return val !== undefined && val !== null && val !== "";
    },

    isNegative: function(val){
        return parseFloat(val) < 0;
    },

    isPositive: function(val){
        return parseFloat(val) > 0;
    },

    isZero: function(val){
        return (parseFloat(val.toFixed(2))) === 0.00;
    },

    between: function(val, bottom, top, equals){
        return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
    },

    parseMoney: function(val){
        return Number(parseFloat(val.replace(/[^0-9-.]/g, '')));
    },

    isVisible: function(el){
        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        return this.getStyleOne(el, "display") !== "none" && this.getStyleOne(el, "visibility") !== "hidden" && el.offsetParent !== null;
    },

    parseNumber: function(val, thousand, decimal){
        return val.replace(new RegExp('\\'+thousand, "g"), "").replace(new RegExp('\\'+decimal, 'g'), ".");
    },

    nearest: function(val, precision, down){
        val /= precision;
        val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
        return val;
    },

    bool: function(value){
        switch(value){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },

    copy: function(el){
        var body = document.body, range, sel;

        if (this.isJQueryObject(el)) {
            el = el[0];
        }

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }

        document.execCommand("Copy");

        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }
};

Metro['utils'] = Utils;

// Source: js/plugins/accordion.js
var Accordion = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onAccordionCreate, [this.element]);

        return this;
    },
    options: {
        duration: METRO_ANIMATION_DURATION,
        oneFrame: true,
        showActive: true,
        activeFrameClass: "",
        activeHeadingClass: "",
        activeContentClass: "",
        onFrameOpen: Metro.noop,
        onFrameBeforeOpen: Metro.noop_true,
        onFrameClose: Metro.noop,
        onFrameBeforeClose: Metro.noop_true,
        onAccordionCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");
        var active = element.children(".frame.active");
        var frame_to_open;

        element.addClass("accordion");

        if (active.length === 0) {
            frame_to_open = frames[0];
        } else {
            frame_to_open = active[0];
        }

        this._hideAll();

        if (o.showActive === true || o.oneFrame === true) {
            this._openFrame(frame_to_open);
        }

        this._createEvents();
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var active = element.children(".frame.active");

        element.on(Metro.events.click, ".heading", function(){
            var heading = $(this);
            var frame = heading.parent();

            if (heading.closest(".accordion")[0] !== element[0]) {
                return false;
            }

            if (frame.hasClass("active")) {
                if (active.length === 1 && o.oneFrame) {
                } else {
                    that._closeFrame(frame);
                }
            } else {
                that._openFrame(frame);
            }

            element.trigger("open", {frame: frame});
        });
    },

    _openFrame: function(f){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");
        var frame = $(f);

        if (Utils.exec(o.onFrameBeforeOpen, [frame], element[0]) === false) {
            return false;
        }

        if (o.oneFrame === true) {
            this._closeAll();
        }

        frame.addClass("active " + o.activeFrameClass);
        frame.children(".heading").addClass(o.activeHeadingClass);
        frame.children(".content").addClass(o.activeContentClass).slideDown(o.duration);

        Utils.exec(o.onFrameOpen, [frame], element[0]);
    },

    _closeFrame: function(f){
        var that = this, element = this.element, o = this.options;
        var frame = $(f);

        if (Utils.exec(o.onFrameBeforeClose, [frame], element[0]) === false) {
            return ;
        }

        frame.removeClass("active " + o.activeFrameClass);
        frame.children(".heading").removeClass(o.activeHeadingClass);
        frame.children(".content").removeClass(o.activeContentClass).slideUp(o.duration);

        Utils.callback(o.onFrameClose, [frame], element[0]);
    },

    _closeAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            that._closeFrame(this);
        });
    },

    _hideAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            $(this).children(".content").hide(0);
        });
    },

    _openAll: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");

        $.each(frames, function(){
            that._openFrame(this);
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        this.element.off(Metro.events.click, ".heading");
    }
};

Metro.plugin('accordion', Accordion);

// Source: js/plugins/activity.js
var Activity = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onActivityCreate, [this.element]);

        return this;
    },

    options: {
        type: "ring",
        style: "light",
        size: 64,
        radius: 20,
        onActivityCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var i, wrap;

        element
            .html('')
            .addClass(o.style + "-style")
            .addClass("activity-" + o.type);

        function _metro(){
            for(i = 0; i < 5 ; i++) {
                $("<div/>").addClass('circle').appendTo(element);
            }
        }

        function _square(){
            for(i = 0; i < 4 ; i++) {
                $("<div/>").addClass('square').appendTo(element);
            }
        }

        function _cycle(){
            $("<div/>").addClass('cycle').appendTo(element);
        }

        function _ring(){
            for(i = 0; i < 5 ; i++) {
                wrap = $("<div/>").addClass('wrap').appendTo(element);
                $("<div/>").addClass('circle').appendTo(wrap);
            }
        }

        function _simple(){
            $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
        }

        switch (o.type) {
            case 'metro': _metro(); break;
            case 'square': _square(); break;
            case 'cycle': _cycle(); break;
            case 'simple': _simple(); break;
            default: _ring();
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.html('')
            .removeClass(o.style + "-style")
            .removeClass("activity-" + o.type);
    }
};

Metro.plugin('activity', Activity);

Metro['activity'] = {
    open: function(options){

        var activity = '<div data-role="activity" data-type="'+( options.type ? options.type : 'cycle' )+'" data-style="'+( options.style ? options.style : 'color' )+'"></div>';
        var text = options.text ? '<div class="text-center">'+options.text+'</div>' : '';

        return Metro.dialog.create({
            content: activity + text,
            defaultAction: false,
            clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
            clsDialog: "no-border no-shadow bg-transparent global-dialog",
            autoHide: options.autoHide ? options.autoHide : 0,
            overlayClickClose: options.overlayClickClose === true,
            overlayColor: options.overlayColor?options.overlayColor:'#000000',
            overlayAlpha: options.overlayAlpha?options.overlayAlpha:.5,
            clsOverlay: "global-overlay"
        })
    },

    close: function(a){
        Metro.dialog.close(a);
    }
};

// Source: js/plugins/app-bar.js
var AppBar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        duration: 100,
        onAppBarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAppBarCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var id = Utils.elementId("app-bar");
        var hamburger, menu;

        element.addClass("app-bar");

        hamburger = element.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down");
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(element, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        element.prepend(hamburger);
        menu = element.find(".app-bar-menu");

        if (menu.length === 0) {
            hamburger.hide();
        } else {
            Utils.addCssRule(Metro.sheet, ".app-bar-menu li", "list-style: none!important;"); // This special for IE11 and Edge
        }

        if( !!element.attr("id") === false ){
            element.attr("id", id);
        }

        if (hamburger.css('display') === 'block') {
            menu.hide().addClass("collapsed");
            hamburger.removeClass("hidden");
        } else {
            hamburger.addClass("hidden");
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        element.on(Metro.events.click, ".hamburger", function(){
            if (menu.length === 0) return ;
            var collapsed = menu.hasClass("collapsed");
            if (collapsed) {
                that.open();
            } else {
                that.close();
            }
        });

        $(window).on(Metro.events.resize+"-"+element.attr("id"), function(){
            if (menu.length === 0) return ;

            if (hamburger.css('display') !== 'block') {
                menu.show();
                hamburger.addClass("hidden");
            } else {
                hamburger.removeClass("hidden");
                if (hamburger.hasClass("active")) {
                    menu.show().removeClass("collapsed");
                } else {
                    menu.hide().addClass("collapsed");
                }
            }
        });
    },

    close: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideUp(o.duration, function(){
            menu.addClass("collapsed");
            hamburger.removeClass("active");
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideDown(o.duration, function(){
            menu.removeClass("collapsed");
            hamburger.addClass("active");
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".hamburger");
        $(window).off(Metro.events.resize+"-"+element.attr("id"));
    }
};

Metro.plugin('appbar', AppBar);

// Source: js/plugins/audio.js
var Audio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.preloader = null;
        this.player = null;
        this.audio = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        playlist: null,
        src: null,

        volume: .5,
        loop: false,
        autoplay: false,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        showPlaylist: true,
        showNext: true,
        showPrev: true,
        showFirst: true,
        showLast: true,
        showForward: true,
        showBackward: true,
        showShuffle: true,
        showRandom: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",

        playlistIcon: "<span class='default-icon-playlist'></span>",
        nextIcon: "<span class='default-icon-next'></span>",
        prevIcon: "<span class='default-icon-prev'></span>",
        firstIcon: "<span class='default-icon-first'></span>",
        lastIcon: "<span class='default-icon-last'></span>",
        forwardIcon: "<span class='default-icon-forward'></span>",
        backwardIcon: "<span class='default-icon-backward'></span>",
        shuffleIcon: "<span class='default-icon-shuffle'></span>",
        randomIcon: "<span class='default-icon-random'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onAudioCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options, audio = this.audio;

        this._createPlayer();
        this._createControls();
        this._createEvents();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onAudioCreate, [element, this.player]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, audio = this.audio;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player audio-player " + element[0].className);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        audio.volume = o.volume;

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);


        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);
        var preloader = $("<div>").addClass("load-audio").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        preloader.activity({
            type: "metro",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!audio.paused) audio.pause();
            },
            onStop: function(val){
                if (audio.seekable.length > 0) {
                    audio.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (audio.paused && audio.currentTime > 0) {
                    audio.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        volumeSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                audio.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = audio.volume;
            that.volume.data('slider').val(0);
            audio.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = audio.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [audio, player]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(audio.currentTime * 100 / that.duration);
            that._setInfo(audio.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [audio.currentTime, that.duration, audio, player]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [audio, player]);
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [audio, player]);
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [audio, player]);
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [audio, player]);
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(){
            if (audio.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.audio.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.audio.volume;
            this.volume.data('slider').val(0);
            this.audio.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.audio.buffered.length ? Math.round(Math.floor(this.audio.buffered.end(0)) / Math.floor(this.audio.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var audio = this.audio, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = audio.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.audio.play();
    },

    pause: function(){
        this.audio.pause();
    },

    resume: function(){
        if (this.audio.paused) {
            this.play();
        }
    },

    stop: function(){
        this.audio.pause();
        this.audio.currentTime = 0;
        this.stream.data('slider').val(0);
    },

    volume: function(v){
        if (v === undefined) {
            return this.audio.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.audio.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    },

    destroy: function(){
        var element = this.element, player = this.player;

        element.off("loadstart");
        element.off("loadedmetadata");
        element.off("canplay");
        element.off("progress");
        element.off("timeupdate");
        element.off("waiting");
        element.off("loadeddata");
        element.off("play");
        element.off("pause");
        element.off("stop");
        element.off("ended");
        element.off("volumechange");
        player.off(Metro.events.click, ".play");
        player.off(Metro.events.click, ".stop");
        player.off(Metro.events.click, ".mute");
        player.off(Metro.events.click, ".loop");

        Metro.destroyPlugin(this.stream, "slider");
        Metro.destroyPlugin(this.volume, "slider");

        element.insertBefore(player);
        player.html("").remove();
    }
};

Metro.plugin('audio', Audio);

// Source: js/plugins/button-group.js
var ButtonGroup = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.active = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        targets: "button",
        clsActive: "active",
        requiredButton: false,
        mode: Metro.groupMode.ONE,
        onButtonClick: Metro.noop,
        onButtonsGroupCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createGroup();
        this._createEvents();

        Utils.exec(o.onButtonsGroupCreate, [element]);
    },

    _createGroup: function(){
        var that = this, element = this.element, o = this.options;
        var cls, buttons, buttons_active, id = Utils.elementId("button-group");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("button-group");

        buttons = element.find( o.targets );
        buttons_active = element.find( "." + o.clsActive );

        if (o.mode === Metro.groupMode.ONE && buttons_active.length === 0 && o.requiredButton === true) {
            $(buttons[0]).addClass(o.clsActive);
        }

        if (o.mode === Metro.groupMode.ONE && buttons_active.length > 1) {
            buttons.removeClass(o.clsActive);
            $(buttons[0]).addClass(o.clsActive);
        }

        element.find( "." + o.clsActive ).addClass("js-active");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, o.targets, function(){
            var el = $(this);

            Utils.exec(o.onButtonClick, [el], this);

            if (o.mode === Metro.groupMode.ONE && el.hasClass(o.clsActive)) {
                return ;
            }

            if (o.mode === Metro.groupMode.ONE) {
                element.find(o.targets).removeClass(o.clsActive).removeClass("js-active");
                el.addClass(o.clsActive).addClass("js-active");
            } else {
                el.toggleClass(o.clsActive).toggleClass("js-active");
            }

        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;
        element.off(Metro.events.click, o.targets);
        element.find(o.targets).removeClass(o.clsActive).removeClass("js-active");
    }

};

Metro.plugin('buttongroup', ButtonGroup);

// Source: js/plugins/calendar.js
var Calendar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.show = new Date();
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };
        this.preset = [];
        this.selected = [];
        this.exclude = [];
        this.special = [];
        this.min = null;
        this.max = null;
        this.locale = null;
        this.minYear = this.current.year - this.options.yearsBefore;
        this.maxYear = this.current.year + this.options.yearsAfter;
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        pickerMode: false,
        show: null,
        locale: METRO_LOCALE,
        weekStart: METRO_WEEK_START,
        outside: true,
        buttons: 'cancel, today, clear, done',
        yearsBefore: 100,
        yearsAfter: 100,
        headerFormat: "%A, %b %e",
        showHeader: true,
        showFooter: true,
        showTimeField: true,
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        clsCancelButton: "",
        clsTodayButton: "",
        clsClearButton: "",
        clsDoneButton: "",
        isDialog: false,
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        weekDayClick: false,
        multiSelect: false,
        special: null,
        onCancel: Metro.noop,
        onToday: Metro.noop,
        onClear: Metro.noop,
        onDone: Metro.noop,
        onDayClick: Metro.noop,
        onWeekDayClick: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop,
        onCalendarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.html("").addClass("calendar").addClass(o.clsCalendar);

        if (o.preset !== null) {
            if (Array.isArray(o.preset) === false) {
                o.preset = o.preset.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.preset, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.selected.push((new Date(this)).getTime());
            });
        }

        if (o.exclude !== null) {
            if (Array.isArray(o.exclude) === false) {
                o.exclude = o.exclude.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.exclude, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.exclude.push((new Date(this)).getTime());
            });
        }

        if (o.special !== null) {
            if (Array.isArray(o.special) === false) {
                o.special = o.special.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.special, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.special.push((new Date(this)).getTime());
            });
        }

        if (o.buttons !== false) {
            if (Array.isArray(o.buttons) === false) {
                o.buttons = o.buttons.split(",").map(function(item){
                    return item.trim();
                });
            }
        }

        if (o.minDate !== null && Utils.isDate(o.minDate)) {
            this.min = (new Date(o.minDate)).addHours(this.offset);
        }

        if (o.maxDate !== null && Utils.isDate(o.maxDate)) {
            this.max = (new Date(o.maxDate)).addHours(this.offset);
        }

        if (o.show !== null && Utils.isDate(o.show)) {
            this.show = (new Date(o.show)).addHours(this.offset);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        this._build();
    },

    _build: function(){
        var element = this.element;

        this._drawCalendar();
        this._bindEvents();

        if (this.options.ripple === true) {
            element.ripple({
                rippleTarget: ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
                rippleColor: this.options.rippleColor
            });
        }


        Utils.exec(this.options.onCalendarCreate, [this.element]);
    },

    _bindEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year", function(e){
            var new_date, el = $(this);

            if (el.hasClass("prev-month")) {
                new_date = new Date(that.current.year, that.current.month - 1, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-month")) {
                new_date = new Date(that.current.year, that.current.month + 1, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }
            if (el.hasClass("prev-year")) {
                new_date = new Date(that.current.year - 1, that.current.month, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-year")) {
                new_date = new Date(that.current.year + 1, that.current.month, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }

            that.current = {
                year: new_date.getFullYear(),
                month: new_date.getMonth(),
                day: new_date.getDate()
            };
            setTimeout(function(){
                that._drawContent();
                if (el.hasClass("prev-month") || el.hasClass("next-month")) {
                    Utils.exec(o.onMonthChange, [that.current, element], element[0]);
                }
                if (el.hasClass("prev-year") || el.hasClass("next-year")) {
                    Utils.exec(o.onYearChange, [that.current, element], element[0]);
                }
            }, o.ripple ? 300 : 0);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.today", function(e){
            // that.today = new Date();
            // that.current = {
            //     year: that.today.getFullYear(),
            //     month: that.today.getMonth(),
            //     day: that.today.getDate()
            // };
            // that._drawHeader();
            // that._drawContent();
            that.toDay();
            Utils.exec(o.onToday, [that.today, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.clear", function(e){
            that.selected = [];
            that._drawContent();
            Utils.exec(o.onClear, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.cancel", function(e){
            that._drawContent();
            Utils.exec(o.onCancel, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.done", function(e){
            that._drawContent();
            Utils.exec(o.onDone, [that.selected, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".week-days .day", function(e){
            if (o.weekDayClick === false || o.multiSelect === false) {
                return ;
            }
            var day = $(this);
            var index = day.index();
            var days = o.outside === true ? element.find(".days-row .day:nth-child("+(index + 1)+")") : element.find(".days-row .day:not(.outside):nth-child("+(index + 1)+")");
            $.each(days, function(){
                var d = $(this);
                var dd = d.data('day');
                Utils.arrayDelete(that.selected, dd);
                that.selected.push(dd);
                d.addClass("selected").addClass(o.clsSelected);
            });
            Utils.exec(o.onWeekDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".days-row .day", function(e){
            var day = $(this);
            var index, date;

            date = day.data('day');
            index = that.selected.indexOf(date);

            if (day.hasClass("outside")) {
                date = new Date(date);
                that.current = {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                };
                that._drawContent();
                return ;
            }

            if (o.pickerMode === true) {
                that.selected = [date];
                that.today = new Date(date);
                that.current.year = that.today.getFullYear();
                that.current.month = that.today.getMonth();
                that.current.day = that.today.getDate();
                that._drawHeader();
                that._drawContent();
            } else {
                if (index === -1) {
                    if (o.multiSelect === false) {
                        element.find(".days-row .day").removeClass("selected").removeClass(o.clsSelected);
                        that.selected = [];
                    }
                    that.selected.push(date);
                    day.addClass("selected").addClass(o.clsSelected);
                } else {
                    day.removeClass("selected").removeClass(o.clsSelected);
                    Utils.arrayDelete(that.selected, date);
                }
            }

            Utils.exec(o.onDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-month", function(e){
            var target;
            var list = element.find(".months-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-months").addClass("open");

            target = list.find(".js-month-"+that.current.month).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-months li", function(e){
            that.current.month = $(this).index();
            that._drawContent();
            Utils.exec(o.onMonthChange, [that.current, element], element[0]);
            element.find(".calendar-months").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-year", function(e){
            var target;
            var list = element.find(".years-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-years").addClass("open");

            target = list.find(".js-year-"+that.current.year).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-years li", function(e){
            that.current.year = $(this).text();
            that._drawContent();
            Utils.exec(o.onYearChange, [that.current, element], element[0]);
            element.find(".calendar-years").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, function(e){
            var months = element.find(".calendar-months");
            var years = element.find(".calendar-years");
            if (months.hasClass("open")) {
                months.removeClass("open");
            }
            if (years.hasClass("open")) {
                years.removeClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });
    },

    _drawHeader: function(){
        var element = this.element, o = this.options;
        var header = element.find(".calendar-header");

        if (header.length === 0) {
            header = $("<div>").addClass("calendar-header").addClass(o.clsCalendarHeader).appendTo(element);
        }

        header.html("");

        $("<div>").addClass("header-year").html(this.today.getFullYear()).appendTo(header);
        $("<div>").addClass("header-day").html(this.today.format(o.headerFormat, o.locale)).appendTo(header);

        if (o.showHeader === false) {
            header.hide();
        }
    },

    _drawFooter: function(){
        var element = this.element, o = this.options;
        var buttons_locale = this.locale['buttons'];
        var footer = element.find(".calendar-footer");

        if (o.buttons === false) {
            return ;
        }

        if (footer.length === 0) {
            footer = $("<div>").addClass("calendar-footer").addClass(o.clsCalendarFooter).appendTo(element);
        }

        footer.html("");

        $.each(o.buttons, function(){
            var button = $("<button>").attr("type", "button").addClass("button " + this + " " + o['cls'+this.capitalize()+'Button']).html(buttons_locale[this]).appendTo(footer);
            if (this === 'cancel' || this === 'done') {
                button.addClass("js-dialog-close");
            }
        });

        if (o.showFooter === false) {
            footer.hide();
        }
    },

    _drawMonths: function(){
        var element = this.element, o = this.options;
        var months = $("<div>").addClass("calendar-months").addClass(o.clsCalendarMonths).appendTo(element);
        var list = $("<ul>").addClass("months-list").appendTo(months);
        var calendar_locale = this.locale['calendar'];
        var i;
        for(i = 0; i < 12; i++) {
            $("<li>").addClass("js-month-"+i).html(calendar_locale['months'][i]).appendTo(list);
        }
    },

    _drawYears: function(){
        var element = this.element, o = this.options;
        var years = $("<div>").addClass("calendar-years").addClass(o.clsCalendarYears).appendTo(element);
        var list = $("<ul>").addClass("years-list").appendTo(years);
        var i;
        for(i = this.minYear; i <= this.maxYear; i++) {
            $("<li>").addClass("js-year-"+i).html(i).appendTo(list);
        }
    },

    _drawContent: function(){
        var element = this.element, o = this.options;
        var content = element.find(".calendar-content"), toolbar;
        var calendar_locale = this.locale['calendar'];
        var i, j, d, s, counter = 0;
        var first = new Date(this.current.year, this.current.month, 1);
        var first_day;
        var prev_month_days = (new Date(this.current.year, this.current.month, 0)).getDate();
        var year, month;

        if (content.length === 0) {
            content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
        }
        content.html("");

        toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

        /**
         * Calendar toolbar
         */
        $("<span>").addClass("prev-month").appendTo(toolbar);
        $("<span>").addClass("curr-month").html(calendar_locale['months'][this.current.month]).appendTo(toolbar);
        $("<span>").addClass("next-month").appendTo(toolbar);

        $("<span>").addClass("prev-year").appendTo(toolbar);
        $("<span>").addClass("curr-year").html(this.current.year).appendTo(toolbar);
        $("<span>").addClass("next-year").appendTo(toolbar);

        /**
         * Week days
         */
        var week_days = $("<div>").addClass("week-days").appendTo(content);
        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) j = 0;
            }
            $("<span>").addClass("day").html(calendar_locale["days"][j + 7]).appendTo(week_days);
        }

        /**
         * Calendar days
         */
        var days = $("<div>").addClass("days").appendTo(content);
        var days_row = $("<div>").addClass("days-row").appendTo(days);

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month - 1 < 0) {
            month = 11;
            year = this.current.year - 1;
        } else {
            month = this.current.month - 1;
            year = this.current.year;
        }

        for(i = 0; i < first_day; i++) {
            var v = prev_month_days - first_day + i + 1;
            d = $("<div>").addClass("day outside").appendTo(days_row);

            s = new Date(year, month, v);
            s.setHours(0,0,0,0);

            d.data('day', s.getTime());

            if (o.outside === true) {
                d.html(v);

                if (this.special.length === 0) {
                    if (this.selected.indexOf(s.getTime()) !== -1) {
                        d.addClass("selected").addClass(o.clsSelected);
                    }
                    if (this.exclude.indexOf(s.getTime()) !== -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.min !== null && s < this.min) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.max !== null && s > this.max) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                } else {
                    if (this.special.indexOf(s.getTime()) === -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }
            }

            counter++;
        }

        first.setHours(0,0,0,0);
        while(first.getMonth() === this.current.month) {
            d = $("<div>").addClass("day").html(first.getDate()).appendTo(days_row);

            d.data('day', first.getTime());

            if (
                this.today.getFullYear() === first.getFullYear() &&
                this.today.getMonth() === first.getMonth() &&
                this.today.getDate() === first.getDate()
            ) {
                d.addClass("today").addClass(o.clsToday);
            }

            if (this.special.length === 0) {

                if (this.selected.indexOf(first.getTime()) !== -1) {
                    d.addClass("selected").addClass(o.clsSelected);
                }
                if (this.exclude.indexOf(first.getTime()) !== -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

                if (this.min !== null && first.getTime() < this.min.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }
                if (this.max !== null && first.getTime() > this.max.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            } else {

                if (this.special.indexOf(first.getTime()) === -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            }

            counter++;
            if (counter % 7 === 0) {
                days_row = $("<div>").addClass("days-row").appendTo(days);
            }
            first.setDate(first.getDate() + 1);
            first.setHours(0,0,0,0);
        }

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month + 1 > 11) {
            month = 0;
            year = this.current.year + 1;
        } else {
            month = this.current.month + 1;
            year = this.current.year;
        }

        if (first_day > 0) for(i = 0; i < 7 - first_day; i++) {
            d = $("<div>").addClass("day outside").appendTo(days_row);
            s = new Date(year, month, i + 1);
            s.setHours(0,0,0,0);
            d.data('day', s.getTime());
            if (o.outside === true) {
                d.html(i + 1);

                if (this.special.length === 0) {

                    if (this.selected.indexOf(s.getTime()) !== -1) {
                        d.addClass("selected").addClass(o.clsSelected);
                    }
                    if (this.exclude.indexOf(s.getTime()) !== -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.min !== null && s.getTime() < this.min.getTime()) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (this.max !== null && s.getTime() > this.max.getTime()) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                } else {
                    if (this.special.indexOf(s.getTime()) === -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }
            }
        }
    },

    _drawCalendar: function(){
        this.element.html("");
        this._drawHeader();
        this._drawContent();
        this._drawFooter();
        this._drawMonths();
        this._drawYears();
    },

    getPreset: function(){
        return this.preset;
    },

    getSelected: function(){
        return this.selected;
    },

    getExcluded: function(){
        return this.exclude;
    },

    getToday: function(){
        return this.today;
    },

    getCurrent: function(){
        return this.current;
    },

    clearSelected: function(){
        this.selected = [];
        this._drawContent();
    },

    toDay: function(){
        this.today = new Date();
        this.current = {
            year: this.today.getFullYear(),
            month: this.today.getMonth(),
            day: this.today.getDate()
        };
        this._drawHeader();
        this._drawContent();
    },

    setExclude: function(exclude){
        var that = this, element = this.element, o = this.options;

        o.exclude = exclude !== undefined ? exclude : element.attr("data-exclude");

        if (o.exclude !== null) {
            if (Array.isArray(o.exclude) === false) {
                o.exclude = o.exclude.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.exclude, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.exclude.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setPreset: function(preset){
        var that = this, element = this.element, o = this.options;

        o.preset = preset !== undefined ? preset : element.attr("data-preset");

        if (o.preset !== null) {

            that.selected = [];

            if (Array.isArray(o.preset) === false) {
                o.preset = o.preset.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.preset, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.selected.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setSpecial: function(special){
        var that = this, element = this.element, o = this.options;

        o.special = special !== undefined ? special : element.attr("data-special");

        if (o.special !== null) {

            that.special = [];

            if (Array.isArray(o.special) === false) {
                o.special = o.special.split(",").map(function(item){
                    return item.trim();
                });
            }

            $.each(o.special, function(){
                if (Utils.isDate(this) === false) {
                    return ;
                }
                that.special.push((new Date(this)).getTime());
            });
        }

        this._drawContent();
    },

    setShow: function(show){
        var that = this, element = this.element, o = this.options;

        o.show = show !== null ? show : element.attr("data-show");

        if (o.show !== null && Utils.isDate(o.show)) {
            this.show = new Date(o.show);
            this.show.setHours(0,0,0,0);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this._drawContent();
    },

    setMinDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.minDate = date !== null ? date : element.attr("data-min-date");

        this._drawContent();
    },

    setMaxDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.maxDate = date !== null ? date : element.attr("data-max-date");

        this._drawContent();
    },

    setToday: function(val){
        if (Utils.isDate(val) === false) {
            return ;
        }
        this.today = new Date(val);
        this.today.setHours(0,0,0,0);
        this._drawHeader();
        this._drawContent();
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];
        this._drawCalendar();
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-exclude': this.setExclude(); break;
            case 'data-preset': this.setPreset(); break;
            case 'data-special': this.setSpecial(); break;
            case 'data-show': this.setShow(); break;
            case 'data-min-date': this.setMinDate(); break;
            case 'data-max-date': this.setMaxDate(); break;
            case 'data-locale': this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year");
        element.off(Metro.events.click, ".button.today");
        element.off(Metro.events.click, ".button.clear");
        element.off(Metro.events.click, ".button.cancel");
        element.off(Metro.events.click, ".button.done");
        element.off(Metro.events.click, ".week-days .day");
        element.off(Metro.events.click, ".days-row .day");
        element.off(Metro.events.click, ".curr-month");
        element.off(Metro.events.click, ".calendar-months li");
        element.off(Metro.events.click, ".curr-year");
        element.off(Metro.events.click, ".calendar-years li");
        element.off(Metro.events.click);

        if (o.ripple === true) Metro.destroyPlugin(element, "ripple");

        element.html("");
    }
};

$(document).on(Metro.events.click, function(e){
    $('.calendar .calendar-years').each(function(){
        $(this).removeClass("open");
    });
    $('.calendar .calendar-months').each(function(){
        $(this).removeClass("open");
    });
});

Metro.plugin('calendar', Calendar);

// Source: js/plugins/calendarpicker.js
var CalendarPicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = null;
        this.value_date = null;
        this.calendar = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCalendarPickerCreate, [this.element]);

        return this;
    },

    dependencies: ['calendar'],

    options: {
        locale: METRO_LOCALE,
        size: "100%",
        format: "%Y/%m/%d",
        headerFormat: "%A, %b %e",
        clearButton: false,
        calendarButtonIcon: "<span class='default-icon-calendar'></span>",
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        copyInlineStyles: false,
        clsPicker: "",
        clsInput: "",

        yearsBefore: 100,
        yearsAfter: 100,
        weekStart: METRO_WEEK_START,
        outside: true,
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        special: null,
        showHeader: true,
        showFooter: true,

        onDayClick: Metro.noop,
        onCalendarPickerCreate: Metro.noop,
        onCalendarShow: Metro.noop,
        onCalendarHide: Metro.noop,
        onChange: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
        var buttons = $("<div>").addClass("button-group");
        var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        this.value = element.val();
        if (Utils.isDate(this.value)) {
            this.value_date = new Date(this.value);
            this.value_date.setHours(0,0,0,0);
            element.val(this.value_date.format(o.format));
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);
        cal.appendTo(container);

        cal.calendar({
            pickerMode: true,
            show: o.value,
            locale: o.locale,
            weekStart: o.weekStart,
            outside: o.outside,
            buttons: false,
            headerFormat: o.headerFormat,
            clsCalendar: o.clsCalendar,
            clsCalendarHeader: o.clsCalendarHeader,
            clsCalendarContent: o.clsCalendarContent,
            clsCalendarFooter: o.clsCalendarFooter,
            clsCalendarMonths: o.clsCalendarMonths,
            clsCalendarYears: o.clsCalendarYears,
            clsToday: o.clsToday,
            clsSelected: o.clsSelected,
            clsExcluded: o.clsExcluded,
            ripple: o.ripple,
            rippleColor: o.rippleColor,
            exclude: o.exclude,
            minDate: o.minDate,
            maxDate: o.maxDate,
            yearsBefore: o.yearsBefore,
            yearsAfter: o.yearsAfter,
            special: o.special,
            showHeader: o.showHeader,
            showFooter: o.showFooter,
            onDayClick: function(sel, day, el){
                var date = new Date(sel[0]);
                that.value = date.format("%Y/%m/%d");
                that.value_date = date;
                element.val(date.format(o.format, o.locale));
                element.trigger("change");
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onChange, [that.value, that.value_date, element]);
                Utils.exec(o.onDayClick, [sel, day, el]);
            },
            onMonthChange: o.onMonthChange,
            onYearChange: o.onYearChange
        });

        cal.hide();

        this.calendar = cal;

        calendarButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.calendarButtonIcon);
        calendarButton.appendTo(buttons);
        container.on(Metro.events.click, "button, input", function(e){
            if (Utils.isDate(that.value) && (cal.hasClass("open") === false && cal.hasClass("open-up") === false)) {
                cal.css({
                    visibility: "hidden",
                    display: "block"
                });
                cal.data('calendar').setPreset(that.value);
                cal.data('calendar').setShow(that.value);
                cal.data('calendar').setToday(that.value);
                cal.css({
                    visibility: "visible",
                    display: "none"
                });
            }
            if (cal.hasClass("open") === false && cal.hasClass("open-up") === false) {
                $(".calendar-picker .calendar").removeClass("open open-up").hide();
                cal.addClass("open");
                if (Utils.isOutsider(cal) === false) {
                    cal.addClass("open-up");
                }
                cal.show();
                Utils.exec(o.onCalendarShow, [element, cal]);
            } else {
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onCalendarHide, [element, cal]);
            }
            e.preventDefault();
            e.stopPropagation();
        });

        if (o.clearButton === true) {
            clearButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function () {
                element.val("").trigger('change');
            });
            clearButton.appendTo(buttons);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        if (String(o.size).indexOf("%") > -1) {
            container.css({
                width: o.size
            });
        } else {
            container.css({
                width: parseInt(o.size) + "px"
            });
        }

        element[0].className = '';
        element.attr("readonly", true);

        if (o.copyInlineStyles === true) {
            $.each(Utils.getInlineStyles(element), function(key, value){
                container.css(key, value);
            });
        }

        container.addClass(o.clsPicker);
        element.addClass(o.clsInput);

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.change, function(){
            Utils.exec(o.onChange, [that.value_date, that.value, element]);
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value_date;
        }

        if (Utils.isDate(v) === true) {
            this.value_date = new Date(v);
            this.value = this.value_date.format(o.format);
            element.val(this.value_date.format(o.format));
            element.trigger("change");
        }
    },

    changeValue: function(){
        var that = this, element = this.element, o = this.options;
        this.val(element.attr("value"));
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var hidden = false;
        var cal = this.calendar;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }

        hidden = cal.is(':hidden');
        if (hidden) {
            cal.css({
                visibility: "hidden",
                display: "block"
            });
        }
        cal.data('calendar').i18n(val);
        if (hidden) {
            cal.css({
                visibility: "visible",
                display: "none"
            });
        }
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttrSpecial: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setSpecial(element.attr("data-special"));
    },

    changeAttrExclude: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setExclude(element.attr("data-exclude"));
    },

    changeAttrMinDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMinDate(element.attr("data-min-date"));
    },

    changeAttrMaxDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMaxDate(element.attr("data-max-date"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value": this.changeValue(); break;
            case 'disabled': this.toggleState(); break;
            case 'data-locale': this.changeAttrLocale(); break;
            case 'data-special': this.changeAttrSpecial(); break;
            case 'data-exclude': this.changeAttrExclude(); break;
            case 'data-min-date': this.changeAttrMinDate(); break;
            case 'data-max-date': this.changeAttrMaxDate(); break;
        }
    }
};

Metro.plugin('calendarpicker', CalendarPicker);

$(document).on(Metro.events.click, function(e){
    $(".calendar-picker .calendar").removeClass("open open-up").hide();
});


// Source: js/plugins/carousel.js
var Carousel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.height = 0;
        this.width = 0;
        this.slides = [];
        this.current = null;
        this.currentIndex = null;
        this.dir = this.options.direction;
        this.interval = null;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        autoStart: false,
        width: "100%",
        height: "16/9", // 3/4, 21/9
        effect: "slide", // slide, fade, switch, slowdown, custom
        effectFunc: "linear",
        direction: "left", //left, right
        duration: METRO_ANIMATION_DURATION,
        period: 5000,
        stopOnMouse: true,

        controls: true,
        bullets: true,
        bulletStyle: "square", // square, circle, rect, diamond
        controlsOnMouse: false,
        controlsOutside: false,
        bulletsPosition: "default", // default, left, right

        controlPrev: '&#x23F4',
        controlNext: '&#x23F5',
        clsCarousel: "",
        clsSlides: "",
        clsSlide: "",
        clsControls: "",
        clsControlNext: "",
        clsControlPrev: "",
        clsBullets: "",
        clsBullet: "",
        clsBulletOn: "",
        clsThumbOn: "",

        onStop: Metro.noop,
        onStart: Metro.noop,
        onPlay: Metro.noop,
        onSlideClick: Metro.noop,
        onBulletClick: Metro.noop,
        onThumbClick: Metro.noop,
        onMouseEnter: Metro.noop,
        onMouseLeave: Metro.noop,
        onNextClick: Metro.noop,
        onPrevClick: Metro.noop,
        onCarouselCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides_container = element.find(".slides");
        var maxHeight = 0;
        var id = Utils.elementId("carousel");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("carousel").addClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.addClass("controls-outside");
        }

        if (slides_container.length === 0) {
            slides_container = $("<div>").addClass("slides").appendTo(element);
            slides.appendTo(slides_container);
        }

        slides.addClass(o.clsSlides);

        if (slides.length === 0) {
            Utils.exec(this.options.onCarouselCreate, [this.element]);
            return ;
        }

        this._createSlides();
        this._createControls();
        this._createBullets();
        this._createEvents();
        this._resize();

        if (o.controlsOnMouse === true) {
            element.find("[class*=carousel-switch]").hide();
            element.find(".carousel-bullets").hide();
        }

        if (o.autoStart === true) {
            this._start();
        }

        Utils.exec(this.options.onCarouselCreate, [this.element]);
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var period = o.period;
        var current = this.slides[this.currentIndex];

        if (current.data("period") !== undefined) {
            period = current.data("period");
        }

        if (this.slides.length <= 1) {
            return ;
        }

        this.interval = setTimeout(function run() {
            var t = o.direction === 'left' ? 'next' : 'prior';
            that._slideTo(t, true);
        }, period);
        Utils.exec(o.onStart, [element]);
    },

    _stop: function(){
        clearInterval(this.interval);
        this.interval = false;
    },

    _resize: function(){
        var that = this, element = this.element, o = this.options;
        var width = element.outerWidth();
        var height;
        var medias = [];

        if (["16/9", "21/9", "4/3"].indexOf(o.height) > -1) {
            height = Utils.aspectRatioH(width, o.height);
        } else {
            if (String(o.height).indexOf("@") > -1) {
                medias = Utils.strToArray(o.height.substr(1), "|");
                $.each(medias, function(){
                    var media = Utils.strToArray(this, ",");
                    if (window.matchMedia(media[0]).matches) {
                        if (["16/9", "21/9", "4/3"].indexOf(media[1]) > -1) {
                            height = Utils.aspectRatioH(width, media[1]);
                        } else {
                            height = parseInt(media[1]);
                        }
                    }
                });
            } else {
                height = parseInt(o.height);
            }
        }

        element.css({
            height: height
        });
    },

    _createSlides: function(){
        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");

        $.each(slides, function(i){
            var slide = $(this);
            if (slide.data("cover") !== undefined) {
                slide.css({
                    backgroundImage: "url("+slide.data('cover')+")",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                });
            }

            if (i !== 0) {
                switch (o.effect) {
                    case "switch":
                    case "slide":
                        slide.css("left", "100%");
                        break;
                    case "slide-v":
                        slide.css("top", "100%");
                        break;
                    case "fade":
                        slide.css("opacity", "0");
                        break;
                }
            }

            slide.addClass(o.clsSlide);

            that.slides.push(slide);
        });

        this.currentIndex = 0;
        this.current = this.slides[this.currentIndex];
    },

    _createControls: function(){
        var element = this.element, o = this.options;
        var next, prev;

        if (o.controls === false) {
            return ;
        }

        next = $('<span/>').addClass('carousel-switch-next').addClass(o.clsControls).addClass(o.clsControlNext).html(">");
        prev = $('<span/>').addClass('carousel-switch-prev').addClass(o.clsControls).addClass(o.clsControlPrev).html("<");

        if (o.controlNext) {
            next.html(o.controlNext);
        }

        if (o.controlPrev) {
            prev.html(o.controlPrev);
        }

        next.appendTo(element);
        prev.appendTo(element);
    },

    _createBullets: function(){
        var element = this.element, o = this.options;
        var bullets, i;

        if (o.bullets === false) {
            return ;
        }

        bullets = $('<div>').addClass("carousel-bullets").addClass("bullet-style-"+o.bulletStyle).addClass(o.clsBullets);
        if (o.bulletsPosition === 'default' || o.bulletsPosition === 'center') {
            bullets.addClass("flex-justify-center");
        } else if (o.bulletsPosition === 'left') {
            bullets.addClass("flex-justify-start");
        } else {
            bullets.addClass("flex-justify-end");
        }

        for (i = 0; i < this.slides.length; i++) {
            var bullet = $('<span>').addClass("carousel-bullet").addClass(o.clsBullet).data("slide", i);
            if (i === 0) {
                bullet.addClass('bullet-on').addClass(o.clsBulletOn);
            }
            bullet.appendTo(bullets);
        }

        bullets.appendTo(element);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".carousel-bullet", function(e){
            var bullet = $(this);
            if (that.isAnimate === false) {
                that._slideToSlide(bullet.data('slide'));
                Utils.exec(o.onBulletClick, [bullet,  element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-next", function(e){
            if (that.isAnimate === false) {
                that._slideTo("next", false);
                Utils.exec(o.onNextClick, [element, e])
            }
        });

        element.on(Metro.events.click, ".carousel-switch-prev", function(e){
            if (that.isAnimate === false) {
                that._slideTo("prev", false);
                Utils.exec(o.onPrevClick, [element, e])
            }
        });

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.on(Metro.events.enter, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeIn();
                    element.find(".carousel-bullets").fadeIn();
                }
                that._stop();
                Utils.exec(o.onMouseEnter, [element, e])
            });
            element.on(Metro.events.leave, function (e) {
                if (o.controlsOnMouse === true) {
                    element.find("[class*=carousel-switch]").fadeOut();
                    element.find(".carousel-bullets").fadeOut();
                }
                that._start();
                Utils.exec(o.onMouseLeave, [element, e])
            });
        }

        if (o.controlsOnMouse === true) {
            element.on(Metro.events.enter, function () {
                element.find("[class*=carousel-switch]").fadeIn();
                element.find(".carousel-bullets").fadeIn();
            });
            element.on(Metro.events.leave, function () {
                element.find("[class*=carousel-switch]").fadeOut();
                element.find(".carousel-bullets").fadeOut();
            });
        }

        element.on(Metro.events.click, ".slide", function(e){
            var slide = $(this);
            Utils.exec(o.onSlideClick, [slide, element, e])
        });

        $(window).on(Metro.events.resize + "-" + element.attr("id"), function(){
            that._resize();
        });
    },

    _slideToSlide: function(index){
        var element = this.element, o = this.options;
        var current, next, to;

        if (this.slides[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.slides[this.currentIndex];
        next = this.slides[index];

        this.currentIndex = index;

        this._effect(current, next, o.effect, to);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);
    },

    _slideTo: function(to, interval){
        var that = this, element = this.element, o = this.options;
        var current, next;

        if (to === undefined) {
            to = "next";
        }

        current = this.slides[this.currentIndex];

        if (to === "next") {
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slides.length - 1;
            }
        }

        next = this.slides[this.currentIndex];

        this._effect(current, next, o.effect, to, interval);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);

    },

    _effect: function(current, next, effect, to, interval){
        var that = this, element = this.element, o = this.options;
        var duration = o.duration;
        var func, effectFunc = o.effectFunc;
        var period = o.period;

        if (next.data('duration') !== undefined) {
            duration = next.data('duration');
        }

        if (next.data('effectFunc') !== undefined) {
            effectFunc = next.data('effectFunc');
        }

        if (effect === 'switch') {
            duration = 0;
        }

        current.stop(true, true);
        next.stop(true, true);
        this.isAnimate = true;

        setTimeout(function(){that.isAnimate = false;}, duration);

        if (effect === 'slide') {
            func = to === 'next' ? 'slideLeft': 'slideRight';
        }

        if (effect === 'slide-v') {
            func = to === 'next' ? 'slideUp': 'slideDown';
        }

        switch (effect) {
            case 'slide': Animation[func](current, next, duration, effectFunc); break;
            case 'slide-v': Animation[func](current, next, duration, effectFunc); break;
            case 'fade': Animation['fade'](current, next, duration, effectFunc); break;
            default: Animation['switch'](current, next);
        }

        if (interval === true) {

            if (next.data('period') !== undefined) {
                period = next.data('period');
            }

            this.interval = setTimeout(function run() {
                var t = o.direction === 'left' ? 'next' : 'prior';
                that._slideTo(t, true);
            }, period);
        }
    },

    toSlide: function(index){
        this._slideToSlide(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    stop: function () {
        clearInterval(this.interval);
        Utils.exec(this.options.onStop, [this.element])
    },

    play: function(){
        this._start();
        Utils.exec(this.options.onPlay, [this.element])
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".carousel-bullet");
        element.off(Metro.events.click, ".carousel-switch-next");
        element.off(Metro.events.click, ".carousel-switch-prev");

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        if (o.controlsOnMouse === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        element.off(Metro.events.click, ".slide");
        $(window).off(Metro.events.resize + "-" + element.attr("id"));

        element.removeClass("carousel").removeClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.removeClass("controls-outside");
        }
    }
};

Metro.plugin('carousel', Carousel);

// Source: js/plugins/charms.js
var Charms = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            background: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        position: "right",
        opacity: 1,
        clsCharms: "",
        onCharmCreate: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCharmCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element
            .addClass("charms")
            .addClass(o.position + "-side")
            .addClass(o.clsCharms);

        this.origin.background = element.css("background-color");

        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), o.opacity)
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        element.on(Metro.events.click, function(e){
        });
    },

    open: function(){
        var element = this.element, o = this.options;

        element.addClass("open");

        Utils.exec(o.onOpen, [element]);
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("open");

        Utils.exec(o.onClose, [element]);
    },

    toggle: function(){
        var element = this.element, o = this.options;

        element.toggleClass("open");

        if (element.hasClass("open") === true) {
            Utils.exec(o.onOpen, [element]);
        } else {
            Utils.exec(o.onClose, [element]);
        }
    },

    opacity: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.opacity;
        }

        var opacity = Math.abs(parseFloat(v));
        if (opacity < 0 || opacity > 1) {
            return ;
        }
        o.opacity = opacity;
        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), opacity)
        });
    },

    changeOpacity: function(){
        var element = this.element;
        this.opacity(element.attr("data-opacity"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-opacity": this.changeOpacity(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click);

        element
            .removeClass("charms")
            .removeClass(o.position + "-side")
            .removeClass(o.clsCharms);

        element.css("background-color", this.origin.background);
    }
};

Metro.plugin('charms', Charms);

Metro['charms'] = {

    check: function(el){
        if (Utils.isMetroObject(el, "charms") === false) {
            console.log("Element is not a charms component");
            return false;
        }
        return true;
    },

    isOpen: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");

        return charms.hasClass("open");
    },

    open: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.open();
    },

    close: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.close();
    },

    toggle: function(el){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.toggle();
    },

    closeAll: function(){
        $('[data-role*=charms]').each(function() {
            $(this).data('charms').close();
        });
    },

    opacity: function(el, opacity){
        if (this.check(el) === false) return ;

        var charms = $(el).data("charms");
        charms.opacity(opacity);
    }
};

// Source: js/plugins/checkbox.js
var Checkbox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCheckboxCreate, [this.element]);

        return this;
    },
    options: {
        style: 1,
        caption: "",
        indeterminate: false,
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onCheckboxCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var checkbox = $("<label>").addClass("checkbox " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.elementId("checkbox"));
        }

        checkbox.attr('for', element.attr('id'));

        element.attr("type", "checkbox");
        element.appendTo(checkbox);

        if (prev.length === 0) {
            parent.prepend(checkbox);
        } else {
            checkbox.insertAfter(prev);
        }

        check.appendTo(checkbox);
        caption.appendTo(checkbox);

        if (o.captionPosition === 'left') {
            checkbox.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        checkbox.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.indeterminate) {
            element[0].indeterminate = true;
        }

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    indeterminate: function(){
        this.element[0].indeterminate = true;
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleIndeterminate: function(){
        this.element[0].indeterminate = JSON.parse(this.element.attr("data-indeterminate")) === true;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-indeterminate': this.toggleIndeterminate(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();

        element[0].className = this.origin.className;
        element.insertBefore(parent);

        parent.remove();
    }
};

Metro.plugin('checkbox', Checkbox);

// Source: js/plugins/clock.js
var Clock = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._clockInterval = null;
        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onClockCreate, [this.element]);

        return this;
    },

    options: {
        showTime: true,
        showDate: true,
        timeFormat: '24',
        dateFormat: 'american',
        divider: "&nbsp;&nbsp;",
        onClockCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this;

        this._tick();
        this._clockInterval = setInterval(function(){
            that._tick();
        }, 500);
    },

    _addLeadingZero: function(i){
        if (i<10){i="0" + i;}
        return i;
    },

    _tick: function(){
        var that = this, element = this.element, o = this.options;
        var timestamp = new Date();
        var time = timestamp.getTime();
        var result = "";
        var h = timestamp.getHours(),
            i = timestamp.getMinutes(),
            s = timestamp.getSeconds(),
            d = timestamp.getDate(),
            m = timestamp.getMonth() + 1,
            y = timestamp.getFullYear(),
            a = '';

        if (o.timeFormat === '12') {
            a = " AM";
            if (h > 11) { a = " PM"; }
            if (h > 12) { h = h - 12; }
            if (h === 0) { h = 12; }
        }

        h = this._addLeadingZero(h);
        i = this._addLeadingZero(i);
        s = this._addLeadingZero(s);
        m = this._addLeadingZero(m);
        d = this._addLeadingZero(d);

        if (o.showDate) {
            if (o.dateFormat === 'american') {
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            } else {
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            }
            result += o.divider;
        }

        if (o.showTime) {
            result += "<span class='clock-hour'>" + h + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-minute'>" + i + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-second'>" + s + "</span>";
        }

        element.html(result);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        clearInterval(this._clockInterval);
        this._clockInterval = null;
        this.element.html("");
    }
};

Metro.plugin('clock', Clock);

// Source: js/plugins/collapse.js
var Collapse = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCollapseCreate, [this.element]);

        return this;
    },

    options: {
        collapsed: false,
        toggleElement: false,
        duration: METRO_ANIMATION_DURATION,
        onExpand: Metro.noop,
        onCollapse: Metro.noop,
        onCollapseCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle;

        toggle = o.toggleElement !== false ? $(o.toggleElement) : element.siblings('.collapse-toggle').length > 0 ? element.siblings('.collapse-toggle') : element.siblings('a:nth-child(1)');

        if (o.collapsed === true || element.attr("collapsed") === true) {
            element.hide(0);
        }

        toggle.on(Metro.events.click, function(e){
            if (element.css('display') === 'block' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                that._open(element);
            }

            console.log(e.target.tagName);

            if (["INPUT"].indexOf(e.target.tagName) === -1) {
                e.preventDefault();
            }
            e.stopPropagation();
        });

        this.toggle = toggle;
    },

    _close: function(el){

        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("collapse");
        var options = dropdown.options;

        this.toggle.removeClass("active-toggle");

        el.slideUp(options.duration, function(){
            el.trigger("onCollapse", null, el);
            el.data("collapsed", true);
            el.addClass("collapsed");
            Utils.exec(options.onCollapse, [el]);
        });
    },

    _open: function(el){
        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("collapse");
        var options = dropdown.options;

        this.toggle.addClass("active-toggle");

        el.slideDown(options.duration, function(){
            el.trigger("onExpand", null, el);
            el.data("collapsed", false);
            el.removeClass("collapsed");
            Utils.exec(options.onExpand, [el]);
        });
    },

    collapse: function(){
        this._close(this.element);
    },

    expand: function(){
        this._open(this.element);
    },

    isCollapsed: function(){
        return this.element.data("collapsed");
    },

    toggleState: function(){
        var element = this.element;
        if (element.attr("collapsed") === true || element.data("collapsed") === true) {
            this.collapse();
        } else {
            this.expand();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "collapsed":
            case "data-collapsed": this.toggleState(); break;
        }
    },

    destroy: function(){
        this.toggle.off(Metro.events.click);
        this.element.show();
    }
};

Metro.plugin('collapse', Collapse);

// Source: js/plugins/countdown.js
var Countdown = {
    init: function( options, elem ) {
        var that = this;
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.timepoint = (new Date()).getTime();
        this.breakpoint = null;
        this.blinkInterval = null;
        this.tickInterval = null;

        this.zeroDaysFired = false;
        this.zeroHoursFired = false;
        this.zeroMinutesFired = false;
        this.zeroSecondsFired = false;

        this.locale = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: null,
        start: true,
        clsCountdown: "",
        clsZero: "",
        clsAlarm: "",
        clsDays: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        onCountdownCreate: Metro.noop,
        onAlarm: Metro.noop,
        onTick: Metro.noop,
        onZero: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];
        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var delta_days, delta_hours, delta_minutes;

        element.addClass("countdown").addClass(o.clsCountdown);

        if (o.date !== null && Utils.isDate(o.date) !== false) {
            this.timepoint = (new Date(o.date)).getTime();
        }

        this.breakpoint = this.timepoint;

        if (parseInt(o.days) > 0) {
            this.breakpoint += parseInt(o.days) * dm;
        }
        if (parseInt(o.hours) > 0) {
            this.breakpoint += parseInt(o.hours) * hm;
        }
        if (parseInt(o.minutes) > 0) {
            this.breakpoint += parseInt(o.minutes) * mm;
        }
        if (parseInt(o.seconds) > 0) {
            this.breakpoint += parseInt(o.seconds) * sm;
        }

        delta_days = Math.round((that.breakpoint - that.timepoint) / dm);
        delta_hours = Math.round((that.breakpoint - that.timepoint) / hm);
        delta_minutes = Math.round((that.breakpoint - that.timepoint) / mm);

        $.each(parts, function(){
            if (this === "days" && delta_days === 0) {
                return ;
            }

            if (this === "hours" && delta_days === 0 && delta_hours === 0) {
                return ;
            }

            if (this === "minutes" && delta_days === 0 && delta_hours === 0 && delta_minutes === 0) {
                return ;
            }

            if (this === "seconds") {
            }

            var part = $("<div>").addClass("part " + this).attr("data-label", that.locale["calendar"]["time"][this]).appendTo(element);

            if (this === "days") {part.addClass(o.clsDays);}
            if (this === "hours") {part.addClass(o.clsHours);}
            if (this === "minutes") {part.addClass(o.clsMinutes);}
            if (this === "seconds") {part.addClass(o.clsSeconds);}

            $("<div>").addClass("digit").appendTo(part);
            $("<div>").addClass("digit").appendTo(part);

            if (this === "days" && delta_days >= 100) {

                for(var i = 0; i < String(delta_days/100).length; i++) {
                    $("<div>").addClass("digit").appendTo(part);
                }

            }
        });

        element.find(".digit").html("0");

        Utils.exec(this.options.onCountdownCreate, [this.element]);

        if (this.options.start === true) {
            this.start();
        }
    },

    blink: function(){
        this.element.toggleClass("blink");
    },

    tick: function(){
        var that = this, element = this.element, o = this.options;
        var dm = 24*60*60, hm = 60*60, mm = 60, sm = 1;
        var left, now = (new Date()).getTime();
        var d, h, m, s;

        left = Math.floor((this.breakpoint - now)/1000);

        if (left <= 0) {
            this.stop();
            if (o.clsZero !== "") {
                element.find(".part").removeClass(o.clsZero);
            }
            element.addClass(o.clsAlarm);
            Utils.exec(o.onAlarm, [now, element]);
            return ;
        }

        d = Math.floor(left / dm);
        left -= d * dm;
        this.draw("days", d);

        if (d === 0) {
            if (o.clsDays !== "") {
                element.find(".days").removeClass(o.clsDays);
            }
            if (this.zeroDaysFired === false) {
                this.zeroDaysFired = true;
                element.find(".days").addClass(o.clsZero);
                Utils.exec(o.onZero, ["days", element]);
            }
        }

        h = Math.floor(left / hm);
        left -= h*hm;
        this.draw("hours", h);

        if (d === 0 && h === 0) {
            if (o.clsHours !== "") {
                element.find(".hours").removeClass(o.clsHours);
            }
            if (this.zeroHoursFired === false) {
                this.zeroHoursFired = true;
                element.find(".hours").addClass(o.clsZero);
                Utils.exec(o.onZero, ["hours", element]);
            }
        }

        m = Math.floor(left / mm);
        left -= m*mm;
        this.draw("minutes", m);

        if (d === 0 && h === 0 && m === 0) {
            if (o.clsMinutes !== "") {
                element.find(".minutes").removeClass(o.clsMinutes);
            }
            if (this.zeroMinutesFired === false) {
                this.zeroMinutesFired = true;
                element.find(".minutes").addClass(o.clsZero);
                Utils.exec(o.onZero, ["minutes", element]);
            }
        }

        s = Math.floor(left / sm);
        this.draw("seconds", s);

        if (d === 0 && h === 0 && m === 0 && s === 0) {
            if (o.clsSeconds !== "") {
                element.find(".seconds").removeClass(o.clsSeconds);
            }
            if (this.zeroSecondsFired === false) {
                this.zeroSecondsFired = true;
                element.find(".seconds").addClass(o.clsZero);
                Utils.exec(o.onZero, ["seconds", element]);
            }
        }

        Utils.exec(o.onTick, [{days:d, hours:h, minutes:m, seconds:s}, element]);
    },

    draw: function(part, value){
        var that = this, element = this.element, o = this.options;
        var digit_value;
        var len = String(value).length;

        var digits = element.find("."+part+" .digit").html("0");
        var digits_length = digits.length;

        for(var i = 0; i < len; i++){
            digit_value = Math.floor( value / Math.pow(10, i) ) % 10;
            element.find("." + part + " .digit:eq("+ (digits_length - 1) +")").html(digit_value);
            digits_length--;
        }
    },

    start: function(){
        var that = this;

        if (this.element.data("paused") === false) {
            return;
        }

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        this.element.data("paused", false);

        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    stop: function(){
        var that = this, element = this.element, o = this.options;
        element.data("paused", true);
        element.find(".digit").html("0");
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
    },

    pause: function(){
        this.element.data("paused", true);
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
    },

    togglePlay: function(){
        if (this.element.attr("data-pause") === true) {
            this.pause();
        } else {
            this.start();
        }
    },

    isPaused: function(){
        return this.element.data("paused");
    },

    getTimepoint: function(asDate){
        return asDate === true ? new Date(this.timepoint) : this.timepoint;
    },

    getBreakpoint: function(asDate){
        return asDate === true ? new Date(this.breakpoint) : this.breakpoint;
    },

    getLeft: function(){
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var now = (new Date()).getTime();
        var left_seconds = Math.floor(this.breakpoint - now);
        return {
            days: Math.round(left_seconds / dm),
            hours: Math.round(left_seconds / hm),
            minutes: Math.round(left_seconds / mm),
            seconds: Math.round(left_seconds / sm)
        };
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];


        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];

        $.each(parts, function(){
            var cls = ".part." + this;
            var part = element.find(cls);
            part.attr("data-label", that.locale["calendar"]["time"][this]);
        });
    },

    changeAttrLocale: function(){
        var element = this.element;
        var locale = element.attr('data-locale');
        this.i18n(locale);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-pause": this.togglePlay(); break;
            case "data-locale": this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        this.element.html("");
        this.element.removeClass("countdown").removeClass(this.options.clsCountdown);
    }
};

Metro.plugin('countdown', Countdown);

// Source: js/plugins/counter.js
var Counter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        delay: 10,
        step: 1,
        value: 0,
        timeout: null,
        delimiter: ",",
        onStart: Metro.noop,
        onStop: Metro.noop,
        onTick: Metro.noop,
        onCounterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._calcArray();

        Utils.exec(o.onCounterCreate, [element], this.elem);

        if (o.timeout !== null && Utils.isInt(o.timeout)) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }
    },

    _calcArray: function(){
        var o = this.options;
        var i;

        for (i = 0; i <= o.value; i += o.step ) {
            this.numbers.push(i);
        }

        if (this.numbers[this.numbers.length - 1] !== o.value) {
            this.numbers.push(o.value);
        }
    },

    start: function(){
        var that = this, element = this.element, o = this.options;

        var tick = function(){
            if (that.numbers.length === 0) {
                Utils.exec(o.onStop, [element], element[0]);
                return ;
            }
            var n = that.numbers.shift();
            Utils.exec(o.onTick, [n, element], element[0]);
            element.html(Number(n).format(0, 0, o.delimiter));
            if (that.numbers.length > 0) {
                setTimeout(tick, o.delay);
            } else {
                Utils.exec(o.onStop, [element], element[0]);
            }
        };

        Utils.exec(o.onStart, [element], element[0]);

        setTimeout(tick, o.delay);
    },

    reset: function(){
        this._calcArray();
        this.element.html(this.html);
    },

    setValueAttribute: function(){
        this.options.value = this.element.attr("data-value");
        this._calcArray();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.setValueAttribute(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('counter', Counter);

// Source: js/plugins/cube.js
var Cube = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.id = null;
        this.rules = null;
        this.interval = false;
        this.ruleInterval = false;
        this.running = false;
        this.intervals = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    default_rules: [
        {
            on: {'top': [16],      'left': [4],         'right': [1]},
            off: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]}
        },
        {
            on: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]},
            off: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]}
        },
        {
            on: {'top': [11],      'left': [7],         'right': [6]},
            off: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]}
        },
        {
            on: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]},
            off: {'top': [16],      'left': [4],         'right': [1]}
        },
        {
            on: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]},
            off: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]}
        },
        {
            on: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]},
            off: {'top': [11],      'left': [7],         'right': [6]}
        },
        {
            on: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]},
            off: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]}
        },
        {
            on: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]},
            off: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]}
        }
    ],

    options: {
        rules: null,
        color: null,
        flashColor: null,
        flashInterval: 1000,
        numbers: false,
        offBefore: true,
        attenuation: .3,
        stopOnBlur: false,
        cells: 4,
        margin: 8,
        showAxis: false,
        axisStyle: "arrow", //line
        cellClick: false,
        autoRestart: 5000,

        clsCube: "",
        clsCell: "",
        clsSide: "",
        clsSideLeft: "",
        clsSideRight: "",
        clsSideTop: "",
        clsSideLeftCell: "",
        clsSideRightCell: "",
        clsSideTopCell: "",
        clsAxis: "",
        clsAxisX: "",
        clsAxisY: "",
        clsAxisZ: "",

        custom: Metro.noop,
        onTick: Metro.noop,
        onCubeCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.rules === null) {
            this.rules = this.default_rules;
        } else {
            this._parseRules(o.rules);
        }

        this._createCube();
        this._createEvents();

        Utils.exec(o.onCubeCreate, [element]);
    },

    _parseRules: function(rules){

        if (rules === undefined || rules === null) {
            return false;
        }

        if (Utils.isObject(rules)) {
            this.rules = Utils.isObject(rules);
            return true;
        } else {
            try {
                this.rules = JSON.parse(rules);
                return true;
            } catch (err) {
                console.log("Unknown or empty rules for cell flashing!");
                return false;
            }
        }
    },

    _createCube: function(){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];
        var id = Utils.elementId("cube");
        var cells_count = Math.pow(o.cells, 2);

        element.addClass("cube").addClass(o.clsCube);

        if (element.attr('id') === undefined) {
            element.attr('id', id);
        }

        this.id = element.attr('id');

        this._createCssForFlashColor();
        this._createCssForCellSize();

        $.each(sides, function(){
            var side, cell, i;

            side = $("<div>").addClass("side " + this+"-side").addClass(o.clsSide).appendTo(element);

            if (this === 'left') {side.addClass(o.clsSideLeft);}
            if (this === 'right') {side.addClass(o.clsSideRight);}
            if (this === 'top') {side.addClass(o.clsSideTop);}

            for(i = 0; i < cells_count; i++) {
                cell = $("<div>").addClass("cube-cell").addClass("cell-id-"+(i+1)).addClass(o.clsCell);
                cell.data("id", i + 1).data("side", this);
                cell.appendTo(side);
                if (o.numbers === true) {
                    cell.html(i + 1);
                }
            }
        });

        var cells  = element.find(".cube-cell");
        if (o.color !== null) {
            if (Utils.isColor(o.color)) {
                cells.css({
                    backgroundColor: o.color,
                    borderColor: o.color
                })
            } else {
                cells.addClass(o.color);
            }
        }

        var axis = ['x', 'y', 'z'];
        $.each(axis, function(){
            var axis_name = this;
            var ax = $("<div>").addClass("axis " + o.axisStyle).addClass("axis-"+axis_name).addClass(o.clsAxis);
            if (axis_name === "x") ax.addClass(o.clsAxisX);
            if (axis_name === "y") ax.addClass(o.clsAxisY);
            if (axis_name === "z") ax.addClass(o.clsAxisZ);
            ax.appendTo(element);
        });

        if (o.showAxis === false) {
            element.find(".axis").hide();
        }

        this._run();
    },

    _run: function(){
        var that = this, element = this.element, o = this.options;
        var interval = 0;

        clearInterval(this.interval);
        element.find(".cube-cell").removeClass("light");

        if (o.custom !== Metro.noop) {
            Utils.exec(o.custom, [element]);
        } else {

            element.find(".cube-cell").removeClass("light");

            that._start();

            interval = Utils.isObject(this.rules) ? Utils.objectLength(this.rules) : 0;

            this.interval = setInterval(function(){
                that._start();
            }, interval * o.flashInterval);
        }
    },

    _createCssForCellSize: function(){
        var that = this, element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var width;
        var cell_size;

        if (o.margin === 8 && o.cells === 4) {
            return ;
        }

        width = parseInt(Utils.getStyleOne(element, 'width'));
        cell_size = Math.ceil((width / 2 - o.margin * o.cells * 2) / o.cells);
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell", "width: "+cell_size+"px!important; height: "+cell_size+"px!important; margin: " + o.margin + "px!important;");
    },

    _createCssForFlashColor: function(){
        var that = this, element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var rule1;
        var rule2;
        var rules1 = [];
        var rules2 = [];
        var i;

        if (o.flashColor === null) {
            return ;
        }

        rule1 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, 1);
        rule2 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, o.attenuation);

        for(i = 0; i < 3; i++) {
            rules1.push(rule1);
            rules2.push(rule2);
        }

        Utils.addCssRule(sheet, "@keyframes pulsar-cell-"+element.attr('id'), "0%, 100% { " + "box-shadow: " + rules1.join(",") + "} 50% { " + "box-shadow: " + rules2.join(",") + " }");
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell.light", "animation: pulsar-cell-" + element.attr('id') + " 2.5s 0s ease-out infinite; " + "background-color: " + o.flashColor + "!important; border-color: " + o.flashColor+"!important;");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        $(window).on(Metro.events.blur + "-" + element.attr("id"), function(){
            if (o.stopOnBlur === true && that.running === true) {
                that._stop();
            }
        });

        $(window).on(Metro.events.focus + "-" + element.attr("id"), function(){
            if (o.stopOnBlur === true && that.running === false) {
                that._start();
            }
        });

        element.on(Metro.events.click, ".cube-cell", function(){
            if (o.cellClick === true) {
                var cell = $(this);
                cell.toggleClass("light");
            }
        });
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];

        element.find(".cube-cell").removeClass("light");

        this.running = true;

        $.each(this.rules, function(index, rule){
            that._execRule(index, rule);
        });
    },

    _stop: function(){
        this.running = false;
        clearInterval(this.interval);
        $.each(this.intervals, function(){
            clearInterval(this);
        })
    },

    _tick: function(index, speed){
        var that = this, element = this.element, o = this.options;
        if (speed === undefined) {
            speed = o.flashInterval * index;
        }

        var interval = setTimeout(function(){
            Utils.exec(o.onTick, [index], element[0]);
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    _toggle: function(cell, func, time, speed){
        var that = this;
        if (speed === undefined) {
            speed = this.options.flashInterval * time;
        }
        var interval = setTimeout(function(){
            cell[func === 'on' ? 'addClass' : 'removeClass']("light");
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    start: function(){
        this._start();
    },

    stop: function(){
        this._stop();
    },

    toRule: function(index, speed){
        var that = this, element = this.element, o = this.options;
        var rules = this.rules;

        if (rules === null || rules === undefined || rules[index] === undefined) {
            return ;
        }
        clearInterval(this.ruleInterval);
        this.ruleInterval = false;
        this.stop();
        element.find(".cube-cell").removeClass("light");
        for (var i = 0; i <= index; i++) {
            this._execRule(i, rules[i], speed);
        }
        if (Utils.isInt(o.autoRestart) && o.autoRestart > 0) {
            this.ruleInterval = setTimeout(function(){
                that._run();
            }, o.autoRestart);
        }
    },

    _execRule: function(index, rule, speed){
        var that = this, element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];

        this._tick(index, speed);

        $.each(sides, function(){
            var side_class = "."+this+"-side";
            var side_name = this;
            var cells_on = rule["on"] !== undefined && rule["on"][side_name] !== undefined ? rule["on"][side_name] : false;
            var cells_off = rule["off"] !== undefined && rule["off"][side_name] !== undefined ? rule["off"][side_name] : false;

            if (cells_on !== false) $.each(cells_on, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'on', index, speed);
            });

            if (cells_off !== false) $.each(cells_off, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'off', index, speed);
            });
        });
    },

    rule: function(r){
        if (r === undefined) {
            return this.rules;
        }

        if (this._parseRules(r) !== true) {
            return ;
        }
        this.options.rules = r;
        this.stop();
        this.element.find(".cube-cell").removeClass("light");
        this._run();
    },

    axis: function(show){
        var func = show === true ? "show" : "hide";
        this.element.find(".axis")[func]();
    },

    changeRules: function(){
        var that = this, element = this.element, o = this.options;
        var rules = element.attr("data-rules");
        if (this._parseRules(rules) !== true) {
            return ;
        }
        this.stop();
        element.find(".cube-cell").removeClass("light");
        o.rules = rules;
        this._run();
    },

    changeAxisVisibility: function(){
        var that = this, element = this.element, o = this.options;
        var visibility = JSON.parse(element.attr("data-show-axis")) === true;
        var func = visibility ? "show" : "hide";
        element.find(".axis")[func]();
    },

    changeAxisStyle: function(){
        var that = this, element = this.element, o = this.options;
        var style = element.attr("data-axis-style");

        element.find(".axis").removeClass("arrow line no-style").addClass(style);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-rules": this.changeRules(); break;
            case "data-show-axis": this.changeAxisVisibility(); break;
            case "data-axis-style": this.changeAxisStyle(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(this.interval);
        this.interval = null;

        $(window).off(Metro.events.blur + "-" + element.attr("id"));
        $(window).off(Metro.events.focus + "-" + element.attr("id"));
        element.off(Metro.events.click, ".cube-cell");

        element.html("");
        element.removeClass("cube").removeClass(o.clsCube);
    }
};

Metro.plugin('cube', Cube);

// Source: js/plugins/datepicker.js
var DatePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = new Date();
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        gmt: 0,
        format: "%Y-%m-%d",
        locale: METRO_LOCALE,
        value: null,
        distance: 3,
        month: true,
        day: true,
        year: true,
        minYear: null,
        maxYear: null,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsMonth: "",
        clsDay: "",
        clsYear: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onDatePickerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.value !== null && Utils.isDate(o.value)) {
            this.value = (new Date(o.value)).addHours(this.offset);
        }

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        if (o.minYear === null) {
            o.minYear = (new Date()).getFullYear() - 100;
        }

        if (o.maxYear === null) {
            o.maxYear = (new Date()).getFullYear() + 100;
        }

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onDatePickerCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var picker, month, day, year, i, j;
        var dateWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("date-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker date-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.appendTo(picker);


        dateWrapper = $("<div>").addClass("date-wrapper").appendTo(picker);

        if (o.month === true) {
            month = $("<div>").addClass("month").addClass(o.clsPart).addClass(o.clsMonth).appendTo(dateWrapper);
        }
        if (o.day === true) {
            day = $("<div>").addClass("day").addClass(o.clsPart).addClass(o.clsDay).appendTo(dateWrapper);
        }
        if (o.year === true) {
            year = $("<div>").addClass("year").addClass(o.clsPart).addClass(o.clsYear).appendTo(dateWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);

        if (o.month === true) {
            month = $("<ul>").addClass("sel-month").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
            for (i = 0; i < 12; i++) {
                $("<li>").addClass("js-month-"+i+" js-month-real-"+this.locale['months'][i].toLowerCase()).html(this.locale['months'][i]).data("value", i).appendTo(month);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
        }

        if (o.day === true) {
            day = $("<ul>").addClass("sel-day").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
            for (i = 0; i < 31; i++) {
                $("<li>").addClass("js-day-"+i+" js-day-real-"+(i+1)).html(i + 1).data("value", i + 1).appendTo(day);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
        }

        if (o.year === true) {
            year = $("<ul>").addClass("sel-year").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
            for (i = o.minYear, j = 0; i <= o.maxYear; i++, j++) {
                $("<li>").addClass("js-year-"+ j + " js-year-real-" + i).html(i).data("value", i).appendTo(year);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move + "-picker", function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            });

            $(document).on(Metro.events.stop + "-picker", function(){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var m, d, y;
            var sm = picker.find(".sel-month li.active"),
                sd = picker.find(".sel-day li.active"),
                sy = picker.find(".sel-year li.active");

            m = sm.length === 0 ? that.value.getMonth() : sm.data("value");
            d = sd.length === 0 ? that.value.getDate() : sd.data("value");
            y = sy.length === 0 ? that.value.getFullYear() : sy.data("value");

            that.value = new Date(y, m, d);
            that._correct();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        this._addScrollEvents();
    },

    _addScrollEvents: function(){
        var picker = this.picker, o = this.options;
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });
            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop()) / 40));
                var target_element = list.find(".js-"+list_name+"-"+target);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop() - 1;

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker], list[0]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['month', 'day', 'year'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _correct: function(){
        var m = this.value.getMonth(),
            d = this.value.getDate(),
            y = this.value.getFullYear();

        this.value = new Date(y, m, d);
    },

    _set: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.locale['months'][this.value.getMonth()],
            d = this.value.getDate(),
            y = this.value.getFullYear();

        if (o.month === true) {
            picker.find(".month").html(m);
        }
        if (o.day === true) {
            picker.find(".day").html(d);
        }
        if (o.year === true) {
            picker.find(".year").html(y);
        }

        element.val(this.value.format(o.format, o.locale)).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker], element[0]);

    },

    open: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.value.getMonth(), d = this.value.getDate() - 1, y = this.value.getFullYear();
        var m_list, d_list, y_list;
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        picker.find("li").removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        if (o.month === true) {
            m_list = picker.find(".sel-month");
            m_list.scrollTop(0).animate({
                scrollTop: m_list.find("li.js-month-" + m).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.day === true) {
            d_list = picker.find(".sel-day");
            d_list.scrollTop(0).animate({
                scrollTop: d_list.find("li.js-day-" + d).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.year === true) {
            y_list = picker.find(".sel-year");
            y_list.scrollTop(0).animate({
                scrollTop: y_list.find("li.js-year-real-" + y).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker], element[0]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker], element[0]);
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        if (Utils.isDate(t) === false) {
            return false;
        }
        this.value = (new Date(t)).addHours(this.offset);
        this._set();
    },

    date: function(t){
        if (t === undefined) {
            return this.value;
        }

        try {
            this.value = new Date(t.format("%Y-%m-%d"));
            this._set();
        } catch (e) {
            return false;
        }
    },

    changeValueAttribute: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValueAttribute(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var picker = this.picker;
        var parent = element.parent();

        this._removeScrollEvents();

        picker.off(Metro.events.start, ".select-block ul");
        picker.off(Metro.events.click);
        picker.off(Metro.events.click, ".action-ok");
        picker.off(Metro.events.click, ".action-cancel");

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('datepicker', DatePicker);

$(document).on(Metro.events.click, function(){
    $.each($(".date-picker"), function(){
        $(this).find("input").data("datepicker").close();
    });
});

// Source: js/plugins/dialog.js
var Dialog = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.interval = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        toTop: false,
        toBottom: false,
        locale: METRO_LOCALE,
        title: "",
        content: "",
        actions: {},
        actionsAlign: "right",
        defaultAction: true,
        overlay: true,
        overlayColor: '#000000',
        overlayAlpha: .5,
        overlayClickClose: false,
        width: '480',
        height: 'auto',
        shadow: true,
        closeAction: true,
        clsDialog: "",
        clsTitle: "",
        clsContent: "",
        clsAction: "",
        clsDefaultAction: "",
        clsOverlay: "",
        autoHide: 0,
        removeOnClose: false,
        show: false,
        onShow: Metro.noop,
        onHide: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onDialogCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];
        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var body = $("body");
        var overlay;

        element.addClass("dialog");

        if (o.shadow === true) {
            element.addClass("shadow-on");
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("dialog"));
        }

        if (o.title !== "") {
            this.setTitle(o.title);
        }

        if (o.content !== "") {
            this.setContent(o.content);
        }

        if (o.defaultAction === true || (o.actions !== false && typeof o.actions === 'object' && Utils.objectLength(o.actions) > 0)) {
            var buttons = element.find(".dialog-actions");
            var button;

            if (buttons.length === 0) {
                buttons = $("<div>").addClass("dialog-actions").addClass("text-"+o.actionsAlign).appendTo(element);
            }

            if (o.defaultAction === true && (Utils.objectLength(o.actions) === 0 && element.find(".dialog-actions > *").length === 0)) {
                button = $("<button>").addClass("button js-dialog-close").addClass(o.clsDefaultAction).html(this.locale["buttons"]["ok"]);
                button.appendTo(buttons);
            }

            $.each(o.actions, function(){
                var item = this;
                button = $("<button>").addClass("button").addClass(item.cls).html(item.caption);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(buttons);
            });
        }

        if (o.overlay === true) {
            overlay  = this._overlay();
            this.overlay = overlay;
        }

        if (o.closeAction === true) {
            element.on(Metro.events.click, ".js-dialog-close", function(){
                that.close();
            });
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.addClass(o.clsDialog);
        element.find(".dialog-title").addClass(o.clsTitle);
        element.find(".dialog-content").addClass(o.clsContent);
        element.find(".dialog-actions").addClass(o.clsAction);

        element.appendTo(body);

        if (o.show) {
            this.open();
        }

        $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
            that.setPosition();
        });

        Utils.exec(this.options.onDialogCreate, [this.element]);
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    hide: function(callback){
        var element = this.element, o = this.options;
        var timeout = 0;
        if (o.onHide !== Metro.noop) {
            timeout = 300;
            Utils.exec(o.onHide, [element]);
        }
        setTimeout(function(){
            element.css({
                visibility: "hidden",
                top: "100%"
            });
            Utils.callback(callback);
        }, timeout);
    },

    show: function(callback){
        var element = this.element, o = this.options;
        this.setPosition();
        element.css({
            visibility: "visible"
        });
        Utils.callback(callback);
        Utils.exec(o.onShow, [element]);
    },

    setPosition: function(){
        var element = this.element, o = this.options;
        var top, left, bottom;
        if (o.toTop !== true && o.toBottom !== true) {
            top = ( $(window).height() - element.outerHeight() ) / 2;
            bottom = "auto";
        } else {
            if (o.toTop === true) {
                top = 0;
                bottom = "auto";
            }
            if (o.toTop !== true && o.toBottom === true) {
                bottom = 0;
                top = "auto";
            }
        }
        element.css({
            top: top,
            bottom: bottom,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    setContent: function(c){
        var that = this, element = this.element, o = this.options;
        var content = element.find(".dialog-content");
        if (content.length === 0) {
            content = $("<div>").addClass("dialog-content");
            content.appendTo(element);
        }

        if (!Utils.isJQueryObject(c) && Utils.isFunc(c)) {
            c = Utils.exec(c);
        }

        if (Utils.isJQueryObject(c)) {
            c.appendTo(content);
        } else {
            content.html(c);
        }
    },

    setTitle: function(t){
        var that = this, element = this.element, o = this.options;
        var title = element.find(".dialog-title");
        if (title.length === 0) {
            title = $("<div>").addClass("dialog-title");
            title.appendTo(element);
        }
        title.html(t);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        $('body').find('.overlay').remove();

        this.hide(function(){
            element.data("open", false);
            Utils.exec(o.onClose, [element]);
            if (o.removeOnClose === true) {
                element.remove();
            }
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
            if (o.overlayClickClose === true) {
                this.overlay.on(Metro.events.click, function(){
                    that.close();
                });
            }
        }

        this.show(function(){
            Utils.exec(o.onOpen, [element]);
            element.data("open", true);
            if (parseInt(o.autoHide) > 0) {
                setTimeout(function(){
                    that.close();
                }, parseInt(o.autoHide));
            }
        });
    },

    toggle: function(){
        var element = this.element;
        if (element.data('open')) {
            this.close();
        } else {
            this.open();
        }
    },

    isOpen: function(){
        return this.element.data('open') === true;
    },

    changeAttribute: function(attributeName){
    }
};

Metro.plugin('dialog', Dialog);

Metro['dialog'] = {

    isDialog: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, content, title){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        if (title !== undefined) {
            dialog.setTitle(title);
        }
        if (content !== undefined) {
            dialog.setContent(content);
        }
        dialog.open();
    },

    close: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.close();
    },

    toggle: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.toggle();
    },

    isOpen: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        return dialog.isOpen();
    },

    remove: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = $(el).data("dialog");
        dialog.options.removeOnClose = true;
        dialog.close();
    },

    create: function(options){
        var dlg;

        dlg = $("<div>").appendTo($("body"));

        var dlg_options = $.extend({}, {
            show: true,
            closeAction: true,
            removeOnClose: true
        }, (options !== undefined ? options : {}));

        return dlg.dialog(dlg_options);
    }
};

// Source: js/plugins/donut.js
var Donut = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.animation_change_interval = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDonutCreate, [this.element]);

        return this;
    },

    options: {
        size: 100,
        radius: 50,
        hole: .8,
        value: 0,
        background: "#ffffff",
        color: "",
        stroke: "#d1d8e7",
        fill: "#49649f",
        fontSize: 24,
        total: 100,
        cap: "%",
        showText: true,
        showValue: false,
        animate: 0,
        onChange: Metro.noop,
        onDonutCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var html = "";
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var width = o.radius * (1 - o.hole);
        var circumference = 2 * Math.PI * r;
        var strokeDasharray = ((o.value * circumference) / o.total) + ' ' + circumference;
        var transform = 'rotate(-90 ' + o.radius + ',' + o.radius + ')';
        var fontSize = r * o.hole * 0.6;

        element.addClass("donut");

        element.css({
            width: o.size,
            height: o.size,
            background: o.background
        });

        html += "<svg>";
        html += "   <circle class='donut-back' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.stroke)+"' stroke-width='"+(width)+"'/>";
        html += "   <circle class='donut-fill' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.fill)+"' stroke-width='"+(width)+"'/>";
        if (o.showText === true) html += "   <text   class='donut-title' x='"+(o.radius)+"px' y='"+(o.radius)+"px' dy='"+(fontSize/3)+"px' text-anchor='middle' fill='"+(o.color !== "" ? o.color: o.fill)+"' font-size='"+(fontSize)+"px'>0"+(o.cap)+"</text>";
        html += "</svg>";

        element.html(html);

        this.val(o.value);
    },

    _setValue: function(v){
        var that = this, element = this.element, o = this.options;

        var fill = element.find(".donut-fill");
        var title = element.find(".donut-title");
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var circumference = 2 * Math.PI * r;
        // var title_value = (o.showValue ? o.value : Math.round(((v * 1000 / o.total) / 10)))+(o.cap);
        var title_value = (o.showValue ? v : Utils.percent(o.total, v, true))  + (o.cap);
        var fill_value = ((v * circumference) / o.total) + ' ' + circumference;

        fill.attr("stroke-dasharray", fill_value);
        title.html(title_value);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value
        }

        if (parseInt(v) < 0 || parseInt(v) > o.total) {
            return false;
        }

        if (o.animate > 0 && !document.hidden) {
            var inc = v > that.value;
            var i = that.value + (inc ? -1 : 1);

            clearInterval(that.animation_change_interval);
            this.animation_change_interval = setInterval(function(){
                if (inc) {
                    that._setValue(++i);
                    if (i >= v) {
                        clearInterval(that.animation_change_interval);
                    }
                } else {
                    that._setValue(--i);
                    if (i <= v) {
                        clearInterval(that.animation_change_interval);
                    }
                }
            }, o.animate);
        } else {
            clearInterval(that.animation_change_interval);
            this._setValue(v);
        }

        this.value = v;
        //element.attr("data-value", v);
        Utils.exec(o.onChange, [this.value, element]);
    },

    changeValue: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
        }
    },

    destroy: function(){
        this.element.removeClass("donut").html("");
    }
};

Metro.plugin('donut', Donut);

// Source: js/plugins/draggable.js
var Draggable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.drag = false;
        this.move = false;
        this.backup = {
            cursor: 'default',
            zIndex: '0'
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDraggableCreate, [this.element]);

        return this;
    },

    options: {
        dragElement: 'self',
        dragArea: "parent",
        onCanDrag: Metro.noop_true,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onDraggableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var dragArea;
        var offset, position, shift, coords;
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        dragElement[0].ondragstart = function(){return false;};

        dragElement.on(Metro.events.start, function(e){

            if (element.data("canDrag") === false || Utils.exec(o.onCanDrag, [element]) !== true) {
                return ;
            }

            if (isTouch === false && e.which !== 1) {
                return ;
            }

            that.drag = true;

            that.backup.cursor = element.css("cursor");
            that.backup.zIndex = element.css("z-index");

            element.addClass("draggable");

            if (o.dragArea === 'document' || o.dragArea === 'window') {
                o.dragArea = "body";
            }

            if (o.dragArea === 'parent') {
                dragArea = element.parent();
            } else {
                dragArea = $(o.dragArea);
            }

            offset = {
                left: dragArea.offset().left,
                top:  dragArea.offset().top
            };

            position = Utils.pageXY(e);

            var drg_h = element.outerHeight(),
                drg_w = element.outerWidth(),
                pos_y = element.offset().top + drg_h - Utils.pageXY(e).y,
                pos_x = element.offset().left + drg_w - Utils.pageXY(e).x;

            Utils.exec(o.onDragStart, [position, element]);

            $(document).on(Metro.events.move, function(e){
                var pageX, pageY;

                if (that.drag === false) {
                    return ;
                }
                that.move = true;

                pageX = Utils.pageXY(e).x - offset.left;
                pageY = Utils.pageXY(e).y - offset.top;

                var t = (pageY > 0) ? (pageY + pos_y - drg_h) : (0);
                var l = (pageX > 0) ? (pageX + pos_x - drg_w) : (0);
                var t_delta = dragArea.innerHeight() + dragArea.scrollTop() - element.outerHeight();
                var l_delta = dragArea.innerWidth() + dragArea.scrollLeft() - element.outerWidth();

                if(t >= 0 && t <= t_delta) {
                    position.y = t;
                    element.offset({top: t + offset.top});
                }
                if(l >= 0 && l <= l_delta) {
                    position.x = l;
                    element.offset({left: l + offset.left});
                }

                Utils.exec(o.onDragMove, [position, element]);

                e.preventDefault();
            });
        });

        dragElement.on(Metro.events.stop, function(e){
            element.css({
                cursor: that.backup.cursor,
                zIndex: that.backup.zIndex
            }).removeClass("draggable");
            that.drag = false;
            that.move = false;
            position = Utils.pageXY(e);
            $(document).off(Metro.events.move);
            //console.log(o.onDragStop);
            Utils.exec(o.onDragStop, [position, element]);
        });
    },

    off: function(){
        this.element.data("canDrag", false);
    },

    on: function(){
        this.element.data("canDrag", true);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('draggable', Draggable);

// Source: js/plugins/dropdown.js
var Dropdown = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._toggle = null;
        this.displayOrigin = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDropdownCreate, [this.element]);

        return this;
    },

    options: {
        effect: 'slide',
        toggleElement: null,
        noClose: false,
        duration: 100,
        onDrop: Metro.noop,
        onUp: Metro.noop,
        onDropdownCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle, parent = element.parent();

        toggle = o.toggleElement !== null ? $(o.toggleElement) : element.siblings('.dropdown-toggle').length > 0 ? element.siblings('.dropdown-toggle') : element.prev();

        this.displayOrigin = element.css("display");
        this.element.css("display", "none");

        toggle.on(Metro.events.click, function(e){
            parent.siblings(parent[0].tagName).removeClass("active-container");
            $(".active-container").removeClass("active-container");

            if (element.css('display') !== 'none' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                $('[data-role=dropdown]').each(function(i, el){
                    if (!element.parents('[data-role=dropdown]').is(el) && !$(el).hasClass('keep-open') && $(el).css('display') !== 'none') {
                        that._close(el);
                    }
                });
                if (element.hasClass('horizontal')) {
                    element.css({
                        'visibility': 'hidden',
                        'display': 'block'
                    });
                    var children_width = 0;
                    $.each(element.children('li'), function(){
                        children_width += $(this).outerWidth(true);
                    });

                    element.css({
                        'visibility': 'visible',
                        'display': 'none'
                    });
                    var menu_width = children_width;
                    element.css('width', menu_width);
                }
                that._open(element);
                parent.addClass("active-container");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        this._toggle = toggle;

        if (o.noClose === true) {
            element.addClass("keep-open").on(Metro.events.click, function (e) {
                //e.preventDefault();
                e.stopPropagation();
            });
        }

        $(element).find('li.disabled a').on(Metro.events.click, function(e){
            e.preventDefault();
        });
    },

    _close: function(el){

        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = options.effect === "slide" ? "slideUp" : "fadeOut";

        toggle.removeClass('active-toggle').removeClass("active-control");
        dropdown.element.parent().removeClass("active-container");
        el[func](options.duration, function(){
            el.trigger("onClose", null, el);
        });
        Utils.exec(options.onUp, [el]);
    },

    _open: function(el){
        if (Utils.isJQueryObject(el) === false) {
            el = $(el);
        }

        var dropdown  = el.data("dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = options.effect === "slide" ? "slideDown" : "fadeIn";

        toggle.addClass('active-toggle').addClass("active-control");
        el[func](options.duration, function(){
            el.trigger("onOpen", null, el);
        });
        Utils.exec(options.onDrop, [el]);
    },

    close: function(){
        this._close(this.element);
    },

    open: function(){
        this._open(this.element);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        this._toggle.off(Metro.events.click);
    }
};

$(document).on(Metro.events.click, function(e){
    $('[data-role*=dropdown]').each(function(){
        var el = $(this);

        if (el.css('display')==='block' && el.hasClass('keep-open') === false) {
            var dropdown = el.data('dropdown');
            dropdown.close();
        }
    });
});

Metro.plugin('dropdown', Dropdown);

// Source: js/plugins/file.js
var File = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onFileCreate, [this.element]);

        return this;
    },
    options: {
        copyInlineStyles: true,
        prepend: "",
        caption: "Choose file",
        disabled: false,
        onSelect: Metro.noop,
        onFileCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("file " + element[0].className);
        var caption = $("<span>").addClass("caption");
        var button;

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        caption.insertBefore(element);

        button = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.caption);
        button.appendTo(container);

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        element[0].className = '';

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var parent = element.parent();
        var caption = parent.find(".caption");
        parent.on(Metro.events.click, "button, .caption", function(){
            element.trigger("click");
        });
        element.on(Metro.events.change, function(){
            var fi = this;
            var file_names = [];
            var entry = "";
            if (fi.files.length === 0) {
                return ;
            }

            Array.from(fi.files).forEach(function(file){
                file_names.push(file.name);
            });

            entry = file_names.join(", ");

            caption.html(entry);
            caption.attr('title', entry);

            Utils.exec(o.onSelect, [fi.files, element], element[0]);
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleDir: function(){
        if (this.element.attr("dir") === 'rtl') {
            this.element.parent().addClass("rtl");
        } else {
            this.element.parent().removeClass("rtl");
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'dir': this.toggleDir(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element.off(Metro.events.change);
        parent.off(Metro.events.click, "button, .caption");
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('file', File);

// Source: js/plugins/gravatar.js
var Gravatar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onGravatarCreate, [this.element]);

        return this;
    },
    options: {
        email: "",
        size: 80,
        default: "404",
        onGravatarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this.get();
    },

    getImage: function(email, size, def, is_jquery_object){
        var image = $("<img>");
        image.attr("src", this.getImageSrc(email, size));
        return is_jquery_object === true ? image : image[0];
    },

    getImageSrc: function(email, size, def){
        if (email === undefined || email.trim() === '') {
            return "";
        }

        size = size || 80;
        def = Utils.encodeURI(def) || '404';

        return "//www.gravatar.com/avatar/" + Utils.md5((email.toLowerCase()).trim()) + '?size=' + size + '&d=' + def;
    },

    get: function(){
        var that = this, element = this.element, o = this.options;
        var img = element[0].tagName === 'IMG' ? element : element.find("img");
        if (img.length === 0) {
            return;
        }
        img.attr("src", this.getImageSrc(o.email, o.size, o.default));
        return this;
    },

    resize: function(new_size){
        this.options.size = new_size !== undefined ? new_size : this.element.attr("data-size");
        this.get();
    },

    email: function(new_email){
        this.options.email = new_email !== undefined ? new_email : this.element.attr("data-email");
        this.get();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-size': this.resize(); break;
            case 'data-email': this.email(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        if (element[0].tagName.toLowerCase() !== "img") {
            element.html("");
        }
    }
};

Metro.plugin('gravatar', Gravatar);

// Source: js/plugins/hint.js
var Hint = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.hint = null;
        this.hint_size = {
            width: 0,
            height: 0
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onHintCreate, [this.element]);

        return this;
    },

    options: {
        hintHide: 5000,
        clsHint: "",
        hintText: "",
        hintPosition: Metro.position.TOP,
        hintOffset: 4,
        onHintCreate: Metro.noop,
        onHintShow: Metro.noop,
        onHintHide: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.enter + "-hint", function(){
            that.createHint();
            if (o.hintHide > 0) {
                setTimeout(function(){
                    that.removeHint();
                }, o.hintHide);
            }
        });

        element.on(Metro.events.leave + "-hint", function(){
            that.removeHint();
        });

        $(window).on(Metro.events.scroll + "-hint", function(){
            if (that.hint !== null) that.setPosition();
        });
    },

    createHint: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var hint = $("<div>").addClass("hint").addClass(o.clsHint).html(o.hintText);

        this.hint = hint;
        this.hint_size = Utils.hiddenElementSize(hint);

        $(".hint:not(.permanent-hint)").remove();

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        hint.appendTo($('body'));
        Utils.exec(o.onHintShow, [hint, element]);
    },

    setPosition: function(){
        var hint = this.hint, hint_size = this.hint_size, o = this.options, element = this.element;

        if (o.hintPosition === Metro.position.BOTTOM) {
            hint.addClass('bottom');
            hint.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.hintOffset,
                left: element.offset().left + element.outerWidth()/2 - hint_size.width/2  - $(window).scrollLeft()
            });
        } else if (o.hintPosition === Metro.position.RIGHT) {
            hint.addClass('right');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.hintOffset
            });
        } else if (o.hintPosition === Metro.position.LEFT) {
            hint.addClass('left');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left - hint_size.width - $(window).scrollLeft() - o.hintOffset
            });
        } else {
            hint.addClass('top');
            hint.css({
                top: element.offset().top - $(window).scrollTop() - hint_size.height - o.hintOffset,
                left: element.offset().left + element.outerWidth()/2 - hint_size.width/2  - $(window).scrollLeft()
            });
        }
    },

    removeHint: function(){
        var that = this;
        var hint = this.hint;
        var element = this.element;
        var options = this.options;
        var timeout = options.onHintHide === Metro.noop ? 0 : 300;

        if (hint !== null) {
            Utils.exec(options.onHintHide, [hint, element]);
            setTimeout(function(){
                hint.hide(0, function(){
                    hint.remove();
                    that.hint = null;
                });
            }, timeout);
        }
    },

    changeText: function(){
        this.options.hintText = this.element.attr("data-hint-text");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-hint-text": this.changeText(); break;
        }
    },

    destroy: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        this.removeHint();
        element.off(Metro.events.enter + "-hint");
        element.off(Metro.events.leave + "-hint");
        $(window).off(Metro.events.scroll + "-hint");
    }
};

Metro.plugin('hint', Hint);

// Source: js/plugins/info-box.js
var InfoBox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        type: "",
        width: 480,
        height: "auto",
        overlay: true,
        overlayColor: '#000000',
        overlayAlpha: .5,
        autoHide: 0,
        removeOnClose: false,
        closeButton: true,
        clsBox: "",
        clsBoxContent: "",
        clsOverlay: "",
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onInfoBoxCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInfoBoxCreate, [element], element[0]);
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var closer, content;

        if (o.overlay === true) {
            this.overlay = this._overlay();
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("infobox"));
        }

        element.addClass("info-box").addClass(o.type).addClass(o.clsBox);

        closer = element.find("closer");
        if (closer.length === 0) {
            closer = $("<span>").addClass("button square closer");
            closer.appendTo(element);
        }

        if (o.closeButton !== true) {
            closer.hide();
        }

        content = element.find(".info-box-content");
        if (content.length > 0) {
            content.addClass(o.clsBoxContent);
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.appendTo($('body'));
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".closer", function(){
            that.close();
        });

        element.on(Metro.events.click, ".js-dialog-close", function(){
            that.close();
        });

        $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
            that.reposition();
        });
    },

    _setPosition: function(){
        var element = this.element;
        element.css({
            top: ( $(window).height() - element.outerHeight() ) / 2,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    reposition: function(){
        this._setPosition();
    },

    setContent: function(c){
        var that = this, element = this.element, o = this.options;
        var content = element.find(".info-box-content");
        if (content.length === 0) {
            return ;
        }
        content.html(c);
        this.reposition();
    },

    setType: function(t){
        var that = this, element = this.element, o = this.options;
        element.removeClass("success info alert warning").addClass(t);
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
        }

        this._setPosition();

        element.css({
            visibility: "visible"
        });

        Utils.exec(o.onOpen, [element], element[0]);
        element.data("open", true);
        if (parseInt(o.autoHide) > 0) {
            setTimeout(function(){
                that.close();
            }, parseInt(o.autoHide));
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            $('body').find('.overlay').remove();
        }

        element.css({
            visibility: "hidden",
            top: "100%"
        });

        Utils.exec(o.onClose, [element], element[0]);
        element.data("open", false);

        if (o.removeOnClose === true) {
            this.destroy();
            element.remove();
        }
    },

    isOpen: function(){
        return this.element.data("open") === true;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".closer");
        element.off(Metro.events.click, ".js-dialog-close");
        $(window).off(Metro.events.resize + "_" + element.attr("id"));
    }
};

Metro.plugin('infobox', InfoBox);

Metro['infobox'] = {
    isInfoBox: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, c, t){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        if (c !== undefined) {
            ib.setContent(c);
        }
        if (t !== undefined) {
            ib.setType(t);
        }
        ib.open();
    },

    close: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        ib.close();
    },

    setContent: function(el, c){
        if (!this.isInfoBox(el)) {
            return false;
        }

        if (c === undefined) {
            c = "";
        }

        var ib = $(el).data("infobox");
        ib.setContent(c);
        ib.reposition();
    },

    setType: function(el, t){
        if (!this.isInfoBox(el)) {
            return false;
        }

        var ib = $(el).data("infobox");
        ib.setType(t);
        ib.reposition();
    },

    isOpen: function(el){
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $(el).data("infobox");
        return ib.isOpen();
    },

    create: function(c, t, o, open){
        var el, ib, box_type, con;

        box_type = t !== undefined ? t : "";

        el = $("<div>").appendTo($("body"));
        $("<div>").addClass("info-box-content").appendTo(el);

        var ib_options = $.extend({}, {
            removeOnClose: true,
            type: box_type
        }, (o !== undefined ? o : {}));

        el.infobox(ib_options);
        ib = el.data('infobox');
        ib.setContent(c);
        if (open !== false) {
            ib.open();
        }

        return el;
    }
};

// Source: js/plugins/input.js
var Input = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element]);

        return this;
    },
    options: {
        defaultValue: "",
        clsElement: "",
        clsInput: "",
        clsPrepend: "",
        clsAppend: "",
        clsClearButton: "",
        clsRevealButton: "",
        size: "default",
        prepend: "",
        append: "",
        copyInlineStyles: true,
        clearButton: true,
        revealButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        revealButtonIcon: "<span class='default-icon-eye'></span>",
        customButtons: [],
        disabled: false,
        onInputCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, revealButton;

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (!Utils.isValue(element.val().trim())) {
            element.val(o.defaultValue);
        }

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(buttons);
        }
        if (element.attr('type') === 'password' && o.revealButton !== false) {
            revealButton = $("<button>").addClass("button input-reveal-button").addClass(o.clsRevealButton).attr("tabindex", -1).attr("type", "button").html(o.revealButtonIcon);
            revealButton
                .on(Metro.events.start, function(){element.attr('type', 'text');})
                .on(Metro.events.stop, function(){element.attr('type', 'password').focus();});
            revealButton.appendTo(buttons);
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>").addClass("button input-custom-button").addClass(item.cls).attr("tabindex", -1).attr("type", "button").html(item.html);
                customButton.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element.val(), customButton], element[0]);
                });
                customButton.appendTo(buttons);
            });
        }

        if (o.append !== "") {
            var append = Utils.isTag(o.append) ? $(o.append) : $("<span>"+o.append+"</span>");
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsElement);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        //this.element.attr("disabled", true);
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        //this.element.attr("disabled", false);
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();
        var clearBtn = parent.find(".input-clear-button");
        var revealBtn = parent.find(".input-reveal-button");
        var customBtn = parent.find(".input-custom-button");

        if (clearBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }
        if (revealBtn.length > 0) {
            revealBtn.off(Metro.events.start);
            revealBtn.off(Metro.events.stop);
        }
        if (customBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }

        element.off(Metro.events.blur);
        element.off(Metro.events.focus);

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('input', Input);

// Source: js/plugins/keypad.js
var Keypad = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = "";
        this.positions = ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"];
        this.keypad = null;

        this._setOptionsFromDOM();

        this.keys = Utils.strToArray(this.options.keys, ",");
        this.keys_to_work = this.keys;

        this._create();

        return this;
    },

    options: {
        keySize: 32,
        keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
        copyInlineStyles: false,
        target: null,
        length: 0,
        shuffle: false,
        shuffleCount: 3,
        position: Metro.position.BOTTOM_LEFT, //top-left, top, top-right, right, bottom-right, bottom, bottom-left, left
        dynamicPosition: false,
        serviceButtons: true,
        showValue: true,
        open: false,
        sizeAsKeys: false,

        clsKeypad: "",
        clsInput: "",
        clsKeys: "",
        clsKey: "",
        clsServiceKey: "",
        clsBackspace: "",
        clsClear: "",

        onChange: Metro.noop,
        onClear: Metro.noop,
        onBackspace: Metro.noop,
        onShuffle: Metro.noop,
        onKey: Metro.noop,
        onKeypadCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createKeypad();
        if (this.options.shuffle === true) {
            this.shuffle();
        }
        this._createKeys();
        this._createEvents();

        Utils.exec(this.options.onKeypadCreate, [this.element]);
    },

    _createKeypad: function(){
        var element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var keypad, keys;

        if (parent.hasClass("input")) {
            keypad = parent;
        } else {
            keypad = $("<div>").addClass("input").addClass(element[0].className);
        }

        keypad.addClass("keypad");
        if (keypad.css("position") === "static" || keypad.css("position") === "") {
            keypad.css({
                position: "relative"
            });
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(keypad);
        } else {
            keypad.insertAfter(prev);
        }

        element.attr("readonly", true);
        element.appendTo(keypad);

        keys = $("<div>").addClass("keys").addClass(o.clsKeys);
        keys.appendTo(keypad);
        this._setKeysPosition();

        if (o.open === true) {
            keys.addClass("open keep-open");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                keypad.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.addClass(o.clsInput);
        keypad.addClass(o.clsKeypad);

        element.on(Metro.events.blur, function(){keypad.removeClass("focused");});
        element.on(Metro.events.focus, function(){keypad.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.keypad = keypad;
    },

    _setKeysPosition: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");
        keys.removeClass(this.positions.join(" ")).addClass(o.position)
    },

    _createKeys: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var factor = Math.round(Math.sqrt(this.keys.length + 2));
        var key_size = o.keySize;
        var width = factor * key_size + factor * 4;
        var key, keys = keypad.find(".keys");

        keys.html("");

        $.each(this.keys_to_work, function(){
            key = $("<span>").addClass("key").addClass(o.clsKey).html(this);
            key.data("key", this);
            key.css({
                width: o.keySize,
                height: o.keySize,
                lineHeight: o.keySize - 4 + "px"
            }).appendTo(keys);
        });

        if (o.serviceButtons === true) {

            var service_keys = ['&larr;', '&times;'];

            $.each(service_keys, function () {
                key = $("<span>").addClass("key service-key").addClass(o.clsKey).addClass(o.clsServiceKey).html(this);
                if (this === '&larr;') {
                    key.addClass(o.clsBackspace);
                }
                if (this === '&times;') {
                    key.addClass(o.clsClear);
                }
                key.data("key", this);
                key.css({
                    width: o.keySize,
                    height: o.keySize,
                    lineHeight: o.keySize - 4 + "px"
                }).appendTo(keys);
            });
        }

        keys.width(width);

        if (o.sizeAsKeys === true && ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].indexOf(o.position) !== -1) {
            keypad.outerWidth(keys.outerWidth());
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keypad.on(Metro.events.click, ".keys", function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, function(e){
            if (o.open === true) {
                return ;
            }
            if (keys.hasClass("open") === true) {
                keys.removeClass("open");
            } else {
                keys.addClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, ".key", function(e){
            var key = $(this);

            if (key.data('key') !== '&larr;' && key.data('key') !== '&times;') {
                if (o.length > 0 && (String(that.value).length === o.length)) {
                    return false;
                }

                that.value = that.value + "" + key.data('key');

                if (o.shuffle === true) {
                    that.shuffle();
                    that._createKeys();
                }

                if (o.dynamicPosition === true) {
                    o.position = that.positions[Utils.random(0, that.positions.length - 1)];
                    that._setKeysPosition();
                }

                Utils.exec(o.onKey, [key.data('key'), that.value, element]);
            } else {
                if (key.data('key') === '&times;') {
                    that.value = "";
                    Utils.exec(o.onClear, [element]);
                }
                if (key.data('key') === '&larr;') {
                    that.value = (that.value.substring(0, that.value.length - 1));
                    Utils.exec(o.onBackspace, [that.value, element]);
                }
            }

            if (o.showValue === true) {
                if (element[0].tagName === "INPUT") {
                    element.val(that.value);
                } else {
                    element.text(that.value);
                }
            }

            element.trigger('change');
            Utils.exec(o.onChange, [that.value, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        if (o.target !== null) {
            element.on(Metro.events.change, function(){
                var t = $(o.target);
                if (t.length === 0) {
                    return ;
                }
                if (t[0].tagName === "INPUT") {
                    t.val(that.value);
                } else {
                    t.text(that.value);
                }
            });
        }
    },

    shuffle: function(){
        for (var i = 0; i < this.options.shuffleCount; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        Utils.exec(this.options.onShuffle, [this.keys_to_work, this.keys, this.element]);
    },

    shuffleKeys: function(count){
        if (count === undefined) {
            count = this.options.shuffleCount;
        }
        for (var i = 0; i < count; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        this._createKeys();
    },

    val: function(v){
        if (v !== undefined) {
            this.value = v;
            this.element[0].tagName === "INPUT" ? this.element.val(v) : this.element.text(v);
        } else {
            return this.value;
        }
    },

    open: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.addClass("open");
    },

    close: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.removeClass("open");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    setPosition: function(pos){
        var new_position = pos !== undefined ? pos : this.element.attr("data-position");
        if (this.positions.indexOf(new_position) === -1) {
            return ;
        }
        this.options.position = new_position;
        this._setKeysPosition();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-position': this.setPosition(); break;
        }
    },

    destroy: function(){
        var element = this.element, keypad = this.keypad;

        keypad.off(Metro.events.click, ".keys");
        keypad.off(Metro.events.click);
        keypad.off(Metro.events.click, ".key");
        element.off(Metro.events.change);

        element.insertBefore(keypad);
        keypad.remove();
    }
};

Metro.plugin('keypad', Keypad);

$(document).on(Metro.events.click, function(){
    var keypads = $(".keypad .keys");
    $.each(keypads, function(){
        if (!$(this).hasClass("keep-open")) {
            $(this).removeClass("open");
        }
    });
});


// Source: js/plugins/list.js
var List = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = [];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.header = null;
        this.items = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {

        thousandSeparator: ",",
        decimalSeparator: ",",

        sortTarget: "li",
        sortClass: null,
        sortDir: "asc",
        sortInitial: false,

        filterClass: null,
        filter: null,
        filterString: "",
        filters: null,
        source: null,

        showItemsSteps: false,
        showSearch: false,
        showListInfo: false,
        showPagination: false,
        showAllPages: false,
        showActivity: true,

        muteList: true,

        items: -1,
        itemsSteps: "all, 10,25,50,100",

        itemsAllTitle: "Show all",
        listItemsCountTitle: "Show entries:",
        listSearchTitle: "Search:",
        listInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        clsComponent: "",
        clsList: "",
        clsListItem: "",

        clsListTop: "",
        clsItemsCount: "",
        clsSearch: "",

        clsListBottom: "",
        clsListInfo: "",
        clsListPagination: "",

        clsPagination: "",

        onDraw: Metro.noop,
        onDrawItem: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterItemAccepted: Metro.noop,
        onFilterItemDeclined: Metro.noop,

        onListCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                that._build(data);
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var element = this.element, o = this.options;

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onListCreate, [element], element[0]);
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element, o = this.options;

        this.items = [];

        $.each(element.children(o.sortTarget), function(){
            that.items.push(this);
        });
    },

    _createItemsFromJSON: function(source){
        var that = this;

        this.items = [];

        if (Utils.isValue(source.header)) {
            that.header = source.header;
        }

        if (Utils.isValue(source.data)) {
            $.each(source.data, function(){
                var row = this;
                var li = document.createElement("li");
                var inner = Utils.isValue(that.header.template) ? that.header.template : "";

                $.each(row, function(k, v){
                    inner = inner.replace("$"+k, v);
                });

                li.innerHTML = inner;
                that.items.push(li);
            });
        }
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("list-top").addClass(o.clsListTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("list-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.listSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("list-rows-block").addClass(o.clsItemsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.itemsSteps), function () {
            var option = $("<option>").attr("value", this === "all" ? -1 : this).text(this === "all" ? o.itemsAllTitle : this).appendTo(rows_select);
            if (parseInt(this) === parseInt(o.items)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.listItemsCountTitle,
            onChange: function (val) {
                if (parseInt(val) === parseInt(o.items)) {
                    return;
                }
                o.items = parseInt(val);
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0])
            }
        });

        if (o.showItemsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("list-bottom").addClass(o.clsListBottom).insertAfter(element);
        var info, pagination;

        info = $("<div>").addClass("list-info").addClass(o.clsListInfo).appendTo(bottom_block);
        if (o.showListInfo !== true) {
            info.hide();
        }

        pagination = $("<div>").addClass("list-pagination").addClass(o.clsListPagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var list_component;
        var w_search = $(o.searchWrapper),
            w_info = $(o.infoWrapper),
            w_rows = $(o.rowsWrapper),
            w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("list-component")) {
            list_component = $("<div>").addClass("list-component").insertBefore(element);
            element.appendTo(list_component);
        } else {
            list_component = element.parent();
        }

        list_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("list-progress").appendTo(list_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        // element.html("").addClass(o.clsList);
        element.addClass(o.clsList);

        this._createTopBlock();
        this._createBottomBlock();

        if (Utils.isValue(o.filterString)) {
            this.filterString = o.filterString;
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.sorting(o.sortClass, o.sortDir, true);
    },

    _createEvents: function(){
        var that = this, element = this.element;
        var component = element.parent();
        var search = component.find(".list-search-block input");
        var customSearch;

        search.on(Metro.events.inputchange, function(){
            that.filterString = this.value.trim().toLowerCase();
            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }
            that.currentPage = 1;
            that._draw();
        });

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, function(){
                    that.filterString = this.value.trim().toLowerCase();
                    if (that.filterString[that.filterString.length - 1] === ":") {
                        return ;
                    }
                    that.currentPage = 1;
                    that._draw();
                });
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".list-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.listInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".list-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        this.pagesCount = Math.ceil(length / o.items);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(o.paginationPrevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, that.currentPage === 1 ? "active" : "", 1));

        if (o.showAllPages === true || this.pagesCount <= 7) {
            for (i = 2; i < this.pagesCount; i++) {
                pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
            }
        } else {
            if (that.currentPage < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }

                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (that.currentPage <= that.pagesCount && that.currentPage > that.pagesCount - shortDistance + 1) {
                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = that.pagesCount - shortDistance + 1; i < that.pagesCount; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(that.currentPage - 1, "", that.currentPage - 1));
                pagination.append(add_item(that.currentPage, "active", that.currentPage));
                pagination.append(add_item(that.currentPage + 1, "", that.currentPage + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (that.pagesCount > 1 || that.currentPage < that.pagesCount) pagination.append(add_item(that.pagesCount, that.currentPage === that.pagesCount ? "active" : "", that.pagesCount));

        next = add_item(o.paginationNextTitle, "service next-page", "next");
        pagination.append(next);

        if (this.currentPage === 1) {
            prev.addClass("disabled");
        }

        if (this.currentPage === this.pagesCount) {
            next.addClass("disabled");
        }
    },

    _filter: function(){
        var that = this,
            element = this.element,
            o = this.options,
            items, i, data, inset, c1, result;

        if (Utils.isValue(this.filterString) || this.filters.length > 0) {
            items = this.items.filter(function(item){
                data = "";

                if (Utils.isValue(o.filterClass)) {
                    inset = item.getElementsByClassName(o.filterClass);

                    if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                        data += inset[i].textContent;
                    }
                } else {
                    data = item.textContent;
                }

                c1 = data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                result = Utils.isValue(that.filterString) ? c1.indexOf(that.filterString) > -1 : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.exec(that.filters[i], [item]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterItemAccepted, [item], element[0]);
                } else {
                    Utils.exec(o.onFilterItemDeclined, [item], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0])
        } else {
            items = this.items;
        }

        return items;
    },

    _draw: function(cb){
        var element = this.element, o = this.options;
        var i;
        var start = o.items === -1 ? 0 : o.items * (this.currentPage - 1),
            stop = o.items === -1 ? this.items.length - 1 : start + o.items - 1;
        var items;

        items = this._filter();

        element.children(o.sortTarget).remove();

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                $(items[i]).addClass(o.clsListItem).appendTo(element);
            }
            Utils.exec(o.onDrawItem, [items[i]], element[0]);
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(item){
        var o = this.options;
        var i, inset, data;
        var format;

        if (Utils.isValue(o.sortClass)) {
            data = "";
            inset = $(item).find("."+o.sortClass);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset.length > 0 ? inset[0].getAttribute("data-format") : "";
        } else {
            data = item.textContent;
            format = item.getAttribute("data-format");
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isDate(data) ? new Date(data) : ""; break;
                case "number": data = Number(data); break;
                case "int": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Utils.parseMoney(data); break;
            }
        }

        return data;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(source, dir, redraw){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source)) {
            o.sortClass = source;
        }
        if (Utils.isValue(dir) && ["asc", "desc"].indexOf(dir) > -1) {
            o.sortDir= dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = o.sortDir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = o.sortDir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);

        if (redraw === true) {
            this._draw();
        }

        return this;
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source) !== true) {
            return ;
        }

        o.source = source;

        Utils.exec(o.onDataLoad, [o.source], element[0]);

        $.get(o.source, function(data){
            Utils.exec(o.onDataLoaded, [o.source, data], element[0]);

            that._createItemsFromJSON(data);

            element.html("");

            if (Utils.isValue(o.filterString)) {
                that.filterString = o.filterString;
            }

            var filter_func;

            if (Utils.isValue(o.filter)) {
                filter_func = Utils.isFunc(o.filter);
                if (filter_func === false) {
                    filter_func = Utils.func(o.filter);
                }
                that.filterIndex = that.addFilter(filter_func);
            }

            if (Utils.isValue(o.filters)) {
                $.each(Utils.strToArray(o.filters), function(){
                    filter_func = Utils.isFunc(this);
                    if (filter_func !== false) {
                        that.filtersIndexes.push(that.addFilter(filter_func));
                    }
                });
            }

            that.currentPage = 1;

            that.sorting(o.sortClass, o.sortDir, true);

        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
        });
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        Utils.arrayDeleteByKey(this.filters, key);
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function(){
            var dir = element.attr("data-sort-dir");
            if (!Utils.isValue(dir)) {
                return ;
            }
            o.sortDir = dir;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeSortClass = function(){
            var target = element.attr("data-sort-source");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.sortClass = target;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeFilterString = function(){
            var filter = element.attr("data-filter-string");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.filterString = filter;
            that.filter(o.filterString);
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-source": changeSortClass(); break;
            case "data-filter-string": changeFilterString(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('list', List);

// Source: js/plugins/listview.js
var Listview = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        selectable: false,
        effect: "slide",
        duration: 100,
        view: Metro.listView.LIST,
        selectCurrent: true,
        structure: {},
        onNodeInsert: Metro.noop,
        onNodeDelete: Metro.noop,
        onNodeClean: Metro.noop,
        onCollapseNode: Metro.noop,
        onExpandNode: Metro.noop,
        onGroupNodeClick: Metro.noop,
        onNodeClick: Metro.noop,
        onListviewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createView();
        this._createEvents();

        Utils.exec(o.onListviewCreate, [element]);
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src);

        return icon;
    },

    _createCaption: function(data){
        return $("<div>").addClass("caption").html(data);
    },

    _createContent: function(data){
        return $("<div>").addClass("content").html(data);
    },

    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },

    _createNode: function(data){
        var that = this, element = this.element, o = this.options;
        var node;

        node = $("<li>");

        if (data.caption !== undefined || data.content !== undefined ) {
            var d = $("<div>").addClass("data");
            node.prepend(d);
            if (data.caption !== undefined) d.append(that._createCaption(data.caption));
            if (data.content !== undefined) d.append(that._createContent(data.content));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (Utils.objectLength(o.structure > 0)) $.each(o.structure, function(key, val){
            if (data[key] !== undefined) {
                $("<div>").addClass("node-data item-data-"+key).addClass(data[val]).html(data[key]).appendTo(node);
            }
        });

        return node;
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");
        var struct_length = Utils.objectLength(o.structure);

        element.addClass("listview");
        element.find("ul").addClass("listview");

        $.each(nodes, function(){
            var node = $(this);

            if (node.data("caption") !== undefined || node.data("content") !== undefined) {
                var data = $("<div>").addClass("data");
                node.prepend(data);
                if (node.data("caption") !== undefined) data.append(that._createCaption(node.data("caption")));
                if (node.data("content") !== undefined) data.append(that._createContent(node.data("content")));
            }

            if (node.data('icon') !== undefined) {
                node.prepend(that._createIcon(node.data('icon')));
            }

            if (node.children("ul").length > 0) {
                node.addClass("node-group");
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) node.addClass("expanded");
            } else {
                node.addClass("node");
            }

            if (node.hasClass("node")) {
                var cb = $("<input data-role='checkbox'>");
                cb.data("node", node);
                node.prepend(cb);
            }

            if (struct_length > 0) $.each(o.structure, function(key, val){
                if (node.data(key) !== undefined) {
                    $("<div>").addClass("node-data item-data-"+key).addClass(node.data(key)).html(node.data(key)).appendTo(node);
                }
            });
        });

        this.toggleSelectable();

        this.view(o.view);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node", function(){
            var node = $(this);
            element.find(".node").removeClass("current");
            node.toggleClass("current");
            if (o.selectCurrent === true) {
                element.find(".node").removeClass("current-select");
                node.toggleClass("current-select");
            }
            Utils.exec(o.onNodeClick, [node, element])
        });

        element.on(Metro.events.click, ".node-toggle", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });

        element.on(Metro.events.click, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            element.find(".node-group").removeClass("current-group");
            node.addClass("current-group");
            Utils.exec(o.onGroupNodeClick, [node, element])
        });

        element.on(Metro.events.dblclick, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });
    },

    view: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.view;
        }

        o.view = v;

        $.each(Metro.listView, function(i, v){
            element.removeClass("view-"+v);
            element.find("ul").removeClass("view-"+v);
        });

        element.addClass("view-" + o.view);
        element.find("ul").addClass("view-" + o.view);
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        if (!node.hasClass("node-group")) {
            return ;
        }

        node.toggleClass("expanded");

        if (o.effect === "slide") {
            func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
            Utils.exec(o.onCollapseNode, [node, element]);
        } else {
            func = node.hasClass("expanded") !== true ? "fadeOut" : "fadeIn";
            Utils.exec(o.onExpandNode, [node, element]);
        }

        node.children("ul")[func](o.duration);
    },

    toggleSelectable: function(){
        var that = this, element = this.element, o = this.options;
        var func = o.selectable === true ? "addClass" : "removeClass";
        element[func]("selectable");
        element.find("ul")[func]("selectable");
    },

    add: function(node, data){
        var that = this, element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {

            if (!node.hasClass("node-group")) {
                return ;
            }

            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").addClass("listview").addClass("view-"+o.view).appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.addClass("node").appendTo(target);

        var cb = $("<input>");
        cb.data("node", new_node);
        new_node.prepend(cb);
        cb.checkbox();

        Utils.exec(o.onNodeInsert, [new_node, element]);

        return new_node;
    },

    addGroup: function(data){
        var that = this, element = this.element, o = this.options;
        var node;

        delete data['icon'];

        node = this._createNode(data);
        node.addClass("node-group").appendTo(element);
        node.append(this._createToggle());
        node.addClass("expanded");
        node.append($("<ul>").addClass("listview").addClass("view-"+o.view));

        Utils.exec(o.onNodeInsert, [node, element]);

        return node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node, element]);
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node, element]);
    },

    changeView: function(){
        var element = this.element, o = this.options;
        var new_view = "view-"+element.attr("data-view");
        this.view(new_view);
    },

    changeSelectable: function(){
        var element = this.element, o = this.options;
        o.selectable = JSON.parse(element.attr("data-selectable")) === true;
        this.toggleSelectable();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-view": this.changeView(); break;
            case "data-selectable": this.changeSelectable(); break;
        }
    }
};

Metro.plugin('listview', Listview);

// Source: js/plugins/master.js
var Master = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pages = [];
        this.currentIndex = 0;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        effect: "slide", // slide, fade, switch, slowdown, custom
        effectFunc: "linear",
        duration: METRO_ANIMATION_DURATION,

        controlPrev: "<span class='default-icon-left-arrow'></span>",
        controlNext: "<span class='default-icon-right-arrow'></span>",
        controlTitle: "Master, page $1 of $2",
        backgroundImage: "",

        clsMaster: "",
        clsControls: "",
        clsControlPrev: "",
        clsControlNext: "",
        clsControlTitle: "",
        clsPages: "",
        clsPage: "",

        onBeforePage: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onBeforePrev: Metro.noop_true,
        onMasterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("master").addClass(o.clsMaster);
        element.css({
            backgroundImage: "url("+o.backgroundImage+")"
        });

        this._createControls();
        this._createPages();
        this._createEvents();

        Utils.exec(this.options.onMasterCreate, [this.element]);
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options;
        var controls_position = ['top', 'bottom'];
        var i, controls, title, pages = element.find(".page");

        title = String(o.controlTitle).replace("$1", "1");
        title = String(title).replace("$2", pages.length);

        $.each(controls_position, function(){
            controls = $("<div>").addClass("controls controls-"+this).addClass(o.clsControls).appendTo(element);
            $("<span>").addClass("prev").addClass(o.clsControlPrev).html(o.controlPrev).appendTo(controls);
            $("<span>").addClass("next").addClass(o.clsControlNext).html(o.controlNext).appendTo(controls);
            $("<span>").addClass("title").addClass(o.clsControlTitle).html(title).appendTo(controls);
        });

        this._enableControl("prev", false);
    },

    _enableControl: function(type, state){
        var control = this.element.find(".controls ." + type);
        if (state === true) {
            control.removeClass("disabled");
        } else {
            control.addClass("disabled");
        }
    },

    _setTitle: function(){
        var title = this.element.find(".controls .title");

        var title_str = this.options.controlTitle.replace("$1", this.currentIndex + 1);
        title_str = title_str.replace("$2", String(this.pages.length));

        title.html(title_str);
    },

    _createPages: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.find(".pages");
        var page = element.find(".page");

        if (pages.length === 0) {
            pages = $("<div>").addClass("pages").appendTo(element);
        }

        pages.addClass(o.clsPages);

        $.each(page, function(){
            var p = $(this);
            if (p.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+p.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }

            p.css({
                left: "100%"
            });

            p.addClass(o.clsPage).hide(0);

            that.pages.push(p);
        });

        page.appendTo(pages);

        this.currentIndex = 0;
        if (this.pages[this.currentIndex] !== undefined) {
            if (this.pages[this.currentIndex].data("cover") !== undefined ) {
                element.css({
                    backgroundImage: "url("+this.pages[this.currentIndex].data('cover')+")"
                });
            }
            this.pages[this.currentIndex].css("left", "0").show(0);
            setTimeout(function(){
                pages.css({
                    height: that.pages[0].outerHeight(true) + 2
                });
            }, 0);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".controls .prev", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforePrev, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["prev", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.prev();
            }
        });

        element.on(Metro.events.click, ".controls .next", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforeNext, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["next", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.next();
            }
        });

        $(window).on(Metro.events.resize + "-master" + element.attr("id"), function(){
            element.find(".pages").height(that.pages[that.currentIndex].outerHeight(true) + 2);
        });
    },

    _slideToPage: function(index){
        var current, next, to;

        if (this.pages[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.pages[this.currentIndex];
        next = this.pages[index];

        this.currentIndex = index;

        this._effect(current, next, to);
    },

    _slideTo: function(to){
        var current, next;

        if (to === undefined) {
            return ;
        }

        current = this.pages[this.currentIndex];

        if (to === "next") {
            if (this.currentIndex + 1 >= this.pages.length) {
                return ;
            }
            this.currentIndex++;
        } else {
            if (this.currentIndex - 1 < 0) {
                return ;
            }
            this.currentIndex--;
        }

        next = this.pages[this.currentIndex];

        this._effect(current, next, to);
    },

    _effect: function(current, next, to){
        var that = this, element = this.element, o = this.options;
        var out = element.width();
        var pages = element.find(".pages");

        this._setTitle();

        if (this.currentIndex === this.pages.length - 1) {
            this._enableControl("next", false);
        } else {
            this._enableControl("next", true);
        }

        if (this.currentIndex === 0) {
            this._enableControl("prev", false);
        } else {
            this._enableControl("prev", true);
        }

        this.isAnimate = true;

        setTimeout(function(){
            pages.animate({
                height: next.outerHeight(true) + 2
            });
        },0);

        pages.css("overflow", "hidden");

        function finish(){
            if (next.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+next.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }
            pages.css("overflow", "initial");
            that.isAnimate = false;
        }

        function _slide(){
            current.stop(true, true).animate({
                left: to === "next" ? -out : out
            }, o.duration, o.effectFunc, function(){
                current.hide(0);
            });

            next.stop(true, true).css({
                left: to === "next" ? out : -out
            }).show(0).animate({
                left: 0
            }, o.duration, o.effectFunc, function(){
                finish();
            });
        }

        function _switch(){
            current.hide(0);

            next.hide(0).css("left", 0).show(0, function(){
                finish();
            });
        }

        function _fade(){
            current.fadeOut(o.duration);

            next.hide(0).css("left", 0).fadeIn(o.duration, function(){
                finish();
            });
        }

        switch (o.effect) {
            case "fade": _fade(); break;
            case "switch": _switch(); break;
            default: _slide();
        }
    },

    toPage: function(index){
        this._slideToPage(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    changeEffect: function(){
        this.options.effect = this.element.attr("data-effect");
    },

    changeEffectFunc: function(){
        this.options.effectFunc = this.element.attr("data-effect-func");
    },

    changeEffectDuration: function(){
        this.options.duration = this.element.attr("data-duration");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-effect": this.changeEffect(); break;
            case "data-effect-func": this.changeEffectFunc(); break;
            case "data-duration": this.changeEffectDuration(); break;
        }
    }
};

Metro.plugin('master', Master);

// Source: js/plugins/navview.js
var NavigationView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pane = null;
        this.content = null;
        this.paneToggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        compact: "md",
        expanded: "lg",
        toggle: null,
        onNavigationViewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createView();
        this._createEvents();

        Utils.exec(o.onNavigationViewCreate, [element]);
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var pane, content, toggle, menu;

        element
            .addClass("navview")
            .addClass(o.compact !== false ? "compact-"+o.compact : "")
            .addClass(o.expanded !== false ? "expanded-"+o.expanded : "");

        pane = element.children(".navview-pane");
        content = element.children(".navview-content");
        toggle = $(o.toggle);

        menu = pane.find(".navview-menu");
        if (menu.length > 0) {
            var elements_height = 0;
            $.each(menu.prevAll(), function(){
                elements_height += $(this).outerHeight(true);
            });
            $.each(menu.nextAll(), function(){
                elements_height += $(this).outerHeight(true);
            });
            menu.css({
                height: "calc(100% - "+(elements_height + 20)+"px)"
            });
        }

        this.pane = pane.length > 0 ? pane : null;
        this.content = content.length > 0 ? content : null;
        this.paneToggle = toggle.length > 0 ? toggle : null;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var pane = this.pane, content = this.content;

        element.on(Metro.events.click, ".pull-button, .holder", function(e){
            var pane_compact = pane.width() < 280;
            var target = $(this);
            var input;

            if (target.hasClass("holder")) {
                input = target.parent().find("input");
                setTimeout(function(){
                    input.focus();
                }, 200);
            }

            if (that.pane.hasClass("open")) {
                that.close();
                return ;
            }

            if ((pane_compact || element.hasClass("expand")) && !element.hasClass("compacted")) {
                element.toggleClass("expand");
                return ;
            }

            if (element.hasClass("compacted") || !pane_compact) {
                element.toggleClass("compacted");
                return ;
            }

            return true;
        });

        if (this.paneToggle !== null) {
            this.paneToggle.on(Metro.events.click, function(){
                that.pane.toggleClass("open");
            })
        }

        $(window).on(Metro.events.resize, function(){

            element.removeClass("expand");
            that.pane.removeClass("open");

            if ($(this).width() <= Metro.media_sizes[String(o.compact).toUpperCase()]) {
                element.removeClass("compacted");
            }

        })
    },

    open: function(){
        this.pane.addClass("open");
    },

    close: function(){
        this.pane.removeClass("open");
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('navview', NavigationView);

// Source: js/plugins/notify.js
var Notify = {

    options: {
        container: null,
        width: 220,
        timeout: METRO_TIMEOUT,
        duration: METRO_ANIMATION_DURATION,
        distance: "100vh",
        animation: "swing"
    },

    notifies: [],

    setup: function(options){
        var body = $("body"), container;
        this.options = $.extend({}, this.options, options);

        if (this.options.container === null) {
            container = $("<div>").addClass("notify-container");
            body.prepend(container);
            this.options.container = container;
        }

        return this;
    },

    reset: function(){
        var reset_options = {
            width: 220,
            timeout: METRO_TIMEOUT,
            duration: METRO_ANIMATION_DURATION,
            distance: "100vh",
            animation: "swing"
        };
        this.options = $.extend({}, this.options, reset_options);
    },

    create: function(message, title, options){
        var notify, that = this, o = this.options;
        var m, t;

        if (message === undefined || message.trim() === '') {
            return false;
        }

        notify = $("<div>").addClass("notify");
        notify.css({
            width: o.width
        });

        if (title) {
            t = $("<div>").addClass("notify-title").html(title);
            notify.prepend(t);
        }
        m = $("<div>").addClass("notify-message").html(message);
        m.appendTo(notify);

        // Set options
        /*
        * keepOpen, cls, width, callback
        * */
        if (options !== undefined) {
            if (options.cls !== undefined) {
                notify.addClass(options.cls);
            }
            if (options.width !== undefined) {
                notify.css({
                    width: options.width
                });
            }
        }

        notify.on(Metro.events.click, function(){
            that.kill($(this));
        });

        // Show
        notify.hide(function(){
            notify.appendTo(o.container);

            notify.css({
                marginTop: o.distance
            }).fadeIn(100, function(){
                notify.animate({
                    marginTop: ".25rem"
                }, o.duration, o.animation, function(){
                    if (options !== undefined && options.keepOpen === true) {
                    } else {
                        setTimeout(function(){
                            that.kill(notify, (options !== undefined && options.onClose !== undefined ? options.onClose : undefined));
                        }, o.timeout);
                    }
                    if (options !== undefined && options.onShow !== undefined) Utils.callback(options.onShow);
                });
            });
        });
    },

    kill: function(notify, callback){
        notify.fadeOut('slow', function(){
            notify.remove();
            Utils.callback(callback);
        });
    },

    killAll: function(){
        var that = this;
        var notifies = $(".notify");
        $.each(notifies, function(){
            that.kill($(this));
        });
    }
};

Metro['notify'] = Notify.setup();

// Source: js/plugins/panel.js
var Panel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['draggable', 'collapse'],

    options: {
        titleCaption: "",
        titleIcon: "",
        collapsible: false,
        collapsed: false,
        collapseDuration: METRO_ANIMATION_DURATION,
        width: "auto",
        height: "auto",
        draggable: false,

        clsPanel: "",
        clsTitle: "",
        clsTitleCaption: "",
        clsTitleIcon: "",
        clsContent: "",
        clsCollapseToggle: "",

        onCollapse: Metro.noop,
        onExpand: Metro.noop,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onPanelCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var panel = $("<div>").addClass("panel").addClass(o.clsPanel);
        var id = Utils.uniqueId();
        var original_classes = element[0].className;


        if (prev.length === 0) {
            parent.prepend(panel);
        } else {
            panel.insertAfter(prev);
        }

        panel.attr("id", id).addClass(original_classes);

        element[0].className = '';
        element.addClass("panel-content").addClass(o.clsContent).appendTo(panel);

        if (o.titleCaption !== "" || o.titleIcon !== "" || o.collapsible === true) {
            var title = $("<div>").addClass("panel-title").addClass(o.clsTitle);

            if (o.titleCaption !== "") {
                $("<span>").addClass("caption").addClass(o.clsTitleCaption).html(o.titleCaption).appendTo(title)
            }

            if (o.titleIcon !== "") {
                $(o.titleIcon).addClass("icon").addClass(o.clsTitleIcon).appendTo(title)
            }

            if (o.collapsible === true) {
                var collapseToggle = $("<span>").addClass("dropdown-toggle marker-center active-toggle").addClass(o.clsCollapseToggle).appendTo(title);
                element.collapse({
                    toggleElement: collapseToggle,
                    duration: o.collapseDuration,
                    onCollapse: o.onCollapse,
                    onExpand: o.onExpand
                });

                if (o.collapsed === true) {
                    this.collapse();
                }
            }

            title.appendTo(panel);
        }

        if (o.draggable === true) {
            panel.draggable({
                dragElement: title || panel,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            });
        }

        if (o.width !== "auto" && parseInt(o.width) >= 0) {
            panel.outerWidth(parseInt(o.width));
        }

        if (o.height !== "auto" && parseInt(o.height) >= 0) {
            panel.outerHeight(parseInt(o.height));
            element.css({overflow: "auto"});
        }

        this.panel = panel;

        Utils.exec(o.onPanelCreate, [this.element]);
    },

    collapse: function(){
        var element = this.element, o = this.options;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').collapse();
    },

    expand: function(){
        var element = this.element, o = this.options;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').expand();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('panel', Panel);

// Source: js/plugins/popovers.js
var Popover = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.popover = null;
        this.popovered = false;
        this.size = {
            width: 0,
            height: 0
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        popoverText: "",
        popoverHide: 3000,
        popoverOffset: 10,
        popoverTrigger: Metro.popoverEvents.HOVER,
        popoverPosition: Metro.position.TOP,
        hideOnLeave: false,
        clsPopover: "",
        onPopoverShow: Metro.noop,
        onPopoverHide: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createEvents();

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var event;

        switch (o.popoverTrigger) {
            case Metro.popoverEvents.CLICK: event = Metro.events.click; break;
            case Metro.popoverEvents.FOCUS: event = Metro.events.focus; break;
            default: event = Metro.events.enter;
        }

        element.on(event, function(){
            if (that.popover !== null || that.popovered === true) {
                return ;
            }
            that.createPopover();
            if (o.popoverHide > 0) {
                setTimeout(function(){
                    that.removePopover();
                }, o.popoverHide);
            }
        });

        if (o.hideOnLeave === true && !Utils.isTouchDevice()) {
            element.on(Metro.events.leave, function(){
                that.removePopover();
            });
        }

        $(window).on(Metro.events.scroll, function(){
            if (that.popover !== null) that.setPosition();
        });

    },

    setPosition: function(){
        var popover = this.popover, size = this.size, o = this.options, element = this.element;

        if (o.popoverPosition === Metro.position.BOTTOM) {
            popover.addClass('bottom');
            popover.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        } else if (o.popoverPosition === Metro.position.RIGHT) {
            popover.addClass('right');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.popoverOffset
            });
        } else if (o.popoverPosition === Metro.position.LEFT) {
            popover.addClass('left');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left - size.width - $(window).scrollLeft() - o.popoverOffset
            });
        } else {
            popover.addClass('top');
            popover.css({
                top: element.offset().top - $(window).scrollTop() - size.height - o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        }
    },

    createPopover: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var popover = $("<div>").addClass("popover neb").addClass(o.clsPopover).html(o.popoverText);
        var neb_pos;
        var id = Utils.elementId("popover");

        popover.attr("id", id);

        switch (o.popoverPosition) {
            case Metro.position.TOP: neb_pos = "neb-s"; break;
            case Metro.position.BOTTOM: neb_pos = "neb-n"; break;
            case Metro.position.RIGHT: neb_pos = "neb-w"; break;
            case Metro.position.LEFT: neb_pos = "neb-e"; break;
        }

        popover.addClass(neb_pos);
        popover.on(Metro.events.click, function(){
            that.removePopover();
        });

        this.popover = popover;
        this.size = Utils.hiddenElementSize(popover);

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        popover.appendTo($('body'));

        this.popovered = true;

        Utils.exec(o.onPopoverShow, [popover, element]);
    },

    removePopover: function(){
        var that = this;
        var timeout = this.options.onPopoverHide === Metro.noop ? 0 : 300;
        var popover = this.popover;
        if (popover !== null) {
            Utils.exec(this.options.onPopoverHide, [popover, this.element]);
            setTimeout(function(){
                popover.hide(0, function(){
                    popover.remove();
                    that.popover = null;
                    that.popovered = false;
                });
            }, timeout);
        }
    },

    show: function(){
        var that = this, o = this.options;
        if (this.popovered === true) {
            return ;
        }

        this.createPopover();
        if (o.popoverHide > 0) {
            setTimeout(function(){
                that.removePopover();
            }, o.popoverHide);
        }
    },

    hide: function(){
        this.removePopover();
    },

    changeText: function(){
        this.options.popoverText = this.element.attr("data-popover-text");
    },

    changePosition: function(){
        this.options.popoverPosition = this.element.attr("data-popover-position");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-popover-text": this.changeText(); break;
        }
    }
};

Metro.plugin('popover', Popover);

// Source: js/plugins/progress.js
var Progress = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.buffer = 0;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onProgressCreate, [this.element]);

        return this;
    },

    options: {
        value: 0,
        buffer: 0,
        type: "bar",
        small: false,
        clsBack: "",
        clsBar: "",
        clsBuffer: "",
        onValueChange: Metro.noop,
        onBufferChange: Metro.noop,
        onComplete: Metro.noop,
        onBuffered: Metro.noop,
        onProgressCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element
            .html("")
            .addClass("progress");

        function _progress(){
            $("<div>").addClass("bar").appendTo(element);
        }

        function _buffer(){
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
        }

        function _load(){
            element.addClass("with-load");
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
            $("<div>").addClass("load").appendTo(element);
        }

        function _line(){
            element.addClass("line");
        }

        switch (o.type) {
            case "buffer": _buffer(); break;
            case "load": _load(); break;
            case "line": _line(); break;
            default: _progress();
        }

        if (o.small === true) {
            element.addClass("small");
        }

        element.addClass(o.clsBack);
        element.find(".bar").addClass(o.clsBar);
        element.find(".buffer").addClass(o.clsBuffer);

        this.val(o.value);
        this.buff(o.buffer);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.value;
        }

        var bar  = element.find(".bar");

        if (bar.length === 0) {
            return false;
        }

        this.value = parseInt(v, 10);

        bar.css("width", this.value + "%");

        element.trigger("valuechange", [this.value]);

        Utils.exec(o.onValueChange, [this.value, element]);

        if (this.value === 100) {
            Utils.exec(o.onComplete, [this.value, element]);
        }
    },

    buff: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.buffer;
        }

        var bar  = element.find(".buffer");

        if (bar.length === 0) {
            return false;
        }

        this.buffer = parseInt(v, 10);

        bar.css("width", this.buffer + "%");

        element.trigger("bufferchange", [this.buffer]);

        Utils.exec(o.onBufferChange, [this.buffer, element]);

        if (this.buffer === 100) {
            Utils.exec(o.onBuffered, [this.buffer, element]);
        }
    },

    changeValue: function(){
        this.val(this.element.attr('data-value'));
    },

    changeBuffer: function(){
        this.buff(this.element.attr('data-buffer'));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-value': this.changeValue(); break;
            case 'data-buffer': this.changeBuffer(); break;
        }
    }
};

Metro.plugin('progress', Progress);

// Source: js/plugins/radio.js
var Radio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRadioCreate, [this.element]);

        return this;
    },
    options: {
        style: 1,
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onRadioCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var radio = $("<label>").addClass("radio " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "radio");

        if (prev.length === 0) {
            parent.prepend(radio);
        } else {
            radio.insertAfter(prev);
        }

        element.appendTo(radio);
        check.appendTo(radio);
        caption.appendTo(radio);

        if (o.captionPosition === 'left') {
            radio.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        radio.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element[0].className = this.origin.className;
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('radio', Radio);

// Source: js/plugins/rating.js
var Rating = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.values = [];
        this.rate = 0;
        this.rating = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        static: false,
        title: null,
        value: 0,
        values: null,
        message: "",
        stars: 5,
        starColor: null,
        staredColor: null,
        roundFunc: "round", // ceil, floor, round
        clsRating: "",
        clsTitle: "",
        clsStars: "",
        clsResult: "",
        onStarClick: Metro.noop,
        onRatingCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i;

        if (o.values !== null) {
            if (Array.isArray(o.values)) {
                this.values = o.values;
            } else if (typeof o.values === "string") {
                this.values = Utils.strToArray(o.values)
            }
        } else {
            for(i = 1; i <= o.stars; i++) {
                this.values.push(i);
            }
        }

        this.value = o.value > 0 ? Math[o.roundFunc](o.value) : 0;

        if (o.starColor !== null) {
            if (!Utils.isColor(o.starColor)) {
                o.starColor = Colors.color(o.starColor);
            }
        }

        if (o.staredColor !== null) {
            if (!Utils.isColor(o.staredColor)) {
                o.staredColor = Colors.color(o.staredColor);
            }
        }

        this._createRating();
        this._createEvents();

        Utils.exec(o.onRatingCreate, [element]);
    },

    _createRating: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("rating");
        var rating = $("<div>").addClass("rating " + String(element[0].className).replace("d-block", "d-flex")).addClass(o.clsRating);
        var i, stars, result, li;
        var sheet = Metro.sheet;

        element.val(this.value);

        rating.attr("id", id);

        if (prev.length === 0) {
            parent.prepend(rating);
        } else {
            rating.insertAfter(prev);
        }

        element.appendTo(rating);

        stars = $("<ul>").addClass("stars").addClass(o.clsStars).appendTo(rating);

        for(i = 1; i <= o.stars; i++) {
            li = $("<li>").data("value", this.values[i-1]).appendTo(stars);
            if (i <= this.value) {
                li.addClass("on");
            }
        }

        result = $("<span>").addClass("result").addClass(o.clsResult).appendTo(rating);

        result.html(o.message);

        if (o.starColor !== null) {
            Utils.addCssRule(sheet, "#" + id + " .stars:hover li", "color: " + o.starColor + ";");
        }
        if (o.staredColor !== null) {
            Utils.addCssRule(sheet, "#"+id+" .stars li.on", "color: "+o.staredColor+";");
        }

        if (o.title !== null) {
            var title = $("<span>").addClass("title").addClass(o.clsTitle).html(o.title);
            rating.prepend(title);
        }

        if (o.static === true) {
            rating.addClass("static");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                rating.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.rating = rating;
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var rating = this.rating;

        rating.on(Metro.events.click, ".stars li", function(){

            if (o.static === true) {
                return ;
            }

            var star = $(this);
            var value = star.data("value");
            star.addClass("scale");
            setTimeout(function(){
                star.removeClass("scale");
            }, 300);
            element.val(value).trigger("change");
            star.addClass("on");
            star.prevAll().addClass("on");
            star.nextAll().removeClass("on");

            Utils.exec(o.onStarClick, [value, star, element]);
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;
        var rating = this.rating;

        if (v === undefined) {
            return this.value;
        }

        this.value = v > 0 ? Math[o.roundFunc](v) : 0;
        element.val(this.value).trigger("change");

        var stars = rating.find(".stars li").removeClass("on");
        $.each(stars, function(){
            var star = $(this);
            if (star.data("value") <= that.value) {
                star.addClass("on");
            }
        });

        return this;
    },

    msg: function(m){
        var rating = this.rating;
        if (m ===  undefined) {
            return ;
        }
        rating.find(".result").html(m);
        return this;
    },

    static: function (mode) {
        var o = this.options;
        var rating = this.rating;

        o.static = mode;

        if (mode === true) {
            rating.addClass("static");
        } else {
            rating.removeClass("static");
        }
    },

    changeAttributeValue: function(a){
        var element = this.element;
        var value = a === "value" ? element.val() : element.attr("data-value");
        this.val(value);
    },

    changeAttributeMessage: function(){
        var element = this.element;
        var message = element.attr("data-message");
        this.msg(message);
    },

    changeAttributeStatic: function(){
        var element = this.element;
        var isStatic = JSON.parse(element.attr("data-static")) === true;

        this.static(isStatic);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value":
            case "data-value": this.changeAttributeValue(attributeName); break;
            case "data-message": this.changeAttributeMessage(); break;
            case "data-static": this.changeAttributeStatic(); break;
        }
    }
};

Metro.plugin('rating', Rating);

// Source: js/plugins/resizable.js
var Resizable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onResizableCreate, [this.element]);

        return this;
    },
    options: {
        resizeElement: ".resize-element",
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResize: Metro.noop,
        onResizableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.resizeElement !== "" && $(o.resizeElement).length === 0) {
            $("<span>").addClass("resize-element").appendTo(element);
        }

        element.on(Metro.events.start, o.resizeElement, function(e){

            if (element.data("canResize") === false) {
                return ;
            }

            var startXY = Utils.clientXY(e);
            var startWidth = parseInt(element.outerWidth());
            var startHeight = parseInt(element.outerHeight());
            var size = {width: startWidth, height: startHeight};

            Utils.exec(o.onResizeStart, [element, size]);

            $(document).on(Metro.events.move, function(e){
                var moveXY = Utils.clientXY(e);
                var size = {
                    width: startWidth + moveXY.x - startXY.x,
                    height: startHeight + moveXY.y - startXY.y
                };
                element.css(size);
                Utils.exec(o.onResize, [element, size]);
            });
        });

        element.on(Metro.events.stop, o.resizeElement, function(){
            $(document).off(Metro.events.move);

            var size = {
                width: parseInt(element.outerWidth()),
                height: parseInt(element.outerHeight())
            };
            Utils.exec(o.onResizeStop, [element, size]);
        });
    },

    off: function(){
        this.element.data("canResize", false);
    },

    on: function(){
        this.element.data("canResize", true);
    },

    changeAttribute: function(attributeName){
    }
};

Metro.plugin('resizable', Resizable);

// Source: js/plugins/ribbon-menu.js
var RibbonMenu = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['buttongroup'],

    options: {
        onStatic: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTab: Metro.noop,
        onRibbonMenuCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onRibbonMenuCreate, [element]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("ribbon-menu");

        var tabs = element.find(".tabs-holder li:not(.static)");
        var active_tab = element.find(".tabs-holder li.active");
        if (active_tab.length > 0) {
            this.open($(active_tab[0]));
        } else {
            if (tabs.length > 0) {
                this.open($(tabs[0]));
            }
        }

        var fluentGroups = element.find(".ribbon-toggle-group");
        $.each(fluentGroups, function(){
            var g = $(this);
            g.buttongroup({
                clsActive: "active"
            });

            var gw = 0;
            var btns = g.find(".ribbon-icon-button");
            $.each(btns, function(){
                var b = $(this);
                var w = b.outerWidth(true);
                if (w > gw) gw = w;
            });

            g.css("width", Math.ceil(gw * btns.length / 3) + 4);
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".tabs-holder li a", function(e){
            var link = $(this);
            var tab = $(this).parent("li");

            if (tab.hasClass("static")) {
                if (o.onStatic === Metro.noop && link.attr("href") !== undefined) {
                    document.location.href = link.attr("href");
                } else {
                    Utils.exec(o.onStatic, [tab, element]);
                }
            } else {
                if (Utils.exec(o.onBeforeTab, [tab, element]) === true) {
                    that.open(tab);
                }
            }
            e.preventDefault();
        })
    },

    open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find(".tabs-holder li");
        var sections = element.find(".content-holder .section");
        var target = tab.children("a").attr("href");
        var target_section = target !== "#" ? element.find(target) : null;

        tabs.removeClass("active");
        tab.addClass("active");

        sections.removeClass("active");
        if (target_section) target_section.addClass("active");

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('ribbonmenu', RibbonMenu);

// Source: js/plugins/ripple.js
var Ripple = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onRippleCreate, [this.element]);

        return this;
    },

    options: {
        rippleColor: "#fff",
        rippleAlpha: .4,
        rippleTarget: "default",
        onRippleCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        element.on(Metro.events.click, target, function(e){
            var el = $(this);
            var timer = null;

            if (el.css('position') === 'static') {
                el.css('position', 'relative');
            }

            el.css({
                overflow: 'hidden'
            });

            $(".ripple").remove();

            var size = Math.max(el.outerWidth(), el.outerHeight());

            // Add the element
            var ripple = $("<span class='ripple'></span>").css({
                width: size,
                height: size
            });

            el.prepend(ripple);

            // Get the center of the element
            var x = e.pageX - el.offset().left - ripple.width()/2;
            var y = e.pageY - el.offset().top - ripple.height()/2;

            // Add the ripples CSS and start the animation
            ripple.css({
                background: Utils.hex2rgba(o.rippleColor, o.rippleAlpha),
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            timer = setTimeout(function(){
                timer = null;
                $(".ripple").remove();
            }, 400);
        });
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('ripple', Ripple);

// Source: js/plugins/search.js
var Search = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element]);

        return this;
    },
    options: {
        clsElement: "",
        clsInput: "",
        clsPrepend: "",
        clsClearButton: "",
        clsSearchButton: "",
        size: "default",
        prepend: "",
        copyInlineStyles: true,
        clearButton: true,
        searchButton: true,
        searchButtonClick: "submit",
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        searchButtonIcon: "<span class='default-icon-search'></span>",
        customButtons: [],
        disabled: false,
        onSearchButtonClick: Metro.noop,
        onInputCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, searchButton;

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val("").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(buttons);
        }
        if (o.searchButton !== false) {
            searchButton = $("<button>").addClass("button input-search-button").addClass(o.clsSearchButton).attr("tabindex", -1).attr("type", o.searchButtonClick === 'submit' ? "submit" : "button").html(o.searchButtonIcon);
            searchButton.on(Metro.events.click, function(){
                if (o.searchButtonClick === 'submit') {
                    Utils.exec(o.onSearchButtonClick, [element.val(), $(this)], element[0]);
                } else {
                    this.form.submit();
                }
            });
            searchButton.appendTo(buttons);
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>").addClass("button input-custom-button").addClass(item.cls).attr("tabindex", -1).attr("type", "button").html(item.html);
                customButton.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element.val(), customButton], element[0]);
                });
                customButton.appendTo(buttons);
            });
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsElement);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        //this.element.attr("disabled", true);
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        //this.element.attr("disabled", false);
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('search', Search);

// Source: js/plugins/select.js
var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.list = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSelectCreate, [this.element]);

        return this;
    },
    options: {
        duration: 100,
        clsElement: "",
        clsSelect: "",
        clsPrepend: "",
        clsAppend: "",
        clsOption: "",
        clsOptionGroup: "",
        clsDropList: "",
        prepend: "",
        append: "",
        placeholder: "",
        filterPlaceholder: "",
        filter: true,
        copyInlineStyles: true,
        dropHeight: 200,
        disabled: false,
        onChange: Metro.noop,
        onSelectCreate: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createSelect();
        this._createEvents();
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var multiple = element[0].multiple;
        var input = element.siblings(".select-input");
        var html = Utils.isValue(option.data('template'))?option.data('template').replace("$1", item.text):item.text;
        var selected_item;

        l = $("<li>").addClass(o.clsOption).data("option", item).data("text", item.text).data('value', Utils.isValue(item.value) ? item.value : "").appendTo(parent);
        a = $("<a>").html(html).appendTo(l).addClass(item.className);

        if (item.getAttribute("selected") !== null) {
            if (multiple) {
                l.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", l);
                $("<span>").addClass("remover").html("&times;").appendTo(selected_item);
            } else {
                element.val(item.value);
                input.html(html);
                element.trigger("change");
                l.addClass("active");
            }
        }

        a.appendTo(l);
        l.appendTo(parent);
    },

    _addOptionGroup: function(item, parent){
        var that = this;
        var group = $(item);

        $("<li>").html(item.label).addClass("group-title").appendTo(parent);

        $.each(group.children(), function(){
            that._addOption(this, parent);
        })
    },

    _createSelect: function(){
        var that = this, element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("select " + element[0].className).addClass(o.clsElement);
        var multiple = element[0].multiple;
        var select_id = Utils.elementId("select");
        var buttons = $("<div>").addClass("button-group");
        var input, drop_container, list, filter_input;

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (multiple) {
            container.addClass("multiple");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        element.addClass(o.clsSelect);
        buttons.appendTo(container);

        input = $("<div>").addClass("select-input").attr("name", "__" + select_id + "__");
        drop_container = $("<div>").addClass("drop-container");
        list = $("<ul>").addClass("d-menu").addClass(o.clsDropList).css({
            "max-height": o.dropHeight
        });
        filter_input = $("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder);

        container.append(input);
        container.append(drop_container);

        drop_container.append(filter_input);

        if (o.filter !== true) {
            filter_input.hide();
        }

        drop_container.append(list);

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });

        drop_container.dropdown({
            duration: o.duration,
            toggleElement: "#"+select_id,
            onDrop: function(){
                var dropped, target;

                dropped = $(".select .drop-container");
                $.each(dropped, function(){
                    var drop = $(this);
                    if (drop.is(drop_container)) {
                        return ;
                    }
                    drop.data('dropdown').close();
                });

                filter_input.val("").trigger(Metro.events.keyup).focus();

                target = list.find("li.active").length > 0 ? $(list.find("li.active")[0]) : undefined;
                if (target !== undefined) {
                    list.scrollTop(0);
                    setTimeout(function(){
                        list.animate({
                            scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                        }, 100);
                    }, 200);
                }

                Utils.exec(o.onDrop, [list, element], list[0]);
            },
            onUp: function(){
                Utils.exec(o.onUp, [list, element], list[0]);
            }
        });

        this.list = list;

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = Utils.isTag(o.append) ? $(o.append) : $("<span>"+o.append+"</span>");
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.click, function(){container.toggleClass("focused");});
        filter_input.on(Metro.events.blur, function(){container.removeClass("focused");});
        filter_input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var leaf = $(this);
            var val = leaf.data('value');
            var txt = leaf.data('text');
            var html = leaf.children('a').html();
            var selected_item;

            if (element[0].multiple) {
                leaf.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", leaf);
                $("<span>").addClass("remover").html("&times;").appendTo(selected_item);
                $.each(element.find("option"), function(){
                    if (this === leaf.data("option")) {
                        this.selected = true;
                    }
                });
            } else {
                list.find("li.active").removeClass("active");
                leaf.addClass("active");
                input.html(html);
                element.val(val);
                element.trigger("change");
                drop_container.data("dropdown").close();
            }

            Utils.exec(o.onChange, [val], element[0]);
        });

        input.on("click", ".selected-item .remover", function(e){
            var item = $(this).closest(".selected-item");
            var leaf = item.data("option");
            leaf.removeClass("d-none");
            $.each(element.find("option"), function(){
                if (this === leaf.data("option")) {
                    this.selected = false;
                }
            });
            item.remove();
            e.preventDefault();
            e.stopPropagation();
        });

        filter_input.on(Metro.events.keyup, function(){
            var filter = this.value.toUpperCase();
            var li = list.find("li");
            var i, a;
            for (i = 0; i < li.length; i++) {
                if ($(li[i]).hasClass("group-title")) continue;
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });

        drop_container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;
        //TODO
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.closest(".select").addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.closest(".select").removeClass("disabled");
    },

    val: function(v){
        var element = this.element, o = this.options;
        var input = element.siblings("input");
        var options = element.find("option");
        var items = this.list.find("li");

        if (v === undefined) {
            return element.val();
        }

        options.removeAttr("selected");
        $.each(options, function(){
            var op = this;

            if (""+op.value === ""+v) {
                op.setAttribute("selected", "selected");
                input.val(op.text);
                element.trigger("change");

                items.removeClass("active");
                $.each(items, function(){
                    var item = $(this);

                    if (item.hasClass("group-title")) return ;

                    if (""+item.data("value") === ""+v) {
                        item.addClass("active");
                    }
                });

                Utils.exec(o.onChange, [v], element[0]);
            }
        });
    },

    data: function(op){
        var that = this, element = this.element;
        var select = element.parent();
        var list = select.find("ul");
        var option_group;

        element.html("");
        list.html("");

        if (typeof op === 'string') {
            element.html(op);
        } else if (Utils.isObject(op)) {
            $.each(op, function(key, val){
                if (Utils.isObject(val)) {
                    option_group = $("<optgroup>").attr("label", key).appendTo(element);
                    $.each(val, function(key2, val2){
                        $("<option>").attr("value", key2).text(val2).appendTo(option_group);
                    });
                } else {
                    $("<option>").attr("value", key).text(val).appendTo(element);
                }
            });
        }

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.off(Metro.events.click);
        container.off(Metro.events.click, ".input-clear-button");
        input.off(Metro.events.click);
        filter_input.off(Metro.events.blur);
        filter_input.off(Metro.events.focus);
        list.off(Metro.events.click, "li");
        filter_input.off(Metro.events.keyup);
        drop_container.off(Metro.events.click);

        Metro.destroyPlugin(drop_container, "dropdown");

        element.insertBefore(container);
        container.remove();
    }
};

$(document).on(Metro.events.click, function(){
    var selects = $(".select .drop-container");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
});

Metro.plugin('select', Select);



// Source: js/plugins/sidebar.js
var Sidebar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle_element = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        shift: null,
        staticShift: null,
        toggle: null,
        duration: METRO_ANIMATION_DURATION,
        static: null,
        menuItemClick: true,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onToggle: Metro.noop,
        onStaticSet: Metro.noop,
        onStaticLoss: Metro.noop,
        onSidebarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();
        $(window).resize();
        this._checkStatic();

        Utils.exec(o.onSidebarCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var header = element.find(".sidebar-header");
        var sheet = Metro.sheet;

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("sidebar"));
        }

        element.addClass("sidebar");

        if (o.toggle !== null && $(o.toggle).length > 0) {
            this.toggle_element = $(o.toggle);
        }

        if (header.length > 0) {
            if (header.data("image") !== undefined) {
                header.css({
                    backgroundImage: "url("+header.data("image")+")"
                });
            }
        }

        if (o.static !== null) {
            if (o.staticShift !== null) {
                Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-left: 280px; width: calc(100% - 280px);}");
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.on(Metro.events.click, function(e){
                that.toggle();
            });
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static)) {
            $(window).on(Metro.events.resize + "_" + element.attr("id"), function(){
                that._checkStatic();
            });
        }

        if (o.menuItemClick === true) {
            element.on(Metro.events.click, ".sidebar-menu li > a", function(){
                that.close();
            });
        }
    },

    _checkStatic: function(){
        var element = this.element, o = this.options;
        if (Utils.mediaExist(o.static) && !element.hasClass("static")) {
            element.addClass("static");
            element.data("opened", false).removeClass('open');
            if (o.shift !== null) {
                $.each(o.shift.split(","), function(){
                    $(this).css({left: 0}, o.duration);
                });
            }
            Utils.exec(o.onStaticSet, [element], element[0]);
        }
        if (!Utils.mediaExist(o.static)) {
            element.removeClass("static");
            Utils.exec(o.onStaticLoss, [element], element[0]);
        }
    },

    isOpen: function(){
        return this.element.data("opened") === true;
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", true).addClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: element.outerWidth()}, o.duration);
            });
        }

        Utils.exec(o.onOpen, [element], element[0]);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", false).removeClass('open');

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: 0}, o.duration);
            });
        }

        Utils.exec(o.onClose, [element], element[0]);
    },

    toggle: function(){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
        Utils.exec(this.options.onToggle, [this.element], this.element[0]);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('sidebar', Sidebar);

Metro['sidebar'] = {
    isSidebar: function(el){
        return Utils.isMetroObject(el, "sidebar");
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").open();
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").close();
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        $(el).data("sidebar").toggle();
    }
};

// Source: js/plugins/slider.js
var Slider = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.slider = null;
        this.value = 0;
        this.percent = 0;
        this.pixel = 0;
        this.buffer = 0;
        this.keyInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        min: 0,
        max: 100,
        accuracy: 0,
        showMinMax: false,
        minMaxPosition: Metro.position.TOP,
        value: 0,
        buffer: 0,
        hint: false,
        hintAlways: false,
        hintPosition: Metro.position.TOP,
        hintMask: "$1",
        vertical: false,
        target: null,
        returnType: "value", // value or percent
        size: 0,

        clsSlider: "",
        clsBackside: "",
        clsComplete: "",
        clsBuffer: "",
        clsMarker: "",
        clsHint: "",
        clsMinMax: "",
        clsMin: "",
        clsMax: "",

        onStart: Metro.noop,
        onStop: Metro.noop,
        onMove: Metro.noop,
        onClick: Metro.noop,
        onChangeValue: Metro.noop,
        onChangeBuffer: Metro.noop,
        onFocus: Metro.noop,
        onBlur: Metro.noop,
        onSliderCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createSlider();
        this._createEvents();
        this.buff(o.buffer);
        this.val(o.value);

        Utils.exec(o.onSliderCreate, [element]);
    },

    _createSlider: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var slider = $("<div>").addClass("slider " + element[0].className).addClass(o.clsSlider);
        var backside = $("<div>").addClass("backside").addClass(o.clsBackside);
        var complete = $("<div>").addClass("complete").addClass(o.clsComplete);
        var buffer = $("<div>").addClass("buffer").addClass(o.clsBuffer);
        var marker = $("<button>").attr("type", "button").addClass("marker").addClass(o.clsMarker);
        var hint = $("<div>").addClass("hint").addClass(o.hintPosition + "-side").addClass(o.clsHint);
        var id = Utils.uniqueId();
        var i;

        slider.attr("id", id);

        if (o.size > 0) {
            if (o.vertical === true) {
                slider.outerHeight(o.size);
            } else {
                slider.outerWidth(o.size);
            }
        }

        if (o.vertical === true) {
            slider.addClass("vertical-slider");
        }

        if (prev.length === 0) {
            parent.prepend(slider);
        } else {
            slider.insertAfter(prev);
        }

        if (o.hintAlways === true) {
            hint.css({
                display: "block"
            }).addClass("permanent-hint");
        }

        element.appendTo(slider);
        backside.appendTo(slider);
        complete.appendTo(slider);
        buffer.appendTo(slider);
        marker.appendTo(slider);
        hint.appendTo(marker);

        if (o.showMinMax === true) {
            var min_max_wrapper = $("<div>").addClass("slider-min-max clear").addClass(o.clsMinMax);
            $("<span>").addClass("place-left").addClass(o.clsMin).html(o.min).appendTo(min_max_wrapper);
            $("<span>").addClass("place-right").addClass(o.clsMax).html(o.max).appendTo(min_max_wrapper);
            if (o.minMaxPosition === Metro.position.TOP) {
                min_max_wrapper.insertBefore(slider);
            } else {
                min_max_wrapper.insertAfter(slider);
            }
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                slider.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.slider = slider;
    },

    _createEvents: function(){
        var that = this, slider = this.slider, o = this.options;
        var marker = slider.find(".marker");
        var hint = slider.find(".hint");

        marker.on(Metro.events.start, function(){
            $(document).on(Metro.events.move, function(e){
                if (o.hint === true && o.hintAlways !== true) {
                    hint.fadeIn();
                }
                that._move(e);
                Utils.exec(o.onMove, [that.value, that.percent, slider]);
            });

            $(document).on(Metro.events.stop, function(){
                $(document).off(Metro.events.move);
                $(document).off(Metro.events.stop);

                if (o.hintAlways !== true) {
                    hint.fadeOut();
                }

                Utils.exec(o.onStop, [that.value, that.percent, slider]);
            });

            Utils.exec(o.onStart, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.focus, function(){
            Utils.exec(o.onFocus, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.blur, function(){
            Utils.exec(o.onBlur, [that.value, that.percent, slider]);
        });

        marker.on(Metro.events.keydown, function(e){

            var key = e.keyCode ? e.keyCode : e.which;

            if ([37,38,39,40].indexOf(key) === -1) {
                return;
            }

            var step = o.accuracy === 0 ? 1 : o.accuracy;

            if (that.keyInterval) {
                return ;
            }
            that.keyInterval = setInterval(function(){

                var val = that.value;

                if (e.keyCode === 37 || e.keyCode === 40) { // left, down
                    if (val - step < o.min) {
                        val = o.min;
                    } else {
                        val -= step;
                    }
                }

                if (e.keyCode === 38 || e.keyCode === 39) { // right, up
                    if (val + step > o.max) {
                        val = o.max;
                    } else {
                        val += step;
                    }
                }

                that.value = that._correct(val);
                that.percent = that._convert(that.value, 'val2prc');
                that.pixel = that._convert(that.percent, 'prc2pix');

                that._redraw();
            }, 100);

            e.preventDefault();
        });

        marker.on(Metro.events.keyup, function(){
            clearInterval(that.keyInterval);
            that.keyInterval = false;
        });

        slider.on(Metro.events.click, function(e){
            that._move(e);
            Utils.exec(o.onClick, [that.value, that.percent, slider]);
            Utils.exec(o.onStop, [that.value, that.percent, slider]);
        });

        $(window).resize(function(){
            that.val(that.value);
            that.buff(that.buffer);
        });
    },

    _convert: function(v, how){
        var slider = this.slider, o = this.options;
        var length = (o.vertical === true ? slider.outerHeight() : slider.outerWidth()) - slider.find(".marker").outerWidth();
        switch (how) {
            case "pix2prc": return Math.round( v * 100 / length );
            case "pix2val": return Math.round( this._convert(v, 'pix2prc') * ((o.max - o.min) / 100) + o.min );
            case "val2prc": return Math.round( (v - o.min)/( (o.max - o.min) / 100 )  );
            case "prc2pix": return Math.round( v / ( 100 / length ));
            case "val2pix": return Math.round( this._convert(this._convert(v, 'val2prc'), 'prc2pix') );
        }

        return 0;
    },

    _correct: function(value){
        var accuracy  = this.options.accuracy;
        var min = this.options.min, max = this.options.max;

        if (accuracy === 0 || isNaN(accuracy)) {
            return value;
        }

        value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;

        if (value < min) {
            value = min;
        }

        if (value > max) {
            value = max;
        }

        return value;
    },

    _move: function(e){
        var slider = this.slider, o = this.options;
        var offset = slider.offset(),
            marker_size = slider.find(".marker").outerWidth(),
            length = o.vertical === true ? slider.outerHeight() : slider.outerWidth(),
            cPos, cPix, cStart = 0, cStop = length - marker_size;

        cPos = o.vertical === true ? Utils.pageXY(e).y - offset.top : Utils.pageXY(e).x - offset.left;
        cPix = o.vertical === true ? length - cPos - marker_size / 2 : cPos - marker_size / 2;

        if (cPix < cStart || cPix > cStop) {
            return ;
        }

        this.value = this._correct(this._convert(cPix, 'pix2val'));
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    _hint: function(){
        var o = this.options, slider = this.slider, hint = slider.find(".hint");
        var value;

        value = o.hintMask.replace("$1", this.value).replace("$2", this.percent);

        hint.text(value);
    },

    _value: function(){
        var element = this.element, o = this.options, slider = this.slider;
        var value = o.returnType === 'value' ? this.value : this.percent;

        if (element[0].tagName === "INPUT") {
            element.val(value);
        }

        element.trigger("change");

        if (o.target !== null) {
            var target = $(o.target);
            if (target.length !== 0) {

                $.each(target, function(){
                    var t = $(this);
                    if (this.tagName === "INPUT") {
                        t.val(value);
                    } else {
                        t.text(value);
                    }
                });
            }
        }

        Utils.exec(o.onChangeValue, [value, this.percent, slider]);
    },

    _marker: function(){
        var slider = this.slider, o = this.options;
        var marker = slider.find(".marker"), complete = slider.find(".complete");
        var length = o.vertical === true ? slider.outerHeight() : slider.outerWidth();
        var marker_size = parseInt(Utils.getStyleOne(marker, "width"));
        var slider_visible = Utils.isVisible(slider);

        if (slider_visible) {
            marker.css({
                'margin-top': 0,
                'margin-left': 0
            });
        }

        if (o.vertical === true) {
            if (slider_visible) {
                marker.css('top', length - this.pixel);
            } else {
                marker.css('top', this.percent + "%");
                marker.css('margin-top', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('height', this.percent+"%");
        } else {
            if (slider_visible) {
                marker.css('left', this.pixel);
            } else {
                marker.css('left', this.percent + "%");
                marker.css('margin-left', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('width', this.percent+"%");
        }
    },

    _redraw: function(){
        this._marker();
        this._value();
        this._hint();
    },

    _buffer: function(){
        var o = this.options;
        var buffer = this.slider.find(".buffer");

        if (o.vertical === true) {
            buffer.css("height", this.buffer + "%");
        } else {
            buffer.css("width", this.buffer + "%");
        }

        Utils.exec(o.onChangeBuffer, [this.buffer, this.slider]);
    },

    val: function(v){
        var o = this.options;

        if (v === undefined || isNaN(v)) {
            return this.value;
        }

        if (v < o.min) {
            v = o.min;
        }

        if (v > o.max) {
            v = o.max;
        }

        this.value = this._correct(v);
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    buff: function(v){
        var slider = this.slider;
        var buffer = slider.find(".buffer");

        if (v === undefined || isNaN(v)) {
            return this.buffer;
        }

        if (buffer.length === 0) {
            return false;
        }

        v = parseInt(v);

        if (v > 100) {
            v = 100;
        }

        if (v < 0) {
            v = 0;
        }

        this.buffer = v;
        this._buffer();
    },

    changeValue: function(){
        var element = this.element, o = this.options;
        var val = element.attr("data-value");
        if (val < o.min) {
            val = o.min
        }
        if (val > o.max) {
            val = o.max
        }
        this.val(val);
    },

    changeBuffer: function(){
        var element = this.element;
        var val = parseInt(element.attr("data-buffer"));
        if (val < 0) {
            val = 0
        }
        if (val > 100) {
            val = 100
        }
        this.buff(val);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
            case "data-buffer": this.changeBuffer(); break;
        }
    }
};

Metro.plugin('slider', Slider);

// Source: js/plugins/sorter.js
var Sorter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.initial = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        thousandSeparator: ",",
        decimalSeparator: ",",
        sortTarget: null,
        sortSource: null,
        sortDir: "asc",
        sortStart: true,
        saveInitial: true,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSorterCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        this._createStructure();

        Utils.exec(o.onSorterCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        if (o.sortTarget === null) {
            o.sortTarget = element.children()[0].tagName;
        }

        this.initial = element.find(o.sortTarget).get();

        if (o.sortStart === true) {
            this.sort(o.sortDir);
        }
    },

    _getItemContent: function(item){
        var o = this.options;
        var data, inset, i, format;

        if (Utils.isValue(o.sortSource)) {
            data = "";
            inset = item.getElementsByClassName(o.sortSource);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset[0].dataset.format;
        } else {
            data = item.textContent;
            format = item.dataset.format;
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isDate(data) ? new Date(data) : ""; break;
                case "number": data = Number(data); break;
                case "int": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Number(parseFloat(data.replace(/[^0-9-.]/g, ''))); break;
            }
        }

        return data;
    },

    sort: function(dir){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.uniqueId();
        var prev;

        if (dir !== undefined) {
            o.sortDir = dir;
        }

        items = element.find(o.sortTarget).get();

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        Utils.exec(o.onSortStart, [element], element[0]);

        items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2 ) {
                return result = -1;
            }

            if (c1 > c2 ) {
                return result = 1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b], element[0]);
            }

            return result;
        });

        if (o.sortDir === "desc") {
            items.reverse();
        }

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();

        Utils.exec(o.onSortStop, [element], element[0]);
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.uniqueId();
        var prev;

        items = this.initial;

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function() {
            var dir = element.attr("data-sort-dir").trim();
            if (dir === "") return;
            o.sortDir = dir;
            that.sort();
        };

        var changeSortContent = function(){
            var content = element.attr("data-sort-content").trim();
            if (content === "") return ;
            o.sortContent = content;
            that.sort();
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-content": changeSortContent(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('sorter', Sorter);

Metro['sorter'] = {
    create: function(el, op){
        return $(el).sorter(op);
    },

    isSorter: function(el){
        return Utils.isMetroObject(el, "sorter");
    },

    sort: function(el, dir){
        if (!this.isSorter(el)) {
            return false;
        }
        var sorter = $(el).data("sorter");
        if (dir === undefined) {
            dir = "asc";
        }
        sorter.sort(dir);
    },

    reset: function(el){
        if (!this.isSorter(el)) {
            return false;
        }
        var sorter = $(el).data("sorter");
        sorter.reset();
    }
};

// Source: js/plugins/stepper.js
var Stepper = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.current = 0;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        view: Metro.stepperView.SQUARE, // square, cycle, diamond
        steps: 3,
        step: 1,
        stepClick: false,
        clsStepper: "",
        clsStep: "",
        clsComplete: "",
        clsCurrent: "",
        onStep: Metro.noop,
        onStepClick: Metro.noop,
        onStepperCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.step <= 0) {
            o.step = 1;
        }

        this._createStepper();
        this._createEvents();

        Utils.exec(o.onStepperCreate, [element]);
    },

    _createStepper: function(){
        var that = this, element = this.element, o = this.options;
        var i;

        element.addClass("stepper").addClass(o.view).addClass(o.clsStepper);

        for(i = 1; i <= o.steps; i++) {
            var step = $("<span>").addClass("step").addClass(o.clsStep).data("step", i).html("<span>"+i+"</span>").appendTo(element);
        }

        this.current = 1;
        this.toStep(o.step);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".step", function(){
            var step = $(this).data("step");
            if (o.stepClick === true) {
                that.toStep(step);
                Utils.exec(o.onStepClick, [step, element]);
            }
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var steps = element.find(".step");

        if (this.current + 1 > steps.length) {
            return ;
        }

        this.current++;

        this.toStep(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        if (this.current - 1 === 0) {
            return ;
        }

        this.current--;

        this.toStep(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toStep(element.find(".step").length);
    },

    first: function(){
        this.toStep(1);
    },

    toStep: function(step){
        var that = this, element = this.element, o = this.options;
        var target = $(element.find(".step").get(step - 1));

        if (target.length === 0) {
            return ;
        }

        this.current = step;

        element.find(".step")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        Utils.exec(o.onStep, [this.current, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('stepper', Stepper);

// Source: js/plugins/streamer.js
var Streamer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.data = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        duration: METRO_ANIMATION_DURATION,
        defaultClosedIcon: "",
        defaultOpenIcon: "",
        changeUri: true,
        encodeLink: true,
        closed: false,
        chromeNotice: false,
        startFrom: null,
        slideToStart: true,
        startSlideSleep: 1000,
        source: null,
        data: null,
        eventClick: "select",
        selectGlobal: true,
        streamSelect: false,
        excludeSelectElement: null,
        excludeClickElement: null,
        excludeElement: null,
        excludeSelectClass: "",
        excludeClickClass: "",
        excludeClass: "",
        onStreamClick: Metro.noop,
        onStreamSelect: Metro.noop,
        onEventClick: Metro.noop,
        onEventSelect: Metro.noop,
        onStreamerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass("streamer");

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("streamer"));
        }

        if (o.source === null && o.data === null) {
            return false;
        }

        $("<div>").addClass("streams").appendTo(element);
        $("<div>").addClass("events-area").appendTo(element);

        if (o.source !== null) {
            $.get(o.source, function(data){
                that.data = data;
                that.build();
            });
        } else {
            this.data = o.data;
            this.build();
        }

        this._createEvents();

        if (o.chromeNotice === true && Utils.detectChrome() === true && Utils.isTouchDevice() === false) {
            $("<p>").addClass("text-small text-muted").html("*) In Chrome browser please press and hold Shift and turn the mouse wheel.").insertAfter(element);
        }
    },

    build: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var streams = element.find(".streams").html("");
        var events_area = element.find(".events-area").html("");
        var timeline = $("<ul>").addClass("streamer-timeline").html("").appendTo(events_area);
        var streamer_events = $("<div>").addClass("streamer-events").appendTo(events_area);
        var event_group_main = $("<div>").addClass("event-group").appendTo(streamer_events);
        var StreamerIDS = Utils.getURIParameter(null, "StreamerIDS");

        if (StreamerIDS !== null && o.encodeLink === true) {
            StreamerIDS = atob(StreamerIDS);
        }

        var StreamerIDS_i = StreamerIDS ? StreamerIDS.split("|")[0] : null;
        var StreamerIDS_a = StreamerIDS ? StreamerIDS.split("|")[1].split(",") : [];

        if (data.actions !== undefined) {
            var actions = $("<div>").addClass("streamer-actions").appendTo(streams);
            $.each(data.actions, function(){
                var item = this;
                var button = $("<button>").addClass("streamer-action").addClass(item.cls).html(item.html);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(actions);
            });
        }

        // Create timeline

        timeline.html("");

        if (data.timeline === undefined) {
            data.timeline = {
                start: "09:00",
                stop: "18:00",
                step: 20
            }
        }

        var start = new Date(), stop = new Date();
        var start_time_array = data.timeline.start ? data.timeline.start.split(":") : [9,0];
        var stop_time_array = data.timeline.stop ? data.timeline.stop.split(":") : [18,0];
        var step = data.timeline.step ? parseInt(data.timeline.step) * 60 : 1200;

        start.setHours(start_time_array[0]);
        start.setMinutes(start_time_array[1]);
        start.setSeconds(0);

        stop.setHours(stop_time_array[0]);
        stop.setMinutes(stop_time_array[1]);
        stop.setSeconds(0);

        for (var i = start.getTime()/1000; i <= stop.getTime()/1000; i += step) {
            var t = new Date(i * 1000);
            var h = t.getHours(), m = t.getMinutes();
            var v = (h < 10 ? "0"+h : h) + ":" + (m < 10 ? "0"+m : m);

            var li = $("<li>").data("time", v).addClass("js-time-point-" + v.replace(":", "-")).html("<em>"+v+"</em>").appendTo(timeline);
        }

        // -- End timeline creator

        if (data.streams !== undefined) {
            $.each(data.streams, function(stream_index){
                var stream_item = this;
                var stream = $("<div>").addClass("stream").addClass(this.cls).appendTo(streams);
                stream
                    .addClass(stream_item.cls)
                    .data("one", false)
                    .data("data", stream_item.data);

                $("<div>").addClass("stream-title").html(stream_item.title).appendTo(stream);
                $("<div>").addClass("stream-secondary").html(stream_item.secondary).appendTo(stream);
                $(stream_item.icon).addClass("stream-icon").appendTo(stream);

                var bg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "background-color"));
                var fg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "color"));

                var stream_events = $("<div>").addClass("stream-events")
                    .data("background-color", bg)
                    .data("text-color", fg)
                    .appendTo(event_group_main);

                if (stream_item.events !== undefined) {
                    $.each(stream_item.events, function(event_index){
                        var event_item = this;
                        var _icon;
                        var sid = stream_index+":"+event_index;
                        var custom_html = event_item.custom !== undefined ? event_item.custom : "";
                        var custom_html_open = event_item.custom_open !== undefined ? event_item.custom_open : "";
                        var custom_html_close = event_item.custom_close !== undefined ? event_item.custom_close : "";
                        var event = $("<div>")
                            .data("origin", event_item)
                            .data("sid", sid)
                            .data("data", event_item.data)
                            .data("time", event_item.time)
                            .data("target", event_item.target)
                            .addClass("stream-event")
                            .addClass("size-"+event_item.size+"x")
                            .addClass(event_item.cls)
                            .appendTo(stream_events);


                        var left = timeline.find(".js-time-point-"+this.time.replace(":", "-"))[0].offsetLeft - stream.outerWidth();

                        event.css({
                            position: "absolute",
                            left: left
                        });


                        var slide = $("<div>").addClass("stream-event-slide").appendTo(event);
                        var slide_logo = $("<div>").addClass("slide-logo").appendTo(slide);
                        var slide_data = $("<div>").addClass("slide-data").appendTo(slide);

                        if (event_item.icon !== undefined) {
                            if (Utils.isTag(event_item.icon)) {
                                $(event_item.icon).addClass("icon").appendTo(slide_logo);
                            } else {
                                $("<img>").addClass("icon").attr("src", event_item.icon).appendTo(slide_logo);
                            }
                        }

                        $("<span>").addClass("time").css({
                            backgroundColor: bg,
                            color: fg
                        }).html(event_item.time).appendTo(slide_logo);

                        $("<div>").addClass("title").html(event_item.title).appendTo(slide_data);
                        $("<div>").addClass("subtitle").html(event_item.subtitle).appendTo(slide_data);
                        $("<div>").addClass("desc").html(event_item.desc).appendTo(slide_data);

                        if (o.closed === false && (element.attr("id") === StreamerIDS_i && StreamerIDS_a.indexOf(sid) !== -1) || event_item.selected === true || parseInt(event_item.selected) === 1) {
                            event.addClass("selected");
                        }

                        if (o.closed === true || event_item.closed === true || parseInt(event_item.closed) === 1) {
                            _icon = event_item.closedIcon !== undefined ? Utils.isTag(event_item.closedIcon) ? event_item.closedIcon : "<span>"+event_item.closedIcon+"</span>" : Utils.isTag(o.defaultClosedIcon) ? o.defaultClosedIcon : "<span>"+o.defaultClosedIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsClosedIcon).appendTo(slide);
                            event
                                .data("closed", true)
                                .data("target", event_item.target);
                            event.append(custom_html_open);
                        } else {
                            _icon = event_item.openIcon !== undefined ? Utils.isTag(event_item.openIcon) ? event_item.openIcon : "<span>"+event_item.openIcon+"</span>"  : Utils.isTag(o.defaultOpenIcon) ? o.defaultOpenIcon : "<span>"+o.defaultOpenIcon+"</span>";
                            $(_icon).addClass("state-icon").addClass(event_item.clsOpenIcon).appendTo(slide);
                            event
                                .data("closed", false);
                            event.append(custom_html_close);
                        }

                        event.append(custom_html);
                    });

                    var last_child = stream_events.find(".stream-event:last-child");
                    if (last_child.length > 0) stream_events.outerWidth(last_child[0].offsetLeft + last_child.outerWidth());
                }
            });
        }

        if (data.global !== undefined) {
            $.each(['before', 'after'], function(){
                var global_item = this;
                if (data.global[global_item] !== undefined) {
                    $.each(data.global[global_item], function(){
                        var event_item = this;
                        var group = $("<div>").addClass("event-group").addClass("size-"+event_item.size+"x");
                        var events = $("<div>").addClass("stream-events global-stream").appendTo(group);
                        var event = $("<div>").addClass("stream-event").appendTo(events);
                        event
                            .addClass("global-event")
                            .addClass(event_item.cls)
                            .data("time", event_item.time)
                            .data("origin", event_item)
                            .data("data", event_item.data);

                        $("<div>").addClass("event-title").html(event_item.title).appendTo(event);
                        $("<div>").addClass("event-subtitle").html(event_item.subtitle).appendTo(event);
                        $("<div>").addClass("event-html").html(event_item.html).appendTo(event);

                        var left, t = timeline.find(".js-time-point-"+this.time.replace(":", "-"));

                        if (t.length > 0) left = t[0].offsetLeft - streams.find(".stream").outerWidth();
                        group.css({
                            position: "absolute",
                            left: left,
                            height: "100%"
                        }).appendTo(streamer_events);
                    });
                }
            });
        }

        element.data("stream", -1);

        if (o.startFrom !== null && o.slideToStart === true) {
            setTimeout(function(){
                that.slideTo(o.startFrom);
            }, o.startSlideSleep);
        }

        Utils.exec(o.onStreamerCreate, [element]);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".stream-event", function(e){
            var event = $(this);

            if (o.excludeClass !== "" && event.hasClass(o.excludeClass)) {
                return ;
            }

            if (o.excludeElement !== null && $(e.target).is(o.excludeElement)) {
                return ;
            }

            if (o.closed === false && event.data("closed") !== true && o.eventClick === 'select') {

                if (o.excludeSelectClass !== "" && event.hasClass(o.excludeSelectClass)) {

                } else {
                    if (o.excludeSelectElement !== null && $(e.target).is(o.excludeSelectElement)) {

                    } else {
                        if (event.hasClass("global-event")) {
                            if (o.selectGlobal === true) {
                                event.toggleClass("selected");
                            }
                        } else {
                            event.toggleClass("selected");
                        }
                        if (o.changeUri === true) {
                            that._changeURI();
                        }
                        Utils.exec(o.onEventSelect, [event, event.hasClass("selected")]);
                    }
                }
            } else {
                if (o.excludeClickClass !== "" && event.hasClass(o.excludeClickClass)) {

                } else {

                    if (o.excludeClickElement !== null && $(e.target).is(o.excludeClickElement)) {

                    } else {

                        Utils.exec(o.onEventClick, [event]);

                        if (o.closed === true || event.data("closed") === true) {
                            var target = event.data("target");
                            if (target) {
                                window.location.href = target;
                            }
                        }

                    }
                }
            }
        });

        element.on(Metro.events.click, ".stream", function(e){
            var stream = $(this);
            var index = stream.index();

            if (o.streamSelect === false) {
                return;
            }

            if (element.data("stream") === index) {
                element.find(".stream-event").removeClass("disabled");
                element.data("stream", -1);
            } else {
                element.data("stream", index);
                element.find(".stream-event").addClass("disabled");
                that.enableStream(stream);
                Utils.exec(o.onStreamSelect, [stream]);
            }

            Utils.exec(o.onStreamClick, [stream]);
        });

        if (Utils.isTouchDevice() !== true) {
            element.on(Metro.events.mousewheel, ".events-area", function(e) {
                var acrollable = $(this);

                if (e.deltaY === undefined || e.deltaFactor === undefined) {
                    return ;
                }

                if (e.deltaFactor > 1) {
                    var scroll = acrollable.scrollLeft() - ( e.deltaY * 30 );
                    acrollable.scrollLeft(scroll);
                    e.preventDefault();
                }
            });
        }

        if (Utils.isTouchDevice() === true) {
            element.on(Metro.events.click, ".stream", function(){
                var stream = $(this);
                stream.toggleClass("focused");
                $.each(element.find(".stream"), function () {
                    if ($(this).is(stream)) return ;
                    $(this).removeClass("focused");
                })
            })
        }
    },

    _changeURI: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var link = this.getLink();
        history.pushState({}, document.title, link);
    },

    slideTo: function(time){
        var that = this, element = this.element, o = this.options, data = this.data;
        var target;
        if (time === undefined) {
            target = $(element.find(".streamer-timeline li")[0]);
        } else {
            target = $(element.find(".streamer-timeline .js-time-point-" + time.replace(":", "-"))[0]);
        }

        element.find(".events-area").animate({
            scrollLeft: target[0].offsetLeft - element.find(".streams .stream").outerWidth()
        }, o.duration);
    },

    enableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.removeClass("disabled").data("streamDisabled", false);
        element.find(".stream-events").eq(index).find(".stream-event").removeClass("disabled");
    },

    disableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index();
        stream.addClass("disabled").data("streamDisabled", true);
        element.find(".stream-events").eq(index).find(".stream-event").addClass("disabled");
    },

    toggleStream: function(stream){
        if (stream.data("streamDisabled") === true) {
            this.enableStream(stream);
        } else {
            this.disableStream(stream);
        }
    },

    getLink: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var events = element.find(".stream-event");
        var a = [];
        var link;
        var origin = window.location.href;

        $.each(events, function(){
            var event = $(this);
            if (event.data("sid") === undefined || !event.hasClass("selected")) {
                return;
            }

            a.push(event.data("sid"));
        });

        link = element.attr("id") + "|" + a.join(",");

        if (o.encodeLink === true) {
            link = btoa(link);
        }

        return Utils.updateURIParameter(origin, "StreamerIDS", link);
    },

    getTimes: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var times = element.find(".streamer-timeline > li");
        var result = [];
        $.each(times, function(){
            result.push($(this).data("time"));
        });
        return result;
    },

    getEvents: function(event_type, include_global){
        var that = this, element = this.element, o = this.options, data = this.data;
        var items, events = [];

        switch (event_type) {
            case "selected": items = element.find(".stream-event.selected"); break;
            case "non-selected": items = element.find(".stream-event:not(.selected)"); break;
            default: items = element.find(".stream-event");
        }

        $.each(items, function(){
            var item = $(this);
            var origin;

            if (include_global !== true && item.parent().hasClass("global-stream")) return ;

            origin = item.data("origin");

            events.push(origin);
        });

        return events;
    },

    source: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.source = s;
        this.changeSource();
    },

    data: function(s){
        if (s === undefined) {
            return this.options.source;
        }

        this.options.data = s;
        this.changeData();
    },

    getStreamerData: function(){
        return this.data;
    },

    toggleEvent: function(event){
        var that = this, element = this.element, o = this.options, data = this.data;
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (event.hasClass("selected")) {
            this.selectEvent(event, false);
        } else {
            this.selectEvent(event, true);
        }
    },

    selectEvent: function(event, state){
        var that = this, element = this.element, o = this.options, data = this.data;
        if (state === undefined) {
            state = true;
        }
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (state === true) event.addClass("selected"); else event.removeClass("selected");

        if (o.changeUri === true) {
            that._changeURI();
        }
        Utils.exec(o.onEventSelect, [event, state]);
    },

    changeSource: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_source = element.attr("data-source");

        if (String(new_source).trim() === "") {
            return ;
        }

        o.source = new_source;

        $.get(o.source, function(data){
            that.data = data;
            that.build();
        });

        element.trigger("sourcechanged");
    },

    changeData: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_data = element.attr("data-data");

        if (String(new_data).trim() === "") {
            return ;
        }

        o.data = new_data;

        this.data = JSON.parse(o.data);
        this.build();

        element.trigger("datachanged");
    },

    changeStreamSelectOption: function(){
        var that = this, element = this.element, o = this.options, data = this.data;

        o.streamSelect = element.attr("data-stream-select").toLowerCase() === "true";
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-source': this.changeSource(); break;
            case 'data-data': this.changeData(); break;
            case 'data-stream-select': this.changeStreamSelectOption(); break;
        }
    }
};

Metro.plugin('streamer', Streamer);

// Source: js/plugins/switch.js
var Switch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSwitchCreate, [this.element]);

        return this;
    },
    options: {
        caption: "",
        captionPosition: "right",
        disabled: false,
        clsElement: "",
        clsCheck: "",
        clsCaption: "",
        onSwitchCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<label>").addClass("switch " + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        element.attr("type", "checkbox");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        check.appendTo(container);
        caption.appendTo(container);

        if (o.captionPosition === 'left') {
            container.addClass("caption-left");
        }

        element[0].className = '';

        container.addClass(o.clsElement);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.disabled === true && element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('switch', Switch);

// Source: js/plugins/table.js
var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = null;
        this.component = null;
        this.inspector = null;
        this.view = {};
        this.viewDefault = {};
        this.locale = Metro.locales["en-US"];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.service = [];
        this.heads = [];
        this.items = [];
        this.foots = [];

        this.filteredItems = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,

        check: false,
        checkColIndex: 0,
        checkName: null,
        checkType: "checkbox",
        checkStoreKey: "TABLE:$1:KEYS",
        rownum: false,

        filter: null,
        filters: null,
        source: null,

        filterMinLength: 1,
        filterThreshold: 500,

        showRowsSteps: true,
        showSearch: true,
        showTableInfo: true,
        showPagination: true,
        paginationShortMode: true,
        showActivity: true,

        muteTable: true,

        rows: 10,
        rowsSteps: "10,25,50,100",

        viewSaveMode: "client",
        viewSavePath: "TABLE:$1:OPTIONS",

        sortDir: "asc",
        decimalSeparator: ".",
        thousandSeparator: ",",

        tableRowsCountTitle: "Show entries:",
        tableSearchTitle: "Search:",
        tableInfoTitle: "Showing $1 to $2 of $3 entries",
        paginationPrevTitle: "Prev",
        paginationNextTitle: "Next",
        allRecordsTitle: "All",
        inspectorTitle: "Inspector",

        activityType: "cycle",
        activityStyle: "color",
        activityTimeout: 100,

        searchWrapper: null,
        rowsWrapper: null,
        infoWrapper: null,
        paginationWrapper: null,

        cellWrapper: true,

        clsComponent: "",
        clsTable: "",

        clsHead: "",
        clsHeadRow: "",
        clsHeadCell: "",

        clsBody: "",
        clsBodyRow: "",
        clsBodyCell: "",

        clsFooter: "",
        clsFooterRow: "",
        clsFooterCell: "",

        clsTableTop: "",
        clsRowsCount: "",
        clsSearch: "",

        clsTableBottom: "",
        clsTableInfo: "",
        clsTablePagination: "",

        clsPagination: "",

        onDraw: Metro.noop,
        onDrawRow: Metro.noop,
        onDrawCell: Metro.noop,
        onAppendRow: Metro.noop,
        onAppendCell: Metro.noop,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSearch: Metro.noop,
        onRowsCountChange: Metro.noop,
        onDataLoad: Metro.noop,
        onDataLoaded: Metro.noop,
        onFilterRowAccepted: Metro.noop,
        onFilterRowDeclined: Metro.noop,
        onCheckClick: Metro.noop,
        onCheckClickAll: Metro.noop,
        onCheckDraw: Metro.noop,
        onViewSave: Metro.noop,
        onViewGet: Metro.noop,
        onViewCreated: Metro.noop,
        onTableCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var id = Utils.elementId("table");

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", id);
        }

        if (Utils.isValue(Metro.locales[o.locale])) {
            this.locale = Metro.locales[o.locale];
        }

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){
                if (typeof data !== "object") {
                    throw new Error("Data for table is not a object");
                }
                that._build(data);
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var that = this, element = this.element, o = this.options;
        var view, id = element.attr("id");

        o.rows = parseInt(o.rows);

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this.view = this._createView();
        this.viewDefault = Utils.objectClone(this.view);

        if (o.viewSaveMode.toLowerCase() === "client") {
            view = Metro.storage.getItem(o.viewSavePath.replace("$1", id));
            if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(this.view)) {
                this.view = view;
                Utils.exec(o.onViewGet, [view], element[0]);
            }
            this._final();
        } else {
            $.get(
                o.viewSavePath,
                {
                    id: id
                },
                function(view){
                    if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(that.view)) {
                        that.view = view;
                        Utils.exec(o.onViewGet, [view], element[0]);
                    }
                    that._final();
                }
            ).fail(function(jqXHR, textStatus) {
                that._final();
                console.log("Warning! View " + textStatus + " for table " + element.attr('id') + " ");
            });
        }
    },

    _final: function(){
        var element = this.element, o = this.options;
        var id = element.attr("id");

        Metro.storage.delItem(o.checkStoreKey.replace("$1", id));

        this._service();
        this._createStructure();
        this._createInspector();
        this._createEvents();

        Utils.exec(o.onTableCreate, [element], element[0]);
    },

    _service: function(){
        var o = this.options;
        var item_check, item_rownum;
        var service = [];

        this.service = {};

        item_rownum = {
            title: "#",
            format: undefined,
            name: undefined,
            sortable: false,
            sortDir: undefined,
            clsColumn: o.rownum !== true ? "d-none" : "",
            cls: o.rownum !== true ? "d-none" : "",
            colspan: undefined,
            type: "rownum"
        };

        item_check = {
            title: o.checkType === "checkbox" ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all'>" : "",
            format: undefined,
            name: undefined,
            sortable: false,
            sortDir: undefined,
            clsColumn: o.check !== true ? "d-none" : "",
            cls: o.check !== true ? "d-none" : "",
            colspan: undefined,
            type: "rowcheck"
        };

        service.push(item_rownum);
        service.push(item_check);

        this.service = service;
    },

    _createView: function(){
        var view, o = this.options;

        view = {};

        $.each(this.heads, function(i){

            if (Utils.isValue(this.cls)) {this.cls = this.cls.replace("hidden", "");}
            if (Utils.isValue(this.clsColumn)) {this.clsColumn = this.clsColumn.replace("hidden", "");}

            view[i] = {
                "index": i,
                "index-view": i,
                "show": !Utils.isValue(this.show) ? true : this.show,
                "size": Utils.isValue(this.size) ? this.size : ""
            }
        });

        Utils.exec(o.onViewCreated, [view], view);
        return view;
    },

    _createInspectorItems: function(table){
        var that = this;
        var j, tds = [], row;
        var cells = this.heads;

        table.html("");

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(i){
            row = $("<tr>");
            row.data('index', i);
            row.data('index-view', i);
            $("<td>").html("<input type='checkbox' data-role='checkbox' name='column_show_check[]' value='"+i+"' "+(Utils.bool(that.view[i]['show']) ? "checked" : "")+">").appendTo(row);
            $("<td>").html(this.title).appendTo(row);
            $("<td>").html("<input type='number' name='column_size' value='"+that.view[i]['size']+"' data-index='"+i+"'>").appendTo(row);
            $("<td>").html("" +
                "<button class='button mini js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button>" +
                "<button class='button mini js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>" +
                "").appendTo(row);
            tds[that.view[i]['index-view']] = row;
        });

        //
        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(table);
        }
    },

    _createInspector: function(){
        var o = this.options;
        var component = this.component;
        var inspector, table, tbody, actions;

        inspector = $("<div data-role='draggable' data-drag-element='h3' data-drag-area='body'>").addClass("table-inspector");

        $("<h3 class='text-light'>"+o.inspectorTitle+"</h3>").appendTo(inspector);
        $("<hr class='thin bg-lightGray'>").appendTo(inspector);

        table = $("<table>").addClass("table subcompact");
        tbody = $("<tbody>").appendTo(table);

        table.appendTo(inspector);

        this._createInspectorItems(tbody);

        $("<hr class='thin bg-lightGray'>").appendTo(inspector);
        actions = $("<div class='inspector-actions'>").appendTo(inspector);
        $("<button class='button primary js-table-inspector-save' type='button'>").html(this.locale.buttons.save).appendTo(actions);
        $("<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>").html(this.locale.buttons.reset).appendTo(actions);
        $("<button class='button link js-table-inspector-cancel place-right' type='button'>").html(this.locale.buttons.cancel).appendTo(actions);

        this.inspector = inspector;

        component.append(inspector);

        this._createInspectorEvents();
    },

    _resetInspector: function(){
        var inspector = this.inspector;
        var table = inspector.find("table tbody");
        this._createInspectorItems(table);
        this._createInspectorEvents();
    },

    _createHeadsFormHTML: function(){
        var that = this, element = this.element;
        var head = element.find("thead");

        if (head.length > 0) $.each(head.find("tr > *"), function(){
            var item = $(this);
            var dir, head_item, item_class;

            if (item.hasClass("sort-asc")) {
                dir = "asc";
            } else if (item.hasClass("sort-desc")) {
                dir = "desc"
            } else {
                dir = undefined;
            }

            item_class = item[0].className.replace("sortable-column", "");
            item_class = item_class.replace("sort-asc", "");
            item_class = item_class.replace("sort-desc", "");

            head_item = {
                title: item.html(),
                format: Utils.isValue(item.data("format")) ? item.data("format") : undefined,
                name: Utils.isValue(item.data("name")) ? item.data("name") : undefined,
                sortable: item.hasClass("sortable-column"),
                sortDir: dir,
                clsColumn: Utils.isValue(item.data("cls-column")) ? item.data("cls-column") : "",
                cls: item_class,
                colspan: item.attr("colspan"),
                type: "data",
                size: Utils.isValue(item.data("size")) ? item.data("size") : ""
            };
            that.heads.push(head_item);
        });
    },

    _createFootsFromHTML: function(){
        var that = this, element = this.element;
        var foot = element.find("tfoot");

        if (foot.length > 0) $.each(foot.find("tr > *"), function(){
            var item = $(this);
            var foot_item;

            foot_item = {
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : false,
                cls: item[0].className,
                colspan: item.attr("colspan")
            };

            that.foots.push(foot_item);
        });
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element;
        var body = element.find("tbody");

        if (body.length > 0) $.each(body.find("tr"), function(){
            var row = $(this);
            var tr = [];
            $.each(row.children("td"), function(){
                var td = $(this);
                tr.push(td.html());
            });
            that.items.push(tr);
        });

        this._createHeadsFormHTML();
        this._createFootsFromHTML();
    },

    _createItemsFromJSON: function(source){
        var that = this;

        if (source.header !== undefined) {
            that.heads = source.header;
        } else {
            this._createHeadsFormHTML();
        }

        if (source.data !== undefined) {
            $.each(source.data, function(){
                var row = this;
                var tr = [];
                $.each(row, function(){
                    var td = this;
                    tr.push(td);
                });
                that.items.push(tr);
            });
        }

        if (source.footer !== undefined) {
            this.foots = source.footer;
        } else {
            this._createFootsFromHTML();
        }
    },

    _createTableHeader: function(){
        var element = this.element, o = this.options;
        var head = $("<thead>").html('');
        var tr, th, tds = [], j, cells;
        var view = this.view;

        element.find("thead").remove();

        head.addClass(o.clsHead);

        if (this.heads.length === 0) {
            return head;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(head);

        $.each(this.service, function(){
            var item = this, classes = [];
            th = $("<th>").appendTo(tr);
            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.size)) {th.css({width: item.size});}
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            if (item.type === 'rowcheck') {classes.push("check-cell");}
            if (item.type === 'rownum') {classes.push("rownum-cell");}
            classes.push(o.clsHeadCell);
            th.addClass(classes.join(" "));
        });

        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            var classes = [];

            th = $("<th>");
            th.data("index", cell_index);

            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.format)) {th.attr("data-format", item.format);}
            if (Utils.isValue(item.name)) {th.attr("data-name", item.name);}
            if (Utils.isValue(item.colspan)) {th.attr("colspan", item.colspan);}
            if (Utils.isValue(view[cell_index]['size'])) {th.css({width: view[cell_index]['size']});}
            if (item.sortable === true) {
                classes.push("sortable-column");

                if (Utils.isValue(item.sortDir)) {
                    classes.push("sort-" + item.sortDir);
                }
            }
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            if (Utils.bool(view[cell_index]['show']) === false) {
                classes.push("hidden");
            }

            if (item.type === 'rowcheck') {classes.push("check-cell");}
            if (item.type === 'rownum') {classes.push("rownum-cell");}

            classes.push(o.clsHeadCell);

            if (Utils.bool(view[cell_index]['show'])) {
                Utils.arrayDelete(classes, "hidden");
            }

            th.addClass(classes.join(" "));

            tds[view[cell_index]['index-view']] = th;
        });

        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(tr);
        }

        element.prepend(head);
    },

    _createTableBody: function(){
        var body, head, element = this.element;

        head  = element.find("thead");
        element.find("tbody").remove();
        body = $("<tbody>").addClass(this.options.clsBody);
        body.insertAfter(head);
    },

    _createTableFooter: function(){
        var element = this.element, o = this.options;
        var foot = $("<tfoot>").addClass(o.clsFooter);
        var tr, th;

        element.find("tfoot").remove();

        if (this.foots.length === 0) {
            element.append(foot);
            return;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(foot);
        $.each(this.foots, function(){
            var item = this;
            th = $("<th>").appendTo(tr);

            if (item.title !== undefined) {
                th.html(item.title);
            }

            if (item.name !== undefined) {
                th.addClass("foot-column-name-" + item.name);
            }

            if (item.cls !== undefined) {
                th.addClass(item.cls);
            }

            if (Utils.isValue(item.colspan)) {
                th.attr("colspan", item.colspan);
            }

            th.appendTo(tr);
        });

        element.append(foot);
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("table-top").addClass(o.clsTableTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("table-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.tableSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("table-rows-block").addClass(o.clsRowsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.rowsSteps), function () {
            var val = parseInt(this);
            var option = $("<option>").attr("value", val).text(val === -1 ? o.allRecordsTitle : val).appendTo(rows_select);
            if (val === parseInt(o.rows)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.tableRowsCountTitle,
            onChange: function (val) {
                val = parseInt(val);
                if (val === parseInt(o.rows)) {
                    return;
                }
                o.rows = val;
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0])
            }
        });

        if (o.showRowsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("table-bottom").addClass(o.clsTableBottom).insertAfter(element);
        var info, pagination;

        info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : $("<div>").addClass("table-info").addClass(o.clsTableInfo).appendTo(bottom_block);
        if (o.showTableInfo !== true) {
            info.hide();
        }

        pagination = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : $("<div>").addClass("table-pagination").addClass(o.clsTablePagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var table_component, columns;
        var w_search = $(o.searchWrapper), w_info = $(o.infoWrapper), w_rows = $(o.rowsWrapper), w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("table-component")) {
            table_component = $("<div>").addClass("table-component").insertBefore(element);
            element.appendTo(table_component);
        } else {
            table_component = element.parent();
        }

        table_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("table-progress").appendTo(table_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        element.html("").addClass(o.clsTable);

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

        this._createTopBlock();
        this._createBottomBlock();

        var need_sort = false;
        if (this.heads.length > 0) $.each(this.heads, function(i){
            var item = this;
            if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                need_sort = true;
                that.sort.colIndex = i;
                that.sort.dir = item.sortDir;
            }
        });

        if (need_sort) {
            columns = element.find("thead th");
            this._resetSortClass(columns);
            $(columns.get(this.sort.colIndex + that.service.length)).addClass("sort-"+this.sort.dir);
            this.sorting();
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.component = table_component;
        this._draw();
    },

    _resetSortClass: function(el){
        $(el).removeClass("sort-asc sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var search = component.find(".table-search-block input");
        var customSearch;
        var id = element.attr("id");

        element.on(Metro.events.click, ".sortable-column", function(){

            if (o.muteTable === true) element.addClass("disabled");

            if (that.busy) {
                return false;
            }
            that.busy = true;

            var col = $(this);

            that.activity.show(o.activityTimeout, function(){
                that.currentPage = 1;
                that.sort.colIndex = col.data("index");
                if (!col.has("sort-asc") && !col.hasClass("sort-desc")) {
                    that.sort.dir = o.sortDir;
                } else {
                    if (col.hasClass("sort-asc")) {
                        that.sort.dir = "desc";
                    } else {
                        that.sort.dir = "asc";
                    }
                }
                that._resetSortClass(element.find(".sortable-column"));
                col.addClass("sort-"+that.sort.dir);
                that.sorting();
                that._draw(function(){
                    that.busy = false;
                    if (o.muteTable === true) element.removeClass("disabled");
                });
            });
        });

        element.on(Metro.events.click, ".table-service-check input", function(){
            var check = $(this);
            var status = check.is(":checked");
            var val = ""+check.val();
            var store_key = o.checkStoreKey.replace("$1", id);
            var storage = Metro.storage;
            var data = storage.getItem(store_key);

            if (status) {
                if (!Utils.isValue(data)) {
                    data = [val];
                } else {
                    if (Array(data).indexOf(val) === -1) {
                        data.push(val);
                    }
                }
            } else {
                if (Utils.isValue(data)) {
                    Utils.arrayDelete(data, val);
                } else {
                    data = [];
                }
            }

            storage.setItem(store_key, data);

            Utils.exec(o.onCheckClick, [status], this);
        });

        element.on(Metro.events.click, ".table-service-check-all input", function(){
            var status = $(this).is(":checked");
            var store_key = o.checkStoreKey.replace("$1", id);
            var data = [];

            if (status) {
                $.each(that.filteredItems, function(){
                    if (data.indexOf(this[o.checkColIndex]) !== -1) return ;
                    data.push(""+this[o.checkColIndex]);
                });
            } else {
                data = [];
            }

            Metro.storage.setItem(store_key, data);

            that._draw();

            Utils.exec(o.onCheckClickAll, [status], this);
        });

        var input_interval;

        var _search = function(e){
            that.filterString = this.value.trim().toLowerCase();

            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }

            clearInterval(input_interval);
            setTimeout(function(){
                that.currentPage = 1;
                that._draw();
            }, o.filterThreshold);
        };

        search.on(Metro.events.inputchange, _search);

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, _search);
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();
            if (that.filteredItems.length === 0) {
                return ;
            }

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }

        this._createInspectorEvents();
    },

    _createInspectorEvents: function(){
        var that = this, inspector = this.inspector;
        // Inspector event

        this._removeInspectorEvents();

        inspector.on(Metro.events.click, ".js-table-inspector-field-up", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_prev = tr.prev("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_prev.length === 0) {
                return ;
            }
            tr.insertBefore(tr_prev);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.nextAll(), function(){
                var t = $(this);
                index_view++;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-field-down", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_next = tr.next("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_next.length === 0) {
                return ;
            }
            tr.insertAfter(tr_next);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.prevAll(), function(){
                var t = $(this);
                index_view--;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, "input[type=checkbox]", function(){
            var check = $(this);
            var status = check.is(":checked");
            var index = check.val();
            var op = ['cls', 'clsColumn'];

            if (status) {
                $.each(op, function(){
                    var a;
                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    Utils.arrayDelete(a, "hidden");
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = true;
                });
            } else {
                $.each(op, function(){
                    var a;

                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this]) : [];
                    if (a.indexOf("hidden") === -1) {
                        a.push("hidden");
                    }
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = false;
                });
            }

            that._createTableHeader();
            that._draw();
        });

        inspector.find("input[type=number]").on(Metro.events.inputchange, function(){
            var input = $(this);
            var index = input.attr("data-index");
            var val = parseInt(input.val());

            that.view[index]['size'] = val === 0 ? "" : val;

            that._createTableHeader();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-save", function(){
            that._saveTableView();
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-cancel", function(){
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-reset", function(e){
            that.resetView();
        });
    },

    _removeInspectorEvents: function(){
        var inspector = this.inspector;
        inspector.off(Metro.events.click, ".js-table-inspector-field-up");
        inspector.off(Metro.events.click, ".js-table-inspector-field-down");
        inspector.off(Metro.events.click, "input[type=checkbox]");
        inspector.off(Metro.events.click, ".js-table-inspector-save");
        inspector.off(Metro.events.click, ".js-table-inspector-cancel");
        inspector.off(Metro.events.click, ".js-table-inspector-reset");
        inspector.find("input[type=number]").off(Metro.events.inputchange);
    },

    _saveTableView: function(){
        var element = this.element, o = this.options;
        var view = this.view;
        var id = element.attr("id");

        if (o.viewSaveMode.toLowerCase() === "client") {
            Metro.storage.setItem(o.viewSavePath.replace("$1", id), view);
            Utils.exec(o.onViewSave, [o.viewSavePath, view], element[0]);
        } else {
            $.post(
                o.viewSavePath,
                {
                    id : element.attr("id"),
                    view : view
                },
                function(data, status, xhr){
                    Utils.exec(o.onViewSave, [o.viewSavePath, view, data, status, xhr], element[0]);
                }
            );
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".table-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.tableInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var that = this, element = this.element, o = this.options;
        var component = element.parent();
        var pagination_wrapper = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".table-pagination");
        var i, prev, next;
        var shortDistance = 5;
        var pagination;

        pagination_wrapper.html("");

        pagination = $("<ul>").addClass("pagination").addClass(o.clsPagination).appendTo(pagination_wrapper);

        if (this.items.length === 0) {
            return ;
        }

        if (o.rows === -1) {
            return ;
        }

        this.pagesCount = Math.ceil(length / o.rows);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(o.paginationPrevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, that.currentPage === 1 ? "active" : "", 1));

        if (o.paginationShortMode !== true || this.pagesCount <= 7) {
            for (i = 2; i < this.pagesCount; i++) {
                pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
            }
        } else {
            if (that.currentPage < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }

                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (that.currentPage <= that.pagesCount && that.currentPage > that.pagesCount - shortDistance + 1) {
                if (this.pagesCount > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = that.pagesCount - shortDistance + 1; i < that.pagesCount; i++) {
                    pagination.append(add_item(i, i === that.currentPage ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(that.currentPage - 1, "", that.currentPage - 1));
                pagination.append(add_item(that.currentPage, "active", that.currentPage));
                pagination.append(add_item(that.currentPage + 1, "", that.currentPage + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (that.pagesCount > 1 || that.currentPage < that.pagesCount) pagination.append(add_item(that.pagesCount, that.currentPage === that.pagesCount ? "active" : "", that.pagesCount));

        next = add_item(o.paginationNextTitle, "service next-page", "next");
        pagination.append(next);

        if (this.currentPage === 1) {
            prev.addClass("disabled");
        }

        if (this.currentPage === this.pagesCount) {
            next.addClass("disabled");
        }

        if (this.filteredItems.length === 0) {
            pagination.addClass("disabled");
            pagination.children().addClass("disabled");
        }
    },

    _filter: function(){
        var that = this, o = this.options, element = this.element;
        var items, flt, idx = -1, i;
        if ((Utils.isValue(this.filterString) && that.filterString.length >= o.filterMinLength) || this.filters.length > 0) {
            flt = this.filterString.split(":");
            if (flt.length > 1) {
                $.each(that.heads, function (i, v) {
                    if (flt[0] === v.title.toLowerCase()) {
                        idx = i;
                    }
                })
            }
            items = this.items.filter(function(row){
                var row_data = "" + (flt.length > 1 && idx > -1 ? row[idx] : row.join());
                var c1 = row_data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                var result = Utils.isValue(that.filterString) && that.filterString.length >= o.filterMinLength ? ~c1.indexOf(flt.length > 1 ? flt[1] : flt[0]) : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (!Utils.isValue(that.filters[i])) continue;
                        if (Utils.exec(that.filters[i], [row, that.heads]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterRowAccepted, [row], element[0]);
                } else {
                    Utils.exec(o.onFilterRowDeclined, [row], element[0]);
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0])
        } else {
            items = this.items;
        }

        this.filteredItems = items;

        return items;
    },

    _draw: function(cb){
        var that = this, element = this.element, o = this.options;
        var body = element.find("tbody");
        var i;
        var start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1),
            stop = parseInt(o.rows) === -1 ? this.items.length - 1 : start + o.rows - 1;
        var items;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr('id')));
        var view = this.view;

        body.html("");

        items = this._filter();

        for (i = start; i <= stop; i++) {
            var j, tr, td, check, cells = [], tds = [];
            if (Utils.isValue(items[i])) {
                tr = $("<tr>").addClass(o.clsBodyRow);

                // Rownum
                td = $("<td>").html(i + 1);
                if (that.service[0].clsColumn !== undefined) {
                    td.addClass(that.service[0].clsColumn);
                }
                td.appendTo(tr);

                // Checkbox
                td = $("<td>");
                if (o.checkType === "checkbox") {
                    check = $("<input type='checkbox' data-role='checkbox' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "[]' value='" + items[i][o.checkColIndex] + "'>");
                } else {
                    check = $("<input type='radio' data-role='radio' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "' value='" + items[i][o.checkColIndex] + "'>");
                }

                if (Utils.isValue(stored_keys) && Array.isArray(stored_keys) && stored_keys.indexOf(""+items[i][o.checkColIndex]) > -1) {
                    check.prop("checked", true);
                }

                check.addClass("table-service-check");
                Utils.exec(o.onCheckDraw, [check], check[0]);
                check.appendTo(td);
                if (that.service[1].clsColumn !== undefined) {
                    td.addClass(that.service[1].clsColumn);
                }
                td.appendTo(tr);

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (o.cellWrapper === true) {
                        td = $("<td>");
                        $("<div>").addClass("cell-wrapper").html(this).appendTo(td);
                    } else {
                        td = $("<td>").html(this);
                    }
                    td.addClass(o.clsBodyCell);
                    if (Utils.isValue(that.heads[cell_index].clsColumn)) {
                        td.addClass(that.heads[cell_index].clsColumn);
                    }

                    if (Utils.bool(view[cell_index].show) === false) {
                        td.addClass("hidden");
                    }

                    if (Utils.bool(view[cell_index].show)) {
                        td.removeClass("hidden");
                    }

                    tds[view[cell_index]['index-view']] = td;
                    Utils.exec(o.onDrawCell, [td, this, cell_index, that.heads[cell_index]], td[0]);
                });

                for (j = 0; j < cells.length; j++){
                    tds[j].appendTo(tr);
                    Utils.exec(o.onAppendCell, [tds[j], tr, j, element], tds[j][0])
                }

                Utils.exec(o.onDrawRow, [tr, that.view, that.heads, element], tr[0]);

                tr.appendTo(body);

                Utils.exec(o.onAppendRow, [tr, element], tr[0]);
            }
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        if (this.activity) this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(row){

        // console.log(this.sort);

        var result, col = row[this.sort.colIndex];
        var format = this.heads[this.sort.colIndex].format;
        var formatMask = this.heads[this.sort.colIndex].formatMask;
        var o = this.options;

        result = (""+col).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                result = Utils.parseNumber(result, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": result = Utils.isValue(formatMask) ? result.toDate(formatMask) : new Date(result); break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Utils.parseMoney(result); break;
            }
        }

        return result;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(dir)) {
            this.sort.dir = dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = that.sort.dir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = that.sort.dir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source, review){
        var that = this, element = this.element, o = this.options;
        var need_sort = false;
        var sortable_columns;

        function redraw(){

            if (review === true) {
                that.view = that._createView();
            }

            that._createTableHeader();
            that._createTableBody();
            that._createTableFooter();

            if (that.heads.length > 0) $.each(that.heads, function(i){
                var item = this;
                if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                    need_sort = true;
                    that.sort.colIndex = i;
                    that.sort.dir = item.sortDir;
                }
            });

            if (need_sort) {
                sortable_columns = element.find(".sortable-column");
                that._resetSortClass(sortable_columns);
                $(sortable_columns.get(that.sort.colIndex)).addClass("sort-"+that.sort.dir);
                that.sorting();
            }

            that.currentPage = 1;

            that._draw();
        }

        element.html("");

        if (!Utils.isValue(source)) {

            // this._createItemsFromHTML();
            redraw();

        } else {
            o.source = source;

            Utils.exec(o.onDataLoad, [o.source], element[0]);

            $.get(o.source, function(data){

                that.items = [];
                that.heads = [];
                that.foots = [];

                that._createItemsFromJSON(data);

                redraw();

                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            }).fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus); console.log(jqXHR); console.log(errorThrown);
            });
        }
    },

    reload: function(review){
        this.loadData(this.options.source, review);
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        this.filters[key] = null;
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getItems: function(){
        return this.items;
    },

    getHeads: function(){
        return this.heads;
    },

    getView: function(){
        return this.view;
    },

    getFilteredItems: function(){
        return this.filteredItems.length > 0 ? this.filteredItems : this.items;
    },

    getSelectedItems: function(){
        var element = this.element, o = this.options;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")));
        var selected = [];

        if (!Utils.isValue(stored_keys)) {
            return [];
        }

        $.each(this.items, function(){
            if (stored_keys.indexOf(""+this[o.checkColIndex]) !== -1) {
                selected.push(this);
            }
        });
        return selected;
    },

    getStoredKeys: function(){
        var element = this.element, o = this.options;
        return Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
    },

    clearSelected: function(redraw){
        var element = this.element, o = this.options;
        Metro.storage.setItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
        element.find("table-service-check-all input").prop("checked", false);
        if (redraw === true) this._draw();
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    openInspector: function(mode){
        this.inspector[mode ? "addClass" : "removeClass"]("open");
    },

    toggleInspector: function(){
        this.inspector.toggleClass("open");
    },

    resetView: function(){

        this.view = this._createView();

        this._createTableHeader();
        this._createTableFooter();
        this._draw();

        this._resetInspector();
        this._saveTableView();
    },

    export: function(to, mode, filename, options){
        var that = this, o = this.options;
        var table = document.createElement("table");
        var head = $("<thead>").appendTo(table);
        var body = $("<tbody>").appendTo(table);
        var i, j, cells, tds = [], items, tr, td;
        var start, stop;

        mode = Utils.isValue(mode) ? mode.toLowerCase() : "all-filtered";
        filename = Utils.isValue(filename) ? filename : Utils.elementId("table")+"-export.csv";

        // Create table header
        tr = $("<tr>");
        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            if (Utils.bool(that.view[cell_index]['show']) === false) {
                return ;
            }
            td = $("<th>");
            if (Utils.isValue(item.title)) {
                td.html(item.title);
            }
            tds[that.view[cell_index]['index-view']] = td;
        });

        for (j = 0; j < cells.length; j++){
            if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
        }
        tr.appendTo(head);

        // Create table data
        if (mode === "checked") {
            items = this.getSelectedItems();
            start = 0; stop = items.length - 1;
        } else if (mode === "view") {
            items = this._filter();
            start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1);
            stop = parseInt(o.rows) === -1 ? items.length - 1 : start + o.rows - 1;
        } else if (mode === "all") {
            items = this.items;
            start = 0; stop = items.length - 1;
        } else {
            items = this._filter();
            start = 0; stop = items.length - 1;
        }

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                tr = $("<tr>");

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (Utils.bool(that.view[cell_index].show) === false) {
                        return ;
                    }
                    td = $("<td>").html(this);
                    tds[that.view[cell_index]['index-view']] = td;
                });

                for (j = 0; j < cells.length; j++){
                    if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
                }

                tr.appendTo(body);
            }
        }

        switch (to) {
            default: Export.tableToCSV(table, filename, options);
        }
        table.remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        function dataCheck(){
            o.check = Utils.bool(element.attr("data-check"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        function dataRownum(){
            o.rownum = Utils.bool(element.attr("data-rownum"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        switch (attributeName) {
            case "data-check": dataCheck(); break;
            case "data-rownum": dataRownum(); break;
        }
    }
};

Metro.plugin('table', Table);

// Source: js/plugins/tabs.js
var Tabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._targets = [];

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTabsCreate, [this.element], this.elem);

        return this;
    },

    options: {
        expand: null,
        tabsPosition: "top",

        clsTabs: "",
        clsTabsList: "",
        clsTabsListItem: "",

        onTab: Metro.noop,
        onBeforeTab: Metro.noop_true,
        onTabsCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var tab = element.find(".active").length > 0 ? $(element.find(".active")[0]) : undefined;

        this._createStructure();
        this._createEvents();
        this._open(tab);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var right_parent = parent.hasClass("tabs");
        var container = right_parent ? parent : $("<div>").addClass("tabs tabs-wrapper");
        var expandTitle, hamburger;

        if (Utils.isValue(o.expand)) {
            container.addClass("tabs-expand-"+o.expand);
        }

        container.addClass(o.tabsPosition.replace(["-", "_", "+"], " "));
        if (o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand-fs"); // TODO need redesign this behavior
        }

        element.addClass("tabs-list");
        if (!right_parent) {
            container.insertBefore(element);
            element.appendTo(container);
        }

        element.data('expanded', false);

        expandTitle = $("<div>").addClass("expand-title"); container.prepend(expandTitle);
        hamburger = container.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down").appendTo(container);
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(container, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        container.addClass(o.clsTabs);
        element.addClass(o.clsTabsList);
        element.children("li").addClass(o.clsTabsListItem);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();

        container.on(Metro.events.click, ".hamburger, .expand-title", function(){
            if (element.data('expanded') === false) {
                element.addClass("expand");
                element.data('expanded', true);
                container.find(".hamburger").addClass("active");
            } else {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }
        });

        element.on(Metro.events.click, "a", function(e){
            var link = $(this);
            var href = link.attr("href").trim();
            var tab = link.parent("li");

            if (tab.hasClass("active")) {
                e.preventDefault();
            }

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }

            if (Utils.exec(o.onBeforeTab, [tab, element], tab[0]) !== true) {
                return false;
            }

            if (Utils.isValue(href) && href[0] === "#") {
                that._open(tab);
                e.preventDefault();
            }
        });
    },

    _collectTargets: function(){
        var that = this, element = this.element;
        var tabs = element.find("li");

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href").trim();
            if (target.length > 1 && target[0] === "#") {
                that._targets.push(target);
            }
        });
    },

    _open: function(tab){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find("li");
        var expandTitle = element.siblings(".expand-title");


        if (tabs.length === 0) {
            return;
        }

        this._collectTargets();

        if (tab === undefined) {
            tab = $(tabs[0]);
        }

        var target = tab.find("a").attr("href");

        if (target === undefined) {
            return;
        }

        tabs.removeClass("active");
        if (tab.parent().hasClass("d-menu")) {
            tab.parent().parent().addClass("active");
        } else {
            tab.addClass("active");
        }

        $.each(this._targets, function(){
            var t = $(this);
            if (t.length > 0) t.hide();
        });

        if (target !== "#" && target[0] === "#") {
            $(target).show();
        }

        expandTitle.html(tab.find("a").html());

        Utils.exec(o.onTab, [tab, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tabs', Tabs);

// Source: js/plugins/tag-input.js
var TagInput = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.values = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        randomColor: false,
        maxTags: 0,
        tagSeparator: ",",
        clsTag: "",
        clsTagTitle: "",
        clsTagRemover: "",
        onBeforeTagAdd: Metro.noop_true,
        onTagAdd: Metro.noop,
        onBeforeTagRemove: Metro.noop_true,
        onTagRemove: Metro.noop,
        onTag: Metro.noop,
        onTagInputCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTagInputCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, input;
        var values = element.val().trim();

        container = $("<div>").addClass("tag-input "  + element[0].className).insertBefore(element);
        element.appendTo(container);

        element[0].className = "";

        element.addClass("original-input");
        input = $("<input type='text'>").addClass("input-wrapper");
        input.appendTo(container);

        if (Utils.isValue(values)) {
            $.each(Utils.strToArray(values, o.tagSeparator), function(){
                that._addTag(this);
            })
        }
    },

    _createEvents: function(){
        var that = this, element = this.element;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.on(Metro.events.focus, function(){
            container.addClass("focused");
        });

        input.on(Metro.events.blur, function(){
            container.removeClass("focused");
        });

        input.on(Metro.events.keyup, function(e){
            var val = input.val().trim();

            if (val === "") {return ;}

            if ([13, 188].indexOf(e.keyCode) === -1) {
                return ;
            }

            input.val("");
            that._addTag(val.replace(",", ""));
        });

        container.on(Metro.events.click, ".tag .remover", function(){
            var tag = $(this).closest(".tag");
            that._delTag(tag);
        });

        container.on(Metro.events.click, function(){
            input.focus();
        });
    },

    _addTag: function(val){
        var element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");
        var tag, title, remover;

        if (o.maxTags > 0 && this.values.length === o.maxTags) {
            return ;
        }

        if (!Utils.exec(o.onBeforeTagAdd, [val, this.values], element[0])) {
            return ;
        }


        tag = $("<span>").addClass("tag").addClass(o.clsTag).insertBefore(input);
        tag.data("value", val);

        title = $("<span>").addClass("title").addClass(o.clsTagTitle).html(val);
        remover = $("<span>").addClass("remover").addClass(o.clsTagRemover).html("&times;");

        title.appendTo(tag);
        remover.appendTo(tag);

        if (o.randomColor === true) {
            var colors = Colors.colors(Colors.PALETTES.ALL), bg, fg, bg_r;

            bg = colors[Utils.random(0, colors.length - 1)];
            bg_r = Colors.darken(bg, 15);
            fg = Colors.isDark(bg) ? "#ffffff" : "#000000";

            tag.css({
                backgroundColor: bg,
                color: fg
            });
            remover.css({
                backgroundColor: bg_r,
                color: fg
            });
        }

        this.values.push(val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagAdd, [tag, val, this.values], element[0]);
        Utils.exec(o.onTag, [tag, val, this.values], element[0]);
    },

    _delTag: function(tag) {
        var element = this.element, o = this.options;
        var val = tag.data("value");

        if (!Utils.exec(o.onBeforeTagAdd, [tag, val, this.values, tag], element[0])) {
            return ;
        }

        Utils.arrayDelete(this.values, val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagRemove, [tag, val, this.values], element[0]);
        Utils.exec(o.onTag, [tag, val, this.values], element[0]);
        tag.remove();
    },

    tags: function(){
        return this.values;
    },

    val: function(v){
        var that = this, o = this.options;

        if (!Utils.isValue(v)) {
            return this.tags();
        }

        this.values = [];

        if (Utils.isValue(values)) {
            $.each(Utils.strToArray(values, o.tagSeparator), function(){
                that._addTag(this);
            })
        }
    },

    clear: function(){
        var element = this.element;
        var container = element.closest(".tag-input");

        this.values = [];
        element.val("");

        container.find(".tag").remove();
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.off(Metro.events.focus);
        input.off(Metro.events.blur);
        input.off(Metro.events.keydown);
        container.off(Metro.events.click, ".tag .remover");
        container.off(Metro.events.click);

        element.insertBefore(container);
        container.remove();
    }
};

Metro.plugin('taginput', TagInput);

// Source: js/plugins/textarea.js
var Textarea = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTextareaCreate, [this.element]);

        return this;
    },
    options: {
        prepend: "",
        copyInlineStyles: true,
        clearButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        autoSize: false,
        disabled: false,
        onTextareaCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("textarea " + element[0].className);
        var clearButton;
        var timer = null;

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }


        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function(){
                element.val("").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(container);
        }

        element.appendTo(container);

        var resize = function(){
            element[0].style.cssText = 'height:auto;';
            element[0].style.cssText = 'height:' + element[0].scrollHeight + 'px';
        };

        if (o.autoSize) {

            container.addClass("autosize");

            timer = setTimeout(function(){
                timer = null;
                resize();
            }, 0);

            element.on(Metro.events.keyup, resize);
            element.on(Metro.events.keydown, resize);
            element.on(Metro.events.change, resize);
            element.on(Metro.events.focus, resize);
            element.on(Metro.events.cut, resize);
            element.on(Metro.events.paste, resize);
            element.on(Metro.events.drop, resize);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('textarea', Textarea);

// Source: js/plugins/tiles.js
var Tile = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.effectInterval = false;
        this.images = [];
        this.slides = [];
        this.currentSlide = -1;
        this.unload = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        size: "medium",
        cover: "",
        effect: "",
        effectInterval: 3000,
        effectDuration: 500,
        target: null,
        canTransform: true,
        onClick: Metro.noop,
        onTileCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTile();
        this._createEvents();

        Utils.exec(o.onTileCreate, [element]);
    },

    _createTile: function(){
        function switchImage(el, img_src){
            setTimeout(function(){
                el.fadeOut(500, function(){
                    el.css("background-image", "url(" + img_src + ")");
                    el.fadeIn();
                });
            }, Utils.random(0,1000));
        }

        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides2 = element.find(".slide-front, .slide-back");

        element.addClass("tile-" + o.size);

        if (o.effect.indexOf("hover-") > -1) {
            element.addClass("effect-" + o.effect);
            $.each(slides2, function(){
                var slide = $(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }
            })
        }

        if (o.effect.indexOf("animate-") > -1 && slides.length > 1) {
            $.each(slides, function(i){
                var slide = $(this);

                that.slides.push(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }

                if (i > 0) {
                    if (["animate-slide-up", "animate-slide-down"].indexOf(o.effect) > -1) slide.css("top", "100%");
                    if (["animate-slide-left", "animate-slide-right"].indexOf(o.effect) > -1) slide.css("left", "100%");
                    if (["animate-fade"].indexOf(o.effect) > -1) slide.css("opacity", 0);
                }
            });

            this.currentSlide = 0;

            this._runEffects();
        }

        if (o.cover !== "") {
            this._setCover(element, o.cover);
        }

        if (o.effect === "image-set") {
            element.addClass("image-set");
            $.each(element.children("img"), function(){
                var img = $(this);
                var src = this.src;
                var div = $("<div>").addClass("img");

                if (img.hasClass("icon")) {
                    return ;
                }

                that.images.push(this);

                div.css("background-image", "url("+src+")");
                element.prepend(div);
                img.remove();
            });

            setInterval(function(){
                var temp = that.images.slice();
                for(var i = 0; i < element.find(".img").length; i++) {
                    var rnd_index = Utils.random(0, temp.length - 1);
                    var div = $(element.find(".img").get(i));
                    switchImage(div, temp[rnd_index].src);
                    temp.splice(rnd_index, 1);
                }
            }, 3000);
        }
    },

    _runEffects: function(){
        var that = this, o = this.options;

        if (this.effectInterval === false) this.effectInterval = setInterval(function(){
            var current, next;

            current = $(that.slides[that.currentSlide]);

            that.currentSlide++;
            if (that.currentSlide === that.slides.length) {
                that.currentSlide = 0;
            }

            next = that.slides[that.currentSlide];

            if (o.effect === "animate-slide-up") Animation.slideUp($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-down") Animation.slideDown($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-left") Animation.slideLeft($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-right") Animation.slideRight($(current), $(next), o.effectDuration);
            if (o.effect === "animate-fade") Animation.fade($(current), $(next), o.effectDuration);

        }, o.effectInterval);
    },

    _stopEffects: function(){
        clearInterval(this.effectInterval);
        this.effectInterval = false;
    },

    _setCover: function(to, src){
        to.css({
            backgroundImage: "url("+src+")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.start, function(e){
            var tile = $(this);
            var dim = {w: element.width(), h: element.height()};
            var X = Utils.pageXY(e).x - tile.offset().left,
                Y = Utils.pageXY(e).y - tile.offset().top;
            var side;

            if (Utils.isRightMouse(e) === false) {

                if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'left';
                } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'right';
                } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
                    side = 'bottom';
                } else {
                    side = "top";
                }

                if (o.canTransform === true) tile.addClass("transform-" + side);

                if (o.target !== null) {
                    setTimeout(function(){
                        document.location.href = o.target;
                    }, 100);
                }

                Utils.exec(o.onClick, [tile]);
            }
        });

        element.on([Metro.events.stop, Metro.events.leave].join(" "), function(e){
            $(this)
                .removeClass("transform-left")
                .removeClass("transform-right")
                .removeClass("transform-top")
                .removeClass("transform-bottom");
        });

        $(window).on(Metro.events.blur, function(){
            that._stopEffects();
        });
        $(window).on(Metro.events.focus, function(){
            that._runEffects();
        });
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tile', Tile);

// Source: js/plugins/timepicker.js
var TimePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = [];
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        hoursStep: 1,
        minutesStep: 1,
        secondsStep: 1,
        value: null,
        locale: METRO_LOCALE,
        distance: 3,
        hours: true,
        minutes: true,
        seconds: true,
        showLabels: true,
        scrollSpeed: 5,
        copyInlineStyles: true,
        clsPicker: "",
        clsPart: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        okButtonIcon: "<span class='default-icon-check'></span>",
        cancelButtonIcon: "<span class='default-icon-cross'></span>",
        onSet: Metro.noop,
        onOpen: Metro.noop,
        onClose: Metro.noop,
        onScroll: Metro.noop,
        onTimePickerCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;
        var i;

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.hoursStep < 1) {o.hoursStep = 1;}
        if (o.hoursStep > 23) {o.hoursStep = 23;}

        if (o.minutesStep < 1) {o.minutesStep = 1;}
        if (o.minutesStep > 59) {o.minutesStep = 59;}

        if (o.secondsStep < 1) {o.secondsStep = 1;}
        if (o.secondsStep > 59) {o.secondsStep = 59;}

        if (element.val() === "" && (!Utils.isValue(o.value))) {
            o.value = (new Date()).format("%H:%M:%S");
        }

        this.value = Utils.strToArray(element.val() !== "" ? element.val() : String(o.value), ":");

        for(i = 0; i < 3; i++) {
            if (this.value[i] === undefined || this.value[i] === null) {
                this.value[i] = 0;
            } else {
                this.value[i] = parseInt(this.value[i]);
            }
        }

        this._normalizeValue();

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onTimePickerCreate, [element, picker]);
    },

    _normalizeValue: function(){
        var o = this.options;

        if (o.hoursStep > 1) {
            this.value[0] = Utils.nearest(this.value[0], o.hoursStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[1] = Utils.nearest(this.value[1], o.minutesStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[2] = Utils.nearest(this.value[2], o.secondsStep, true);
        }
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var picker, hours, minutes, seconds, ampm, select, i;
        var timeWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("time-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker time-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.attr("readonly", true).appendTo(picker);


        timeWrapper = $("<div>").addClass("time-wrapper").appendTo(picker);

        if (o.hours === true) {
            hours = $("<div>").attr("data-title", this.locale['time']['hours']).addClass("hours").addClass(o.clsPart).addClass(o.clsHours).appendTo(timeWrapper);
        }
        if (o.minutes === true) {
            minutes = $("<div>").attr("data-title", this.locale['time']['minutes']).addClass("minutes").addClass(o.clsPart).addClass(o.clsMinutes).appendTo(timeWrapper);
        }
        if (o.seconds === true) {
            seconds = $("<div>").attr("data-title", this.locale['time']['seconds']).addClass("seconds").addClass(o.clsPart).addClass(o.clsSeconds).appendTo(timeWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);
        if (o.hours === true) {
            hours = $("<ul>").addClass("sel-hours").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
            for (i = 0; i < 24; i = i + o.hoursStep) {
                $("<li>").addClass("js-hours-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(hours);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
        }
        if (o.minutes === true) {
            minutes = $("<ul>").addClass("sel-minutes").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
            for (i = 0; i < 60; i = i + o.minutesStep) {
                $("<li>").addClass("js-minutes-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(minutes);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
        }
        if (o.seconds === true) {
            seconds = $("<ul>").addClass("sel-seconds").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
            for (i = 0; i < 60; i = i + o.secondsStep) {
                $("<li>").addClass("js-seconds-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(seconds);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.showLabels === true) {
            picker.addClass("show-labels");
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move + "-picker", function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            });

            $(document).on(Metro.events.stop + "-picker", function(e){
                $(document).off(Metro.events.move + "-picker");
                $(document).off(Metro.events.stop + "-picker");
            });
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var h, m, s, a;
            var sh = picker.find(".sel-hours li.active"),
                sm = picker.find(".sel-minutes li.active"),
                ss = picker.find(".sel-seconds li.active");

            h = sh.length === 0 ? 0 : sh.data("value");
            m = sm.length === 0 ? 0 : sm.data("value");
            s = ss.length === 0 ? 0 : ss.data("value");

            that.value = [h, m, s];
            that._normalizeValue();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        this._addScrollEvents();
    },

    _addScrollEvents: function(){
        var picker = this.picker, o = this.options;
        var lists = ['hours', 'minutes', 'seconds'];

        $.each(lists, function(){
            var list_name = this;
            var list = picker.find(".sel-" + list_name);

            if (list.length === 0) return ;

            list.on(Metro.events.scrollStart, function(){
                list.find(".active").removeClass("active");
            });

            list.on(Metro.events.scrollStop, {latency: 50}, function(){
                var target = Math.round((Math.ceil(list.scrollTop() + 40) / 40)) ;
                var target_element = list.find("li").eq(target + o.distance - 1);
                var scroll_to = target_element.position().top - (o.distance * 40) + list.scrollTop();

                list.animate({
                    scrollTop: scroll_to
                }, 100, function(){
                    target_element.addClass("active");
                    Utils.exec(o.onScroll, [target_element, list, picker]);
                });
            });
        });
    },

    _removeScrollEvents: function(){
        var picker = this.picker;
        var lists = ['hours', 'minutes', 'seconds'];
        $.each(lists, function(){
            picker.find(".sel-" + this).off("scrollstart scrollstop");
        });
    },

    _set: function(){
        var that = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h = "00", m = "00", s = "00";

        if (o.hours === true) {
            h = this.value[0];
            if (h < 10) {
                h = "0"+h;
            }
            picker.find(".hours").html(h);
        }
        if (o.minutes === true) {
            m = this.value[1];
            if (m < 10) {
                m = "0"+m;
            }
            picker.find(".minutes").html(m);
        }
        if (o.seconds === true) {
            s = this.value[2];
            if (s < 10) {
                s = "0"+s;
            }
            picker.find(".seconds").html(s);
        }

        element.val([h, m, s].join(":")).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker]);
    },

    open: function(){
        var that  = this, element = this.element, o = this.options;
        var picker = this.picker;
        var h, m, s;
        var h_list, m_list, s_list;
        var items = picker.find("li");
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;
        var h_item, m_item, s_item;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show();
        items.removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper);
        select_wrapper_rect = Utils.rect(select_wrapper);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        var animateList = function(list, item){
            list.scrollTop(0).animate({
                scrollTop: item.position().top - (o.distance * 40) + list.scrollTop()
            }, 100);
        };

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            h_list = picker.find(".sel-hours");
            h_item = h_list.find("li.js-hours-" + h).addClass("active");
            animateList(h_list, h_item);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            m_list = picker.find(".sel-minutes");
            m_item = m_list.find("li.js-minutes-" + m).addClass("active");
            animateList(m_list, m_item);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            s_list = picker.find(".sel-seconds");
            s_item = s_list.find("li.js-seconds-" + s).addClass("active");
            animateList(s_list, s_item);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker]);
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide();
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker]);
    },

    _convert: function(t){
        var result;

        if (Array.isArray(t)) {
            result = t;
        } else if (typeof  t.getMonth === 'function') {
            result = [t.getHours(), t.getMinutes(), t.getSeconds()];
        } else if (Utils.isObject(t)) {
            result = [t.h, t.m, t.s];
        } else {
            result = Utils.strToArray(t, ":");
        }

        return result;
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    time: function(t){
        if (t === undefined) {
            return {
                h: this.value[0],
                m: this.value[1],
                s: this.value[2]
            }
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    date: function(t){
        if (t === undefined || typeof t.getMonth !== 'function') {
            var ret = new Date();
            ret.setHours(this.value[0]);
            ret.setMinutes(this.value[1]);
            ret.setSeconds(this.value[2]);
            ret.setMilliseconds(0);
            return ret;
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValueAttribute = function(){
            that.val(element.attr("data-value"));
        };

        switch (attributeName) {
            case "data-value": changeValueAttribute(); break;
        }
    }
};

Metro.plugin('timepicker', TimePicker);

$(document).on(Metro.events.click, function(e){
    $.each($(".time-picker"), function(){
        $(this).find("input").data("timepicker").close();
    });
});


// Source: js/plugins/toast.js
var Toast = {
    create: function(message, callback, timeout, cls){
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
        var width = toast.outerWidth();
        var timer = null;
        timeout = timeout || METRO_TIMEOUT;

        toast.css({
            'left': '50%',
            'margin-left': -(width / 2)
        }).addClass(cls).fadeIn(METRO_ANIMATION_DURATION);

        timer = setTimeout(function(){
            timer = null;
            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.callback(callback);
            });
        }, timeout);
    }
};

Metro['toast'] = Toast;

// Source: js/plugins/treeview.js
var Treeview = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        effect: "slide",
        duration: 100,
        onNodeClick: Metro.noop,
        onNodeDblClick: Metro.noop,
        onNodeDelete: Metro.noop,
        onNodeInsert: Metro.noop,
        onNodeClean: Metro.noop,
        onCheckClick: Metro.noop,
        onRadioClick: Metro.noop,
        onExpandNode: Metro.noop,
        onCollapseNode: Metro.noop,
        onTreeviewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTree();
        this._createEvents();

        $.each(element.find("input"), function(){
            if (!$(this).is(":checked")) return;
            that._recheck(this);
        });

        Utils.exec(o.onTreeviewCreate, [element]);
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src);

        return icon;
    },

    _createCaption: function(data){
        return $("<span>").addClass("caption").html(data);
    },


    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },


    _createNode: function(data){
        var node;

        node = $("<li>");

        if (data.caption !== undefined) {
            node.prepend(this._createCaption(data.caption));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (data.html !== undefined) {
            node.append(data.html);
        }

        return node;
    },

    _createTree: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");

        element.addClass("treeview");

        $.each(nodes, function(){
            var node = $(this);


            if (node.data("caption") !== undefined) {
                node.prepend(that._createCaption(node.data("caption")));
            }

            if (node.data("icon") !== undefined) {
                node.prepend(that._createIcon(node.data("icon")));
            }

            if (node.children("ul").length > 0) {
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) {
                    node.addClass("expanded");
                } else {
                    node.children("ul").hide();
                }
            }

        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node-toggle", function(e){
            var toggle = $(this);
            var node = toggle.parent();

            that.toggleNode(node);

            e.preventDefault();
        });

        element.on(Metro.events.click, "li > .caption", function(e){
            var node = $(this).parent();

            that.current(node);

            Utils.exec(o.onNodeClick, [node, element]);

            e.preventDefault();
        });

        element.on(Metro.events.dblclick, "li > .caption", function(e){
            var node = $(this).closest("li");
            var toggle = node.children(".node-toggle");
            var subtree = node.children("ul");

            if (toggle.length > 0 || subtree.length > 0) {
                that.toggleNode(node);
            }

            Utils.exec(o.onNodeDblClick, [node, element]);

            e.preventDefault();
        });

        element.on(Metro.events.click, "input[type=radio]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that.current(node);

            Utils.exec(o.onRadioClick, [checked, check, node, element]);
        });

        element.on(Metro.events.click, "input[type=checkbox]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that._recheck(check);

            Utils.exec(o.onCheckClick, [checked, check, node, element], this);
        });
    },

    _recheck: function(check){
        var element = this.element;
        var checked, node, checks;

        if (!Utils.isJQueryObject(check)) {
            check = $(check);
        }

        checked = check.is(":checked");
        node = check.closest("li");

        this.current(node);

        // down
        checks = check.closest("li").find("ul input[type=checkbox]");
        checks.attr("data-indeterminate", false);
        checks.prop("checked", checked);

        checks = [];

        $.each(element.find(":checkbox"), function(){
            checks.push(this);
        });

        $.each(checks.reverse(), function(){
            var ch = $(this);
            var children = ch.closest("li").children("ul").find(":checkbox").length;
            var children_checked = ch.closest("li").children("ul").find(":checkbox:checked").length;

            if (children > 0 && children_checked === 0) {
                ch.attr("data-indeterminate", false);
                ch.prop("checked", false);
            }

            if (children_checked === 0) {
                ch.attr("data-indeterminate", false);
            } else {
                if (children_checked > 0 && children > children_checked) {
                    ch.attr("data-indeterminate", true);
                } else if (children === children_checked) {
                    ch.attr("data-indeterminate", false);
                    ch.prop("checked", true);
                }
            }
        });
    },

    current: function(node){
        var element = this.element, o = this.options;

        if (node === undefined) {
            return element.find("li.current")
        }

        element.find("li").removeClass("current");
        node.addClass("current");
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        node.toggleClass("expanded");

        if (o.effect === "slide") {
            func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
            Utils.exec(o.onCollapseNode, [node, element]);
        } else {
            func = node.hasClass("expanded") !== true ? "fadeOut" : "fadeIn";
            Utils.exec(o.onExpandNode, [node, element]);
        }

        node.children("ul")[func](o.duration);
    },

    addTo: function(node, data){
        var that = this, element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {
            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.appendTo(target);

        Utils.exec(o.onNodeInsert, [new_node, element]);

        return new_node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node, element]);
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node, element]);
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('treeview', Treeview);

// Source: js/plugins/validator.js
var ValidatorFuncs = {
    required: function(val){
        return Utils.isValue(val.trim());
    },
    length: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length === parseInt(len);
    },
    minlength: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length >= parseInt(len);
    },
    maxlength: function(val, len){
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length <= parseInt(len);
    },
    min: function(val, min_value){
        if (!Utils.isValue(min_value) || isNaN(min_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) >= Number(min_value);
    },
    max: function(val, max_value){
        if (!Utils.isValue(max_value) || isNaN(max_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) <= Number(max_value);
    },
    email: function(val){
        return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(val);
    },
    domain: function(val){
        return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val);
    },
    url: function(val){
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(val);
    },
    date: function(val){
        return (new Date(val) !== "Invalid Date" && !isNaN(new Date(val)));
    },
    number: function(val){
        return !isNaN(val);
    },
    integer: function(val){
        return Utils.isInt(val);
    },
    float: function(val){
        return Utils.isFloat(val);
    },
    digits: function(val){
        return /^\d+$/.test(val);
    },
    hexcolor: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },
    color: function(val){
        return Colors.color(val, Colors.PALETTES.STANDARD) !== false;
    },
    pattern: function(val, pat){
        if (!Utils.isValue(pat)) {
            return false;
        }
        var reg = new RegExp(pat);
        return reg.test(val);
    },
    compare: function(val, val2){
        return val === val2;
    },
    not: function(val, not_this){
        return val !== not_this;
    },

    custom: function(val, func){
        if (Utils.isFunc(func) === false) {
            return false;
        }
        return Utils.exec(func, [val]);
    },

    is_control: function(el){
        return el.parent().hasClass("input")
            || el.parent().hasClass("select")
            || el.parent().hasClass("textarea")
            || el.parent().hasClass("checkbox")
            || el.parent().hasClass("switch")
            || el.parent().hasClass("radio")
            ;
    },

    reset_state: function(el){
        var input = Utils.isJQueryObject(el) === false ? $(el) : el ;
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().removeClass("invalid valid");
        } else {
            input.removeClass("invalid valid");
        }
    },

    set_valid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("valid");
        } else {
            input.addClass("valid");
        }
    },

    set_invalid_state: function(input){
        if (Utils.isJQueryObject(input) === false) {
            input = $(input);
        }
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("invalid");
        } else {
            input.addClass("invalid");
        }
    },

    reset: function(form){
        var that = this;
        $.each($(form).find("[data-validate]"), function(){
            that.reset_state(this);
        });

        return this;
    },

    validate: function(el, result, cb_ok, cb_error, required_mode){
        var this_result = true;
        var input = $(el);
        var is_control = ValidatorFuncs.is_control(input);
        var funcs = input.data('validate') !== undefined ? String(input.data('validate')).split(" ").map(function(s){return s.trim();}) : [];
        var errors = [];
        var required = funcs.indexOf('required') !== -1;

        if (funcs.length === 0) {
            return true;
        }

        this.reset_state(input);

        if (input.attr('type') && input.attr('type').toLowerCase() === "checkbox") {
            if (funcs.indexOf('required') === -1) {
                this_result = true;
            } else {
                this_result = input.is(":checked");
            }

            if (this_result === false) {
                errors.push('required');
            }

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else if (input.attr('type') && input.attr('type').toLowerCase() === "radio") {
            if (input.attr('name') === undefined) {
                this_result = true;
            }

            var radio_selector = 'input[name=' + input.attr('name') + ']:checked';
            this_result = $(radio_selector).length > 0;

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else {
            $.each(funcs, function(){
                if (this_result === false) return;
                var rule = this.split("=");
                var f, a;

                f = rule[0]; rule.shift();
                a = rule.join("=");

                if (f === 'compare') {
                    a = input[0].form.elements[a].value;
                }

                if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                    this_result = true;
                } else {
                    if (required_mode === true || f === "required") {
                        this_result = ValidatorFuncs[f](input.val(), a);
                    } else {
                        if (input.val().trim() !== "") {
                            this_result = ValidatorFuncs[f](input.val(), a);
                        } else {
                            this_result = true;
                        }
                    }
                    // this_result = ValidatorFuncs[f](input.val(), a);
                }

                if (this_result === false) {
                    errors.push(f);
                }

                if (result !== undefined) {
                    result.val += this_result ? 0 : 1;
                }
            });
        }

        if (this_result === false) {
            this.set_invalid_state(input);

            if (result !== undefined) {
                result.log.push({
                    input: input[0],
                    name: input.attr("name"),
                    value: input.val(),
                    funcs: funcs,
                    errors: errors
                });
            }

            if (cb_error !== undefined) Utils.exec(cb_error, [input, input.val()], input[0]);

        } else {
            this.set_valid_state(input);

            if (cb_ok !== undefined) Utils.exec(cb_ok, [input, input.val()], input[0]);
        }

        return this_result;
    }
};

Metro['validator'] = ValidatorFuncs;

var Validator = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this._onsubmit = null;
        this._onreset = null;
        this._action = null;
        this.result = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['utils', 'colors'],

    options: {
        submitTimeout: 200,
        interactiveCheck: false,
        clearInvalid: 0,
        requiredMode: true,
        onBeforeSubmit: Metro.noop_true,
        onSubmit: Metro.noop,
        onError: Metro.noop,
        onValidate: Metro.noop,
        onErrorForm: Metro.noop,
        onValidateForm: Metro.noop,
        onValidatorCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var inputs = element.find("[data-validate]");

        this._action = element[0].action;

        element
            .attr("novalidate", 'novalidate')
            .attr("action", "javascript:");

        $.each(inputs, function(){
            var input = $(this);
            var funcs = input.data("validate");
            var required = funcs.indexOf("required") > -1;
            if (required) {
                if (ValidatorFuncs.is_control(input)) {
                    input.parent().addClass("required");
                } else {
                    input.addClass("required");
                }
            }
            if (o.interactiveCheck === true) {
                input.on(Metro.events.inputchange, function () {
                    ValidatorFuncs.validate(this, undefined, undefined, undefined, o.requiredMode);
                });
            }
        });

        this._onsubmit = null;
        this._onreset = null;

        if (element[0].onsubmit !== null) {
            this._onsubmit = element[0].onsubmit;
            element[0].onsubmit = null;
        }

        if (element[0].onreset !== null) {
            this._onreset = element[0].onreset;
            element[0].onreset = null;
        }

        element[0].onsubmit = function(){
            return that._submit();
        };

        element[0].onreset = function(){
            return that._reset();
        };

        Utils.exec(this.options.onValidatorCreate, [element], this.elem);
    },

    _reset: function(){
        ValidatorFuncs.reset(this.element);
        if (this._onsubmit !==  null) Utils.exec(this._onsubmit, null, this.element[0]);
    },

    _submit: function(){
        var that = this, element = this.element, o = this.options;
        var form = this.elem;
        var inputs = element.find("[data-validate]");
        var submit = element.find(":submit").attr('disabled', 'disabled').addClass('disabled');
        var result = {
            val: 0,
            log: []
        };

        $.each(inputs, function(){
            ValidatorFuncs.validate(this, result, o.onValidate, o.onError, o.requiredMode);
        });

        submit.removeAttr("disabled").removeClass("disabled");

        element[0].action = this._action;

        result.val += Utils.exec(o.onBeforeSubmit, [element], this.elem) === false ? 1 : 0;

        if (result.val === 0) {
            Utils.exec(o.onValidateForm, [element], form);
            setTimeout(function(){
                Utils.exec(o.onSubmit, [element], form);
                if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
            }, o.submitTimeout);
        } else {
            Utils.exec(o.onErrorForm, [result.log, element], form);
            if (o.clearInvalid > 0) {
                setTimeout(function(){
                    $.each(inputs, function(){
                        var inp  = $(this);
                        if (ValidatorFuncs.is_control(inp)) {
                            inp.parent().removeClass("invalid");
                        } else {
                            inp.removeClass("invalid");
                        }
                    })
                }, o.clearInvalid);
            }
        }

        return result.val === 0;
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('validator', Validator);

// Source: js/plugins/video.js
var Video = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.fullscreen = false;
        this.preloader = null;
        this.player = null;
        this.video = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;
        this.fullScreenInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        src: null,

        poster: "",
        logo: "",
        logoHeight: 32,
        logoWidth: "auto",
        logoTarget: "",

        volume: .5,
        loop: false,
        autoplay: false,

        fullScreenMode: Metro.fullScreenMode.DESKTOP,
        aspectRatio: Metro.aspectRatio.HD,

        controlsHide: 3000,

        showLoop: true,
        showPlay: true,
        showStop: true,
        showMute: true,
        showFull: true,
        showStream: true,
        showVolume: true,
        showInfo: true,

        loopIcon: "<span class='default-icon-loop'></span>",
        stopIcon: "<span class='default-icon-stop'></span>",
        playIcon: "<span class='default-icon-play'></span>",
        pauseIcon: "<span class='default-icon-pause'></span>",
        muteIcon: "<span class='default-icon-mute'></span>",
        volumeLowIcon: "<span class='default-icon-low-volume'></span>",
        volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
        volumeHighIcon: "<span class='default-icon-high-volume'></span>",
        screenMoreIcon: "<span class='default-icon-enlarge'></span>",
        screenLessIcon: "<span class='default-icon-shrink'></span>",

        onPlay: Metro.noop,
        onPause: Metro.noop,
        onStop: Metro.noop,
        onEnd: Metro.noop,
        onMetadata: Metro.noop,
        onTime: Metro.noop,
        onVideoCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        if (Metro.fullScreenEnabled === false) {
            o.fullScreenMode = Metro.fullScreenMode.WINDOW;
        }

        this._createPlayer();
        this._createControls();
        this._createEvents();
        this._setAspectRatio();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onVideoCreate, [element, this.player]);
    },

    _createPlayer: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player video-player " + element[0].className);
        var preloader = $("<div>").addClass("preloader").appendTo(player);
        var logo = $("<a>").attr("href", o.logoTarget).addClass("logo").appendTo(player);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        if (o.poster !== "") {
            element.attr("poster", o.poster);
        }

        video.volume = o.volume;

        preloader.activity({
            type: "cycle",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        if (o.logo !== "") {
            $("<img>")
                .css({
                    height: o.logoHeight,
                    width: o.logoWidth
                })
                .attr("src", o.logo).appendTo(logo);
        }

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);

        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        streamSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!video.paused) video.pause();
            },
            onStop: function(val){
                if (video.seekable.length > 0) {
                    video.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (video.paused && video.currentTime > 0) {
                    video.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        volumeSlider.slider({
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                video.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);
        if (o.showFull === true) full = $("<button>").attr("type", "button").addClass("button square full").html(o.screenMoreIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = video.volume;
            that.volume.data('slider').val(0);
            video.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = video.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [video, player]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(video.currentTime * 100 / that.duration);
            that._setInfo(video.currentTime, that.duration);
            that.stream.data('slider').val(position);
            Utils.exec(o.onTime, [video.currentTime, that.duration, video, player]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [video, player]);
            that._onMouse();
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [video, player]);
            that._offMouse();
        });

        element.on("stop", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onStop, [video, player]);
            that._offMouse();
        });

        element.on("ended", function(){
            that.stream.data('slider').val(0);
            Utils.exec(o.onEnd, [video, player]);
            that._offMouse();
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(e){
            if (video.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(e){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(e){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });

        player.on(Metro.events.click, ".full", function(e){
            that.fullscreen = !that.fullscreen;
            player.find(".full").html(that.fullscreen === true ? o.screenLessIcon : o.screenMoreIcon);
            if (o.fullScreenMode === Metro.fullScreenMode.WINDOW) {
                if (that.fullscreen === true) {
                    player.addClass("full-screen");
                } else {
                    player.removeClass("full-screen");
                }
            } else {
                if (that.fullscreen === true) {

                    Metro.requestFullScreen(video);

                    if (that.fullScreenInterval === false) that.fullScreenInterval = setInterval(function(){
                        if (Metro.inFullScreen() === false) {
                            that.fullscreen = false;
                            clearInterval(that.fullScreenInterval);
                            that.fullScreenInterval = false;
                            player.find(".full").html(o.screenMoreIcon);
                        }

                    }, 1000);
                } else {
                    Metro.exitFullScreen();
                }
            }

            if (that.fullscreen === true) {
                $(document).on(Metro.events.keyup + "_video", function(e){
                    if (e.keyCode === 27) {
                        player.find(".full").click();
                    }
                });
            } else {
                $(document).off(Metro.events.keyup + "_video");
            }
        });

        $(window).resize(function(){
            that._setAspectRatio();
        });
    },

    _onMouse: function(){
        var player = this.player, o = this.options;

        if (o.controlsHide > 0) {
            player.on(Metro.events.enter, function(){
                player.find(".controls").fadeIn();
            });

            player.on(Metro.events.leave, function(){
                setTimeout(function(){
                    player.find(".controls").fadeOut();
                }, o.controlsHide);
            });
        }
    },

    _offMouse: function(){
        this.player.off(Metro.events.enter);
        this.player.off(Metro.events.leave);
        this.player.find(".controls").fadeIn();
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.video.volume = this.volumeBackup;
            this.volume.data('slider').val(this.volumeBackup * 100);
        } else {
            this.volumeBackup = this.video.volume;
            this.volume.data('slider').val(0);
            this.video.volume = 0;
        }
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.video.buffered.length ? Math.round(Math.floor(this.video.buffered.end(0)) / Math.floor(this.video.duration) * 100) : 0;
        this.stream.data('slider').buff(buffer);
    },

    _setVolume: function(){
        var video = this.video, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = video.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    _setAspectRatio: function(){
        var player = this.player, o = this.options;
        var width = player.outerWidth();
        var height;

        switch (o.aspectRatio) {
            case Metro.aspectRatio.SD: height = Utils.aspectRatioH(width, "4/3"); break;
            case Metro.aspectRatio.CINEMA: height = Utils.aspectRatioH(width, "21/9"); break;
            default: height = Utils.aspectRatioH(width, "16/9");
        }

        player.outerHeight(height);
    },

    aspectRatio: function(ratio){
        this.options.aspectRatio = ratio;
        this._setAspectRatio();
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.video.play();
    },

    pause: function(){
        this.video.pause();
    },

    resume: function(){
        if (this.video.paused) {
            this.play();
        }
    },

    stop: function(){
        this.video.pause();
        this.video.currentTime = 0;
        this.stream.data('slider').val(0);
        this._offMouse();
    },

    volume: function(v){
        if (v === undefined) {
            return this.video.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.video.volume = v;
        this.volume.data('slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeAspectRatio: function(){
        this.options.aspectRatio = this.element.attr("data-aspect-ratio");
        this._setAspectRatio();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-aspect-ratio": this.changeAspectRatio(); break;
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    }
};

Metro.plugin('video', Video);

// Source: js/plugins/window.js
var Window = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.win = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onWindowCreate, [this.win, this.element]);

        return this;
    },

    dependencies: ['draggable', 'resizeable'],

    options: {
        width: "auto",
        height: "auto",
        btnClose: true,
        btnMin: true,
        btnMax: true,
        clsCaption: "",
        clsContent: "",
        clsWindow: "",
        draggable: true,
        dragElement: ".window-caption",
        dragArea: "parent",
        shadow: false,
        icon: "",
        title: "Window",
        content: "default",
        resizable: true,
        overlay: false,
        overlayColor: 'transparent',
        overlayAlpha: .5,
        modal: false,
        position: "absolute",
        checkEmbed: true,
        top: "auto",
        left: "auto",
        place: "auto",
        closeAction: Metro.actions.REMOVE,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onCaptionDblClick: Metro.noop,
        onCloseClick: Metro.noop,
        onMaxClick: Metro.noop,
        onMinClick: Metro.noop,
        onResizeStart: Metro.noop,
        onResizeStop: Metro.noop,
        onResize: Metro.noop,
        onWindowCreate: Metro.noop,
        onShow: Metro.noop,
        onWindowDestroy: Metro.noop,
        onCanClose: Metro.noop_true,
        onClose: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var win, overlay;
        var prev = element.prev();
        var parent = element.parent();

        if (o.modal === true) {
            o.btnMax = false;
            o.btnMin = false;
            o.resizable = false;
        }

        if (o.content === "default") {
            o.content = element;
        }

        win = this._window(o);

        if (prev.length === 0) {
            parent.prepend(win);
        } else {
            win.insertAfter(prev);
        }
        if (o.overlay === true) {
            overlay = this._overlay();
            overlay.appendTo(win.parent());
            this.overlay = overlay;
        }

        Utils.exec(o.onShow, [win]);

        this.win = win;
    },

    _window: function(o){
        var that = this;
        var win, caption, content, icon, title, buttons, btnClose, btnMin, btnMax, resizer, status;

        win = $("<div>").addClass("window");
        win.css({
            width: o.width,
            height: o.height,
            position: o.position,
            top: o.top,
            left: o.left
        });

        if (o.modal === true) {
            win.addClass("modal");
        }

        caption = $("<div>").addClass("window-caption");
        content = $("<div>").addClass("window-content");

        win.append(caption);
        win.append(content);

        if (o.status === true) {
            status = $("<div>").addClass("window-status");
            win.append(status);
        }

        if (o.shadow === true) {
            win.addClass("win-shadow");
        }

        if (o.icon !== undefined) {
            icon = $("<span>").addClass("icon").html(o.icon);
            icon.appendTo(caption);
        }

        if (o.title !== undefined) {
            title = $("<span>").addClass("title").html(o.title);
            title.appendTo(caption);
        }

        if (o.content !== undefined && o.content !== 'original') {

            if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
                o.content = Utils.embedUrl(o.content);
            }

            if (!Utils.isJQueryObject(o.content) && Utils.isFunc(o.content)) {
                o.content = Utils.exec(o.content);
            }

            if (Utils.isJQueryObject(o.content)) {
                o.content.appendTo(content);
            } else {
                content.html(o.content);
            }
        }

        if (o.btnClose === true || o.btnMin === true || o.btnMax === true) {
            buttons = $("<div>").addClass("buttons");
            buttons.appendTo(caption);

            if (o.btnMax === true) {
                btnMax = $("<span>").addClass("btn-max");
                btnMax.appendTo(buttons);
            }

            if (o.btnMin === true) {
                btnMin = $("<span>").addClass("btn-min");
                btnMin.appendTo(buttons);
            }

            if (o.btnClose === true) {
                btnClose = $("<span>").addClass("btn-close");
                btnClose.appendTo(buttons);
            }
        }

        win.attr("id", o.id === undefined ? Utils.elementId("window") : o.id);

        if (o.resizable === true) {
            resizer = $("<span>").addClass("resize-element");
            resizer.appendTo(win);
            win.addClass("resizable");
        }

        win.on(Metro.events.dblclick, ".window-caption", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-max", function(e){
            that.maximized(e);
        });
        win.on(Metro.events.click, ".btn-min", function(e){
            that.minimized(e);
        });
        win.on(Metro.events.click, ".btn-close", function(e){
            that.close(e);
        });

        if (o.resizable === true) {
            win.resizable({
                resizeElement: ".resize-element",
                onResizeStart: o.onResizeStart,
                onResizeStop: o.onResizeStop,
                onResize: o.onResize
            });
        }

        if (o.draggable === true) {
            win.draggable({
                dragElement: o.dragElement,
                dragArea: o.dragArea,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            })
        }


        if (o.place !== 'auto') {
            win.addClass("pos-" + o.place);
        }

        win.addClass(o.clsWindow);
        caption.addClass(o.clsCaption);
        content.addClass(o.clsContent);

        return win;
    },

    _overlay: function(){
        var that = this, win = this.win,  element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay");

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    maximized: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var target = $(e.currentTarget);
        win.toggleClass("maximized");
        if (target.hasClass("window-caption")) {
            Utils.exec(o.onCaptionDblClick, [win]);
        } else {
            Utils.exec(o.onMaxClick, [win]);
        }
    },

    minimized: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        win.toggleClass("minimized");
        Utils.exec(o.onMinClick, [win], element[0]);
    },

    close: function(e){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var timer = null;

        if (Utils.exec(o.onCanClose, [win]) === false) {
            return false;
        }

        var timeout = 0;

        if (o.onClose !== Metro.noop) {
            timeout = 500;
        }

        Utils.exec(o.onClose, [win], element[0]);

        timer = setTimeout(function(){
            timer = null;
            if (o.modal === true) {
                win.siblings(".overlay").remove();
            }
            Utils.exec(o.onCloseClick, [win], element[0]);
            Utils.exec(o.onWindowDestroy, [win], element[0]);
            if (o.closeAction === Metro.actions.REMOVE) {
                win.remove();
            } else {
                that.hide();
            }

        }, timeout);
    },

    hide: function(){
        this.win.addClass("no-visible");
    },
    show: function(){
        this.win.removeClass("no-visible");
    },
    toggle: function(){
        if (this.win.hasClass("no-visible")) {
            this.show();
        } else {
            this.hide();
        }
    },
    isOpen: function(){
        return this.win.hasClass("no-visible");
    },
    min: function(a){
        a ? this.win.addClass("minimized") : this.win.removeClass("minimized");
    },
    max: function(a){
        a ? this.win.addClass("maximized") : this.win.removeClass("maximized");
    },

    toggleButtons: function(a) {
        var that = this, element = this.element, win = this.win, o = this.options;
        var btnClose = win.find(".btn-close");
        var btnMin = win.find(".btn-min");
        var btnMax = win.find(".btn-max");

        if (a === "data-btn-close") {
            btnClose.toggle();
        }
        if (a === "data-btn-min") {
            btnMin.toggle();
        }
        if (a === "data-btn-max") {
            btnMax.toggle();
        }
    },

    changeSize: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        if (a === "data-width") {
            win.css("width", element.data("width"));
        }
        if (a === "data-height") {
            win.css("height", element.data("height"));
        }
    },

    changeClass: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        if (a === "data-cls-window") {
            win[0].className = "window " + (o.resizable ? " resizeable " : " ") + element.attr("data-cls-window");
        }
        if (a === "data-cls-caption") {
            win.find(".window-caption")[0].className = "window-caption " + element.attr("data-cls-caption");
        }
        if (a === "data-cls-content") {
            win.find(".window-content")[0].className = "window-content " + element.attr("data-cls-content");
        }
    },

    toggleShadow: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-shadow"));
        if (flag === true) {
            win.addClass("win-shadow");
        } else {
            win.removeClass("win-shadow");
        }
    },

    setContent: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var content = element.attr("data-content");
        var result;

        if (!Utils.isJQueryObject(content) && Utils.isFunc(content)) {
            result = Utils.exec(content);
        } else if (Utils.isJQueryObject(content)) {
            result = content.html();
        } else {
            result = content;
        }

        win.find(".window-content").html(result);
    },

    setTitle: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var title = element.attr("data-title");
        win.find(".window-caption .title").html(title);
    },

    setIcon: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var icon = element.attr("data-icon");
        win.find(".window-caption .icon").html(icon);
    },

    getIcon: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        return win.find(".window-caption .icon").html();
    },

    getTitle: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        return win.find(".window-caption .title").html();
    },

    toggleDraggable: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-draggable"));
        var drag = win.data("draggable");
        if (flag === true) {
            drag.on();
        } else {
            drag.off();
        }
    },

    toggleResizable: function(){
        var that = this, element = this.element, win = this.win, o = this.options;
        var flag = JSON.parse(element.attr("data-resizable"));
        var resize = win.data("resizable");
        if (flag === true) {
            resize.on();
            win.find(".resize-element").removeClass("resize-element-disabled");
        } else {
            resize.off();
            win.find(".resize-element").addClass("resize-element-disabled");
        }
    },

    changeTopLeft: function(a){
        var that = this, element = this.element, win = this.win, o = this.options;
        var pos;
        if (a === "data-top") {
            pos = parseInt(element.attr("data-top"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("top", pos);
        }
        if (a === "data-left") {
            pos = parseInt(element.attr("data-left"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("left", pos);
        }
    },

    changePlace: function (a) {
        var that = this, element = this.element, win = this.win, o = this.options;
        var place = element.attr("data-place");
        win.addClass(place);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-btn-close":
            case "data-btn-min":
            case "data-btn-max": this.toggleButtons(attributeName); break;
            case "data-width":
            case "data-height": this.changeSize(attributeName); break;
            case "data-cls-window":
            case "data-cls-caption":
            case "data-cls-content": this.changeClass(attributeName); break;
            case "data-shadow": this.toggleShadow(); break;
            case "data-icon": this.setIcon(); break;
            case "data-title": this.setTitle(); break;
            case "data-content": this.setContent(); break;
            case "data-draggable": this.toggleDraggable(); break;
            case "data-resizable": this.toggleResizable(); break;
            case "data-top":
            case "data-left": this.changeTopLeft(attributeName); break;
            case "data-place": this.changePlace(); break;
        }
    }
};

Metro.plugin('window', Window);

Metro['window'] = {

    isWindow: function(el){
        return Utils.isMetroObject(el, "window");
    },

    min: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.min(a);
    },

    max: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.max(a);
    },

    show: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.show();
    },

    hide: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.hide();
    },

    toggle: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.toggle();
    },

    isOpen: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        return win.isOpen();
    },

    close: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = $(el).data("window");
        win.close();
    },

    create: function(options){
        var w;

        w = $("<div>").appendTo($("body"));

        var w_options = $.extend({}, {
        }, (options !== undefined ? options : {}));

        return w.window(w_options);
    }
};

// Source: js/plugins/wizard.js
var Wizard = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        start: 1,
        finish: 0,
        iconHelp: "<span class='default-icon-help'></span>",
        iconPrev: "<span class='default-icon-left-arrow'></span>",
        iconNext: "<span class='default-icon-right-arrow'></span>",
        iconFinish: "<span class='default-icon-check'></span>",

        buttonMode: "cycle", // default, cycle, square
        buttonOutline: true,

        clsWizard: "",
        clsActions: "",
        clsHelp: "",
        clsPrev: "",
        clsNext: "",
        clsFinish: "",

        onPage: Metro.noop,
        onHelpClick: Metro.noop,
        onPrevClick: Metro.noop,
        onNextClick: Metro.noop,
        onFinishClick: Metro.noop,
        onBeforePrev: Metro.noop_true,
        onBeforeNext: Metro.noop_true,
        onWizardCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createWizard();
        this._createEvents();

        Utils.exec(o.onWizardCreate, [element]);
    },

    _createWizard: function(){
        var that = this, element = this.element, o = this.options;
        var bar;

        element.addClass("wizard").addClass(o.view).addClass(o.clsWizard);

        bar = $("<div>").addClass("action-bar").addClass(o.clsActions).appendTo(element);

        var buttonMode = o.buttonMode === "button" ? "" : o.buttonMode;
        if (o.buttonOutline === true) {
            buttonMode += " outline";
        }

        if (o.iconHelp !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-help").addClass(buttonMode).addClass(o.clsHelp).html(Utils.isTag(o.iconHelp) ? o.iconHelp : $("<img>").attr('src', o.iconHelp)).appendTo(bar);
        if (o.iconPrev !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-prev").addClass(buttonMode).addClass(o.clsPrev).html(Utils.isTag(o.iconPrev) ? o.iconPrev : $("<img>").attr('src', o.iconPrev)).appendTo(bar);
        if (o.iconNext !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-next").addClass(buttonMode).addClass(o.clsNext).html(Utils.isTag(o.iconNext) ? o.iconNext : $("<img>").attr('src', o.iconNext)).appendTo(bar);
        if (o.iconFinish !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-finish").addClass(buttonMode).addClass(o.clsFinish).html(Utils.isTag(o.iconFinish) ? o.iconFinish : $("<img>").attr('src', o.iconFinish)).appendTo(bar);

        this.toPage(o.start);

        this._setHeight();
    },

    _setHeight: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var max_height = 0;

        pages.children(".page-content").css("max-height", "none");

        $.each(pages, function(){
            var h = $(this).height();
            if (max_height < parseInt(h)) {
                max_height = h;
            }
        });

        element.height(max_height);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".wizard-btn-help", function(){
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onHelpClick, [that.current, page, element])
        });

        element.on(Metro.events.click, ".wizard-btn-prev", function(){
            that.prev();
            Utils.exec(o.onPrevClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-next", function(){
            that.next();
            Utils.exec(o.onNextClick, [that.current, element])
        });

        element.on(Metro.events.click, ".wizard-btn-finish", function(){
            Utils.exec(o.onFinishClick, [that.current, element])
        });

        element.on(Metro.events.click, ".complete", function(){
            var index = $(this).index() + 1;
            that.toPage(index);
        });

        $(window).on(Metro.events.resize, function(){
            that._setHeight();
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var page = $(element.children("section").get(this.current - 1));

        if (this.current + 1 > pages.length || Utils.exec(o.onBeforeNext, [this.current, page, element]) === false) {
            return ;
        }

        this.current++;

        this.toPage(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var page = $(element.children("section").get(this.current - 1));

        if (this.current - 1 === 0 || Utils.exec(o.onBeforePrev, [this.current, page, element]) === false) {
            return ;
        }

        this.current--;

        this.toPage(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toPage(element.children("section").length);
    },

    first: function(){
        this.toPage(1);
    },

    toPage: function(page){
        var that = this, element = this.element, o = this.options;
        var target = $(element.children("section").get(page - 1));
        var sections = element.children("section");
        var actions = element.find(".action-bar");

        if (target.length === 0) {
            return ;
        }

        var finish = element.find(".wizard-btn-finish").addClass("disabled");
        var next = element.find(".wizard-btn-next").addClass("disabled");
        var prev = element.find(".wizard-btn-prev").addClass("disabled");

        this.current = page;

        element.children("section")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        var border_size = element.children("section.complete").length === 0 ? 0 : parseInt(Utils.getStyleOne(element.children("section.complete")[0], "border-left-width"));

        actions.animate({
            left: element.children("section.complete").length * border_size + 41
        });

        if (
            (this.current === sections.length) || (o.finish > 0 && this.current >= o.finish)
        ) {
            finish.removeClass("disabled");
        }

        if (this.current < sections.length) {
            next.removeClass("disabled");
        }

        if (this.current > 1) {
            prev.removeClass("disabled");
        }

        element.trigger("onpage", [this.current, target, element]);
        Utils.exec(o.onPage, [this.current, target, element]);
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('wizard', Wizard);

return METRO_INIT === true ? Metro.init() : Metro;

}));





$(document).ready(function () {
    $('#news-demo').slippry({
        // general elements & wrapper
        slippryWrapper: '<div class="sy-box news-slider" />', // wrapper to wrap everything, including pager
        elements: 'article', // elments cointaining slide content

        // options
        adaptiveHeight: false, // height of the sliders adapts to current
        captions: false,

        // pager
        pagerClass: 'news-pager',

        // transitions
        transition: 'horizontal', // fade, horizontal, kenburns, false
        speed: 1200,
        pause: 8000,

        // slideshow
        autoDirection: 'prev'
    });



});


$("#image-collection-btn").click(() => {

    if($("#image-collection").html().trim()==''){

        $("#image-collection-btn").html('بستن');
        $("#image-collection").css('display','block')
        $("#image-collection-search").css('display','block')
        imageCollectionAjax()

    }else{
        $("#image-collection-btn").html('کلکسیون عکس');
        $("#image-collection").html("")
        $("#image-collection").css('display','none')
        $("#image-collection-search").css('display','none')
    }


});

function searchImage(){
    imageCollectionAjax()
}

function imageCollectionAjax(){
    $.ajax({
        method  : "GET",
        url     : siteURL+"/user/images",
        data    : {name:$("#image-collection-search").val()},
        success : (data)=>{
            // $("#image-collection").html(data)
            let innerHTML="<div class='row'>"
            data.forEach((image)=>{
                innerHTML+=`<div class='col-md-3'>
                                <div class=thumbnail>
                                    <a href='${siteURL+'/'+image.path}'>
                                        <img src='${siteURL+'/'+image.path}' alt='Lights' style='width:100%'>
                                    </a>
                                    <div class='caption'>
                                        <h5 class='card-title'>${image.name}</h5>
                                        <input  type='hidden' value="<br><img class='article-image' src='${siteURL+'/'+image.path}'>">
                                        <button class='btn btn-info' id='image-collection-btn-copy' onclick='copyUrl(this)' >کپی کد تصویر</button>
                                    </div>
                                </div>
                            </div>`
            })
            $("#image-collection").html(innerHTML)
        },
        dataType:"json"
    })
}
function copyUrl(elem) {
    copyToClipboard($(elem).siblings('input[type=hidden]').first())
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
}
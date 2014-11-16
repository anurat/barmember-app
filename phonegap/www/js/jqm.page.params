/*/// jqm.page.params.js - version 0.1
// Copyright (c) 2011, Kin Blas
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
// * Neither the name of the <organization> nor the
// names of its contributors may be used to endorse or promote products
// derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function( $, window, undefined ) {

// Given a query string, convert all the name/value pairs
// into a property/value object. If a name appears more than
// once in a query string, the value is automatically turned
// into an array.
function queryStringToObject( qstr )
{
var result = {},
nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
i, pair, n, v;

for ( i = 0; i < nvPairs.length; i++ ) {
var pstr = nvPairs[ i ];
if ( pstr ) {
pair = pstr.split( /=/ );
n = pair[ 0 ];
v = pair[ 1 ];
if ( result[ n ] === undefined ) {
result[ n ] = v;
} else {
if ( typeof result[ n ] !== "object" ) {
result[ n ] = [ result[ n ] ];
}
result[ n ].push( v );
}
}
}

return result;
}

// The idea here is to listen for any pagebeforechange notifications from
// jQuery Mobile, and then muck with the toPage and options so that query
// params can be passed to embedded/internal pages. So for example, if a
// changePage() request for a URL like:
//
// http://mycompany.com/myapp/#page-1?foo=1&bar=2
//
// is made, the page that will actually get shown is:
//
// http://mycompany.com/myapp/#page-1
//
// The browser's location will still be updated to show the original URL.
// The query params for the embedded page are also added as a property/value
// object on the options object. You can access it from your page notifications
// via data.options.pageData.
$( document ).bind( "pagebeforechange", function( e, data ) {

// We only want to handle the case where we are being asked
// to go to a page by URL, and only if that URL is referring
// to an internal page by id.

if ( typeof data.toPage === "string" ) {
var u = $.mobile.path.parseUrl( data.toPage );
if ( $.mobile.path.isEmbeddedPage( u ) ) {

// The request is for an internal page, if the hash
// contains query (search) params, strip them off the
// toPage URL and then set options.dataUrl appropriately
// so the location.hash shows the originally requested URL
// that hash the query params in the hash.

var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
if ( u2.search ) {
if ( !data.options.dataUrl ) {
data.options.dataUrl = data.toPage;
}
data.options.pageData = queryStringToObject( u2.search );
data.toPage = u.hrefNoHash + "#" + u2.pathname;
}
}
}
});

})( jQuery, window );*/
$.mobile.paramsHandler = {
    _pagesWithParams: [],

    addPage: function (id, requiredParams, optionalParams, callback) {
        var page = new PageWithParams(id, requiredParams, optionalParams, callback);
        this._pagesWithParams.push(page);
    },

    init: function () {
        $(document).on("pagebeforechange", function (e, data) {
            if (typeof data.toPage !== "string") {
                return;
            }

            var u = $.mobile.path.parseUrl(data.toPage);

            var pageMatch = null;
            var pages = $.mobile.paramsHandler._pagesWithParams;

            for (var i in pages) {

                var page = pages[i];
                var re = "^#" + page.id + "(\\?|$)";

                if (u.hash.search(re) !== -1) {
                    pageMatch = page;
                }
            }

            var vm;
            if (!pageMatch) {
                return;
            }

            // TODO: add default functionality for if there's a parameter missing
            var urlVars = getUrlVars(u.hash);
            if (urlVars == null) {
                return;
            }

            for (var j in pageMatch.requiredParams) {
                if (urlVars[j]) {
                    pageMatch.requiredParams[j] = urlVars[j];
                } else {
                    return;
                }
            }

            for (var k in pageMatch.optionalParams) {
                if (urlVars[k]) {
                    pageMatch.optionalParams[k] = urlVars[k];
                }
            }

            pageMatch.callback(urlVars);

            pageMatch.reset();

            $(":mobile-pagecontainer").pagecontainer("change", "#" + pageMatch.id, data.options);

            window.history.replaceState(null, null, u.href);

            e.preventDefault();
        });
    }
};

function PageWithParams(id, requiredParams, optionalParams, callback) {
    var self = this;

    self.id = id;
    self.callback = callback;
    self.requiredParams = [];
    self.optionalParams = [];

    self.reset = function () {
        var i;
        for (i in requiredParams) {
            self.requiredParams[requiredParams[i]] = null;;
        }
        for (i in optionalParams) {
            self.optionalParams[optionalParams[i]] = null;
        }
    };
    self.reset();
}

function getUrlVars(url) {
    var vars = [];
    if (url.indexOf('?') == -1) {
        return null;
    }
    var queryUrl = url.slice(url.lastIndexOf('?') + 1);
    var hashes = queryUrl.split('&');
    for (var i = 0; i < hashes.length; i++) {
        url = hashes[i].split('=');
        vars[url[0]] = url[1];
    }
    return vars;
}
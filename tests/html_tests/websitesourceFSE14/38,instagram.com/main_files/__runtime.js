!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function CommonJSEvaluator(){this.definedModules={};this.evaluatedModules={};this.require=this.require.bind(this)}CommonJSEvaluator.prototype.require=function(absoluteModuleFilename){if(!this.canLoadModule(absoluteModuleFilename)){throw new Error("Module "+absoluteModuleFilename+" has not been defined yet!")}if(!this.evaluatedModules[absoluteModuleFilename]){var module={exports:{}};this.evaluatedModules[absoluteModuleFilename]=module;this.definedModules[absoluteModuleFilename].call(window,this.require,module.exports,module);delete this.definedModules[absoluteModuleFilename]}return this.evaluatedModules[absoluteModuleFilename].exports};CommonJSEvaluator.prototype.define=function(absoluteModuleFilename,func){if(this.evaluatedModules[absoluteModuleFilename]){return}this.definedModules[absoluteModuleFilename]=func};CommonJSEvaluator.prototype.canLoadModule=function(absoluteModuleFilename){return!!this.evaluatedModules[absoluteModuleFilename]||!!this.definedModules[absoluteModuleFilename]};module.exports={CommonJSEvaluator:CommonJSEvaluator}},{}],2:[function(require,module,exports){function reverseBundleMap(bundleMap){var reverseBundleMap={};for(var bundleName in bundleMap){for(var moduleName in bundleMap[bundleName]){reverseBundleMap[moduleName]=bundleName}}return reverseBundleMap}function CommonJSFetcher(evaluator,dependencyGraph,bundleMap,fetchBundles){this.evaluator=evaluator;this.dependencyGraph=dependencyGraph;this.reverseBundleMap=reverseBundleMap(bundleMap);this.fetchBundles=fetchBundles;this.logFetches=false}CommonJSFetcher.prototype.enableLogging=function(){this.logFetches=true};CommonJSFetcher.prototype._flattenDependencies=function(accumulator,visited,absoluteModuleFilename){if(visited[absoluteModuleFilename]){return}accumulator[absoluteModuleFilename]=true;visited[absoluteModuleFilename]=true;for(var key in this.dependencyGraph[absoluteModuleFilename]){this._flattenDependencies(accumulator,visited,key)}};CommonJSFetcher.prototype.fetchAndRequire=function(absoluteModuleFilename,cb){if(this.evaluator.canLoadModule(absoluteModuleFilename)){cb(this.evaluator.require(absoluteModuleFilename))}var flattenedDependencies={};this._flattenDependencies(flattenedDependencies,{},absoluteModuleFilename);var bundlesToFetch={};for(var dependency in flattenedDependencies){if(!this.evaluator.canLoadModule(dependency)){var bundleToFetch=this.reverseBundleMap[dependency];if(!bundleToFetch){throw new Error("could not find bundle for "+dependency)}if(this.logFetches){if(!bundlesToFetch[bundleToFetch]){console.log("MODULE LOADER:",dependency,"triggered",bundleToFetch)}}bundlesToFetch[bundleToFetch]=true}}this.fetchBundles(bundlesToFetch,function(){cb(this.evaluator.require(absoluteModuleFilename))}.bind(this))};module.exports={CommonJSFetcher:CommonJSFetcher}},{}],3:[function(require,module,exports){var evaluator=require("./evaluator");var fetcher=require("./fetcher");function loadScripts(urlsToFetch,cb){var remaining=urlsToFetch.length;function loadedCallback(){if(--remaining===0){cb()}}urlsToFetch.map(function(url){$.getScript(url).done(loadedCallback).fail(function(xhr,settings,err){console.error(err)})})}function init(bundleRoot,cfg){if(!bundleRoot.lastIndexOf("/")===bundleRoot.length-1){bundleRoot+="/"}var e=new evaluator.CommonJSEvaluator;var f=new fetcher.CommonJSFetcher(e,cfg.dependencyGraph,cfg.bundleMap,function(bundlesToFetch,cb){var urlsToFetch=[];for(var key in bundlesToFetch){urlsToFetch.push(bundleRoot+key+".js")}loadScripts(urlsToFetch,cb)});window.commonjsBundler.evaluator=e;window.commonjsBundler.fetcher=f}window.commonjsBundler={init:init}},{"./evaluator":1,"./fetcher":2}]},{},[3]);
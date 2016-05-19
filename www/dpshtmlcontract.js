/*
*  Copyright 2016 Adobe Systems Incorporated. All rights reserved.
*  This file is licensed to you under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License. You may obtain a copy
*  of the License at http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software distributed under
*  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
*  OF ANY KIND, either express or implied. See the License for the specific language
*  governing permissions and limitations under the License.
*
*/

function DPSHtmlContract() {}

DPSHtmlContract.prototype.handleClickScheme = function(data) {
    cordova.exec(function(){}, function(){}, "DPSHtmlContract", "handleClickScheme", [data]);
};

DPSHtmlContract.prototype.toggleNavigationUI = function() {
               console.log("getInfo");
    cordova.exec(function(){}, function(){}, "DPSHtmlContract", "toggleNavigationUI", []);
};

DPSHtmlContract.prototype.unhandledTap = function(currentElement) {
 
    var parentElement = currentElement.parentElement;
    var elementTagName = currentElement.tagName;
    var parentElementTagName = parentElement ? parentElement.tagName : "";
    var elementAttributes = {};
    var i;
    for (i = 0; i < currentElement.attributes.length; i++) {
        elementAttributes[currentElement.attributes[i].name] = currentElement.attributes[i].value;
    };

	var tapData = encodeURIComponent(JSON.stringify({event:{type:"unhandledTap",elementTagName:elementTagName,parentElementTagName:parentElementTagName,elementAttributes:elementAttributes,navigationDisabled:this.navigationDisabledForElement(currentElement), viewerNavigation:adobeDPSHTMLNative.isViewerNavigationEnabled(), relinquishingGesture:adobeDPSHTMLNative.relinquishingGesture}}))
			   
    cordova.exec(function(){}, function(){}, "DPSHtmlContract", "unhandledTap", [tapData]);
};
			   
DPSHtmlContract.prototype.getTouchedElementAt = function(x, y, outerWidth) {
	var scaleFactor = outerWidth/window.innerWidth;
	var currentElement = document.elementFromPoint(x/scaleFactor, y/scaleFactor);
	var parentElement = currentElement.parentElement;
	var elementTagName = currentElement.tagName;
	var parentElementTagName = parentElement ? parentElement.tagName : "";
	var elementAttributes = {};
	var i;
	for (i = 0; i < currentElement.attributes.length; i++) {
		elementAttributes[currentElement.attributes[i].name] = currentElement.attributes[i].value;
	};
 
	return JSON.stringify({event:{elementTagName:elementTagName,parentElementTagName:parentElementTagName,elementAttributes:elementAttributes, navigationDisabled:this.navigationDisabledForElement(currentElement), viewerNavigation:adobeDPSHTMLNative.isViewerNavigationEnabled()}});
};

DPSHtmlContract.prototype.navigationDisabledForElement = function(element)
{
	var isDisabled = element.disableViewerNavigation ? true: false;
	var parent = element.parentElement;
	while(parent != undefined && !isDisabled)
	{
		isDisabled = parent.disableViewerNavigation ? true: false;
		parent = parent.parentElement;
	}
	return isDisabled;
};

DPSHtmlContract.prototype.advanceContractPropForElementAtPoint = function(x, y, outerWidth)
{
	var scaleFactor = outerWidth/window.innerWidth;
	//adobeLogging.logMessage("2.Scale factor is " + scaleFactor);
	var currentElement = document.elementFromPoint(x/scaleFactor, y/scaleFactor);
	return JSON.stringify({event:{navigationDisabled:this.navigationDisabledForElement(currentElement), viewerNavigation:adobeDPSHTMLNative.isViewerNavigationEnabled(), relinquishingGesture:adobeDPSHTMLNative.relinquishingGesture}});
};


module.exports = new DPSHtmlContract();

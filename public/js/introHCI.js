'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("project/" + idNumber, projectCallBack); 
}


function projectCallBack(result){
	// HTML string
	var projectHTML = '<a href="#" class="thumbnail">' + 
		'<img src="' + result['image'] + 'class="detailsImage">' + 
		'<h3>' + result['title'] + '</h3>' + 
		'<p>' + result['date'] + '</p>' + 
		'<P>' + result['summary'] + '</p>'; 
	// Insert project details into the page using jQuery 
	// Concatenate to get specific division
	// Don't forget the space in front of details i.e .#project .details 
	$("#project" + result['id'] + " .details").html(projectHTML); 
}
// Empty callback function 
function callback(result){
	// Accessed like an array
	var colors = result['colors']["hex"];
	console.log(result);  

	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	$.get('/palette', callback)
}
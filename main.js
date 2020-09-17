function fetchIssues() {
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';
    var issues = getIssues();

    for(var i = 0; i < issues.length; i++) { //searches each issue in the list and assigned the proper variables;
        var id = issues[i].id; // id
        var desc = issues[i].description; // description
        var severity = issues[i].severity; // severity
        var assignedTo = issues[i].assignedTo; // assignedTo
        var status = issues[i].status; // status

        issuesList.innerHTML +=  '<div class="well">' + //creates the list in HTML file from fetched data
                                 '<h6>Issue ID: ' + id +
                                 '<p><span class = "label label-info">' + status + '</span></p>' +
                                 '<h3>' + desc + '</h3>' +
                                 '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' + 
                                 '<span class="glyphicon glyphicon-time"></span> ' + assignedTo + ' ' + '</p>' +
                                 '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>' +
                                 '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>' +
                                 '</div>';
    }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue); //eventhandler for submit event in form

function saveIssue(e) {
    var issueId = chance.guid(); //generate issue ID
    var issueDesc = document.getElementById('issueDescInput').value; // retrieve descINPUT
    var issueSeverity = document.getElementById('issueSeverityInput').value; // retrieve severityINPUT
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value; // retrieve assignedToINPUT
    var issueStatus = 'Open'; //set status to open


    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) { //checks if issueslist has been created
        var issues = []; //sets it to empty array
        issues.push(issue); //saves inputed issue
        localStorage.setItem('issues', JSON.stringify(issues)); // adds inputed issue to local storage
    } else {
        var issues = JSON.parse(localStorage.getItem('issues')); //if issue list is already created, get;
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset(); // resets input fields to empty.

    fetchIssues(); // updates displayed issueslist

    e.preventDefault(); //avoid default submission of the form from being saved.
}


function setStatusClosed(id) { // setting closed status
    var issues = getIssues();

    for(var i=0; i < issues.length; i++) { // loop checks each issue
        if (issues[i].id == id) { // if issue getting checked matches ID given
            issues[i].status = "Closed"; // set the status of the issue to closed.
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues)); // update issuelist in local storage

    fetchIssues(); // update displayed issuelist
}
function deleteIssue(id) {
    var issues = getIssues();

    for(var i = 0; i < issues.length; i++) { //loop checks each issue
        if (issues[i].id == id) { // if checked issue matches ID given
            issues.splice(i, 1); // remove checked issue
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues)); // update local storage data

    fetchIssues(); // update displayed issueList
}


function getIssues() { // function to easily check if array list is Null or not;
    if (localStorage.getItem('issues') === null) { //checks if issues has been created
        var issues = []; //sets it to empty array
    }else{
        var issues = JSON.parse(localStorage.getItem('issues')); //retrieves issues from storage
    }

    return issues;
}
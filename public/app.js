$(document).ready(function(){

    // check the status of the submissiom button,if is set
    $("#create-listing").on("submit", function(event) {
        
        // restricting the refreshing while the posting data
        event.preventDefault();

        // getting the input from the form submittion
        var title = $("#title").val();
        var description = $("#description").val();
        var priority = $("#priority").val();

        const url = "/api/listing/create";
        // preparing a API to submit the buttons
        $.ajax({
            url: url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                title: title,
                description: description,
                priority: priority
            }),
            success: function(res){
                // console.log("Listing successfully: ", res)
                $("form").hide();
                handleGetList();
            },
            error: function(xhr, status, error){
                console.log(error);
            }
        })
    })

    // Handle form submission for updating a task
    $("#update-listing").on("submit", function(event) {
        // Prevent default form submission behavior
        event.preventDefault();
        
        // Invoke the handleUpdateSubmit function
        handleUpdateSubmit();
    });
});

function handleGetList() {
    // getting the details from the DB
    $.ajax({
        url: "/api/listing/get",
        method: "GET",
        contentType: "application/json",
        success: function(data) {
            $("#create-listing").hide();
            $("#update-listing").hide();
            // console.log("Data received: ", data);

            // displaying the data in the div
            const table = $('.get-list');
            data.forEach(task => {
                table.append(`
                    <tr>
                        <th>${task.title}</th>
                        <th>${task.description}</th>
                        <th>${task.priority}</th>
                        <th>
                            <button id="edit" onClick="handleUpdate('${task._id}')" >Edit</button>
                            <button id="delete" onClick="handleDelete('${task._id}')" >Delete</button>
                        </th>
                    </tr>
                `);
            })
        },
        error: function (xhr, status, error){
            console.log(error);
        }
    })
};

function handleUpdate (taskId) {

    //show the update form
    $("#update-listing").show();

    $.ajax({
        url: "/api/listing/get/" + taskId,
        method: "GET",
        contentType: "application/json",
        success: function(response) {
            // console.log(response);

            // get filled with details
            // Set placeholders based on response data
            $("#UpdateTitle").attr("value", response.title);
            $("#UpdateDescription").attr("placeholder", response.description);
            $("#UpdatePriority").attr("value", response.priority);
            $("#taskId").attr("value", taskId)
            
            // hide the other sections
            $(".task-col").hide();
            $(".table-div").hide();
            
        },
        error: function(xhr, status, error){
            console.log(error);
        }
    })
}

function handleDelete (taskId) {
    $.ajax({
        url: "/api/listing/delete/" + taskId,
        method: "DELETE",
        contentType: "application/json",
        success: function (response){
            alert("Task has been deleted");
            window.location.reload();
        },
        error: function(xhr, status, error){
            console.log(error);
        }
    })
}

// Handle form submission
function handleUpdateSubmit () {

        // Getting the input from the form submission
        var title = $("#UpdateTitle").val();
        var description = $("#UpdateDescription").val();
        var priority = $("#UpdatePriority").val();
        var taskId = $("#taskId").val();

        // Prepare API call to update the task
        $.ajax({
            url: "/api/listing/update/" + taskId,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                title: title,
                description: description,
                priority: priority
            }),
            success: function(data) {
                alert("Task updated Successfully!");
                $(".task-col").show();
                $(".table-div").show();
                window.location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
};

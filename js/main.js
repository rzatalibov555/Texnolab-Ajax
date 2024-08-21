
$(document).ready(() => {
    
    //method GET for get all Data from db.json fake server file
    function fetchData(){
        $.ajax({
            url: "http://localhost:5000/users", // API link
            method: "GET",
            success:(data) => {
                let tableContent = `
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.forEach(user => {
                    tableContent += `
                    <tr>
                        <td>${user.id}</td>
                        <td class="left">${user.name}</td>
                        <td class="left">${user.surname}</td>
                        <td><button type="button" class="btn btn-danger ms-2 del" data-id="${user.id}">Delete</button></td>
                    </tr>`; 
                });

                tableContent += `</tbody>
                    </table>`;

                $("#result").html(tableContent)
            }

            
        })
    }

    fetchData()

    //POST method for Create new object from inputs
    function addData(){
        const name = $("#name").val();
        const surname = $("#surname").val();
        const date = new Date();

        const data = {
            name:name,
            surname:surname,
            createAt: date.getHours()+":"+date.getMinutes()+" "+date.toDateString()
        }

        $.ajax({
            url:"http://localhost:5000/users",
            method:"POST",
            data:data,
            success:(response) => {
                $("#name").val("");
                $("#surname").val("");
                fetchData();
                
            },
            error: (error) => {
                console.error("Error sending Data: " +error)
            }
        })
        
    }

    $("#send").click(addData)
    // $("#getData_list").click(fetchData)


    //method DELETE for delete item with id from db.json fake server file
    
    $(document).on('click', '.del', function (){
        const userId = $(this).data("id");
        deleteData(userId)
    })
    
    function deleteData(userId){
        $.ajax({
            url: `http://localhost:5000/users/${userId}`,
            method: "DELETE",
            success: (response) => {
                fetchData()
            },
            error: (error) => {
                console.error("Error deleting user data: " +error)
            }
        })
    }

})

// For activate fake server db.json
// json-server --watch db.json --port 5000
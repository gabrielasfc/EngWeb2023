exports.genPage = function(to_do_tasks, concluded_tasks, task_to_edit, date){
    pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="w3.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <title>Tasks</title>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-deep-purple w3-margin-bottom">
                        <h1 class="w3-center">Tasks</h1>
                    </header>
                    <div class="w3-cell-row">
                        <form action="/insert" class="w3-container w3-cell" method="POST">
                            <h1>Insert Task</h1>
                            <fieldset>
                                <label class="w3-text-grey">Description</label>
                                <input class="w3-input w3-border" type="text" name="description" required/>
                                <br/>
                                <label class="w3-text-grey">Who</label>
                                <input class="w3-input w3-border" type="text" name="who" required/>
                                <br/>
                                <label class="w3-text-grey">Due Date</label>
                                <input class="w3-input w3-border" type="text" name="duedate" required/>
                                <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value="false"/>
                                <button class="w3-btn w3-deep-purple w3-round w3-right w3-margin-top" type="submit">Submit</button>
                            </fieldset>
                        </form>
                    </div>
    `

    if (task_to_edit){
        pagHTML += `
                    <div class="w3-cell-row">
                        <a name="edit"><form class="w3-container w3-cell" method="POST"></a>
                            <h1>Edit Task</h1>
                            <fieldset>
                                <label class="w3-text-grey">Description</label>
                                <input class="w3-input w3-border" type="text" name="description" value="${task_to_edit.description}" required/>
                                <br/>
                                <label class="w3-text-grey">Who</label>
                                <input class="w3-input w3-border" type="text" name="who" value="${task_to_edit.who}" required/>
                                <br/>
                                <label class="w3-text-grey">Due Date</label>
                                <input class="w3-input w3-border" type="text" name="duedate" value="${task_to_edit.duedate}" required/>
                                <input class="w3-input" type="hidden" name="done" value="${task_to_edit.done}"/>
                                <input class="w3-input" type="hidden" name="id" value="${task_to_edit.id}"/>
                                <button class="w3-btn w3-deep-purple w3-round w3-right w3-margin-top" type="submit">Submit</button>
                            </fieldset>
                        </form>
                    </div> 
        `
    }

    pagHTML += `
                    <div class="w3-cell-row">
                        <div class="w3-container w3-cell" style="width:50%">
                            <h1>To Do</h1>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Description</th><th>Who</th><th>Due Date</th><th>Actions</th>
                                </tr>
    `

    for (let task of to_do_tasks){
        pagHTML += `
                                <tr>
                                    <td>${task.description}</td>
                                    <td>${task.who}</td>
                                    <td>${task.duedate}</td>
                                    <td>
                                        <a href="/edit/${task.id}" class="glyphicon glyphicon-pencil w3-margin-right w3-large" style="text-decoration: none; color: #683cb4"/>
                                        <a href="/done/${task.id}" class="glyphicon glyphicon-ok w3-margin-right w3-large" style="text-decoration: none; color: #683cb4"/>      
                                        <a href="/delete/${task.id}" class="glyphicon glyphicon-trash w3-large" style="text-decoration: none; color: #683cb4"/>
                                    </td>
                                </tr>
        `
    }

    pagHTML += `
                            </table>
                        </div>
                        <div class="w3-container w3-cell" style="width:50%">
                            <h1>Done</h1>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Description</th><th>Who</th><th>Due Date</th><th>Actions</th>
                                </tr>
    `

    for (let task of concluded_tasks){
        pagHTML += `
                                <tr>
                                    <td>${task.description}</td>
                                    <td>${task.who}</td>
                                    <td>${task.duedate}</td>
                                    <td>    
                                        <a href="/delete/${task.id}" class="glyphicon glyphicon-trash w3-large" style="text-decoration: none; color: #683cb4"/>
                                    </td>
                                </tr>
        `
    }

    pagHTML += `
                            </table>
                        </div>
                    </div>
                    <footer class="w3-container w3-deep-purple w3-center w3-margin-top">
                        <h5>Generated by EngWeb2023 in ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `


    return pagHTML
}
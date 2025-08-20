const fs = require("fs");
const { Command } = require("commander");    
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0')


program.command('showTasks')
.description('show all existing tasks')
.action((task)=>{
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log('error reading file');
    } else{
        const List = JSON.parse(data)
        if(List["todo-list"].length == 0){
            console.log("No tasks to show");
        } else{
            List["todo-list"].forEach(element => {
                console.log(element.id," ",element.taskName," ",element.taskStatus);
            });
        }
    }
  })
})


program.command('add')
.description('add tasks in todo')
.argument('<task>')
.action((task)=>{
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
      console.log('error reading file');
    } else{
      var List = JSON.parse(data)
    }

    const newTask = {
       id: List["todo-list"].length + 1,
       taskName : task,
       taskStatus : "pending"
    }

    List["todo-list"].push(newTask);
    
    fs.writeFile('todo.json',JSON.stringify(List,null,2),(err)=>{
      if(err){
        console.log("error adding task");
      } else{
        console.log(`Task added : ${task}`);
      }
    })
  })
})




program.command('delete')
.description('delete tasks in todo')
.argument('<task>')
.action((task)=>{
  fs.readFile('todo.json','utf-8',(err,data)=>{
   const List = JSON.parse(data);

   if(List["todo-list"].length == 0){
       console.log("no tasks to delete") 
       return
   }
     
   const taskIndex = List["todo-list"].findIndex((t)=>{
     return t.taskName.toLowerCase() === task.toLowerCase();
   })

   if(taskIndex == -1){
    console.log(`task ${task} not found in TO-DO`);
    return
   }

   List["todo-list"].splice(taskIndex,1);

   List["todo-list"].forEach((tasks,index)=>{
      tasks.id = index + 1;
   })

   fs.writeFile('todo.json',JSON.stringify(List,null,2),(err)=>{
     if(err) console.log("failed deleting task");
     else console.log(`Task ${task} deleted successfully`);
   })
  })
})


program.parse(process.argv);

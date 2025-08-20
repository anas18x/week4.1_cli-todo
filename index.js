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
            console.log("no tasks to show");
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

})




program.command('delete')
.description('delete tasks in todo')
.argument('<task>')
.action((task)=>{

})


program.parse(process.argv);

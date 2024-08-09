import { useEffect, useState } from "react"
import "./Todo.css"

function Todo(){

    const Data = JSON.parse(localStorage.getItem("Set_todo")) || [
      {task:"Buy Car",complete:"true"},
      {task:"Buy Bike",complete:"true"},
      {task:"Buy Iphone",complete:"true"},
    ]

    const [todo,setTodo] = useState("")
    const [myArray,setArray] = useState(Data)

    const [Ctask,setCtask] = useState("")
    const [Rtask,setRtask] = useState("")

    const [tTask,setTtask] = useState("")

   
    function handleForm(e){
        e.preventDefault() 
    }

    function handletodo(e){
        setTodo(e.target.value)
    }

    function handlebtn(){
        if(todo){
            setArray([...myArray,{task:todo,complete:false}])
        }
        setTodo("")  
    }
    
    function handleCheck(index){
        let mynewArray = [...myArray];
        mynewArray[index].complete = !mynewArray[index].complete;

        setArray(mynewArray)

        let completeTask = myArray.filter((value,index)=>{
            return value.complete;
        })

        let remainingTask = myArray.filter((value,index)=>{
            return !value.complete
       })

       let totalTask = myArray.filter((value,index)=>{
            return value.task
        })

        setTtask(totalTask.length)

       setCtask(completeTask.length)
       setRtask(remainingTask.length)
    }

    useEffect(()=>{
        let mynewArray = [...myArray];

        let completeTask = myArray.filter((value,index)=>{
            return value.complete;
        })

        let remainingTask = myArray.filter((value,index)=>{
            return !value.complete
       })

       let totalTask = myArray.filter((value,index)=>{
        return value.task
    })

        setTtask(totalTask.length)

       
       setCtask(completeTask.length)
       setRtask(remainingTask.length)

       localStorage.setItem("Set_todo",JSON.stringify(mynewArray))
   

    },[myArray])
    function handleDelete(index){
     
        let DeleteData = window.confirm("Are You Sure")
        
        if(DeleteData===true){
            let deleteTask = myArray.filter((value,id)=>{
                return id !== index
            })
    
            setArray(deleteTask)
        }
      
    }

    function handleEdit(index){
            let myEdit = [...Data]

        let newValue = myEdit[index]

        let editValue = prompt(`Edit Value:- ${newValue.task}` ,newValue.task)

         if(editValue){
            let newObj = {task:editValue,complete:false}

            myEdit.splice(index,1,newObj)
    
            setArray(myEdit)     
        }
    }
    return(
        <>
            <div className="container">
                <div>
                    <form onSubmit={handleForm}>
                        <h1> My Todo App</h1>
                        <input type="text" className="todo_input"
                            value={todo}
                            onChange={handletodo}
                        />
                        <button className="todo_btn" onClick={handlebtn}>Add Task</button>   
                        {myArray.map((value,index)=>(
                            <div className="myDiv">
                            <ul>
                                <input type="checkbox"
                                    checked={value.complete}
                                    onClick={()=>handleCheck(index)}
                                />
                                <span style={{textDecoration:value.complete? "line-through" : ""}}>{value.task}</span>
                                <span className="material-symbols-outlined delete_todo" onClick={()=>{handleDelete(index)}}>delete</span>
                                <span class="material-symbols-outlined edit_todo"  onClick={()=>{handleEdit(index)}}>edit</span>
                            </ul>
                            </div>
                           
                        ))}

                        <p>Complete Tasks:-{Ctask} </p>
                        <p>Remaining Tasks:-{Rtask} </p>
                        <p>Total Task:- {tTask} </p>
                    </form>
                </div>
            </div>
           
        </>
    )
}
export default Todo;
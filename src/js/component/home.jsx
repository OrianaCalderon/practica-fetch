import React , {useState} from "react";


//create your first component
const Home = () => {

	const [tarea , setTarea]=useState({
		task:"",
		done:false
	})

	const [listaTarea, setListaTarea]=useState([])

	const handleChange =(event)=>{
		setTarea({...tarea,[event.target.name]:event.target.value})

	}

	const guardarTarea =(event)=>{
		if(event.key === "Enter"){
			if(tarea.task.trim() !== ""){
				setListaTarea([...listaTarea, tarea])
				setTarea({
					task:"",
					done: false})
			}else{
				alert("Debes escribir una tarea")
			}
			
			
		}
	}

	const deleteTask = (id)=>{
		let borrar = listaTarea.filter((item,index)=>{
			return(
				id !== index
			)
		})
		setListaTarea(borrar)
	}


	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1>ToDo</h1>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<input 
						type="text"
						placeholder="que que quieres?"
						className="dato"
						name="task"
						onChange={handleChange}
						value={tarea.task}
						onKeyDown={guardarTarea}
						 />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<ul>
						{
							listaTarea.map((item,index)=>{
								return(
									<li key={index} onClick={()=>deleteTask(index)}>{item.task}</li>
								)
								
							})
						}

					</ul>
				</div>
				<p>tienes {listaTarea.length} por hacer</p>
			</div>
			
		</div>
	);
};

export default Home;

import React , {useState, useEffect} from "react";


//create your first component
const Home = () => {

	let calderon = "https://assets.breatheco.de/apis/fake/todos/user/calderon"

	const [tarea , setTarea]=useState({
		label:"",
		done:false
	})

	const [listaTarea, setListaTarea]=useState([])

	const handleChange =(event)=>{
		setTarea({...tarea,[event.target.name]:event.target.value})

	}

	const guardarTarea =async(event)=>{
		if(event.key === "Enter"){
			if(tarea.label.trim() !== ""){
				try{
					let response = await fetch(`${calderon}`,{
						method:"PUT",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify([...listaTarea,tarea])
					}) 
					if(response.ok){
						setTarea({
							label:"",
							done:false
						})
						createUser()
					}

				}catch(error){
					console.log(error)
				}

			}else{
				alert("Debes escribir una tarea")
			}
			
			
		}
	}

	const deleteTask = async(id)=>{
		let borrar = listaTarea.filter((item,index)=>{
			if(id != index){
				return item
			}
		})
		try{
			let response = await fetch(`${calderon}`,{
				method:"PUT",
				headers:{"Content-Type":"application/json"},
				body: JSON.stringify(borrar)
			})
			if(response.ok){
				createUser()
			}

		}catch(error){
			console.log(error)
		}
		
	}


	const createUser =async()=>{
		try{
			let response= await fetch(`${calderon}`)
			if(response.ok){
				let data = await response.json()
				
				if(response.status != 404){
					setListaTarea(data)
				}
			}else{
				let responseCreate = await fetch(`${calderon}`,{
				method:"POST",
				hearders:{"Content-Type":"application/json"},
				body: JSON.stringify([])
				})

				if(responseCreate.ok){
					createUser()
				}
			}
			
		}catch(error){
			console.log(error)
		}

	}

	useEffect(()=>{
		createUser()
	},[])


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
						name="label"
						onChange={handleChange}
						value={tarea.label}
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
									<li key={index} onClick={()=>deleteTask(index)}>{item.label}</li>
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

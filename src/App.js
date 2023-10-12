  import logo from './logo.svg';
import './App.css';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { ADD_RECORD , DELETE_RECORD, EDIT_RECORD,UPDATE_RECORD } from './action/action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  let record = useSelector(state => state.Crud.users);
  let singlerecord = useSelector(state => state.Crud.user);
  const [editid,setEditId] = useState("");
  const [alldata,setAllData] = useState(record)
  const [input,setInput] = useState({
      name : '',
      lname:'',
      email : ''
  })
  const handleChange = (e) => {
      const {name,value} = e.target;
      setInput({
          ...input,[name] : value
      })
  }
  const handleSubmit = () => {

    if(editid){
      let obj = {
        id : editid,
        name : input.name,
        lname:input.lname,
        email : input.email
      }
      dispatch(UPDATE_RECORD(obj));
      alert("Record successfully Edit");
      setEditId("");
    }else{
      let obj = {
        id : Math.floor(Math.random() * 100000),
        name : input.name,
        lname:input.lname,
        email : input.email
      }
      dispatch(ADD_RECORD(obj));
      alert("Record successfully insert");
    }  
    setInput({
      name: '',
      lname:'',
      email : ''
    })
  }
    useEffect(()=>{
        setInput({
           name : singlerecord.name,
           lname:singlerecord.lname,
           email : singlerecord.email,
        })
        setEditId(singlerecord.id)
    },[singlerecord])

  return (
      <center>
        <br/>
        <h1 style={{color:'white'}}>Employee Data</h1>
        <br/>
          <table border={1}>
              <tr>
                <td>First Name :- </td>
                <td>
                  <input type='text' name='name' onChange={handleChange} value={input.name}/>
                </td>
              </tr>
              <tr>
                <td>Last Name :- </td>
                <td>
                  <input type='text' name='lname' onChange={handleChange} value={input.lname}/>
                </td>
              </tr>
              <tr>
                <td>Email Id :- </td>
                <td>
                  <input type='text' name='email' onChange={handleChange} value={input.email}/>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {
                    editid ? ( <input type='button' onClick={ () => handleSubmit() } value='Edit'/>) : (<input type='button' onClick={ () => handleSubmit() } value='submit'/>)
                  }

                </td>
              </tr>
          </table><br/><br/>

        <table border={1} style={{textAlign:'center'}} className='tablebg-color'>
            <tr>
              <td>Id</td>
              <td>Employee First Name</td>
              <td>Employee Last Name</td>
              <td>Employee Email Id</td>
              <td>Action</td>
            </tr>

            {
              record.map((val)=>{
                  return (
                      <tr>
                          <td>{val.id}</td>
                          <td>{val.name}</td>
                          <td>{val.lname}</td>
                          <td>{val.email}</td>
                          <td>
                            <button onClick={ () => dispatch(DELETE_RECORD(val.id)) }>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={ () => dispatch(EDIT_RECORD(val.id)) }>Edit</button>
                          </td>
                      </tr> 
                  )
              })
            }
        </table>

      </center>
  );
}

export default App;

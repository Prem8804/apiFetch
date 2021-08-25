import React from 'react';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users : [],
      isLodding : false,
      isError : false
    }
  }
  async componentDidMount(){
    const response = await fetch("https://jsonplaceholder.typicode.com/")
    if(response.ok){
      const users = await response.json();
      this.setState({users : users , isLodding : false})
    }else{
      this.setState({isError: true, isLodding : false})
    }
  }
  handleTableHeading = () =>{
    return Object.keys(this.state.users[0]).map(attr => 
         <th keys={attr}>{attr.toUpperCase()}</th>
      )
  }
  handleTableRows = () =>{
    return this.state.users.map(user =>{
      return(
        <tr keys = {user.id}>
          <td>{user.id}</td>
          <td>{user.userId}</td>
          <td>{user.title}</td>
          <td>{user.completed}</td>
        </tr>
      )
    })
  }
  render(){
    if(this.state.isLodding){
      return <div>lodding...</div>
    }
    if(this.state.isError){
      return <div>Error</div>
    }
    return this.state.users.length > 0
    ? (
       <table>
          <thead>
             <tr>{this.handleTableHeading()}</tr>
          </thead>
          <tbody>
            {this.handleTableRows()}
          </tbody>  
       </table>
    ) : (
      <div>
        no user...
      </div>
    )
  }
}


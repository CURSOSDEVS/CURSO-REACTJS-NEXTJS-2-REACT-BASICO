
import './App.css';
import {Component} from 'react'

class App extends Component{
 
    state ={
      counter: 0,
      posts:[
        {
          id: 1,
          title: 'Título 1',
          body: 'Corpo 1'
        },
        {
          id: 2,
          title: 'Título 2',
          body: 'Corpo 2'
        },
        {
          id: 3,
          title: 'Título 3',
          body: 'Corpo 3'
        }
       
      ]
    };

    //variavel criada para zerar o timeout
    timeoutUpdate = null;

    //esse é um life cicle metods
    componentDidMount(){
     this.handleTimeout();
     
    }

    //é um life cicle que recebe o estado anterior ou props states
    componentDidUpdate(){
      this.handleTimeout();
    }

    //para apagar o lixo e não dar erro no navegador
    componentWillUnmount(){
      //zera o time para dar erro na página quando ocorrer alteraçoes
      clearTimeout(this.timeoutUpdate);
    }

    //função criada para atualizar o state do componente 
    handleTimeout=()=>{
      const {posts, counter} = this.state;
      posts[0].title = 'o título mudou';

      this.timeoutUpdate = setTimeout(() => {
        this.setState({ 
          posts,
          counter: counter + 1
        })
      }, 1000); 
    }

  
  render(){
    const {posts, counter} = this.state;

    return (
      <div className="App">
        <h1>{counter}</h1>
       {posts.map(post=> (
         <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
         </div>        
        ))}
      </div>
    );
  }
}

export default App;

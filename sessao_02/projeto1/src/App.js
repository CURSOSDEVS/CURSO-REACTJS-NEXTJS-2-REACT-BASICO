
import './App.css';
import {Component} from 'react'

//importando os dados 
import {loadPosts} from './utils/load-posts'
import { Posts } from './Components/Posts';

class App extends Component{
 
    state ={
      posts:[

      ]
    };

    //esse é um life cicle metods
    async componentDidMount(){
      await this.loadPosts();
    }

    loadPosts = async () =>{
      const postsAndPhotos = await loadPosts();
      //susbstituimos o postJson que tinha somente os posts pelo postsAndPhotos
      this.setState({posts: postsAndPhotos});
    }

  render(){
    const {posts} = this.state;

    return (
      <section className='container'>
        <Posts posts={posts} />
      </section>
      
    );
  }
}

export default App;


import './App.css';
import {Component} from 'react'

class App extends Component{
 
    state ={
      posts:[

      ]
    };

    //esse é um life cicle metods
    componentDidMount(){
      this.loadPosts();
    }

    loadPosts = async () =>{
      //utilizamos o fetch para fazer uma requisição e será esperado um response 
      //neste caso faremos uma requisição para os posts e outra para as fotos
      const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

      //criamos dois arrays que irão receber os conteúdos na ordem dos responses
      //que são obtidos através da função Promise que pega o retorno do response
      //e passa para cada variavel separada
      const [posts, photos] = await Promise.all([postResponse, photosResponse]);

      //aqui criamos um objeto que receberá a conversão do array para
      //o formato json
      const postJson = await posts.json();
      const photosJson = await photos.json();

      //fazendo a união entre dois arrays utilizando o map para escolher
      /*quais atributos do primeiro array serão utilizados, sendo que
      iremos retornar o post e utilizando a função cover nós pegamos do 
      segundo array o atributo que queremos */
      const postsAndPhotos = postJson.map((post,index)=>{
        return { ...post, cover: photosJson[index].url }
      })

      //susbstituimos o postJson que tinha somente os posts pelo postsAndPhotos
      this.setState({posts: postsAndPhotos});
    }

    //é um life cicle que recebe o estado anterior ou props states
    componentDidUpdate(){
    
    }

    //para apagar o lixo e não dar erro no navegador
    componentWillUnmount(){
  
    }

  render(){
    const {posts} = this.state;

    return (
      <section className='container'>
        <div className="App, posts">     
          {posts.map(post=> (
            <div className='post'>
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className='post-content'>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>                    
          ))}
        </div>
      </section>
      
    );
  }
}

export default App;

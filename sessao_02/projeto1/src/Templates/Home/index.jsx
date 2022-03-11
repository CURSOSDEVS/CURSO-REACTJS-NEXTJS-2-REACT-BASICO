
import './styles.css';

import {Component} from 'react';

//importando os dados 
import {loadPosts} from '../../utils/load-posts';

//importando os componentes
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import {TextInput} from '../../Components/TextInput';

class Home extends Component{
 
    state ={
      posts:[],
      allPosts:[],
      page:0,
      postsPerPage: 10,
      searchValue: ''
    };

    //esse é um life cicle metods
    async componentDidMount(){
      await this.loadPosts();
    }

    loadPosts = async () =>{
      const postsAndPhotos = await loadPosts();
      const {page, postsPerPage}= this.state;
      //susbstituimos o postJson que tinha somente os posts pelo postsAndPhotos
      this.setState({
        posts: postsAndPhotos.slice(page,postsPerPage),
        allPosts: postsAndPhotos
      });
    }

    //carregando mais posts na página
    loadMorePosts = () =>{
      //carrega as variaveis que iremos precisar do state
     const {
       page,
       postsPerPage,
       allPosts,
       posts
     } = this.state;

     //nextPage terá a página mais a quantidade de postes por página
     const nextPage = page + postsPerPage;

     //criando um novo array que terá somente os posts que farão parte
     //da página que será mostrada
     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

     //passamos para posts o array somente com os itens que serão mostrados
     posts.push(...nextPosts);

     //setamos agora no state o novo array de posts e a nova pagina
     this.setState({posts, page: nextPage});
     console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
    }

    //método para realizar busca no input que recebe o evento
    handleChange = (e)=>{
      //destruct capturando o target do evento
      const{value} = e.target;

      //passamos o novo valor de searchValue utilizando o setState
      this.setState({searchValue: value});
    }

  render(){
    const {posts, page, postsPerPage, allPosts, searchValue } = this.state;

    //variável utilizada para filtrar os posts conforme conteúdo do input
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    })
    : posts ;

    /*iremos determinar se existe mais posts para serem mostrados na página
    para isso vamos verificar se a página que estamos mais quantidade de posts por
    página for maior ou igual a quantidade total de posts, significa que
    não temos mais páginas para ir.
    vamos passar então a propriedade noMorePosts para o atributo disabled.
    */
   const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className='container'>
        
        {!!searchValue && (
          <div className='search-container'>
            <h1>Search value: {searchValue} Qtd posts: {filteredPosts.length}</h1>
          </div>
        )}
        
        <TextInput
          onChange={this.handleChange}
          type='search' 
          value={searchValue}
          placeholder='Type your search'
        />  
        
        {filteredPosts.length >0 &&(
           <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length ===0 &&(
          <p>Não existem posts :( </p>
          
        )}
       

        <div className='button-container'>
          
          {!searchValue &&(
            <Button 
            text='Load more posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
          )}

        </div>
      </section>
      
    );
  }
}

export default Home;

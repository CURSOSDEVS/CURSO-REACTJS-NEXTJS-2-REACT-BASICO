
import './styles.css';

import {Component} from 'react';

//importando os dados 
import {loadPosts} from '../../utils/load-posts';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';

class Home extends Component{
 
    state ={
      posts:[],
      allPosts:[],
      page:0,
      postsPerPage: 10
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

  render(){
    const {posts, page, postsPerPage, allPosts } = this.state;

    /*iremos determinar se existe mais posts para serem mostrados na página
    para isso vamos verificar se a página que estamos mais quantidade de posts por
    página for maior ou igual a quantidade total de posts, significa que
    não temos mais páginas para ir.
    vamos passar então a propriedade noMorePosts para o atributo disabled.
    */
   const noMorePosts= page + postsPerPage >= allPosts.length;

    return (
      <section className='container'>
        <Posts posts={posts} />
        <div className='button-container'>
          <Button 
            text='Load more posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
      
    );
  }
}

export default Home;

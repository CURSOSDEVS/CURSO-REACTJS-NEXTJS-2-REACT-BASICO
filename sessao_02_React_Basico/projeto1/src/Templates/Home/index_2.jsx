
import './styles.css';

import {useState,useEffect, useCallback} from 'react';


//importando os dados 
import {loadPosts} from '../../utils/load-posts';

//importando os componentes
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import {TextInput} from '../../Components/TextInput';

export const Home = () => {
  
  //useState das variáveis
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  /*iremos determinar se existe mais posts para serem mostrados na página
  para isso vamos verificar se a página que estamos mais quantidade de posts por
  página for maior ou igual a quantidade total de posts, significa que
  não temos mais páginas para ir.
  vamos passar então a propriedade noMorePosts para o atributo disabled.
  */
 const noMorePosts = page + postsPerPage >= allPosts.length;

  //variável utilizada para filtrar os posts conforme conteúdo do input
  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  })
  : posts ;

  

  const handleLoadPosts = useCallback(async (page, postsPerPage) =>{
    const postsAndPhotos = await loadPosts();
   // const {page, postsPerPage}= this.state;

    //susbstituimos o postJson que tinha somente os posts pelo postsAndPhotos    
    setPosts(postsAndPhotos.slice(page,postsPerPage));
    setAllPosts(postsAndPhotos);

  },[])

  //utilizando um hook 
 useEffect(()=>{
  handleLoadPosts(0, postsPerPage);
}, [handleLoadPosts, postsPerPage]);
  
  //carregando mais posts na página
  const loadMorePosts = () =>{
  
   //nextPage terá a página mais a quantidade de postes por página
   const nextPage = page + postsPerPage;

   //criando um novo array que terá somente os posts que farão parte
   //da página que será mostrada
   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

   //passamos para posts o array somente com os itens que serão mostrados
   posts.push(...nextPosts);

   //setamos agora no state o novo array de posts e a nova pagina
   setPosts(posts);
   setPage(nextPage);

  }

  //método para realizar busca no input que recebe o evento
 const handleChange = (e)=>{
    //destruct capturando o target do evento
    const{value} = e.target;
    //passamos o novo valor de searchValue utilizando a função setSearchValue
    setSearchValue(value);
  }

  

  return (
    <section className='container'>
      
      {!!searchValue && (
        <div className='search-container'>
          <h1>Search value: {searchValue} Qtd posts: {filteredPosts.length}</h1>
        </div>
      )}
      
      <TextInput
        onChange={handleChange}
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
          onClick={loadMorePosts}
          disabled={noMorePosts}
        />
        )}

      </div>
    </section>
    
  );

}
export const PostCard = ({post}) => {
  //para pegarmos o post que está vindo para o componente podemos fazer
  //de tres maneiras
  //const post = props.post 
  //const {post} = props
  //ou export const PostCard = ({post})
  return(
    <div className='post'>
        <img src={post.cover} alt={post.title} />
        <div className='post-content'>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
              </div>
    </div> 
  );
}
export const loadPosts = async () =>{
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

    return postsAndPhotos;
}
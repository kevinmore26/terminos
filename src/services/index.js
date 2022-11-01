import axios from 'axios';

export function getCancionesf(id){
    const album=request.get(`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`)
                        .then(response=>response.data)
                        .catch(error=>console.log(error))
    return album
}

const API_KEY='db396a7ab7msh73610af872279d2p1bd1f1jsn1ec3742e729b'

const request=axios.create({
    baseURL:'https://deezerdevs-deezer.p.rapidapi.com/',
    timeout:30000,
    headers:{'X-RapidAPI-Key': API_KEY}

});


export function getAlbums(search='dragon ball'){
    const albums= request.get(`search?q=${search}`)
        .then(response => response.data.data)
        .catch(error=> console.log(error));
    return albums
}

export function getAlbum(id){
    const album=request.get(`album/${id}`)
                        .then(response=>response.data)
                        .catch(error=>console.log(error))
    return album
}
export function getSong(id){
    const album=request.get(`track/${id}`)
                        .then(response=>response.data)
                        .catch(error=>console.log(error))
    return album
}
export function getPreview(id){
    const album=request.get.preview(`track/${id}`)
                        .then(response=>response.data)
                        .catch(error=>console.log(error))
                        console.log(album.preview)
    return album
}
export function getFavoritesAlbums(){
    const album=localStorage.getItem('favorites')
    return album
}
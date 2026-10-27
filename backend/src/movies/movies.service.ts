import { Movie, MovieProps } from "./movies.entity";
import * as moviesRepository from "./movies.repository";
export async function listAll() {
    return moviesRepository.findAll();
}

export async function getById(id: number){
    const movie = await moviesRepository.getById(id);
    if (!movie) {
        const error = new Error("ID do filme não existente no banco de dados");
        (error as any).statusCode = 404;
        throw error;
    }
    return movie;
}

export async function create(props: MovieProps) {
    const newMovie = new Movie(props);
    const result = await moviesRepository.save(newMovie);

    if (!result){
        const error = new Error('Filme já existe dentro do banco de dados');
        (error as any).statusCode = 409
        throw error;
    }

    return result;
}

export async function change(id: number, props: MovieProps){
    const tempMovie = new Movie(props)
    const changedMovie = await moviesRepository.change(id, tempMovie)

    if (!changedMovie){
        const error = new Error('ID do filme não existente no banco de dados');
        (error as any).statusCode = 404
        throw error;
    }
    return changedMovie;

}


export async function remove(id: number){
    const tmdb_id = await moviesRepository.remove(id)
    if (!tmdb_id){
        const error = new Error('ID do filme não existente no banco de dados');
        (error as any).statusCode = 404
        throw error;
    }
    return tmdb_id;
}
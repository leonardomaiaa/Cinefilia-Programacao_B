import { Request, Response, NextFunction } from "express";
import * as moviesService from "./movies.service";
import { Movie, MovieProps } from "./movies.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - tmdb_id
 *         - title
 *         - release_year
 *         - poster_url
 *       properties:
 *         id:
 *           type: integer
 *           description: ID interno do banco de dados, gerado automaticamente
 *         tmdb_id:
 *           type: integer
 *           description: ID do filme no Total Movie Database
 *         title:
 *           type: string
 *           description: Nome do filme
 *         release_year:
 *           type: integer
 *           description: Ano de lançamento do filme (use 'integer' em vez de 'number')
 *         poster_url:
 *           type: string
 *           description: Endereço da imagem do poster do filme
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro no banco
 *       example:
 *         tmdb_id: 155
 *         title: "Batman: O Cavaleiro das Trevas"
 *         release_year: 2008
 *         poster_url: "https://image.tmdb.org/t/p/w500/example2.jpg"
 */

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
    // O controller recebe o array de objetos da classe Movie
    const movies: Movie[] = await moviesService.listAll();
    // Aqui ocorre a conversão técnica para JSON e o envio pela rede
    res.json(movies);
    } catch (err) {
    next(err);
}
}

export async function getById(req: Request, res: Response, next: NextFunction){
    try{
        const movieId = Number(req.params.id);

        if (isNaN(movieId)){
            const error = new Error("ID do filme inválido. Deve ser um número");
            (error as any).statusCode = 400;
            next(error);
            return;
        }
        const movie: Movie = await moviesService.getById(movieId);

        res.json({
            id: movie.id,
            tmdb_id: movie.tmdb_id,
            title: movie.title,
            release_year: movie.release_year,
            poster_url: movie.poster_url,
            created_at: movie.created_at
        });

    }
    catch (error: any){
        next(error);
    }
}

export async function create(req: Request, res: Response, next: NextFunction){
    try{
        const {tmdb_id, title, release_year, poster_url} = req.body;

        if (!tmdb_id || !title || !release_year || !poster_url){
            const error = new Error("Campos obrigatórios ausentes");
            (error as any).statusCode = 400;
            next(error);
            return;

        }
        const movieData: MovieProps = {
            tmdb_id: Number(tmdb_id),
            title,
            release_year: Number(release_year),
            poster_url

        };
        const createdMovie = await moviesService.create(movieData);
        res.status(201).json ({
            message: "Registro do filme criado com sucesso!",
            movie: {
                id: createdMovie.id,
                tmdb_id: createdMovie.tmdb_id,
                title: createdMovie.title,
                release_year: createdMovie.release_year,
                poster_url: createdMovie.poster_url,
                created_at: createdMovie.created_at
            }
        });
    }
    catch (error: any) {
        next(error);
    }
}

export async function change(req: Request, res: Response, next: NextFunction){
    try{
        const movieId = Number(req.params.id)
        if (isNaN(movieId)){
            const error = new Error('ID do filme inválido. Deve ser um número');
            (error as any).statusCode = 400;
            next(error);
            return;

        }
        const {tmdb_id, title, release_year, poster_url} = req.body

        if (!tmdb_id || !title || !release_year || !poster_url){
            const error = new Error("Campos obrigatórios ausentes");
            (error as any).statusCode = 400;
            next(error);
            return;
        }

        const movieData: MovieProps = {
        tmdb_id: Number(tmdb_id),
        title,
        release_year: Number(release_year),
        poster_url
        }
        const changedMovie = await moviesService.change(movieId, movieData);
        res.status(200).json({
            message: 'Informações do filme alteradas com sucesso'
        })
    }
    catch (error: any){
        next(error)
    }
}


export async function remove(req: Request, res: Response, next: NextFunction){
    try{
        const movieId = Number(req.params.id)

        if (isNaN(movieId)){
            const error = new Error('ID do filme inválido. Deve ser um número');
            (error as any).statusCode = 400;
            next(error);
            return;
        }
        
        const removedMovie_tmdb_id = await moviesService.remove(movieId);
        res.status(200).json({
            message: 'Filme removido do banco de dados com sucesso',
            tmdb_id: removedMovie_tmdb_id
        })
    }
    catch (error:any){
        next(error)
    }

}





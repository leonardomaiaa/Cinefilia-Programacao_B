import { pool } from "../db";
import { Movie, MovieProps } from "./movies.entity";
export async function findAll(){
    const result = await pool.query(`SELECT * FROM movies`);
    return result.rows.map((row) => {return new Movie(
    {
        tmdb_id: row.tmdb_id,
        title: row.title,
        release_year: row.release_year,
        poster_url: row.poster_url,
    },
        Number(row.id),
        new Date(row.created_at)
    );
    });
}

export async function getById(movie_id : number){
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [movie_id]);
    const row = result.rows[0];

    if (!row) return null;
    
    const props: MovieProps = {
        tmdb_id: row.tmdb_id,
        title: row.title,
        release_year: row.release_year,
        poster_url: row.poster_url
    };

    return new Movie(props, row.id, row.created_at);
}

export async function save(movie: Movie){
    const query = 'INSERT INTO movies (tmdb_id, title, release_year, poster_url) VALUES ($1, $2, $3, $4) RETURNING id;';
    const values = [
        movie.tmdb_id,
        movie.title,
        movie.release_year,
        movie.poster_url
    ];
    let tmdb_id = await pool.query(`SELECT tmdb_id FROM movies WHERE tmdb_id = $1`,[movie.tmdb_id])
    tmdb_id = tmdb_id.rows[0];
    if (tmdb_id){
        return null
    }
    const result = await pool.query(query, values);
    const insertedId = result.rows[0].id;

    return new Movie(
        {
            tmdb_id: movie.tmdb_id,
            title: movie.title,
            release_year: movie.release_year,
            poster_url: movie.poster_url
        },
        insertedId,
        movie.created_at
    );
}

export async function change(movie_id: number, movie: Movie){
    const query = `UPDATE movies 
                   SET tmdb_id = $1, title = $2, release_year = $3, poster_url = $4
                   WHERE id = $5
                   RETURNING title`;
    const values = [
        movie.tmdb_id,
        movie.title,
        movie.release_year,
        movie.poster_url,
        movie_id
    ];
    const result = await pool.query(query, values);
    const row = result.rows[0]

    if (!row){
        return null
    }
       
    return row.title;
}

export async function remove(movie_id: number){
    let result = await pool.query(`SELECT tmdb_id FROM movies WHERE id = $1`,[movie_id])
    const row = result.rows[0]

    if (!row){
        return null
    }
    result = await pool.query(`DELETE FROM movies WHERE id = $1`,[movie_id]) 

    
    return row.tmdb_id;
}
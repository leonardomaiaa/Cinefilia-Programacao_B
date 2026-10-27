export interface MovieProps {
    tmdb_id: number;
    title: string;
    release_year: number;
    poster_url: string;
}
export class Movie {
    private _id: number;
    private _tmdb_id: number;
    private _title: string;
    private _release_year: number;
    private _poster_url: string;
    private _created_at: Date;
    constructor(props: MovieProps, id?: number, created_at?: Date) {
        this._id = id ?? 0; //Pode vir do banco, mas caso ainda não tenho sido inserido e setado como 0
        this._created_at = created_at ?? new Date();//Se valor não existe, pega a data atual
        this._tmdb_id = props.tmdb_id
        this._title = props.title;
        this._release_year = props.release_year
        this._poster_url = props.poster_url
    }
    // --- GETTERS ---
    public get id(): number { return this._id; }
    public get tmdb_id(): number { return this._tmdb_id; }
    public get title(): string { return this._title; }
    public get release_year(): number { return this._release_year; }
    public get poster_url(): string { return this._poster_url;}
    public get created_at(): Date { return this._created_at; }
    // --- SETTERS ---
    public set tmdb_id(value: number) { this._tmdb_id = value; }
    public set title(value: string) { this._title = value; }
    public set release_year(value: number) { this._release_year = value; }
    public set created_at(value: Date) {this._created_at = value; }
}
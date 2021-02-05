export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string,
        private _tokenExpirDate: Date){}

    get token(){
        if (!this._tokenExpirDate || new Date() > this._tokenExpirDate) {
            return null;
        }
        return this._token;
    }
}

user.token = sadfd
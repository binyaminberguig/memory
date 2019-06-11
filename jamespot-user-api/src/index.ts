import JUserApi from './apis/user';
import JKlineApi from './apis/kline';
import JRtApi from './apis/rt';
import JGroupApi from './apis/group';
import JArticleApi from './apis/article';
import JCommentApi from './apis/comment';

export class JamespotUserApi
{
    public version = '0.1';

    private url: string;

    public user: JUserApi;
    public rt: JRtApi;
    public kline: JKlineApi;
    public group: JGroupApi;
    public article: JArticleApi;
    public comment: JCommentApi;

    public constructor() {
        let location = window.location;
        var host = location.host;
        this.url = location.protocol + '//' + host + '/user-api';
        this.url = "https://kline-dev1.jamespot.pro/user-api";
        console.log('Initialize jamespot-user-api v' + this.version + ' on ' + this.url);
    }

    public _postOptions(options: object): object {
        return Object.assign({ method: 'POST', credentials: 'same-origin' }, options);
    }

    public _getOptions(options: object): object {
        return Object.assign({ method: 'GET', credentials: 'same-origin' }, options);
    }
    /**
     * token function returns a token.
     *
     */
    public token(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fetch({
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({ o: 'misc', f: 'token' }),
            })
            .then(resp => {
                return resp.json();
            })
            .then(response => {
                resolve(response.result);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    /**
     * tokenCSRF function returns a CSRF token.
     *
     */
    public tokenCSRF(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fetch({
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({ o: 'misc', f: 'tokenCSRF' }),
            })
            .then(resp => {
                return resp.json();
            })
            .then(response => {
                resolve(response.result);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    public send(url: string, body: FormData): Promise<Response> {
        return window.fetch(this.url + url, {
			method: 'POST',
            credentials: 'same-origin',
			body
		});
    }

    public fetch(init: RequestInit): Promise<Response> {
        return window.fetch(this.url, this._postOptions(init));
    }

    public samplePromise(param: string): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(param), 1000);
        });
    }
}

let JamespotUserApiInstance = new JamespotUserApi();
JamespotUserApiInstance.user = new JUserApi(JamespotUserApiInstance);
JamespotUserApiInstance.kline = new JKlineApi(JamespotUserApiInstance);
JamespotUserApiInstance.group = new JGroupApi(JamespotUserApiInstance);
JamespotUserApiInstance.article = new JArticleApi(JamespotUserApiInstance);
JamespotUserApiInstance.comment = new JCommentApi(JamespotUserApiInstance);

JamespotUserApiInstance.rt = new JRtApi();

declare global {
    interface Window {
        JamespotUserApi: JamespotUserApi;
    }
}

window.JamespotUserApi = JamespotUserApiInstance;
export default JamespotUserApiInstance;

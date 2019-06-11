import JUser from '../classes/JUser';
import { JamespotUserApi } from '../index';

export default class JUserApi {
    private static jApi: JamespotUserApi;

    public constructor(jApi: JamespotUserApi) {
        JUserApi.jApi = jApi;
    }
    /**
     * signIn function returns a Promise of JUser.
     *
     * @param name Mail or username
     * @param pwd Password to be validated
     */

    public signIn(mail: string, pwd: string): Promise<JUser> {
        return new Promise((resolve, reject) => {
            JUserApi.jApi
                .fetch({ body: JSON.stringify({ o: 'user', f: 'signIn', mail: mail, password: pwd }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0 && response.result) {
                        let jUser = new JUser(response.result.id, response.result.type);
                        jUser.hydrate(response.result);

                        resolve(jUser);
                    } else {
                        reject('Wrong login/pwd');
                    }
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    /**
     * autocomplete return a list or JUser
     *
     * @param query <string>
     */
    public autocomplete(query: string): Promise<JUser> {
        return new Promise((resolve, reject) => {
            JUserApi.jApi
                .fetch({
                    method: 'POST',
                    credentials: 'same-origin',
                    body: JSON.stringify({ o: 'autocomplete', f: 'user', q: query, idToUri: false }),
                })
                .then(resp => {
                    return resp.json();
                })
                .then(response => {
                    let arr: any = [];
                    if (response.error === 0 && response.result) {
                        if (Array.isArray(response.result)) {
                            response.result.map((user: any) => {
                                let jUser = new JUser(user.idUser, user.type);
                                    jUser.hydrate(user);

                                arr.push(jUser);
                            });
                        }
                    }

                    resolve(arr);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * get function returns a Promise of JUser.
     *
     * @param idUser idUser
     */

    public get(idUser: number): Promise<JUser> {
        return new Promise((resolve, reject) => {
            JUserApi.jApi
                .fetch({ body: JSON.stringify({ o: 'user', f: 'get', idUser: idUser }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0 && response.result) {
                        let jUser = new JUser(response.result.id, response.result.type);
                        jUser.hydrate(response.result);

                        resolve(jUser);
                    } else {
                        reject('No user');
                    }
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    /*
     * Session will return a Promise of Session params.
     */
    public session(): Promise<object> {
        return new Promise((resolve, reject) => {
            JUserApi.jApi
                .fetch({ body: JSON.stringify({ o: 'user', f: 'session' }) })
                .then(response => response.json())
                .then(function(obj) {
                    resolve(obj.result);
                })
                .catch(function(error) {
                    reject({error: true});
                });
        });
    }
}

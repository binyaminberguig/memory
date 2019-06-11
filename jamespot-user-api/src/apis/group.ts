import { JamespotUserApi } from '../index';
import JGroup from '../classes/JGroup';
import JUser from '../classes/JUser';

export default class JGroupeApi
{
    private static jApi: JamespotUserApi;

    public constructor(jApi: JamespotUserApi) {
        JGroupeApi.jApi = jApi;
    }

    /**
     * get function returns a Promise of JGroup.
     * @param idGroup <number>
     * return JGroup
     */
    public get(idGroup: number): Promise<JGroup> {
        return new Promise((resolve, reject) => {
            JGroupeApi.jApi
                .fetch({ body: JSON.stringify({ o: 'spot', f: 'get', idSpot: idGroup }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0 ) {
                        let jGroup = new JGroup(response.result.id, response.result.type);
                        jGroup.hydrate(response.result);
                        resolve(jGroup);
                    } else {
                        reject(response.messages);
                    }
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    /**
     * articles function return a Promise
     *
     * @param idGroup <number>
     * @param limit <number>
     * @param p <number>
     */
    public articles(idGroup: number, limit: number = 10, p: number = 1): Promise <any> {
        return new Promise((resolve, reject) => {
            JGroupeApi.jApi
            .fetch({body: JSON.stringify({ o : 'spot', f: 'getArticles', idSpot: idGroup, limit, p })})
            .then(resp => resp.json())
            .then(response => {
                if (response.error === 0 ) {
                    resolve(response.result);
                } else {
                    reject(response.messages);
                }
            })
            .catch(function(error){
                reject(error);
            });
        });

    }

    /**
     * members function return a Promise of JUser
     *
     * @param idGroup <number>
     * @param limit <number>
     * @param p <number>
     */
    public members(idGroup: number, limit: number = 10, p: number = 1) : Promise <any>{
        return new Promise((resolve, reject) => {
            JGroupeApi.jApi
            .fetch({body : JSON.stringify( {o: 'spot', f: 'getMembers', idSpot: idGroup, limit, p })})
            .then(resp => resp.json())
            .then(response => {
                if (response.error === 0 ) {
                    let members: any = [];
                    if (Array.isArray(response.result)) {
                        response.result.map((user: any) => {
                            let jUser = new JUser(user.id, user.type);
                            jUser.hydrate(response.result);

                            members.push(jUser);
                        });
                    }

                    resolve(members);
                } else {
                    reject(response.messages);
                }
             })
             .catch(function(error){
                 reject(error);
             });
        });
    }

    /**
     * changeRole
     *
     * @param idUser <number>
     * @param role <string>
    */
    public changeRole(idUser: number, role: string): Promise <any>{
        return new Promise((resolve, reject) => {
            JGroupeApi.jApi
            .fetch({ body : JSON.stringify({ o: 'spot', f: 'changeRole', idUser, role }) })
            .then(resp => resp.json())
            .then(response => {
                if (response.error === 0 ) {
                    resolve(response.result);
                } else {
                    reject(response.messages);
                }
            })
            .catch(function(error){
                reject(error);
            })
        })
    }

    /**
     * get-types
     */
    public getTypes() : Promise <any>{
        return new Promise ((resolve , reject) => {
            JGroupeApi.jApi
            .fetch({ body : JSON.stringify({ o: 'spot', f:'get-types' }) })
            .then(resp =>resp.json())
            .then(response => {
                if (response.error === 0 ) {
                    resolve(response.result);
                } else {
                    reject(response.messages);
                }
            })
            .catch(function(error){
                reject(error);
            })
        })
    }

    /**
     * lastVisited
     * @param limit <number>
     */
    public lastVisited(limit: number = 10) : Promise<any>{
        return new Promise ((resolve, reject) => {
            JGroupeApi.jApi
            .fetch({ body : JSON.stringify({o: 'spot', f: 'lastVisited', limit }) })
            .then(resp => resp.json())
            .then(response => {
                if(response.error === 0){
                    resolve(response);
                }else{
                    reject('No lastVisited ')
                }
            })
            .catch(function(error){
                reject(error);
            })
        })
    }
}

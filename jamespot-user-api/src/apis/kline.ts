import { JamespotUserApi } from '../index';

import JUser from '../classes/JUser';
import JArticle from '../classes/JArticle';
import JComment from '../classes/JComment';

class JKlineFeedApi {
    public static jApi: JamespotUserApi;

    /**
     * feed create function return a new feed item
     *
     * @param name <string>
     * @param idProject <number>
     */
    public create(body: FormData, idProject: number): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineFeedApi.jApi.token().then((token) => {
                return JKlineFeedApi.jApi
                    .send('?o=kline&f=feedCreate', body)
                    .then(resp => resp.json())
                    .then(response => {
                        if (response.error === 0) {
                            let jArticle = new JArticle(response.result.id, response.result.type);
                            jArticle.hydrate(response.result);

                            resolve(jArticle);
                        } else {
                            reject([]);
                        }
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            });
        });
    }

    /**
     * ping a list of users to a feed
     *
     * @param idFeed <number>
     * @param uriUsers <array>
     */
    public ping(idFeed: number, uriUsers: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineFeedApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'feedPing', idFeed, uriUsers }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * return all kline available types
     *
     */
    public types(): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineFeedApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'feedTypes' }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * get function returns a project
     *
     * @param idFeed <number>
     * @param content <string>
     */
    public addMessage(idFeed: number, content: string): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineFeedApi.jApi.token().then((token) => {
                return JKlineFeedApi.jApi
                    .fetch({ body: JSON.stringify({ o: 'kline', f: 'addMessage', idArticle: idFeed, content: content, token: token }) })
                    .then(resp => resp.json())
                    .then(response => {
                        if (response.error === 0) {
                            let jComment = new JComment(response.result.id, response.result.type);
                            jComment.hydrate(response.result);

                            resolve(response.result);
                        } else {
                            reject([]);
                        }
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            });
        });
    }

    public discussion(idFeed: number, limit: number = 20, p: number = 1): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineFeedApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'discussion', idArticle: idFeed, limit }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        let arr: any = [];
                        if (Array.isArray(response.result)) {
                            response.result.map((comment: any) => {
                                let jComment = new JComment(comment.id, comment.type);
                                jComment.hydrate(comment);

                                arr.push(jComment);
                            });
                        }

                        resolve(arr);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }
}

class JKlineProjectApi {
    public static jApi: JamespotUserApi;

    /**
     * list function returns a list of projects
     *
     */
    public list(): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectList' }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    public invite(idProject: number, members: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectInvite', idProject, members }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject(false);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * create function returns a new project
     *
     * @param name <string>
     */
    public create(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectCreate', name }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * get function returns a project
     *
     * @param idProject <number>
     */
    public get(idProject: number): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectGet', idProject: idProject }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        resolve(response.result);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * members function returns an array of JUser
     *
     * @param idProject <number>
     */
    public members(idProject: number): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectMembers', idProject: idProject }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        let list: any = [];

                        response.result.map((user: any) => {
                            let jUser = new JUser(user.id, user.type);
                            jUser.hydrate(user);
                            list.push(jUser);
                        });

                        resolve(list);
                    } else {
                        reject([]);
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }

    /**
     * feeds function returns an array of feed object (article, document, todo, etc...)
     *
     * @param idProject <number>
     */
    public feeds(idProject: number): Promise<any> {
        return new Promise((resolve, reject) => {
            return JKlineProjectApi.jApi
                .fetch({ body: JSON.stringify({ o: 'kline', f: 'projectFeeds', idProject: idProject }) })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error === 0) {
                        let jArticle = new JArticle(response.result.id, response.result.type);
                        jArticle.hydrate(response.result);

                        resolve(response.result);
                    } else {
                        reject('api error');
                    }
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    }
}

export default class JKlineApi {
    public constructor (jApi: JamespotUserApi) {
        JKlineProjectApi.jApi = jApi;
        JKlineFeedApi.jApi = jApi;
    }

    /**
     * feed function returns a JKlineFeedApi.
     *
     */
    public feed(): JKlineFeedApi {
        return new JKlineFeedApi();
    }

    /**
     * feed function returns a JKlineProjectApi.
     *
     */
    public project(): JKlineProjectApi {
        return new JKlineProjectApi();
    }
}

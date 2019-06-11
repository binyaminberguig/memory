import {JamespotUserApi} from '../index';

import JComment from '../classes/JComment';

export default class JCommentApi
{
    private static jApi: JamespotUserApi;

    public constructor(jApi: JamespotUserApi){
        JCommentApi.jApi = jApi;
    }

    /**
     * get
     *
     * @param idComment <number>
     * @param type <string>
     */
    public get(idComment: number, type: string): Promise<any> {
        return new Promise((resolve, reject) => {
            JCommentApi.jApi
            .fetch({ body: JSON.stringify({ o: 'object', f: 'get-object', id: idComment, type }) })
            .then(resp => resp.json())
            .then(response => {
                if (response.error === 0) {
                    let jComment = new JComment(response.result.id, response.result.type);
                        jComment.hydrate(response.result);

                        resolve(response.result);
                } else {
                    reject('api error');
                }
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}

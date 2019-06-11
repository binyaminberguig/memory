import {JamespotUserApi} from '../index';
import JArticle from '../classes/JArticle';
export default class JArticleApi
{
    private static jApi: JamespotUserApi;

    public constructor(jApi: JamespotUserApi){
        JArticleApi.jApi = jApi;
    }

    /**
     * get
     *
     * @param idArticle
     */
    public get(idArticle : number): Promise<JArticle> {
        return new Promise((resolve, reject) => {
            JArticleApi.jApi
            .fetch({ body: JSON.stringify({ o: 'article', f: 'get', idArticle})})
            .then(resp => resp.json())
            .then(response => {
                if(response.error === 1){
                    let jArticle = new JArticle(response.result.id, response.result.type);
                    jArticle.hydrate(response.result);
                    resolve(jArticle);
                }else{
                    reject(response.messages);
                }
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    /**
     * getPublic article
     */

     public getPublic (idArticle: number): Promise<any>{
         return new Promise((resolve, reject) => {
             JArticleApi.jApi
             .fetch({ body: JSON.stringify({o: 'article', f:'getPublic', idArticle})})
             .then(resp =>resp.json())
             .then(response => {
                 if(response.error === 0){
                     resolve(response);
                 }else{
                     reject('NO public Article')
                 }
             })
             .catch(function(error){
                 reject(error);
             })
         })
     }

     /**
      * getComments
      * @param limits: limits
      */

      public getComments(limits: any) : Promise<any>{
        return new Promise((resolve, reject) => {
            JArticleApi.jApi
            .fetch({ body: JSON.stringify({ o: 'article', f: 'getComments', limits})})
            .then(resp =>resp.json())
            .then(response => {
                if(response.error === 0){
                    resolve(response)
                }else{
                    reject('No comments')
                }
            })
            .catch(function(error){
                reject(error);
            })
        })
      }

      /**
       * get-members
       * @param uri : uri
       */

       public getMembers(uri :string ) : Promise<any> {
           return new Promise((resolve, reject) => {
               JArticleApi.jApi
               .fetch({ body: JSON.stringify({ o: 'article', f:'get-members', uri})})
               .then(resp => resp.json())
               .then(response => {
                   if(response.error === 0){
                       resolve(response)
                   }else{
                       reject('No membres')
                   }
               })
               .catch(function(error){
                   reject(error);
               })
           })
       }

    /**
     * getAttachments
     * @param token : token
     */
    public getAttachments(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            JArticleApi.jApi
            .fetch({ body: JSON.stringify({ o: 'article', f: 'getAttachments' , token})})
            .then(resp => resp.json())
            .then(response => {
                if(response.error === 0 ){
                    resolve(response)
                }else{
                    reject('No Attachements')
                }
            })
            .catch(function(error){
                reject(error)
            })
        })
    }


}

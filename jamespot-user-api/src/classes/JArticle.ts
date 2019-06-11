//import JUser from '../classes/JUser';
//import JComment from '../classes/JComment';

export default class JArticle
{
    private type: string;
    private id: number;
    private record: Record<string, any> ={};

    public constructor(id: number, type: string){
        this.id = id;
        this.type = type;
    }

    public hydrate(data: any = {}): void {
        Object.keys(data).map(key => {
            this.record[key] = data[key];
        });
    }

    public getType(): string {
        return this.type;
    }

    public getId(): number {
        return this.id;
    }

    public getUri(): string {
        return this.getType() + '/' + this.getId();
    }

    public get(prop: string): any {
        return this.record[prop];
    }

    public set(prop: string, val: any): void {
        this.record[prop] = val;
    }
    /*
    private _dispatch(arr: Array<any>): any {

    }

    private _factory(object: any): any {
        switch (object.type) {
            case 'comment':
                let jComment = new JComment(object.id, object.type);
                    jComment.hydrate(object);

                return jComment;
            case 'user':
                let jUser = new JUser(object.id, object.type);
                    jUser.hydrate(object);

                return jComment;
        }
    }
    */
}

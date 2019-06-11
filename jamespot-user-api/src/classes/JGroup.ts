export default class JGroup
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


}

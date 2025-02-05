export class Task{
    constructor(
        public _id : string,
        public userId: string,
        public name: string,
        public description : string,
        public dueDate : Date,
        public completed : boolean
    ){}
}
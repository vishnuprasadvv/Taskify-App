export class Task{
    constructor(
        public userId : string,
        public title: string,
        public description : string,
        public dueDate : Date,
        public status ?: 'pending' | 'completed',
        public _id ?: string,
        public assignedTo ?: string
    ){}
}
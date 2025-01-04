//An enum that represent Task type
export const Priority = Object.freeze({
    P0: 'URGENT',
    P1: 'HIGH',
    P2: 'MEDIUM',
    P3: 'LOW'
})

//An enum that Represent Task Priority
export const TaskType = Object.freeze({
    MASTER: 'MASTER',
    CHILD: 'CHILD',
})

/** Class that represents a Task
 * You can create a class that creates and returns an object from the class 
 * itself. This design pattern is called the Factory Method pattern. 
 * The Factory Method pattern encapsulates object creation, enhances 
 * flexibility, promotes code reusability, and simplifies maintenance.**/
export class Task {
    constructor(description, priority, due){
        this.description = description;
        this.priority = priority;
        this.due = due;
        this.isCompleted = false; //Each new task should be false initially;
    }

    //Static class to Create and return objects of this class
    static createTask(description, priority, due){
        return new Task(description, priority, due);
    }
}
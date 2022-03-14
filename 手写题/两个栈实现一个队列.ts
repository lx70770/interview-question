class MyQueue<T> {

    private stack1: Array<T> = []
    private stack2: Array<T> = []


    add(n: T): void {
        this.stack1.push(n);
    }

    delete(): T | void {
        if (this.length == 0) return;

        // 1、將stack1轉移到stack2
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        }

        const target: T = this.stack2.pop();

        while (this.stack2.length) {
            this.stack1.push(this.stack2.pop())
        }

        return target;
    }

    get length(): number {
        return this.stack1.length;
    }
}
export class Message {
    constructor(private text: string,
        private error: boolean = false,
        // array of tuple where 1st element is a string,
        // 2nd element is Action<string>
        private responses?: [string, (string) => void][]) { }
}
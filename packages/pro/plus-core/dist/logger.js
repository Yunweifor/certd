const defaultLogger = {
    info(...args) {
        console.log(...args);
    },
    warn(...args) {
        console.warn(...args);
    },
    error(...args) {
        console.error(...args);
    },
    debug(...args) {
        console.log(...args);
    },
};
let currentLogger = defaultLogger;
export function setLogger(logger) {
    currentLogger = logger;
}
export function getLogger() {
    return currentLogger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGFBQWEsR0FBWTtJQUM3QixJQUFJLENBQUMsR0FBRyxJQUFXO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLElBQVc7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxLQUFLLENBQUMsR0FBRyxJQUFXO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ1MsQ0FBQztBQUViLElBQUksYUFBYSxHQUFZLGFBQWEsQ0FBQztBQUUzQyxNQUFNLFVBQVUsU0FBUyxDQUFDLE1BQWU7SUFDdkMsYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUN6QixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVM7SUFDdkIsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyJ9
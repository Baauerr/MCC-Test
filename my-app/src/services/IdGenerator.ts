export function GenerateId(): string{
    const min = 100000;
    const max = 999999;
    let id =  Math.floor(Math.random() * (max - min + 1)) + min;

    return id.toString()
}
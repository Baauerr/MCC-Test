export function GenerateId(): string{
    const min = 1000000;
    const max = 9999999;
    let id =  Math.floor(Math.random() * (max - min + 1)) + min;

    return id.toString()
}
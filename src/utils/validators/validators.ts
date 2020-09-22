export const requiredField = (value: string) => {
    if (value) return undefined
    return 'field is required !'
}

export const maxLength = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols` //проверка на то будет вообще value и (&&) если будет, то длина....
    return undefined
}




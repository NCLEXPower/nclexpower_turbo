interface GetLabelType {
    label: string;
    value: string | number;
}

export function getLabel<T extends GetLabelType>(value: unknown, arrayValues: T[]) {
    const label = arrayValues.find((item) => item.value === value);
    return label;
}
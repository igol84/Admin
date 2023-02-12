export const invokeIf = (condition: Boolean, fnTrue: any, fnFalse: any) => condition ? fnTrue() : fnFalse()


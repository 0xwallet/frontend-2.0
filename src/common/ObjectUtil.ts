/**
 * @method 深复制一个json对象
 * @param source 需要深复制的对象
 * @return 返回一个新的json对象
 */
export function deepCopyJson(source: any): Object {
    const newObject: any = {}
    for (const key of Object.keys(source)) {
        newObject[key] = typeof source[key] === 'object' ? deepCopyJson(source[key]) : source[key]
    }
    return newObject
}

/**
 * @method 合并json对象,遇到相同元素级属性，以source为准
 * @param source 被合并的json对象
 * @param dest json对象，将此json的属性递归赋值给source
 * @return void 不返还新的值而是直接改变source
 */
export function mergeJson(source: any, dest: any): void {
    for (const key of Object.keys(dest)) {
        if (source[key] === undefined) {  // 不冲突的，直接赋值
            source[key] = dest[key]
            continue
        }
        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以main为主，忽略即可。故不需要else
        if (isJson(dest[key])) {
            // arguments.callee 递归调用，并且与函数名解耦
            mergeJson(source[key], dest[key])
        }
    }
}

/**
 * @method 是否是json对象
 * @param target 需要被判断的类型
 * @return 如果是json对象返回 true，如果不是返回 false
 */
export function isJson(target: any): boolean {
    return typeof target === 'object' && target.constructor === Object
}


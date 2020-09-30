import { foo } from './foo'

const thing = 'something else'
const caps = foo(thing)
const withBang = `${caps}!`
console.info(caps, withBang)

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

export function createRTLCache() {
    return createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
        prepend: true
    })
}

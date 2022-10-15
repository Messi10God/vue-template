import { InjectionKey } from 'vue';

export const reloadType: InjectionKey<() => void> = Symbol();

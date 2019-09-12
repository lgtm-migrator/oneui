import { StoreInjector } from '../withStore';

jest.mock('@storybook/addons', () => ({
    getChannel: () => ({
        on: () => {},
        emit: () => {},
    }),
}));

let withStore;

describe('Storybook|injectStore decorator', () => {
    beforeEach(() => {
        withStore = injectedStore => new StoreInjector().withStore(injectedStore);
    });

    it('should expos the puplic API', () => {
        const instance = withStore();
        expect(typeof instance.getStore).toBe('function');
        expect(typeof instance.resetStore).toBe('function');
    });

    it('should return stored values', () => {
        const instance = withStore({
            string: 'test',
            object: { a: 1 },
            array: [1, 2, 3],
        });
        expect(instance.getStore().get('string')).toBe('test');
        expect(instance.getStore().get('object')).toEqual({ a: 1 });
        expect(instance.getStore().get('array')).toEqual([1, 2, 3]);
    });

    it('should change just changed values', () => {
        const instance = withStore({
            string: 'test',
            number: 1,
        });
        instance.getStore().set({ string: 'new value' });
        expect(instance.getStore().get('string')).toBe('new value');
        expect(instance.getStore().get('number')).toBe(1);
    });

    it('should reset store to initialValues', () => {
        const instance = withStore({
            string: 'test',
            number: 1,
        });
        instance.getStore().set({ string: 'new value' });
        instance.getStore().set({ number: 2 });
        instance.resetStore();
        expect(instance.getStore().get('string')).toBe('test');
        expect(instance.getStore().get('number')).toBe(1);
    });
});
import { create } from '../services/promptService';

test('primitive prompt creator only adds strings', () => {
    expect(create('hello', 'world')).toEqual('hello world');
});

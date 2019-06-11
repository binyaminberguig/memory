import JUser from '../../src/classes/JUser';

test('basic', () => {
    let user = new JUser(1, 'user');
    user.hydrate({ mail: 'test@test.fr', name: 'John Doe' });
    expect(user.getMail()).toBe('test@test.fr');
    expect(user.get('name')).toBe('John Doe');
});

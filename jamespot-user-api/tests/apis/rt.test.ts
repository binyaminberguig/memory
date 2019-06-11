import JamespotUserApi from '../../src/index';

test('JamespotUserApi - WS', () => {
    let rt = JamespotUserApi.rt;

    window.setTimeout(function() {
        console.log('Fin attente des tests');
    }, 5000);

    rt.onEvent('connect').subscribe(function() {
        console.log('connected');
    });
});

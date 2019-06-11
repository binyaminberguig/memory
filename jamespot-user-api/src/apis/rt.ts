import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketIo from 'socket.io-client';

export default class JRtApi {
    private static socket: SocketIOClient.Socket;
    private debug: boolean = false;
    /**
     * Creates a JRtApi object.
     */
    public constructor () {
    }
    public init(): void {
        JRtApi.socket = socketIo.connect('//');

        if (this.debug) {
            console.log('open socket');

            JRtApi.socket.on('message', function (data: any) {
                console.log('debug message :', data);
            });

            JRtApi.socket.on('connect', function () {
                console.log('connected!');
            });
            JRtApi.socket.on('disconnect', function () {
                console.log('disconnected!');
            });
        }
    }
    public send(message: object): void {
        JRtApi.socket.emit('message', message);
    }

    public emit(event: string, message?: object): void {
        JRtApi.socket.emit(event, message);
    }
    public onMessage(): Observable<object> {
        return new Observable<object>((observer: Observer<object>) => {
            JRtApi.socket.on('message', (data: object) => observer.next(data));
        });
    }
    public onEvent(event: string): Observable<object> {
        return new Observable<object>((observer: Observer<object>) => {
            JRtApi.socket.on(event, (data?: object) => observer.next(data));
        });
    }
}

import { Store } from 'klasa';
import APIWrapper from './APIWrapper';
import SnakeBot from '../../client';

export default class APIWrapperStore extends Store<string, APIWrapper> {

    public constructor(client: SnakeBot) {
        super(client, 'apis', APIWrapper);
    }

}

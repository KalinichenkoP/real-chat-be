
import { BaseDto } from "../../base/dto/BaseDto";
import {Channel} from '../ChannelEntity';

export class ChannelDto extends BaseDto<Channel> {

    readonly name: string;

    constructor(channel: Channel) {
        super(channel);
        this.name = channel.name;
    }
}

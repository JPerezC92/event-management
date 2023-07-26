import { createParamDecorator } from '@nestjs/common';
import * as ip from 'ip';

export const GetIp = createParamDecorator(() => {
    return ip.address();
});

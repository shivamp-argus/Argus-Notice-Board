import { createParamDecorator, ExecutionContext } from "@nestjs/common";


const User = createParamDecorator((data, context: ExecutionContext) => {

    const req = context.switchToHttp().getRequest()
    return req.user
})

export default User

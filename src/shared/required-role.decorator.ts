import { SetMetadata } from '@nestjs/common'
import { CONST } from './const'

export const RequiredRole = (role:string) => SetMetadata(CONST.ROLE, role)
import { ReflectMetadata } from "@nestjs/common";

export const AllowSessions = (...sessions: Function[]) => ReflectMetadata("allowedSessions", sessions);

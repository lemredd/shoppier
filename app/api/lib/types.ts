import type { NextResponse } from "next/server";

export type EndpointResponse = ReturnType<typeof NextResponse["json"]> | Response

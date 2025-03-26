import { SchemaTransformedType } from "../types/schema";

export const LS_TOKEN = "nic_token";
export const LS_REFRESH_TOKEN = "nic_refresh_token";
export const LS_TOKEN_TIMESTAMP = "nic_token_timestamp";
export const TOKEN_LIFESPAN = 900000;

export const USER_SCHEMA: SchemaTransformedType[] = [
  {
    field: "first_name",
    collection: "users",
    hidden: false,
    interfaceType: "input",
    readonly: false,
    required: true,
    type: { type: "text", value: "string" },
    options: { placeholder: "Enter first name" },
  },

  {
    field: "last_name",
    collection: "users",
    hidden: false,
    interfaceType: "input",
    readonly: false,
    required: true,
    type: { type: "text", value: "string" },
    options: { placeholder: "Enter last name" },
  },
  {
    field: "email",
    collection: "users",
    hidden: false,
    interfaceType: "input", //ver se exist email
    readonly: false,
    required: true,
    type: { type: "text", value: "string" },
    options: { placeholder: "Enter email" },
  },
];
